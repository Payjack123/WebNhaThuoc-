'use server';

import prisma from '@/lib/prisma';

export async function getAdminMedicalRecordsData() {
  try {
    // Kéo toàn bộ hồ sơ khám bệnh (Examination) từ TiDB
    const records = await prisma.examination.findMany({
      include: {
        appointment: true,
        patient: {
          include: {
            healthMetric: true,
            prescriptions: { include: { items: true }, orderBy: { createdAt: 'desc' }, take: 1 },
            labTests: { orderBy: { date: 'desc' } }
          }
        },
        doctor: {
          include: {
            doctorProfile: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Tính toán KPI
    let totalRecords = records.length;
    let createdToday = 0;
    let inTreatment = 0;
    let completed = 0;
    let uniqueDoctors = new Set();
    
    const todayStr = new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

    const formattedRecords = records.map(record => {
      const dateStr = new Date(record.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const timeStr = new Date(record.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

      // Cập nhật KPI
      if (dateStr === todayStr) createdToday++;
      if (record.appointment.status === 'HOÀN THÀNH') completed++;
      else inTreatment++;
      uniqueDoctors.add(record.doctorId);

      // Tính tuổi bệnh nhân
      let age = 'N/A';
      if (record.patient.dob) {
         const year = record.patient.dob.split('/')[2] || record.patient.dob.split('-')[0];
         if (year) age = (new Date().getFullYear() - parseInt(year)).toString();
      }

      // Xử lý trạng thái và màu sắc
      let status = record.appointment.status === 'HOÀN THÀNH' ? 'Hoàn thành' : 'Đang điều trị';
      let statusColor = status === 'Hoàn thành' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200';

      return {
        id: record.id,
        baCode: `BA-${new Date(record.createdAt).getFullYear().toString().slice(2)}${String(new Date(record.createdAt).getMonth()+1).padStart(2,'0')}-${record.id.toString().padStart(3, '0')}`,
        patient: record.patient.fullName,
        patientId: record.patient.patientCode || `BN${record.patient.id.toString().padStart(4, '0')}`,
        age: age,
        gender: record.patient.gender || 'Nam',
        bloodType: 'O+', // Có thể lấy từ HealthMetric nếu mở rộng DB
        bhyt: record.patient.bhyt ? 'Có' : 'Không',
        doctor: `BS. ${record.doctor.fullName}`,
        specialty: record.doctor.doctorProfile?.specialty || record.appointment.specialty || 'Nội tổng quát',
        date: dateStr,
        time: timeStr,
        status: status,
        statusColor: statusColor,
        diagnosis: record.diagnosis || 'Đang theo dõi',
        symptoms: record.symptoms || 'Không có ghi nhận',
        notes: record.notes || 'Không có ghi chú',
        vitals: {
          heartRate: record.patient.healthMetric?.heartRate || '--',
          bloodPressure: record.patient.healthMetric?.bloodPressure || '--/--',
          temperature: '37.0°C', 
          bmi: record.patient.healthMetric?.bmi || '--'
        },
        prescription: record.patient.prescriptions[0] || null,
        labTests: record.patient.labTests || [],
        createdAt: record.createdAt,
        updatedAt: record.updatedAt
      };
    });

    // Lấy danh sách chuyên khoa & bác sĩ để làm bộ lọc
    const doctorsList = Array.from(new Set(formattedRecords.map(r => r.doctor)));
    const specialtiesList = Array.from(new Set(formattedRecords.map(r => r.specialty)));

    return {
      success: true,
      data: {
        records: formattedRecords,
        filters: {
          doctors: doctorsList,
          specialties: specialtiesList
        },
        kpis: {
          total: totalRecords,
          createdToday,
          inTreatment,
          completed,
          withAttachments: Math.floor(totalRecords * 0.4), // Mock số lượng có file đính kèm
          doctorsCount: uniqueDoctors.size
        }
      }
    };
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu bệnh án (Admin):', error);
    return { success: false, message: 'Lỗi server' };
  }
}