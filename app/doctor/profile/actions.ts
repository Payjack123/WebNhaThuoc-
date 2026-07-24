// app/actions/doctor-profile.ts
'use server';

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

// ==========================================
// 1. HÀM LẤY DỮ LIỆU HỒ SƠ BÁC SĨ
// ==========================================
export async function getDoctorProfileData(targetDoctorId?: number) {
  try {
    let doctorIdToFetch = targetDoctorId;

    if (!doctorIdToFetch) {
      const cookieStore = await cookies();
      const userIdStr = cookieStore.get('user_id')?.value;
      if (!userIdStr) return { success: false, message: 'Chưa đăng nhập' };
      doctorIdToFetch = parseInt(userIdStr);
    }

    const doctor = await prisma.user.findUnique({
      where: { id: doctorIdToFetch },
      include: {
        doctorProfile: true,
        appointmentsAsDoctor: { select: { id: true, status: true } },
      }
    });

    if (!doctor) {
      return { success: false, message: 'Không tìm thấy tài khoản bác sĩ' };
    }

    const uniquePatients = new Set(await prisma.appointment.findMany({
      where: { doctorId: doctor.id },
      select: { patientId: true }
    }));

    const dProfile = doctor.doctorProfile || {
      specialty: 'Chưa cập nhật',
      degree: 'Chưa cập nhật',
      university: 'Chưa cập nhật',
      experience: '0',
      languages: 'Chưa cập nhật',
      rating: 5.0,
      certificates: null,
      schedule: null
    };

   // Map dữ liệu DB vào đúng format UI của bạn
    const profileData = {
      id: `DOC-${doctor.id.toString().padStart(3, '0')}`,
      fullName: doctor.fullName,
      email: doctor.email,
      phone: doctor.phone || 'Chưa cập nhật',
      dob: doctor.dob || 'Chưa cập nhật',
      gender: doctor.gender || 'Nam',
      address: doctor.address || 'Chưa cập nhật',
      avatar: doctor.avatar || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=250&h=250&fit=crop',
      
      // FIX LỖI: Dùng || để bắt các giá trị null từ Database cũ
      specialty: dProfile.specialty || 'Chưa cập nhật',
      degree: dProfile.degree || 'Chưa cập nhật',
      university: dProfile.university || 'Chưa cập nhật',
      experience: parseInt(dProfile.experience) || 0,
      languages: dProfile.languages || 'Chưa cập nhật',
      rating: dProfile.rating || 5.0,
      status: 'Đang làm việc',
      
      // Lấy từ JSON, nếu null thì gán mặc định để UI không lỗi
      certificates: dProfile.certificates || [
        { id: 1, name: 'Bằng Bác sĩ Đa khoa', year: '2015' }
      ],
      schedule: dProfile.schedule || [
        { day: 'Thứ 2', time: '07:30 - 17:00', room: 'Phòng 101' },
        { day: 'Thứ 4', time: '07:30 - 17:00', room: 'Phòng 201' },
      ],
      stats: {
        totalPatients: uniquePatients.size,
        totalAppointments: doctor.appointmentsAsDoctor.length,
        prescriptions: 0,
        completionRate: 100
      },
      reviews: [
        { id: 1, name: 'Trần Thị H.', rating: 5, comment: 'Bác sĩ rất tận tình!', date: '15/08/2026' }
      ]
    };

    return { success: true, data: profileData };
  } catch (error) {
    console.error('Lỗi khi lấy hồ sơ bác sĩ:', error);
    return { success: false, message: 'Lỗi server' };
  }
}

// ==========================================
// 2. HÀM CẬP NHẬT HỒ SƠ BÁC SĨ
// ==========================================
export async function updateDoctorProfileData(formData: any) {
  try {
    const cookieStore = await cookies();
    const userIdStr = cookieStore.get('user_id')?.value;
    if (!userIdStr) return { success: false, message: 'Chưa đăng nhập' };
    const doctorId = parseInt(userIdStr);

    // 1. Cập nhật thông tin cơ bản trong bảng User
    await prisma.user.update({
      where: { id: doctorId },
      data: {
        phone: formData.phone,
        dob: formData.dob,
        gender: formData.gender,
        address: formData.address,
      }
    });

    // 2. Cập nhật (hoặc Tạo mới) thông tin chuyên môn trong bảng DoctorProfile
    await prisma.doctorProfile.upsert({
      where: { userId: doctorId },
      update: {
        specialty: formData.specialty,
        experience: formData.experience.toString(),
        degree: formData.degree,
        university: formData.university,
        languages: formData.languages,
      },
      create: {
        userId: doctorId,
        specialty: formData.specialty,
        experience: formData.experience.toString(),
        degree: formData.degree,
        university: formData.university,
        languages: formData.languages,
        rating: 5.0,
        price: 150000,
        imagePrefix: "B"
      }
    });

    return { success: true, message: 'Cập nhật hồ sơ thành công!' };
  } catch (error) {
    console.error('Lỗi khi cập nhật hồ sơ:', error);
    return { success: false, message: 'Lỗi server khi lưu dữ liệu' };
  }
}