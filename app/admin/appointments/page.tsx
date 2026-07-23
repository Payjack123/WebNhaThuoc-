'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Users, CalendarDays, FileText, Pill, TestTube, 
  Settings, LogOut, Search, Activity, User, Building2, 
  ShieldCheck, History, Wallet, CheckCircle2, 
  Clock, XCircle, Filter, Plus, Edit, Trash2, Calendar, 
  MapPin, Stethoscope, ChevronRight, UserCog, CheckCircle
} from 'lucide-react';

export default function AppointmentManagementPage() {
  const router = useRouter();
  const [selectedApptId, setSelectedApptId] = useState('LK001');
  const [activeTab, setActiveTab] = useState('timeline');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' hoặc 'calendar'

  const handleLogout = () => {
    // localStorage.removeItem('token');
    router.push('/login');
  };

  // Mock dữ liệu Lịch khám
  const appointments = [
    { id: 'LK001', patient: 'Nguyễn Văn A', phone: '0981234567', doctor: 'BS Nguyễn Văn Bình', specialty: 'Nội tổng quát', date: '15/08/2026', time: '08:00', room: 'P101', status: 'Đã khám', statusColor: 'text-green-700 bg-green-100 border-green-200' },
    { id: 'LK002', patient: 'Trần Thị B', phone: '0971234567', doctor: 'BS Trần Thị An', specialty: 'Tim mạch', date: '15/08/2026', time: '09:00', room: 'P202', status: 'Chờ khám', statusColor: 'text-yellow-700 bg-yellow-100 border-yellow-200' },
    { id: 'LK003', patient: 'Lê Văn C', phone: '0961234567', doctor: 'BS Lê Nam', specialty: 'Da liễu', date: '15/08/2026', time: '10:30', room: 'P105', status: 'Đã hủy', statusColor: 'text-red-700 bg-red-100 border-red-200' },
    { id: 'LK004', patient: 'Phạm Minh D', phone: '0951234567', doctor: 'BS Trần Hùng', specialty: 'Nhi khoa', date: '15/08/2026', time: '14:00', room: 'P301', status: 'Đã xác nhận', statusColor: 'text-blue-700 bg-blue-100 border-blue-200' },
    { id: 'LK005', patient: 'Hoàng Ngọc E', phone: '0941234567', doctor: 'BS Nguyễn Văn Bình', specialty: 'Nội tổng quát', date: '15/08/2026', time: '15:30', room: 'P101', status: 'Đã xác nhận', statusColor: 'text-blue-700 bg-blue-100 border-blue-200' },
  ];

  const activeAppt = appointments.find(a => a.id === selectedApptId) || appointments[0];

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans text-gray-800 overflow-hidden">
      
      {/* ==========================================
          1. SIDEBAR (Active: Quản lý Lịch khám)
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
            {/* Active Menu */}
            <Link href="/admin/appointments" className="flex items-center gap-3 px-4 py-2.5 bg-[#2563EB] text-white rounded-xl font-medium shadow-md transition-all text-sm">
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
            <div className="bg-blue-50 p-2 rounded-lg"><CalendarDays className="text-[#2563EB]" size={24}/></div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Quản lý Lịch khám</h1>
              <p className="text-xs text-gray-500 font-medium">Quản lý, điều phối và theo dõi lịch khám của toàn bộ phòng khám</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#2563EB] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md transition-all flex items-center gap-2 text-sm"
            >
              <Plus size={18}/> Tạo Lịch khám
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
              { label: 'Tổng lịch khám', value: '1,285', icon: CalendarDays, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Đã hoàn thành', value: '980', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Đang chờ khám', value: '185', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
              { label: 'Đã hủy', value: '120', icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
              { label: 'Bác sĩ trực', value: '35', icon: UserCog, color: 'text-purple-600', bg: 'bg-purple-50' },
              { label: 'Phòng khám', value: '12', icon: Building2, color: 'text-cyan-600', bg: 'bg-cyan-50' },
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
                <input type="text" placeholder="Tên BN, Mã lịch, SĐT..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition-all"/>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
              </div>
              <input type="date" className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none" defaultValue="2026-08-15"/>
              <select className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none">
                <option>Trạng thái (Tất cả)</option>
                <option>Đã xác nhận</option>
                <option>Chờ khám</option>
                <option>Đã khám</option>
                <option>Đã hủy</option>
              </select>
              <select className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none hidden lg:block">
                <option>Bác sĩ (Tất cả)</option>
                <option>BS. Nguyễn Văn Bình</option>
              </select>
              <button className="bg-gray-100 border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-200 transition flex items-center gap-2 text-sm">
                <Filter size={18}/> Lọc
              </button>
            </div>
            <div className="flex bg-gray-100 p-1 rounded-xl">
               <button 
                 onClick={() => setViewMode('list')}
                 className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${viewMode === 'list' ? 'bg-white text-[#2563EB] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
               >
                 Danh sách
               </button>
               <button 
                 onClick={() => setViewMode('calendar')}
                 className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${viewMode === 'calendar' ? 'bg-white text-[#2563EB] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
               >
                 Lịch tháng
               </button>
            </div>
          </div>

          {/* CHẾ ĐỘ VIEW (LIST HOẶC CALENDAR) */}
          {viewMode === 'list' ? (
            /* MASTER-DETAIL LAYOUT (LIST VIEW) */
            <div className="flex flex-col xl:flex-row gap-8 h-[calc(100vh-320px)] min-h-[550px]">
              
              {/* CỘT TRÁI (MASTER): Danh sách Lịch khám (60%) */}
              <div className="xl:w-[60%] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center shrink-0">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2"><CalendarDays size={18} className="text-[#2563EB]"/> Lịch khám hôm nay</h3>
                  <span className="text-sm font-bold text-[#2563EB] bg-blue-100 px-3 py-1 rounded-full">{appointments.length} Lịch hẹn</span>
                </div>
                
                <div className="flex-1 overflow-auto custom-scrollbar">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-white border-b border-gray-100 text-gray-500 font-bold sticky top-0 z-10 shadow-sm">
                      <tr>
                        <th className="px-5 py-4">Bệnh nhân / Mã lịch</th>
                        <th className="px-5 py-4">Bác sĩ & Chuyên khoa</th>
                        <th className="px-5 py-4">Thời gian & Phòng</th>
                        <th className="px-5 py-4">Trạng thái</th>
                        <th className="px-5 py-4 text-center">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {appointments.map((appt) => (
                        <tr 
                          key={appt.id} 
                          onClick={() => setSelectedApptId(appt.id)}
                          className={`cursor-pointer transition-colors ${selectedApptId === appt.id ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
                        >
                          <td className="px-5 py-4">
                            <p className={`font-bold ${selectedApptId === appt.id ? 'text-[#2563EB]' : 'text-gray-900'}`}>{appt.patient}</p>
                            <p className="text-xs text-gray-500">{appt.id} • {appt.phone}</p>
                          </td>
                          <td className="px-5 py-4">
                            <p className="font-bold text-gray-700">{appt.doctor}</p>
                            <p className="text-xs text-gray-500">{appt.specialty}</p>
                          </td>
                          <td className="px-5 py-4">
                            <p className="font-bold text-gray-900 flex items-center gap-1.5"><Clock size={14} className="text-blue-500"/> {appt.time}</p>
                            <p className="text-xs text-gray-500 font-medium">{appt.room}</p>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center w-max gap-1.5 ${appt.statusColor}`}>
                              {appt.status}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-center">
                            <div className="flex justify-center gap-2">
                              <button className="p-1.5 text-gray-400 hover:text-[#2563EB] hover:bg-blue-50 rounded transition" title="Chỉnh sửa"><Edit size={16}/></button>
                              <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition" title="Hủy lịch"><Trash2 size={16}/></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CỘT PHẢI (DETAIL): Chi tiết lịch khám (40%) */}
              <div className="xl:w-[40%] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
                
                {/* Thẻ Lịch khám tóm tắt */}
                <div className="p-6 bg-gradient-to-br from-[#172554] to-[#2563EB] text-white relative">
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold shadow-sm">
                    {activeAppt.status}
                  </div>
                  <h2 className="text-xl font-bold mb-4">Chi tiết lịch hẹn</h2>
                  
                  <div className="bg-white/10 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center border-b border-white/20 pb-2">
                      <span className="text-blue-200 text-sm">Bệnh nhân</span>
                      <span className="font-bold">{activeAppt.patient}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/20 pb-2">
                      <span className="text-blue-200 text-sm">Bác sĩ</span>
                      <span className="font-bold">{activeAppt.doctor}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/20 pb-2">
                      <span className="text-blue-200 text-sm">Thời gian</span>
                      <span className="font-bold text-yellow-300">{activeAppt.time} - {activeAppt.date}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200 text-sm">Phòng khám</span>
                      <span className="font-bold">{activeAppt.room} ({activeAppt.specialty})</span>
                    </div>
                  </div>
                </div>

                {/* TABS NAVIGATION */}
                <div className="flex px-2 border-b border-gray-100 bg-gray-50 shrink-0 overflow-x-auto custom-scrollbar">
                  {[
                    { id: 'timeline', label: 'Tiến trình (Timeline)' },
                    { id: 'coordination', label: 'Điều phối' },
                    { id: 'history', label: 'Lịch sử' }
                  ].map((tab) => (
                    <button 
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-3 px-4 font-bold text-sm border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* TAB CONTENT */}
                <div className="flex-1 overflow-y-auto p-6">
                  
                  {/* TIẾN TRÌNH LỊCH KHÁM */}
                  {activeTab === 'timeline' && (
                    <div className="space-y-0 relative before:absolute before:inset-0 before:ml-[13px] before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#2563EB] before:to-gray-200 animate-in fade-in">
                      
                      <div className="relative pl-8 pb-6">
                        <span className="absolute left-0 top-1 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center -translate-x-2.5 z-10 shadow-[0_0_0_4px_white]"><CheckCircle size={14}/></span>
                        <div>
                          <h4 className="font-bold text-gray-900">Đặt lịch</h4>
                          <p className="text-xs text-gray-500 mt-1">12/08/2026 - 09:20 (Online)</p>
                        </div>
                      </div>

                      <div className="relative pl-8 pb-6">
                        <span className="absolute left-0 top-1 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center -translate-x-2.5 z-10 shadow-[0_0_0_4px_white]"><CheckCircle size={14}/></span>
                        <div>
                          <h4 className="font-bold text-gray-900">Đã xác nhận</h4>
                          <p className="text-xs text-gray-500 mt-1">12/08/2026 - 10:00 (Lễ tân)</p>
                        </div>
                      </div>

                      <div className="relative pl-8 pb-6">
                        <span className={`absolute left-0 top-1 w-7 h-7 rounded-full flex items-center justify-center -translate-x-2.5 z-10 shadow-[0_0_0_4px_white] ${activeAppt.status === 'Đã khám' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                          {activeAppt.status === 'Đã khám' ? <CheckCircle size={14}/> : <Clock size={14}/>}
                        </span>
                        <div>
                          <h4 className={`font-bold ${activeAppt.status === 'Đã khám' ? 'text-gray-900' : 'text-gray-500'}`}>Đến khám (Check-in)</h4>
                          {activeAppt.status === 'Đã khám' && <p className="text-xs text-gray-500 mt-1">15/08/2026 - 07:45</p>}
                        </div>
                      </div>

                      <div className="relative pl-8 pb-6">
                         <span className={`absolute left-0 top-1 w-7 h-7 rounded-full flex items-center justify-center -translate-x-2.5 z-10 shadow-[0_0_0_4px_white] ${activeAppt.status === 'Đã khám' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                          {activeAppt.status === 'Đã khám' ? <CheckCircle size={14}/> : <Activity size={14}/>}
                        </span>
                        <div>
                          <h4 className={`font-bold ${activeAppt.status === 'Đã khám' ? 'text-gray-900' : 'text-gray-500'}`}>Bác sĩ khám xong</h4>
                          {activeAppt.status === 'Đã khám' && <p className="text-xs text-gray-500 mt-1">Chỉ định đơn thuốc.</p>}
                        </div>
                      </div>

                    </div>
                  )}

                  {/* ĐIỀU PHỐI (Đổi bác sĩ/Phòng) */}
                  {activeTab === 'coordination' && (
                    <div className="space-y-6 animate-in fade-in">
                      <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl">
                        <h4 className="font-bold text-orange-800 text-sm mb-2">Thông tin ca trực hiện tại</h4>
                        <div className="text-sm text-orange-900 space-y-1">
                          <p>Bác sĩ: <span className="font-bold">{activeAppt.doctor}</span></p>
                          <p>Ca trực: 08:00 - 12:00</p>
                          <p>Phòng: {activeAppt.room}</p>
                          <p>Slot trống còn lại: <span className="font-bold text-red-600">2 lịch</span></p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <button className="w-full bg-white border border-gray-200 p-3 rounded-xl hover:border-[#2563EB] transition-colors flex items-center justify-between group">
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-50 p-2 rounded-lg text-[#2563EB]"><UserCog size={18}/></div>
                            <div className="text-left">
                              <p className="font-bold text-gray-900 text-sm">Đổi Bác sĩ</p>
                              <p className="text-xs text-gray-500 mt-0.5">Chuyển sang bác sĩ khác cùng khoa</p>
                            </div>
                          </div>
                          <ChevronRight className="text-gray-300 group-hover:text-[#2563EB]"/>
                        </button>

                        <button className="w-full bg-white border border-gray-200 p-3 rounded-xl hover:border-[#2563EB] transition-colors flex items-center justify-between group">
                          <div className="flex items-center gap-3">
                            <div className="bg-purple-50 p-2 rounded-lg text-purple-600"><Building2 size={18}/></div>
                            <div className="text-left">
                              <p className="font-bold text-gray-900 text-sm">Đổi Phòng khám</p>
                              <p className="text-xs text-gray-500 mt-0.5">Điều phối sang phòng khám trống</p>
                            </div>
                          </div>
                          <ChevronRight className="text-gray-300 group-hover:text-[#2563EB]"/>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* LỊCH SỬ THAY ĐỔI */}
                  {activeTab === 'history' && (
                     <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[9px] before:-translate-x-px before:h-full before:w-0.5 before:bg-gray-200 animate-in fade-in">
                        <div className="relative pl-6">
                          <span className="absolute left-0 top-1.5 w-2 h-2 bg-gray-400 rounded-full"></span>
                          <p className="text-xs text-gray-500">Hôm nay - 09:25</p>
                          <p className="text-sm font-bold text-gray-900">Admin đổi phòng khám</p>
                          <p className="text-xs text-gray-600">Từ P102 sang P101.</p>
                        </div>
                        <div className="relative pl-6">
                          <span className="absolute left-0 top-1.5 w-2 h-2 bg-gray-400 rounded-full"></span>
                          <p className="text-xs text-gray-500">12/08/2026 - 10:00</p>
                          <p className="text-sm font-bold text-gray-900">Lễ tân xác nhận lịch</p>
                        </div>
                        <div className="relative pl-6">
                          <span className="absolute left-0 top-1.5 w-2 h-2 bg-gray-400 rounded-full"></span>
                          <p className="text-xs text-gray-500">12/08/2026 - 09:20</p>
                          <p className="text-sm font-bold text-gray-900">Bệnh nhân tạo lịch Online</p>
                        </div>
                     </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* CALENDAR VIEW (Mô phỏng FullCalendar trực quan) */
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-[calc(100vh-320px)] min-h-[600px] flex flex-col animate-in fade-in">
               <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-bold text-gray-900">Tháng 8 / 2026</h2>
                 <div className="flex gap-2">
                   <button className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-bold">Hôm nay</button>
                   <div className="flex bg-gray-100 rounded-lg">
                     <button className="px-3 py-1.5 hover:bg-gray-200 rounded-l-lg transition">◀</button>
                     <button className="px-3 py-1.5 hover:bg-gray-200 rounded-r-lg transition">▶</button>
                   </div>
                 </div>
               </div>

               {/* Lưới lịch mô phỏng */}
               <div className="flex-1 border border-gray-200 rounded-xl overflow-hidden flex flex-col">
                  {/* Header T2-CN */}
                  <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50 text-center text-sm font-bold text-gray-600 py-3 shrink-0">
                    <div>T2</div><div>T3</div><div>T4</div><div>T5</div><div>T6</div><div>T7</div><div>CN</div>
                  </div>
                  {/* Cells */}
                  <div className="flex-1 grid grid-cols-7 grid-rows-5 bg-gray-200 gap-px">
                     {Array.from({ length: 35 }).map((_, i) => {
                       const day = i - 4; // Mô phỏng ngày lệch
                       const isCurrentMonth = day > 0 && day <= 31;
                       const isToday = day === 15;
                       return (
                         <div key={i} className={`bg-white p-2 flex flex-col ${!isCurrentMonth ? 'opacity-40 bg-gray-50' : ''}`}>
                           <span className={`text-right text-sm font-medium ${isToday ? 'bg-[#2563EB] text-white w-6 h-6 rounded-full flex items-center justify-center ml-auto' : 'text-gray-500'}`}>
                             {day > 0 && day <= 31 ? day : (day <= 0 ? 31 + day : day - 31)}
                           </span>
                           
                           {/* Render thử vài sự kiện cho ngày 15 */}
                           {isToday && (
                             <div className="mt-2 space-y-1 overflow-y-auto custom-scrollbar flex-1">
                               <div className="text-[10px] p-1 rounded bg-green-100 text-green-700 truncate cursor-pointer font-bold border border-green-200">08:00 Nguyễn Văn A</div>
                               <div className="text-[10px] p-1 rounded bg-yellow-100 text-yellow-700 truncate cursor-pointer font-bold border border-yellow-200">09:00 Trần Thị B</div>
                               <div className="text-[10px] p-1 rounded bg-blue-100 text-blue-700 truncate cursor-pointer font-bold border border-blue-200">14:00 Phạm Minh D</div>
                               <div className="text-[10px] p-1 rounded bg-gray-100 text-gray-600 text-center font-bold">+5 lịch nữa</div>
                             </div>
                           )}
                           {/* Render thử sự kiện ngày 16 */}
                           {day === 16 && (
                             <div className="mt-2 space-y-1">
                               <div className="text-[10px] p-1 rounded bg-blue-100 text-blue-700 truncate cursor-pointer font-bold border border-blue-200">08:30 Lê Hoàng</div>
                             </div>
                           )}
                         </div>
                       )
                     })}
                  </div>
               </div>
            </div>
          )}

        </div>
      </main>

      {/* ==========================================
          MODAL: TẠO LỊCH KHÁM MỚI
      ========================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><CalendarDays size={20} className="text-[#2563EB]"/> Tạo Lịch Khám Mới</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-700 transition"><XCircle size={24}/></button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Bệnh nhân <span className="text-red-500">*</span></label>
                  <select className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors">
                    <option>Tìm hoặc chọn bệnh nhân...</option>
                    <option>Nguyễn Văn A - 0981234567</option>
                  </select>
                </div>
                
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Chuyên khoa</label>
                  <select className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors">
                    <option>Nội tổng quát</option><option>Tim mạch</option>
                  </select>
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Bác sĩ</label>
                  <select className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors">
                    <option>BS. Nguyễn Văn Bình</option><option>BS. Trần Thị An</option>
                  </select>
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Ngày khám</label>
                  <input type="date" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors"/>
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Giờ khám</label>
                  <input type="time" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors"/>
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phòng khám</label>
                  <select className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors">
                    <option>P101 (Trống)</option><option>P102 (Đang sử dụng)</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Ghi chú</label>
                  <textarea rows={3} className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors" placeholder="Triệu chứng hoặc ghi chú thêm..."></textarea>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 transition">Hủy</button>
              <button className="bg-[#2563EB] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md transition flex items-center gap-2">
                <CheckCircle2 size={18}/> Xác nhận tạo lịch
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}