'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard, CalendarDays, CalendarCheck, FileText, Pill, HeartPulse,
  Settings, LogOut, Activity, Wallet, ChevronDown, ChevronUp, History
} from 'lucide-react';

export default function PatientSidebar({ activePage }: { activePage: string }) {
  const router = useRouter();
  
  // Mặc định mở menu con nếu đang ở trong các trang thanh toán
  const isFinanceActive = activePage === 'billing' || activePage === 'invoices' || activePage === 'history' || activePage === 'insurance';
  const [isFinanceOpen, setIsFinanceOpen] = useState(isFinanceActive);

  const handleLogout = () => {
    router.push('/login');
  };

  const getMenuItemClass = (pageName: string) => {
    return activePage === pageName 
      ? "flex items-center gap-3 px-4 py-3 bg-[#2563EB] text-white rounded-2xl font-bold shadow-md shadow-blue-200 transition-all text-sm"
      : "flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] rounded-2xl transition-all text-sm font-semibold";
  };
  
  const getSubMenuItemClass = (pageName: string) => {
    return activePage === pageName
      ? "flex items-center gap-2 px-4 py-2 text-[#2563EB] bg-blue-50 rounded-xl transition-all text-sm font-bold ml-9"
      : "flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] rounded-xl transition-all text-sm font-medium ml-9";
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0 shrink-0 shadow-sm z-20">
      <div className="h-20 flex items-center justify-center border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Activity className="text-[#2563EB]" size={28} />
          <span className="font-black text-xl tracking-tight text-gray-900">HEALTH<span className="text-[#2563EB]">CARE</span></span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-4 custom-scrollbar">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">Menu chính</p>

        <Link href="/patient/dashboard" className={getMenuItemClass('dashboard')}>
          <LayoutDashboard size={18} /> Tổng quan
        </Link>
        <Link href="/patient/appointments" className={getMenuItemClass('appointments')}>
          <CalendarDays size={18} /> Đặt lịch khám
        </Link>
        <Link href="/patient/my-appointments" className={getMenuItemClass('my-appointments')}>
          <CalendarCheck size={18} /> Lịch hẹn của tôi
        </Link>
        <Link href="/patient/medical-history" className={getMenuItemClass('medical-history')}>
          <History size={18} /> Lịch sử khám
        </Link>
        <Link href="/patient/records" className={getMenuItemClass('records')}>
          <HeartPulse size={18} /> Hồ sơ sức khỏe
        </Link>
        <Link href="/patient/medical-record" className={getMenuItemClass('medical-record')}>
          <FileText size={18} /> Hồ sơ bệnh án
        </Link>
        <Link href="/patient/test-results" className={getMenuItemClass('test-results')}>
          <Activity size={18} /> Kết quả xét nghiệm
        </Link>
        <Link href="/patient/prescriptions" className={getMenuItemClass('prescriptions')}>
          <Pill size={18} /> Đơn thuốc của tôi
        </Link>

        {/* Menu Tài chính / Thanh toán (Collapsible) */}
        <div className="flex flex-col gap-1">
          <button 
            onClick={() => setIsFinanceOpen(!isFinanceOpen)}
            className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-all text-sm w-full ${
              isFinanceActive && !isFinanceOpen ? 'text-[#2563EB] font-bold bg-blue-50' : 'text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] font-semibold'
            }`}
          >
            <div className="flex items-center gap-3">
              <Wallet size={18} /> Tài chính
            </div>
            {isFinanceOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {/* Submenu */}
          {isFinanceOpen && (
            <div className="flex flex-col gap-1 mt-1">
              <Link href="/patient/payments/invoices" className={getSubMenuItemClass('invoices')}>
                Thanh toán viện phí
              </Link>
              <Link href="/patient/payments/history" className={getSubMenuItemClass('history')}>
                Danh sách hóa đơn
              </Link>
              <Link href="/patient/payments/insurance" className={getSubMenuItemClass('insurance')}>
                Bảo hiểm y tế
              </Link>
            </div>
          )}
        </div>

        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-6 mb-2 px-2">Tài khoản</p>
        <Link href="/patient/settings" className={getMenuItemClass('settings')}>
          <Settings size={18} /> Cài đặt cá nhân
        </Link>
      </div>

      <div className="p-4 border-t border-gray-100">
        <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-2xl transition-all text-sm font-bold">
          <LogOut size={18} /> Đăng xuất
        </button>
      </div>
    </aside>
  );
}
