'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, CalendarDays, FileText, Pill, TestTube, 
  Bell, Settings, LogOut, Search, Activity, User, Wallet, 
  Clock, Stethoscope, CheckCircle2, AlertCircle, Download, 
  Printer, Info, FileSignature, Filter
} from 'lucide-react';

export default function PatientPrescriptionsPage() {
  const router = useRouter();
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState('DT001');

  const handleLogout = () => {
    router.push('/login');
  };

  // --- MOCK DATA ---
  const prescriptions = [
    { 
      id: 'DT001', 
      date: '15/08/2026', 
      doctor: 'BS. Nguyễn Văn Bình', 
      specialty: 'Nội tổng quát', 
      diagnosis: 'Viêm họng cấp, cảm cúm', 
      status: 'Đang sử dụng', 
      statusColor: 'text-yellow-700 bg-yellow-100 border-yellow-200',
      medicines: [
        { name: 'Paracetamol 500mg', dosage: '1 viên × 2 lần/ngày', duration: '5 ngày', note: 'Uống sau ăn 30 phút' },
        { name: 'Amoxicillin 500mg', dosage: '1 viên × 3 lần/ngày', duration: '7 ngày', note: 'Uống đủ liệu trình, không tự ý ngưng' },
        { name: 'Vitamin C 500mg', dosage: '1 viên/ngày', duration: '10 ngày', note: 'Uống vào buổi sáng' },
      ],
      instructions: [
        'Uống thuốc đúng liều lượng và thời gian.',
        'Không uống bia rượu trong thời gian dùng kháng sinh.',
        'Tái khám sau 7 ngày nếu triệu chứng không thuyên giảm.'
      ]
    },
    { 
      id: 'DT002', 
      date: '20/07/2026', 
      doctor: 'BS. Trần Thị Lan', 
      specialty: 'Tim mạch', 
      diagnosis: 'Tăng huyết áp vô căn', 
      status: 'Đã hoàn thành', 
      statusColor: 'text-green-700 bg-green-100 border-green-200',
      medicines: [
        { name: 'Amlodipine 5mg', dosage: '1 viên/ngày', duration: '30 ngày', note: 'Uống vào buổi sáng, cùng giờ mỗi ngày' },
      ],
      instructions: [
        'Theo dõi huyết áp hàng ngày.',
        'Hạn chế ăn mặn, tập thể dục nhẹ nhàng.'
      ]
    },
    { 
      id: 'DT003', 
      date: '10/06/2026', 
      doctor: 'BS. Lê Minh Hải', 
      specialty: 'Da liễu', 
      diagnosis: 'Viêm da cơ địa dị ứng', 
      status: 'Đã hoàn thành', 
      statusColor: 'text-green-700 bg-green-100 border-green-200',
      medicines: [
        { name: 'Loratadine 10mg', dosage: '1 viên/ngày', duration: '14 ngày', note: 'Uống trước khi đi ngủ' },
        { name: 'Cream Hydrocortisone 1%', dosage: 'Thoa 2 lần/ngày', duration: '7 ngày', note: 'Thoa lớp mỏng lên vùng da bệnh' },
      ],
      instructions: [
        'Tránh tiếp xúc với hóa chất tẩy rửa mạnh.',
        'Giữ ẩm da thường xuyên.'
      ]
    }
  ];

  const activePrescription = prescriptions.find(p => p.id === selectedPrescriptionId) || prescriptions[0];

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] font-sans text-gray-800 overflow-hidden">
      
      {/* ==========================================
          1. SIDEBAR
      ========================================== */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0 shrink-0 shadow-sm z-20">
        <div className="h-20 flex items-center justify-center border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Activity className="text-[#2563EB]" size={28}/>
            <span className="font-black text-xl tracking-tight text-gray-900">HEALTH<span className="text-[#2563EB]">CARE</span></span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-4 custom-scrollbar">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">Menu chính</p>
          
          <Link href="/patient/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] rounded-2xl transition-all text-sm font-semibold">
            <LayoutDashboard size={18}/> Tổng quan
          </Link>
          <Link href="/patient/appointments" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] rounded-2xl transition-all text-sm font-semibold">
            <CalendarDays size={18}/> Đặt & Lịch khám
          </Link>
          <Link href="/patient/records" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] rounded-2xl transition-all text-sm font-semibold">
            <FileText size={18}/> Hồ sơ sức khỏe
          </Link>
          {/* Active Menu */}
          <Link href="/patient/prescriptions" className="flex items-center gap-3 px-4 py-3 bg-[#2563EB] text-white rounded-2xl font-bold shadow-md shadow-blue-200 transition-all text-sm">
            <Pill size={18}/> Đơn thuốc của tôi
          </Link>
          <Link href="/patient/lab-tests" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] rounded-2xl transition-all text-sm font-semibold">
            <TestTube size={18}/> Kết quả xét nghiệm
          </Link>
          <Link href="/patient/billing" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] rounded-2xl transition-all text-sm font-semibold">
            <Wallet size={18}/> Thanh toán viện phí
          </Link>

          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-6 mb-2 px-2">Tài khoản</p>
          <Link href="/patient/settings" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] rounded-2xl transition-all text-sm font-semibold">
            <Settings size={18}/> Cài đặt cá nhân
          </Link>
        </div>

        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-2xl transition-all text-sm font-bold">
            <LogOut size={18}/> Đăng xuất
          </button>
        </div>
      </aside>

      {/* ==========================================
          2. MAIN CONTENT AREA
      ========================================== */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* TOP HEADER */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 p-2 rounded-lg"><Pill className="text-[#2563EB]" size={24}/></div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Đơn thuốc của tôi</h1>
            </div>
          </div>
          <div className="flex items-center gap-5 ml-auto">
            <button className="relative p-2.5 text-gray-500 hover:bg-blue-50 hover:text-[#2563EB] rounded-full transition bg-white border border-gray-200 shadow-sm">
              <Bell size={20}/>
            </button>
            <div className="flex items-center gap-3 pl-5 border-l border-gray-200 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900 group-hover:text-[#2563EB] transition">Nguyễn Văn A</p>
                <p className="text-xs text-gray-500 font-medium">Bệnh nhân (BN001)</p>
              </div>
              <img src="https://ui-avatars.com/api/?name=Nguyễn+Văn+A&background=2563EB&color=fff" alt="Avatar" className="w-11 h-11 rounded-full border-2 border-white shadow-sm group-hover:shadow-md transition"/>
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 animate-in fade-in duration-500">
          
          {/* DASHBOARD MINI */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <div className="text-[#2563EB] mb-1"><FileSignature size={24}/></div>
              <p className="text-xs text-gray-500 font-bold uppercase">Đơn thuốc</p>
              <p className="text-2xl font-black text-gray-900 mt-1">12</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <div className="text-green-500 mb-1"><CheckCircle2 size={24}/></div>
              <p className="text-xs text-gray-500 font-bold uppercase">Đã hoàn thành</p>
              <p className="text-2xl font-black text-gray-900 mt-1">10</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <div className="text-yellow-500 mb-1"><Clock size={24}/></div>
              <p className="text-xs text-gray-500 font-bold uppercase">Đang sử dụng</p>
              <p className="text-2xl font-black text-gray-900 mt-1">2</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center md:col-span-1">
              <div className="text-purple-500 mb-1"><User size={24}/></div>
              <p className="text-xs text-gray-500 font-bold uppercase">Bác sĩ kê</p>
              <p className="text-2xl font-black text-gray-900 mt-1">5</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center md:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
              <div className="text-blue-600 mb-1"><CalendarDays size={24}/></div>
              <p className="text-xs text-blue-800 font-bold uppercase">Đơn thuốc gần nhất</p>
              <p className="text-xl font-black text-blue-900 mt-1">15/08/2026</p>
            </div>
          </div>

          {/* MASTER-DETAIL LAYOUT */}
          <div className="flex flex-col xl:flex-row gap-8 h-[calc(100vh-280px)] min-h-[600px]">
            
            {/* CỘT TRÁI (MASTER): Danh sách đơn thuốc */}
            <div className="xl:w-[40%] flex flex-col bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50 space-y-4 shrink-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2"><Pill size={18} className="text-[#2563EB]"/> Lịch sử Đơn thuốc</h3>
                </div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input type="text" placeholder="Tìm theo mã đơn, bác sĩ..." className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition-all"/>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16}/>
                  </div>
                  <button className="bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-xl hover:bg-gray-50 transition shadow-sm"><Filter size={18}/></button>
                </div>
              </div>
              
              <div className="flex-1 overflow-auto custom-scrollbar">
                <div className="divide-y divide-gray-50">
                  {prescriptions.map((presc) => (
                    <div 
                      key={presc.id} 
                      onClick={() => setSelectedPrescriptionId(presc.id)}
                      className={`p-5 cursor-pointer transition-all border-l-4 ${selectedPrescriptionId === presc.id ? 'bg-blue-50/50 border-[#2563EB]' : 'border-transparent hover:bg-gray-50'}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-gray-900 text-lg">{presc.id}</span>
                        <span className={`px-2.5 py-1 rounded text-xs font-bold border ${presc.statusColor}`}>{presc.status}</span>
                      </div>
                      <div className="space-y-1.5 text-sm">
                        <p className="text-gray-600 flex items-center gap-2"><CalendarDays size={14} className="text-gray-400"/> {presc.date}</p>
                        <p className="text-gray-600 flex items-center gap-2"><Stethoscope size={14} className="text-gray-400"/> {presc.doctor}</p>
                        <p className="text-gray-900 font-medium line-clamp-1 flex items-center gap-2"><Activity size={14} className="text-gray-400"/> {presc.diagnosis}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CỘT PHẢI (DETAIL): Chi tiết đơn thuốc (Biên lai điện tử) */}
            <div className="xl:w-[60%] flex flex-col bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300 relative">
              
              {/* Toolbar */}
              <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center shrink-0">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border bg-white shadow-sm flex items-center gap-1.5 ${activePrescription.statusColor}`}>
                  {activePrescription.status === 'Đang sử dụng' ? <Clock size={14}/> : <CheckCircle2 size={14}/>} {activePrescription.status}
                </span>
                <div className="flex gap-2">
                  <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl font-bold hover:bg-gray-50 shadow-sm transition flex items-center gap-2 text-sm">
                    <Printer size={16}/> In đơn
                  </button>
                  <button className="bg-[#2563EB] text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-700 shadow-sm transition flex items-center gap-2 text-sm">
                    <Download size={16}/> Tải PDF
                  </button>
                </div>
              </div>

              {/* Prescription Document Area */}
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <div className="max-w-2xl mx-auto border border-gray-200 rounded-2xl p-8 bg-white shadow-sm relative">
                  
                  {/* Watermark */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                    <Activity size={300}/>
                  </div>

                  {/* Header */}
                  <div className="text-center mb-8 border-b border-gray-200 pb-6 relative z-10">
                    <h2 className="text-2xl font-black text-[#2563EB] uppercase tracking-widest mb-1">Đơn Thuốc</h2>
                    <p className="text-gray-500 text-sm">Mã đơn: <strong className="text-gray-900">{activePrescription.id}</strong></p>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8 text-sm relative z-10">
                    <div>
                      <p className="text-gray-500 mb-1">Bệnh nhân:</p>
                      <p className="font-bold text-gray-900 text-lg">Nguyễn Văn A</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Ngày kê đơn:</p>
                      <p className="font-bold text-gray-900">{activePrescription.date}</p>
                    </div>
                    <div className="col-span-2 mt-2">
                      <p className="text-gray-500 mb-1">Chẩn đoán bệnh:</p>
                      <p className="font-bold text-red-600 bg-red-50 p-2 rounded-lg border border-red-100">{activePrescription.diagnosis}</p>
                    </div>
                  </div>

                  {/* Medicine List */}
                  <div className="mb-8 relative z-10">
                    <h3 className="font-bold text-gray-900 mb-4 uppercase text-sm border-b border-gray-200 pb-2 flex items-center gap-2">
                      <Pill size={16} className="text-[#2563EB]"/> Danh sách thuốc (Rx)
                    </h3>
                    <div className="space-y-4">
                      {activePrescription.medicines.map((med, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="font-bold text-gray-400 mt-0.5">{idx + 1}.</div>
                          <div className="flex-1">
                            <p className="font-bold text-gray-900 text-base">{med.name}</p>
                            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                              <span className="text-gray-700"><strong>Liều dùng:</strong> {med.dosage}</span>
                              <span className="text-gray-700"><strong>Thời gian:</strong> {med.duration}</span>
                            </div>
                            <p className="text-sm text-[#2563EB] mt-1 font-medium bg-blue-50 px-2 py-1 rounded inline-block">
                              Ghi chú: {med.note}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="bg-yellow-50/80 border border-yellow-200 rounded-xl p-5 relative z-10">
                    <h3 className="font-bold text-yellow-800 mb-3 flex items-center gap-2 text-sm">
                      <Info size={18}/> Hướng dẫn & Lưu ý từ Bác sĩ
                    </h3>
                    <ul className="space-y-2 text-sm text-yellow-900">
                      {activePrescription.instructions.map((inst, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-yellow-600 mt-0.5">✔</span> {inst}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer / Signature */}
                  <div className="mt-12 flex justify-end relative z-10">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-2">Bác sĩ chỉ định</p>
                      <div className="w-32 h-16 bg-gray-50 rounded mb-2 border border-gray-100 flex items-center justify-center italic text-gray-300">(Chữ ký số)</div>
                      <p className="font-bold text-gray-900">{activePrescription.doctor}</p>
                      <p className="text-xs text-gray-500">{activePrescription.specialty}</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}