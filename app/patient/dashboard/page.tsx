'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard, CalendarDays, FileText, Pill, TestTube, ChevronRight,
  Bell, Settings, LogOut, Search, Activity, User, Wallet,
  HeartPulse, ArrowRight, Clock, Stethoscope, Loader2
} from 'lucide-react';

import { getPatientDashboardData } from '@/app/patient/dashboard/actions';
import PatientSidebar from '@/app/patient/Sidebar';

export default function PatientDashboard() {
  const router = useRouter();

  // States quản lý dữ liệu
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPatientDashboardData();
      if (res.success) {
        setData(res.data);
      } else {
        // Nếu lỗi (chưa đăng nhập), đẩy về trang login
        router.push('/login');
      }
      setIsLoading(false);
    };
    fetchData();
  }, [router]);

  const handleLogout = () => {
    router.push('/login');
  };

  const parseDate = (dateString: string) => {
    if (!dateString) return { dayOfWeek: 'Ngày', day: '--', month: '--' };
    
    let dateObj: Date;
    if (dateString.includes('-')) {
       dateObj = new Date(dateString); // YYYY-MM-DD
    } else if (dateString.includes('/')) {
       const parts = dateString.split('/'); // DD/MM/YYYY
       dateObj = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    } else {
       return { dayOfWeek: 'Ngày', day: '--', month: '--' };
    }

    const days = ["CN", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
    const dayOfWeek = days[dateObj.getDay()] || 'Ngày';
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    
    return { dayOfWeek, day, month };
  };

  const getStatusStyle = (status: string) => {
    if (status === 'ĐÃ XÁC NHẬN') return 'bg-green-50 text-green-600 border-green-100';
    if (status === 'CHỜ XÁC NHẬN') return 'bg-yellow-50 text-yellow-600 border-yellow-100';
    if (status === 'HOÀN THÀNH') return 'bg-blue-50 text-blue-600 border-blue-100';
    return 'bg-gray-50 text-gray-600 border-gray-100';
  };

  // Màn hình chờ trong lúc fetch dữ liệu từ TiDB
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          <p className="font-medium text-gray-500">Đang tải dữ liệu y tế của bạn...</p>
        </div>
      </div>
    );
  }

  // Fallback nếu không có dữ liệu
  if (!data) return null;

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] font-sans text-gray-800 overflow-hidden">

      {/* ==========================================
          1. SIDEBAR
      ========================================== */}
      <PatientSidebar activePage="dashboard" />

      {/* ==========================================
          2. MAIN CONTENT AREA
      ========================================== */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">

        {/* TOP HEADER */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-10">
          <div className="relative w-96 hidden md:block">
            <input type="text" placeholder="Tìm kiếm bác sĩ, dịch vụ, thuốc..." className="w-full pl-11 pr-4 py-2.5 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition-all font-medium text-gray-700" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <div className="flex items-center gap-5 ml-auto">
            <button className="relative p-2.5 text-gray-500 hover:bg-blue-50 hover:text-[#2563EB] rounded-full transition bg-white border border-gray-200 shadow-sm">
              <Bell size={20} />
            </button>
            <div className="flex items-center gap-3 pl-5 border-l border-gray-200 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900 group-hover:text-[#2563EB] transition">{data.user.fullName}</p>
                <p className="text-xs text-gray-500 font-medium">Bệnh nhân ({data.user.patientCode})</p>
              </div>
              <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(data.user.fullName)}&background=2563EB&color=fff`} alt="Avatar" className="w-11 h-11 rounded-full border-2 border-white shadow-sm" />
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 animate-in fade-in duration-500">

          {/* LỜI CHÀO */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Xin chào, {data.user.fullName} 👋</h2>
            <p className="text-gray-500 text-sm">Chăm sóc sức khỏe của bạn là ưu tiên hàng đầu của chúng tôi.</p>
          </div>

          {/* DỊCH VỤ NHANH */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-4">Dịch vụ nhanh</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6">

              {/* Thẻ 1: Đặt lịch khám */}
              <Link href="/patient/appointments" className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 flex items-center justify-between hover:shadow-sm transition group">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-white text-[#2563EB] rounded-xl flex items-center justify-center shrink-0 shadow-sm"><CalendarDays size={20} /></div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-0.5">Đặt lịch khám</h4>
                    <p className="text-[11px] text-gray-500">Đặt lịch hẹn với bác sĩ</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-[#2563EB] group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Thẻ 2: Hồ sơ sức khỏe */}
              <Link href="/patient/records" className="bg-green-50/50 p-5 rounded-2xl border border-green-100 flex items-center justify-between hover:shadow-sm transition group">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-white text-green-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm"><FileText size={20} /></div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-0.5">Hồ sơ sức khỏe</h4>
                    <p className="text-[11px] text-gray-500">Xem thông tin sức khỏe</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-green-600 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Thẻ 3: Đơn thuốc của tôi */}
              <Link href="/patient/prescriptions" className="bg-purple-50/50 p-5 rounded-2xl border border-purple-100 flex items-center justify-between hover:shadow-sm transition group">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-white text-purple-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm"><Pill size={20} /></div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-0.5">Đơn thuốc của tôi</h4>
                    <p className="text-[11px] text-gray-500">Xem đơn thuốc của bạn</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-purple-600 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Thẻ 4: Thanh toán */}
              <Link href="/patient/billing" className="bg-amber-50/50 p-5 rounded-2xl border border-amber-100 flex items-center justify-between hover:shadow-sm transition group">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-white text-amber-500 rounded-xl flex items-center justify-center shrink-0 shadow-sm"><Wallet size={20} /></div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-0.5">Thanh toán</h4>
                    <p className="text-[11px] text-gray-500">Xem và thanh toán viện phí</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-amber-500 group-hover:translate-x-1 transition-transform" />
              </Link>

            </div>
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start mb-8">

            {/* CỘT TRÁI (1/2): LỊCH KHÁM SẮP TỚI */}
            <div className="flex flex-col h-full">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
                <div className="p-5 border-b border-gray-50 flex justify-between items-center">
                  <h3 className="font-bold text-gray-900">Lịch khám sắp tới</h3>
                  <Link href="/patient/appointments?tab=history" className="text-[#2563EB] text-xs font-bold hover:underline">Xem tất cả</Link>
                </div>
                <div className="p-5 flex-1 flex flex-col gap-4">

                  {data.appointments.length > 0 ? data.appointments.map((apt: any) => {
                    const parsedDate = parseDate(apt.bookingDate);
                    return (
                    <div key={apt.id} className="flex gap-4 items-center p-3 border border-gray-100 rounded-2xl hover:bg-gray-50 transition group cursor-pointer" onClick={() => router.push('/patient/appointments?tab=history')}>
                      <div className="bg-white border border-gray-100 rounded-xl w-16 h-16 flex flex-col items-center justify-center shrink-0 text-center shadow-sm">
                        <span className="text-[10px] text-gray-500 font-bold uppercase mb-0.5">{parsedDate.dayOfWeek}</span>
                        <span className="text-lg font-black text-[#2563EB] leading-none">{parsedDate.day}</span>
                        <span className="text-[9px] text-gray-400 mt-0.5">Tháng {parsedDate.month}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-gray-900 text-sm truncate pr-2">{apt.specialty}</h4>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold shrink-0 ${getStatusStyle(apt.status)}`}>{apt.status}</span>
                        </div>
                        <p className="text-xs text-gray-600 truncate mb-1">BS. {apt.doctor?.fullName}</p>
                        <p className="text-[10px] text-gray-500 flex items-center gap-1"><Clock size={10} /> {apt.bookingTime} • Phòng 101</p>
                      </div>
                    </div>
                  )}) : (
                    <div className="text-center text-gray-500 py-6 text-sm m-auto">Bạn chưa có lịch hẹn nào sắp tới.</div>
                  )}

                  {/* NÚT XEM THÊM */}
                  {data.appointments.length > 0 && (
                    <div className="mt-auto pt-2">
                      <Link href="/patient/appointments?tab=history" className="w-full py-3 bg-blue-50 text-[#2563EB] hover:bg-[#2563EB] hover:text-white rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2">
                        Xem thêm lịch khám <ArrowRight size={16} />
                      </Link>
                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* CỘT PHẢI (1/2): TỔNG QUAN & ĐƠN THUỐC */}
            <div className="flex flex-col gap-8">

              {/* TỔNG QUAN SỨC KHỎE */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                <div className="p-5 border-b border-gray-50 flex justify-between items-center">
                  <h3 className="font-bold text-gray-900">Tổng quan sức khỏe</h3>
                  <span className="text-xs text-gray-400">Cập nhật mới nhất: {new Date().toLocaleDateString('vi-VN')}</span>
                </div>
                <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4 flex-1 items-center">
                  <div className="border border-gray-100 rounded-2xl p-4 text-center">
                    <p className="text-xs text-gray-500 font-bold uppercase mb-2">Chiều cao</p>
                    <p className="text-xl font-black text-gray-900">{data.metric?.height || '--'} <span className="text-xs font-normal">cm</span></p>
                    <p className="text-[10px] text-green-500 font-bold mt-2">Bình thường</p>
                  </div>
                  <div className="border border-gray-100 rounded-2xl p-4 text-center">
                    <p className="text-xs text-gray-500 font-bold uppercase mb-2">Cân nặng</p>
                    <p className="text-xl font-black text-gray-900">{data.metric?.weight || '--'} <span className="text-xs font-normal">kg</span></p>
                    <p className="text-[10px] text-green-500 font-bold mt-2">Bình thường</p>
                  </div>
                  <div className="border border-gray-100 rounded-2xl p-4 text-center">
                    <p className="text-xs text-gray-500 font-bold uppercase mb-2">BMI</p>
                    <p className="text-xl font-black text-gray-900">{data.metric?.bmi || '--'}</p>
                    <p className="text-[10px] text-green-500 font-bold mt-2">Bình thường</p>
                  </div>

                  <div className="border border-gray-100 rounded-2xl p-4 text-center">
                    <p className="text-xs text-gray-500 font-bold uppercase mb-2">Nhiệt độ</p>
                    <p className="text-xl font-black text-gray-900">{data.metric?.temperature || '--'} <span className="text-xs font-normal">°C</span></p>
                    <p className="text-[10px] text-green-500 font-bold mt-2">Bình thường</p>
                  </div>
                </div>
              </div>

              {/* ĐƠN THUỐC GẦN ĐÂY */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                <div className="p-5 border-b border-gray-50 flex justify-between items-center">
                  <h3 className="font-bold text-gray-900">Đơn thuốc gần đây</h3>
                  <Link href="/patient/prescriptions" className="text-[#2563EB] text-xs font-bold hover:underline">Xem tất cả</Link>
                </div>
                <div className="p-4 flex-1">
                  {data.prescription?.items?.length > 0 ? (
                    <div className="space-y-3">
                      {data.prescription.items.map((item: any) => (
                        <div key={item.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-50 text-red-500 rounded-lg flex items-center justify-center"><Pill size={18} /></div>
                            <div>
                              <p className="font-bold text-gray-900 text-sm group-hover:text-[#2563EB] transition">{item.medicationName}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{new Date().toLocaleDateString('vi-VN')} • BS. Điều trị</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-orange-500">Đang sử dụng</span>
                            <ChevronRight size={16} className="text-gray-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8 text-sm">Bạn không có đơn thuốc nào gần đây.</div>
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}