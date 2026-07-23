'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // <-- Import useRouter
import { 
  FileText, Activity, TestTube, Users, Search, Filter, RefreshCcw, 
  Plus, Printer, QrCode, Calendar, Clock, Stethoscope, Heart, 
  Droplets, Thermometer, Weight, Pill, Paperclip, ChevronRight, 
  CheckCircle2, Edit, Eye, LayoutDashboard, CalendarDays, BarChart3, 
  Bell, LogOut, Star, User, Settings
} from 'lucide-react';

export default function MedicalRecordsPage() {
  const router = useRouter(); // <-- Khởi tạo router
  const [selectedRecord, setSelectedRecord] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    // Có thể thêm code xóa token/localStorage ở đây nếu có
    // localStorage.removeItem('token');
    
    // Chuyển hướng người dùng về trang đăng nhập
    router.push('/login');
  };

  // Mock dữ liệu Hồ sơ bệnh án
  const records = [
    { id: 1, baCode: 'BA-2608-001', patient: 'Nguyễn Văn A', age: 24, gender: 'Nam', date: '15/08/2026', doctor: 'BS. Nguyễn Văn Bình', diagnosis: 'Viêm họng cấp', status: 'Hoàn thành', statusColor: 'bg-green-100 text-green-700 border-green-200' },
    { id: 2, baCode: 'BA-2608-002', patient: 'Lê Văn B', age: 35, gender: 'Nam', date: '15/08/2026', doctor: 'BS. Trần Thị An', diagnosis: 'Đau dạ dày', status: 'Theo dõi', statusColor: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
    { id: 3, baCode: 'BA-2608-003', patient: 'Trần Thị C', age: 51, gender: 'Nữ', date: '14/08/2026', doctor: 'BS. Nguyễn Văn Bình', diagnosis: 'Cao huyết áp', status: 'Tái khám', statusColor: 'bg-blue-100 text-blue-700 border-blue-200' },
    { id: 4, baCode: 'BA-2608-004', patient: 'Phạm Hữu D', age: 62, gender: 'Nam', date: '14/08/2026', doctor: 'BS. Lê Hoàng', diagnosis: 'Tiểu đường Tuýp 2', status: 'Đang điều trị', statusColor: 'bg-orange-100 text-orange-700 border-orange-200' },
  ];

  const activeBA = records.find(r => r.id === selectedRecord) || records[0];

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans text-gray-800 overflow-hidden">
      
      {/* ==========================================
          1. SIDEBAR (Đồng bộ chuẩn với Dashboard)
      ========================================== */}
      <aside className="w-64 bg-[#172554] text-gray-300 flex flex-col h-screen sticky top-0 shrink-0">
        <div className="h-20 flex items-center justify-center border-b border-blue-900/50">
          <div className="flex items-center gap-2 text-white">
            <Activity className="text-orange-500" size={28}/>
            <span className="font-bold text-xl tracking-tight">HEALTHCARE</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-1 px-3">
          <Link href="/doctor/dashboard" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-900/50 hover:text-white rounded-xl transition">
            <LayoutDashboard size={20}/> Dashboard
          </Link>
          <Link href="/doctor/appointments" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-900/50 hover:text-white rounded-xl transition">
            <CalendarDays size={20}/> Lịch khám
          </Link>
          <Link href="/doctor/patients" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-900/50 hover:text-white rounded-xl transition">
            <Users size={20}/> Bệnh nhân
          </Link>
          {/* Menu Active */}
          <Link href="/doctor/records" className="flex items-center gap-3 px-4 py-3 bg-[#2563EB] text-white rounded-xl font-medium shadow-md">
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
        
        {/* HEADER (Đồng bộ chuẩn với Dashboard) */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">Hồ sơ bệnh án</h1>
            <p className="text-sm text-gray-500">Quản lý toàn bộ hồ sơ khám chữa bệnh an toàn và chính xác</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <input type="text" placeholder="Tìm kiếm hồ sơ..." className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-[#2563EB] w-64"/>
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

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50/50">
          
          {/* 3. THỐNG KÊ */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-50 text-[#2563EB] rounded-2xl flex items-center justify-center"><FileText size={24}/></div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Tổng hồ sơ</p>
                <p className="text-2xl font-black text-gray-900">12,540</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center"><CheckCircle2 size={24}/></div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Hoàn thành h.nay</p>
                <p className="text-2xl font-black text-gray-900">250</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition">
              <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center"><TestTube size={24}/></div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Chờ xét nghiệm</p>
                <p className="text-2xl font-black text-gray-900">80</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition">
              <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center"><Activity size={24}/></div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Đang điều trị</p>
                <p className="text-2xl font-black text-gray-900">45</p>
              </div>
            </div>
          </div>

          {/* 4. THANH TÌM KIẾM & BỘ LỌC */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col lg:flex-row gap-4 justify-between items-center">
            <div className="flex-1 flex gap-4 w-full">
              <div className="relative flex-1">
                <input type="text" placeholder="Tên bệnh nhân, Mã BA..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition"/>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
              </div>
              <select className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none">
                <option>Chuyên khoa (Tất cả)</option>
                <option>Nội tổng quát</option>
              </select>
              <select className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none">
                <option>Trạng thái (Tất cả)</option>
                <option>Hoàn thành</option>
                <option>Đang điều trị</option>
              </select>
              <button className="bg-gray-100 text-gray-600 px-4 py-2.5 rounded-xl hover:bg-gray-200 transition flex items-center gap-2 text-sm font-bold">
                <Filter size={16}/> Lọc
              </button>
            </div>
            <div className="flex gap-2">
              <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-50 font-bold transition flex items-center gap-2 whitespace-nowrap">
                <Printer size={18}/> Xuất danh sách
              </button>
              <button className="bg-[#2563EB] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md transition flex items-center gap-2 whitespace-nowrap">
                <Plus size={18}/> Tạo bệnh án
              </button>
            </div>
          </div>

          {/* 5. MASTER - DETAIL LAYOUT */}
          <div className="flex gap-8 items-start h-[calc(100vh-280px)]">
            
            {/* MASTER: DANH SÁCH (35%) */}
            <div className="w-[35%] h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <div className="p-4 border-b border-gray-100 bg-gray-50 font-bold text-gray-700 text-sm flex justify-between">
                <span>Danh sách hồ sơ</span>
                <span>{records.length} kết quả</span>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {records.map((r) => (
                  <div 
                    key={r.id} 
                    onClick={() => setSelectedRecord(r.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition ${selectedRecord === r.id ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-100 hover:border-blue-300'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-gray-900 text-sm">{r.patient}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${r.statusColor}`}>{r.status}</span>
                    </div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>Mã BA: <span className="font-medium text-gray-700">{r.baCode}</span></p>
                      <p>CĐ: <span className="font-medium text-gray-700">{r.diagnosis}</span></p>
                      <p className="flex items-center gap-1 mt-2 text-gray-400"><Calendar size={12}/> {r.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DETAIL: THÔNG TIN CHI TIẾT (65%) */}
            <div className="w-[65%] h-full bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
              
              {/* Card Profile & Quick Actions */}
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50/50 to-white">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <img src={`https://ui-avatars.com/api/?name=${activeBA.patient.replace(/ /g, '+')}&background=random`} alt="Avatar" className="w-16 h-16 rounded-xl border border-gray-200 shadow-sm"/>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{activeBA.patient}</h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Mã BN: PT00123 • {activeBA.gender} • {activeBA.age} tuổi • Máu: O+ • <span className="text-green-600 font-medium">Có BHYT</span>
                      </p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded"><FileText size={14}/> {activeBA.baCode}</span>
                        <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded"><Calendar size={14}/> {activeBA.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition" title="Chỉnh sửa"><Edit size={18}/></button>
                    <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition" title="In hồ sơ"><Printer size={18}/></button>
                    <button className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg font-bold hover:bg-red-100 transition flex items-center gap-2">
                      <QrCode size={18}/> Xuất PDF
                    </button>
                  </div>
                </div>
              </div>

              {/* TABS NAVIGATION */}
              <div className="flex px-6 border-b border-gray-200 bg-white shrink-0">
                {[
                  { id: 'overview', label: 'Tổng quan' },
                  { id: 'diagnosis', label: 'Chẩn đoán' },
                  { id: 'prescription', label: 'Đơn thuốc' },
                  { id: 'lab', label: 'Xét nghiệm & File' },
                  { id: 'history', label: 'Lịch sử điều trị' }
                ].map((tab) => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3 px-4 font-bold text-sm border-b-2 transition ${activeTab === tab.id ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* TAB CONTENT (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30">
                
                {/* --- TAB: TỔNG QUAN --- */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Chỉ số sinh tồn */}
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><Activity size={18} className="text-red-500"/> Chỉ số sinh tồn</h3>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                          <Heart className="mx-auto text-red-500 mb-2" size={20}/>
                          <p className="text-xs text-gray-500 uppercase font-bold">Nhịp tim</p>
                          <p className="text-xl font-black text-gray-900 mt-1">72 <span className="text-xs font-normal">BPM</span></p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                          <Droplets className="mx-auto text-blue-500 mb-2" size={20}/>
                          <p className="text-xs text-gray-500 uppercase font-bold">Huyết áp</p>
                          <p className="text-xl font-black text-gray-900 mt-1">120/80</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                          <Thermometer className="mx-auto text-orange-500 mb-2" size={20}/>
                          <p className="text-xs text-gray-500 uppercase font-bold">Nhiệt độ</p>
                          <p className="text-xl font-black text-gray-900 mt-1">38.5°C</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                          <Weight className="mx-auto text-green-500 mb-2" size={20}/>
                          <p className="text-xs text-gray-500 uppercase font-bold">BMI</p>
                          <p className="text-xl font-black text-gray-900 mt-1">22.8</p>
                        </div>
                      </div>
                    </div>

                    {/* Khung Thông tin khám & Tóm tắt lâm sàng */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4 border-b pb-2">Thông tin cuộc khám</h3>
                        <ul className="space-y-3 text-sm">
                          <li className="flex justify-between"><span className="text-gray-500">Bác sĩ:</span> <span className="font-medium">{activeBA.doctor}</span></li>
                          <li className="flex justify-between"><span className="text-gray-500">Chuyên khoa:</span> <span className="font-medium">Nội tổng quát</span></li>
                          <li className="flex justify-between"><span className="text-gray-500">Ngày giờ:</span> <span className="font-medium">{activeBA.date} - 09:30</span></li>
                          <li className="flex justify-between"><span className="text-gray-500">Phòng khám:</span> <span className="font-medium">Phòng số 3</span></li>
                          <li className="flex justify-between pt-2 border-t"><span className="text-gray-500">Lịch Tái khám:</span> <span className="font-bold text-[#2563EB]">22/08/2026</span></li>
                        </ul>
                      </div>

                      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2"><Stethoscope size={18} className="text-[#2563EB]"/> Tóm tắt lâm sàng</h3>
                        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                          Bệnh nhân nam, 24 tuổi đến khám với triệu chứng sốt (38.5°C), ho và đau họng. Chỉ số sinh tồn khác bình thường. Chẩn đoán sơ bộ viêm họng cấp. Đã chỉ định dùng kháng sinh và hạ sốt. Khuyến nghị theo dõi nhiệt độ tại nhà, tái khám nếu không thuyên giảm sau 3 ngày.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* --- TAB: CHẨN ĐOÁN --- */}
                {activeTab === 'diagnosis' && (
                  <div className="space-y-6">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><Stethoscope size={18} className="text-[#2563EB]"/> Triệu chứng lâm sàng</h3>
                      <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Sốt 38.5 độ C kéo dài 2 ngày.</li>
                          <li>Ho khan, đau rát họng khi nuốt.</li>
                          <li>Cơ thể mệt mỏi.</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><Activity size={18} className="text-green-600"/> Chẩn đoán xác định</h3>
                      <div className="bg-green-50 border border-green-100 p-4 rounded-lg text-sm font-bold text-green-800">
                        {activeBA.diagnosis} (Mã ICD-10: J00)
                      </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><Pill size={18} className="text-orange-500"/> Hướng điều trị</h3>
                      <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">Điều trị ngoại trú. Dùng thuốc hạ sốt, kháng sinh theo đơn. Nghỉ ngơi nhiều, uống đủ 2 lít nước mỗi ngày. Tái khám sau 7 ngày hoặc nếu sốt cao không hạ.</p>
                    </div>
                  </div>
                )}

                {/* --- TAB: ĐƠN THUỐC --- */}
                {activeTab === 'prescription' && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                      <h3 className="font-bold text-gray-900 flex items-center gap-2"><Pill size={18} className="text-[#2563EB]"/> Đơn thuốc đã kê</h3>
                      <button className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-100 flex items-center gap-2 shadow-sm"><Printer size={14}/> In đơn thuốc</button>
                    </div>
                    <table className="w-full text-left text-sm">
                      <thead className="bg-white border-b border-gray-100 text-gray-500 font-bold">
                        <tr>
                          <th className="px-4 py-3">Tên thuốc</th>
                          <th className="px-4 py-3">Liều dùng</th>
                          <th className="px-4 py-3 text-center">Số lượng</th>
                          <th className="px-4 py-3">Ghi chú</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-bold text-gray-900">Paracetamol 500mg</td>
                          <td className="px-4 py-3">2 viên/ngày (Sáng 1, Tối 1)</td>
                          <td className="px-4 py-3 text-center font-bold">10</td>
                          <td className="px-4 py-3 text-gray-500">Uống sau ăn</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-bold text-gray-900">Vitamin C sủi</td>
                          <td className="px-4 py-3">1 viên/ngày</td>
                          <td className="px-4 py-3 text-center font-bold">7</td>
                          <td className="px-4 py-3 text-gray-500">Uống buổi sáng</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-bold text-gray-900">Amoxicillin 500mg</td>
                          <td className="px-4 py-3">3 viên/ngày</td>
                          <td className="px-4 py-3 text-center font-bold">15</td>
                          <td className="px-4 py-3 text-gray-500">Uống đúng giờ</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {/* --- TAB: XÉT NGHIỆM & FILE --- */}
                {activeTab === 'lab' && (
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><TestTube size={18} className="text-[#2563EB]"/> Kết quả xét nghiệm</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <Droplets className="text-red-500" size={16}/>
                            <span className="font-medium text-sm">Xét nghiệm Máu</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded flex items-center gap-1"><CheckCircle2 size={12}/> Bình thường</span>
                            <button className="text-[#2563EB] text-xs font-bold hover:underline">Xem</button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <Activity className="text-blue-500" size={16}/>
                            <span className="font-medium text-sm">X-Quang Phổi</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded flex items-center gap-1"><CheckCircle2 size={12}/> Bình thường</span>
                            <button className="text-[#2563EB] text-xs font-bold hover:underline">Xem</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Paperclip size={18} className="text-gray-500"/> File đính kèm</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                            <FileText size={16} className="text-red-500"/> Ket_qua_mau.pdf
                          </div>
                          <span className="text-xs text-gray-400">1.2 MB</span>
                        </div>
                        <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                            <FileText size={16} className="text-blue-500"/> Phim_Xquang.jpg
                          </div>
                          <span className="text-xs text-gray-400">3.5 MB</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* --- TAB: LỊCH SỬ --- */}
                {activeTab === 'history' && (
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><Clock size={18} className="text-[#2563EB]"/> Lịch sử chỉnh sửa & điều trị</h3>
                    <div className="space-y-6 border-l-2 border-blue-100 ml-3 pl-5 relative">
                      <div className="relative">
                        <span className="absolute -left-[29px] top-1 w-4 h-4 bg-white border-2 border-[#2563EB] rounded-full"></span>
                        <p className="text-xs text-gray-400 mb-1">15/08/2026 - 10:45</p>
                        <p className="text-sm font-bold text-gray-900">Hoàn thành cuộc khám</p>
                        <p className="text-xs text-gray-500 mt-1">Đã ký điện tử bởi BS. Nguyễn Văn Bình</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[29px] top-1 w-4 h-4 bg-white border-2 border-green-500 rounded-full"></span>
                        <p className="text-xs text-gray-400 mb-1">15/08/2026 - 10:15</p>
                        <p className="text-sm font-bold text-gray-900">Cập nhật kết quả xét nghiệm máu</p>
                        <p className="text-xs text-gray-500 mt-1">Người cập nhật: KTV. Trần Lê</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[29px] top-1 w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></span>
                        <p className="text-xs text-gray-400 mb-1">15/08/2026 - 09:30</p>
                        <p className="text-sm font-bold text-gray-900">Tạo mới hồ sơ bệnh án</p>
                        <p className="text-xs text-gray-500 mt-1">Người tạo: BS. Nguyễn Văn Bình</p>
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