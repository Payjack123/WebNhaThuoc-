'use server';

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';


export async function addPrescriptionDrug(prescriptionId: number, drug: { name: string; dosage: string; quantity: string }) {
  try {
    await prisma.prescriptionItem.create({
      data: {
        prescriptionId,
        medicationName: drug.name,
        dosage: drug.dosage,
        instructions: drug.dosage,
        remaining: drug.quantity,
        statusText: 'Chờ phát',
        iconType: 'pill',
      },
    });
    return { success: true, message: 'Thêm thuốc thành công' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Lỗi khi thêm thuốc' };
  }
}

export async function removePrescriptionDrug(itemId: number) {
  try {
    await prisma.prescriptionItem.delete({
      where: { id: itemId },
    });
    return { success: true, message: 'Xóa thuốc thành công' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Lỗi khi xóa thuốc' };
  }
}

export async function deletePrescription(prescriptionId: number) {
  try {
    // Xóa tất cả các thuốc trong đơn trước
    await prisma.prescriptionItem.deleteMany({
      where: { prescriptionId },
    });
    // Sau đó xóa đơn thuốc
    await prisma.prescription.delete({
      where: { id: prescriptionId },
    });
    return { success: true, message: 'Xóa đơn thuốc thành công' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Lỗi khi xóa đơn thuốc' };
  }
}

// 1. LẤY DANH SÁCH BỆNH NHÂN VÀ ĐƠN THUỐC CỦA BÁC SĨ (Dành cho trang Danh sách và form Chọn BN)
export async function getDoctorPrescriptionsData() {
  try {
    const cookieStore = await cookies();
    const userIdStr = cookieStore.get('user_id')?.value;
    if (!userIdStr) return { success: false, message: 'Chưa đăng nhập' };
    const doctorId = parseInt(userIdStr);

    const doctor = await prisma.user.findUnique({
      where: { id: doctorId },
      include: { doctorProfile: true }
    });

    if (!doctor) return { success: false, message: 'Không tìm thấy bác sĩ' };

    // Lấy danh sách bệnh nhân đã khám với bác sĩ này
    const appointments = await prisma.appointment.findMany({
      where: { doctorId: doctorId },
      select: { patientId: true },
      distinct: ['patientId']
    });
    
    const patientIds = appointments.map(a => a.patientId);

    const patients = await prisma.user.findMany({
      where: { id: { in: patientIds } },
      select: { 
        id: true, fullName: true, patientCode: true, dob: true, gender: true, bhyt: true,
        phone: true, address: true,
        healthMetric: { select: { allergies: true } },
        examinationsAsPatient: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          select: {
            createdAt: true,
            symptoms: true,
            diagnosis: true,
            treatment: true,
            notes: true
          }
        }
      }
    });

    // Lấy toàn bộ đơn thuốc của các bệnh nhân đó
    const prescriptions = await prisma.prescription.findMany({
      where: { patientId: { in: patientIds } },
      include: {
        patient: true,
        items: true
      },
      orderBy: { createdAt: 'desc' }
    });

    // Tính toán KPI
    let total = prescriptions.length;
    let dispensed = 0;
    let waiting = 0;
    let todayCount = 0;
    const todayStr = new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

    const formattedPrescriptions = prescriptions.map(p => {
      let status = 'Chờ kê thuốc';
      if (p.items.length > 0) {
        const allDispensed = p.items.every(i => i.statusText === 'Đã phát');
        if (allDispensed) {
          status = 'Đã phát';
          dispensed++;
        } else {
          status = 'Chờ phát';
          waiting++;
        }
      }
      
      const createdDateStr = p.createdAt.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
      if (createdDateStr === todayStr) todayCount++;

      let age = 'N/A';
      if (p.patient.dob) {
         const year = p.patient.dob.split('/')[2] || p.patient.dob.split('-')[0];
         if (year) age = (new Date().getFullYear() - parseInt(year)).toString();
      }

      return {
        id: p.id,
        code: p.code,
        patientId: p.patient.id,
        patientName: p.patient.fullName,
        patientCode: p.patient.patientCode || `BN${p.patient.id}`,
        age: age,
        gender: p.patient.gender || 'Nam',
        date: createdDateStr,
        time: p.createdAt.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        drugCount: p.items.length,
        status: status,
        statusColor: status === 'Đã phát' ? 'text-green-700 bg-green-100 border-green-200' :
                     status === 'Chờ phát' ? 'text-yellow-700 bg-yellow-100 border-yellow-200' :
                     'text-gray-700 bg-gray-100 border-gray-200',
        diagnosis: p.diagnosis || 'Chưa có chẩn đoán', 
        type: p.type || 'Ngoại trú',
        notes: p.notes || '',
        followUpDate: p.followUpDate || '',
        items: p.items.map(item => ({
          id: item.id,
          name: item.medicationName,
          dosage: item.dosage,
          quantity: item.remaining,
          instructions: item.instructions,
          form: item.iconType === 'liquid' ? 'Dung dịch' : 'Viên'
        }))
      };
    });

    return {
      success: true,
      data: {
        doctorInfo: {
          name: doctor.fullName,
          avatar: doctor.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.fullName)}&background=172554&color=fff`,
          rating: doctor.doctorProfile?.rating || 5.0,
          specialty: doctor.doctorProfile?.specialty || 'Đa khoa'
        },
        patients: patients,
        prescriptions: formattedPrescriptions,
        kpis: { total, dispensed, waiting, today: todayCount }
      }
    };
  } catch (error) {
    return { success: false, message: 'Lỗi server' };
  }
}

export async function createPrescription(data: { patientId: number, diagnosis: string, items: any[] }) {
  return createFullPrescription(data);
}
// 2. TẠO ĐƠN THUỐC CÙNG TẤT CẢ CÁC LOẠI THUỐC (Dành cho trang Tạo đơn)
export async function createFullPrescription(data: { patientId: number, symptoms?: string, diagnosis?: string, treatment?: string, type?: string, notes?: string, followUpDate?: string, items: any[] }) {
  try {
    const cookieStore = await cookies();
    const userIdStr = cookieStore.get('user_id')?.value;
    const doctorId = userIdStr ? parseInt(userIdStr) : null;

    const code = `DT-${new Date().getFullYear().toString().slice(2)}${String(new Date().getMonth()+1).padStart(2,'0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    
    // Tạo đơn thuốc mới
    const newPre = await prisma.prescription.create({ 
      data: { 
        patientId: data.patientId, 
        code: code,
        doctorId: doctorId,
        symptoms: data.symptoms,
        diagnosis: data.diagnosis,
        treatment: data.treatment,
        type: data.type || 'Ngoại trú',
        notes: data.notes,
        followUpDate: data.followUpDate,
        status: 'Chờ phát'
      } 
    });

    // Thêm hàng loạt các loại thuốc vào đơn vừa tạo
    if (data.items && data.items.length > 0) {
      await prisma.prescriptionItem.createMany({
        data: data.items.map((item: any) => ({
          prescriptionId: newPre.id,
          medicationName: item.name,
          dosage: item.dosage,
          instructions: item.instructions || item.dosage, // Hoặc truyền thêm note riêng
          remaining: item.quantity.toString(),
          statusText: 'Chờ phát',
          iconType: 'pill'
        }))
      });
    }

    return { success: true, message: 'Đã kê đơn thuốc thành công!' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Lỗi khi lưu đơn thuốc vào cơ sở dữ liệu' };
  }
}

export async function dispensePrescription(id: number) {
  try {
    await prisma.prescription.update({
      where: { id },
      data: { status: 'Đã phát' }
    });
    
    await prisma.prescriptionItem.updateMany({
      where: { prescriptionId: id },
      data: { statusText: 'Đã phát' }
    });

    return { success: true, message: 'Đã phát thuốc thành công' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Lỗi khi phát thuốc' };
  }
}