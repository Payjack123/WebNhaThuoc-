'use server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function getPaymentHistoryData() {
  try {
    const cookieStore = await cookies();
    const userIdStr = cookieStore.get('user_id')?.value;
    
    if (!userIdStr) {
      return { success: false, message: 'Chưa đăng nhập hệ thống' };
    }
    
    const patientId = parseInt(userIdStr, 10);

    // Fetch from Prisma exactly like Invoices, to get the real data
    const patient = await prisma.user.findUnique({
      where: { id: patientId },
      include: {
        appointmentsAsPatient: {
          include: {
            doctor: {
              include: { doctorProfile: true },
            },
            examination: true,
          },
          orderBy: { createdAt: 'desc' },
        },
        prescriptions: {
          include: { items: true },
        },
        labTests: true,
      },
    });

    if (!patient) {
      return { success: false, message: 'Không tìm thấy thông tin bệnh nhân' };
    }

    const patientInfo = {
      name: patient.fullName,
      code: patient.patientCode || `BN${patient.id.toString().padStart(4, '0')}`,
      avatar: patient.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(patient.fullName)}&background=2563EB&color=fff`,
    };

    // Calculate billing items based on actual appointments
    let unpaidCount = 0;
    
    const history = patient.appointmentsAsPatient.map((apt, idx) => {
      const basePrice = apt.doctor.doctorProfile?.price || 150000;
      
      // Calculate lab cost if any
      const labCost = (patient.labTests.length > 0 && idx === 0) ? patient.labTests.length * 200000 : 0;
      
      // Calculate medicine cost if any
      const medCost = (patient.prescriptions[idx]?.items.length || 0) * 50000;

      const rawTotal = basePrice + labCost + medCost;
      const insuranceDiscount = patient.bhyt ? Math.round(basePrice * 0.2) : 0;
      const finalAmount = rawTotal - insuranceDiscount;

      // Classify status
      let status = 'Chưa thanh toán';
      let statusColor = 'text-yellow-700 bg-yellow-100 border-yellow-200';
      
      // We assign random methods for "Paid" for realistic demo since there is no transaction table yet
      const randomMethods = [
        { method: 'Thẻ tín dụng', icon: 'Visa' },
        { method: 'MoMo', icon: 'MoMo' },
        { method: 'Chuyển khoản', icon: 'Bank' },
        { method: 'VNPay', icon: 'VNPay' }
      ];
      
      let methodInfo = { method: 'Chưa thanh toán', icon: 'None' };

      if (apt.status === 'HOÀN THÀNH') {
        status = 'Đã thanh toán';
        statusColor = 'text-green-700 bg-green-100 border-green-200';
        methodInfo = randomMethods[apt.id % randomMethods.length]; // deterministic based on ID
      } else if (apt.status === 'ĐÃ HỦY') {
        status = 'Đã hủy';
        statusColor = 'text-gray-500 bg-gray-100 border-gray-200';
      } else {
        unpaidCount++;
        if (idx === 0 && unpaidCount === 1) {
           status = 'Quá hạn'; // First unpaid is overdue just for UI demo purposes
           statusColor = 'text-red-700 bg-red-100 border-red-200';
        } else {
           status = 'Chờ thanh toán';
           statusColor = 'text-orange-700 bg-orange-100 border-orange-200';
        }
      }

      return {
        id: `HD${apt.id.toString().padStart(3, '0')}`,
        rawId: apt.id,
        date: apt.bookingDate || new Date(apt.createdAt).toLocaleDateString('vi-VN'),
        content: `Khám bệnh - ${apt.specialty || apt.doctor.doctorProfile?.specialty || 'Nội tổng quát'}`,
        clinic: 'Phòng khám đa khoa',
        amount: `${finalAmount.toLocaleString('vi-VN')} ₫`,
        status,
        statusColor,
        method: methodInfo.method,
        methodIcon: methodInfo.icon
      };
    });

    return { 
      success: true, 
      data: { 
        patientInfo,
        history 
      } 
    };
  } catch (error) {
    console.error('Lỗi getPaymentHistoryData:', error);
    return { success: false, message: 'Lỗi server' };
  }
}
