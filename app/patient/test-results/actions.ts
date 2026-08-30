'use server';

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function getTestResults() {
  try {
    const cookieStore = await cookies();
    const userIdStr = cookieStore.get('user_id')?.value;
    
    if (!userIdStr) {
      return { success: false, message: 'Chưa đăng nhập hệ thống' };
    }
    
    const patientId = parseInt(userIdStr, 10);

    const labTests = await prisma.labTest.findMany({
      where: { patientId },
      orderBy: { date: 'desc' }
    });

    const data = labTests.map((lab) => {
      const d = new Date(lab.date);
      const isNormal = lab.statusType === 'GOOD' || lab.statusType === 'Bình thường';
      
      // Determine type from testName for filtering/icons
      let type = 'Khác';
      const nameLower = lab.testName.toLowerCase();
      if (nameLower.includes('máu') || nameLower.includes('blood')) type = 'Xét nghiệm máu';
      else if (nameLower.includes('nước tiểu') || nameLower.includes('urine')) type = 'Nước tiểu';
      else if (nameLower.includes('x-quang') || nameLower.includes('xquang')) type = 'X-quang';
      else if (nameLower.includes('siêu âm')) type = 'Siêu âm';

      let parsedNotes: any = null;
      try {
        if (lab.notes) {
          parsedNotes = JSON.parse(lab.notes);
        }
      } catch (e) {
        // Not a JSON string, fallback to string
      }

      let indicators = [];
      let conclusion = '';
      let doctorNotes = '';

      if (parsedNotes && typeof parsedNotes === 'object') {
        console.log("DEBUG parsedNotes:", parsedNotes);
        const parsedIndicators = parsedNotes.indices || parsedNotes.indicators || [];
        if (Array.isArray(parsedIndicators) && parsedIndicators.length > 0) {
          indicators = parsedIndicators.map((ind: any) => {
            const resultVal = parseFloat(ind.result);
            const minVal = parseFloat(ind.min);
            const maxVal = parseFloat(ind.max);
            let isAbnormal = false;
            
            // Check if status is explicitly provided by the doctor module
            if (ind.status === 'Bất thường' || ind.status === 'abnormal') {
                isAbnormal = true;
            } else if (ind.status === 'Bình thường' || ind.status === 'normal') {
                isAbnormal = false;
            } else if (!isNaN(resultVal)) {
              if (!isNaN(minVal) && resultVal < minVal) isAbnormal = true;
              if (!isNaN(maxVal) && resultVal > maxVal) isAbnormal = true;
            } else if (ind.result === 'Âm tính') {
               isAbnormal = false;
            } else if (ind.result === 'Dương tính') {
               isAbnormal = true;
            } else {
               // If no status is provided and it's not numeric, default to false instead of blindly using !isNormal
               isAbnormal = false;
            }
            
            return {
              name: ind.name || 'Chỉ số',
              result: ind.result || '',
              unit: ind.unit || '',
              reference: ind.reference || `${ind.min || ''} ${ind.max ? '- ' + ind.max : ''}`.trim() || '',
              isAbnormal: isAbnormal
            };
          });
        } else {
          // Fallback if parsed JSON exists but no indicators provided
          indicators = [
             { 
               name: 'Đánh giá chung', 
               result: lab.result === 'GOOD' ? 'Bình thường' : (lab.result === 'BAD' ? 'Bất thường' : lab.result), 
               unit: '', 
               reference: '', 
               isAbnormal: !isNormal 
             }
          ];
        }
        
        let conclusionRaw = parsedNotes.evaluation || parsedNotes.reason || '';
        let hasAbnormal = indicators.some((ind: any) => ind.isAbnormal);
        
        if (hasAbnormal && (!conclusionRaw || conclusionRaw === 'hi')) {
             conclusionRaw = 'warning';
        }
        
        if (conclusionRaw === 'normal') conclusionRaw = 'Bình thường: Các chỉ số trong giới hạn an toàn';
        else if (conclusionRaw === 'monitor' || conclusionRaw === 'warning') conclusionRaw = 'Cần theo dõi thêm: Có dấu hiệu rủi ro, cần chú ý';
        else if (conclusionRaw === 'abnormal' || conclusionRaw === 'danger') conclusionRaw = 'Bất thường / Nguy hiểm: Chỉ số vượt mức, cần điều trị';
        
        if (conclusionRaw) {
           conclusion = conclusionRaw;
        } else {
           conclusion = hasAbnormal 
             ? 'Cần theo dõi thêm: Có dấu hiệu rủi ro, cần chú ý' 
             : 'Bình thường: Các chỉ số trong giới hạn an toàn';
        }
        
        doctorNotes = parsedNotes.doctorNote || parsedNotes.instructions || (hasAbnormal ? 'Cần chú ý theo dõi thêm các chỉ số bất thường.' : 'Không có gì đặc biệt.');
      } else {
        indicators = [
           { 
             name: 'Đánh giá chung', 
             result: lab.result === 'GOOD' ? 'Bình thường' : (lab.result === 'BAD' ? 'Bất thường' : lab.result), 
             unit: '', 
             reference: '', 
             isAbnormal: !isNormal 
           }
        ];
        conclusion = lab.notes || (isNormal ? 'Các chỉ số trong giới hạn bình thường.' : 'Có một số chỉ số cần theo dõi. Vui lòng nghe theo chỉ định của bác sĩ.');
        doctorNotes = lab.notes || '';
      }

      return {
        id: lab.id,
        code: `XN${d.getFullYear()}${(d.getMonth()+1).toString().padStart(2, '0')}-${lab.id.toString().padStart(4, '0')}`,
        date: d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        time: d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        name: lab.testName,
        doctor: lab.doctorName || 'Bác sĩ chuyên khoa',
        type: type,
        status: 'Có kết quả',
        indicators: indicators,
        conclusion: conclusion,
        doctorNotes: doctorNotes,
        pdfUrl: '#',
      };
    });

    return {
      success: true,
      data: data
    };
  } catch (error) {
    console.error('Error fetching test results:', error);
    return { success: false, message: 'Đã xảy ra lỗi khi lấy dữ liệu' };
  }
}
