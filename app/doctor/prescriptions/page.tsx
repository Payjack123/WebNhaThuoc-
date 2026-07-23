'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // <-- Import useRouter
import { 
  Pill, Users, Search, Filter, Plus, Printer, QrCode, Calendar, 
  Clock, CheckCircle2, AlertTriangle, Edit, Trash2, LayoutDashboard, 
  CalendarDays, FileText, TestTube, BarChart3, Bell, LogOut, 
  Activity, FileDown, ShieldAlert, Star, User, Settings
} from 'lucide-react';

export default function PrescriptionPage() {
  const router = useRouter(); // <-- Khởi tạo router
  const [selectedPrescription, setSelectedPrescription] = useState(1);

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    // Có thể thêm code xóa token/session ở đây nếu có
    // localStorage.removeItem('token');
    
    // Chuyển hướng về trang đăng nhập
    router.push('/login');
  };

  // Mock dữ liệu Danh sách đơn thuốc
  const prescriptions = [
    { id: 1, code: 'DT-2608-001', patient: 'Nguyễn Văn A', age: 24, gender: 'Nam', doctor: 'BS. Nguyễn Văn Bình', date: '15/08/2026', drugCount: 3, status: 'Đã phát', statusColor: 'bg-green-100 text-green-700 border-green-200', diagnosis: 'Viêm họng cấp' },
    { id: 2, code: 'DT-2608-002', patient: 'Lê Văn B', age: 35, gender: 'Nam', doctor: 'BS. Trần Thị An', date: '15/08/2026', drugCount: 5, status: 'Chờ phát', statusColor: 'bg-yellow-100 text-yellow-700 border-yellow-200', diagnosis: 'Đau dạ dày' },
    { id: 3, code: 'DT-2608-003', patient: 'Trần Văn C', age: 51, gender: 'Nam', doctor: 'BS. Lê Hoàng', date: '14/08/2026', drugCount: 2, status: 'Đã xác nhận', statusColor: 'bg-blue-100 text-blue-700 border-blue-200', diagnosis: 'Cao huyết áp' },
    { id: 4, code: 'DT-2608-004', patient: 'Phạm Thị D', age: 28, gender: 'Nữ', doctor: 'BS. Nguyễn Văn Bình', date: '14/08/2026', drugCount: 4, status: 'Hủy', statusColor: 'bg-red-100 text-red-700 border-red-200', diagnosis: 'Viêm da cơ địa' },
  ];

  const activePre = prescriptions.find(p => p.id === selectedPrescription) || prescriptions[0];

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans text-gray-800 overflow-hidden">
      
      {/* ==========================================
          1. SIDEBAR (Đồng bộ chuẩn)
      ========================================== */}
      <aside className="w-64 bg-[#172554] text-gray-300 flex flex-col h-screen sticky top-0 shrink-0">
        <div className="h-20 flex items-center justify-center border-b border-blue-900/50">
          <div className="flex items-center gap-2 text-white">
            <Activity className="text-orange-500" size={28}/>
            <span className="font-bold text-xl tracking-tight">HEALTHCARE</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-1 px-3">
          <Link href="/doctor/dashboard" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-900/50 hover:text-white rounded-xl transition-all duration-200">
            <LayoutDashboard size={20}/> Dashboard
          </Link>
          <Link href="/doctor/appointments" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-900/50 hover:text-white rounded-xl transition-all duration-200">
            <CalendarDays size={20}/> Lịch khám
          </Link>
          <Link href="/doctor/patients" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-900/50 hover:text-white rounded-xl transition-all duration-200">
            <Users size={20}/> Bệnh nhân
          </Link>
          <Link href="/doctor/records" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-900/50 hover:text-white rounded-xl transition-all duration-200">
            <FileText size={20}/> Hồ sơ bệnh án
          </Link>
          {/* Active menu */}
          <Link href="/doctor/prescriptions" className="flex items-center gap-3 px-4 py-3 bg-[#2563EB] text-white rounded-xl font-medium shadow-md transition-all duration-200">
            <Pill size={20}/> Đơn thuốc
          </Link>
          <Link href="/doctor/lab-tests" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-900/50 hover:text-white rounded-xl transition-all duration-200">
            <TestTube size={20}/> Xét nghiệm
          </Link>
          <Link href="/doctor/reports" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-900/50 hover:text-white rounded-xl transition-all duration-200">
            <BarChart3 size={20}/> Báo cáo
          </Link>
        </div>

        <div className="p-4 border-t border-blue-900/50 space-y-1">
          <Link href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-blue-900/50 hover:text-white rounded-lg transition-all duration-200 text-sm">
            <Bell size={18}/> Thông báo 
            <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">3</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-blue-900/50 hover:text-white rounded-lg transition-all duration-200 text-sm">
            <User size={18}/> Hồ sơ bác sĩ
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-blue-900/50 hover:text-white rounded-lg transition-all duration-200 text-sm">
            <Settings size={18}/> Cài đặt
          </Link>

          {/* Nút Đăng xuất đã được gắn sự kiện onClick */}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition-all duration-200 text-sm mt-2"
          >
            <LogOut size={18}/> Đăng xuất
          </button>

          <p className="text-[10px] text-blue-400/50 text-center pt-4">Phát triển bởi Phạm Đức Mạnh</p>
        </div>
      </aside>

      {/* ==========================================
          2. MAIN CONTENT
      ========================================== */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* TOP HEADER */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">Quản lý Đơn thuốc</h1>
            <p className="text-sm text-gray-500">Tạo, chỉnh sửa và theo dõi đơn thuốc điện tử</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative group">
              <input type="text" placeholder="Tìm đơn thuốc..." className="pl-10 pr-4 py-2 bg-gray-100 border border-transparent rounded-full text-sm focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 w-64 transition-all duration-300 outline-none"/>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2563EB] transition-colors" size={16}/>
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

        {/* SCROLLABLE BODY (có hiệu ứng fade-in) */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* 3. THỐNG KÊ */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-50 text-[#2563EB] rounded-2xl flex items-center justify-center"><Pill size={24}/></div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Tổng đơn thuốc</p>
                <p className="text-2xl font-black text-gray-900">3,250</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center"><CheckCircle2 size={24}/></div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Đã phát thuốc</p>
                <p className="text-2xl font-black text-gray-900">120</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center"><Clock size={24}/></div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Chờ phát thuốc</p>
                <p className="text-2xl font-black text-gray-900">18</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center"><Calendar size={24}/></div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Đơn hôm nay</p>
                <p className="text-2xl font-black text-gray-900">35</p>
              </div>
            </div>
          </div>

          {/* 4. THANH TÌM KIẾM & BỘ LỌC */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-8 flex gap-4 justify-between items-center">
            <div className="flex-1 flex gap-4 w-full">
              <div className="relative w-1/3 group">
                <input type="text" placeholder="Tên bệnh nhân, Mã ĐT..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-300"/>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2563EB] transition-colors" size={18}/>
              </div>
              <select className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none hover:bg-white transition-colors cursor-pointer">
                <option>Trạng thái (Tất cả)</option>
                <option>Đã phát</option>
                <option>Chờ phát</option>
                <option>Đã xác nhận</option>
              </select>
              <select className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none hover:bg-white transition-colors cursor-pointer">
                <option>Ngày kê (Hôm nay)</option>
                <option>Tuần này</option>
                <option>Tháng này</option>
              </select>
              <button className="bg-gray-100 text-gray-600 px-5 py-2.5 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm font-bold">
                <Filter size={16}/> Lọc
              </button>
            </div>
            <div className="flex gap-2">
              <button className="bg-[#2563EB] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2">
                <Plus size={18}/> Tạo đơn thuốc
              </button>
            </div>
          </div>

          {/* 5. MASTER - DETAIL LAYOUT */}
          <div className="flex gap-8 items-start h-[calc(100vh-320px)]">
            
            {/* CỘT TRÁI (35%): DANH SÁCH ĐƠN THUỐC */}
            <div className="w-[35%] h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <div className="p-4 border-b border-gray-100 bg-gray-50 font-bold text-gray-700 text-sm flex justify-between">
                <span>Danh sách đơn thuốc</span>
                <span className="text-[#2563EB] bg-blue-100 px-2 py-0.5 rounded-md">{prescriptions.length}</span>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {prescriptions.map((p) => (
                  <div 
                    key={p.id} 
                    onClick={() => setSelectedPrescription(p.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${selectedPrescription === p.id ? 'bg-blue-50/80 border-[#2563EB] shadow-sm' : 'bg-white border-gray-100 hover:border-blue-300 hover:bg-gray-50'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-bold text-gray-900 block">{p.patient}</span>
                        <span className="text-xs text-gray-500 font-medium">{p.code}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold border uppercase tracking-wider ${p.statusColor}`}>
                        {p.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 flex justify-between items-center mt-3 pt-3 border-t border-gray-100/60">
                      <span className="flex items-center gap-1.5"><Pill size={14} className="text-blue-500"/> <span className="font-semibold text-gray-700">{p.drugCount}</span> loại thuốc</span>
                      <span className="flex items-center gap-1.5"><Calendar size={14}/> {p.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CỘT PHẢI (65%): CHI TIẾT & KÊ ĐƠN */}
            <div className="w-[65%] h-full bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
              
              {/* Header Thẻ chi tiết */}
              <div className="p-6 border-b border-gray-100 bg-white shadow-sm z-10">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <img src={`https://ui-avatars.com/api/?name=${activePre.patient.replace(/ /g, '+')}&background=random`} alt="Avatar" className="w-16 h-16 rounded-xl border border-gray-200 shadow-sm"/>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{activePre.patient}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-gray-500">Mã BN: PT00123 • {activePre.gender} • {activePre.age} tuổi</p>
                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                        <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">BHYT Hợp lệ</span>
                      </div>
                      <p className="text-sm text-gray-700 font-medium mt-2 bg-gray-50 px-3 py-1.5 rounded-lg inline-block border border-gray-100">
                        <span className="text-gray-500">Chẩn đoán:</span> {activePre.diagnosis}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center gap-2">
                      <Printer size={16}/> In đơn
                    </button>
                    <button className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-xl font-bold hover:bg-red-100 transition-colors flex items-center gap-2">
                      <FileDown size={16}/> Xuất PDF
                    </button>
                  </div>
                </div>
              </div>

              {/* Bố cục chia 2 phần trong Detail */}
              <div className="flex-1 flex overflow-hidden">
                
                {/* KHU VỰC NHẬP/SỬA THUỐC (Trái của Detail) */}
                <div className="flex-1 border-r border-gray-100 p-6 overflow-y-auto bg-gray-50/30">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Pill size={18} className="text-[#2563EB]"/> Danh sách thuốc kê đơn
                  </h3>
                  
                  {/* Form thêm thuốc nhanh */}
                  {activePre.status !== 'Đã phát' && (
                    <div className="grid grid-cols-12 gap-3 mb-6 bg-white p-4 rounded-xl border border-blue-100 shadow-sm shadow-blue-50/50 items-end transition-all focus-within:border-blue-300 focus-within:shadow-md">
                      <div className="col-span-4">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tên thuốc <span className="text-red-500">*</span></label>
                        <input type="text" className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors" placeholder="Gõ tên thuốc..."/>
                      </div>
                      <div className="col-span-3">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Liều dùng</label>
                        <input type="text" className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors" placeholder="Sáng 1 - Tối 1"/>
                      </div>
                      <div className="col-span-3">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Số lượng</label>
                        <input type="number" className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors" placeholder="SL"/>
                      </div>
                      <div className="col-span-2">
                        <button className="w-full bg-[#2563EB] text-white p-2.5 rounded-lg hover:bg-blue-700 active:scale-95 transition-all font-bold text-sm flex items-center justify-center gap-1 shadow-md">
                          <Plus size={16}/> Thêm
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Bảng danh sách thuốc */}
                  <table className="w-full text-left text-sm bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <thead className="bg-gray-100 text-gray-600 border-b border-gray-200 font-bold">
                      <tr>
                        <th className="p-3">Tên thuốc - Hàm lượng</th>
                        <th className="p-3">Liều dùng</th>
                        <th className="p-3 text-center">SL</th>
                        <th className="p-3 text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-gray-50 transition-colors group">
                        <td className="p-3">
                          <p className="font-bold text-gray-900 group-hover:text-[#2563EB] transition-colors">Paracetamol</p>
                          <p className="text-xs text-gray-500">500mg • Lọ</p>
                        </td>
                        <td className="p-3 text-gray-700">2 viên/ngày (Sau ăn)</td>
                        <td className="p-3 text-center font-bold">10</td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"><Edit size={16}/></button>
                            <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"><Trash2 size={16}/></button>
                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors group">
                        <td className="p-3">
                          <p className="font-bold text-gray-900 group-hover:text-[#2563EB] transition-colors">Vitamin C</p>
                          <p className="text-xs text-gray-500">500mg • Vỉ</p>
                        </td>
                        <td className="p-3 text-gray-700">1 viên/ngày (Sáng)</td>
                        <td className="p-3 text-center font-bold">7</td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"><Edit size={16}/></button>
                            <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"><Trash2 size={16}/></button>
                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors group">
                        <td className="p-3">
                          <p className="font-bold text-gray-900 group-hover:text-[#2563EB] transition-colors">Amoxicillin</p>
                          <p className="text-xs text-gray-500">500mg • Vỉ</p>
                        </td>
                        <td className="p-3 text-gray-700">3 viên/ngày (Đúng giờ)</td>
                        <td className="p-3 text-center font-bold">15</td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"><Edit size={16}/></button>
                            <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"><Trash2 size={16}/></button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Cảnh báo an toàn hệ thống (Dị ứng) */}
                  <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3 shadow-sm">
                    <ShieldAlert className="text-red-500 shrink-0 mt-0.5 animate-pulse" size={20}/>
                    <div>
                      <h4 className="font-bold text-red-800 text-sm">Cảnh báo an toàn:</h4>
                      <p className="text-sm text-red-700 mt-1">Hồ sơ bệnh nhân ghi nhận tiền sử dị ứng với <span className="font-bold underline decoration-red-400 underline-offset-2">Penicillin</span>. Vui lòng kiểm tra kỹ trước khi chỉ định kháng sinh liên quan.</p>
                    </div>
                  </div>

                </div>

                {/* KHU VỰC THÔNG TIN PHỤ & TIMELINE (Phải của Detail) */}
                <div className="w-72 bg-white p-6 overflow-y-auto">
                  
                  {/* Trạng thái & QR Code */}
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 mb-8 text-center shadow-sm">
                    <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold border uppercase tracking-wider mb-4 shadow-sm ${activePre.statusColor}`}>
                      {activePre.status}
                    </span>
                    <div className="w-28 h-28 mx-auto bg-white border border-gray-200 p-2 rounded-xl shadow-sm group hover:scale-105 transition-transform duration-300">
                      <QrCode className="w-full h-full text-gray-800 group-hover:text-[#2563EB] transition-colors"/>
                    </div>
                    <p className="text-xs text-gray-500 mt-3 font-medium">Quét mã để phát thuốc</p>
                  </div>

                  {/* Lịch sử trạng thái (Timeline) */}
                  <h3 className="font-bold text-gray-900 mb-5 text-sm uppercase tracking-wide flex items-center gap-2">
                    <Activity size={16} className="text-[#2563EB]"/> Lịch sử tiến trình
                  </h3>
                  
                  <div className="space-y-6 border-l-2 border-gray-100 ml-3 pl-6 relative">
                    
                    {/* Step 1: Tạo đơn */}
                    <div className="relative group">
                      <span className="absolute -left-[31px] top-0 w-3.5 h-3.5 bg-gray-400 border-2 border-white rounded-full group-hover:scale-125 transition-transform"></span>
                      <p className="text-sm font-bold text-gray-900">Đơn thuốc được tạo</p>
                      <p className="text-xs text-gray-500 mt-0.5 font-medium flex items-center gap-1"><Clock size={10}/> 15/08/2026 - 09:30</p>
                    </div>

                    {/* Step 2: Xác nhận */}
                    <div className="relative group">
                      <span className="absolute -left-[31px] top-0 w-3.5 h-3.5 bg-blue-500 border-2 border-white rounded-full group-hover:scale-125 transition-transform shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
                      <p className="text-sm font-bold text-gray-900">Bác sĩ xác nhận</p>
                      <p className="text-xs text-gray-500 mt-0.5 font-medium flex items-center gap-1"><Clock size={10}/> 15/08/2026 - 09:35</p>
                    </div>

                    {/* Step 3: Đã phát (Hoặc đang chờ) */}
                    {activePre.status === 'Đã phát' ? (
                      <div className="relative group">
                        <span className="absolute -left-[31px] top-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full group-hover:scale-125 transition-transform shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                        <p className="text-sm font-bold text-gray-900">Đã phát thuốc</p>
                        <p className="text-xs text-green-600 mt-0.5 font-bold flex items-center gap-1"><CheckCircle2 size={12}/> Hoàn tất lúc 10:15</p>
                      </div>
                    ) : (
                      <div className="relative group">
                        <span className="absolute -left-[31px] top-0 w-3.5 h-3.5 bg-yellow-400 border-2 border-white rounded-full animate-pulse shadow-[0_0_8px_rgba(250,204,21,0.6)]"></span>
                        <p className="text-sm font-bold text-yellow-600">Đang chờ phát thuốc</p>
                        <p className="text-xs text-gray-500 mt-0.5 font-medium">Bệnh nhân đang ở quầy Dược</p>
                      </div>
                    )}
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