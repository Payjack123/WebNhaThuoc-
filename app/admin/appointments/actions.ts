'use server';

import prisma from '@/lib/prisma';

// 1. LẤY TOÀN BỘ DỮ LIỆU LỊCH KHÁM, BỆNH NHÂN, BÁC SĨ
export async function getAdminAppointmentsData() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        patient: true,
        doctor: {
          include: { doctorProfile: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Lấy danh sách bệnh nhân và bác sĩ để đổ vào Select Box khi Admin thêm lịch mới
    const patientsList = await prisma.user.findMany({
      where: { role: 'PATIENT' },
      select: { id: true, fullName: true, phone: true }
    });

    const doctorsList = await prisma.user.findMany({
      where: { role: 'DOCTOR' },
      include: { doctorProfile: true }
    });

    const formattedAppts = appointments.map(apt => {
      // Tính tuổi bệnh nhân
      let age = 'N/A';
      if (apt.patient.dob) {
        const year = apt.patient.dob.split('/')[2] || apt.patient.dob.split('-')[0];
        if (year) age = (new Date().getFullYear() - parseInt(year)).toString();
      }

      return {
        rawId: apt.id,
        id: `LK${apt.id.toString().padStart(4, '0')}`,
        patientId: apt.patientId,
        patient: apt.patient.fullName,
        patientCode: apt.patient.patientCode || `BN${apt.patientId}`,
        phone: apt.patient.phone || 'Chưa cập nhật',
        age: age,
        gender: apt.patient.gender || 'Nam',
        doctorId: apt.doctorId,
        doctor: apt.doctor.fullName,
        specialty: apt.specialty,
        date: apt.bookingDate, // Định dạng: dd/mm/yyyy
        time: apt.bookingTime,
        room: `Phòng ${apt.doctor.doctorProfile?.specialty || 'Khám'}`, // Giả lập tên phòng dựa trên khoa
        status: apt.status,
        reason: apt.reason || 'Không có ghi chú'
      };
    });

    return { 
      success: true, 
      data: { 
        appointments: formattedAppts, 
        patients: patientsList, 
        doctors: doctorsList 
      } 
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Lỗi server khi lấy dữ liệu lịch khám' };
  }
}

// 2. ADMIN TẠO LỊCH KHÁM MỚI
export async function createAdminAppointment(data: { patientId: number, doctorId: number, specialty: string, date: string, time: string, reason: string }) {
  try {
    // Kiểm tra trùng lịch
    const existing = await prisma.appointment.findFirst({
      where: { doctorId: data.doctorId, bookingDate: data.date, bookingTime: data.time, status: { not: 'ĐÃ HỦY' } }
    });

    if (existing) {
      return { success: false, message: 'Bác sĩ này đã có lịch vào khung giờ trên!' };
    }

    await prisma.appointment.create({
      data: {
        patientId: data.patientId,
        doctorId: data.doctorId,
        specialty: data.specialty,
        bookingDate: data.date,
        bookingTime: data.time,
        reason: data.reason,
        status: 'ĐÃ XÁC NHẬN' // Admin tạo thì tự động xác nhận luôn
      }
    });

    return { success: true, message: 'Tạo lịch khám thành công!' };
  } catch (error) {
    return { success: false, message: 'Lỗi khi tạo lịch khám' };
  }
}

// 3. ADMIN CẬP NHẬT TRẠNG THÁI (HỦY LỊCH)
export async function updateAdminAppointmentStatus(id: number, newStatus: string) {
  try {
    await prisma.appointment.update({
      where: { id },
      data: { status: newStatus }
    });
    return { success: true, message: `Đã cập nhật trạng thái thành: ${newStatus}` };
  } catch (error) {
    return { success: false, message: 'Lỗi cập nhật trạng thái' };
  }
}