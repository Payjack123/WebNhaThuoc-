"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getLabResults() {
  try {
    const labTests = await prisma.labTest.findMany({
      orderBy: { date: "desc" },
      include: {
        patient: {
          select: { fullName: true, dob: true, gender: true, phone: true, avatar: true, patientProfile: true, address: true },
        },
      },
    });

    const results = labTests.map((order) => {
      let notesData: any = {};
      try {
        if (order.notes) {
          notesData = JSON.parse(order.notes);
        }
      } catch (e) {
        // fallback
      }

      // Map 'ordered' status from test-orders to 'waiting' in test-results
      let uiStatus = order.statusType;
      if (uiStatus === "ordered") uiStatus = "waiting";

      // DEMO MỤC ĐÍCH: Tự động chuyển tất cả các phiếu 'waiting' thành 'has_result' 
      // để bác sĩ có thể xem và đánh giá ngay lập tức (không cần chờ KTV nhập)
      if (uiStatus === "waiting") {
         uiStatus = "has_result";
      }

      // Format indices for UI
      const rawIndices = Array.isArray(notesData.indices) ? notesData.indices : [];
      const formattedIndices = rawIndices.map((idx: any) => ({
        name: idx.name,
        result: idx.result,
        min: idx.min || "",
        max: idx.max || "",
        unit: idx.unit || "",
        status: idx.status,
      }));

      let formattedDob = order.patient?.dob;
      if (formattedDob && formattedDob.includes("-")) {
        const parts = formattedDob.split("-");
        if (parts.length === 3) formattedDob = `${parts[2]}/${parts[1]}/${parts[0]}`;
      }

      return {
        id: `XNCD-${order.id.toString().padStart(4, "0")}`,
        dbId: order.id,
        patientName: order.patient?.fullName || "Bệnh nhân ẩn",
        patientCode: order.patient?.patientProfile?.patientCode || "N/A",
        dob: formattedDob,
        gender: order.patient?.gender || "Khác",
        phone: order.patient?.phone || "Không có",
        avatar: order.patient?.avatar || null,
        cccd: order.patient?.patientProfile?.cccd || "Không có",
        address: order.patient?.address || "Chưa cập nhật",
        type: order.testName || "Xét nghiệm",
        date: order.date.toLocaleString("vi-VN"),
        dateOnly: order.date.toLocaleDateString("vi-VN"),
        time: `${order.date.getHours().toString().padStart(2, '0')}:${order.date.getMinutes().toString().padStart(2, '0')}`,
        dateFilterStr: order.date.toISOString().split('T')[0],
        technician: "KTV. Nguyễn Thị Mai",
        status: uiStatus,
        indices: formattedIndices,
        evaluation: notesData.evaluation || null,
        doctorNote: notesData.doctorNote || "",
      };
    });

    return { success: true, data: results };
  } catch (error: any) {
    console.error("Lỗi lấy danh sách kết quả xét nghiệm:", error);
    return { success: false, message: error.message || "Lỗi máy chủ" };
  }
}

export async function evaluateLabResult(dbId: number, evaluation: string, doctorNote: string) {
  try {
    const order = await prisma.labTest.findUnique({ where: { id: dbId } });
    if (!order) return { success: false, message: "Không tìm thấy xét nghiệm" };

    let notesData: any = {};
    try {
      if (order.notes) notesData = JSON.parse(order.notes);
    } catch (e) {}

    notesData.evaluation = evaluation;
    notesData.doctorNote = doctorNote;

    await prisma.labTest.update({
      where: { id: dbId },
      data: {
        statusType: "evaluated",
        notes: JSON.stringify(notesData),
      },
    });

    revalidatePath("/doctor/test-results");
    return { success: true };
  } catch (error: any) {
    console.error("Lỗi đánh giá xét nghiệm:", error);
    return { success: false, message: error.message || "Lỗi máy chủ" };
  }
}
