'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, CalendarDays, FileText, Pill, TestTube, History,
  Bell, Settings, LogOut, Search, Activity, User, Wallet, 
  HeartPulse, Droplet, ArrowRight, Clock, MapPin, Stethoscope, 
  Bot, CheckCircle2, AlertCircle, Download, Printer, ShieldPlus, 
  AlertTriangle, LineChart, Scale, Thermometer, ChevronRight
} from 'lucide-react';

export default function PatientRecordsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    router.push('/login');
  };

  // --- MOCK DATA ---
  const patientInfo = {
    name: 'Nguyễn Văn A', id: 'BN001', dob: '20/05/2003', gender: 'Nam',
    phone: '0981.234.567', email: 'nguyenvana@gmail.com', address: 'Quận Cầu Giấy, Hà Nội',
    bloodType: 'O+', bhyt: 'DN40123456789'
  };

  const vitals = {
    height: '170 cm', weight: '65 kg', bmi: '22.5', bp: '120/80', hr: '72 bpm', temp: '36.8°C'
  };

  const allergies = ['Penicillin (Thuốc kháng sinh)', 'Hải sản (Mức độ nhẹ)'];
  
  const chronicDiseases = [
    { name: 'Viêm dạ dày', year: '2023', status: 'Đang kiểm soát', color: 'text-green-600 bg-green-100 border-green-200' },
    { name: 'Viêm xoang mãn tính', year: '2024', status: 'Theo dõi định kỳ', color: 'text-yellow-600 bg-yellow-100 border-yellow-200' }
  ];

  const visitHistory = [
    { id: 'BA001', date: '15/08/2026', doctor: 'BS. Nguyễn Văn Bình', dept: 'Nội tổng quát', diagnosis: 'Cảm cúm, Viêm họng cấp', status: 'Hoàn thành' },
    { id: 'BA002', date: '12/06/2026', doctor: 'BS. Trần Thị Lan', dept: 'Tim mạch', diagnosis: 'Kiểm tra sức khỏe định kỳ', status: 'Hoàn thành' },
    { id: 'BA003', date: '20/04/2026', doctor: 'BS. Lê Minh Hải', dept: 'Da liễu', diagnosis: 'Viêm da cơ địa nhẹ', status: 'Hoàn thành' },
  ];

  const recentLabs = [
    { date: '15/08/2026', type: 'Xét nghiệm máu', result: 'Bình thường', color: 'text-green-600 bg-green-50' },
    { date: '10/07/2026', type: 'Xét nghiệm nước tiểu', result: 'Bình thường', color: 'text-green-600 bg-green-50' },
    { date: '20/05/2026', type: 'X-Quang Phổi', result: 'Không có bất thường', color: 'text-green-600 bg-green-50' },
  ];

  const recentPrescriptions = [
    { date: '15/08/2026', doctor: 'BS. Bình', count: 4, status: 'Hoàn thành' },
    { date: '20/04/2026', doctor: 'BS. Hải', count: 3, status: 'Hoàn thành' },
  ];

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
          {/* Active Menu */}
          <Link href="/patient/records" className="flex items-center gap-3 px-4 py-3 bg-[#2563EB] text-white rounded-2xl font-bold shadow-md shadow-blue-200 transition-all text-sm">
            <FileText size={18}/> Hồ sơ sức khỏe
          </Link>
          <Link href="/patient/prescriptions" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] rounded-2xl transition-all text-sm font-semibold">
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
            <div className="bg-blue-50 p-2 rounded-lg"><FileText className="text-[#2563EB]" size={24}/></div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Hồ sơ Sức khỏe</h1>
            </div>
          </div>
          <div className="flex items-center gap-5 ml-auto">
            <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl font-bold hover:bg-gray-50 shadow-sm transition flex items-center gap-2 text-sm">
              <Download size={16}/> Tải PDF
            </button>
            <div className="flex items-center gap-3 pl-5 border-l border-gray-200 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900 group-hover:text-[#2563EB] transition">{patientInfo.name}</p>
                <p className="text-xs text-gray-500 font-medium">Bệnh nhân ({patientInfo.id})</p>
              </div>
              <img src={`https://ui-avatars.com/api/?name=${patientInfo.name.replace(/ /g, '+')}&background=2563EB&color=fff`} alt="Avatar" className="w-11 h-11 rounded-full border-2 border-white shadow-sm group-hover:shadow-md transition"/>
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 animate-in fade-in duration-500 relative">
          
          {/* BACKGROUND DECORATION */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none -z-10"></div>

          {/* KPI CARDS (Dashboard Mini) */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center"><CalendarDays size={20}/></div>
              <div><p className="text-xs text-gray-500 font-bold uppercase">Lần khám</p><p className="text-lg font-black text-gray-900">15</p></div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center"><FileText size={20}/></div>
              <div><p className="text-xs text-gray-500 font-bold uppercase">Bệnh án</p><p className="text-lg font-black text-gray-900">15</p></div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center"><Pill size={20}/></div>
              <div><p className="text-xs text-gray-500 font-bold uppercase">Đơn thuốc</p><p className="text-lg font-black text-gray-900">8</p></div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center"><TestTube size={20}/></div>
              <div><p className="text-xs text-gray-500 font-bold uppercase">Xét nghiệm</p><p className="text-lg font-black text-gray-900">12</p></div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center"><AlertTriangle size={20}/></div>
              <div><p className="text-xs text-gray-500 font-bold uppercase">Bệnh lý</p><p className="text-lg font-black text-gray-900">2</p></div>
            </div>
          </div>

          {/* MAIN INFO CARD */}
          <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-3xl p-6 md:p-8 text-white shadow-lg mb-8 flex flex-col md:flex-row gap-8 items-center md:items-start relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 translate-x-20 -translate-y-20"></div>
            
            <div className="shrink-0 flex flex-col items-center">
              <img src={`https://ui-avatars.com/api/?name=${patientInfo.name.replace(/ /g, '+')}&background=random&size=256`} alt="Avatar" className="w-32 h-32 rounded-2xl border-4 border-white/20 shadow-xl mb-4"/>
              <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"><ShieldPlus size={14} className="text-green-400"/> BHYT Hợp lệ</span>
            </div>
            
            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8 z-10">
              <div className="col-span-1 md:col-span-2 lg:col-span-3 border-b border-gray-700 pb-4">
                <h2 className="text-3xl font-black">{patientInfo.name}</h2>
                <p className="text-gray-400 text-sm mt-1">Mã y tế: <strong className="text-white">{patientInfo.id}</strong> • Cập nhật lần cuối: Hôm qua</p>
              </div>
              
              <div><p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Ngày sinh</p><p className="font-bold text-lg">{patientInfo.dob}</p></div>
              <div><p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Giới tính</p><p className="font-bold text-lg">{patientInfo.gender}</p></div>
              <div><p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1 flex items-center gap-1"><Droplet size={14} className="text-red-400"/> Nhóm máu</p><p className="font-bold text-lg text-red-100">{patientInfo.bloodType}</p></div>
              
              <div><p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Số điện thoại</p><p className="font-bold">{patientInfo.phone}</p></div>
              <div className="col-span-2"><p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Địa chỉ</p><p className="font-bold">{patientInfo.address}</p></div>
            </div>
          </div>

          {/* TABS THÔNG MINH */}
          <div className="flex bg-gray-200/60 p-1.5 rounded-2xl w-max mb-6 border border-gray-200/60 shadow-sm overflow-x-auto custom-scrollbar">
            {[
              { id: 'overview', label: 'Tổng quan & Chỉ số', icon: Activity },
              { id: 'history', label: 'Lịch sử Khám bệnh', icon: History },
              { id: 'records', label: 'Đơn thuốc & Xét nghiệm', icon: FileText },
              { id: 'charts', label: 'Biểu đồ sức khỏe', icon: LineChart },
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id ? 'bg-white text-[#2563EB] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                <tab.icon size={16}/> {tab.label}
              </button>
            ))}
          </div>

          {/* ======================= TAB 1: TỔNG QUAN ======================= */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in">
              
              {/* Chỉ số Vitals */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><Activity size={20} className="text-[#2563EB]"/> Chỉ số Sức khỏe cơ bản</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl flex flex-col items-center justify-center text-center">
                    <Scale size={24} className="text-blue-500 mb-2"/>
                    <p className="text-xs text-gray-500 font-bold uppercase">Cân nặng</p>
                    <p className="text-xl font-black text-gray-900 mt-1">{vitals.weight}</p>
                  </div>
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl flex flex-col items-center justify-center text-center">
                    <User size={24} className="text-indigo-500 mb-2"/>
                    <p className="text-xs text-gray-500 font-bold uppercase">Chiều cao</p>
                    <p className="text-xl font-black text-gray-900 mt-1">{vitals.height}</p>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-2xl flex flex-col items-center justify-center text-center">
                    <Activity size={24} className="text-green-600 mb-2"/>
                    <p className="text-xs text-gray-500 font-bold uppercase">BMI (Bình thường)</p>
                    <p className="text-xl font-black text-green-700 mt-1">{vitals.bmi}</p>
                  </div>
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl flex flex-col items-center justify-center text-center">
                    <Droplet size={24} className="text-red-500 mb-2"/>
                    <p className="text-xs text-gray-500 font-bold uppercase">Huyết áp</p>
                    <p className="text-xl font-black text-gray-900 mt-1">{vitals.bp}</p>
                  </div>
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl flex flex-col items-center justify-center text-center">
                    <HeartPulse size={24} className="text-pink-500 mb-2"/>
                    <p className="text-xs text-gray-500 font-bold uppercase">Nhịp tim</p>
                    <p className="text-xl font-black text-gray-900 mt-1">{vitals.hr}</p>
                  </div>
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl flex flex-col items-center justify-center text-center">
                    <Thermometer size={24} className="text-orange-500 mb-2"/>
                    <p className="text-xs text-gray-500 font-bold uppercase">Nhiệt độ</p>
                    <p className="text-xl font-black text-gray-900 mt-1">{vitals.temp}</p>
                  </div>
                </div>
              </div>

              {/* Dị ứng & Bệnh mãn tính */}
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><AlertTriangle size={18} className="text-red-500"/> Dị ứng</h3>
                  <div className="flex flex-wrap gap-2">
                    {allergies.map((item, idx) => (
                      <span key={idx} className="bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5">
                        <AlertCircle size={14}/> {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><HeartPulse size={18} className="text-blue-500"/> Bệnh lý mãn tính</h3>
                  <div className="space-y-3">
                    {chronicDiseases.map((disease, idx) => (
                      <div key={idx} className="border border-gray-100 rounded-xl p-3 bg-gray-50">
                        <div className="flex justify-between items-start">
                          <p className="font-bold text-gray-900">{disease.name}</p>
                          <span className="text-xs font-bold text-gray-400">Từ {disease.year}</span>
                        </div>
                        <span className={`inline-block mt-2 px-2 py-1 rounded text-[10px] font-bold border ${disease.color}`}>
                          {disease.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ======================= TAB 2: LỊCH SỬ KHÁM ======================= */}
          {activeTab === 'history' && (
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 animate-in fade-in">
               <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 text-lg"><History size={20} className="text-[#2563EB]"/> Lịch sử Khám bệnh & Bệnh án</h3>
               <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold">
                    <tr>
                      <th className="px-5 py-4 rounded-tl-xl">Ngày khám / Mã BA</th>
                      <th className="px-5 py-4">Bác sĩ & Chuyên khoa</th>
                      <th className="px-5 py-4">Chẩn đoán / Kết luận</th>
                      <th className="px-5 py-4 text-center">Trạng thái</th>
                      <th className="px-5 py-4 text-right rounded-tr-xl">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {visitHistory.map((visit, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition">
                        <td className="px-5 py-4">
                          <p className="font-bold text-gray-900">{visit.date}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{visit.id}</p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-bold text-[#2563EB]">{visit.doctor}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{visit.dept}</p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-medium text-gray-800">{visit.diagnosis}</p>
                        </td>
                        <td className="px-5 py-4 text-center">
                           <span className="bg-green-100 text-green-700 border border-green-200 px-2 py-1 rounded text-xs font-bold inline-flex items-center justify-center gap-1"><CheckCircle2 size={12}/> {visit.status}</span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button className="text-[#2563EB] font-bold text-sm bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition">Xem chi tiết</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
               </div>
            </div>
          )}

          {/* ======================= TAB 3: ĐƠN THUỐC & XÉT NGHIỆM ======================= */}
          {activeTab === 'records' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in">
              {/* Kết quả xét nghiệm */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><TestTube size={20} className="text-purple-600"/> Kết quả Xét nghiệm</h3>
                <div className="space-y-3">
                  {recentLabs.map((lab, idx) => (
                    <div key={idx} className="border border-gray-100 rounded-xl p-4 flex items-center justify-between hover:border-purple-200 hover:shadow-sm transition cursor-pointer group">
                      <div className="flex gap-4 items-center">
                        <div className="bg-purple-50 p-2.5 rounded-lg text-purple-600 group-hover:scale-110 transition"><TestTube size={20}/></div>
                        <div>
                          <p className="font-bold text-gray-900">{lab.type}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{lab.date}</p>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end gap-2">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold border ${lab.color}`}>{lab.result}</span>
                        <span className="text-[#2563EB] text-xs font-bold hover:underline">Tải PDF</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Đơn thuốc gần đây */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><Pill size={20} className="text-orange-500"/> Đơn thuốc gần đây</h3>
                <div className="space-y-3">
                  {recentPrescriptions.map((pres, idx) => (
                    <div key={idx} className="border border-gray-100 rounded-xl p-4 flex items-center justify-between hover:border-orange-200 hover:shadow-sm transition cursor-pointer group">
                      <div className="flex gap-4 items-center">
                        <div className="bg-orange-50 p-2.5 rounded-lg text-orange-500 group-hover:scale-110 transition"><Pill size={20}/></div>
                        <div>
                          <p className="font-bold text-gray-900">Đơn thuốc ({pres.count} loại)</p>
                          <p className="text-xs text-gray-500 mt-0.5">{pres.date} • {pres.doctor}</p>
                        </div>
                      </div>
                      <button className="w-8 h-8 rounded-full bg-gray-50 text-gray-400 group-hover:bg-[#2563EB] group-hover:text-white flex items-center justify-center transition">
                        <ChevronRight size={16}/>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================= TAB 4: BIỂU ĐỒ (A+ CSS Chart) ======================= */}
          {activeTab === 'charts' && (
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 animate-in fade-in">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg"><LineChart size={20} className="text-[#2563EB]"/> Theo dõi Cân nặng (6 tháng)</h3>
                <span className="bg-blue-50 text-[#2563EB] font-bold text-sm px-3 py-1.5 rounded-lg border border-blue-100">Mục tiêu: 65 kg</span>
              </div>
              
              {/* CSS MOCK CHART */}
              <div className="h-72 w-full max-w-4xl mx-auto flex items-end justify-between gap-2 pb-6 border-b border-l border-gray-200 px-4 relative pt-10">
                {/* Grid lines */}
                <div className="absolute top-[20%] left-0 w-full border-t border-dashed border-gray-200"></div>
                <div className="absolute top-[50%] left-0 w-full border-t border-dashed border-gray-200"></div>
                <div className="absolute top-[80%] left-0 w-full border-t border-dashed border-gray-200"></div>

                {[
                  { month: 'T3', weight: 68, h: '85%' },
                  { month: 'T4', weight: 67.5, h: '80%' },
                  { month: 'T5', weight: 66, h: '65%' },
                  { month: 'T6', weight: 66.5, h: '70%' },
                  { month: 'T7', weight: 65.5, h: '55%' },
                  { month: 'T8', weight: 65, h: '50%' }, // Hiện tại
                ].map((point, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-3 relative group w-full z-10 h-full justify-end">
                    {/* Bar (Invisible but creates height) & Plot point */}
                    <div className="w-2 bg-transparent relative flex flex-col justify-end items-center" style={{ height: point.h }}>
                       <div className="w-5 h-5 bg-white border-4 border-[#2563EB] rounded-full shadow-md z-20 group-hover:scale-125 transition cursor-pointer"></div>
                       {/* Line simulation (CSS hack for visual connection - optional, leaving out for clean dots) */}
                       
                       {/* Tooltip */}
                       <div className="absolute -top-10 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition shadow-lg pointer-events-none whitespace-nowrap">
                         {point.weight} kg
                       </div>
                    </div>
                    {/* X Axis Label */}
                    <span className="text-sm font-bold text-gray-500 absolute -bottom-6">{point.month}</span>
                  </div>
                ))}
              </div>
              <div className="text-center mt-10 text-sm text-gray-500">
                <span className="inline-block w-3 h-3 rounded-full bg-[#2563EB] mr-2 align-middle"></span> 
                Trọng lượng cơ thể (kg). Xu hướng: <span className="font-bold text-green-600">Giảm ổn định (Tốt)</span>
              </div>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}