'use server';

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

// 1. LẤY THÔNG TIN CÁ NHÂN TỪ DB
export async function getPatientSettingsData() {
  try {
    const cookieStore = await cookies();
    const userIdStr = cookieStore.get('user_id')?.value;
    
    if (!userIdStr) return { success: false, message: 'Chưa đăng nhập' };
    const patientId = parseInt(userIdStr, 10);

    let patient = await prisma.user.findUnique({
      where: { id: patientId }
    });

    if (!patient) return { success: false, message: 'Không tìm thấy tài khoản' };

    if (!patient.patientCode || patient.patientCode === 'BN-NEW') {
      const generatedCode = `BN${new Date().getFullYear().toString().slice(-2)}${patient.id.toString().padStart(4, '0')}`;
      await prisma.user.update({
        where: { id: patientId },
        data: { patientCode: generatedCode }
      });
      patient.patientCode = generatedCode;
    }

    return {
      success: true,
      data: {
        id: patient.id,
        patientCode: patient.patientCode || `BN${patient.id.toString().padStart(4, '0')}`,
        fullName: patient.fullName,
        email: patient.email,
        phone: patient.phone || '',
        dob: patient.dob || '',
        gender: patient.gender || 'Nam',
        cccd: patient.cccd || '',
        address: patient.address || '',
        avatar: patient.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(patient.fullName)}&background=2563EB&color=fff&size=128`,
      }
    };
  } catch (error) {
    console.error('Lỗi lấy thông tin cài đặt:', error);
    return { success: false, message: 'Lỗi máy chủ' };
  }
}

// 2. CẬP NHẬT HỒ SƠ CÁ NHÂN
export async function updatePatientProfile(data: any) {
  try {
    const cookieStore = await cookies();
    const userIdStr = cookieStore.get('user_id')?.value;
    if (!userIdStr) return { success: false, message: 'Chưa đăng nhập' };
    const patientId = parseInt(userIdStr, 10);

    // Cập nhật thông tin vào bảng User
    await prisma.user.update({
      where: { id: patientId },
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        dob: data.dob,
        gender: data.gender,
        cccd: data.cccd,
        address: data.address,
      }
    });

    return { success: true, message: 'Cập nhật hồ sơ thành công!' };
  } catch (error: any) {
    console.error('Lỗi cập nhật hồ sơ:', error);
    if (error.code === 'P2002') return { success: false, message: 'Email đã tồn tại trong hệ thống!' };
    return { success: false, message: 'Lỗi khi cập nhật hồ sơ' };
  }
}

// 3. ĐỔI MẬT KHẨU
export async function updatePatientPassword(data: any) {
  try {
    const cookieStore = await cookies();
    const userIdStr = cookieStore.get('user_id')?.value;
    if (!userIdStr) return { success: false, message: 'Chưa đăng nhập' };
    const patientId = parseInt(userIdStr, 10);

    const user = await prisma.user.findUnique({ where: { id: patientId } });
    if (!user) return { success: false, message: 'Tài khoản không tồn tại' };

    // Kiểm tra mật khẩu hiện tại
    const isMatch = await bcrypt.compare(data.currentPassword, user.passwordHash);
    if (!isMatch) {
      return { success: false, message: 'Mật khẩu hiện tại không chính xác!' };
    }

    // Mã hóa mật khẩu mới
    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(data.newPassword, salt);

    // Cập nhật mật khẩu
    await prisma.user.update({
      where: { id: patientId },
      data: { passwordHash: newPasswordHash }
    });

    return { success: true, message: 'Đổi mật khẩu thành công!' };
  } catch (error) {
    console.error('Lỗi đổi mật khẩu:', error);
    return { success: false, message: 'Lỗi máy chủ khi đổi mật khẩu' };
  }
}