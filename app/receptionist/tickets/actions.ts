'use server';

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

// 1. Get all checked-in appointments (status: 'ĐÃ XÁC NHẬN')
export async function getCheckedInAppointments(dateStr: string) {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        bookingDate: dateStr,
        status: { in: ['ĐÃ XÁC NHẬN', 'ĐÃ CẤP SỐ'] } // Only patients who have checked in or already have a queue number
      },
      include: {
        patient: true,
        doctor: true
      },
      orderBy: [
        { bookingTime: 'asc' } // Sorted by booking time
      ]
    });

    const result = appointments.map((appointment: any) => {
      let displayPatientName = appointment.patient.fullName;
      let displayPhone = appointment.patient.phone || 'Chưa cập nhật';
      let displayCccd = appointment.patient.cccd || 'Chưa cập nhật';
      let isForRelative = false;

      if (appointment.reason && appointment.reason.startsWith('Người khám:')) {
        isForRelative = true;
        const nameMatch = appointment.reason.match(/Người khám: (.*?) - CCCD:/);
        if (nameMatch) displayPatientName = nameMatch[1].trim();

        const cccdMatch = appointment.reason.match(/- CCCD: (.*?) - SĐT:/);
        if (cccdMatch) {
          const extractedCccd = cccdMatch[1].trim();
          displayCccd = extractedCccd === 'Không có' ? 'Chưa cập nhật' : extractedCccd;
        }

        const phoneMatch = appointment.reason.match(/- SĐT: (.*?) - ĐC:/);
        if (phoneMatch) displayPhone = phoneMatch[1].trim();
      }

      // Format birth year
      let yob = 'Chưa cập nhật';
      if (appointment.patient.dob) {
        yob = appointment.patient.dob.substring(0, 4); // YYYY-MM-DD
        if (!yob.startsWith('19') && !yob.startsWith('20')) {
          const parts = appointment.patient.dob.split('-');
          if (parts.length === 3) yob = parts[0]; // Format is sometimes YYYY-MM-DD
        }
      }

      return {
        id: appointment.id,
        name: displayPatientName,
        yob: yob,
        gender: isForRelative ? 'Chưa cập nhật' : (appointment.patient.gender || 'Chưa cập nhật'),
        dob: isForRelative ? 'Chưa cập nhật' : (appointment.patient.dob || 'Chưa cập nhật'),
        age: appointment.patient.dob ? new Date().getFullYear() - parseInt(yob) : 0,
        code: appointment.appointmentCode || 'N/A',
        patientCode: isForRelative ? 'Chưa cập nhật' : (appointment.patient.patientCode || 'Chưa cập nhật'),
        time: appointment.bookingTime,
        doctor: `BS. ${appointment.doctor.fullName}`,
        specialty: appointment.specialty,
        room: appointment.room || 'Phòng 201 - Tầng 2', // Default fallback
        checkinTime: appointment.updatedAt ? new Date(appointment.updatedAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : 'N/A',
        status: appointment.status === 'ĐÃ XÁC NHẬN' ? 'Đã check-in' : 'Đã cấp số',
        phone: displayPhone,
        address: appointment.patient.address || 'Chưa cập nhật',
        queueNumber: (appointment as any).queueNumber || null // Type workaround for newly added field
      };
    });

    return { success: true, data: result };
  } catch (error) {
    console.error('Lỗi khi lấy danh sách check-in:', error);
    return { success: false, data: [] };
  }
}

// 2. Issue a queue number for a checked-in patient
export async function issueQueueNumber(appointmentId: number, dateStr: string) {
  try {
    // 1. Find the current highest queue number for this date
    const todayAppointments = await prisma.appointment.findMany({
      where: {
        bookingDate: dateStr,
        queueNumber: { not: null }
      } as any,
      select: { queueNumber: true }
    });

    let nextNumber = 1;
    if (todayAppointments.length > 0) {
      // Parse numbers from A001, A025, etc.
      const numbers = todayAppointments
        .map((a: any) => parseInt(a.queueNumber?.replace('A', '') || '0'))
        .filter((n: number) => !isNaN(n));
      
      if (numbers.length > 0) {
        nextNumber = Math.max(...numbers) + 1;
      }
    }

    const newQueueString = `A${String(nextNumber).padStart(3, '0')}`; // A001, A025

    // 2. Update the appointment with the new queue number and change status to ĐÃ CẤP SỐ
    const updated = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        status: 'ĐÃ CẤP SỐ',
        queueNumber: newQueueString
      } as any
    });

    return { success: true, queueNumber: newQueueString };
  } catch (error) {
    console.error('Lỗi khi cấp số:', error);
    return { success: false, message: 'Không thể cấp số lúc này.' };
  }
}

// 3. Get Queue Stats for Sidebar
export async function getRoomQueueStats(dateStr: string) {
  try {
    const queueList = await prisma.appointment.findMany({
      where: {
        bookingDate: dateStr,
        queueNumber: { not: null }
      } as any,
      include: {
        patient: true,
        doctor: true
      },
      orderBy: { queueNumber: 'asc' } as any
    });

    // Mock stats calculation - in real system this would map to actual status transitions
    // For now, we will assign statuses based on current queue position vs total
    // Let's assume the current active number is half-way through
    
    const formattedQueue = queueList.map((a: any, index: number) => {
      let qStatus = 'Chưa gọi';
      
      // Simple mock logic for demonstration
      if (index === 0) qStatus = 'Đã khám';
      else if (index === 1) qStatus = 'Đang khám';
      else if (index === 2) qStatus = 'Kế tiếp';
      else if (index < 5) qStatus = 'Đang chờ';
      
      return {
        queueNumber: a.queueNumber,
        patientName: a.patient.fullName,
        doctorName: `BS. ${a.doctor.fullName}`,
        time: a.bookingTime,
        status: qStatus
      };
    });

    return { success: true, queueList: formattedQueue };
  } catch (error) {
    console.error('Lỗi khi lấy stats hàng đợi:', error);
    return { success: false, queueList: [] };
  }
}
