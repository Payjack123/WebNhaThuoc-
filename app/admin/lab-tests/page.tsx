'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Users, CalendarDays, FileText, Pill, TestTube, 
  Settings, LogOut, Search, Activity, User, Building2, 
  ShieldCheck, History, Wallet, CheckCircle2, XCircle, Clock,
  Download, Printer, Filter, Eye, Stethoscope, FileBadge, 
  Image as ImageIcon, Check, AlertTriangle, ShieldPlus, Droplet, Monitor
} from 'lucide-react';

export default function AdminLabTestsPage() {
  const router = useRouter();
  const [selectedLabId, setSelectedLabId] = useState('XN001');
  const [activeTab, setActiveTab] = useState('results');
  const [dateRange, setDateRange] = useState('Hôm nay');

  const handleLogout = () => {
    router.push('/login');
  };

  // Mock dữ liệu Xét nghiệm cực kỳ chi tiết
  const labTests = [
    { 
      id: 'XN001', patient: 'Nguyễn Văn A', patientId: 'BN001', gender: 'Nam', age: 25, bloodType: 'O+', phone: '0981.234.567',
      type: 'Huyết đồ (Tổng phân tích tế bào máu)', category: 'Xét nghiệm Máu', 
      doctor: 'BS Nguyễn Văn Bình', technician: 'KTV Trần Hữu Cảnh', equipment: 'Máy huyết học tự động Sysmex XN-1000',
      date: '15/08/2026', time: '08:30',
      status: 'Hoàn thành', statusColor: 'text-green-700 bg-green-100 border-green-200' 
    },
    { 
      id: 'XN002', patient: 'Trần Thị B', patientId: 'BN002', gender: 'Nữ', age: 32, bloodType: 'A+', phone: '0971.234.567',
      type: 'Siêu âm ổ bụng tổng quát', category: 'Chẩn đoán hình ảnh', 
      doctor: 'BS Trần Thị An', technician: 'BS Lê Thu Hà', equipment: 'Máy siêu âm GE Voluson E8',
      date: '15/08/2026', time: '09:15',
      status: 'Đang xử lý', statusColor: 'text-yellow-700 bg-yellow-100 border-yellow-200' 
    },
    { 
      id: 'XN003', patient: 'Lê Văn C', patientId: 'BN003', gender: 'Nam', age: 41, bloodType: 'B+', phone: '0961.234.567',
      type: 'X-Quang ngực thẳng', category: 'Chẩn đoán hình ảnh', 
      doctor: 'BS Lê Minh Hải', technician: 'KTV Phạm Văn Dũng', equipment: 'Hệ thống X-Quang KTS DR',
      date: '14/08/2026', time: '10:00',
      status: 'Đã hủy', statusColor: 'text-red-700 bg-red-100 border-red-200' 
    },
    { 
      id: 'XN004', patient: 'Phạm Minh D', patientId: 'BN004', gender: 'Nam', age: 58, bloodType: 'AB+', phone: '0951.234.567',
      type: 'Định lượng Glucose máu', category: 'Sinh hóa', 
      doctor: 'BS Trần Hùng', technician: 'KTV Nguyễn Thị Mơ', equipment: 'Máy sinh hóa tự động AU680',
      date: '14/08/2026', time: '14:30',
      status: 'Hoàn thành', statusColor: 'text-green-700 bg-green-100 border-green-200' 
    },
    { 
      id: 'XN005', patient: 'Hoàng Ngọc E', patientId: 'BN005', gender: 'Nữ', age: 29, bloodType: 'O-', phone: '0941.234.567',
      type: 'Tổng phân tích nước tiểu', category: 'Nước tiểu', 
      doctor: 'BS Nguyễn Văn Bình', technician: 'KTV Trần Hữu Cảnh', equipment: 'Máy phân tích nước tiểu URIT',
      date: '13/08/2026', time: '08:00',
      status: 'Hoàn thành', statusColor: 'text-green-700 bg-green-100 border-green-200' 
    },
  ];

  const activeLab = labTests.find(l => l.id === selectedLabId) || labTests[0];

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans text-gray-800 overflow-hidden">
      
      {/* ==========================================
          1. SIDEBAR (Active: Quản lý Xét nghiệm)
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
            {/* Active Menu */}
            <Link href="/admin/lab-tests" className="flex items-center gap-3 px-4 py-2.5 bg-[#2563EB] text-white rounded-xl font-medium shadow-md transition-all text-sm">
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
            <div className="bg-blue-50 p-2 rounded-lg"><TestTube className="text-[#2563EB]" size={24}/></div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Quản lý Xét nghiệm</h1>
              <p className="text-xs text-gray-500 font-medium">Theo dõi, quản lý và tra cứu tất cả phiếu xét nghiệm & CDHA</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-green-50 text-green-600 border border-green-200 px-5 py-2.5 rounded-xl font-bold hover:bg-green-100 transition-all flex items-center gap-2 text-sm">
              <Download size={18}/> Xuất Excel
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
              { label: 'Tổng xét nghiệm', value: '1,850', icon: TestTube, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Yêu cầu hôm nay', value: '38', icon: CalendarDays, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { label: 'Hoàn thành', value: '1,650', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Đang xử lý', value: '145', icon: Activity, color: 'text-yellow-600', bg: 'bg-yellow-50' },
              { label: 'Đã hủy', value: '55', icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
              { label: 'Đã trả kết quả', value: '1,720', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' },
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
                <input type="text" placeholder="Tên BN, mã XN, mã BN..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition-all"/>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
              </div>
              <select className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none">
                <option>Trạng thái (Tất cả)</option>
                <option>Hoàn thành</option>
                <option>Đang xử lý</option>
                <option>Đã hủy</option>
              </select>
              <select className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none hidden md:block">
                <option>Nhóm XN (Tất cả)</option>
                <option>Huyết học</option>
                <option>Sinh hóa</option>
                <option>Chẩn đoán hình ảnh</option>
              </select>
              <select className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none hidden lg:block">
                <option>Bác sĩ (Tất cả)</option>
                <option>BS. Nguyễn Văn Bình</option>
              </select>
              <button className="bg-gray-100 border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-200 transition flex items-center gap-2 text-sm">
                <Filter size={18}/> Lọc
              </button>
            </div>
            <button className="text-gray-500 hover:text-[#2563EB] font-bold text-sm underline underline-offset-2 transition-colors px-4">
              Làm mới bộ lọc
            </button>
          </div>

          {/* MASTER-DETAIL LAYOUT */}
          <div className="flex flex-col xl:flex-row gap-8 h-[calc(100vh-320px)] min-h-[600px]">
            
            {/* CỘT TRÁI (MASTER): Danh sách Phiếu xét nghiệm (55%) */}
            <div className="xl:w-[55%] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center shrink-0">
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><TestTube size={18} className="text-[#2563EB]"/> Danh sách Yêu cầu & Kết quả</h3>
                <span className="text-sm font-bold text-[#2563EB] bg-blue-100 px-3 py-1 rounded-full">{labTests.length} Phiếu</span>
              </div>
              
              <div className="flex-1 overflow-auto custom-scrollbar">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-white border-b border-gray-100 text-gray-500 font-bold sticky top-0 z-10 shadow-sm">
                    <tr>
                      <th className="px-5 py-4">Mã / Bệnh nhân</th>
                      <th className="px-5 py-4">Chỉ định</th>
                      <th className="px-5 py-4">Thời gian</th>
                      <th className="px-5 py-4">Trạng thái</th>
                      <th className="px-5 py-4 text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {labTests.map((lab) => (
                      <tr 
                        key={lab.id} 
                        onClick={() => setSelectedLabId(lab.id)}
                        className={`cursor-pointer transition-colors ${selectedLabId === lab.id ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
                      >
                        <td className="px-5 py-4">
                          <p className={`font-bold ${selectedLabId === lab.id ? 'text-[#2563EB]' : 'text-gray-900'}`}>{lab.id}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{lab.patient}</p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-bold text-gray-700 truncate max-w-[150px]" title={lab.type}>{lab.type}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{lab.doctor}</p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-medium text-gray-900 flex items-center gap-1.5"><Clock size={14} className="text-gray-400"/> {lab.time}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{lab.date}</p>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center w-max gap-1.5 ${lab.statusColor}`}>
                            {lab.status === 'Hoàn thành' ? <CheckCircle2 size={12}/> : lab.status === 'Đã hủy' ? <XCircle size={12}/> : <span className="w-1.5 h-1.5 rounded-full bg-yellow-600 animate-pulse"></span>}
                            {lab.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button className="p-1.5 text-gray-400 hover:text-[#2563EB] hover:bg-blue-50 rounded transition" title="Xem chi tiết"><Eye size={16}/></button>
                            <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded transition" title="In phiếu"><Printer size={16}/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-gray-100 bg-white flex justify-between items-center text-sm text-gray-500">
                <span>Hiển thị 1-5 của 1,850 kết quả</span>
                <div className="flex gap-1">
                  <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Trước</button>
                  <button className="px-3 py-1 bg-[#2563EB] text-white rounded font-bold shadow-sm">1</button>
                  <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">2</button>
                  <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Sau</button>
                </div>
              </div>
            </div>

            {/* CỘT PHẢI (DETAIL): Chi tiết Xét nghiệm (45%) */}
            <div className="xl:w-[45%] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
              
              {/* Thẻ Summary */}
              <div className="p-6 bg-gradient-to-br from-[#172554] to-[#2563EB] text-white relative shrink-0">
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold shadow-sm">
                  {activeLab.status === 'Hoàn thành' ? <CheckCircle2 size={14} className="text-green-300"/> : activeLab.status === 'Đã hủy' ? <XCircle size={14} className="text-red-300"/> : <Activity size={14} className="text-yellow-300"/>}
                  {activeLab.status}
                </div>
                
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <TestTube size={20}/> Chi tiết: {activeLab.id}
                </h2>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-xs text-blue-200 uppercase font-bold tracking-wider mb-1">Bệnh nhân</p>
                    <p className="font-bold text-lg">{activeLab.patient}</p>
                    <p className="text-xs text-blue-100 mt-0.5">{activeLab.patientId} • {activeLab.gender} • {activeLab.age} tuổi</p>
                    <div className="flex gap-2 mt-2">
                      <span className="bg-blue-900/40 text-blue-100 px-2 py-0.5 rounded text-[10px] font-bold border border-blue-400/30 flex items-center gap-1"><Droplet size={10}/> Nhóm: {activeLab.bloodType}</span>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-xs text-blue-200 uppercase font-bold tracking-wider mb-1">Chỉ định</p>
                    <p className="font-bold text-base leading-tight truncate" title={activeLab.type}>{activeLab.type}</p>
                    <p className="text-xs text-blue-100 mt-1 flex items-center gap-1"><Stethoscope size={12}/> {activeLab.doctor}</p>
                    <p className="text-xs text-blue-100 mt-0.5 flex items-center gap-1"><CalendarDays size={12}/> {activeLab.time} - {activeLab.date}</p>
                  </div>
                </div>
              </div>

              {/* TABS NAVIGATION */}
              <div className="flex px-2 border-b border-gray-100 bg-gray-50 shrink-0 overflow-x-auto custom-scrollbar">
                {[
                  { id: 'results', label: 'Kết quả XN', icon: FileText },
                  { id: 'timeline', label: 'Tiến trình', icon: Clock },
                  { id: 'attachments', label: 'Đính kèm', icon: ImageIcon },
                  { id: 'technical', label: 'Thông số KT', icon: Monitor }
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
              <div className="flex-1 overflow-y-auto p-0 bg-gray-50/50">
                
                {/* 1. KẾT QUẢ XÉT NGHIỆM CHI TIẾT */}
                {activeTab === 'results' && (
                  <div className="animate-in fade-in h-full flex flex-col">
                    {activeLab.status === 'Đang xử lý' ? (
                      <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8 text-center space-y-3">
                         <div className="w-16 h-16 border-4 border-gray-200 border-t-[#2563EB] rounded-full animate-spin"></div>
                         <p className="font-bold text-gray-600 mt-4">Mẫu đang được phân tích...</p>
                         <p className="text-sm">Kết quả sẽ được hiển thị ngay khi KTV hoàn thành.</p>
                      </div>
                    ) : activeLab.status === 'Đã hủy' ? (
                      <div className="flex flex-col items-center justify-center h-full text-red-400 p-8 text-center space-y-3">
                         <XCircle size={48} className="text-red-300"/>
                         <p className="font-bold text-red-600">Phiếu xét nghiệm đã bị hủy</p>
                         <p className="text-sm text-gray-500">Lý do: Bệnh nhân không đủ điều kiện lấy mẫu (chưa nhịn ăn).</p>
                      </div>
                    ) : (
                      // Bảng kết quả chi tiết
                      <div className="p-5 space-y-4">
                        <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                          <span className="text-sm font-bold text-gray-700">Mẫu bệnh phẩm: <span className="text-[#2563EB]">Huyết thanh</span></span>
                          <button className="text-sm font-bold text-[#2563EB] flex items-center gap-1 hover:underline"><Printer size={14}/> In Phiếu KQ</button>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                          <table className="w-full text-left text-sm">
                            <thead className="bg-gray-100 border-b border-gray-200 text-gray-600 font-bold">
                              <tr>
                                <th className="px-4 py-3">Chỉ số (Test)</th>
                                <th className="px-4 py-3 text-center">Kết quả</th>
                                <th className="px-4 py-3 text-center">CSBT</th>
                                <th className="px-4 py-3 text-center w-24">Đánh giá</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {/* Row 1: Bình thường */}
                              <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                  <p className="font-bold text-gray-900">RBC (Hồng cầu)</p>
                                  <p className="text-[10px] text-gray-500 uppercase">Tế bào</p>
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <p className="font-black text-gray-900 text-base">4.85</p>
                                  <p className="text-[10px] text-gray-500">T/L</p>
                                </td>
                                <td className="px-4 py-3 text-center text-gray-500 text-xs font-medium">4.0 - 5.8</td>
                                <td className="px-4 py-3 text-center">
                                  {/* Visual Range Bar */}
                                  <div className="w-full bg-gray-200 h-1.5 rounded-full relative" title="Bình thường">
                                    <div className="absolute left-[20%] right-[20%] bg-green-200 h-full"></div>
                                    <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-green-600 rounded-full shadow border border-white" style={{left: '50%'}}></div>
                                  </div>
                                </td>
                              </tr>
                              {/* Row 2: Bình thường */}
                              <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                  <p className="font-bold text-gray-900">WBC (Bạch cầu)</p>
                                  <p className="text-[10px] text-gray-500 uppercase">Tế bào</p>
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <p className="font-black text-gray-900 text-base">6.2</p>
                                  <p className="text-[10px] text-gray-500">G/L</p>
                                </td>
                                <td className="px-4 py-3 text-center text-gray-500 text-xs font-medium">4.0 - 10.0</td>
                                <td className="px-4 py-3 text-center">
                                  <div className="w-full bg-gray-200 h-1.5 rounded-full relative" title="Bình thường">
                                    <div className="absolute left-[20%] right-[20%] bg-green-200 h-full"></div>
                                    <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-green-600 rounded-full shadow border border-white" style={{left: '35%'}}></div>
                                  </div>
                                </td>
                              </tr>
                              {/* Row 3: Bất thường (Cao) */}
                              <tr className="hover:bg-red-50 bg-red-50/30">
                                <td className="px-4 py-3">
                                  <p className="font-bold text-red-700 flex items-center gap-1">Glucose <AlertTriangle size={12}/></p>
                                  <p className="text-[10px] text-red-500 uppercase">Sinh hóa</p>
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <p className="font-black text-red-600 text-base">7.8</p>
                                  <p className="text-[10px] text-red-500">mmol/L</p>
                                </td>
                                <td className="px-4 py-3 text-center text-gray-500 text-xs font-medium">3.9 - 6.4</td>
                                <td className="px-4 py-3 text-center">
                                  <div className="w-full bg-gray-200 h-1.5 rounded-full relative" title="Cao">
                                    <div className="absolute left-[20%] right-[20%] bg-green-200 h-full"></div>
                                    <div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-red-600 rounded-full shadow border border-white animate-pulse" style={{left: '85%'}}></div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="bg-gray-50 p-3 text-xs text-gray-500 border-t border-gray-200">
                            <span className="font-bold text-gray-700">Kết luận:</span> Các chỉ số huyết học bình thường. Chỉ số đường huyết (Glucose) cao hơn mức tham chiếu, đề nghị bác sĩ kiểm tra chuyên sâu.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. TIMELINE XỬ LÝ */}
                {activeTab === 'timeline' && (
                  <div className="p-6">
                    <div className="space-y-0 relative before:absolute before:inset-0 before:ml-[37px] before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#2563EB] before:to-gray-200 animate-in fade-in">
                      
                      <div className="relative pl-14 pb-8">
                        <span className="absolute left-6 top-1 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center -translate-x-1/2 z-10 shadow-[0_0_0_4px_#f9fafb]"><Check size={12}/></span>
                        <span className="absolute left-0 top-1.5 text-[10px] font-bold text-gray-500 w-10 text-right">{activeLab.time}</span>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">Bác sĩ chỉ định</h4>
                          <p className="text-xs text-gray-600 mt-0.5">{activeLab.doctor} tạo yêu cầu xét nghiệm.</p>
                        </div>
                      </div>

                      <div className="relative pl-14 pb-8">
                        <span className={`absolute left-6 top-1 w-6 h-6 rounded-full flex items-center justify-center -translate-x-1/2 z-10 shadow-[0_0_0_4px_#f9fafb] ${activeLab.status !== 'Đã hủy' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'}`}>
                          {activeLab.status !== 'Đã hủy' ? <Check size={12}/> : <Clock size={12}/>}
                        </span>
                        <span className="absolute left-0 top-1.5 text-[10px] font-bold text-gray-500 w-10 text-right">08:45</span>
                        <div>
                          <h4 className={`font-bold text-sm ${activeLab.status !== 'Đã hủy' ? 'text-gray-900' : 'text-gray-500'}`}>Tiếp nhận mẫu</h4>
                          {activeLab.status !== 'Đã hủy' && <p className="text-xs text-gray-600 mt-0.5">Phòng Lab đã nhận mẫu bệnh phẩm (Barcode: 098812).</p>}
                        </div>
                      </div>

                      <div className="relative pl-14 pb-8">
                        <span className={`absolute left-6 top-1 w-6 h-6 rounded-full flex items-center justify-center -translate-x-1/2 z-10 shadow-[0_0_0_4px_#f9fafb] ${activeLab.status === 'Hoàn thành' ? 'bg-blue-600 text-white' : activeLab.status === 'Đang xử lý' ? 'bg-yellow-500 text-white animate-pulse' : 'bg-gray-300 text-gray-500'}`}>
                          {activeLab.status === 'Hoàn thành' ? <Check size={12}/> : <Activity size={12}/>}
                        </span>
                        <span className="absolute left-0 top-1.5 text-[10px] font-bold text-gray-500 w-10 text-right">09:00</span>
                        <div>
                          <h4 className={`font-bold text-sm ${activeLab.status === 'Hoàn thành' ? 'text-gray-900' : activeLab.status === 'Đang xử lý' ? 'text-yellow-700' : 'text-gray-500'}`}>Chạy mẫu & Phân tích</h4>
                          {activeLab.status === 'Đang xử lý' && <p className="text-xs text-gray-600 mt-0.5">Đang chạy trên hệ thống tự động.</p>}
                        </div>
                      </div>

                      <div className="relative pl-14">
                        <span className={`absolute left-6 top-1 w-6 h-6 rounded-full flex items-center justify-center -translate-x-1/2 z-10 shadow-[0_0_0_4px_#f9fafb] ${activeLab.status === 'Hoàn thành' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
                          {activeLab.status === 'Hoàn thành' ? <CheckCircle2 size={12}/> : <Clock size={12}/>}
                        </span>
                        <span className="absolute left-0 top-1.5 text-[10px] font-bold text-gray-500 w-10 text-right">09:30</span>
                        <div>
                          <h4 className={`font-bold text-sm ${activeLab.status === 'Hoàn thành' ? 'text-green-700' : 'text-gray-500'}`}>Trình duyệt & Trả kết quả</h4>
                          {activeLab.status === 'Hoàn thành' && <p className="text-xs text-gray-600 mt-0.5">KTV duyệt KQ. Đã đồng bộ lên hồ sơ BS.</p>}
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* 3. TÀI LIỆU ĐÍNH KÈM */}
                {activeTab === 'attachments' && (
                  <div className="p-6 space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white hover:border-[#2563EB] transition group shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="bg-red-50 p-3 rounded-xl text-red-500"><FileBadge size={24}/></div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm group-hover:text-[#2563EB] transition">Phieu_KQ_XN001.pdf</p>
                          <p className="text-xs text-gray-500 mt-0.5">Xuất tự động từ hệ thống • 450 KB</p>
                        </div>
                      </div>
                      <button className="text-[#2563EB] text-sm font-bold bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition">Mở / In</button>
                    </div>
                    {activeLab.category === 'Chẩn đoán hình ảnh' && (
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white hover:border-[#2563EB] transition group shadow-sm">
                        <div className="flex items-center gap-4">
                          <div className="bg-purple-50 p-3 rounded-xl text-purple-600"><ImageIcon size={24}/></div>
                          <div>
                            <p className="font-bold text-gray-900 text-sm group-hover:text-[#2563EB] transition">Anh_Chup_DICOM.png</p>
                            <p className="text-xs text-gray-500 mt-0.5">PACS Server • 2.4 MB</p>
                          </div>
                        </div>
                        <button className="text-[#2563EB] text-sm font-bold bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition">Xem Ảnh</button>
                      </div>
                    )}
                  </div>
                )}

                {/* 4. THÔNG SỐ KỸ THUẬT & TRUY VẾT */}
                {activeTab === 'technical' && (
                  <div className="p-6 animate-in fade-in">
                    <div className="bg-gray-100 rounded-xl p-5 border border-gray-200 space-y-4">
                       <h3 className="font-bold text-gray-900 flex items-center gap-2 border-b border-gray-200 pb-2"><Monitor size={16} className="text-gray-500"/> Thông tin Vận hành Hệ thống</h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                         <div>
                           <p className="text-xs text-gray-500 font-bold uppercase mb-1">Thiết bị thực hiện</p>
                           <p className="font-medium text-gray-900">{activeLab.equipment}</p>
                         </div>
                         <div>
                           <p className="text-xs text-gray-500 font-bold uppercase mb-1">Người vận hành (KTV)</p>
                           <p className="font-medium text-gray-900">{activeLab.technician}</p>
                         </div>
                         <div>
                           <p className="text-xs text-gray-500 font-bold uppercase mb-1">LIS / HIS ID Sync</p>
                           <p className="font-mono text-xs bg-white border border-gray-200 px-2 py-1 rounded inline-block text-gray-600">LIS-TX-99201-A</p>
                         </div>
                         <div>
                           <p className="text-xs text-gray-500 font-bold uppercase mb-1">Phòng Lab</p>
                           <p className="font-medium text-gray-900">Lab Trung tâm - Tầng 2</p>
                         </div>
                       </div>
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