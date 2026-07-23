'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Users, CalendarDays, FileText, Pill, TestTube, 
  Bell, Settings, LogOut, Search, Activity, User, Building2, 
  ShieldCheck, History, Wallet, CheckCircle2, FilePlus, Paperclip, 
  Stethoscope, Download, Printer, Filter, Plus, Eye, Clock, 
  Droplet, ShieldPlus, FileBadge, Image as ImageIcon, Check
} from 'lucide-react';

export default function AdminRecordsPage() {
  const router = useRouter();
  const [selectedRecordId, setSelectedRecordId] = useState('BA001');
  const [activeTab, setActiveTab] = useState('content');

  const handleLogout = () => {
    // localStorage.removeItem('token');
    router.push('/login');
  };

  // Mock dữ liệu Bệnh án
  const records = [
    { id: 'BA001', patient: 'Nguyễn Văn A', patientId: 'BN001', age: 25, gender: 'Nam', bloodType: 'O+', bhyt: 'Có', doctor: 'BS Nguyễn Văn Bình', specialty: 'Nội tổng quát', date: '15/08/2026', status: 'Hoàn thành', statusColor: 'text-green-700 bg-green-100 border-green-200' },
    { id: 'BA002', patient: 'Trần Thị B', patientId: 'BN002', age: 32, gender: 'Nữ', bloodType: 'A+', bhyt: 'Không', doctor: 'BS Trần Thị An', specialty: 'Tim mạch', date: '15/08/2026', status: 'Đang điều trị', statusColor: 'text-yellow-700 bg-yellow-100 border-yellow-200' },
    { id: 'BA003', patient: 'Lê Văn C', patientId: 'BN003', age: 41, gender: 'Nam', bloodType: 'B+', bhyt: 'Có', doctor: 'BS Lê Minh Hải', specialty: 'Da liễu', date: '14/08/2026', status: 'Hoàn thành', statusColor: 'text-green-700 bg-green-100 border-green-200' },
    { id: 'BA004', patient: 'Phạm Minh D', patientId: 'BN004', age: 58, gender: 'Nam', bloodType: 'AB+', bhyt: 'Có', doctor: 'BS Trần Hùng', specialty: 'Nhi khoa', date: '13/08/2026', status: 'Đang điều trị', statusColor: 'text-yellow-700 bg-yellow-100 border-yellow-200' },
    { id: 'BA005', patient: 'Hoàng Ngọc E', patientId: 'BN005', age: 29, gender: 'Nữ', bloodType: 'O-', bhyt: 'Không', doctor: 'BS Nguyễn Văn Bình', specialty: 'Nội tổng quát', date: '12/08/2026', status: 'Hoàn thành', statusColor: 'text-green-700 bg-green-100 border-green-200' },
  ];

  const activeRecord = records.find(r => r.id === selectedRecordId) || records[0];

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
          
          {/* Nhóm 1: Tổng quan */}
          <div className="space-y-1">
            <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">1. Tổng quan</p>
            <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <LayoutDashboard size={18}/> Dashboard & Báo cáo
            </Link>
          </div>

          {/* Nhóm 2: Quản lý phòng khám */}
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
            {/* Active Menu */}
            <Link href="/admin/records" className="flex items-center gap-3 px-4 py-2.5 bg-[#2563EB] text-white rounded-xl font-medium shadow-md transition-all text-sm">
              <FileText size={18}/> Hồ sơ bệnh án
            </Link>
            <Link href="/admin/prescriptions" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <Pill size={18}/> Quản lý Đơn thuốc
            </Link>
            <Link href="/admin/lab-tests" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <TestTube size={18}/> Quản lý Xét nghiệm
            </Link>
          </div>

          {/* Nhóm 3: Quản trị hệ thống */}
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

          {/* Nhóm 4: Cấu hình */}
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
            <div className="bg-blue-50 p-2 rounded-lg"><FileText className="text-[#2563EB]" size={24}/></div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Quản lý Hồ sơ Bệnh án</h1>
              <p className="text-xs text-gray-500 font-medium">Quản lý, tra cứu và theo dõi toàn bộ hồ sơ bệnh án của bệnh nhân</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-[#2563EB] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md transition-all flex items-center gap-2 text-sm">
              <Plus size={18}/> Tạo Hồ sơ
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
              { label: 'Tổng bệnh án', value: '2,150', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Tạo mới hôm nay', value: '35', icon: FilePlus, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { label: 'Đang điều trị', value: '680', icon: Stethoscope, color: 'text-yellow-600', bg: 'bg-yellow-50' },
              { label: 'Đã hoàn thành', value: '1,470', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Có tệp đính kèm', value: '320', icon: Paperclip, color: 'text-purple-600', bg: 'bg-purple-50' },
              { label: 'Bác sĩ tạo bệnh án', value: '25', icon: User, color: 'text-cyan-600', bg: 'bg-cyan-50' },
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
                <input type="text" placeholder="Tìm tên BN, mã BA..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition-all"/>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
              </div>
              <select className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none">
                <option>Trạng thái (Tất cả)</option>
                <option>Hoàn thành</option>
                <option>Đang điều trị</option>
              </select>
              <select className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none hidden md:block">
                <option>Chuyên khoa (Tất cả)</option>
                <option>Nội tổng quát</option>
                <option>Tim mạch</option>
              </select>
              <select className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none hidden lg:block">
                <option>Bác sĩ (Tất cả)</option>
                <option>BS. Nguyễn Văn Bình</option>
              </select>
              <button className="bg-gray-100 border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-200 transition flex items-center gap-2 text-sm">
                <Filter size={18}/> Lọc
              </button>
            </div>
            <div className="flex gap-2">
              <button className="bg-gray-100 border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-bold hover:bg-gray-200 transition flex items-center gap-2 text-sm">
                <Printer size={16}/>
              </button>
              <button className="bg-red-50 border border-red-200 text-red-600 px-4 py-2.5 rounded-xl font-bold hover:bg-red-100 transition flex items-center gap-2 text-sm">
                <Download size={16}/> Xuất PDF
              </button>
            </div>
          </div>

          {/* MASTER-DETAIL LAYOUT */}
          <div className="flex flex-col xl:flex-row gap-8 h-[calc(100vh-320px)] min-h-[550px]">
            
            {/* CỘT TRÁI (MASTER): Danh sách Bệnh án (55%) */}
            <div className="xl:w-[55%] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center shrink-0">
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><FileText size={18} className="text-[#2563EB]"/> Danh sách Bệnh án</h3>
                <span className="text-sm font-bold text-[#2563EB] bg-blue-100 px-3 py-1 rounded-full">{records.length} Kết quả</span>
              </div>
              
              <div className="flex-1 overflow-auto custom-scrollbar">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-white border-b border-gray-100 text-gray-500 font-bold sticky top-0 z-10 shadow-sm">
                    <tr>
                      <th className="px-5 py-4">Bệnh nhân / Mã BA</th>
                      <th className="px-5 py-4">Bác sĩ & Khoa</th>
                      <th className="px-5 py-4">Ngày tạo</th>
                      <th className="px-5 py-4">Trạng thái</th>
                      <th className="px-5 py-4 text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {records.map((rec) => (
                      <tr 
                        key={rec.id} 
                        onClick={() => setSelectedRecordId(rec.id)}
                        className={`cursor-pointer transition-colors ${selectedRecordId === rec.id ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
                      >
                        <td className="px-5 py-4">
                          <p className={`font-bold ${selectedRecordId === rec.id ? 'text-[#2563EB]' : 'text-gray-900'}`}>{rec.patient}</p>
                          <p className="text-xs text-gray-500">{rec.id}</p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-bold text-gray-700">{rec.doctor}</p>
                          <p className="text-xs text-gray-500">{rec.specialty}</p>
                        </td>
                        <td className="px-5 py-4 font-medium text-gray-700">{rec.date}</td>
                        <td className="px-5 py-4">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center w-max gap-1.5 ${rec.statusColor}`}>
                            {rec.status === 'Hoàn thành' ? <CheckCircle2 size={12}/> : <span className="w-1.5 h-1.5 rounded-full bg-yellow-600 animate-pulse"></span>}
                            {rec.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button className="p-1.5 text-gray-400 hover:text-[#2563EB] hover:bg-blue-50 rounded transition" title="Xem chi tiết"><Eye size={16}/></button>
                            <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition" title="Xuất PDF"><Download size={16}/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-gray-100 bg-white flex justify-between items-center text-sm text-gray-500">
                <span>Hiển thị 1-5 của 2,150 bệnh án</span>
                <div className="flex gap-1">
                  <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Trước</button>
                  <button className="px-3 py-1 bg-[#2563EB] text-white rounded font-bold shadow-sm">1</button>
                  <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">2</button>
                  <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Sau</button>
                </div>
              </div>
            </div>

            {/* CỘT PHẢI (DETAIL): Chi tiết bệnh án (45%) */}
            <div className="xl:w-[45%] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
              
              {/* Thẻ Bệnh nhân tóm tắt */}
              <div className="p-6 bg-gradient-to-br from-[#172554] to-[#2563EB] text-white relative shrink-0">
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold shadow-sm">
                  {activeRecord.status === 'Hoàn thành' ? <CheckCircle2 size={14} className="text-green-300"/> : <Activity size={14} className="text-yellow-300"/>}
                  {activeRecord.status}
                </div>
                <div className="flex gap-4 items-center">
                  <img src={`https://ui-avatars.com/api/?name=${activeRecord.patient.replace(/ /g, '+')}&background=random&size=128`} alt="Avatar" className="w-20 h-20 rounded-2xl border-4 border-white/20 shadow-xl"/>
                  <div>
                    <h2 className="text-2xl font-bold">{activeRecord.patient}</h2>
                    <p className="text-blue-200 text-sm mt-1">Mã BN: {activeRecord.patientId} • {activeRecord.gender} • {activeRecord.age} tuổi</p>
                    <div className="flex gap-3 mt-3">
                      <span className="bg-white/10 px-2 py-1 rounded text-xs font-bold flex items-center gap-1"><Droplet size={12} className="text-red-300"/> Nhóm máu: {activeRecord.bloodType}</span>
                      <span className="bg-white/10 px-2 py-1 rounded text-xs font-bold flex items-center gap-1"><ShieldPlus size={12} className="text-green-300"/> BHYT: {activeRecord.bhyt}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TABS NAVIGATION */}
              <div className="flex px-2 border-b border-gray-100 bg-gray-50 shrink-0 overflow-x-auto custom-scrollbar">
                {[
                  { id: 'content', label: 'Nội dung', icon: FileText },
                  { id: 'timeline', label: 'Lịch sử', icon: Clock },
                  { id: 'prescriptions', label: 'Đơn thuốc', icon: Pill },
                  { id: 'labs', label: 'Xét nghiệm', icon: TestTube },
                  { id: 'attachments', label: 'Tài liệu', icon: Paperclip },
                  { id: 'logs', label: 'Nhật ký', icon: History }
                ].map((tab) => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 py-3 px-3 font-bold text-sm border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  >
                    <tab.icon size={14}/> {tab.label}
                  </button>
                ))}
              </div>

              {/* TAB CONTENT */}
              <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                
                {/* 1. NỘI DUNG BỆNH ÁN */}
                {activeTab === 'content' && (
                  <div className="space-y-5 animate-in fade-in">
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Lý do khám</h4>
                      <p className="text-sm text-gray-900 font-medium">Đau đầu kéo dài, kèm theo hắt hơi và sổ mũi nhẹ trong 3 ngày qua.</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl shadow-sm">
                      <h4 className="text-xs font-bold text-[#2563EB] uppercase mb-2 flex items-center gap-1.5"><Stethoscope size={14}/> Chẩn đoán</h4>
                      <p className="text-base text-blue-900 font-bold">Viêm xoang cấp (ICD-10: J01)</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Hướng điều trị</h4>
                      <p className="text-sm text-gray-800 leading-relaxed">
                        - Điều trị nội khoa (sử dụng kháng sinh và thuốc chống viêm).<br/>
                        - Vệ sinh mũi họng hằng ngày bằng nước muối sinh lý.<br/>
                        - Tái khám sau 7 ngày nếu không thuyên giảm.
                      </p>
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold border border-gray-300">BS</div>
                      <div>
                        <p className="text-xs text-gray-500">Bác sĩ điều trị</p>
                        <p className="font-bold text-gray-900 text-sm">{activeRecord.doctor}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. LỊCH SỬ ĐIỀU TRỊ (TIMELINE) */}
                {activeTab === 'timeline' && (
                  <div className="space-y-0 relative before:absolute before:inset-0 before:ml-[13px] before:-translate-x-px before:h-full before:w-0.5 before:bg-gray-200 animate-in fade-in">
                    <div className="relative pl-8 pb-6">
                      <span className="absolute left-0 top-1 w-7 h-7 bg-white text-gray-400 border-2 border-gray-200 rounded-full flex items-center justify-center -translate-x-2.5 z-10"><Check size={14}/></span>
                      <div>
                        <p className="text-xs text-gray-500 font-bold">15/08/2026</p>
                        <h4 className="font-bold text-gray-900 mt-1">Khám lần đầu</h4>
                        <p className="text-sm text-gray-600 mt-0.5">Tiếp nhận bệnh nhân, chỉ định xét nghiệm cơ bản.</p>
                      </div>
                    </div>
                    <div className="relative pl-8 pb-6">
                      <span className="absolute left-0 top-1 w-7 h-7 bg-white text-gray-400 border-2 border-gray-200 rounded-full flex items-center justify-center -translate-x-2.5 z-10"><Check size={14}/></span>
                      <div>
                        <p className="text-xs text-gray-500 font-bold">22/08/2026</p>
                        <h4 className="font-bold text-gray-900 mt-1">Tái khám</h4>
                        <p className="text-sm text-gray-600 mt-0.5">Bệnh nhân phản hồi tốt với thuốc, giảm triệu chứng 80%.</p>
                      </div>
                    </div>
                    <div className="relative pl-8">
                      <span className="absolute left-0 top-1 w-7 h-7 bg-[#2563EB] text-white border-2 border-white shadow-sm rounded-full flex items-center justify-center -translate-x-2.5 z-10"><CheckCircle2 size={14}/></span>
                      <div>
                        <p className="text-xs text-[#2563EB] font-bold">05/09/2026</p>
                        <h4 className="font-bold text-[#2563EB] mt-1">Hoàn thành điều trị</h4>
                        <p className="text-sm text-gray-600 mt-0.5">Sức khỏe ổn định, kết thúc đợt điều trị.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. ĐƠN THUỐC LÊN QUAN */}
                {activeTab === 'prescriptions' && (
                  <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm animate-in fade-in">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-bold">
                        <tr><th className="px-4 py-3">Mã đơn</th><th className="px-4 py-3">Ngày kê</th><th className="px-4 py-3 text-right">Trạng thái</th></tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        <tr className="hover:bg-gray-50 cursor-pointer transition group">
                          <td className="px-4 py-3 font-bold text-[#2563EB] group-hover:underline">DT001</td>
                          <td className="px-4 py-3 text-gray-600 font-medium">15/08/2026</td>
                          <td className="px-4 py-3 text-right"><span className="text-green-600 font-bold text-xs bg-green-50 px-2 py-1 rounded">✔ Đã phát</span></td>
                        </tr>
                        <tr className="hover:bg-gray-50 cursor-pointer transition group">
                          <td className="px-4 py-3 font-bold text-[#2563EB] group-hover:underline">DT002</td>
                          <td className="px-4 py-3 text-gray-600 font-medium">22/08/2026</td>
                          <td className="px-4 py-3 text-right"><span className="text-green-600 font-bold text-xs bg-green-50 px-2 py-1 rounded">✔ Đã phát</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {/* 4. XÉT NGHIỆM */}
                {activeTab === 'labs' && (
                  <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm animate-in fade-in">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-bold">
                        <tr><th className="px-4 py-3">Mã XN</th><th className="px-4 py-3">Loại</th><th className="px-4 py-3">Ngày</th><th className="px-4 py-3">Kết quả</th></tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-bold text-gray-900">XN001</td>
                          <td className="px-4 py-3 text-gray-600 font-medium">Máu</td>
                          <td className="px-4 py-3 text-gray-600">15/08/2026</td>
                          <td className="px-4 py-3 font-bold text-green-600">Bình thường</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-bold text-gray-900">XN002</td>
                          <td className="px-4 py-3 text-gray-600 font-medium">X-Quang</td>
                          <td className="px-4 py-3 text-gray-600">15/08/2026</td>
                          <td className="px-4 py-3 font-bold text-blue-600">Đã có kết quả</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {/* 5. TÀI LIỆU ĐÍNH KÈM */}
                {activeTab === 'attachments' && (
                  <div className="space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white hover:border-[#2563EB] transition group">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><FileBadge size={20}/></div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm group-hover:text-[#2563EB] transition">Phiếu khám ban đầu.pdf</p>
                          <p className="text-xs text-gray-500">245 KB • 15/08/2026</p>
                        </div>
                      </div>
                      <button className="text-[#2563EB] text-sm font-bold hover:underline px-2">Xem</button>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white hover:border-[#2563EB] transition group">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-50 p-2 rounded-lg text-purple-600"><ImageIcon size={20}/></div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm group-hover:text-[#2563EB] transition">Ảnh X-Quang Phổi.jpg</p>
                          <p className="text-xs text-gray-500">1.2 MB • 15/08/2026</p>
                        </div>
                      </div>
                      <button className="text-[#2563EB] text-sm font-bold hover:underline px-2">Xem</button>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white hover:border-[#2563EB] transition group">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-50 p-2 rounded-lg text-green-600"><FileText size={20}/></div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm group-hover:text-[#2563EB] transition">Kết quả xét nghiệm Máu.pdf</p>
                          <p className="text-xs text-gray-500">450 KB • 16/08/2026</p>
                        </div>
                      </div>
                      <button className="text-gray-500 hover:text-[#2563EB] transition p-1"><Download size={18}/></button>
                    </div>
                  </div>
                )}

                {/* 6. NHẬT KÝ CHỈNH SỬA (AUDIT LOGS) */}
                {activeTab === 'logs' && (
                  <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[9px] before:-translate-x-px before:h-full before:w-0.5 before:bg-gray-200 animate-in fade-in">
                    <div className="relative pl-6">
                      <span className="absolute left-0 top-1.5 w-2 h-2 bg-gray-400 rounded-full"></span>
                      <p className="text-xs text-gray-500 font-bold mb-0.5">10:20 - Hôm nay</p>
                      <p className="text-sm font-bold text-gray-900">Admin</p>
                      <p className="text-xs text-gray-600">Đã xuất PDF bệnh án.</p>
                    </div>
                    <div className="relative pl-6">
                      <span className="absolute left-0 top-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
                      <p className="text-xs text-gray-500 font-bold mb-0.5">09:45 - 15/08/2026</p>
                      <p className="text-sm font-bold text-blue-700">BS. Nguyễn Văn Bình</p>
                      <p className="text-xs text-gray-600">Cập nhật chẩn đoán: Viêm xoang cấp.</p>
                    </div>
                    <div className="relative pl-6">
                      <span className="absolute left-0 top-1.5 w-2 h-2 bg-green-500 rounded-full"></span>
                      <p className="text-xs text-gray-500 font-bold mb-0.5">09:10 - 15/08/2026</p>
                      <p className="text-sm font-bold text-green-700">BS. Nguyễn Văn Bình</p>
                      <p className="text-xs text-gray-600">Khởi tạo bệnh án mới.</p>
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