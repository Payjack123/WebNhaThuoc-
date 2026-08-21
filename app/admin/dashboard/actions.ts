// app/actions/admin.ts
'use server';

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function getAdminDashboardData() {
  try {
    // 1. Kiểm tra quyền Admin
    const cookieStore = await cookies();
    const userIdStr = cookieStore.get('user_id')?.value;
    const userRole = cookieStore.get('user_role')?.value;

    if (!userIdStr || userRole !== 'admin') {
      return { success: false, message: 'Không có quyền truy cập' };
    }

    // 2. Lấy các chỉ số KPI tổng quan (Truy vấn song song)
    const [
      totalPatients,
      totalAppointments,
      totalDoctors,
      totalPrescriptions,
      totalLabTests,
      specialties
    ] = await Promise.all([
      prisma.user.count({ where: { role: 'PATIENT' } }),
      prisma.appointment.count(),
      prisma.user.count({ where: { role: 'DOCTOR' } }),
      prisma.prescription.count(),
      prisma.labTest.count(),
      prisma.doctorProfile.findMany({ select: { specialty: true }, distinct: ['specialty'] })
    ]);

    const totalDepartments = specialties.filter(s => s.specialty).length;
    // Giả lập doanh thu = Tổng số lịch khám x 150.000đ (Bạn có thể đổi sang bảng Thanh toán sau này)
    const totalRevenue = totalAppointments * 150000; 

    // 3. Lấy Top Bác sĩ (Nhiều lịch khám nhất)
    const topDoctorsAgg = await prisma.appointment.groupBy({
      by: ['doctorId'],
      _count: { doctorId: true },
      orderBy: { _count: { doctorId: 'desc' } },
      take: 4
    });

    const topDoctors = await Promise.all(topDoctorsAgg.map(async (doc) => {
      const d = await prisma.user.findUnique({ where: { id: doc.doctorId } });
      return { name: d?.fullName || 'Bác sĩ ẩn danh', count: doc._count.doctorId };
    }));

    // 4. Lấy Top Bệnh (Triệu chứng / Chẩn đoán phổ biến nhất)
    const totalExams = await prisma.examination.count();
    const topDiseasesAgg = await prisma.examination.groupBy({
      by: ['diagnosis'],
      _count: { diagnosis: true },
      orderBy: { _count: { diagnosis: 'desc' } },
      take: 4
    });
    
    const topDiseases = topDiseasesAgg.map(d => ({
      name: d.diagnosis || 'Chưa cập nhật',
      percentage: totalExams > 0 ? Math.round((d._count.diagnosis / totalExams) * 100) : 0
    }));

    // 5. Tỷ trọng chuyên khoa (Dựa trên số lượng lịch hẹn)
    const apptsBySpec = await prisma.appointment.groupBy({
      by: ['specialty'],
      _count: { specialty: true },
      orderBy: { _count: { specialty: 'desc' } },
      take: 4
    });
    const specDistribution = apptsBySpec.map(s => ({
      name: s.specialty || 'Khác',
      percentage: totalAppointments > 0 ? Math.round((s._count.specialty / totalAppointments) * 100) : 0
    }));

    return {
      success: true,
      data: {
        kpis: {
          patients: totalPatients,
          appointments: totalAppointments,
          doctors: totalDoctors,
          prescriptions: totalPrescriptions,
          labTests: totalLabTests,
          departments: totalDepartments || 1,
          revenue: totalRevenue
        },
        topDoctors,
        topDiseases,
        specDistribution
      }
    };
  } catch (error) {
    console.error("Lỗi lấy dữ liệu Admin:", error);
    return { success: false, message: 'Lỗi máy chủ' };
  }
}