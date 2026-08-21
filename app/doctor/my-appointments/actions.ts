'use server';

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function getAllDoctorAppointments() {
  try {
    const cookieStore = await cookies();
    const userIdStr = cookieStore.get('user_id')?.value;
    if (!userIdStr) return { success: false, message: 'Chưa đăng nhập' };
    const doctorId = parseInt(userIdStr);

    const doctor = await prisma.user.findUnique({
      where: { id: doctorId },
      include: { doctorProfile: true }
    });

    if (!doctor) return { success: false, message: 'Không tìm thấy bác sĩ' };

    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId: doctorId
      },
      include: {
        patient: true 
      }
      // Note: Removed string-based orderBy on bookingDate because it sorts '20/08' after '01/09' incorrectly. We will sort in JS instead.
    });

    let completed = 0;
    let upcoming = 0;
    let canceled = 0;

    const formattedAppointments = appointments.map(apt => {
      // Logic from image: "Đã hoàn thành", "Sắp tới", "Đã hủy"
      if (apt.status === 'HOÀN THÀNH') completed++;
      else if (apt.status === 'ĐÃ HỦY') canceled++;
      else upcoming++; // Any other status is Upcoming (Sắp tới/Chờ xác nhận)

      let age = 'N/A';
      if (apt.patient.dob) {
         const year = apt.patient.dob.split('/')[2];
         if (year) age = (new Date().getFullYear() - parseInt(year)).toString();
      }

      let parsedNote = apt.reason || '';
      let patientDetails = null;

      if (parsedNote.startsWith('Người khám: ')) {
        const parts = parsedNote.split('. Lý do: ');
        const patientPart = parts[0]; 
        parsedNote = parts[1] || '';

        const subParts = patientPart.split(' - ');
        patientDetails = {
          name: subParts.find((p: string) => p.startsWith('Người khám: '))?.replace('Người khám: ', '') || '',
          cccd: subParts.find((p: string) => p.startsWith('CCCD: '))?.replace('CCCD: ', '') || '',
          phone: subParts.find((p: string) => p.startsWith('SĐT: '))?.replace('SĐT: ', '') || '',
          address: subParts.find((p: string) => p.startsWith('ĐC: '))?.replace('ĐC: ', '') || ''
        };
      }

      let uiStatus = 'Sắp tới';
      if (apt.status === 'HOÀN THÀNH') uiStatus = 'Đã hoàn thành';
      else if (apt.status === 'ĐÃ HỦY') uiStatus = 'Đã hủy';

      // Parse bookingDate (dd/MM/yyyy) into weekday
      let dateWithDay = apt.bookingDate;
      if (apt.bookingDate) {
        const parts = apt.bookingDate.split('/');
        if (parts.length === 3) {
          const [d, m, y] = parts;
          const dateObj = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
          if (!isNaN(dateObj.getTime())) {
            const weekday = dateObj.toLocaleDateString('vi-VN', { weekday: 'long' });
            dateWithDay = `${apt.bookingDate}\n${weekday}`;
          }
        }
      }

      return {
        id: apt.id,
        patientName: apt.patient.fullName,
        patientCode: apt.patient.patientCode || `BN-${apt.patient.id}`,
        gender: apt.patient.gender || 'Nam',
        age: age,
        time: apt.bookingTime, 
        date: apt.bookingDate,
        dateWithDay,
        status: uiStatus,
        rawStatus: apt.status,
        reason: parsedNote || 'Khám bệnh',
        patientDetails,
        room: doctor.doctorProfile?.specialty || 'Phòng khám',
        avatar: apt.patient.avatar || `https://ui-avatars.com/api/?name=${apt.patient.fullName.replace(/ /g, '+')}&background=random`
      };
    });

    const sortedAppointments = formattedAppointments.sort((a, b) => {
      // Parse dates from DD/MM/YYYY to Date objects
      const parseDate = (dStr: string) => {
        const parts = dStr.split('/');
        if (parts.length === 3) {
          return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0])).getTime();
        }
        return 0;
      };

      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);

      if (dateA !== dateB) {
        return dateB - dateA; // Newest first (descending)
      }
      
      // If same date, sort by time (e.g. 15:30 > 08:00)
      if (a.time && b.time) {
        return b.time.localeCompare(a.time); // Newest time first
      }
      return 0;
    });

    return {
      success: true,
      data: {
        stats: {
          total: appointments.length,
          completed,
          upcoming,
          canceled
        },
        appointments: sortedAppointments
      }
    };
  } catch (error) {
    console.error('Lỗi lấy dữ liệu lịch khám:', error);
    return { success: false, message: 'Lỗi máy chủ' };
  }
}
