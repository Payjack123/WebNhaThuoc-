'use server';
import { cookies } from 'next/headers';

export async function getInsuranceData() {
  try {
    const cookieStore = await cookies();
    const userIdStr = cookieStore.get('user_id')?.value;
    if (!userIdStr) {
      return { success: false, message: 'Chưa đăng nhập' };
    }
    
    // Giả lập thông tin thẻ BHYT
    const insuranceInfo = {
      insuranceNumber: '0111234567',
      cardNumber: 'HS 4 01 123 456 7890',
      fullName: 'NGUYỄN VĂN AN',
      dob: '12/05/1995',
      gender: 'Nam',
      registrationPlace: 'Bệnh viện Đa khoa MediCare Cầu Giấy',
      address: '123 Nguyễn Trãi, Thanh Xuân, Hà Nội',
      validFrom: '01/01/2025',
      validTo: '31/12/2025',
      coverageLevel: 'Tuyến tỉnh (80%)',
      status: 'Còn hiệu lực',
      issueDate: '01/01/2025'
    };

    // Giả lập danh sách lịch sử sử dụng BHYT
    const usageHistory = [
      {
        id: 1,
        date: '20/05/2025',
        clinic: 'MediCare Cầu Giấy',
        service: 'Khám bệnh - Nội tổng quát',
        totalCost: '850.000 ₫',
        insurancePaid: '680.000 ₫',
        patientPaid: '170.000 ₫',
        status: 'Đã thanh toán',
        statusColor: 'text-green-700 bg-green-100 border-green-200'
      },
      {
        id: 2,
        date: '15/05/2025',
        clinic: 'MediCare Cầu Giấy',
        service: 'Xét nghiệm máu tổng quát',
        totalCost: '350.000 ₫',
        insurancePaid: '280.000 ₫',
        patientPaid: '70.000 ₫',
        status: 'Đã thanh toán',
        statusColor: 'text-green-700 bg-green-100 border-green-200'
      },
      {
        id: 3,
        date: '10/05/2025',
        clinic: 'MediCare Cầu Giấy',
        service: 'Khám bệnh - Tai Mũi Họng',
        totalCost: '520.000 ₫',
        insurancePaid: '416.000 ₫',
        patientPaid: '104.000 ₫',
        status: 'Đã thanh toán',
        statusColor: 'text-green-700 bg-green-100 border-green-200'
      },
      {
        id: 4,
        date: '01/04/2025',
        clinic: 'MediCare Cầu Giấy',
        service: 'Chụp X-quang phổi thẳng',
        totalCost: '180.000 ₫',
        insurancePaid: '144.000 ₫',
        patientPaid: '36.000 ₫',
        status: 'Đã thanh toán',
        statusColor: 'text-green-700 bg-green-100 border-green-200'
      },
      {
        id: 5,
        date: '20/02/2025',
        clinic: 'MediCare Cầu Giấy',
        service: 'Khám bệnh - Da liễu',
        totalCost: '300.000 ₫',
        insurancePaid: '240.000 ₫',
        patientPaid: '60.000 ₫',
        status: 'Đã thanh toán',
        statusColor: 'text-green-700 bg-green-100 border-green-200'
      }
    ];

    // Giả lập thống kê tổng quan
    const overview = {
      year: '2025',
      totalCost: '2.200.000 ₫',
      insurancePaid: '1.760.000 ₫',
      patientPaid: '440.000 ₫',
      coverageRatio: 80
    };

    return { 
      success: true, 
      data: { 
        insuranceInfo,
        usageHistory,
        overview
      } 
    };
  } catch (error) {
    console.error('Lỗi getInsuranceData:', error);
    return { success: false, message: 'Lỗi server' };
  }
}
