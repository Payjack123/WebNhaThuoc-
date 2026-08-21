'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Users, CalendarDays, FileText, Pill, TestTube, 
  Settings, LogOut, Search, Activity, User, Building2, 
  ShieldCheck, History, Wallet, CheckCircle2, Lock, KeyRound,
  UserPlus, Eye, Edit, Shield, Check, X, Unlock, RefreshCw
} from 'lucide-react';

export default function AdminAccountManagementPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('accounts');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const handleLogout = () => {
    // localStorage.removeItem('token');
    router.push('/login');
  };

  // 1. Mock Data: Tài khoản Users
  const users = [
    { id: 'U001', name: 'Nguyễn Văn A', email: 'admin@clinic.com', role: 'Admin', roleColor: 'bg-red-100 text-red-700 border-red-200', status: 'Hoạt động' },
    { id: 'U002', name: 'BS. Trần Minh Bình', email: 'bs.binhtm@clinic.com', role: 'Bác sĩ', roleColor: 'bg-blue-100 text-blue-700 border-blue-200', status: 'Hoạt động' },
    { id: 'U003', name: 'Lê Văn Cường', email: 'cuonglv@gmail.com', role: 'Bệnh nhân', roleColor: 'bg-green-100 text-green-700 border-green-200', status: 'Hoạt động' },
    { id: 'U004', name: 'BS. Nguyễn Thị Lan', email: 'bs.lannt@clinic.com', role: 'Bác sĩ', roleColor: 'bg-blue-100 text-blue-700 border-blue-200', status: 'Hoạt động' },
    { id: 'U005', name: 'Phạm Thị D', email: 'phamthid@gmail.com', role: 'Bệnh nhân', roleColor: 'bg-green-100 text-green-700 border-green-200', status: 'Đã khóa' },
  ];

  // 2. Mock Data: Permission Matrix (Cố định 3 vai trò)
  const modules = [
    { name: 'Dashboard', admin: 'full', doctor: 'full', patient: 'full' },
    { name: 'Quản lý Bác sĩ', admin: 'full', doctor: 'none', patient: 'none' },
    { name: 'Quản lý Bệnh nhân', admin: 'full', doctor: 'view', patient: 'own' },
    { name: 'Quản lý Lịch khám', admin: 'full', doctor: 'full', patient: 'full' },
    { name: 'Hồ sơ bệnh án', admin: 'full', doctor: 'full', patient: 'own' },
    { name: 'Đơn thuốc', admin: 'full', doctor: 'full', patient: 'own' },
    { name: 'Xét nghiệm', admin: 'full', doctor: 'full', patient: 'own' },
    { name: 'Báo cáo', admin: 'full', doctor: 'none', patient: 'none' },
    { name: 'Quản lý Tài khoản (RBAC)', admin: 'full', doctor: 'none', patient: 'none' },
    { name: 'Cài đặt hệ thống', admin: 'full', doctor: 'none', patient: 'own_profile' },
  ];

  const renderPermissionIcon = (access: string) => {
    if (access === 'full') return <span className="inline-flex items-center gap-1.5 text-green-600 font-bold"><Check size={16}/> Có</span>;
    if (access === 'view') return <span className="inline-flex items-center gap-1.5 text-blue-600 font-bold"><Eye size={16}/> Chỉ xem</span>;
    if (access === 'own') return <span className="inline-flex items-center gap-1.5 text-blue-600 font-bold"><Eye size={16}/> Chỉ của mình</span>;
    if (access === 'own_profile') return <span className="inline-flex items-center gap-1.5 text-gray-600 font-bold"><Settings size={14}/> Hồ sơ cá nhân</span>;
    return <span className="inline-flex items-center gap-1.5 text-gray-400 font-bold"><X size={16}/> Không</span>;
  };

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans text-gray-800 overflow-hidden">
      
      {/* ==========================================
          1. SIDEBAR (Chuẩn thiết kế Dashboard)
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
            
          </div>

          <div className="space-y-1">
            <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">3. Hệ thống</p>
            {/* Active Menu */}
            <Link href="/admin/users" className="flex items-center gap-3 px-4 py-2.5 bg-[#2563EB] text-white rounded-xl font-medium shadow-md transition-all text-sm">
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
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all text-sm font-bold">
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
            <div className="bg-blue-50 p-2 rounded-lg"><ShieldCheck className="text-[#2563EB]" size={24}/></div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Quản lý Tài khoản & Phân quyền</h1>
              <p className="text-xs text-gray-500 font-medium">Hệ thống phân quyền cố định (Admin, Bác sĩ, Bệnh nhân)</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsAddUserModalOpen(true)}
              className="bg-[#2563EB] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md transition-all flex items-center gap-2 text-sm"
            >
              <UserPlus size={18}/> Cấp tài khoản mới
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
              { label: 'Admin', value: '1', icon: Shield, color: 'text-red-600', bg: 'bg-red-50' },
              { label: 'Bác sĩ', value: '15', icon: User, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Bệnh nhân', value: '2,540', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Quyền hệ thống', value: '35', icon: KeyRound, color: 'text-purple-600', bg: 'bg-purple-50' },
              { label: 'Đang hoạt động', value: '2,556', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Nhật ký log', value: '120', icon: History, color: 'text-orange-600', bg: 'bg-orange-50' },
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

          {/* TABS & CONTENT AREA */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-[500px]">
            
            {/* TABS NAVIGATION */}
            <div className="flex px-4 border-b border-gray-100 bg-gray-50 shrink-0">
              {[
                { id: 'accounts', label: 'Quản lý Tài khoản', icon: Users },
                { id: 'matrix', label: 'Ma trận Phân quyền', icon: ShieldCheck },
                { id: 'logs', label: 'Nhật ký Hoạt động', icon: History }
              ].map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-5 font-bold text-sm border-b-2 transition-all ${activeTab === tab.id ? 'border-[#2563EB] text-[#2563EB] bg-white' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  <tab.icon size={18}/> {tab.label}
                </button>
              ))}
            </div>

            {/* TAB CONTENT */}
            <div className="flex-1 overflow-y-auto bg-white p-6 custom-scrollbar">
              
              {/* TAB 1: DANH SÁCH TÀI KHOẢN */}
              {activeTab === 'accounts' && (
                <div className="animate-in fade-in">
                  <div className="flex justify-between items-center mb-6">
                    <div className="relative w-72">
                      <input type="text" placeholder="Tìm tên, email..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition-all"/>
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16}/>
                    </div>
                    <select className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none">
                      <option>Vai trò (Tất cả)</option>
                      <option>Admin</option>
                      <option>Bác sĩ</option>
                      <option>Bệnh nhân</option>
                    </select>
                  </div>

                  <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold">
                        <tr>
                          <th className="px-5 py-4">Tài khoản</th>
                          <th className="px-5 py-4">Email</th>
                          <th className="px-5 py-4">Vai trò</th>
                          <th className="px-5 py-4">Trạng thái</th>
                          <th className="px-5 py-4 text-center">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {users.map(u => (
                          <tr key={u.id} className="hover:bg-gray-50 transition">
                            <td className="px-5 py-3 font-bold text-gray-900 flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 border border-gray-300 shadow-sm">{u.name.charAt(0)}</div>
                              {u.name}
                            </td>
                            <td className="px-5 py-3 text-gray-600">{u.email}</td>
                            <td className="px-5 py-3">
                              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${u.roleColor}`}>
                                {u.role === 'Admin' ? '👨‍💼 Admin' : u.role === 'Bác sĩ' ? '👨‍⚕️ Bác sĩ' : '👤 Bệnh nhân'}
                              </span>
                            </td>
                            <td className="px-5 py-3">
                              {u.status === 'Hoạt động' 
                                ? <span className="text-green-600 font-bold flex items-center gap-1.5"><CheckCircle2 size={14}/> Hoạt động</span>
                                : <span className="text-red-500 font-bold flex items-center gap-1.5"><Lock size={14}/> Đã khóa</span>
                              }
                            </td>
                            <td className="px-5 py-3 text-center">
                              <div className="flex justify-center gap-2">
                                <button className="p-1.5 text-gray-400 hover:text-[#2563EB] hover:bg-blue-50 rounded transition" title="Chỉnh sửa vai trò"><Edit size={16}/></button>
                                <button className="p-1.5 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded transition" title="Đặt lại mật khẩu"><RefreshCw size={16}/></button>
                                <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition" title={u.status === 'Đã khóa' ? 'Mở khóa' : 'Khóa tài khoản'}>
                                  {u.status === 'Đã khóa' ? <Unlock size={16}/> : <Lock size={16}/>}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 2: MA TRẬN PHÂN QUYỀN (Read-Only) */}
              {activeTab === 'matrix' && (
                <div className="animate-in fade-in">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Chi tiết Quyền (Cố định)</h3>
                    <p className="text-sm text-gray-500">Hệ thống sử dụng 3 vai trò cố định. Quản trị viên chỉ có thể gán người dùng vào các vai trò này, không được sửa đổi quyền cốt lõi để đảm bảo an toàn.</p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 font-bold">
                        <tr>
                          <th className="px-5 py-4 border-r border-gray-200 bg-gray-100 w-64 sticky left-0 z-10">Chức năng</th>
                          <th className="px-5 py-4 text-center border-r border-gray-100"><span className="px-3 py-1 rounded bg-red-100 text-red-700 border border-red-200">👨‍💼 Admin</span></th>
                          <th className="px-5 py-4 text-center border-r border-gray-100"><span className="px-3 py-1 rounded bg-blue-100 text-blue-700 border border-blue-200">👨‍⚕️ Bác sĩ</span></th>
                          <th className="px-5 py-4 text-center"><span className="px-3 py-1 rounded bg-green-100 text-green-700 border border-green-200">👤 Bệnh nhân</span></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {modules.map((mod, idx) => (
                          <tr key={idx} className="hover:bg-gray-50 transition-colors">
                            <td className="px-5 py-3.5 font-bold text-gray-900 border-r border-gray-100 bg-white sticky left-0 z-10 shadow-[1px_0_0_0_#f3f4f6]">
                              {mod.name}
                            </td>
                            <td className="px-5 py-3.5 text-center border-r border-gray-100">{renderPermissionIcon(mod.admin)}</td>
                            <td className="px-5 py-3.5 text-center border-r border-gray-100">{renderPermissionIcon(mod.doctor)}</td>
                            <td className="px-5 py-3.5 text-center">{renderPermissionIcon(mod.patient)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: NHẬT KÝ THAY ĐỔI */}
              {activeTab === 'logs' && (
                <div className="max-w-3xl animate-in fade-in">
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px before:h-full before:w-0.5 before:bg-gray-200">
                    
                    <div className="relative pl-10">
                      <span className="absolute left-0 top-1 w-8 h-8 bg-blue-100 text-[#2563EB] rounded-full flex items-center justify-center -translate-x-1.5 border-2 border-white shadow-sm"><UserPlus size={14}/></span>
                      <p className="text-xs text-gray-500 font-bold mb-1">09:10 - Hôm nay</p>
                      <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
                        <p className="text-sm"><span className="font-bold text-gray-900">Admin</span> đã cấp tài khoản mới.</p>
                        <p className="text-xs text-gray-500 mt-1">Email: bs.nguyenvana@clinic.com - Vai trò: <span className="font-bold text-blue-600">Bác sĩ</span></p>
                      </div>
                    </div>

                    <div className="relative pl-10">
                      <span className="absolute left-0 top-1 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center -translate-x-1.5 border-2 border-white shadow-sm"><RefreshCw size={14}/></span>
                      <p className="text-xs text-gray-500 font-bold mb-1">10:20 - Hôm nay</p>
                      <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
                        <p className="text-sm"><span className="font-bold text-gray-900">Admin</span> đã đặt lại mật khẩu.</p>
                        <p className="text-xs text-gray-500 mt-1">Tài khoản: nguyenvana@gmail.com</p>
                      </div>
                    </div>

                    <div className="relative pl-10">
                      <span className="absolute left-0 top-1 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center -translate-x-1.5 border-2 border-white shadow-sm"><Lock size={14}/></span>
                      <p className="text-xs text-gray-500 font-bold mb-1">11:00 - Hôm nay</p>
                      <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
                        <p className="text-sm"><span className="font-bold text-gray-900">Admin</span> đã khóa tài khoản.</p>
                        <p className="text-xs text-red-500 mt-1">Tài khoản: phamthid@gmail.com (Bệnh nhân)</p>
                      </div>
                    </div>

                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>

      {/* ==========================================
          MODAL: CẤP TÀI KHOẢN MỚI
      ========================================== */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><UserPlus size={20} className="text-[#2563EB]"/> Cấp Tài khoản mới</h2>
              <button onClick={() => setIsAddUserModalOpen(false)} className="text-gray-400 hover:text-gray-700 transition"><X size={24}/></button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Họ và tên <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors" placeholder="VD: Nguyễn Văn A"/>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email (Tên đăng nhập) <span className="text-red-500">*</span></label>
                  <input type="email" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors" placeholder="email@clinic.com"/>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Mật khẩu khởi tạo <span className="text-red-500">*</span></label>
                  <input type="password" value="Clinic@123" readOnly className="w-full p-2.5 border border-gray-200 rounded-xl outline-none text-sm bg-gray-100 text-gray-500 font-mono"/>
                  <p className="text-[10px] text-gray-400 mt-1">Mật khẩu mặc định tự động tạo.</p>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Vai trò (Role) <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-3 gap-3">
                    <label className="border border-gray-200 rounded-xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-red-400 hover:bg-red-50 transition group">
                      <input type="radio" name="role" value="admin" className="hidden"/>
                      <span className="text-red-600 bg-red-100 p-2 rounded-full"><Shield size={20}/></span>
                      <span className="text-sm font-bold text-gray-700 group-hover:text-red-700">Admin</span>
                    </label>
                    <label className="border-2 border-blue-400 bg-blue-50 rounded-xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition group">
                      <input type="radio" name="role" value="doctor" defaultChecked className="hidden"/>
                      <span className="text-blue-600 bg-blue-100 p-2 rounded-full"><User size={20}/></span>
                      <span className="text-sm font-bold text-blue-700">Bác sĩ</span>
                    </label>
                    <label className="border border-gray-200 rounded-xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-green-400 hover:bg-green-50 transition group">
                      <input type="radio" name="role" value="patient" className="hidden"/>
                      <span className="text-green-600 bg-green-100 p-2 rounded-full"><Users size={20}/></span>
                      <span className="text-sm font-bold text-gray-700 group-hover:text-green-700">Bệnh nhân</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setIsAddUserModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 transition">Hủy</button>
              <button className="bg-[#2563EB] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md transition flex items-center gap-2">
                <CheckCircle2 size={18}/> Tạo Tài khoản
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}