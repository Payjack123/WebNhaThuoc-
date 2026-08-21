'use server';

export async function getTestResults() {
  // Mock data for test results
  return {
    success: true,
    data: [
      {
        id: 1,
        code: 'XN260820-0012',
        date: '20/08/2026',
        time: '08:30',
        name: 'Xét nghiệm máu tổng quát',
        doctor: 'BS. Nguyễn Văn Bình',
        type: 'Xét nghiệm máu',
        status: 'Bác sĩ đã xác nhận',
        indicators: [
          { name: 'WBC', result: '6.8', unit: 'G/L', reference: '4.0 - 10.0', isAbnormal: false },
          { name: 'RBC', result: '4.7', unit: 'T/L', reference: '4.2 - 5.9', isAbnormal: false },
          { name: 'HGB', result: '14.2', unit: 'g/dL', reference: '13.0 - 17.5', isAbnormal: false },
          { name: 'PLT', result: '250', unit: 'G/L', reference: '150 - 450', isAbnormal: false },
          { name: 'Glucose', result: '6.5', unit: 'mmol/L', reference: '3.9 - 6.4', isAbnormal: true }, // Abnormal for demo
        ],
        conclusion: 'Các chỉ số phần lớn trong giới hạn bình thường. Đường huyết hơi cao nhẹ.',
        doctorNotes: 'Cần chú ý chế độ ăn uống giảm đường. Tái khám sau 3 tháng.',
        pdfUrl: '#',
      },
      {
        id: 2,
        code: 'XN260815-0045',
        date: '15/08/2026',
        time: '09:15',
        name: 'Siêu âm ổ bụng',
        doctor: 'BS. Trần Thị Mai',
        type: 'Siêu âm',
        status: 'Có kết quả',
        indicators: [],
        conclusion: 'Gan nhiễm mỡ độ 1. Các cơ quan khác bình thường.',
        doctorNotes: 'Hạn chế đồ ăn nhiều dầu mỡ, tăng cường tập thể dục.',
        pdfUrl: '#',
      },
      {
        id: 3,
        code: 'XN260825-0005',
        date: '25/08/2026',
        time: '14:00',
        name: 'Xét nghiệm nước tiểu',
        doctor: 'BS. Lê Trọng Tấn',
        type: 'Nước tiểu',
        status: 'Đang thực hiện',
        indicators: [],
        conclusion: '',
        doctorNotes: '',
        pdfUrl: '',
      },
      {
        id: 4,
        code: 'XN260830-0088',
        date: '30/08/2026',
        time: '10:30',
        name: 'X-quang ngực thẳng',
        doctor: 'BS. Phạm Văn Hùng',
        type: 'X-quang',
        status: 'Đã chỉ định',
        indicators: [],
        conclusion: '',
        doctorNotes: '',
        pdfUrl: '',
      }
    ]
  };
}
