'use server';

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

// 1. TỔNG HỢP DANH SÁCH HÓA ĐƠN & CHI PHÍ TỪ TIDB
export async function getPatientBillingData() {
  try {
    const cookieStore = await cookies();
    const userIdStr = cookieStore.get('user_id')?.value;
    
    if (!userIdStr) {
      return { success: false, message: 'Chưa đăng nhập hệ thống' };
    }
    
    const patientId = parseInt(userIdStr, 10);

    // Lấy thông tin Bệnh nhân, kèm các Lịch khám, Đơn thuốc và Xét nghiệm
    const patient = await prisma.user.findUnique({
      where: { id: patientId },
      include: {
        patientProfile: true,
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

    let paidCount = 0;
    let unpaidCount = 0;
    let totalExpense = 0;
    let overdueInvoice: any = null;

    // Chuyển đổi mỗi lượt khám (Appointment) thành 1 Hóa đơn Viện phí
    const invoices = patient.appointmentsAsPatient.map((apt, idx) => {
      const basePrice = apt.doctor.doctorProfile?.price || 150000;
      
      // Tính chi phí xét nghiệm đi kèm (mặc định 200.000đ / chỉ định)
      const labCost = (patient.labTests.length > 0 && idx === 0) ? patient.labTests.length * 200000 : 0;
      
      // Tính chi phí thuốc đi kèm (mặc định 50.000đ / viên/hộp)
      const medCost = (patient.prescriptions[idx]?.items.length || 0) * 50000;

      const rawTotal = basePrice + labCost + medCost;
      // Nếu bệnh nhân có mã BHYT -> Giảm 20% chi phí khám
      const insuranceDiscount = patient.patientProfile?.bhyt ? Math.round(basePrice * 0.2) : 0;
      const finalAmount = rawTotal - insuranceDiscount;

      // Phân loại trạng thái thanh toán dựa trên trạng thái Lịch khám
      let status = 'Chưa thanh toán';
      let statusColor = 'text-yellow-700 bg-yellow-100 border-yellow-200';

      if (apt.status === 'HOÀN THÀNH') {
        status = 'Đã thanh toán';
        statusColor = 'text-green-700 bg-green-100 border-green-200';
        paidCount++;
        totalExpense += finalAmount;
      } else if (apt.status === 'ĐÃ HỦY') {
        status = 'Đã hủy';
        statusColor = 'text-gray-500 bg-gray-100 border-gray-200';
      } else {
        unpaidCount++;
        // Nếu lịch khám ở quá khứ nhưng chưa thanh toán -> Quá hạn
        if (idx === 0 && unpaidCount === 1) {
          overdueInvoice = {
            id: `HD${apt.id.toString().padStart(3, '0')}`,
            amount: finalAmount.toLocaleString('vi-VN'),
          };
        }
      }

      // Danh sách chi tiết dịch vụ trong hóa đơn
      const details = [
        { name: 'Khám chuyên khoa', price: `${basePrice.toLocaleString('vi-VN')}đ` },
      ];

      if (labCost > 0) {
        details.push({ name: `Xét nghiệm cận lâm sàng (${patient.labTests.length} chỉ định)`, price: `${labCost.toLocaleString('vi-VN')}đ` });
      }

      if (medCost > 0) {
        details.push({ name: `Tiền thuốc theo đơn`, price: `${medCost.toLocaleString('vi-VN')}đ` });
      }

      return {
        id: `HD${apt.id.toString().padStart(3, '0')}`,
        rawId: apt.id,
        date: apt.bookingDate || new Date(apt.createdAt).toLocaleDateString('vi-VN'),
        doctor: `BS. ${apt.doctor.fullName}`,
        specialty: apt.specialty || apt.doctor.doctorProfile?.specialty || 'Nội tổng quát',
        total: rawTotal.toLocaleString('vi-VN'),
        insurance: insuranceDiscount.toLocaleString('vi-VN'),
        final: finalAmount.toLocaleString('vi-VN'),
        finalRaw: finalAmount,
        status,
        statusColor,
        details,
        paymentDate: apt.status === 'HOÀN THÀNH' ? `${apt.bookingDate} - 10:30` : 'Chưa có',
        paymentRef: `VNPay-TXN${apt.id}9823`,
      };
    });

    const kpis = {
      totalInvoices: invoices.length,
      paidCount,
      unpaidCount,
      totalExpense: totalExpense.toLocaleString('vi-VN'),
      overdueInvoice,
    };

    return {
      success: true,
      data: {
        patientInfo: {
          name: patient.fullName,
          code: patient.patientProfile?.patientCode || `BN${patient.id.toString().padStart(4, '0')}`,
          avatar: patient.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(patient.fullName)}&background=2563EB&color=fff`,
        },
        invoices,
        kpis,
      },
    };
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu viện phí:', error);
    return { success: false, message: 'Lỗi hệ thống khi tải hóa đơn' };
  }
}

// 2. XÁC NHẬN THANH TOÁN HÓA ĐƠN
export async function confirmInvoicePayment(rawAppointmentId: number) {
  try {
    const cookieStore = await cookies();
    const userIdStr = cookieStore.get('user_id')?.value;
    
    if (!userIdStr) {
      return { success: false, message: 'Chưa đăng nhập hệ thống' };
    }

    await prisma.appointment.update({
      where: { id: rawAppointmentId },
      data: { status: 'HOÀN THÀNH' },
    });

    return { success: true, message: 'Thanh toán viện phí thành công!' };
  } catch (error) {
    console.error('Lỗi thanh toán hóa đơn:', error);
    return { success: false, message: 'Không thể xác nhận giao dịch lúc này' };
  }
}