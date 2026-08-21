'use server';

import prisma from '@/lib/prisma';

// 1. LẤY DANH SÁCH ĐƠN THUỐC CHO ADMIN
export async function getAdminPrescriptionsData() {
  try {
    // Kéo toàn bộ đơn thuốc kèm theo chi tiết thuốc, bệnh nhân và thông tin bác sĩ
    const prescriptions = await prisma.prescription.findMany({
      include: {
        patient: true,
        items: true,
        doctor: { include: { doctorProfile: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    let total = prescriptions.length;
    let dispensed = 0;
    let waiting = 0;
    let canceled = 0;
    let todayCount = 0;

    const todayStr = new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

    const formattedPrescriptions = prescriptions.map(p => {
      const doctorName = p.doctor ? `BS. ${p.doctor.fullName}` : 'Chưa xác định';
      const specialty = p.doctor?.doctorProfile?.specialty || 'Đa khoa';
      const diagnosis = p.diagnosis || 'Chưa có chẩn đoán';

      // Lấy trạng thái thật từ CSDL
      let status = p.status || 'Chờ phát';
      
      // Tự động hủy nếu quá 30 ngày và chưa phát
      const daysOld = (new Date().getTime() - p.createdAt.getTime()) / (1000 * 3600 * 24);
      if (status === 'Chờ phát' && daysOld > 30) status = 'Đã hủy'; 

      // Map sang trạng thái hiển thị
      let displayStatus = 'Chờ xử lý';
      let statusColor = 'text-yellow-700 bg-yellow-100';
      
      if (status === 'Đã phát') {
        displayStatus = 'Đã hoàn thành';
        statusColor = 'text-green-700 bg-green-100';
        dispensed++;
      } else if (status === 'Đã hủy') {
        displayStatus = 'Đã hủy';
        statusColor = 'text-red-700 bg-red-100';
        canceled++;
      } else {
        waiting++;
      }

      const createdDateStr = p.createdAt.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
      if (createdDateStr === todayStr) todayCount++;
      
      const timeStr = p.createdAt.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
      const fullDateStr = `${createdDateStr} ${timeStr}`;

      let age = 'N/A';
      if (p.patient.dob) {
         const year = p.patient.dob.split('/')[2];
         if (year) age = (new Date().getFullYear() - parseInt(year)).toString();
      }

      const patientAvatar = p.patient.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.patient.fullName)}&background=random`;
      const doctorAvatar = p.doctor?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(doctorName)}&background=random`;

      return {
        id: p.id,
        code: p.code,
        patient: p.patient.fullName,
        patientAvatar: patientAvatar,
        patientId: p.patient.patientCode || `BN${p.patient.id.toString().padStart(4, '0')}`,
        age: age,
        gender: p.patient.gender || 'Nam',
        doctor: doctorName,
        doctorAvatar: doctorAvatar,
        specialty: specialty,
        diagnosis: diagnosis,
        date: fullDateStr,
        rawDate: p.createdAt.toISOString(),
        drugCount: p.items.length,
        status: displayStatus,
        statusColor: statusColor,
        medicines: p.items.map(item => ({
          name: item.medicationName,
          dosage: item.dosage,
          duration: item.remaining || 'Theo chỉ định',
          note: item.instructions || 'Uống đúng liều'
        })),
        instructions: [
          'Thuốc được kê điện tử từ hệ thống.',
          'Kiểm tra kỹ hạn sử dụng trước khi phát.',
          'Hướng dẫn bệnh nhân dùng thuốc theo ghi chú.'
        ]
      };
    });

    const kpis = {
      total,
      dispensed,
      waiting,
      canceled,
      todayCount,
      dispensedPercent: total > 0 ? ((dispensed / total) * 100).toFixed(1) : '0.0',
      waitingPercent: total > 0 ? ((waiting / total) * 100).toFixed(1) : '0.0',
      canceledPercent: total > 0 ? ((canceled / total) * 100).toFixed(1) : '0.0'
    };

    // Filter lists
    const uniqueDoctors = Array.from(new Set(formattedPrescriptions.map(p => p.doctor)));
    const uniquePatients = Array.from(new Set(formattedPrescriptions.map(p => p.patient)));

    return {
      success: true,
      data: {
        prescriptions: formattedPrescriptions,
        kpis,
        filterData: {
          doctors: uniqueDoctors,
          patients: uniquePatients
        }
      }
    };
  } catch (error) {
    console.error('Lỗi khi lấy đơn thuốc admin:', error);
    return { success: false, message: 'Lỗi máy chủ' };
  }
}