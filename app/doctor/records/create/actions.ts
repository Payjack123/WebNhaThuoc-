'use server';

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function getInitialCreateData(patientId: number) {
  try {
    const cookieStore = await cookies();
    const userIdStr = cookieStore.get('user_id')?.value;
    if (!userIdStr) return { success: false, message: 'Chưa đăng nhập' };
    const doctorId = parseInt(userIdStr);

    const doctor = await prisma.user.findUnique({
      where: { id: doctorId },
      include: { doctorProfile: true }
    });

    const patient = await prisma.user.findUnique({
      where: { id: patientId },
      include: { healthMetric: true }
    });

    if (!doctor || !patient) return { success: false, message: 'Không tìm thấy dữ liệu' };

    // Tìm lịch khám gần nhất chưa hoàn thành để lấy lý do khám (nếu có)
    const appointment = await prisma.appointment.findFirst({
      where: { patientId, doctorId, status: { not: 'HOÀN THÀNH' } },
      orderBy: { bookingDate: 'desc' }
    });

    let age = 'N/A';
    let dobStr = 'Chưa cập nhật';
    if (patient.dob) {
      dobStr = patient.dob;
      let year;
      if (dobStr.includes('/')) year = dobStr.split('/')[2];
      else if (dobStr.includes('-')) year = dobStr.split('-')[0];
      else year = dobStr.substr(-4);
      
      if (year && !isNaN(parseInt(year))) {
          age = (new Date().getFullYear() - parseInt(year)).toString();
      }
    }

    return {
      success: true,
      data: {
        doctor: {
          name: doctor.fullName,
          specialty: doctor.doctorProfile?.specialty || 'Nội tổng quát'
        },
        patient: {
          id: patient.id,
          code: patient.patientCode || `BN${patient.id.toString().padStart(4, '0')}`,
          name: patient.fullName,
          dob: dobStr,
          age,
          gender: patient.gender || 'Nam',
          phone: patient.phone || 'Chưa cập nhật',
          address: patient.address || 'Chưa cập nhật',
          bloodType: patient.healthMetric?.bloodType || 'Chưa cập nhật',
          allergies: patient.healthMetric?.allergies || 'Không',
          insurance: patient.insurance || 'Không',
          medicalHistory: patient.healthMetric?.medicalHistory || ''
        },
        appointment: appointment ? {
          id: appointment.id,
          reason: appointment.reason || ''
        } : null
      }
    };
  } catch (error) {
    console.error('Lỗi lấy dữ liệu tạo bệnh án:', error);
    return { success: false, message: 'Lỗi server' };
  }
}

export async function createDoctorMedicalRecord(data: any) {
  try {
    const cookieStore = await cookies();
    const userIdStr = cookieStore.get('user_id')?.value;
    if (!userIdStr) return { success: false, message: 'Chưa đăng nhập' };
    const doctorId = parseInt(userIdStr);

    const { patientId, appointmentId, symptoms, medicalHistory, diagnosis, treatment, notes, vitals } = data;

    if (!patientId || !diagnosis || !symptoms) {
      return { success: false, message: 'Vui lòng điền đầy đủ thông tin bắt buộc' };
    }

    let finalAppointmentId = appointmentId;

    if (!finalAppointmentId) {
      const now = new Date();
      const newAppt = await prisma.appointment.create({
        data: {
          patientId: patientId,
          doctorId: doctorId,
          specialty: 'Khám chung',
          bookingDate: now.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
          bookingTime: now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          reason: 'Tạo hồ sơ bệnh án trực tiếp',
          status: 'HOÀN THÀNH'
        }
      });
      finalAppointmentId = newAppt.id;
    }

    // 1. Tạo Examination (Bệnh án)
    const examination = await prisma.examination.create({
      data: {
        patientId: patientId,
        doctorId: doctorId,
        appointmentId: finalAppointmentId,
        symptoms: symptoms,
        medicalHistory: medicalHistory,
        diagnosis: diagnosis,
        treatment: treatment,
        notes: notes
      }
    });

    // 2. Cập nhật HealthMetric
    await prisma.healthMetric.upsert({
      where: { patientId: patientId },
      update: {
        bloodPressure: vitals?.bloodPressure || null,
        heartRate: vitals?.heartRate ? parseInt(vitals.heartRate) : null,
        temperature: vitals?.temperature ? parseFloat(vitals.temperature) : null,
        respiratoryRate: vitals?.respiratoryRate ? parseInt(vitals.respiratoryRate) : null,
        spO2: vitals?.spO2 ? parseInt(vitals.spO2) : null,
        weight: vitals?.weight ? parseFloat(vitals.weight) : null,
        height: vitals?.height ? parseFloat(vitals.height) : null,
        medicalHistory: medicalHistory || undefined
      },
      create: {
        patientId: patientId,
        bloodPressure: vitals?.bloodPressure || null,
        heartRate: vitals?.heartRate ? parseInt(vitals.heartRate) : null,
        temperature: vitals?.temperature ? parseFloat(vitals.temperature) : null,
        respiratoryRate: vitals?.respiratoryRate ? parseInt(vitals.respiratoryRate) : null,
        spO2: vitals?.spO2 ? parseInt(vitals.spO2) : null,
        weight: vitals?.weight ? parseFloat(vitals.weight) : null,
        height: vitals?.height ? parseFloat(vitals.height) : null,
        medicalHistory: medicalHistory
      }
    });

    // 3. Cập nhật trạng thái Appointment
    if (appointmentId) {
      await prisma.appointment.update({
        where: { id: appointmentId },
        data: { status: 'HOÀN THÀNH' }
      });
    }

    return { success: true, message: 'Tạo bệnh án thành công', data: { examinationId: examination.id } };
  } catch (error) {
    console.error('Lỗi tạo bệnh án:', error);
    return { success: false, message: 'Lỗi khi lưu bệnh án' };
  }
}
