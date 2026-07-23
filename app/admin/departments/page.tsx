'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Users, CalendarDays, FileText, Pill, TestTube, 
  Settings, LogOut, Search, Activity, User, Building2, ChevronRight, Clock,
  ShieldCheck, History, Wallet, CheckCircle2, Plus, 
  DoorOpen, Stethoscope, Download, Printer, Filter, Eye, Edit, Trash2, X, BarChart3, PieChart
} from 'lucide-react';

export default function AdminDepartmentsPage() {
  const router = useRouter();
  const [activeMainTab, setActiveMainTab] = useState('departments'); // 'departments', 'services', 'stats'
  const [selectedDeptId, setSelectedDeptId] = useState('KP001');
  const [selectedServiceId, setSelectedServiceId] = useState('DV001');
  
  const [isAddDeptModalOpen, setIsAddDeptModalOpen] = useState(false);
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);

  const handleLogout = () => {
    // localStorage.removeItem('token');
    router.push('/login');
  };

  // 1. Mock Data: Khoa phòng
  const departments = [
    { id: 'KP001', name: 'Nội tổng quát', headDoctor: 'BS Nguyễn Văn Bình', doctors: 5, rooms: 4, status: 'Hoạt động', color: 'text-green-700 bg-green-100 border-green-200' },
    { id: 'KP002', name: 'Tim mạch', headDoctor: 'BS Trần Văn Hải', doctors: 3, rooms: 2, status: 'Hoạt động', color: 'text-green-700 bg-green-100 border-green-200' },
    { id: 'KP003', name: 'Nhi khoa', headDoctor: 'BS Lê Minh An', doctors: 4, rooms: 3, status: 'Hoạt động', color: 'text-green-700 bg-green-100 border-green-200' },
    { id: 'KP004', name: 'Da liễu', headDoctor: 'BS Nguyễn Hoàng', doctors: 3, rooms: 2, status: 'Hoạt động', color: 'text-green-700 bg-green-100 border-green-200' },
    { id: 'KP005', name: 'Chẩn đoán hình ảnh', headDoctor: 'BS Lê Thu Hà', doctors: 4, rooms: 5, status: 'Tạm ngưng', color: 'text-orange-700 bg-orange-100 border-orange-200' },
  ];

  // 2. Mock Data: Dịch vụ
  const services = [
    { id: 'DV001', name: 'Khám tổng quát', dept: 'Nội tổng quát', price: '150.000', time: '30 phút', status: 'Hoạt động', color: 'text-green-700 bg-green-100 border-green-200' },
    { id: 'DV002', name: 'Khám tim mạch', dept: 'Tim mạch', price: '250.000', time: '45 phút', status: 'Hoạt động', color: 'text-green-700 bg-green-100 border-green-200' },
    { id: 'DV003', name: 'Siêu âm ổ bụng', dept: 'Chẩn đoán hình ảnh', price: '300.000', time: '20 phút', status: 'Hoạt động', color: 'text-green-700 bg-green-100 border-green-200' },
    { id: 'DV004', name: 'X-Quang ngực', dept: 'Chẩn đoán hình ảnh', price: '350.000', time: '15 phút', status: 'Hoạt động', color: 'text-green-700 bg-green-100 border-green-200' },
    { id: 'DV005', name: 'Xét nghiệm máu', dept: 'Xét nghiệm', price: '250.000', time: '10 phút', status: 'Hoạt động', color: 'text-green-700 bg-green-100 border-green-200' },
    { id: 'DV006', name: 'Nội soi dạ dày', dept: 'Nội tổng quát', price: '700.000', time: '45 phút', status: 'Ngừng cung cấp', color: 'text-red-700 bg-red-100 border-red-200' },
  ];

  const activeDept = departments.find(d => d.id === selectedDeptId) || departments[0];
  const activeService = services.find(s => s.id === selectedServiceId) || services[0];

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
            {/* Active Menu */}
            <Link href="/admin/departments" className="flex items-center gap-3 px-4 py-2.5 bg-[#2563EB] text-white rounded-xl font-medium shadow-md transition-all text-sm">
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
            <div className="bg-blue-50 p-2 rounded-lg"><Building2 className="text-[#2563EB]" size={24}/></div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Quản lý Khoa phòng & Dịch vụ</h1>
              <p className="text-xs text-gray-500 font-medium">Quản lý chuyên khoa, phòng khám và các dịch vụ y tế</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsAddDeptModalOpen(true)}
              className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-4 py-2.5 rounded-xl font-bold hover:bg-indigo-100 transition-all flex items-center gap-2 text-sm"
            >
              <Plus size={18}/> Thêm Khoa
            </button>
            <button 
              onClick={() => setIsAddServiceModalOpen(true)}
              className="bg-[#2563EB] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md transition-all flex items-center gap-2 text-sm"
            >
              <Plus size={18}/> Thêm Dịch vụ
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
              { label: 'Khoa phòng', value: '8', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Phòng khám', value: '20', icon: DoorOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { label: 'Dịch vụ', value: '35', icon: Stethoscope, color: 'text-purple-600', bg: 'bg-purple-50' },
              { label: 'Bác sĩ', value: '15', icon: User, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Lượt khám HN', value: '420', icon: CalendarDays, color: 'text-orange-600', bg: 'bg-orange-50' },
              { label: 'Doanh thu DV', value: '850 Tr', icon: Wallet, color: 'text-red-600', bg: 'bg-red-50' },
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

          {/* CHUYỂN ĐỔI TAB CHÍNH */}
          <div className="flex bg-gray-200/50 p-1.5 rounded-2xl w-max mb-6 border border-gray-200">
            <button 
              onClick={() => setActiveMainTab('departments')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeMainTab === 'departments' ? 'bg-white text-[#2563EB] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <Building2 size={16}/> Quản lý Khoa phòng
            </button>
            <button 
              onClick={() => setActiveMainTab('services')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeMainTab === 'services' ? 'bg-white text-[#2563EB] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <Stethoscope size={16}/> Danh mục Dịch vụ
            </button>
            <button 
              onClick={() => setActiveMainTab('stats')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeMainTab === 'stats' ? 'bg-white text-[#2563EB] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <BarChart3 size={16}/> Thống kê & Báo cáo
            </button>
          </div>

          {/* =======================================
              VIEW 1: QUẢN LÝ KHOA PHÒNG
          ======================================= */}
          {activeMainTab === 'departments' && (
            <div className="flex flex-col xl:flex-row gap-8 h-[calc(100vh-360px)] min-h-[500px] animate-in fade-in">
              
              {/* CỘT TRÁI: Bảng Khoa phòng */}
              <div className="xl:w-[60%] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                  <div className="relative w-64">
                    <input type="text" placeholder="Tìm tên khoa..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#2563EB] outline-none"/>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16}/>
                  </div>
                  <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-50 transition flex items-center gap-2 text-sm shadow-sm">
                    <Filter size={16}/> Lọc
                  </button>
                </div>
                
                <div className="flex-1 overflow-auto custom-scrollbar">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-white border-b border-gray-100 text-gray-500 font-bold sticky top-0 z-10 shadow-sm">
                      <tr>
                        <th className="px-5 py-4">Mã / Tên Khoa</th>
                        <th className="px-5 py-4">Trưởng khoa</th>
                        <th className="px-5 py-4 text-center">Bác sĩ / Phòng</th>
                        <th className="px-5 py-4">Trạng thái</th>
                        <th className="px-5 py-4 text-center">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {departments.map((dept) => (
                        <tr 
                          key={dept.id} 
                          onClick={() => setSelectedDeptId(dept.id)}
                          className={`cursor-pointer transition-colors ${selectedDeptId === dept.id ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
                        >
                          <td className="px-5 py-4">
                            <p className={`font-bold ${selectedDeptId === dept.id ? 'text-[#2563EB]' : 'text-gray-900'}`}>{dept.name}</p>
                            <p className="text-xs text-gray-500">{dept.id}</p>
                          </td>
                          <td className="px-5 py-4 font-medium text-gray-700">{dept.headDoctor}</td>
                          <td className="px-5 py-4 text-center">
                            <span className="font-bold text-[#2563EB]">{dept.doctors}</span> BS / <span className="font-bold text-purple-600">{dept.rooms}</span> P
                          </td>
                          <td className="px-5 py-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold border ${dept.color}`}>{dept.status}</span>
                          </td>
                          <td className="px-5 py-4 text-center">
                            <div className="flex justify-center gap-2">
                              <button className="p-1.5 text-gray-400 hover:text-[#2563EB] hover:bg-blue-50 rounded"><Edit size={16}/></button>
                              <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"><Trash2 size={16}/></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CỘT PHẢI: Chi tiết Khoa phòng */}
              <div className="xl:w-[40%] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 bg-gradient-to-br from-[#172554] to-[#2563EB] text-white relative shrink-0">
                  <h2 className="text-xl font-bold mb-1 flex items-center gap-2"><Building2 size={20}/> Khoa {activeDept.name}</h2>
                  <p className="text-blue-200 text-sm">Mã Khoa: {activeDept.id}</p>
                </div>
                
                <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                      <p className="text-xs text-gray-500 font-bold uppercase mb-1 flex items-center gap-1.5"><User size={14}/> Trưởng khoa</p>
                      <p className="font-bold text-gray-900">{activeDept.headDoctor}</p>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                      <p className="text-xs text-gray-500 font-bold uppercase mb-1 flex items-center gap-1.5"><Activity size={14}/> Trạng thái</p>
                      <span className={`px-2 py-1 rounded text-xs font-bold border inline-block mt-1 ${activeDept.color}`}>{activeDept.status}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><DoorOpen size={18} className="text-[#2563EB]"/> Danh sách Phòng khám ({activeDept.rooms})</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {Array.from({ length: activeDept.rooms }).map((_, i) => (
                        <div key={i} className="border border-gray-200 p-3 rounded-xl flex items-center justify-between hover:border-blue-300 transition cursor-pointer">
                          <div>
                            <p className="font-bold text-gray-900 text-sm">Phòng {100 + i + 1}</p>
                            <p className="text-xs text-green-600 font-medium">Đang hoạt động</p>
                          </div>
                          <ChevronRight size={16} className="text-gray-400"/>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><Users size={18} className="text-purple-600"/> Nhân sự ({activeDept.doctors} Bác sĩ)</h3>
                    <div className="space-y-2">
                      {Array.from({ length: Math.min(3, activeDept.doctors) }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">BS</div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">Bác sĩ thuộc khoa {i + 1}</p>
                            <p className="text-xs text-gray-500">Chuyên môn chính</p>
                          </div>
                        </div>
                      ))}
                      {activeDept.doctors > 3 && <p className="text-xs text-center text-[#2563EB] font-bold cursor-pointer hover:underline mt-2">Xem tất cả nhân sự</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =======================================
              VIEW 2: QUẢN LÝ DỊCH VỤ
          ======================================= */}
          {activeMainTab === 'services' && (
            <div className="flex flex-col xl:flex-row gap-8 h-[calc(100vh-360px)] min-h-[500px] animate-in fade-in">
              
              {/* CỘT TRÁI: Bảng Dịch vụ */}
              <div className="xl:w-[65%] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex gap-4 items-center">
                  <div className="relative flex-1">
                    <input type="text" placeholder="Tìm tên dịch vụ, mã DV..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#2563EB] outline-none"/>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16}/>
                  </div>
                  <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#2563EB] bg-white">
                    <option>Chọn Khoa (Tất cả)</option>
                    <option>Nội tổng quát</option>
                    <option>Chẩn đoán hình ảnh</option>
                  </select>
                </div>
                
                <div className="flex-1 overflow-auto custom-scrollbar">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-white border-b border-gray-100 text-gray-500 font-bold sticky top-0 z-10 shadow-sm">
                      <tr>
                        <th className="px-5 py-4">Mã DV / Tên dịch vụ</th>
                        <th className="px-5 py-4">Khoa phụ trách</th>
                        <th className="px-5 py-4 text-right">Giá (VNĐ)</th>
                        <th className="px-5 py-4 text-center">Thời gian</th>
                        <th className="px-5 py-4">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {services.map((svc) => (
                        <tr 
                          key={svc.id} 
                          onClick={() => setSelectedServiceId(svc.id)}
                          className={`cursor-pointer transition-colors ${selectedServiceId === svc.id ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
                        >
                          <td className="px-5 py-4">
                            <p className={`font-bold ${selectedServiceId === svc.id ? 'text-[#2563EB]' : 'text-gray-900'}`}>{svc.name}</p>
                            <p className="text-xs text-gray-500">{svc.id}</p>
                          </td>
                          <td className="px-5 py-4 font-medium text-gray-600">{svc.dept}</td>
                          <td className="px-5 py-4 text-right font-black text-emerald-600">{svc.price}đ</td>
                          <td className="px-5 py-4 text-center text-gray-600"><Clock size={14} className="inline mr-1 text-gray-400"/> {svc.time}</td>
                          <td className="px-5 py-4">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold border ${svc.color}`}>{svc.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CỘT PHẢI: Chi tiết Dịch vụ */}
              <div className="xl:w-[35%] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                 <div className="p-6 bg-gradient-to-br from-[#172554] to-[#2563EB] text-white relative shrink-0">
                  <h2 className="text-xl font-bold mb-1 flex items-center gap-2"><Stethoscope size={20}/> {activeService.name}</h2>
                  <p className="text-blue-200 text-sm">Mã Dịch vụ: {activeService.id}</p>
                </div>

                <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                  <div className="border border-gray-200 rounded-xl p-5 bg-gray-50 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase mb-1">Đơn giá dịch vụ</p>
                      <p className="text-2xl font-black text-emerald-600">{activeService.price} VNĐ</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center"><Wallet size={24}/></div>
                  </div>

                  <div className="space-y-4">
                     <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                       <span className="text-gray-500 text-sm font-medium">Khoa phụ trách</span>
                       <span className="font-bold text-gray-900">{activeService.dept}</span>
                     </div>
                     <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                       <span className="text-gray-500 text-sm font-medium">Thời gian ước tính</span>
                       <span className="font-bold text-gray-900">{activeService.time}</span>
                     </div>
                     <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                       <span className="text-gray-500 text-sm font-medium">Trạng thái</span>
                       <span className={`px-2 py-1 rounded text-[10px] font-bold border ${activeService.color}`}>{activeService.status}</span>
                     </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button className="flex-1 bg-white border border-gray-200 text-gray-700 py-2.5 rounded-xl font-bold hover:bg-gray-50 transition flex justify-center items-center gap-2"><Edit size={16}/> Sửa</button>
                    <button className="flex-1 bg-red-50 border border-red-200 text-red-600 py-2.5 rounded-xl font-bold hover:bg-red-100 transition flex justify-center items-center gap-2"><Trash2 size={16}/> Ngừng DV</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =======================================
              VIEW 3: BÁO CÁO & THỐNG KÊ (A+ Feature)
          ======================================= */}
          {activeMainTab === 'stats' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in">
              
              {/* Chart 1: Lượt sử dụng (Bar Chart) */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><BarChart3 className="text-[#2563EB]"/> Thống kê sử dụng dịch vụ (%)</h3>
                <div className="space-y-5">
                  {[
                    { name: 'Khám tổng quát', percent: 42, color: 'bg-blue-500' },
                    { name: 'Khám chuyên khoa', percent: 25, color: 'bg-indigo-500' },
                    { name: 'Siêu âm / X-Quang', percent: 18, color: 'bg-purple-500' },
                    { name: 'Xét nghiệm máu', percent: 15, color: 'bg-emerald-500' },
                  ].map((stat, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm font-bold text-gray-700 mb-1.5">
                        <span>{stat.name}</span>
                        <span>{stat.percent}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-3.5">
                        <div className={`${stat.color} h-3.5 rounded-full`} style={{ width: `${stat.percent}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chart 2: Doanh thu theo Khoa (Pie Chart Mock) */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><PieChart className="text-orange-500"/> Doanh thu theo Khoa phòng</h3>
                <div className="flex-1 flex items-center justify-center gap-8">
                  {/* CSS Mock Pie Chart */}
                  <div className="w-40 h-40 rounded-full border-[12px] border-gray-100 relative shadow-inner flex items-center justify-center text-center flex-col">
                    <span className="text-xs text-gray-500 font-bold uppercase">Tổng</span>
                    <span className="text-lg font-black text-gray-900">850 Tr</span>
                    {/* Simulated slices using conic-gradient in real CSS, using borders here for simplicity */}
                    <div className="absolute inset-[-12px] rounded-full border-[12px] border-blue-500" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)' }}></div>
                    <div className="absolute inset-[-12px] rounded-full border-[12px] border-emerald-500" style={{ clipPath: 'polygon(50% 50%, 0% 50%, 0% 0%, 50% 0%)' }}></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Nội tổng quát (65%)</div>
                    <div className="flex items-center gap-2 text-sm"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Chẩn đoán HA (20%)</div>
                    <div className="flex items-center gap-2 text-sm"><span className="w-3 h-3 rounded-full bg-gray-200"></span> Khác (15%)</div>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </main>

      {/* ==========================================
          MODAL 1: THÊM KHOA PHÒNG
      ========================================== */}
      {isAddDeptModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><Building2 size={20} className="text-[#2563EB]"/> Thêm Khoa Phòng Mới</h2>
              <button onClick={() => setIsAddDeptModalOpen(false)} className="text-gray-400 hover:text-gray-700 transition"><X size={24}/></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tên khoa <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white" placeholder="VD: Khoa Ngoại thần kinh"/>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Mã khoa <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white" placeholder="KP..."/>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Số lượng phòng</label>
                  <input type="number" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white" placeholder="0"/>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Trưởng khoa</label>
                  <select className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white">
                    <option>Chọn bác sĩ...</option>
                    <option>BS. Nguyễn Văn Bình</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Mô tả thêm</label>
                  <textarea rows={2} className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white"></textarea>
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setIsAddDeptModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 transition">Hủy</button>
              <button className="bg-[#2563EB] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md transition">Lưu Khoa phòng</button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL 2: THÊM DỊCH VỤ
      ========================================== */}
      {isAddServiceModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><Stethoscope size={20} className="text-[#2563EB]"/> Thêm Dịch Vụ Mới</h2>
              <button onClick={() => setIsAddServiceModalOpen(false)} className="text-gray-400 hover:text-gray-700 transition"><X size={24}/></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tên dịch vụ <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white" placeholder="VD: Khám nội tiết"/>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Khoa phụ trách <span className="text-red-500">*</span></label>
                  <select className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white">
                    <option>Chọn khoa...</option>
                    <option>Nội tổng quát</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Giá tiền (VNĐ) <span className="text-red-500">*</span></label>
                  <input type="number" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white" placeholder="150000"/>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Thời gian (Phút)</label>
                  <input type="number" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white" placeholder="30"/>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Mô tả</label>
                  <textarea rows={2} className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white"></textarea>
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setIsAddServiceModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 transition">Hủy</button>
              <button className="bg-[#2563EB] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md transition">Lưu Dịch vụ</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}