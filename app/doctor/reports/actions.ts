'use server';

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function getReportsData() {
  try {
    const cookieStore = await cookies();
    const userIdStr = cookieStore.get('user_id')?.value;
    if (!userIdStr) return { success: false, message: 'Chưa đăng nhập' };
    const doctorId = parseInt(userIdStr);

    const doctor = await prisma.user.findUnique({
      where: { id: doctorId },
      include: { doctorProfile: true }
    });

    if (!doctor) return { success: false, message: 'Không tìm thấy tài khoản' };

    // 1. TÍNH TOÁN KPI TỔNG QUAN (Toàn phòng khám)
    const totalPatients = await prisma.user.count({ where: { role: 'PATIENT' } });
    const totalAppointments = await prisma.appointment.count();
    const completedAppointments = await prisma.appointment.count({ where: { status: 'HOÀN THÀNH' } });
    const totalPrescriptions = await prisma.prescription.count();
    const totalLabTests = await prisma.labTest.count();

    // Tính tỷ lệ hoàn thành
    const completionRate = totalAppointments > 0 ? Math.round((completedAppointments / totalAppointments) * 100) : 0;

    // Tính doanh thu (Dựa vào số ca HOÀN THÀNH * Giá tiền của bác sĩ đó)
    const completedApptsData = await prisma.appointment.findMany({
      where: { status: 'HOÀN THÀNH' },
      include: { doctor: { include: { doctorProfile: true } } }
    });
    
    const totalRevenue = completedApptsData.reduce((sum, apt) => {
      return sum + (apt.doctor.doctorProfile?.price || 150000); // Mặc định 150k nếu không có giá
    }, 0);

    // 2. LẤY TOP BÁC SĨ (Dựa vào số ca khám)
    const topDoctors = await prisma.user.findMany({
      where: { role: 'DOCTOR' },
      include: {
        _count: { select: { appointmentsAsDoctor: true } },
        doctorProfile: true
      },
      orderBy: {
        appointmentsAsDoctor: { _count: 'desc' }
      },
      take: 4
    });

    const formattedTopDoctors = topDoctors.map(doc => ({
      id: doc.id,
      name: `BS. ${doc.fullName}`,
      count: doc._count.appointmentsAsDoctor,
      rating: doc.doctorProfile?.rating || 5.0
    }));

    // 3. LẤY TOP THUỐC ĐƯỢC KÊ NHIỀU NHẤT
    const topMedicines = await prisma.prescriptionItem.groupBy({
      by: ['medicationName'],
      _count: { medicationName: true },
      orderBy: { _count: { medicationName: 'desc' } },
      take: 4
    });

    const formattedTopMedicines = topMedicines.map(med => ({
      name: med.medicationName,
      count: med._count.medicationName,
      status: med._count.medicationName > 50 ? 'Còn hàng' : 'Đang tiêu thụ' // Giả lập trạng thái kho
    }));

    // 4. TỶ TRỌNG CHUYÊN KHOA
    const specialtyGroups = await prisma.appointment.groupBy({
      by: ['specialty'],
      _count: { specialty: true }
    });

    // Lọc ra top 3 chuyên khoa lớn nhất, còn lại gộp vào "Khác"
    specialtyGroups.sort((a, b) => b._count.specialty - a._count.specialty);
    
    let formattedSpecialties = [];
    if (totalAppointments === 0) {
      formattedSpecialties = [
        { name: 'Nội tổng quát', percent: 0, color: 'bg-[#2563EB]' }
      ];
    } else {
      const colors = ['bg-[#2563EB]', 'bg-green-500', 'bg-yellow-500', 'bg-gray-400'];
      let otherCount = 0;
      
      for (let i = 0; i < specialtyGroups.length; i++) {
        if (i < 3) {
          formattedSpecialties.push({
            name: specialtyGroups[i].specialty || 'Đa khoa',
            percent: Math.round((specialtyGroups[i]._count.specialty / totalAppointments) * 100),
            color: colors[i]
          });
        } else {
          otherCount += specialtyGroups[i]._count.specialty;
        }
      }

      if (otherCount > 0) {
        formattedSpecialties.push({
          name: 'Khác',
          percent: Math.round((otherCount / totalAppointments) * 100),
          color: colors[3]
        });
      }
    }

    return {
      success: true,
      data: {
        doctorInfo: {
          name: doctor.fullName,
          avatar: doctor.avatar || `https://ui-avatars.com/api/?name=${doctor.fullName.replace(/ /g, '+')}&background=172554&color=fff`,
          rating: doctor.doctorProfile?.rating || 5.0
        },
        kpis: {
          patients: totalPatients,
          appointments: totalAppointments,
          completionRate: completionRate,
          prescriptions: totalPrescriptions,
          labTests: totalLabTests,
          revenue: (totalRevenue / 1000000).toFixed(1) // Quy ra Triệu VNĐ
        },
        topDoctors: formattedTopDoctors,
        topMedicines: formattedTopMedicines,
        specialties: formattedSpecialties
      }
    };
  } catch (error) {
    console.error('Lỗi tính toán báo cáo:', error);
    return { success: false, message: 'Lỗi server' };
  }
}