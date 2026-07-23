// app/actions/auth.ts
'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

// Tự định nghĩa kiểu để chống lỗi TypeScript
export type UserRole = 'PATIENT' | 'DOCTOR' | 'ADMIN';

// 1. HÀM ĐĂNG KÝ
export async function registerUser(fullName: string, email: string, password: string, roleInput: UserRole) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return { success: false, message: 'Email này đã được sử dụng!' };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: {
        fullName,
        email,
        passwordHash: hashedPassword,
        role: roleInput // Sẽ lưu là 'PATIENT', 'DOCTOR', hoặc 'ADMIN'
      }
    });

    return { success: true, message: 'Đăng ký thành công!' };
  } catch (error) {
    console.error('Lỗi đăng ký:', error);
    return { success: false, message: 'Lỗi hệ thống, vui lòng thử lại sau.' };
  }
}

// 2. HÀM ĐĂNG NHẬP
export async function loginUser(email: string, password: string, loginRole: UserRole) {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      return { success: false, message: 'Email không tồn tại trong hệ thống!' };
    }

    // So sánh quyền người dùng chọn với quyền trong Database
    if (user.role !== loginRole) {
      const roleName = loginRole === 'ADMIN' ? 'Quản trị viên' : loginRole === 'DOCTOR' ? 'Bác sĩ' : 'Bệnh nhân';
      return { success: false, message: `Tài khoản này không có quyền truy cập với vai trò ${roleName}!` };
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return { success: false, message: 'Mật khẩu không chính xác!' };
    }

    // Set cookie sau khi đăng nhập
    const cookieStore = await cookies();
    cookieStore.set('user_role', user.role.toLowerCase(), { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    cookieStore.set('user_id', user.id.toString(), { httpOnly: true, secure: process.env.NODE_ENV === 'production' });  

    // Trả về role chữ thường để Next.js điều hướng (patient, doctor, admin)
    return { success: true, role: user.role.toLowerCase(), name: user.fullName };
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    return { success: false, message: 'Lỗi hệ thống, vui lòng thử lại sau.' };
  }
}