'use server';

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

// 1. LẤY TOÀN BỘ CẤU HÌNH VÀ NHẬT KÝ
export async function getAdminSettingsData() {
  try {
    const cookieStore = await cookies();
    const userIdStr = cookieStore.get('user_id')?.value;
    if (!userIdStr) return { success: false, message: 'Chưa đăng nhập' };

    // Lấy cấu hình
    const settings = await prisma.systemSetting.findMany();
    
    // Chuyển mảng Key-Value thành Object để Frontend dễ dùng
    const configMap: Record<string, string> = {};
    settings.forEach(s => {
      configMap[s.key] = s.value;
    });

    // Cung cấp các giá trị mặc định nếu Database trống (mới khởi tạo)
    const defaultConfig = {
      clinic_name: configMap['clinic_name'] || 'Healthcare Clinic',
      hotline: configMap['hotline'] || '1900 1234',
      address: configMap['address'] || '123 Nguyễn Trãi, Thanh Xuân, Hà Nội',
      email: configMap['email'] || 'contact@healthcare.vn',
      website: configMap['website'] || 'www.healthcare.vn',
      appt_duration: configMap['appt_duration'] || '30 Phút',
      appt_max_patients: configMap['appt_max_patients'] || '25',
      appt_cancel_limit: configMap['appt_cancel_limit'] || 'Trước 24 giờ',
      smtp_server: configMap['smtp_server'] || 'smtp.gmail.com',
      smtp_port: configMap['smtp_port'] || '587',
      sms_brandname: configMap['sms_brandname'] || 'HEALTHCARE'
    };

    // Lấy nhật ký hệ thống (20 hành động gần nhất)
    const logs = await prisma.systemLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20
    });

    const formattedLogs = logs.map(log => ({
      id: log.id,
      time: new Date(log.createdAt).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' }),
      user: log.user,
      action: log.action
    }));

    return { 
      success: true, 
      data: { config: defaultConfig, logs: formattedLogs } 
    };
  } catch (error) {
    console.error('Lỗi lấy settings:', error);
    return { success: false, message: 'Lỗi server' };
  }
}

// 2. LƯU CẬP NHẬT CẤU HÌNH VÀO DB
export async function updateAdminSettingsData(settingsDict: Record<string, string>) {
  try {
    // Dùng vòng lặp upsert (Cập nhật nếu đã có, Tạo mới nếu chưa có)
    for (const [key, value] of Object.entries(settingsDict)) {
      await prisma.systemSetting.upsert({
        where: { key: key },
        update: { value: String(value) },
        create: { key: key, value: String(value), description: 'System config' }
      });
    }

    // Ghi log hành động
    await prisma.systemLog.create({
      data: {
        action: 'Cập nhật cấu hình hệ thống',
        user: 'Admin (System)'
      }
    });

    return { success: true, message: 'Đã lưu cấu hình thành công!' };
  } catch (error) {
    console.error('Lỗi lưu settings:', error);
    return { success: false, message: 'Lỗi khi lưu cấu hình' };
  }
}