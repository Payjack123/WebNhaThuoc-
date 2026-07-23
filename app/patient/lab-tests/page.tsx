'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, CalendarDays, FileText, Pill, TestTube,HeartPulse, 
  Bell, Settings, LogOut, Search, Activity, User, Wallet,Stethoscope, 
  CheckCircle2, AlertCircle, Download, Printer, Filter, 
  LineChart, FileSymlink, Image as ImageIcon, Eye, ChevronRight
} from 'lucide-react';

export default function PatientLabTestsPage() {
  const router = useRouter();
  const [selectedLabId, setSelectedLabId] = useState('XN001');
  const [activeDetailTab, setActiveDetailTab] = useState('results'); // 'results' | 'chart' | 'attachments'

  const handleLogout = () => {
    router.push('/login');
  };

  // --- MOCK DATA ---
  const labTests = [
    { 
      id: 'XN001', 
      date: '15/08/2026', 
      type: 'Xét nghiệm máu tổng quát', 
      doctor: 'BS. Nguyễn Văn Bình', 
      status: 'Có kết quả',
      eval: 'Cần theo dõi', // 🟡
      color: 'text-yellow-700 bg-yellow-100 border-yellow-200',
      iconColor: 'text-red-500 bg-red-50',
      conclusion: 'Các chỉ số cơ bản ổn định. Đường huyết hơi cao so với mức tiêu chuẩn. Cần điều chỉnh chế độ ăn giảm đường, tinh bột và tăng cường vận động. Đề nghị kiểm tra lại sau 3 tháng.',
      metrics: [
        { name: 'Hồng cầu (RBC)', value: '4.8', unit: 'T/L', ref: '4.2 - 5.9', status: 'Bình thường', statusColor: 'text-green-600 bg-green-50 border-green-200' },
        { name: 'Bạch cầu (WBC)', value: '6.5', unit: 'G/L', ref: '4.0 - 10.0', status: 'Bình thường', statusColor: 'text-green-600 bg-green-50 border-green-200' },
        { name: 'Tiểu cầu (PLT)', value: '280', unit: 'G/L', ref: '150 - 450', status: 'Bình thường', statusColor: 'text-green-600 bg-green-50 border-green-200' },
        { name: 'Đường huyết (Glucose)', value: '6.2', unit: 'mmol/L', ref: '3.9 - 6.1', status: 'Hơi cao', statusColor: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
        { name: 'Cholesterol toàn phần', value: '4.5', unit: 'mmol/L', ref: '< 5.2', status: 'Bình thường', statusColor: 'text-green-600 bg-green-50 border-green-200' },
      ]
    },
    { 
      id: 'XN002', 
      date: '20/07/2026', 
      type: 'Siêu âm ổ bụng', 
      doctor: 'BS. Trần Thị Lan', 
      status: 'Có kết quả',
      eval: 'Bình thường', // 🟢
      color: 'text-green-700 bg-green-100 border-green-200',
      iconColor: 'text-blue-500 bg-blue-50',
      conclusion: 'Gan, mật, tụy, lách, thận hai bên kích thước và cấu trúc bình thường. Không thấy hình ảnh sỏi hay khối u bất thường. Dịch tự do ổ bụng không có.',
      metrics: []
    },
    { 
      id: 'XN003', 
      date: '10/06/2026', 
      type: 'X-Quang tim phổi thẳng', 
      doctor: 'BS. Lê Minh Hải', 
      status: 'Có kết quả',
      eval: 'Bình thường', // 🟢
      color: 'text-green-700 bg-green-100 border-green-200',
      iconColor: 'text-purple-500 bg-purple-50',
      conclusion: 'Bóng tim không to. Rốn phổi hai bên đậm. Không thấy tổn thương nhu mô phổi hai bên đang tiến triển. Cấu trúc lồng ngực bình thường.',
      metrics: []
    }
  ];

  const activeLab = labTests.find(l => l.id === selectedLabId) || labTests[0];

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
          <Link href="/patient/prescriptions" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] rounded-2xl transition-all text-sm font-semibold">
            <Pill size={18}/> Đơn thuốc của tôi
          </Link>
          {/* Active Menu */}
          <Link href="/patient/lab-tests" className="flex items-center gap-3 px-4 py-3 bg-[#2563EB] text-white rounded-2xl font-bold shadow-md shadow-blue-200 transition-all text-sm">
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
            <div className="bg-blue-50 p-2 rounded-lg"><TestTube className="text-[#2563EB]" size={24}/></div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Kết quả Xét nghiệm</h1>
            </div>
          </div>
          <div className="flex items-center gap-5 ml-auto">
            <button className="relative p-2.5 text-gray-500 hover:bg-blue-50 hover:text-[#2563EB] rounded-full transition bg-white border border-gray-200 shadow-sm">
              <Bell size={20}/>
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
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
              <div className="text-[#2563EB] mb-1"><TestTube size={24}/></div>
              <p className="text-xs text-gray-500 font-bold uppercase">Lần xét nghiệm</p>
              <p className="text-2xl font-black text-gray-900 mt-1">18</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <div className="text-green-500 mb-1"><CheckCircle2 size={24}/></div>
              <p className="text-xs text-gray-500 font-bold uppercase">Bình thường</p>
              <p className="text-2xl font-black text-gray-900 mt-1">16</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <div className="text-yellow-500 mb-1"><AlertCircle size={24}/></div>
              <p className="text-xs text-gray-500 font-bold uppercase">Cần theo dõi</p>
              <p className="text-2xl font-black text-gray-900 mt-1">2</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center md:col-span-1">
              <div className="text-purple-500 mb-1"><FileSymlink size={24}/></div>
              <p className="text-xs text-gray-500 font-bold uppercase">Phiếu kết quả</p>
              <p className="text-2xl font-black text-gray-900 mt-1">18</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center md:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
              <div className="text-blue-600 mb-1"><CalendarDays size={24}/></div>
              <p className="text-xs text-blue-800 font-bold uppercase">Xét nghiệm gần nhất</p>
              <p className="text-xl font-black text-blue-900 mt-1">15/08/2026</p>
            </div>
          </div>

          {/* MASTER-DETAIL LAYOUT */}
          <div className="flex flex-col xl:flex-row gap-8 h-[calc(100vh-280px)] min-h-[650px]">
            
            {/* CỘT TRÁI (MASTER): Danh sách xét nghiệm */}
            <div className="xl:w-[40%] flex flex-col bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50 space-y-4 shrink-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2"><TestTube size={18} className="text-[#2563EB]"/> Lịch sử Xét nghiệm</h3>
                </div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input type="text" placeholder="Tìm kiếm loại xét nghiệm..." className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition-all"/>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16}/>
                  </div>
                  <select className="bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-xl text-sm hover:bg-gray-50 outline-none shadow-sm cursor-pointer">
                    <option>Tất cả loại</option>
                    <option>Xét nghiệm Máu</option>
                    <option>X-Quang</option>
                    <option>Siêu âm</option>
                  </select>
                </div>
              </div>
              
              <div className="flex-1 overflow-auto custom-scrollbar">
                <div className="divide-y divide-gray-50">
                  {labTests.map((lab) => (
                    <div 
                      key={lab.id} 
                      onClick={() => setSelectedLabId(lab.id)}
                      className={`p-5 cursor-pointer transition-all border-l-4 ${selectedLabId === lab.id ? 'bg-blue-50/50 border-[#2563EB]' : 'border-transparent hover:bg-gray-50'}`}
                    >
                      <div className="flex gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-white shadow-sm ${lab.iconColor}`}>
                          {lab.type.includes('Máu') ? <Activity size={20}/> : lab.type.includes('Siêu âm') ? <HeartPulse size={20}/> : <ImageIcon size={20}/>}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className={`font-bold text-base line-clamp-1 pr-2 ${selectedLabId === lab.id ? 'text-[#2563EB]' : 'text-gray-900'}`}>{lab.type}</h4>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border whitespace-nowrap ${lab.color}`}>{lab.eval}</span>
                          </div>
                          <p className="text-sm text-gray-600 flex items-center gap-2"><CalendarDays size={14} className="text-gray-400"/> {lab.date} - {lab.id}</p>
                          <p className="text-sm text-gray-600 flex items-center gap-2 mt-0.5"><User size={14} className="text-gray-400"/> {lab.doctor}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CỘT PHẢI (DETAIL): Chi tiết Phiếu kết quả */}
            <div className="xl:w-[60%] flex flex-col bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300 relative">
              
              {/* Header của Phiếu */}
              <div className="p-6 border-b border-gray-100 bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white shrink-0 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><TestTube size={100}/></div>
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs font-bold text-blue-200 mb-3 inline-block">Mã XN: {activeLab.id}</span>
                    <h2 className="text-2xl font-black">{activeLab.type}</h2>
                    <p className="text-gray-300 mt-2 flex items-center gap-2 text-sm"><CalendarDays size={16}/> Ngày thực hiện: {activeLab.date}</p>
                    <p className="text-gray-300 mt-1 flex items-center gap-2 text-sm"><Stethoscope size={16}/> Bác sĩ chỉ định: {activeLab.doctor}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-3 py-2 rounded-xl transition flex items-center gap-2 text-sm backdrop-blur-sm">
                      <Printer size={16}/>
                    </button>
                    <button className="bg-[#2563EB] text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-600 shadow-md transition flex items-center gap-2 text-sm">
                      <Download size={16}/> Tải PDF
                    </button>
                  </div>
                </div>
              </div>

              {/* TABS NỘI BỘ */}
              <div className="flex px-4 border-b border-gray-100 bg-gray-50 shrink-0">
                {[
                  { id: 'results', label: 'Kết quả chi tiết', icon: FileText },
                  { id: 'chart', label: 'Biểu đồ theo dõi', icon: LineChart },
                  { id: 'attachments', label: 'Tệp đính kèm', icon: FileSymlink }
                ].map((tab) => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveDetailTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-4 font-bold text-sm border-b-2 transition-all ${activeDetailTab === tab.id ? 'border-[#2563EB] text-[#2563EB] bg-white' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  >
                    <tab.icon size={16}/> {tab.label}
                  </button>
                ))}
              </div>

              {/* NỘI DUNG TABS */}
              <div className="flex-1 overflow-y-auto p-6 bg-white custom-scrollbar">
                
                {/* 1. KẾT QUẢ CHI TIẾT */}
                {activeDetailTab === 'results' && (
                  <div className="animate-in fade-in space-y-6">
                    
                    {/* Bảng chỉ số (Nếu có) */}
                    {activeLab.metrics.length > 0 ? (
                      <div className="border border-gray-200 rounded-2xl overflow-hidden">
                        <table className="w-full text-sm text-left">
                          <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 font-bold">
                            <tr>
                              <th className="px-4 py-3">Chỉ số xét nghiệm</th>
                              <th className="px-4 py-3 text-center">Kết quả</th>
                              <th className="px-4 py-3 text-center text-gray-500">CS tham chiếu</th>
                              <th className="px-4 py-3 text-right">Đánh giá</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {activeLab.metrics.map((metric, idx) => (
                              <tr key={idx} className="hover:bg-gray-50 transition">
                                <td className="px-4 py-4 font-bold text-gray-900">{metric.name}</td>
                                <td className="px-4 py-4 text-center">
                                  <span className={`font-black text-lg ${metric.status === 'Bình thường' ? 'text-gray-900' : 'text-red-600'}`}>{metric.value}</span>
                                  <span className="text-xs text-gray-500 ml-1">{metric.unit}</span>
                                </td>
                                <td className="px-4 py-4 text-center text-gray-500">{metric.ref}</td>
                                <td className="px-4 py-4 text-right">
                                  <span className={`px-2 py-1 rounded text-xs font-bold border inline-block ${metric.statusColor}`}>{metric.status}</span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 text-center text-gray-500">
                        Xét nghiệm này không có bảng chỉ số định lượng. Vui lòng xem kết luận bên dưới hoặc tệp đính kèm.
                      </div>
                    )}

                    {/* Kết luận bác sĩ */}
                    <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6">
                      <h3 className="font-bold text-[#2563EB] mb-3 flex items-center gap-2"><Stethoscope size={18}/> Kết luận từ Bác sĩ</h3>
                      <p className="text-gray-700 leading-relaxed">{activeLab.conclusion}</p>
                    </div>

                  </div>
                )}

                {/* 2. BIỂU ĐỒ THEO DÕI */}
                {activeDetailTab === 'chart' && (
                  <div className="animate-in fade-in">
                    {activeLab.metrics.length > 0 ? (
                      <div className="border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-8">
                          <h3 className="font-bold text-gray-900 flex items-center gap-2"><LineChart size={18} className="text-[#2563EB]"/> Theo dõi Đường huyết (Glucose)</h3>
                          <span className="text-xs font-bold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg">6 tháng gần nhất</span>
                        </div>
                        
                        {/* CSS MOCK CHART */}
                        <div className="h-64 w-full max-w-2xl mx-auto flex items-end justify-between gap-2 pb-6 border-b border-l border-gray-200 px-4 relative pt-10">
                          {/* Grid lines */}
                          <div className="absolute top-[20%] left-0 w-full border-t border-dashed border-gray-200"></div>
                          <div className="absolute top-[50%] left-0 w-full border-t border-dashed border-gray-200"></div>
                          <div className="absolute top-[80%] left-0 w-full border-t border-dashed border-gray-200"></div>
                          
                          {/* Reference Zone (Safe range 3.9 - 6.1) */}
                          <div className="absolute bottom-6 w-full bg-green-500/10 border-y border-green-500/20 z-0" style={{ height: '30%', bottom: '25%' }}></div>

                          {[
                            { month: 'T3', val: 5.5, h: '45%' },
                            { month: 'T4', val: 5.8, h: '50%' },
                            { month: 'T5', val: 5.2, h: '40%' },
                            { month: 'T6', val: 6.0, h: '55%' },
                            { month: 'T7', val: 5.9, h: '52%' },
                            { month: 'T8', val: 6.2, h: '60%', warning: true }, // Hiện tại
                          ].map((point, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-3 relative group w-full z-10 h-full justify-end">
                              <div className="w-2 bg-transparent relative flex flex-col justify-end items-center" style={{ height: point.h }}>
                                 <div className={`w-4 h-4 border-4 rounded-full shadow-md z-20 transition cursor-pointer bg-white ${point.warning ? 'border-yellow-500 scale-125' : 'border-[#2563EB] group-hover:scale-125'}`}></div>
                                 <div className="absolute -top-10 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition shadow-lg pointer-events-none whitespace-nowrap">
                                   {point.val} mmol/L
                                 </div>
                              </div>
                              <span className="text-sm font-bold text-gray-500 absolute -bottom-6">{point.month}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-10 flex items-center justify-center gap-6 text-sm text-gray-500">
                          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500"></span> Vùng an toàn (3.9 - 6.1)</div>
                          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-500"></span> Vượt ngưỡng</div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                        <Activity size={48} className="mb-4 opacity-20"/>
                        <p>Không có dữ liệu biểu đồ cho loại xét nghiệm này.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. TỆP ĐÍNH KÈM */}
                {activeDetailTab === 'attachments' && (
                  <div className="animate-in fade-in grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-2xl p-5 flex items-center justify-between hover:border-[#2563EB] hover:shadow-md transition cursor-pointer group bg-white">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center group-hover:scale-110 transition"><FileText size={24}/></div>
                        <div>
                          <p className="font-bold text-gray-900">Phiếu kết quả gốc</p>
                          <p className="text-xs text-gray-500">PDF • 1.2 MB</p>
                        </div>
                      </div>
                      <button className="text-[#2563EB] bg-blue-50 p-2 rounded-lg group-hover:bg-[#2563EB] group-hover:text-white transition"><Download size={18}/></button>
                    </div>

                    {!activeLab.type.includes('Máu') && (
                      <div className="border border-gray-200 rounded-2xl p-5 flex items-center justify-between hover:border-[#2563EB] hover:shadow-md transition cursor-pointer group bg-white">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition"><ImageIcon size={24}/></div>
                          <div>
                            <p className="font-bold text-gray-900">Hình ảnh chẩn đoán</p>
                            <p className="text-xs text-gray-500">JPG • 3 Ảnh</p>
                          </div>
                        </div>
                        <button className="text-[#2563EB] bg-blue-50 p-2 rounded-lg group-hover:bg-[#2563EB] group-hover:text-white transition"><Eye size={18}/></button>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}