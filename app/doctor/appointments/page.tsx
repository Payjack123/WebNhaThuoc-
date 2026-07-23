'use client';
import { Star } from "lucide-react";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // <-- Import useRouter
import { 
  LayoutDashboard, CalendarDays, Users, FileText, Pill, TestTube, 
  Bot, BarChart3, Bell, User, Settings, LogOut, Search, Plus, 
  CheckCircle2, Clock, AlertTriangle, ArrowRight, Activity, 
  Printer, Mic, ChevronRight, FileSpreadsheet, Stethoscope, Save,
  Megaphone, ChevronLeft, Filter, QrCode, PlayCircle, XCircle, 
  Calendar as CalendarIcon, MapPin
} from 'lucide-react';

export default function DoctorAppointmentsPage() {
  const router = useRouter(); // <-- Khởi tạo router
  const [selectedAppt, setSelectedAppt] = useState<number | null>(1); // ID cuộc hẹn đang chọn

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    // Thêm logic xóa token/session ở đây nếu có
    // localStorage.removeItem('token');
    
    // Chuyển hướng về trang đăng nhập
    router.push('/login');
  };

  // Mock dữ liệu cuộc hẹn
  const appointments = [
    { id: 1, patient: 'Nguyễn Văn A', time: '08:00 - 08:30', status: 'checked-in', type: 'Khám lần đầu', color: 'bg-green-100 border-green-300 text-green-800' },
    { id: 2, patient: 'Lê Văn B', time: '09:00 - 09:30', status: 'waiting', type: 'Tái khám', color: 'bg-yellow-100 border-yellow-300 text-yellow-800' },
    { id: 3, patient: 'Trần Văn C', time: '10:30 - 11:00', status: 'confirmed', type: 'Đau đầu', color: 'bg-blue-100 border-blue-300 text-blue-800' },
    { id: 4, patient: 'Phạm Thị D', time: '14:00 - 14:30', status: 'canceled', type: 'Khám tổng quát', color: 'bg-red-100 border-red-300 text-red-800' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans text-gray-800 overflow-hidden">
      
      {/* ==========================================
          1. SIDEBAR (Đồng bộ chuẩn với Dashboard)
      ========================================== */}
      <aside className="w-64 bg-[#172554] text-gray-300 flex flex-col h-screen sticky top-0 shrink-0">
        <div className="h-20 flex items-center justify-center border-b border-blue-900/50">
          <div className="flex items-center gap-2 text-white">
            <Activity className="text-orange-500" size={28}/>
            <span className="font-bold text-xl tracking-tight">HEALTHCARE AI</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-1 px-3">
          <Link href="/doctor/dashboard" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-900/50 hover:text-white rounded-xl transition">
            <LayoutDashboard size={20}/> Dashboard
          </Link>
          <Link href="/doctor/appointments" className="flex items-center gap-3 px-4 py-3 bg-[#2563EB] text-white rounded-xl font-medium shadow-md">
            <CalendarDays size={20}/> Lịch khám
          </Link>
          <Link href="/doctor/patients" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-900/50 hover:text-white rounded-xl transition">
            <Users size={20}/> Bệnh nhân
          </Link>
          <Link href="/doctor/records" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-900/50 hover:text-white rounded-xl transition">
            <FileText size={20}/> Hồ sơ bệnh án
          </Link>
          <Link href="/doctor/prescriptions" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-900/50 hover:text-white rounded-xl transition">
            <Pill size={20}/> Đơn thuốc
          </Link>
          <Link href="/doctor/lab-tests" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-900/50 hover:text-white rounded-xl transition">
            <TestTube size={20}/> Xét nghiệm
          </Link>         
          <Link href="/doctor/reports" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-900/50 hover:text-white rounded-xl transition">
            <BarChart3 size={20}/> Báo cáo
          </Link>
        </div>

        <div className="p-4 border-t border-blue-900/50 space-y-1">
          <Link href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-blue-900/50 hover:text-white rounded-lg transition text-sm">
            <Bell size={18}/> Thông báo <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">3</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-blue-900/50 hover:text-white rounded-lg transition text-sm">
            <User size={18}/> Hồ sơ bác sĩ
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-blue-900/50 hover:text-white rounded-lg transition text-sm">
            <Settings size={18}/> Cài đặt
          </Link>

          {/* Nút Đăng xuất được thêm sự kiện onClick */}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition text-sm mt-2"
          >
            <LogOut size={18}/> Đăng xuất
          </button>

          <p className="text-[10px] text-blue-400/50 text-center pt-4">Phát triển bởi Phạm Đức Mạnh</p>
        </div>
      </aside>

      {/* ==========================================
          2. MAIN CONTENT AREA
      ========================================== */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* TOP HEADER (Đồng bộ chuẩn với Dashboard) */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <CalendarIcon className="text-[#2563EB]" size={28}/> Quản lý Lịch khám
            </h1>
            <p className="text-sm text-gray-500">Sắp xếp và theo dõi các cuộc hẹn hôm nay</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <input type="text" placeholder="Tìm kiếm bệnh nhân..." className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-[#2563EB] w-64"/>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16}/>
            </div>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-gray-900">BS. Nguyễn Văn Bình</p>
                <div className="flex text-yellow-400 text-xs justify-end">
                  <Star fill="currentColor" size={12}/><Star fill="currentColor" size={12}/><Star fill="currentColor" size={12}/><Star fill="currentColor" size={12}/><Star fill="currentColor" size={12}/>
                </div>
              </div>
              <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop" alt="Doctor" className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"/>
            </div>
          </div>
        </header>

        {/* 3. THỐNG KÊ (Stats Row) */}
        <div className="grid grid-cols-4 gap-6 px-8 pt-8 pb-4 shrink-0 bg-gray-50">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Lịch hôm nay</p>
              <p className="text-2xl font-black text-gray-900">15</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-[#2563EB] rounded-2xl flex items-center justify-center"><CalendarDays size={24}/></div>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Đã hoàn thành</p>
              <p className="text-2xl font-black text-green-600">8</p>
            </div>
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center"><CheckCircle2 size={24}/></div>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Đang chờ khám</p>
              <p className="text-2xl font-black text-yellow-600">5</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center"><Clock size={24}/></div>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Đã hủy</p>
              <p className="text-2xl font-black text-red-600">2</p>
            </div>
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center"><XCircle size={24}/></div>
          </div>
        </div>

        {/* 4. LAYOUT 3 CỘT (Cốt lõi của trang) */}
        <div className="flex-1 flex overflow-hidden px-8 pb-8 gap-6">
          
          {/* ==========================================
              CỘT TRÁI (20%): BỘ LỌC & LỊCH NHỎ
          ========================================== */}
          <div className="w-64 shrink-0 flex flex-col gap-6 overflow-y-auto scrollbar-hide">
            <button className="w-full bg-[#2563EB] text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-md">
              <Plus size={18}/> Đặt lịch mới
            </button>

            {/* Mini Calendar */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm">Tháng 08, 2026</h3>
                <div className="flex gap-1">
                  <ChevronLeft size={16} className="text-gray-400 cursor-pointer"/>
                  <ChevronRight size={16} className="text-gray-600 cursor-pointer"/>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2 text-gray-400 font-medium">
                <div>T2</div><div>T3</div><div>T4</div><div>T5</div><div>T6</div><div>T7</div><div>CN</div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-700">
                <div className="p-1 text-gray-300">27</div><div className="p-1 text-gray-300">28</div><div className="p-1 text-gray-300">29</div><div className="p-1 text-gray-300">30</div><div className="p-1 text-gray-300">31</div>
                <div className="p-1 hover:bg-gray-100 rounded cursor-pointer">1</div>
                <div className="p-1 hover:bg-gray-100 rounded cursor-pointer">2</div>
                {/* ... skip some days ... */}
                <div className="p-1 hover:bg-gray-100 rounded cursor-pointer">13</div>
                <div className="p-1 hover:bg-gray-100 rounded cursor-pointer">14</div>
                <div className="p-1 bg-[#2563EB] text-white rounded shadow-sm cursor-pointer">15</div>
                <div className="p-1 hover:bg-gray-100 rounded cursor-pointer relative">16<span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full"></span></div>
              </div>
            </div>

            {/* Bộ lọc */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2"><Filter size={16}/> Bộ lọc hiển thị</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-[#2563EB] rounded"/>
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span> Đã xác nhận
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-green-500 rounded"/>
                  <span className="w-3 h-3 rounded-full bg-green-500"></span> Check-in / Khám
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-yellow-500 rounded"/>
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span> Chờ khám
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-red-500 rounded"/>
                  <span className="w-3 h-3 rounded-full bg-red-500"></span> Đã hủy
                </label>
              </div>
            </div>
          </div>

          {/* ==========================================
              CỘT GIỮA (55%): GOOGLE CALENDAR VIEW
          ========================================== */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
            {/* Header Calendar */}
            <div className="h-14 border-b border-gray-100 flex items-center justify-between px-4">
              <div className="flex items-center gap-4">
                <h2 className="font-bold text-lg">15 Tháng 08, 2026</h2>
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button className="px-3 py-1 text-sm font-medium bg-white shadow-sm rounded-md">Ngày</button>
                  <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-gray-700">Tuần</button>
                </div>
              </div>
            </div>

            {/* Time Grid (Mô phỏng FullCalendar kéo thả) */}
            <div className="flex-1 overflow-y-auto relative bg-[url('https://transparenttextures.com/patterns/grid-me.png')]">
              <div className="relative h-[800px] flex">
                {/* Trục giờ */}
                <div className="w-16 shrink-0 border-r border-gray-100 bg-white">
                  {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'].map((time) => (
                    <div key={time} className="h-24 relative">
                      <span className="absolute -top-2.5 right-2 text-xs text-gray-400 font-medium">{time}</span>
                    </div>
                  ))}
                </div>
                
                {/* Grid Cuộc hẹn */}
                <div className="flex-1 relative w-full">
                  {/* Đường kẻ ngang */}
                  {['08', '09', '10', '11', '12', '13', '14', '15'].map((_, i) => (
                    <div key={i} className="h-24 border-b border-gray-100 w-full"></div>
                  ))}

                  {/* Thanh thời gian hiện tại */}
                  <div className="absolute top-[35px] left-0 w-full flex items-center z-20 pointer-events-none">
                    <div className="w-2 h-2 bg-red-500 rounded-full -ml-1"></div>
                    <div className="h-[2px] bg-red-500 w-full opacity-50"></div>
                  </div>

                  {/* Block Cuộc hẹn 1 */}
                  <div 
                    onClick={() => setSelectedAppt(1)}
                    className="absolute top-[0px] left-4 right-4 h-12 bg-green-100 border-l-4 border-green-500 rounded-r-lg p-2 cursor-pointer shadow-sm hover:shadow-md transition group z-10"
                  >
                    <p className="text-xs font-bold text-green-800">08:00 - Nguyễn Văn A</p>
                    <p className="text-[10px] text-green-700">Khám lần đầu • Đã Check-in</p>
                  </div>

                  {/* Block Cuộc hẹn 2 */}
                  <div 
                    onClick={() => setSelectedAppt(2)}
                    className="absolute top-[96px] left-4 right-4 h-12 bg-yellow-100 border-l-4 border-yellow-500 rounded-r-lg p-2 cursor-pointer shadow-sm hover:shadow-md transition group z-10"
                  >
                    <p className="text-xs font-bold text-yellow-800">09:00 - Lê Văn B</p>
                    <p className="text-[10px] text-yellow-700">Tái khám • Chờ khám</p>
                  </div>

                  {/* Block Cuộc hẹn 3 */}
                  <div 
                    onClick={() => setSelectedAppt(3)}
                    className="absolute top-[240px] left-4 right-4 h-12 bg-blue-100 border-l-4 border-blue-500 rounded-r-lg p-2 cursor-pointer shadow-sm hover:shadow-md transition group z-10"
                  >
                    <p className="text-xs font-bold text-blue-800">10:30 - Trần Văn C</p>
                    <p className="text-[10px] text-blue-700">Đau đầu • Sắp tới</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ==========================================
              CỘT PHẢI (25%): CHI TIẾT & TIMELINE
          ========================================== */}
          <div className="w-80 shrink-0 flex flex-col gap-6 overflow-y-auto scrollbar-hide">
            
            {/* Thẻ Chi tiết cuộc hẹn đang chọn */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden relative">
              <div className="bg-[#2563EB] h-20 relative">
                <button className="absolute top-2 right-2 text-white/70 hover:text-white"><Settings size={18}/></button>
              </div>
              <div className="px-6 pb-6 relative">
                <img src="https://ui-avatars.com/api/?name=Nguyen+Van+A&background=random" alt="Avatar" className="w-16 h-16 rounded-xl border-4 border-white absolute -top-8 bg-white shadow-sm"/>
                
                <div className="pt-10">
                  <h2 className="text-xl font-bold text-gray-900 leading-tight">Nguyễn Văn A</h2>
                  <p className="text-sm text-gray-500 mb-4">Nam • 24 tuổi • <span className="font-medium text-[#2563EB]">Mã: BN-1002</span></p>

                  {/* Nút hành động nhanh */}
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2 mb-4 shadow-sm shadow-green-500/30">
                    <PlayCircle size={20}/> Bắt đầu khám
                  </button>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <button className="border border-gray-200 text-gray-700 py-2 rounded-lg text-xs font-bold hover:bg-gray-50 transition">Xem bệnh án</button>
                    <button className="border border-red-200 text-red-600 bg-red-50 py-2 rounded-lg text-xs font-bold hover:bg-red-100 transition">Hủy lịch</button>
                  </div>

                  {/* Thông tin đặt lịch */}
                  <div className="space-y-3 text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="flex justify-between">
                      <span className="text-gray-500 flex items-center gap-1"><Clock size={14}/> Giờ khám</span>
                      <span className="font-bold text-gray-900">08:00 - 08:30</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 flex items-center gap-1"><Stethoscope size={14}/> Lý do</span>
                      <span className="font-bold text-gray-900">Ho sốt</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 flex items-center gap-1"><MapPin size={14}/> Phòng</span>
                      <span className="font-bold text-gray-900">P. Khám 02</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Check-in Timeline */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex-1">
              <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4"><Activity size={18} className="text-[#2563EB]"/> Timeline tiến trình</h3>
              
              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
                  <span>Tiến độ</span>
                  <span className="text-green-600">80%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '80%'}}></div>
                </div>
              </div>

              {/* Vertical Timeline */}
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-green-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <CheckCircle2 size={12}/>
                  </div>
                  <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] pl-3 md:pl-0 flex flex-col">
                    <span className="text-xs font-bold text-gray-900">Đặt lịch</span>
                    <span className="text-[10px] text-gray-500">Hôm qua, 14:00</span>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-green-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <QrCode size={12}/>
                  </div>
                  <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] pl-3 md:pl-0 flex flex-col">
                    <span className="text-xs font-bold text-gray-900">QR Check-in</span>
                    <span className="text-[10px] text-green-600 font-medium">07:45 Hôm nay</span>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-yellow-400 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 animate-pulse">
                    <Clock size={12}/>
                  </div>
                  <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] pl-3 md:pl-0 flex flex-col">
                    <span className="text-xs font-bold text-yellow-600">Đang chờ khám</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}