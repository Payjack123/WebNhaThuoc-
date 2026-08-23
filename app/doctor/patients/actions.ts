'use server';

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function getDoctorPatientsData() {
  try {
    const cookieStore = await cookies();
    const userIdStr = cookieStore.get('user_id')?.value;
    if (!userIdStr) return { success: false, message: 'Chưa đăng nhập' };
    const doctorId = parseInt(userIdStr);

    // Lấy thông tin Bác sĩ đang đăng nhập (để hiển thị góc trên Header)
    const doctor = await prisma.user.findUnique({
      where: { id: doctorId },
      include: { doctorProfile: true }
    });

    if (!doctor) return { success: false, message: 'Không tìm thấy bác sĩ' };

    // 1. Lấy tất cả lịch khám của bác sĩ này
    // BỔ SUNG: patientId: { not: doctorId } -> LOẠI BỎ CHÍNH BÁC SĨ NẾU VÔ TÌNH ĐẶT LỊCH
    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId: doctorId,
        patientId: { not: doctorId } // <-- ĐÂY LÀ DÒNG CHỐNG BÁC SĨ HIỆN TRONG DANH SÁCH BỆNH NHÂN
      },
      include: {
        patient: {
          include: { 
            healthMetric: true,
            examinationsAsPatient: {
              orderBy: { createdAt: 'desc' },
              take: 1
            }
          }
        },
        examination: true
      },
      orderBy: { id: 'desc' }
    });

    if (appointments.length === 0) {
      return {
        success: true,
        data: {
          doctorInfo: {
            name: doctor.fullName,
            avatar: doctor.avatar || `https://ui-avatars.com/api/?name=${doctor.fullName.replace(/ /g, '+')}&background=172554&color=fff`,
            rating: doctor.doctorProfile?.rating || 5
          },
          patients: [],
          kpis: { total: 0, new: 0, inTreatment: 0, completed: 0 }
        }
      };
    }

    // 2. Lọc danh sách Bệnh nhân duy nhất (chỉ lấy Bệnh nhân thực sự)
    const uniquePatientsMap = new Map();
    const historyMap = new Map();

    appointments.forEach(apt => {
      const pId = apt.patientId;

      // Bỏ qua nếu bằng một cách nào đó ID bệnh nhân lại trùng với ID Bác sĩ
      if (pId === doctorId) return;

      if (!uniquePatientsMap.has(pId)) {
        let age = 'N/A';
        let dobStr = 'Chưa cập nhật';
        if (apt.patient.dob) {
          dobStr = apt.patient.dob;
          // Cố gắng tính tuổi từ dob (định dạng phổ biến có thể chứa '/')
          let year;
          if (dobStr.includes('/')) {
            year = dobStr.split('/')[2];
          } else if (dobStr.includes('-')) {
            year = dobStr.split('-')[0]; // Giả sử định dạng YYYY-MM-DD
          } else {
            year = dobStr.substr(-4); // Lấy 4 ký tự cuối làm năm nếu không rõ định dạng
          }

          if (year && !isNaN(parseInt(year))) {
            age = (new Date().getFullYear() - parseInt(year)).toString();
          }
        }

        // Find the latest examination for this patient
        let lastRecordId = apt.patient.examinationsAsPatient?.[0]?.id || null;

        uniquePatientsMap.set(pId, {
          id: apt.patient.id,
          code: apt.patient.patientCode || `BN${apt.patient.id.toString().padStart(4, '0')}`,
          name: apt.patient.fullName,
          age: age,
          dob: dobStr,
          gender: apt.patient.gender || 'Nam',
          phone: apt.patient.phone || 'Chưa cập nhật',
          email: apt.patient.email || 'Chưa cập nhật',
          blood: apt.patient.healthMetric?.bloodPressure ? 'Có dữ liệu' : 'Chưa đo',
          address: apt.patient.address || 'Chưa cập nhật',
          spec: apt.specialty || 'Nội tổng quát',
          lastVisit: apt.bookingDate,
          status: apt.status === 'HOÀN THÀNH' ? 'Đã khỏi' : apt.status === 'ĐÃ XÁC NHẬN' ? 'Tái khám' : 'Đang điều trị',
          statusColor: apt.status === 'HOÀN THÀNH' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-blue-100 text-blue-700 border-blue-200',
          lastRecordId: lastRecordId
        });

        historyMap.set(pId, []);
      }

      historyMap.get(pId).push({
        id: `LK${apt.id}`,
        date: apt.bookingDate,
        time: apt.bookingTime,
        dept: apt.specialty,
        status: apt.status,
      });
    });

    const formattedPatients = Array.from(uniquePatientsMap.values());

    formattedPatients.forEach(p => {
      p.history = historyMap.get(p.id);
    });

    // 3. Thống kê KPI
    const todayStr = new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    let inTreatment = 0;
    let completedCount = 0;

    formattedPatients.forEach(p => {
      if (p.status === 'Đang điều trị' || p.status === 'Tái khám') inTreatment++;
      if (p.status === 'Đã khỏi') completedCount++;
    });

    const newToday = appointments.filter(a => a.bookingDate === todayStr).length;

    return {
      success: true,
      data: {
        doctorInfo: {
          name: doctor.fullName,
          avatar: doctor.avatar || `https://ui-avatars.com/api/?name=${doctor.fullName.replace(/ /g, '+')}&background=172554&color=fff`,
          rating: doctor.doctorProfile?.rating || 5
        },
        patients: formattedPatients,
        kpis: {
          total: formattedPatients.length,
          new: newToday,
          inTreatment: inTreatment,
          completed: completedCount
        }
      }
    };
  } catch (error) {
    console.error('Lỗi Backend:', error);
    return { success: false, message: 'Lỗi khi lấy dữ liệu bệnh nhân' };
  }
}