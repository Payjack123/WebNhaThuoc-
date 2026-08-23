'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// 1. LẤY DANH SÁCH BỆNH NHÂN & KPI
export async function getAdminPatientsData() {
  try {
    const patients = await prisma.user.findMany({
      where: { role: 'PATIENT' },
      include: {
        patientProfile: true,
        appointmentsAsPatient: {
          orderBy: { createdAt: 'desc' },
          take: 1
        },
        examinationsAsPatient: true
      },
      orderBy: { createdAt: 'desc' }
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let activeCount = 0;
    let registeredToday = 0;
    let inTreatment = 0;
    let hasRecords = 0;

    const formattedPatients = patients.map(p => {
      // Tính tuổi
      let age = 0;
      if (p.dob) {
        const year = p.dob.split('/')[2];
        if (year) age = new Date().getFullYear() - parseInt(year);
      }

      // Thống kê KPI
      if (p.status === 'Hoạt động') activeCount++;
      if (new Date(p.createdAt) >= today) registeredToday++;
      if (p.status === 'Đang điều trị') inTreatment++;
      if (p.examinationsAsPatient.length > 0) hasRecords++;

      const lastVisit = p.appointmentsAsPatient.length > 0 
        ? p.appointmentsAsPatient[0].bookingDate 
        : 'Chưa khám';

      return {
        id: p.id,
        patientCode: p.patientProfile?.patientCode || `BN${p.id.toString().padStart(4, '0')}`,
        name: p.fullName,
        gender: p.gender || 'Nam',
        age: age || 'N/A',
        phone: p.phone || 'Chưa cập nhật',
        email: p.email || 'Chưa cập nhật',
        address: p.address || 'Chưa cập nhật',
        cccd: p.patientProfile?.cccd || 'Chưa cập nhật',
        bhyt: p.patientProfile?.bhyt || 'Chưa cập nhật',
        lastVisit: lastVisit,
        status: p.status || 'Hoạt động',
        avatar: p.avatar || `https://ui-avatars.com/api/?name=${p.fullName.replace(/ /g, '+')}&background=random`
      };
    });

    return {
      success: true,
      data: {
        patients: formattedPatients,
        kpis: {
          total: patients.length,
          active: activeCount,
          today: registeredToday,
          inTreatment: inTreatment,
          unpaid: 0, // Tính năng thanh toán sẽ cập nhật sau
          hasRecords: hasRecords
        }
      }
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Lỗi server khi lấy dữ liệu' };
  }
}

// 2. THÊM BỆNH NHÂN MỚI
export async function addPatient(data: any) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt); // Mật khẩu mặc định

    const newPatient = await prisma.user.create({
      data: {
        fullName: data.name,
        email: data.email || `${data.phone}@clinic.local`,
        phone: data.phone,
        dob: data.dob,
        gender: data.gender,
        address: data.address,
        status: data.status,
        passwordHash: hashedPassword,
        role: 'PATIENT',
      }
    });

    // Tạo PatientProfile với patientCode, cccd, bhyt
    await prisma.patientProfile.create({
      data: {
        userId: newPatient.id,
        patientCode: `BN${newPatient.id.toString().padStart(4, '0')}`,
        cccd: data.cccd || null,
        bhyt: data.bhyt || null,
      }
    });

    return { success: true, message: 'Thêm bệnh nhân thành công! Mật khẩu mặc định: 123456' };
  } catch (error: any) {
    if (error.code === 'P2002') return { success: false, message: 'Email hoặc SĐT đã tồn tại!' };
    return { success: false, message: 'Lỗi server khi thêm bệnh nhân.' };
  }
}

// 3. KHÓA / MỞ KHÓA TÀI KHOẢN BỆNH NHÂN
export async function togglePatientStatus(patientId: number, currentStatus: string) {
  try {
    const newStatus = currentStatus === 'Khóa tài khoản' ? 'Hoạt động' : 'Khóa tài khoản';
    await prisma.user.update({
      where: { id: patientId },
      data: { status: newStatus }
    });
    return { success: true, message: `Đã ${newStatus === 'Hoạt động' ? 'mở khóa' : 'khóa'} tài khoản bệnh nhân!` };
  } catch (error) {
    return { success: false, message: 'Lỗi khi cập nhật trạng thái.' };
  }
}