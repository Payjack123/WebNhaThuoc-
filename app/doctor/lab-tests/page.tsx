'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // <-- Import useRouter
import { 
  LayoutDashboard, CalendarDays, Users, FileText, Pill, TestTube, 
  BarChart3, Bell, User, Settings, LogOut, Search, Plus, 
  CheckCircle2, Clock, AlertTriangle, Activity, Printer, 
  ChevronRight, FileSpreadsheet, Stethoscope, Save, Filter,
  Image as ImageIcon, Download, TrendingUp, Calendar, QrCode, Star
} from 'lucide-react';

export default function LabTestsPage() {
  const router = useRouter(); // <-- Khởi tạo router
  const [activeTab, setActiveTab] = useState('results'); // results | request | trends
  const [selectedTest, setSelectedTest] = useState(1);

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    // Có thể xóa localStorage token ở đây nếu cần thiết
    // localStorage.removeItem('token');
    
    // Chuyển hướng người dùng về trang đăng nhập
    router.push('/login');
  };

  // Mock dữ liệu Phiếu xét nghiệm
  const labTests = [
    { id: 1, code: 'XN-2608-001', patient: 'Nguyễn Văn A', age: 24, gender: 'Nam', type: 'Xét nghiệm máu (CBC)', date: '15/08/2026', doctor: 'BS. Nguyễn Văn Bình', status: 'Hoàn thành', statusColor: 'bg-green-100 text-green-700 border-green-200' },
    { id: 2, code: 'XN-2608-002', patient: 'Lê Văn B', age: 35, gender: 'Nam', type: 'X-Quang Phổi', date: '15/08/2026', doctor: 'BS. Trần Thị An', status: 'Đang xử lý', statusColor: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
    { id: 3, code: 'XN-2608-003', patient: 'Trần Văn C', age: 51, gender: 'Nam', type: 'MRI Sọ não', date: '14/08/2026', doctor: 'BS. Lê Hoàng', status: 'Chờ lấy mẫu', statusColor: 'bg-blue-100 text-blue-700 border-blue-200' },
    { id: 4, code: 'XN-2608-004', patient: 'Phạm Thị D', age: 28, gender: 'Nữ', type: 'Sinh hóa máu', date: '14/08/2026', doctor: 'BS. Nguyễn Văn Bình', status: 'Đã hủy', statusColor: 'bg-red-100 text-red-700 border-red-200' },
  ];

  const activeLab = labTests.find(t => t.id === selectedTest) || labTests[0];

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
          <Link href="/doctor/dashboard" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-900/50 hover:text-white rounded-xl transition">
            <LayoutDashboard size={20}/> Dashboard
          </Link>
          <Link href="/doctor/appointments" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-900/50 hover:text-white rounded-xl transition">
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
          {/* Menu Active */}
          <Link href="/doctor/lab-tests" className="flex items-center gap-3 px-4 py-3 bg-[#2563EB] text-white rounded-xl font-medium shadow-md transition">
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

          {/* Nút Đăng xuất đã gắn sự kiện onClick */}
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
          2. MAIN CONTENT
      ========================================== */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* TOP HEADER */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">Quản lý Xét nghiệm</h1>
            <p className="text-sm text-gray-500">Theo dõi, chỉ định và quản lý kết quả cận lâm sàng</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <input type="text" placeholder="Tìm mã phiếu, bệnh nhân..." className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-[#2563EB] w-64 outline-none transition"/>
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
              <div className="w-12 h-12 bg-blue-50 text-[#2563EB] rounded-2xl flex items-center justify-center"><TestTube size={24}/></div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Tổng xét nghiệm</p>
                <p className="text-2xl font-black text-gray-900">1,560</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center"><CheckCircle2 size={24}/></div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Đã có kết quả</p>
                <p className="text-2xl font-black text-gray-900">95</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition">
              <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center"><Clock size={24}/></div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Đang xử lý</p>
                <p className="text-2xl font-black text-gray-900">18</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center"><CalendarDays size={24}/></div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Xét nghiệm hôm nay</p>
                <p className="text-2xl font-black text-gray-900">42</p>
              </div>
            </div>
          </div>

          {/* 4. THANH TÌM KIẾM & BỘ LỌC */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col lg:flex-row gap-4 justify-between items-center">
            <div className="flex-1 flex gap-4 w-full">
              <select className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none">
                <option>Loại XN (Tất cả)</option>
                <option>Xét nghiệm máu</option>
                <option>X-Quang</option>
                <option>MRI</option>
              </select>
              <select className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none">
                <option>Trạng thái (Tất cả)</option>
                <option>Hoàn thành</option>
                <option>Đang xử lý</option>
                <option>Chờ lấy mẫu</option>
              </select>
              <select className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none">
                <option>Ngày (Hôm nay)</option>
                <option>Tuần này</option>
              </select>
              <button className="bg-gray-100 text-gray-600 px-5 py-2.5 rounded-xl hover:bg-gray-200 transition flex items-center gap-2 text-sm font-bold">
                <Filter size={16}/> Lọc
              </button>
            </div>
            <div className="flex gap-2">
              <button className="bg-[#2563EB] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md transition flex items-center gap-2">
                <Plus size={18}/> Tạo phiếu mới
              </button>
            </div>
          </div>

          {/* 5. MASTER - DETAIL LAYOUT */}
          <div className="flex gap-8 items-start h-[calc(100vh-320px)]">
            
            {/* MASTER: DANH SÁCH (35%) */}
            <div className="w-[35%] h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <div className="p-4 border-b border-gray-100 bg-gray-50 font-bold text-gray-700 text-sm flex justify-between items-center">
                <span>Danh sách phiếu xét nghiệm</span>
                <span className="bg-blue-100 text-[#2563EB] px-2 py-0.5 rounded-md text-xs">{labTests.length}</span>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {labTests.map((test) => (
                  <div 
                    key={test.id} 
                    onClick={() => setSelectedTest(test.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${selectedTest === test.id ? 'bg-blue-50/80 border-[#2563EB] shadow-sm' : 'bg-white border-gray-100 hover:border-blue-300 hover:bg-gray-50'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-bold text-gray-900 block">{test.patient}</span>
                        <span className="text-xs font-medium text-gray-500">{test.code}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold border uppercase tracking-wider ${test.statusColor}`}>
                        {test.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mt-3 pt-3 border-t border-gray-100/60 flex items-center gap-2">
                      <TestTube size={14} className="text-[#2563EB]"/> 
                      <span className="font-semibold">{test.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DETAIL: CHI TIẾT KẾT QUẢ (65%) */}
            <div className="w-[65%] h-full bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
              
              {/* Header Card Detail */}
              <div className="p-6 border-b border-gray-100 bg-white z-10 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <img src={`https://ui-avatars.com/api/?name=${activeLab.patient.replace(/ /g, '+')}&background=random`} alt="Avatar" className="w-14 h-14 rounded-xl border border-gray-200 shadow-sm"/>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{activeLab.patient}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-gray-500">Mã BN: PT00123 • {activeLab.gender} • {activeLab.age} tuổi</p>
                      </div>
                      <p className="text-sm text-gray-700 font-medium mt-1 bg-gray-50 px-3 py-1 rounded-lg border border-gray-200 inline-block">
                        <span className="text-gray-500">Chỉ định:</span> {activeLab.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-bold hover:bg-gray-200 transition flex items-center gap-2">
                      <Printer size={16}/> In phiếu
                    </button>
                    <button className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-xl font-bold hover:bg-red-100 transition flex items-center gap-2">
                      <Download size={16}/> PDF
                    </button>
                  </div>
                </div>
              </div>

              {/* TABS NAVIGATION */}
              <div className="flex px-6 border-b border-gray-200 bg-gray-50 shrink-0">
                <button 
                  onClick={() => setActiveTab('results')}
                  className={`py-3 px-5 font-bold text-sm border-b-2 transition ${activeTab === 'results' ? 'border-[#2563EB] text-[#2563EB] bg-white' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  Kết quả & Hình ảnh
                </button>
                <button 
                  onClick={() => setActiveTab('request')}
                  className={`py-3 px-5 font-bold text-sm border-b-2 transition ${activeTab === 'request' ? 'border-[#2563EB] text-[#2563EB] bg-white' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  Phiếu chỉ định
                </button>
                <button 
                  onClick={() => setActiveTab('trends')}
                  className={`py-3 px-5 font-bold text-sm border-b-2 transition ${activeTab === 'trends' ? 'border-[#2563EB] text-[#2563EB] bg-white' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  Biểu đồ & Tiến trình
                </button>
              </div>

              {/* TAB CONTENT */}
              <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30">
                
                {/* --- TAB 1: KẾT QUẢ & HÌNH ẢNH --- */}
                {activeTab === 'results' && (
                  <div className="space-y-6">
                    {/* Bảng kết quả (nếu là xét nghiệm máu) */}
                    {activeLab.id === 1 && (
                      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                          <h3 className="font-bold text-gray-900 flex items-center gap-2"><TestTube size={18} className="text-[#2563EB]"/> Bảng kết quả phân tích</h3>
                          <span className="text-xs text-gray-500">Mẫu lấy lúc: 08:30 sáng</span>
                        </div>
                        <table className="w-full text-left text-sm">
                          <thead className="bg-white border-b border-gray-100 text-gray-500">
                            <tr>
                              <th className="p-4 font-bold">Chỉ số</th>
                              <th className="p-4 font-bold">Kết quả</th>
                              <th className="p-4 font-bold">CS Tham chiếu</th>
                              <th className="p-4 font-bold">Đánh giá</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            <tr className="hover:bg-gray-50">
                              <td className="p-4 font-medium text-gray-900">Hồng cầu (RBC)</td>
                              <td className="p-4 font-bold">4.8 <span className="text-xs font-normal text-gray-500">T/L</span></td>
                              <td className="p-4 text-gray-500">4.2 - 5.9</td>
                              <td className="p-4"><span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-bold rounded">Bình thường</span></td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                              <td className="p-4 font-medium text-gray-900">Bạch cầu (WBC)</td>
                              <td className="p-4 font-bold">9.2 <span className="text-xs font-normal text-gray-500">G/L</span></td>
                              <td className="p-4 text-gray-500">4.0 - 10.0</td>
                              <td className="p-4"><span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-bold rounded">Bình thường</span></td>
                            </tr>
                            <tr className="hover:bg-red-50/50 bg-red-50/20">
                              <td className="p-4 font-medium text-red-900 flex items-center gap-2">Đường huyết <AlertTriangle size={14} className="text-red-500"/></td>
                              <td className="p-4 font-bold text-red-600">7.1 <span className="text-xs font-normal">mmol/L</span></td>
                              <td className="p-4 text-gray-500">3.9 - 6.1</td>
                              <td className="p-4"><span className="px-2 py-1 bg-red-100 text-red-700 border border-red-200 text-xs font-bold rounded">Cao</span></td>
                            </tr>
                            <tr className="hover:bg-yellow-50/50 bg-yellow-50/20">
                              <td className="p-4 font-medium text-yellow-900">Cholesterol</td>
                              <td className="p-4 font-bold text-yellow-700">5.8 <span className="text-xs font-normal">mmol/L</span></td>
                              <td className="p-4 text-gray-500">&lt; 5.2</td>
                              <td className="p-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 border border-yellow-200 text-xs font-bold rounded">Hơi cao</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Hình ảnh (Nếu là X-Quang/MRI) */}
                    {(activeLab.id === 2 || activeLab.id === 3) && (
                      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><ImageIcon size={18} className="text-[#2563EB]"/> Hình ảnh chẩn đoán</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="relative group rounded-xl overflow-hidden bg-black border border-gray-200">
                            <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=500&h=300" alt="X-Ray" className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition duration-300"/>
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-bold text-sm shadow-lg flex items-center gap-2"><ImageIcon size={16}/> Xem phim</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Đánh giá chuyên môn (Thay thế AI) */}
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><Stethoscope size={18} className="text-purple-600"/> Kết luận lâm sàng</h3>
                      <textarea 
                        className="w-full p-4 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-gray-50" 
                        rows={4}
                        defaultValue={activeLab.id === 1 ? "Các chỉ số hồng cầu, bạch cầu bình thường. Phát hiện đường huyết và Cholesterol có dấu hiệu cao hơn mức tham chiếu. Khuyến nghị bệnh nhân điều chỉnh chế độ ăn uống, hạn chế đồ ngọt và dầu mỡ. Cần tái xét nghiệm đường huyết lúc đói sau 1 tháng." : "Chưa có kết luận"}
                      ></textarea>
                      <div className="flex justify-end mt-3">
                        <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-purple-700 transition shadow-md flex items-center gap-2">
                          <Save size={16}/> Lưu kết luận
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* --- TAB 2: CHỈ ĐỊNH --- */}
                {activeTab === 'request' && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-3xl">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                      <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2"><FileText className="text-[#2563EB]"/> Thông tin phiếu chỉ định</h3>
                      <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">Mã: {activeLab.code}</span>
                    </div>
                    
                    <div className="space-y-6 text-sm">
                      <div>
                        <p className="font-bold text-gray-700 mb-2 uppercase text-xs">Yêu cầu xét nghiệm</p>
                        <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
                          <ul className="space-y-2 font-medium text-blue-900">
                            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500"/> {activeLab.type}</li>
                            {activeLab.id === 1 && <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500"/> Xét nghiệm nước tiểu toàn phần</li>}
                          </ul>
                        </div>
                      </div>

                      <div>
                        <p className="font-bold text-gray-700 mb-2 uppercase text-xs">Lý do chỉ định / Chẩn đoán sơ bộ</p>
                        <p className="bg-gray-50 p-4 rounded-lg border border-gray-200">Bệnh nhân có biểu hiện ho kéo dài, sốt nhẹ về chiều. Cần kiểm tra công thức máu để xác định tình trạng viêm nhiễm và kiểm tra các chỉ số sinh hóa cơ bản.</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Bác sĩ chỉ định</p>
                          <p className="font-bold text-gray-900">{activeLab.doctor}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Thời gian chỉ định</p>
                          <p className="font-bold text-gray-900">{activeLab.date} - 08:00 AM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* --- TAB 3: TRENDS & TIMELINE --- */}
                {activeTab === 'trends' && (
                  <div className="grid grid-cols-2 gap-6">
                    
                    {/* Biểu đồ diễn biến (Mockup bằng CSS) */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><TrendingUp size={18} className="text-[#2563EB]"/> Diễn biến Đường huyết (3 tháng)</h3>
                      
                      {/* Fake Chart CSS */}
                      <div className="h-48 flex items-end justify-between px-4 pb-2 border-b border-l border-gray-200 relative">
                        {/* Reference Line */}
                        <div className="absolute top-1/2 left-0 w-full border-t border-dashed border-red-300 z-0">
                          <span className="absolute -top-4 right-0 text-[10px] text-red-500 font-bold">Ngưỡng 6.1</span>
                        </div>
                        
                        {/* Bars */}
                        <div className="flex flex-col items-center gap-2 z-10 group">
                          <span className="text-xs font-bold text-gray-600 opacity-0 group-hover:opacity-100 transition">5.2</span>
                          <div className="w-12 bg-green-400 rounded-t-sm" style={{ height: '80px' }}></div>
                          <span className="text-xs text-gray-500">T6/2026</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 z-10 group">
                          <span className="text-xs font-bold text-gray-600 opacity-0 group-hover:opacity-100 transition">5.8</span>
                          <div className="w-12 bg-yellow-400 rounded-t-sm" style={{ height: '100px' }}></div>
                          <span className="text-xs text-gray-500">T7/2026</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 z-10 group">
                          <span className="text-xs font-bold text-red-600">7.1</span>
                          <div className="w-12 bg-red-500 rounded-t-sm shadow-[0_0_10px_rgba(239,68,68,0.5)]" style={{ height: '140px' }}></div>
                          <span className="text-xs font-bold text-gray-800">T8/2026</span>
                        </div>
                      </div>
                      <p className="text-xs text-center text-gray-500 mt-4 italic">Biểu đồ thể hiện mức tăng đường huyết qua các lần khám gần nhất.</p>
                    </div>

                    {/* Timeline Trạng thái */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><Clock size={18} className="text-[#2563EB]"/> Tiến trình xét nghiệm</h3>
                      
                      <div className="space-y-6 border-l-2 border-gray-100 ml-3 pl-6 relative">
                        <div className="relative">
                          <span className="absolute -left-[31px] top-0 w-3.5 h-3.5 bg-gray-400 border-2 border-white rounded-full"></span>
                          <p className="text-sm font-bold text-gray-900">Bác sĩ chỉ định</p>
                          <p className="text-xs text-gray-500 mt-0.5">15/08/2026 - 08:00 AM</p>
                        </div>
                        <div className="relative">
                          <span className="absolute -left-[31px] top-0 w-3.5 h-3.5 bg-blue-500 border-2 border-white rounded-full"></span>
                          <p className="text-sm font-bold text-gray-900">Đã lấy mẫu</p>
                          <p className="text-xs text-gray-500 mt-0.5">15/08/2026 - 08:30 AM (Phòng lấy mẫu 2)</p>
                        </div>
                        <div className="relative">
                          <span className="absolute -left-[31px] top-0 w-3.5 h-3.5 bg-yellow-400 border-2 border-white rounded-full"></span>
                          <p className="text-sm font-bold text-gray-900">Đang phân tích máy</p>
                          <p className="text-xs text-gray-500 mt-0.5">15/08/2026 - 08:45 AM</p>
                        </div>
                        <div className="relative">
                          <span className={`absolute -left-[31px] top-0 w-3.5 h-3.5 border-2 border-white rounded-full ${activeLab.status === 'Hoàn thành' ? 'bg-green-500' : 'bg-gray-200'}`}></span>
                          <p className={`text-sm font-bold ${activeLab.status === 'Hoàn thành' ? 'text-green-600' : 'text-gray-400'}`}>Có kết quả</p>
                          {activeLab.status === 'Hoàn thành' && <p className="text-xs text-gray-500 mt-0.5">15/08/2026 - 10:00 AM</p>}
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