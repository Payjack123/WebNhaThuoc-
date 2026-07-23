// app/patient/dashboard/actions.ts
'use server';

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function getPatientDashboardData() {
  try {
    const cookieStore = await cookies();
    const userIdStr = cookieStore.get('user_id')?.value;
    
    if (!userIdStr) {
      return { success: false, message: 'Chưa đăng nhập' };
    }

    const userId = parseInt(userIdStr);

    // Truy vấn song song (Parallel Queries) để tối ưu tốc độ cho TiDB
    // Truy vấn song song (Parallel Queries) để tối ưu tốc độ cho TiDB
    const [user, metric, appointments, prescriptions, labTests] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId }, select: { fullName: true, patientCode: true } }),
      prisma.healthMetric.findUnique({ where: { patientId: userId } }),
      
      // ĐÃ SỬA: Dùng createdAt để sắp xếp, và lấy thêm thông tin Bác sĩ
      prisma.appointment.findMany({ 
        where: { patientId: userId }, 
        orderBy: { createdAt: 'desc' }, 
        take: 2,
        include: { doctor: { select: { fullName: true } } } 
      }),
      
      prisma.prescription.findFirst({ 
        where: { patientId: userId }, 
        orderBy: { createdAt: 'desc' },
        include: { items: true } 
      }),
      prisma.labTest.findMany({
        where: { patientId: userId },
        orderBy: { date: 'desc' },
        take: 3
      })
    ]);

    if (!user) return { success: false, message: 'Không tìm thấy người dùng' };

    return {
      success: true,
      data: {
        user,
        metric,
        appointments,
        prescription: prescriptions,
        labTests
      }
    };
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu Dashboard:', error);
    return { success: false, message: 'Lỗi máy chủ' };
  }
}