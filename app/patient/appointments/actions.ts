// app/actions/appointment.ts
'use server';

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

// 1. Lấy dữ liệu khởi tạo cho trang Đặt lịch Bệnh nhân
export async function getPatientAppointmentData() {
  try {
    const cookieStore = await cookies();
    const userIdStr = cookieStore.get('user_id')?.value;
    if (!userIdStr) return { success: false, message: 'Chưa đăng nhập' };
    
    const userId = parseInt(userIdStr);

    const [user, doctors, history] = await Promise.all([
      // Lấy thông tin user hiện tại
      prisma.user.findUnique({ 
        where: { id: userId },
        select: { fullName: true, patientCode: true } 
      }),
      // Lấy danh sách bác sĩ
      prisma.user.findMany({
        where: { role: 'DOCTOR' },
        include: { doctorProfile: true }
      }),
      // Lấy lịch sử khám của bệnh nhân
      prisma.appointment.findMany({
        where: { patientId: userId },
        orderBy: { createdAt: 'desc' },
        include: { doctor: { select: { fullName: true } } }
      })
    ]);

    return { success: true, data: { user, doctors, history } };
  } catch (error) {
    console.error('Lỗi lấy dữ liệu đặt lịch:', error);
    return { success: false, message: 'Lỗi server' };
  }
}

// 2. Lấy các khung giờ ĐÃ BỊ ĐẶT của 1 bác sĩ trong 1 ngày cụ thể
export async function getBookedTimes(doctorId: number, date: string) {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { doctorId, bookingDate: date, status: { not: 'ĐÃ HỦY' } },
      select: { bookingTime: true }
    });
    return { success: true, bookedTimes: appointments.map(a => a.bookingTime) };
  } catch (error) {
    return { success: false, bookedTimes: [] };
  }
}

// 3. XÁC NHẬN ĐẶT LỊCH (Lưu vào Database)
export async function createAppointment(data: { doctorId: number, specialty: string, date: string, time: string, reason: string }) {
  try {
    const cookieStore = await cookies();
    const userIdStr = cookieStore.get('user_id')?.value;
    if (!userIdStr) return { success: false, message: 'Chưa đăng nhập' };

    // Kiểm tra chống trùng lịch (nhỡ có ai vừa đặt trước vài giây)
    const existing = await prisma.appointment.findFirst({
      where: { doctorId: data.doctorId, bookingDate: data.date, bookingTime: data.time, status: { not: 'ĐÃ HỦY' } }
    });

    if (existing) {
      return { success: false, message: 'Khung giờ này vừa có người đặt. Vui lòng chọn giờ khác!' };
    }

    // Tạo lịch mới
    const newApt = await prisma.appointment.create({
      data: {
        patientId: parseInt(userIdStr),
        doctorId: data.doctorId,
        specialty: data.specialty,
        bookingDate: data.date,
        bookingTime: data.time,
        reason: data.reason,
        status: 'CHỜ XÁC NHẬN'
      }
    });

    // Trả về mã lịch khám
    return { success: true, appointmentCode: `LK260${newApt.id}` };
  } catch (error) {
    console.error('Lỗi đặt lịch:', error);
    return { success: false, message: 'Không thể đặt lịch lúc này.' };
  }
}