'use server';

import prisma from '@/lib/prisma';

export async function getDashboardData() {
  try {
    // Get today's date formatted as 'dd/MM/yyyy' using native JS
    const todayDate = new Date();
    const today = `${String(todayDate.getDate()).padStart(2, '0')}/${String(todayDate.getMonth() + 1).padStart(2, '0')}/${todayDate.getFullYear()}`;
    
    // Fetch all appointments for today
    const todayAppointments = await prisma.appointment.findMany({
      where: {
        bookingDate: today,
      },
      include: {
        patient: {
          select: { fullName: true, patientProfile: true, phone: true }
        },
        doctor: {
          select: { fullName: true }
        }
      },
      orderBy: {
        bookingTime: 'asc'
      }
    });

    // If no appointments today, we could fallback to fetch any appointments for demo purposes,
    // but in a real system we should just return empty data.
    // For better UX during development, if today has no data, let's just return the empty structure.

    // 1. Calculate Stats
    const totalAppointments = todayAppointments.length;
    
    const checkedInCount = todayAppointments.filter(
      (a) => a.status === 'ĐÃ XÁC NHẬN' || a.status === 'ĐANG KHÁM' || a.status === 'HOÀN THÀNH'
    ).length;
    
    const waitingCount = todayAppointments.filter((a) => a.status === 'ĐÃ XÁC NHẬN').length;
    const examiningCount = todayAppointments.filter((a) => a.status === 'ĐANG KHÁM').length;
    const completedCount = todayAppointments.filter((a) => a.status === 'HOÀN THÀNH').length;
    const pendingCheckInCount = todayAppointments.filter((a) => a.status === 'CHỜ XÁC NHẬN').length;
    const cancelledCount = todayAppointments.filter((a) => a.status === 'ĐÃ HỦY').length;

    // 2. Current Queue (Exclude Completed and Cancelled)
    const currentQueue = todayAppointments.filter(
      (a) => a.status === 'ĐÃ XÁC NHẬN' || a.status === 'ĐANG KHÁM' || a.status === 'CHỜ XÁC NHẬN'
    );

    // 3. Active Rooms
    // Group doctors and rooms that have active appointments ('ĐANG KHÁM' or 'ĐÃ XÁC NHẬN')
    const activeRoomsMap = new Map();
    
    todayAppointments.forEach(app => {
      if (app.status === 'ĐANG KHÁM' || app.status === 'ĐÃ XÁC NHẬN') {
        const roomKey = app.room || 'Chưa xếp phòng';
        if (!activeRoomsMap.has(roomKey)) {
          activeRoomsMap.set(roomKey, {
            roomName: roomKey,
            doctorName: app.doctor.fullName,
            specialty: app.specialty,
            currentlyExamining: null,
            waitingCount: 0
          });
        }
        
        const roomData = activeRoomsMap.get(roomKey);
        if (app.status === 'ĐANG KHÁM') {
          roomData.currentlyExamining = {
            patientName: app.patient.fullName,
            patientCode: app.patient.patientProfile?.patientCode,
            time: app.bookingTime
          };
        } else if (app.status === 'ĐÃ XÁC NHẬN') {
          roomData.waitingCount += 1;
        }
      }
    });

    const activeRooms = Array.from(activeRoomsMap.values());

    return {
      success: true,
      data: {
        stats: {
          total: totalAppointments,
          checkedIn: checkedInCount,
          waiting: waitingCount,
          examining: examiningCount,
          completed: completedCount,
          pendingCheckIn: pendingCheckInCount,
          cancelled: cancelledCount
        },
        appointments: todayAppointments,
        queue: currentQueue,
        activeRooms: activeRooms,
        currentDate: today
      }
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return { success: false, error: "Lỗi hệ thống khi tải dữ liệu." };
  }
}
