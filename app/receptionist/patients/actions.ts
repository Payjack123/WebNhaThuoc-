'use server';

import prisma from '@/lib/prisma';

export async function getPatients(searchQuery: string, statusFilter: string) {
  try {
    let whereClause: any = {
      role: 'PATIENT',
    };

    if (statusFilter && statusFilter !== 'ALL') {
      whereClause.status = statusFilter;
    }

    if (searchQuery) {
      whereClause.OR = [
        { fullName: { contains: searchQuery } },
        { phone: { contains: searchQuery } },
        { patientProfile: { patientCode: { contains: searchQuery } } },
        { patientProfile: { cccd: { contains: searchQuery } } }
      ];
    }

    const patients = await prisma.user.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      include: {
        patientProfile: true,
        appointmentsAsPatient: {
          orderBy: [
            { bookingDate: 'desc' },
            { bookingTime: 'desc' }
          ],
          take: 1,
          include: {
            doctor: true
          }
        }
      }
    });

    const formattedData = patients.map(p => {
      // Calculate age
      let age = 'N/A';
      if (p.dob) {
        const yob = p.dob.substring(0, 4);
        if (!isNaN(parseInt(yob))) {
          age = (new Date().getFullYear() - parseInt(yob)).toString();
        }
      }

      const latestAppointment = p.appointmentsAsPatient[0] || null;

      return {
        id: p.id,
        patientCode: p.patientProfile?.patientCode || 'Chưa có',
        name: p.fullName,
        phone: p.phone || 'Chưa cập nhật',
        gender: p.gender || 'Khác',
        age: age,
        address: p.address || 'Chưa cập nhật',
        cccd: p.patientProfile?.cccd || 'Chưa cập nhật',
        bhyt: p.patientProfile?.bhyt || 'Chưa cập nhật',
        status: p.status,
        createdAt: new Date(p.createdAt).toLocaleDateString('vi-VN'),
        latestAppointment: latestAppointment ? {
          id: latestAppointment.id,
          date: latestAppointment.bookingDate,
          time: latestAppointment.bookingTime,
          doctorName: `BS. ${latestAppointment.doctor.fullName}`,
          specialty: latestAppointment.specialty,
          status: latestAppointment.status
        } : null
      };
    });

    return { success: true, data: formattedData };
  } catch (error) {
    console.error('Lỗi khi lấy danh sách bệnh nhân:', error);
    return { success: false, data: [], message: 'Đã xảy ra lỗi' };
  }
}
