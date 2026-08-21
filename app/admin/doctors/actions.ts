// app/actions/admin-doctors.ts
'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// 1. LẤY DANH SÁCH BÁC SĨ & KPI
export async function getAdminDoctorsData() {
  try {
    const doctors = await prisma.user.findMany({
      where: { role: 'DOCTOR' },
      include: {
        doctorProfile: true,
        appointmentsAsDoctor: true,
      }
    });

    const formattedDoctors = doctors.map(doc => {
      let age = 30; 
      if (doc.dob) {
        const year = doc.dob.split('/')[2];
        if (year) age = new Date().getFullYear() - parseInt(year);
      }

      const totalExams = doc.appointmentsAsDoctor.length;
      const completed = doc.appointmentsAsDoctor.filter(a => a.status === 'HOÀN THÀNH').length;

      return {
        id: `BS${doc.id.toString().padStart(3, '0')}`,
        rawId: doc.id,
        name: doc.fullName,
        gender: doc.gender || 'Nam',
        age: age,
        
        // KÉO DỮ LIỆU THẬT TỪ TI DB ĐỂ LỌC
        specialty: doc.doctorProfile?.specialty || 'Chưa cập nhật',
        status: doc.doctorProfile?.status || 'Đang làm việc',
        
        phone: doc.phone || 'Chưa cập nhật',
        email: doc.email,
        rating: doc.doctorProfile?.rating || 5.0,
        totalExams: totalExams,
        completed: completed,
        onTime: '100%',
        room: 'Phòng Tiêu chuẩn',
        schedule: doc.doctorProfile?.schedule || [
          { day: 'Thứ 2', time: '08:00 - 17:00', room: 'Phòng 101' },
          { day: 'Thứ 4', time: '08:00 - 17:00', room: 'Phòng 101' },
        ],
        certificates: doc.doctorProfile?.certificates || [],
        avatar: doc.avatar || `https://ui-avatars.com/api/?name=${doc.fullName.replace(/ /g, '+')}&background=random`
      };
    });

    const todayStr = new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const todayAppts = await prisma.appointment.count({ where: { bookingDate: todayStr } });
    
    // Đếm số lượng bác sĩ đang làm việc / nghỉ phép
    const workingCount = formattedDoctors.filter(d => d.status === 'Đang làm việc').length;
    const leaveCount = formattedDoctors.filter(d => d.status === 'Nghỉ phép').length;
    const specialties = new Set(formattedDoctors.map(d => d.specialty).filter(s => s !== 'Chưa cập nhật'));

    const avgRating = formattedDoctors.length > 0 
      ? (formattedDoctors.reduce((sum, d) => sum + d.rating, 0) / formattedDoctors.length).toFixed(1)
      : '0.0';

    return {
      success: true,
      data: {
        doctors: formattedDoctors,
        kpis: {
          total: formattedDoctors.length,
          working: workingCount, 
          todayExams: todayAppts,
          avgRating: avgRating,
          specialties: specialties.size,
          onLeave: leaveCount
        }
      }
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Lỗi khi lấy dữ liệu bác sĩ' };
  }
}

// 2. THÊM BÁC SĨ MỚI
export async function addDoctor(data: { name: string, phone: string, email: string, dob: string, gender: string, specialty: string, status: string }) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt);

    await prisma.user.create({
      data: {
        fullName: data.name,
        email: data.email,
        phone: data.phone,
        dob: data.dob,
        gender: data.gender,
        passwordHash: hashedPassword,
        role: 'DOCTOR',
        doctorProfile: {
          create: {
            specialty: data.specialty,
            status: data.status, // LƯU TRẠNG THÁI VÀO DB
            experience: '5', 
            rating: 5.0,
            price: 150000,
          }
        }
      }
    });

    return { success: true, message: 'Thêm bác sĩ thành công! Mật khẩu mặc định: 123456' };
  } catch (error: any) {
    if (error.code === 'P2002') return { success: false, message: 'Email này đã tồn tại!' };
    return { success: false, message: 'Lỗi server khi thêm bác sĩ.' };
  }
}

// 3. XÓA BÁC SĨ (Giữ nguyên)
export async function deleteDoctor(userId: number) {
  try {
    await prisma.$transaction([
      prisma.doctorProfile.deleteMany({ where: { userId } }),
      prisma.user.delete({ where: { id: userId } })
    ]);
    return { success: true, message: 'Đã xóa bác sĩ!' };
  } catch (error) {
    return { success: false, message: 'Không thể xóa bác sĩ này.' };
  }
}