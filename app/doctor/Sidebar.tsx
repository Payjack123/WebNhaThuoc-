'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Activity, LayoutDashboard, CalendarDays, Users, FileText, Pill,
  TestTube, BarChart3, Bell, User, Settings, LogOut, ChevronUp, ChevronDown, Edit
} from 'lucide-react';

export default function DoctorSidebar({ activePage }: { activePage: string }) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<string>(
    activePage.startsWith('prescriptions') ? 'prescriptions' : 
    activePage.startsWith('records') ? 'records' : ''
  );

  const handleLogout = () => router.push('/login');

  const getLinkClass = (pageName: string) => {
    return activePage === pageName
      ? "flex items-center gap-3 px-4 py-3 bg-[#2563EB] text-white rounded-xl font-medium shadow-md transition-all duration-200"
      : "flex items-center gap-3 px-4 py-3 hover:bg-blue-900/50 hover:text-white text-gray-300 rounded-xl transition-all duration-200";
  };

  const getSubLinkClass = (pageName: string) => {
    return activePage === pageName
      ? "text-sm px-3 py-2 text-[#2563EB] bg-white rounded-lg font-bold shadow-sm flex items-center gap-2"
      : "text-sm px-3 py-2 text-gray-400 hover:text-white rounded-lg transition-all duration-200 flex items-center gap-2";
  };

  return (
    <aside className="w-64 bg-[#172554] text-gray-300 flex flex-col h-screen sticky top-0 shrink-0 z-20">
      <div className="h-20 flex items-center justify-center border-b border-blue-900/50">
        <div className="flex items-center gap-2 text-white">
          <Activity className="text-orange-500" size={28} />
          <span className="font-bold text-xl tracking-tight">HEALTHCARE</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-1 px-3 custom-scrollbar">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">Menu chính</p>
        <Link href="/doctor/dashboard" className={getLinkClass('dashboard')}><LayoutDashboard size={20} /> Dashboard</Link>
        <Link href="/doctor/appointments" className={getLinkClass('appointments')}><CalendarDays size={20} /> Lịch khám</Link>
        <Link href="/doctor/my-appointments" className={getLinkClass('my-appointments')}><CalendarDays size={20} /> Lịch hẹn của tôi</Link>
        <Link href="/doctor/today-appointments" className={getLinkClass('today-appointments')}><CalendarDays size={20} /> Lịch hẹn hôm nay</Link>
        <Link href="/doctor/patients" className={getLinkClass('patients')}><Users size={20} /> Bệnh nhân</Link>
        <Link href="/doctor/records/detail" className={getLinkClass('records')}><FileText size={20} /> Bệnh án</Link>

        <div className="flex flex-col gap-1">
          <button
            onClick={() => setIsMenuOpen(isMenuOpen === 'prescriptions' ? '' : 'prescriptions')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all duration-200 ${activePage.startsWith('prescriptions') ? 'bg-[#2563EB]/20 text-white' : 'hover:bg-blue-900/50 hover:text-white text-gray-300'}`}
          >
            <div className="flex items-center gap-3"><Pill size={20} /> Đơn thuốc</div>
            {isMenuOpen === 'prescriptions' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {isMenuOpen === 'prescriptions' && (
            <div className="ml-8 flex flex-col gap-1 border-l-2 border-blue-900/50 pl-2 mt-1 animate-in fade-in slide-in-from-top-2 duration-200">
              <Link href="/doctor/prescriptions/create" className={getSubLinkClass('prescriptions-create')}><Edit size={16} /> Tạo đơn thuốc</Link>
              <Link href="/doctor/prescriptions" className={getSubLinkClass('prescriptions-list')}><LayoutDashboard size={16} /> Danh sách đơn thuốc</Link>
            </div>
          )}
        </div>


        <Link href="/doctor/reports" className={getLinkClass('reports')}><BarChart3 size={20} /> Báo cáo</Link>
      </div>

      <div className="p-4 border-t border-blue-900/50 space-y-1">
        <Link href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-blue-900/50 hover:text-white rounded-lg transition-all duration-200 text-sm"><Bell size={18} /> Thông báo</Link>
        <Link href="/doctor/profile" className={activePage === 'profile' ? "flex items-center gap-3 px-4 py-2 bg-blue-900/50 text-white rounded-lg transition-all duration-200 text-sm" : "flex items-center gap-3 px-4 py-2 hover:bg-blue-900/50 hover:text-white rounded-lg transition-all duration-200 text-sm"}><User size={18} /> Hồ sơ bác sĩ</Link>
        <Link href="/doctor/settings" className={activePage === 'settings' ? "flex items-center gap-3 px-4 py-2 bg-blue-900/50 text-white rounded-lg transition-all duration-200 text-sm" : "flex items-center gap-3 px-4 py-2 hover:bg-blue-900/50 hover:text-white rounded-lg transition-all duration-200 text-sm"}><Settings size={18} /> Cài đặt</Link>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition-all duration-200 text-sm mt-2"><LogOut size={18} /> Đăng xuất</button>
      </div>
    </aside>
  );
}
