'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Users, CalendarDays, FileText, Pill, TestTube, 
  Bell, Settings, LogOut, Search, Activity, User, Building2, 
  ShieldCheck, History, Wallet, HardDrive, 
  CheckCircle2, Save, Mail, Smartphone, Clock, CloudUpload, RefreshCw
} from 'lucide-react';

export default function AdminSettingsPage() {
  const router = useRouter();
  
  // State quản lý Tab đang active
  const [activeTab, setActiveTab] = useState('clinic');
  const [isSaving, setIsSaving] = useState(false);

  const handleLogout = () => {
    router.push('/login');
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Đã lưu cấu hình thành công!');
    }, 1000);
  };

  // Danh sách các tab cài đặt
  const tabs = [
    { id: 'clinic', icon: Building2, label: 'Thông tin phòng khám' },
    { id: 'hours', icon: Clock, label: 'Giờ làm việc' },
    { id: 'appointments', icon: CalendarDays, label: 'Cấu hình lịch khám' },
    { id: 'notifications', icon: Bell, label: 'Thông báo hệ thống' },
    { id: 'email_sms', icon: Mail, label: 'Cấu hình Email & SMS' },
    { id: 'security', icon: ShieldCheck, label: 'Bảo mật hệ thống' },
    { id: 'backup', icon: HardDrive, label: 'Sao lưu dữ liệu' },
    { id: 'logs', icon: History, label: 'Nhật ký hệ thống' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans text-gray-800 overflow-hidden">
      
      {/* ==========================================
          1. SIDEBAR (Giữ nguyên cấu trúc, active mục Settings)
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
            <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <LayoutDashboard size={18}/> Dashboard & Báo cáo
            </Link>
          </div>

          {/* Nhóm 2 & 3: Lược bớt để tập trung code hiển thị */}
          <div className="space-y-1">
            <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">2. Quản lý</p>
            <Link href="/admin/doctors" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <User size={18}/> Quản lý Bác sĩ
            </Link>
            <Link href="/admin/patients" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <Users size={18}/> Quản lý Bệnh nhân
            </Link>
            {/* Các link khác... */}
          </div>

          {/* Nhóm 4: Cấu hình (Đang Active) */}
          <div className="space-y-1">
            <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">4. Cấu hình</p>
            <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-2.5 bg-[#2563EB] text-white rounded-xl font-medium shadow-md transition-all text-sm">
              <Settings size={18}/> Cài đặt hệ thống
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
            <div className="bg-blue-50 p-2 rounded-lg"><Settings className="text-[#2563EB]" size={24}/></div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Cài đặt hệ thống</h1>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                Quản lý các thiết lập chung của phòng khám và toàn bộ hệ thống.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative group">
              <input type="text" placeholder="Tìm kiếm cài đặt..." className="pl-10 pr-4 py-2 bg-gray-100 border border-transparent rounded-full text-sm focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 w-64 transition-all outline-none"/>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2563EB] transition-colors" size={16}/>
            </div>
            <div className="flex items-center gap-4 pl-6 border-l border-gray-200">
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-bold text-gray-900">Quản trị viên</p>
                  <p className="text-xs text-gray-500">Super Admin</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#172554] text-white flex items-center justify-center font-bold border-2 border-white shadow-sm">AD</div>
              </div>
            </div>
          </div>
        </header>

        {/* SETTINGS CONTENT (Tab Layout) */}
        <div className="flex-1 overflow-y-auto p-8 animate-in fade-in duration-500">
          <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
            
            {/* Cột trái: Tab Navigation */}
            <div className="w-full lg:w-72 shrink-0">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 space-y-1 sticky top-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeTab === tab.id 
                        ? 'bg-blue-50 text-[#2563EB]' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <tab.icon size={18} className={activeTab === tab.id ? 'text-[#2563EB]' : 'text-gray-400'} />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cột phải: Tab Content */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[500px] flex flex-col">
                
                {/* 1. THÔNG TIN PHÒNG KHÁM */}
                {activeTab === 'clinic' && (
                  <div className="flex-1 animate-in fade-in slide-in-from-right-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b pb-4"><Building2 className="text-blue-600"/> Cập nhật thông tin phòng khám</h2>
                    <div className="space-y-5">
                      <div className="grid grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Tên phòng khám</label>
                          <input type="text" defaultValue="Healthcare Clinic" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Hotline</label>
                          <input type="text" defaultValue="1900 1234" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Địa chỉ</label>
                        <input type="text" defaultValue="123 Nguyễn Trãi, Thanh Xuân, Hà Nội" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition" />
                      </div>
                      <div className="grid grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Email liên hệ</label>
                          <input type="email" defaultValue="contact@healthcare.vn" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Website</label>
                          <input type="text" defaultValue="www.healthcare.vn" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. GIỜ LÀM VIỆC */}
                {activeTab === 'hours' && (
                  <div className="flex-1 animate-in fade-in slide-in-from-right-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b pb-4"><Clock className="text-blue-600"/> Cấu hình giờ làm việc</h2>
                    <div className="space-y-4">
                      {['Thứ 2 - Thứ 6', 'Thứ 7', 'Chủ nhật'].map((day, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                          <span className="font-bold text-gray-700 w-32">{day}</span>
                          {day === 'Chủ nhật' ? (
                            <span className="px-4 py-1.5 bg-red-100 text-red-600 font-bold text-sm rounded-lg">Nghỉ</span>
                          ) : (
                            <div className="flex items-center gap-3">
                              <input type="time" defaultValue="07:30" className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white" />
                              <span className="text-gray-400">-</span>
                              <input type="time" defaultValue={day === 'Thứ 7' ? '12:00' : '17:00'} className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. CẤU HÌNH LỊCH KHÁM */}
                {activeTab === 'appointments' && (
                  <div className="flex-1 animate-in fade-in slide-in-from-right-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b pb-4"><CalendarDays className="text-blue-600"/> Cấu hình đặt lịch khám</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Thời lượng mỗi lượt khám (Phút)</label>
                        <select defaultValue="30 Phút" className="w-full max-w-sm px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none">
                        <option>15 Phút</option>
                        <option>30 Phút</option>
                        <option>45 Phút</option>
                        <option>60 Phút</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Số bệnh nhân tối đa / bác sĩ / ngày</label>
                        <input type="number" defaultValue="25" className="w-full max-w-sm px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Giới hạn thời gian hủy lịch</label>
                        <select className="w-full max-w-sm px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none">
                          <option>Trước 12 giờ</option>
                          <option selected>Trước 24 giờ</option>
                          <option>Trước 48 giờ</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. THÔNG BÁO HỆ THỐNG */}
                {activeTab === 'notifications' && (
                  <div className="flex-1 animate-in fade-in slide-in-from-right-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b pb-4"><Bell className="text-blue-600"/> Cấu hình Tự động gửi thông báo</h2>
                    <div className="space-y-4">
                      {[
                        'Gửi Email xác nhận khi đặt lịch thành công',
                        'Gửi SMS nhắc nhở trước giờ khám 2 tiếng',
                        'Gửi thông báo khi có kết quả xét nghiệm',
                        'Gửi hóa đơn điện tử qua Email',
                        'Thông báo bảo trì hệ thống cho nhân viên'
                      ].map((item, idx) => (
                        <label key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition">
                          <input type="checkbox" defaultChecked={idx !== 4} className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                          <span className="font-medium text-gray-700">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. EMAIL & SMS */}
                {activeTab === 'email_sms' && (
                  <div className="flex-1 animate-in fade-in slide-in-from-right-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b pb-4"><Mail className="text-blue-600"/> Tích hợp API Email & SMS</h2>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">SMTP Server (Gửi Email)</label>
                          <input type="text" defaultValue="smtp.gmail.com" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">SMTP Port</label>
                          <input type="text" defaultValue="587" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Tài khoản Email gửi</label>
                        <input type="email" defaultValue="noreply@healthcare.vn" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
                      </div>
                      <div className="border-t pt-5">
                        <label className="block text-sm font-bold text-gray-700 mb-1">SMS Brandname (Tên hiển thị khi gửi tin nhắn)</label>
                        <input type="text" defaultValue="HEALTHCARE" className="w-full max-w-sm px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition">
                        <RefreshCw size={16} /> Kiểm tra kết nối API
                      </button>
                    </div>
                  </div>
                )}

                {/* 6. BẢO MẬT */}
                {activeTab === 'security' && (
                  <div className="flex-1 animate-in fade-in slide-in-from-right-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b pb-4"><ShieldCheck className="text-blue-600"/> Chính sách bảo mật</h2>
                    <div className="space-y-4">
                      {[
                        { label: 'Bật xác thực 2 lớp (2FA) cho tài khoản Admin', status: true },
                        { label: 'Ghi nhật ký hệ thống (Audit Logs) mọi thao tác', status: true },
                        { label: 'Mã hóa mật khẩu 1 chiều (Bcrypt)', status: true },
                        { label: 'Tự động đăng xuất sau 30 phút không hoạt động', status: false },
                        { label: 'Khóa tài khoản sau 5 lần nhập sai mật khẩu', status: true },
                      ].map((item, idx) => (
                        <label key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition">
                          <input type="checkbox" defaultChecked={item.status} className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                          <span className="font-medium text-gray-700">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* 7. SAO LƯU */}
                {activeTab === 'backup' && (
                  <div className="flex-1 animate-in fade-in slide-in-from-right-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b pb-4"><HardDrive className="text-blue-600"/> Quản lý Sao lưu dữ liệu</h2>
                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex justify-between items-center mb-6">
                      <div>
                        <p className="text-sm text-blue-600 font-bold mb-1">Lần sao lưu gần nhất</p>
                        <h3 className="text-2xl font-black text-gray-900">Hôm nay, 09:30 AM</h3>
                        <p className="text-xs text-gray-500 mt-1">Dung lượng: 125 MB</p>
                      </div>
                      <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md transition flex items-center gap-2">
                        <CloudUpload size={18} /> Sao lưu ngay
                      </button>
                    </div>
                    <div className="space-y-5 border-t pt-5">
                      <label className="flex items-center gap-3 cursor-pointer">
                         <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 border-gray-300 rounded" />
                         <span className="font-bold text-gray-700">Tự động sao lưu dữ liệu hằng ngày</span>
                      </label>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Vị trí lưu trữ Cloud</label>
                        <select className="w-full max-w-sm px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none">
                          <option>AWS S3 Bucket</option>
                          <option selected>Google Cloud Storage</option>
                          <option>Local Server</option>
                        </select>
                      </div>
                      <button className="mt-4 px-5 py-2 text-sm font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200 transition">
                        Khôi phục từ bản sao lưu cũ
                      </button>
                    </div>
                  </div>
                )}

                {/* 8. NHẬT KÝ */}
                {activeTab === 'logs' && (
                  <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right-4 h-full">
                    <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b pb-4"><History className="text-blue-600"/> Lịch sử thao tác hệ thống</h2>
                    <div className="flex-1 overflow-auto border border-gray-100 rounded-xl">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-bold sticky top-0">
                          <tr><th className="px-5 py-3">Thời gian</th><th className="px-5 py-3">Người thực hiện</th><th className="px-5 py-3">Hành động</th></tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                          {[
                            { time: '15/08/2026 - 10:20', user: 'Admin (System)', action: 'Cập nhật Giờ làm việc' },
                            { time: '15/08/2026 - 09:35', user: 'Admin (System)', action: 'Thêm mới Dịch vụ Xét nghiệm máu' },
                            { time: '15/08/2026 - 09:10', user: 'Admin (System)', action: 'Thêm Bác sĩ: Nguyễn Văn Bình' },
                            { time: '14/08/2026 - 17:00', user: 'System Auto', action: 'Tự động sao lưu dữ liệu (Thành công)' },
                            { time: '14/08/2026 - 14:15', user: 'Admin (System)', action: 'Đăng nhập hệ thống' },
                          ].map((log, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 transition">
                              <td className="px-5 py-3 font-medium text-gray-500">{log.time}</td>
                              <td className="px-5 py-3 font-bold text-gray-900">{log.user}</td>
                              <td className="px-5 py-3 text-blue-600 font-medium">{log.action}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* NÚT LƯU CHUNG (Ẩn ở tab Nhật ký vì chỉ để xem) */}
                {activeTab !== 'logs' && activeTab !== 'backup' && (
                  <div className="mt-8 pt-5 border-t border-gray-100 flex justify-end">
                    <button 
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-[#2563EB] text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-md transition-all flex items-center gap-2 disabled:bg-blue-400"
                    >
                      {isSaving ? (
                        <>Đang lưu...</>
                      ) : (
                        <><Save size={18}/> Lưu thay đổi</>
                      )}
                    </button>
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