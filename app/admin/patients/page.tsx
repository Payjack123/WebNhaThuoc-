'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Users, CalendarDays, FileText, Pill, TestTube, 
  Settings, LogOut, Search, Activity, User, Building2, 
  ShieldCheck, History, Wallet, ArrowUpRight, CheckCircle2, 
  Star, Printer, Filter, Plus, Eye, Edit, Trash2, Mail, Phone, 
  Stethoscope, Calendar, Clock, MapPin, CreditCard, Lock, Unlock, X
} from 'lucide-react';

export default function PatientManagementPage() {
  const router = useRouter();
  const [selectedPatientId, setSelectedPatientId] = useState('BN001');
  const [activeTab, setActiveTab] = useState('history');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleLogout = () => {
    // localStorage.removeItem('token');
    router.push('/login');
  };

  // Mock dữ liệu Bệnh nhân
  const patients = [
    { id: 'BN001', name: 'Nguyễn Văn A', gender: 'Nam', age: 25, phone: '0981234567', email: 'nguyenvana@gmail.com', address: 'Quận Cầu Giấy, Hà Nội', lastVisit: '15/08/2026', status: 'Hoạt động', statusColor: 'text-green-700 bg-green-100 border-green-200' },
    { id: 'BN002', name: 'Trần Thị B', gender: 'Nữ', age: 32, phone: '0971234567', email: 'tranthib@gmail.com', address: 'Quận Đống Đa, Hà Nội', lastVisit: '14/08/2026', status: 'Hoạt động', statusColor: 'text-green-700 bg-green-100 border-green-200' },
    { id: 'BN003', name: 'Lê Văn C', gender: 'Nam', age: 41, phone: '0961234567', email: 'levanc@gmail.com', address: 'Quận Hai Bà Trưng, Hà Nội', lastVisit: '12/08/2026', status: 'Khóa tài khoản', statusColor: 'text-red-700 bg-red-100 border-red-200' },
    { id: 'BN004', name: 'Phạm Minh D', gender: 'Nam', age: 58, phone: '0951234567', email: 'phamminhd@gmail.com', address: 'Quận Nam Từ Liêm, Hà Nội', lastVisit: '10/08/2026', status: 'Đang điều trị', statusColor: 'text-blue-700 bg-blue-100 border-blue-200' },
    { id: 'BN005', name: 'Hoàng Ngọc E', gender: 'Nữ', age: 29, phone: '0941234567', email: 'hoangngoce@gmail.com', address: 'Quận Tây Hồ, Hà Nội', lastVisit: '05/08/2026', status: 'Chờ xác minh', statusColor: 'text-yellow-700 bg-yellow-100 border-yellow-200' },
  ];

  const activePat = patients.find(p => p.id === selectedPatientId) || patients[0];

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans text-gray-800 overflow-hidden">
      
      {/* ==========================================
          1. SIDEBAR (Active: Quản lý Bệnh nhân)
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
            {/* Active Menu */}
            <Link href="/admin/patients" className="flex items-center gap-3 px-4 py-2.5 bg-[#2563EB] text-white rounded-xl font-medium shadow-md transition-all text-sm">
              <Users size={18}/> Quản lý Bệnh nhân
            </Link>
            <Link href="/admin/appointments" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <CalendarDays size={18}/> Quản lý Lịch khám
            </Link>
            <Link href="/admin/records" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <FileText size={18}/> Hồ sơ bệnh án
            </Link>
            <Link href="/admin/prescriptions" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
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
            <div className="bg-blue-50 p-2 rounded-lg"><Users className="text-[#2563EB]" size={24}/></div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Quản lý Bệnh nhân</h1>
              <p className="text-xs text-gray-500 font-medium">Quản lý thông tin, hồ sơ và tài khoản của tất cả bệnh nhân</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#2563EB] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md transition-all flex items-center gap-2 text-sm"
            >
              <Plus size={18}/> Thêm Bệnh nhân
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
              { label: 'Tổng bệnh nhân', value: '2.540', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Đang hoạt động', value: '2.300', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Đăng ký hôm nay', value: '125', icon: CalendarDays, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { label: 'Đang điều trị', value: '480', icon: Activity, color: 'text-yellow-600', bg: 'bg-yellow-50' },
              { label: 'Chưa thanh toán', value: '185', icon: Wallet, color: 'text-red-600', bg: 'bg-red-50' },
              { label: 'Đã có hồ sơ', value: '1.950', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' },
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
              <div className="relative w-72">
                <input type="text" placeholder="Tìm kiếm tên, SĐT, CCCD..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition-all"/>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
              </div>
              <select className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none">
                <option>Giới tính (Tất cả)</option>
                <option>Nam</option>
                <option>Nữ</option>
              </select>
              <select className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none">
                <option>Trạng thái (Tất cả)</option>
                <option>Hoạt động</option>
                <option>Khóa tài khoản</option>
                <option>Đang điều trị</option>
              </select>
              <button className="bg-gray-100 border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-200 transition flex items-center gap-2 text-sm">
                <Filter size={18}/> Lọc
              </button>
            </div>
            <button className="text-gray-500 hover:text-[#2563EB] font-bold text-sm underline underline-offset-2 transition-colors">
              Làm mới bộ lọc
            </button>
          </div>

          {/* MASTER-DETAIL LAYOUT */}
          <div className="flex flex-col xl:flex-row gap-8 h-[calc(100vh-320px)] min-h-[550px]">
            
            {/* CỘT TRÁI (MASTER): Danh sách Bệnh nhân (55%) */}
            <div className="xl:w-[55%] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center shrink-0">
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><Users size={18} className="text-[#2563EB]"/> Danh sách Bệnh nhân</h3>
                <span className="text-sm font-bold text-[#2563EB] bg-blue-100 px-3 py-1 rounded-full">{patients.length} Kết quả</span>
              </div>
              
              <div className="flex-1 overflow-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-white border-b border-gray-100 text-gray-500 font-bold sticky top-0 z-10 shadow-sm">
                    <tr>
                      <th className="px-5 py-4">Bệnh nhân</th>
                      <th className="px-5 py-4">SĐT</th>
                      <th className="px-5 py-4">Khám gần nhất</th>
                      <th className="px-5 py-4">Trạng thái</th>
                      <th className="px-5 py-4 text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {patients.map((pat) => (
                      <tr 
                        key={pat.id} 
                        onClick={() => setSelectedPatientId(pat.id)}
                        className={`cursor-pointer transition-colors ${selectedPatientId === pat.id ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <img src={`https://ui-avatars.com/api/?name=${pat.name.replace(/ /g, '+')}&background=random`} alt="Avatar" className="w-10 h-10 rounded-full border border-gray-200"/>
                            <div>
                              <p className={`font-bold ${selectedPatientId === pat.id ? 'text-[#2563EB]' : 'text-gray-900'}`}>{pat.name}</p>
                              <p className="text-xs text-gray-500">{pat.id} • {pat.gender} • {pat.age}T</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 font-medium text-gray-700">{pat.phone}</td>
                        <td className="px-5 py-4 font-medium text-gray-700">{pat.lastVisit}</td>
                        <td className="px-5 py-4">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center w-max gap-1.5 ${pat.statusColor}`}>
                            {pat.status === 'Hoạt động' && <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>}
                            {pat.status === 'Khóa tài khoản' && <Lock size={12}/>}
                            {pat.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button className="p-1.5 text-gray-400 hover:text-[#2563EB] hover:bg-blue-50 rounded transition" title="Chỉnh sửa"><Edit size={16}/></button>
                            <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition" title={pat.status === 'Khóa tài khoản' ? 'Mở khóa' : 'Khóa tài khoản'}>
                              {pat.status === 'Khóa tài khoản' ? <Unlock size={16}/> : <Lock size={16}/>}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-gray-100 bg-white flex justify-between items-center text-sm text-gray-500">
                <span>Hiển thị 1-5 của 2,540 bệnh nhân</span>
                <div className="flex gap-1">
                  <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Trước</button>
                  <button className="px-3 py-1 bg-[#2563EB] text-white rounded font-bold shadow-sm">1</button>
                  <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">2</button>
                  <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Sau</button>
                </div>
              </div>
            </div>

            {/* CỘT PHẢI (DETAIL): Thông tin chi tiết (45%) */}
            <div className="xl:w-[45%] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
              
              {/* Thẻ Hồ sơ tóm tắt */}
              <div className="p-6 bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white relative">
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold shadow-sm border border-white/20">
                  {activePat.status === 'Hoạt động' ? <CheckCircle2 size={14} className="text-green-400"/> : <Lock size={14} className="text-red-400"/>}
                  {activePat.status}
                </div>
                <div className="flex gap-5 items-center">
                  <img src={`https://ui-avatars.com/api/?name=${activePat.name.replace(/ /g, '+')}&background=random&size=128`} alt="Avatar" className="w-20 h-20 rounded-2xl border-4 border-white/20 shadow-xl"/>
                  <div>
                    <h2 className="text-2xl font-bold">{activePat.name}</h2>
                    <p className="text-gray-300 text-sm mt-1">Mã BN: {activePat.id} • {activePat.gender} • {activePat.age} tuổi</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm font-medium">
                      <p className="flex items-center gap-1.5"><Phone size={14} className="text-gray-400"/> {activePat.phone}</p>
                      <p className="flex items-center gap-1.5"><Mail size={14} className="text-gray-400"/> {activePat.email}</p>
                      <p className="flex items-center gap-1.5 w-full"><MapPin size={14} className="text-gray-400"/> {activePat.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* TABS NAVIGATION */}
              <div className="flex px-2 border-b border-gray-100 bg-gray-50 shrink-0 overflow-x-auto custom-scrollbar">
                {[
                  { id: 'history', label: 'Lịch sử khám', icon: Calendar },
                  { id: 'records', label: 'Hồ sơ bệnh án', icon: FileText },
                  { id: 'payments', label: 'Thanh toán', icon: Wallet },
                  { id: 'account', label: 'Tài khoản', icon: ShieldCheck }
                ].map((tab) => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-3 px-4 font-bold text-sm border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  >
                    <tab.icon size={16}/> {tab.label}
                  </button>
                ))}
              </div>

              {/* TAB CONTENT */}
              <div className="flex-1 overflow-y-auto p-6">
                
                {/* LỊCH SỬ KHÁM BỆNH */}
                {activeTab === 'history' && (
                  <div className="space-y-0 relative before:absolute before:inset-0 before:ml-[13px] before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-gray-200 before:to-transparent animate-in fade-in">
                    
                    <div className="relative pl-8 pb-6">
                      <span className="absolute left-0 top-1 w-7 h-7 bg-blue-100 text-[#2563EB] border border-blue-200 rounded-full flex items-center justify-center -translate-x-2.5 z-10"><Stethoscope size={14}/></span>
                      <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-4 hover:shadow-md transition">
                        <p className="text-xs text-[#2563EB] font-bold mb-1">15/08/2026 - Gần nhất</p>
                        <h4 className="font-bold text-gray-900">Khám Nội tổng quát</h4>
                        <p className="text-sm text-gray-600 mt-1">Bác sĩ điều trị: BS Nguyễn Văn Bình</p>
                      </div>
                    </div>

                    <div className="relative pl-8 pb-6">
                      <span className="absolute left-0 top-1 w-7 h-7 bg-gray-100 text-gray-500 border border-gray-200 rounded-full flex items-center justify-center -translate-x-2.5 z-10"><Activity size={14}/></span>
                      <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-4 hover:shadow-md transition">
                        <p className="text-xs text-gray-400 font-bold mb-1">02/08/2026</p>
                        <h4 className="font-bold text-gray-900">Khám Tim mạch</h4>
                        <p className="text-sm text-gray-600 mt-1">Bác sĩ điều trị: BS Trần Minh Hải</p>
                      </div>
                    </div>

                    <div className="relative pl-8">
                      <span className="absolute left-0 top-1 w-7 h-7 bg-gray-100 text-gray-500 border border-gray-200 rounded-full flex items-center justify-center -translate-x-2.5 z-10"><Activity size={14}/></span>
                      <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-4 hover:shadow-md transition">
                        <p className="text-xs text-gray-400 font-bold mb-1">20/07/2026</p>
                        <h4 className="font-bold text-gray-900">Khám Da liễu</h4>
                        <p className="text-sm text-gray-600 mt-1">Bác sĩ điều trị: BS Lê Minh Hải</p>
                      </div>
                    </div>

                  </div>
                )}

                {/* HỒ SƠ BỆNH ÁN */}
                {activeTab === 'records' && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-white p-3 rounded-xl shadow-sm"><FileText className="text-indigo-600" size={24}/></div>
                        <div>
                          <p className="text-sm font-bold text-indigo-900">Tổng số hồ sơ bệnh án</p>
                          <p className="text-2xl font-black text-indigo-700 mt-1">8 <span className="text-sm font-medium text-indigo-500">hồ sơ lưu trữ</span></p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-indigo-400 font-bold mb-1">Hồ sơ gần nhất</p>
                        <p className="text-sm font-bold text-indigo-900">15/08/2026</p>
                      </div>
                    </div>
                    
                    <button className="w-full bg-white border border-gray-200 text-[#2563EB] py-3 rounded-xl font-bold hover:bg-blue-50 transition shadow-sm flex items-center justify-center gap-2">
                      <Eye size={18}/> Mở chi tiết Bệnh án
                    </button>
                  </div>
                )}

                {/* LỊCH SỬ THANH TOÁN */}
                {activeTab === 'payments' && (
                  <div className="animate-in fade-in">
                    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-bold">
                          <tr>
                            <th className="px-4 py-3">Ngày</th>
                            <th className="px-4 py-3">Số tiền</th>
                            <th className="px-4 py-3">Trạng thái</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium text-gray-900">15/08/2026</td>
                            <td className="px-4 py-3 font-bold text-gray-900">550.000đ</td>
                            <td className="px-4 py-3"><span className="text-green-600 font-bold flex items-center gap-1.5"><CheckCircle2 size={14}/> Đã thanh toán</span></td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium text-gray-900">02/08/2026</td>
                            <td className="px-4 py-3 font-bold text-gray-900">320.000đ</td>
                            <td className="px-4 py-3"><span className="text-green-600 font-bold flex items-center gap-1.5"><CheckCircle2 size={14}/> Đã thanh toán</span></td>
                          </tr>
                          <tr className="bg-red-50/30 hover:bg-red-50">
                            <td className="px-4 py-3 font-medium text-gray-900">20/07/2026</td>
                            <td className="px-4 py-3 font-bold text-red-600">450.000đ</td>
                            <td className="px-4 py-3"><span className="text-orange-500 font-bold flex items-center gap-1.5"><Clock size={14}/> Chờ thanh toán</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* TRẠNG THÁI TÀI KHOẢN */}
                {activeTab === 'account' && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-white hover:shadow-sm transition">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-50 p-2 rounded-lg"><Activity className="text-green-600" size={18}/></div>
                        <span className="font-bold text-gray-900 text-sm">Trạng thái chung</span>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span> Hoạt động</span>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-white hover:shadow-sm transition">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-50 p-2 rounded-lg"><Mail className="text-[#2563EB]" size={18}/></div>
                        <span className="font-bold text-gray-900 text-sm">Xác minh Email</span>
                      </div>
                      <span className="text-green-600 text-sm font-bold flex items-center gap-1"><CheckCircle2 size={16}/> Đã xác minh</span>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-white hover:shadow-sm transition">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-50 p-2 rounded-lg"><Phone className="text-[#2563EB]" size={18}/></div>
                        <span className="font-bold text-gray-900 text-sm">Xác minh SĐT</span>
                      </div>
                      <span className="text-green-600 text-sm font-bold flex items-center gap-1"><CheckCircle2 size={16}/> Đã xác minh</span>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-white hover:shadow-sm transition">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded-lg"><ShieldCheck className="text-gray-600" size={18}/></div>
                        <span className="font-bold text-gray-900 text-sm">Khóa tài khoản</span>
                      </div>
                      <span className="text-gray-500 text-sm font-bold flex items-center gap-1"><Unlock size={16}/> Không bị khóa</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ==========================================
          MODAL: THÊM BỆNH NHÂN MỚI
      ========================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><User size={20} className="text-[#2563EB]"/> Thêm Bệnh nhân Mới</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-700 transition"><X size={24}/></button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
              {/* Upload Ảnh */}
              <div className="flex items-center gap-6 mb-6">
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 text-gray-400">
                  <User size={32}/>
                </div>
                <div>
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition">Tải ảnh lên</button>
                  <p className="text-xs text-gray-500 mt-2">JPG, PNG. Max 2MB.</p>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Họ và tên <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors" placeholder="Nguyễn Văn A"/>
                </div>
                <div className="col-span-2 md:col-span-1 grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Ngày sinh</label>
                    <input type="date" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors"/>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Giới tính</label>
                    <select className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors">
                      <option>Nam</option><option>Nữ</option>
                    </select>
                  </div>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Số điện thoại <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors" placeholder="09xx..."/>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                  <input type="email" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors" placeholder="email@example.com"/>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Số CCCD / CMND</label>
                  <input type="text" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors" placeholder="Nhập số CCCD"/>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Số BHYT</label>
                  <input type="text" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors" placeholder="Nhập mã số BHYT (nếu có)"/>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Địa chỉ liên hệ</label>
                  <input type="text" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors" placeholder="Số nhà, đường, phường/xã, quận/huyện..."/>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Trạng thái tài khoản</label>
                  <select className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors">
                    <option>Hoạt động</option><option>Chờ xác minh</option><option>Khóa tài khoản</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 transition">Hủy</button>
              <button className="bg-[#2563EB] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md transition flex items-center gap-2">
                <CheckCircle2 size={18}/> Lưu hồ sơ
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}