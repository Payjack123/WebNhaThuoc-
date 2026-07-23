'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // <-- Import useRouter
import { 
  Users, UserPlus, Search, Filter, RefreshCcw, Eye, Edit, Trash2, 
  Heart, Calendar, Activity, Pill, QrCode, FileText, X, 
  CheckCircle2, LayoutDashboard, CalendarDays, 
  TestTube, BarChart3, Bell, Settings, LogOut, Phone, Mail, Droplets, User, Star
} from 'lucide-react';

export default function PatientManagementPage() {
  const router = useRouter(); // <-- Khởi tạo router
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<number>(1);

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    // Thêm logic xóa token/session ở đây nếu có
    // localStorage.removeItem('token');
    
    // Chuyển hướng về trang đăng nhập
    router.push('/login');
  };

  // Mock Data Bệnh nhân
  const patients = [
    { id: 1, code: 'PT00012', name: 'Nguyễn Văn A', age: 24, gender: 'Nam', phone: '0987.654.321', email: 'nguyenvana@gmail.com', blood: 'O+', doctor: 'BS Nguyễn Văn Bình', spec: 'Nội tổng quát', status: 'Đang điều trị', statusColor: 'bg-green-100 text-green-700 border-green-200' },
    { id: 2, code: 'PT00013', name: 'Lê Văn B', age: 35, gender: 'Nam', phone: '0912.345.678', email: 'levanb@gmail.com', blood: 'A+', doctor: 'BS Trần Thị An', spec: 'Thần kinh', status: 'Tái khám', statusColor: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
    { id: 3, code: 'PT00014', name: 'Trần Thị C', age: 28, gender: 'Nữ', phone: '0933.111.222', email: 'tranthic@gmail.com', blood: 'B+', doctor: 'BS Lê Hoàng', spec: 'Da liễu', status: 'Chờ khám', statusColor: 'bg-blue-100 text-blue-700 border-blue-200' },
    { id: 4, code: 'PT00015', name: 'Phạm Hữu D', age: 62, gender: 'Nam', phone: '0909.888.777', email: 'phamhuud@gmail.com', blood: 'AB+', doctor: 'BS Nguyễn Văn Bình', spec: 'Tim mạch', status: 'Khẩn cấp', statusColor: 'bg-red-100 text-red-700 border-red-200' },
  ];

  const activePatient = patients.find(p => p.id === selectedPatient) || patients[0];

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
          <Link href="/doctor/patients" className="flex items-center gap-3 px-4 py-3 bg-[#2563EB] text-white rounded-xl font-medium shadow-md">
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

          {/* Nút Đăng xuất đã được gắn sự kiện onClick */}
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
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
               Quản lý Bệnh nhân
            </h1>
            <p className="text-sm text-gray-500">Theo dõi toàn bộ hồ sơ, lịch sử khám và điều trị</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <input type="text" placeholder="Tìm nhanh..." className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-[#2563EB] w-64"/>
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
              <div className="w-12 h-12 bg-blue-50 text-[#2563EB] rounded-2xl flex items-center justify-center"><Users size={24}/></div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Tổng bệnh nhân</p>
                <p className="text-2xl font-black text-gray-900">2,540</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center"><CheckCircle2 size={24}/></div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Khám hôm nay</p>
                <p className="text-2xl font-black text-gray-900">120</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center"><Calendar size={24}/></div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Lịch ngày mai</p>
                <p className="text-2xl font-black text-gray-900">52</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition">
              <div className="w-12 h-12 bg-pink-50 text-pink-500 rounded-2xl flex items-center justify-center"><Heart size={24}/></div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Mức độ hài lòng</p>
                <p className="text-2xl font-black text-gray-900">98%</p>
              </div>
            </div>
          </div>

          {/* 4. THANH TÌM KIẾM & BỘ LỌC */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col lg:flex-row gap-4 justify-between items-center">
            <div className="flex-1 flex gap-4 w-full">
              <div className="relative flex-1">
                <input type="text" placeholder="Tên bệnh nhân, SĐT, Mã BHYT..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition"/>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
              </div>
              <select className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none">
                <option>Tất cả trạng thái</option>
                <option>Đang điều trị</option>
                <option>Tái khám</option>
                <option>Đã khỏi</option>
              </select>
              <button className="bg-gray-100 text-gray-600 px-4 py-2.5 rounded-xl hover:bg-gray-200 transition flex items-center gap-2 text-sm font-bold">
                <Filter size={16}/> Lọc
              </button>
              <button className="bg-gray-100 text-gray-600 px-4 py-2.5 rounded-xl hover:bg-gray-200 transition flex items-center gap-2 text-sm font-bold">
                <RefreshCcw size={16}/> Mới
              </button>
            </div>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#2563EB] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-md shadow-blue-500/30 flex items-center gap-2 whitespace-nowrap w-full lg:w-auto"
            >
              <UserPlus size={18}/> Thêm bệnh nhân
            </button>
          </div>

          {/* 5. MASTER - DETAIL LAYOUT */}
          <div className="flex gap-8 items-start">
            
            {/* MASTER: DANH SÁCH BỆNH NHÂN (65%) */}
            <div className="w-[65%] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs font-bold">
                  <tr>
                    <th className="px-6 py-4">Bệnh nhân</th>
                    <th className="px-6 py-4">Liên hệ</th>
                    <th className="px-6 py-4">Khám chuyên khoa</th>
                    <th className="px-6 py-4">Trạng thái</th>
                    <th className="px-6 py-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {patients.map((p) => (
                    <tr 
                      key={p.id} 
                      onClick={() => setSelectedPatient(p.id)}
                      className={`cursor-pointer transition hover:bg-blue-50/50 ${selectedPatient === p.id ? 'bg-blue-50' : 'bg-white'}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={`https://ui-avatars.com/api/?name=${p.name.replace(/ /g, '+')}&background=random`} alt={p.name} className="w-10 h-10 rounded-full border border-gray-200"/>
                          <div>
                            <p className="font-bold text-gray-900">{p.name}</p>
                            <p className="text-xs text-gray-500">{p.code} • {p.age} tuổi</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {p.phone}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{p.doctor}</p>
                        <p className="text-xs text-gray-500">{p.spec}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${p.statusColor}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-gray-400 hover:text-[#2563EB] hover:bg-blue-50 rounded-lg transition"><Eye size={16}/></button>
                          <button className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition"><Edit size={16}/></button>
                          <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"><Trash2 size={16}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                <span>Hiển thị 1 - 4 của 2,540</span>
                <div className="flex gap-1">
                  <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Trước</button>
                  <button className="px-3 py-1 bg-[#2563EB] text-white rounded">1</button>
                  <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">2</button>
                  <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Sau</button>
                </div>
              </div>
            </div>

            {/* DETAIL: THẺ THÔNG TIN BỆNH NHÂN (35%) */}
            <div className="w-[35%] flex flex-col gap-6 sticky top-0">
              
              {/* Card Profile */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
                <div className="h-24 bg-gradient-to-r from-[#2563EB] to-blue-400 relative">
                  <button className="absolute top-4 right-4 bg-white/20 p-2 rounded-lg text-white hover:bg-white/30 backdrop-blur-sm transition">
                    <QrCode size={18}/>
                  </button>
                </div>
                <div className="px-6 pb-6 relative">
                  <img src={`https://ui-avatars.com/api/?name=${activePatient.name.replace(/ /g, '+')}&background=random`} alt={activePatient.name} className="w-20 h-20 rounded-2xl border-4 border-white absolute -top-10 bg-white shadow-md"/>
                  
                  <div className="pt-12">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 leading-tight flex items-center gap-2">
                          {activePatient.name}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">{activePatient.gender} • {activePatient.age} tuổi • BHYT Hợp lệ</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase border whitespace-nowrap h-fit ${activePatient.statusColor}`}>
                        {activePatient.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <p className="flex items-center gap-2 text-gray-600"><Phone size={14}/> <span className="font-semibold text-gray-900">{activePatient.phone}</span></p>
                      <p className="flex items-center gap-2 text-gray-600"><Droplets size={14} className="text-red-500"/> <span className="font-semibold text-gray-900">{activePatient.blood}</span></p>
                      <p className="col-span-2 flex items-center gap-2 text-gray-600"><Mail size={14}/> <span className="font-semibold text-gray-900">{activePatient.email}</span></p>
                    </div>

                    <div className="flex gap-2 mb-2">
                      <button className="flex-1 bg-[#2563EB] text-white py-2 rounded-xl text-sm font-bold shadow-md hover:bg-blue-700 transition">Hồ sơ trọn bộ</button>
                      <button className="flex-1 bg-white border border-gray-200 text-gray-700 py-2 rounded-xl text-sm font-bold hover:bg-gray-50 transition">Đặt lịch hẹn</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bệnh án & Hoạt động gần đây */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-5 text-sm flex items-center justify-between">
                  Hoạt động gần đây <Link href="#" className="text-[#2563EB] font-normal hover:underline">Xem tất cả</Link>
                </h3>
                <div className="space-y-5">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0 border border-green-100"><FileText size={18}/></div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Khám Nội tổng quát</p>
                      <p className="text-xs text-gray-500 mt-0.5">BS. Nguyễn Văn Bình • 15/08/2026</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-100"><TestTube size={18}/></div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Trả kết quả xét nghiệm máu</p>
                      <p className="text-xs text-gray-500 mt-0.5">Phòng Xét Nghiệm • 14/08/2026</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100"><Pill size={18}/></div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Nhận đơn thuốc mới</p>
                      <p className="text-xs text-gray-500 mt-0.5">Nhà thuốc A • 10/08/2026</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>

      {/* ==========================================
          MODAL: THÊM BỆNH NHÂN MỚI
      ========================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2"><UserPlus className="text-[#2563EB]"/> Thêm bệnh nhân mới</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-red-500 transition bg-white rounded-lg p-1 shadow-sm border border-gray-200"><X size={20}/></button>
            </div>
            <div className="p-6">
              <form className="grid grid-cols-2 gap-5">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Họ và tên <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none" placeholder="Nguyễn Văn A" />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Mã BHYT</label>
                  <input type="text" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none" placeholder="Nhập mã thẻ..." />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Ngày sinh</label>
                  <input type="date" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-gray-600" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Giới tính</label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-gray-600 bg-white">
                    <option>Nam</option>
                    <option>Nữ</option>
                    <option>Khác</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Số điện thoại</label>
                  <input type="tel" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none" placeholder="09xx..." />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                  <input type="email" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none" placeholder="email@example.com" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Địa chỉ</label>
                  <input type="text" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none" placeholder="Số nhà, đường, quận..." />
                </div>
                <div className="col-span-2 pt-4 border-t border-gray-100 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-6 py-2.5 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition">Hủy</button>
                  <button type="button" className="px-8 py-2.5 rounded-xl font-bold text-white bg-[#2563EB] hover:bg-blue-700 shadow-md transition flex items-center gap-2"><CheckCircle2 size={18}/> Lưu hồ sơ</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}