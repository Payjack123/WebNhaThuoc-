'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Users, CalendarDays, FileText, Pill, TestTube, 
  Bell, Settings, LogOut, Search, Activity, User, Building2, 
  ShieldCheck, History, Wallet, CheckCircle2, XCircle, Clock,
  Download, Printer, Filter, Eye, Check, ShieldPlus, Droplet
} from 'lucide-react';

export default function AdminPrescriptionsPage() {
  const router = useRouter();
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState('DT001');
  const [activeTab, setActiveTab] = useState('drugs');
  const [dateRange, setDateRange] = useState('Tháng này');

  const handleLogout = () => {
    // localStorage.removeItem('token');
    router.push('/login');
  };

  // Mock dữ liệu Đơn thuốc
  const prescriptions = [
    { id: 'DT001', patient: 'Nguyễn Văn A', patientId: 'BN001', gender: 'Nam', age: 25, doctor: 'BS Nguyễn Văn Bình', specialty: 'Nội tổng quát', date: '15/08/2026', drugCount: 4, status: 'Đã phát', statusColor: 'text-green-700 bg-green-100 border-green-200' },
    { id: 'DT002', patient: 'Trần Thị B', patientId: 'BN002', gender: 'Nữ', age: 32, doctor: 'BS Trần Thị An', specialty: 'Tim mạch', date: '15/08/2026', drugCount: 3, status: 'Chờ phát', statusColor: 'text-yellow-700 bg-yellow-100 border-yellow-200' },
    { id: 'DT003', patient: 'Lê Văn C', patientId: 'BN003', gender: 'Nam', age: 41, doctor: 'BS Lê Minh Hải', specialty: 'Da liễu', date: '14/08/2026', drugCount: 5, status: 'Đã hủy', statusColor: 'text-red-700 bg-red-100 border-red-200' },
    { id: 'DT004', patient: 'Phạm Minh D', patientId: 'BN004', gender: 'Nam', age: 58, doctor: 'BS Trần Hùng', specialty: 'Nhi khoa', date: '14/08/2026', drugCount: 2, status: 'Đã phát', statusColor: 'text-green-700 bg-green-100 border-green-200' },
    { id: 'DT005', patient: 'Hoàng Ngọc E', patientId: 'BN005', gender: 'Nữ', age: 29, doctor: 'BS Nguyễn Văn Bình', specialty: 'Nội tổng quát', date: '13/08/2026', drugCount: 6, status: 'Đã phát', statusColor: 'text-green-700 bg-green-100 border-green-200' },
  ];

  const activePrescription = prescriptions.find(p => p.id === selectedPrescriptionId) || prescriptions[0];

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans text-gray-800 overflow-hidden">
      
      {/* ==========================================
          1. SIDEBAR
      ========================================== */}
      <aside className="w-64 bg-[#0F172A] text-gray-300 flex flex-col h-screen sticky top-0 shrink-0 shadow-xl z-20">
        <div className="h-20 flex items-center justify-center border-b border-gray-800 bg-[#0B1120]">
          <div className="flex items-center gap-2 text-white">
            <Activity className="text-[#2563EB]" size={28}/>
            <span className="font-bold text-xl tracking-tight">ADMIN<span className="text-[#2563EB]">PRO</span></span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-6 px-3 custom-scrollbar">
          
          <div className="space-y-1">
            <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">1. Tổng quan</p>
            <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <LayoutDashboard size={18}/> Dashboard & Báo cáo
            </Link>
          </div>

          <div className="space-y-1">
            <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">2. Phòng khám</p>
            <Link href="/admin/doctors" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <User size={18}/> Quản lý Bác sĩ
            </Link>
            <Link href="/admin/patients" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <Users size={18}/> Quản lý Bệnh nhân
            </Link>
            <Link href="/admin/appointments" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <CalendarDays size={18}/> Quản lý Lịch khám
            </Link>
            <Link href="/admin/records" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <FileText size={18}/> Hồ sơ bệnh án
            </Link>
            {/* Active Menu */}
            <Link href="/admin/prescriptions" className="flex items-center gap-3 px-4 py-2.5 bg-[#2563EB] text-white rounded-xl font-medium shadow-md transition-all text-sm">
              <Pill size={18}/> Quản lý Đơn thuốc
            </Link>
            <Link href="/admin/lab-tests" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <TestTube size={18}/> Quản lý Xét nghiệm
            </Link>
          </div>

          <div className="space-y-1">
            <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">3. Hệ thống</p>
            <Link href="/admin/users" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <ShieldCheck size={18}/> Phân quyền (RBAC)
            </Link>
            <Link href="/admin/departments" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <Building2 size={18}/> Khoa phòng & Dịch vụ
            </Link>
            <Link href="/admin/billing" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <Wallet size={18}/> Thanh toán & Viện phí
            </Link>
          </div>

          <div className="space-y-1">
            <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">4. Cấu hình</p>
            <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <Settings size={18}/> Cài đặt chung
            </Link>
          </div>

        </div>

        <div className="p-4 border-t border-gray-800 bg-[#0B1120]">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all text-sm font-bold"
          >
            <LogOut size={18}/> Đăng xuất
          </button>
        </div>
      </aside>

      {/* ==========================================
          2. MAIN CONTENT AREA
      ========================================== */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50 relative">
        
        {/* TOP HEADER */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 p-2 rounded-lg"><Pill className="text-[#2563EB]" size={24}/></div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Quản lý Đơn thuốc</h1>
              <p className="text-xs text-gray-500 font-medium">Quản lý, theo dõi và tra cứu toàn bộ đơn thuốc trong hệ thống</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-[#2563EB] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md transition-all flex items-center gap-2 text-sm">
              <Download size={18}/> Xuất danh sách
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-gray-900">Quản trị viên</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#172554] text-white flex items-center justify-center font-bold border-2 border-white shadow-sm">AD</div>
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-8 animate-in fade-in duration-500">
          
          {/* 6 KPI CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            {[
              { label: 'Tổng đơn thuốc', value: '3,280', icon: Pill, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Đơn hôm nay', value: '45', icon: CalendarDays, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { label: 'Đã phát thuốc', value: '3,050', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Chờ phát thuốc', value: '180', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
              { label: 'Đã hủy', value: '50', icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
              { label: 'Giá trị thuốc', value: '520 Tr', icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            ].map((kpi, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all duration-300">
                <div className={`w-12 h-12 ${kpi.bg} ${kpi.color} rounded-2xl flex items-center justify-center shrink-0`}><kpi.icon size={24}/></div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">{kpi.label}</p>
                  <p className="text-2xl font-black text-gray-900 leading-tight">{kpi.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* SEARCH & FILTER BAR */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex-1 flex gap-4 min-w-0">
              <div className="relative w-64">
                <input type="text" placeholder="Tên BN, mã đơn, tên thuốc..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition-all"/>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
              </div>
              <select className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none">
                <option>Trạng thái (Tất cả)</option>
                <option>Đã phát</option>
                <option>Chờ phát</option>
                <option>Đã hủy</option>
              </select>
              <select className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none hidden lg:block">
                <option>Chuyên khoa (Tất cả)</option>
                <option>Nội tổng quát</option>
                <option>Tim mạch</option>
              </select>
              <select className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none hidden xl:block">
                <option>Bác sĩ (Tất cả)</option>
                <option>BS. Nguyễn Văn Bình</option>
              </select>
              <button className="bg-gray-100 border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-200 transition flex items-center gap-2 text-sm">
                <Filter size={18}/> Lọc
              </button>
            </div>
            <div className="flex gap-2">
              <button className="text-gray-500 hover:text-[#2563EB] font-bold text-sm underline underline-offset-2 transition-colors px-4">
                Làm mới
              </button>
              <button className="bg-red-50 border border-red-200 text-red-600 px-4 py-2.5 rounded-xl font-bold hover:bg-red-100 transition flex items-center gap-2 text-sm">
                <Download size={16}/> Xuất PDF
              </button>
            </div>
          </div>

          {/* MASTER-DETAIL LAYOUT */}
          <div className="flex flex-col xl:flex-row gap-8 h-[calc(100vh-320px)] min-h-[550px]">
            
            {/* CỘT TRÁI (MASTER): Danh sách Đơn thuốc (55%) */}
            <div className="xl:w-[55%] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center shrink-0">
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><Pill size={18} className="text-[#2563EB]"/> Danh sách Đơn thuốc</h3>
                <span className="text-sm font-bold text-[#2563EB] bg-blue-100 px-3 py-1 rounded-full">{prescriptions.length} Kết quả</span>
              </div>
              
              <div className="flex-1 overflow-auto custom-scrollbar">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-white border-b border-gray-100 text-gray-500 font-bold sticky top-0 z-10 shadow-sm">
                    <tr>
                      <th className="px-5 py-4">Mã Đơn / Bệnh nhân</th>
                      <th className="px-5 py-4">Bác sĩ kê đơn</th>
                      <th className="px-5 py-4 text-center">Số thuốc</th>
                      <th className="px-5 py-4">Trạng thái</th>
                      <th className="px-5 py-4 text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {prescriptions.map((p) => (
                      <tr 
                        key={p.id} 
                        onClick={() => setSelectedPrescriptionId(p.id)}
                        className={`cursor-pointer transition-colors ${selectedPrescriptionId === p.id ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
                      >
                        <td className="px-5 py-4">
                          <p className={`font-bold ${selectedPrescriptionId === p.id ? 'text-[#2563EB]' : 'text-gray-900'}`}>{p.id}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{p.patient}</p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-bold text-gray-700">{p.doctor}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{p.date}</p>
                        </td>
                        <td className="px-5 py-4 text-center font-bold text-gray-700">{p.drugCount}</td>
                        <td className="px-5 py-4">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center w-max gap-1.5 ${p.statusColor}`}>
                            {p.status === 'Đã phát' ? <CheckCircle2 size={12}/> : p.status === 'Đã hủy' ? <XCircle size={12}/> : <Clock size={12}/>}
                            {p.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button className="p-1.5 text-gray-400 hover:text-[#2563EB] hover:bg-blue-50 rounded transition" title="Xem chi tiết"><Eye size={16}/></button>
                            <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded transition" title="In đơn"><Printer size={16}/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-gray-100 bg-white flex justify-between items-center text-sm text-gray-500">
                <span>Hiển thị 1-5 của 3,280 đơn thuốc</span>
                <div className="flex gap-1">
                  <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Trước</button>
                  <button className="px-3 py-1 bg-[#2563EB] text-white rounded font-bold shadow-sm">1</button>
                  <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">2</button>
                  <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Sau</button>
                </div>
              </div>
            </div>

            {/* CỘT PHẢI (DETAIL): Chi tiết Đơn thuốc (45%) */}
            <div className="xl:w-[45%] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
              
              {/* Thẻ Summary Bệnh nhân & Bác sĩ */}
              <div className="p-6 bg-gradient-to-br from-[#172554] to-[#2563EB] text-white relative shrink-0">
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold shadow-sm">
                  {activePrescription.status === 'Đã phát' ? <CheckCircle2 size={14} className="text-green-300"/> : activePrescription.status === 'Đã hủy' ? <XCircle size={14} className="text-red-300"/> : <Clock size={14} className="text-yellow-300"/>}
                  {activePrescription.status}
                </div>
                
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Pill size={20}/> Chi tiết Đơn thuốc: {activePrescription.id}
                </h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-xs text-blue-200 uppercase font-bold tracking-wider mb-1">Bệnh nhân</p>
                    <p className="font-bold text-lg">{activePrescription.patient}</p>
                    <p className="text-sm text-blue-100 mt-0.5">{activePrescription.patientId} • {activePrescription.gender} • {activePrescription.age} tuổi</p>
                    <span className="inline-block mt-2 bg-green-500/20 text-green-300 border border-green-400/30 px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1 w-max"><ShieldPlus size={12}/> BHYT Hợp lệ</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-xs text-blue-200 uppercase font-bold tracking-wider mb-1">Bác sĩ kê đơn</p>
                    <p className="font-bold text-lg">{activePrescription.doctor}</p>
                    <p className="text-sm text-blue-100 mt-0.5">{activePrescription.specialty}</p>
                    <p className="text-sm text-blue-100 mt-0.5 flex items-center gap-1"><CalendarDays size={14}/> {activePrescription.date}</p>
                  </div>
                </div>
              </div>

              {/* TABS NAVIGATION */}
              <div className="flex px-2 border-b border-gray-100 bg-gray-50 shrink-0 overflow-x-auto custom-scrollbar">
                {[
                  { id: 'drugs', label: 'Danh sách thuốc', icon: Pill },
                  { id: 'history', label: 'Lịch sử phát thuốc', icon: CheckCircle2 },
                  { id: 'logs', label: 'Nhật ký', icon: History }
                ].map((tab) => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 py-3 px-4 font-bold text-sm border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  >
                    <tab.icon size={16}/> {tab.label}
                  </button>
                ))}
              </div>

              {/* TAB CONTENT */}
              <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                
                {/* 1. DANH SÁCH THUỐC */}
                {activeTab === 'drugs' && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-gray-100 border-b border-gray-200 text-gray-600 font-bold">
                          <tr>
                            <th className="px-4 py-3">Tên thuốc - Hàm lượng</th>
                            <th className="px-4 py-3">Liều dùng</th>
                            <th className="px-4 py-3 text-center">SL</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <p className="font-bold text-gray-900">Paracetamol</p>
                              <p className="text-xs text-gray-500">500mg</p>
                            </td>
                            <td className="px-4 py-3 text-gray-700">2 viên/ngày (Sau ăn)</td>
                            <td className="px-4 py-3 text-center font-bold text-[#2563EB]">10</td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <p className="font-bold text-gray-900">Vitamin C</p>
                              <p className="text-xs text-gray-500">500mg</p>
                            </td>
                            <td className="px-4 py-3 text-gray-700">1 viên/ngày (Sáng)</td>
                            <td className="px-4 py-3 text-center font-bold text-[#2563EB]">7</td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <p className="font-bold text-gray-900">Amoxicillin</p>
                              <p className="text-xs text-gray-500">500mg</p>
                            </td>
                            <td className="px-4 py-3 text-gray-700">3 viên/ngày (Đúng giờ)</td>
                            <td className="px-4 py-3 text-center font-bold text-[#2563EB]">15</td>
                          </tr>
                        </tbody>
                        <tfoot className="bg-blue-50/50 border-t border-gray-200">
                          <tr>
                            <td colSpan={2} className="px-4 py-3 font-bold text-right text-gray-700">Tổng cộng:</td>
                            <td className="px-4 py-3 font-black text-center text-[#2563EB]">32 viên</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                )}

                {/* 2. LỊCH SỬ PHÁT THUỐC (TIMELINE) */}
                {activeTab === 'history' && (
                  <div className="space-y-0 relative before:absolute before:inset-0 before:ml-[13px] before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#2563EB] before:to-gray-200 animate-in fade-in">
                    <div className="relative pl-8 pb-6">
                      <span className="absolute left-0 top-1 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center -translate-x-2.5 z-10 shadow-[0_0_0_4px_#f9fafb]"><Check size={14}/></span>
                      <div>
                        <p className="text-xs text-gray-500 font-bold">15/08/2026 - 09:15</p>
                        <h4 className="font-bold text-gray-900 mt-1">Bác sĩ tạo đơn</h4>
                        <p className="text-sm text-gray-600 mt-0.5">Ký xác nhận bởi: {activePrescription.doctor}</p>
                      </div>
                    </div>
                    <div className="relative pl-8 pb-6">
                      <span className="absolute left-0 top-1 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center -translate-x-2.5 z-10 shadow-[0_0_0_4px_#f9fafb]"><Check size={14}/></span>
                      <div>
                        <p className="text-xs text-gray-500 font-bold">15/08/2026 - 09:20</p>
                        <h4 className="font-bold text-gray-900 mt-1">Hệ thống xác nhận</h4>
                        <p className="text-sm text-gray-600 mt-0.5">Thuốc có sẵn trong kho, chuyển yêu cầu đến nhà thuốc.</p>
                      </div>
                    </div>
                    <div className="relative pl-8">
                      <span className={`absolute left-0 top-1 w-7 h-7 text-white rounded-full flex items-center justify-center -translate-x-2.5 z-10 shadow-[0_0_0_4px_#f9fafb] ${activePrescription.status === 'Đã phát' ? 'bg-green-500' : 'bg-gray-300'}`}>
                        {activePrescription.status === 'Đã phát' ? <CheckCircle2 size={14}/> : <Clock size={14}/>}
                      </span>
                      <div>
                        <p className={`text-xs font-bold ${activePrescription.status === 'Đã phát' ? 'text-green-600' : 'text-gray-500'}`}>15/08/2026 - 09:35</p>
                        <h4 className={`font-bold mt-1 ${activePrescription.status === 'Đã phát' ? 'text-green-700' : 'text-gray-500'}`}>Nhà thuốc phát thuốc</h4>
                        {activePrescription.status === 'Đã phát' && <p className="text-sm text-gray-600 mt-0.5">Nhân viên phát thuốc: Nguyễn Thị H (Quầy Dược 1).</p>}
                        {activePrescription.status !== 'Đã phát' && <p className="text-sm text-gray-500 mt-0.5">Bệnh nhân đang chờ nhận thuốc.</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. NHẬT KÝ HOẠT ĐỘNG (AUDIT LOGS) */}
                {activeTab === 'logs' && (
                  <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[9px] before:-translate-x-px before:h-full before:w-0.5 before:bg-gray-200 animate-in fade-in">
                    <div className="relative pl-6">
                      <span className="absolute left-0 top-1.5 w-2 h-2 bg-gray-400 rounded-full"></span>
                      <p className="text-xs text-gray-500 font-bold mb-0.5">09:40</p>
                      <p className="text-sm font-bold text-gray-900">Admin</p>
                      <p className="text-xs text-gray-600">Đã xuất PDF đơn thuốc.</p>
                    </div>
                    <div className="relative pl-6">
                      <span className="absolute left-0 top-1.5 w-2 h-2 bg-green-500 rounded-full"></span>
                      <p className="text-xs text-gray-500 font-bold mb-0.5">09:35</p>
                      <p className="text-sm font-bold text-green-700">Dược sĩ (Nguyễn Thị H)</p>
                      <p className="text-xs text-gray-600">Cập nhật trạng thái: Đã phát thuốc.</p>
                    </div>
                    <div className="relative pl-6">
                      <span className="absolute left-0 top-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
                      <p className="text-xs text-gray-500 font-bold mb-0.5">09:20</p>
                      <p className="text-sm font-bold text-blue-700">Dược sĩ</p>
                      <p className="text-xs text-gray-600">Kiểm tra và xác nhận thuốc trong kho hợp lệ.</p>
                    </div>
                    <div className="relative pl-6">
                      <span className="absolute left-0 top-1.5 w-2 h-2 bg-[#2563EB] rounded-full"></span>
                      <p className="text-xs text-gray-500 font-bold mb-0.5">09:15</p>
                      <p className="text-sm font-bold text-gray-900">{activePrescription.doctor}</p>
                      <p className="text-xs text-gray-600">Tạo mới đơn thuốc trên hệ thống.</p>
                    </div>
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