'use server';

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function getDoctorAppointmentsData(selectedDate?: string) {
  try {
    const cookieStore = await cookies();
    const userIdStr = cookieStore.get('user_id')?.value;
    if (!userIdStr) return { success: false, message: 'Chưa đăng nhập' };
    const doctorId = parseInt(userIdStr);

    // 1. Xác định ngày cần lấy dữ liệu (Mặc định là hôm nay)
    const today = new Date();
    const dateStr = selectedDate || 
      `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

    // 2. Lấy thông tin Bác sĩ
    const doctor = await prisma.user.findUnique({
      where: { id: doctorId },
      include: { doctorProfile: true }
    });

    if (!doctor) return { success: false, message: 'Không tìm thấy bác sĩ' };

    // 3. Lấy danh sách lịch khám của Bác sĩ vào NGÀY ĐÃ CHỌN
    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId: doctorId,
        bookingDate: dateStr
      },
      include: {
        patient: true 
      },
      orderBy: {
        bookingTime: 'asc' // Sắp xếp giờ từ sáng đến chiều
      }
    });

    // 4. Tính toán thống kê
    let completed = 0;
    let waiting = 0;
    let canceled = 0;

    const formattedAppointments = appointments.map(apt => {
      if (apt.status === 'HOÀN THÀNH') completed++;
      else if (apt.status === 'ĐÃ HỦY') canceled++;
      else waiting++; 

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

      return {
        id: apt.id,
        patientName: apt.patient.fullName,
        patientCode: apt.patient.patientCode || `BN-${apt.patient.id}`,
        gender: apt.patient.gender || 'Nam',
        age: age,
        time: apt.bookingTime, 
        status: uiStatus,
        rawStatus: apt.status,
        reason: parsedNote || 'Khám bệnh',
        patientDetails,
        room: doctor.doctorProfile?.specialty || 'Phòng khám',
        avatar: apt.patient.avatar || `https://ui-avatars.com/api/?name=${apt.patient.fullName.replace(/ /g, '+')}&background=random`
      };
    });

    return {
      success: true,
      data: {
        doctorInfo: {
          name: doctor.fullName,
          rating: doctor.doctorProfile?.rating || 5.0,
          avatar: doctor.avatar || `https://ui-avatars.com/api/?name=${doctor.fullName.replace(/ /g, '+')}&background=172554&color=fff`
        },
        stats: {
          total: appointments.length,
          completed,
          waiting,
          canceled
        },
        appointments: formattedAppointments,
        currentDate: dateStr
      }
    };
  } catch (error) {
    console.error('Lỗi lấy dữ liệu lịch khám:', error);
    return { success: false, message: 'Lỗi máy chủ' };
  }
}