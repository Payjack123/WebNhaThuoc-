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
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, fullName: true, patientProfile: true } });
    if (user && (!user.patientProfile?.patientCode || user.patientProfile?.patientCode === 'BN-NEW')) {
      const generatedCode = `BN${new Date().getFullYear().toString().slice(-2)}${user.id.toString().padStart(4, '0')}`;
      await prisma.patientProfile.upsert({
        where: { userId: userId },
        update: { patientCode: generatedCode },
        create: { userId: userId, patientCode: generatedCode }
      });
    }

    const [metric, appointments, prescriptions, labTests] = await Promise.all([
      prisma.healthMetric.findUnique({ where: { patientId: userId } }),
      
      // ĐÃ SỬA: Dùng createdAt để sắp xếp, và lấy thêm thông tin Bác sĩ
      prisma.appointment.findMany({ 
        where: { patientId: userId }, 
        orderBy: { createdAt: 'desc' }, 
        take: 5,
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