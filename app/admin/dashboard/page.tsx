'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Users, CalendarDays, FileText, Pill, TestTube, 
  Bell, Settings, LogOut, Search, Activity, User, Building2, 
  ShieldCheck, History, Wallet, Server, HardDrive, Lock, 
  ArrowUpRight, Download, CheckCircle2, TrendingUp, Star, DollarSign, Printer, Bot
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [dateRange, setDateRange] = useState('Tháng này');

  const handleLogout = () => {
    // localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans text-gray-800 overflow-hidden">
      
      {/* ==========================================
          1. SIDEBAR
      ========================================== */}
      <aside className="w-64 bg-[#0F172A] text-gray-300 flex flex-col h-screen sticky top-0 shrink-0 shadow-xl">
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
            <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-2.5 bg-[#2563EB] text-white rounded-xl font-medium shadow-md transition-all text-sm">
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
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50">
        
        {/* TOP HEADER */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 p-2 rounded-lg"><LayoutDashboard className="text-[#2563EB]" size={24}/></div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Tổng quan & Báo cáo</h1>
              <p className="text-xs text-green-600 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Hệ thống đang hoạt động ổn định
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative group">
              <input type="text" placeholder="Tìm kiếm chức năng..." className="pl-10 pr-4 py-2 bg-gray-100 border border-transparent rounded-full text-sm focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 w-64 transition-all outline-none"/>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2563EB] transition-colors" size={16}/>
            </div>
            <div className="flex items-center gap-4 pl-6 border-l border-gray-200">
              <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
                <Bell size={20}/>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-bold text-gray-900">Quản trị viên</p>
                  <p className="text-xs text-gray-500">Super Admin</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#172554] text-white flex items-center justify-center font-bold border-2 border-white shadow-sm">
                  AD
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-8 animate-in fade-in duration-500">
          
          {/* CONTROL BAR (BỘ LỌC & EXPORT) */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-8 flex justify-between items-center">
            <div className="flex gap-4 w-1/2">
              <select 
                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option>Hôm nay</option>
                <option>Tuần này</option>
                <option>Tháng này</option>
                <option>Năm nay</option>
              </select>
              <select className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none">
                <option>Tất cả Bác sĩ</option>
                <option>BS. Nguyễn Văn Bình</option>
                <option>BS. Trần Thị An</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button className="bg-gray-100 border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-200 transition flex items-center gap-2 text-sm">
                <Printer size={18}/> In báo cáo
              </button>
              <button className="bg-[#2563EB] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md transition flex items-center gap-2 text-sm">
                <Download size={18}/> Xuất Excel
              </button>
            </div>
          </div>

          {/* 8 KPI CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Bệnh nhân', value: '2,580', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+12%' },
              { label: 'Lịch khám', value: '142', icon: CalendarDays, color: 'text-green-600', bg: 'bg-green-50', trend: '+5%' },
              { label: 'Doanh thu', value: '680 Tr', icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: '+18%' },
              { label: 'Bác sĩ', value: '35', icon: User, color: 'text-indigo-600', bg: 'bg-indigo-50', trend: 'Ổn định' },
              { label: 'Đơn thuốc', value: '5,200', icon: Pill, color: 'text-purple-600', bg: 'bg-purple-50', trend: '+8%' },
              { label: 'Xét nghiệm', value: '2,150', icon: TestTube, color: 'text-orange-600', bg: 'bg-orange-50', trend: '+2%' },
              { label: 'Khoa phòng', value: '8', icon: Building2, color: 'text-cyan-600', bg: 'bg-cyan-50', trend: 'Ổn định' },
              { label: 'AI Status', value: 'Online', icon: Bot, color: 'text-pink-600', bg: 'bg-pink-50', trend: '100% Uptime' },
            ].map((kpi, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className={`w-14 h-14 ${kpi.bg} ${kpi.color} rounded-2xl flex items-center justify-center shrink-0`}>
                  <kpi.icon size={28}/>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">{kpi.label}</p>
                  <p className="text-2xl font-black text-gray-900">{kpi.value}</p>
                  <p className={`text-xs font-bold mt-1 ${kpi.trend.includes('+') ? 'text-green-500' : 'text-gray-400'}`}>
                    {kpi.trend}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* GRID LAYOUT: MAIN CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            
            {/* Chart 1: Doanh thu */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><Wallet className="text-[#2563EB]" size={18}/> Biểu đồ Doanh thu (6 tháng)</h3>
              </div>
              <div className="h-56 flex items-end justify-between px-2 pb-2 border-b border-l border-gray-200 relative pt-4">
                <div className="absolute top-[20%] left-0 w-full border-t border-dashed border-gray-200"></div>
                <div className="absolute top-[50%] left-0 w-full border-t border-dashed border-gray-200"></div>
                <div className="absolute top-[80%] left-0 w-full border-t border-dashed border-gray-200"></div>

                {['T1', 'T2', 'T3', 'T4', 'T5', 'T6'].map((m, i) => {
                  const h = ['40%', '55%', '45%', '70%', '60%', '85%'][i];
                  return (
                    <div key={m} className="flex flex-col items-center gap-2 group w-12 z-10">
                      <div className="w-full bg-[#2563EB] rounded-t hover:bg-blue-400 transition-all cursor-pointer relative" style={{ height: h }}>
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity bg-white px-2 py-1 rounded shadow-sm border">{h}</span>
                      </div>
                      <span className="text-xs font-medium text-gray-500">{m}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Chart 2: Lượng Bệnh nhân */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><TrendingUp className="text-green-500" size={18}/> Bệnh nhân theo Tuần</h3>
              </div>
              <div className="h-56 flex items-end justify-between px-2 pb-2 border-b border-l border-gray-200 relative pt-4">
                <div className="absolute top-[20%] left-0 w-full border-t border-dashed border-gray-200"></div>
                <div className="absolute top-[50%] left-0 w-full border-t border-dashed border-gray-200"></div>
                <div className="absolute top-[80%] left-0 w-full border-t border-dashed border-gray-200"></div>

                {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((m, i) => {
                  const h = ['60%', '75%', '65%', '90%', '80%', '100%', '30%'][i];
                  return (
                    <div key={m} className="flex flex-col items-center gap-2 group w-8 z-10">
                      <div className="w-full bg-green-500 rounded-t hover:bg-green-400 transition-all cursor-pointer relative" style={{ height: h }}></div>
                      <span className="text-xs font-medium text-gray-500">{m}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* GRID LAYOUT: TABLES & LISTS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* 1. Tỷ trọng chuyên khoa */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2 mb-6"><Building2 size={20} className="text-purple-500"/> Tỷ trọng chuyên khoa</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-bold text-gray-700 mb-2"><span>Nội tổng quát</span><span>38%</span></div>
                  <div className="w-full bg-gray-100 rounded-full h-3"><div className="bg-[#2563EB] h-3 rounded-full" style={{width: '38%'}}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-bold text-gray-700 mb-2"><span>Tim mạch</span><span>24%</span></div>
                  <div className="w-full bg-gray-100 rounded-full h-3"><div className="bg-red-500 h-3 rounded-full" style={{width: '24%'}}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-bold text-gray-700 mb-2"><span>Nhi khoa</span><span>20%</span></div>
                  <div className="w-full bg-gray-100 rounded-full h-3"><div className="bg-yellow-500 h-3 rounded-full" style={{width: '20%'}}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-bold text-gray-700 mb-2"><span>Da liễu</span><span>18%</span></div>
                  <div className="w-full bg-gray-100 rounded-full h-3"><div className="bg-green-500 h-3 rounded-full" style={{width: '18%'}}></div></div>
                </div>
              </div>
            </div>

            {/* 2. TOP BÁC SĨ (Bảng) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><User size={18} className="text-indigo-600"/> Top Bác sĩ (Số ca khám)</h3>
              </div>
              <div className="flex-1 overflow-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white border-b border-gray-100 text-gray-500 font-bold">
                    <tr><th className="px-5 py-4">Bác sĩ</th><th className="px-5 py-4 text-center">Số ca khám</th></tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-indigo-50/50 transition"><td className="px-5 py-4 font-bold text-gray-900">BS. Nguyễn Văn Bình</td><td className="px-5 py-4 text-center font-bold text-[#2563EB]">245</td></tr>
                    <tr className="hover:bg-indigo-50/50 transition"><td className="px-5 py-4 font-bold text-gray-900">BS. Trần Hùng</td><td className="px-5 py-4 text-center font-bold text-[#2563EB]">220</td></tr>
                    <tr className="hover:bg-indigo-50/50 transition"><td className="px-5 py-4 font-bold text-gray-900">BS. Lê Nam</td><td className="px-5 py-4 text-center font-bold text-[#2563EB]">205</td></tr>
                    <tr className="hover:bg-indigo-50/50 transition"><td className="px-5 py-4 font-bold text-gray-900">BS. Trần Thị An</td><td className="px-5 py-4 text-center font-bold text-[#2563EB]">180</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3. TOP BỆNH & THUỐC (Bảng) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><Activity size={18} className="text-orange-600"/> Top Bệnh phổ biến</h3>
              </div>
              <div className="flex-1 overflow-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white border-b border-gray-100 text-gray-500 font-bold">
                    <tr><th className="px-5 py-4">Loại bệnh</th><th className="px-5 py-4 text-center">Tỷ lệ</th></tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-orange-50/50 transition"><td className="px-5 py-4 font-bold text-gray-900">Viêm họng cấp</td><td className="px-5 py-4 text-center font-bold text-orange-600">35%</td></tr>
                    <tr className="hover:bg-orange-50/50 transition"><td className="px-5 py-4 font-bold text-gray-900">Cảm cúm</td><td className="px-5 py-4 text-center font-bold text-orange-600">28%</td></tr>
                    <tr className="hover:bg-orange-50/50 transition"><td className="px-5 py-4 font-bold text-gray-900">Đau dạ dày</td><td className="px-5 py-4 text-center font-bold text-orange-600">17%</td></tr>
                    <tr className="hover:bg-orange-50/50 transition"><td className="px-5 py-4 font-bold text-gray-900">Dị ứng</td><td className="px-5 py-4 text-center font-bold text-orange-600">12%</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 4. SYSTEM MONITOR (Chiếm toàn bộ 3 cột phía dưới) */}
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-2">
              <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2 border-b pb-3">
                <Server size={18} className="text-gray-500"/> Giám sát máy chủ
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-gray-100 transition">
                  <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                    <Activity size={18} className="text-[#2563EB]"/> Trạng thái
                  </div>
                  <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Online
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-gray-100 transition">
                  <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                    <HardDrive size={18} className="text-purple-500"/> Lưu trữ (Storage)
                  </div>
                  <span className="text-sm font-bold text-yellow-600">72% (Còn 500GB)</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-gray-100 transition">
                  <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                    <Users size={18} className="text-orange-500"/> Đang truy cập
                  </div>
                  <span className="text-sm font-bold text-gray-900">45 Users</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-gray-100 transition">
                  <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                    <Lock size={18} className="text-green-500"/> Bảo mật
                  </div>
                  <span className="text-sm font-bold text-green-600">An toàn</span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}