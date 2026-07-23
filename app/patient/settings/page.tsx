'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, CalendarDays, FileText, Pill, TestTube, 
  Bell, Settings, LogOut, Search, Activity, User, Wallet, 
  ShieldCheck, Lock, Smartphone, Monitor, AlertTriangle, 
  Camera, CheckCircle2, Mail, Phone, Trash2, KeyRound
} from 'lucide-react';

export default function PatientSettingsPage() {
  const router = useRouter();
  
  // Trạng thái Quản lý Tab
  const [activeTab, setActiveTab] = useState('profile');

  // Trạng thái Tắt/Bật thông báo (Mock)
  const [notiSettings, setNotiSettings] = useState({
    appointment: true,
    labResult: true,
    prescription: true,
    billing: false,
    email: true,
    sms: true
  });

  const handleLogout = () => {
    router.push('/login');
  };

  const toggleNoti = (key: keyof typeof notiSettings) => {
    setNotiSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] font-sans text-gray-800 overflow-hidden">
      
      {/* ==========================================
          1. SIDEBAR
      ========================================== */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0 shrink-0 shadow-sm z-20">
        <div className="h-20 flex items-center justify-center border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Activity className="text-[#2563EB]" size={28}/>
            <span className="font-black text-xl tracking-tight text-gray-900">HEALTH<span className="text-[#2563EB]">CARE</span></span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-4 custom-scrollbar">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">Menu chính</p>
          
          <Link href="/patient/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] rounded-2xl transition-all text-sm font-semibold">
            <LayoutDashboard size={18}/> Tổng quan
          </Link>
          <Link href="/patient/appointments" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] rounded-2xl transition-all text-sm font-semibold">
            <CalendarDays size={18}/> Đặt & Lịch khám
          </Link>
          <Link href="/patient/records" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] rounded-2xl transition-all text-sm font-semibold">
            <FileText size={18}/> Hồ sơ sức khỏe
          </Link>
          <Link href="/patient/prescriptions" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] rounded-2xl transition-all text-sm font-semibold">
            <Pill size={18}/> Đơn thuốc của tôi
          </Link>
          <Link href="/patient/lab-tests" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] rounded-2xl transition-all text-sm font-semibold">
            <TestTube size={18}/> Kết quả xét nghiệm
          </Link>
          <Link href="/patient/billing" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] rounded-2xl transition-all text-sm font-semibold">
            <Wallet size={18}/> Thanh toán viện phí
          </Link>

          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-6 mb-2 px-2">Tài khoản</p>
          {/* Active Menu */}
          <Link href="/patient/settings" className="flex items-center gap-3 px-4 py-3 bg-[#2563EB] text-white rounded-2xl font-bold shadow-md shadow-blue-200 transition-all text-sm">
            <Settings size={18}/> Cài đặt cá nhân
          </Link>
        </div>

        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-2xl transition-all text-sm font-bold">
            <LogOut size={18}/> Đăng xuất
          </button>
        </div>
      </aside>

      {/* ==========================================
          2. MAIN CONTENT AREA
      ========================================== */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* TOP HEADER */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 p-2 rounded-lg"><Settings className="text-[#2563EB]" size={24}/></div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Cài đặt Cá nhân</h1>
            </div>
          </div>
          <div className="flex items-center gap-5 ml-auto">
            <button className="relative p-2.5 text-gray-500 hover:bg-blue-50 hover:text-[#2563EB] rounded-full transition bg-white border border-gray-200 shadow-sm">
              <Bell size={20}/>
            </button>
            <div className="flex items-center gap-3 pl-5 border-l border-gray-200 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900 group-hover:text-[#2563EB] transition">Nguyễn Văn A</p>
                <p className="text-xs text-gray-500 font-medium">Bệnh nhân (BN001)</p>
              </div>
              <img src="https://ui-avatars.com/api/?name=Nguyễn+Văn+A&background=2563EB&color=fff" alt="Avatar" className="w-11 h-11 rounded-full border-2 border-white shadow-sm group-hover:shadow-md transition"/>
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 animate-in fade-in duration-500">
          
          {/* DASHBOARD MINI */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0"><User size={24}/></div>
              <div><p className="text-xs text-gray-500 font-bold uppercase">Tài khoản</p><p className="text-lg font-black text-gray-900 mt-0.5">Bệnh nhân</p></div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0"><ShieldCheck size={24}/></div>
              <div><p className="text-xs text-gray-500 font-bold uppercase">Bảo mật</p><p className="text-lg font-black text-green-600 mt-0.5">An toàn</p></div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0"><Smartphone size={24}/></div>
              <div><p className="text-xs text-gray-500 font-bold uppercase">Thiết bị</p><p className="text-lg font-black text-gray-900 mt-0.5">2</p></div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0"><Bell size={24}/></div>
              <div><p className="text-xs text-gray-500 font-bold uppercase">Thông báo</p><p className="text-lg font-black text-gray-900 mt-0.5">Đang bật</p></div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 col-span-2 md:col-span-4 lg:col-span-1">
              <div className="w-12 h-12 rounded-xl bg-gray-50 text-gray-600 flex items-center justify-center shrink-0"><Activity size={24}/></div>
              <div><p className="text-xs text-gray-500 font-bold uppercase">Trạng thái</p><p className="text-lg font-black text-[#2563EB] mt-0.5">Hoạt động</p></div>
            </div>
          </div>

          {/* MASTER-DETAIL TABS LAYOUT */}
          <div className="flex flex-col xl:flex-row gap-8 h-[calc(100vh-280px)] min-h-[600px]">
            
            {/* CỘT TRÁI: Dịch vụ Tabs */}
            <div className="xl:w-[25%] flex flex-col gap-2 shrink-0">
              {[
                { id: 'profile', label: 'Hồ sơ cá nhân', icon: User },
                { id: 'security', label: 'Bảo mật & Mật khẩu', icon: Lock },
                { id: 'notifications', label: 'Cài đặt thông báo', icon: Bell },
                { id: 'devices', label: 'Thiết bị đăng nhập', icon: Monitor },
                { id: 'privacy', label: 'Quyền riêng tư', icon: ShieldCheck, isDanger: true },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all text-sm w-full text-left
                    ${activeTab === tab.id 
                      ? tab.isDanger ? 'bg-red-50 text-red-600 border border-red-200 shadow-sm' : 'bg-white text-[#2563EB] border border-blue-200 shadow-sm' 
                      : 'bg-transparent text-gray-600 hover:bg-white hover:border-gray-200 border border-transparent'
                    }`}
                >
                  <tab.icon size={20}/> {tab.label}
                </button>
              ))}
            </div>

            {/* CỘT PHẢI: Nội dung chi tiết Tab */}
            <div className="xl:w-[75%] bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col relative overflow-hidden">
              
              {/* TAB 1: HỒ SƠ CÁ NHÂN */}
              {activeTab === 'profile' && (
                <div className="p-8 h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 overflow-y-auto custom-scrollbar">
                  <div className="border-b border-gray-100 pb-5 mb-6">
                    <h2 className="text-2xl font-black text-gray-900">Hồ sơ cá nhân</h2>
                    <p className="text-gray-500 text-sm mt-1">Cập nhật thông tin cá nhân và ảnh đại diện của bạn.</p>
                  </div>

                  <div className="flex flex-col md:flex-row gap-8 mb-8">
                    <div className="flex flex-col items-center gap-3">
                      <div className="relative group cursor-pointer">
                        <img src="https://ui-avatars.com/api/?name=Nguyễn+Văn+A&background=2563EB&color=fff&size=128" alt="Avatar" className="w-32 h-32 rounded-full border-4 border-white shadow-md"/>
                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Camera className="text-white" size={24}/>
                        </div>
                      </div>
                      <button className="text-sm font-bold text-[#2563EB] hover:underline">Thay đổi ảnh</button>
                    </div>
                    
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Họ và tên</label>
                        <input type="text" defaultValue="Nguyễn Văn A" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none font-medium text-gray-900"/>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Mã bệnh nhân</label>
                        <input type="text" defaultValue="BN0001" disabled className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-sm outline-none font-bold text-gray-500 cursor-not-allowed"/>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Email</label>
                        <input type="email" defaultValue="nguyenvana@gmail.com" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none font-medium text-gray-900"/>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Số điện thoại</label>
                        <input type="text" defaultValue="0981.234.567" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none font-medium text-gray-900"/>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Ngày sinh</label>
                        <input type="date" defaultValue="2003-05-20" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none font-medium text-gray-900"/>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Giới tính</label>
                        <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none font-medium text-gray-900">
                          <option>Nam</option><option>Nữ</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Địa chỉ hiện tại</label>
                        <input type="text" defaultValue="Quận Cầu Giấy, Hà Nội" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none font-medium text-gray-900"/>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto border-t border-gray-100 pt-5 flex justify-end">
                    <button className="bg-[#2563EB] text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-md transition-all">Lưu thay đổi</button>
                  </div>
                </div>
              )}

              {/* TAB 2: BẢO MẬT & MẬT KHẨU */}
              {activeTab === 'security' && (
                <div className="p-8 h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 overflow-y-auto custom-scrollbar">
                  <div className="border-b border-gray-100 pb-5 mb-6">
                    <h2 className="text-2xl font-black text-gray-900">Bảo mật tài khoản</h2>
                    <p className="text-gray-500 text-sm mt-1">Đổi mật khẩu và tăng cường bảo mật cho tài khoản của bạn.</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
                    {/* Đổi mật khẩu */}
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 h-max">
                      <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2"><KeyRound size={18} className="text-[#2563EB]"/> Đổi mật khẩu</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 mb-1.5">MẬT KHẨU HIỆN TẠI</label>
                          <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none"/>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 mb-1.5">MẬT KHẨU MỚI</label>
                          <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none"/>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 mb-1.5">XÁC NHẬN MẬT KHẨU MỚI</label>
                          <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none"/>
                        </div>
                        <button className="w-full bg-[#2563EB] text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-sm transition-all mt-2">Cập nhật mật khẩu</button>
                      </div>
                    </div>

                    {/* Xác thực 2 bước */}
                    <div className="space-y-4">
                      <div className="border border-gray-200 p-5 rounded-2xl flex items-center justify-between">
                        <div className="flex gap-3 items-center">
                          <div className="bg-blue-50 p-2.5 rounded-lg text-[#2563EB]"><ShieldCheck size={20}/></div>
                          <div>
                            <p className="font-bold text-gray-900">Xác thực 2 bước (2FA)</p>
                            <p className="text-xs text-gray-500 mt-0.5">Tăng cường bảo mật qua ứng dụng.</p>
                          </div>
                        </div>
                        {/* Fake Toggle */}
                        <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                          <div className="absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow"></div>
                        </div>
                      </div>

                      <div className="border border-green-200 bg-green-50 p-5 rounded-2xl flex items-center justify-between">
                        <div className="flex gap-3 items-center">
                          <div className="bg-white p-2.5 rounded-lg text-green-600 shadow-sm"><Mail size={20}/></div>
                          <div>
                            <p className="font-bold text-gray-900">Email khôi phục</p>
                            <p className="text-xs text-gray-500 mt-0.5">nguyenvana@gmail.com</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-green-700 bg-green-200 px-2.5 py-1 rounded flex items-center gap-1"><CheckCircle2 size={12}/> Đã xác minh</span>
                      </div>

                      <div className="border border-green-200 bg-green-50 p-5 rounded-2xl flex items-center justify-between">
                        <div className="flex gap-3 items-center">
                          <div className="bg-white p-2.5 rounded-lg text-green-600 shadow-sm"><Phone size={20}/></div>
                          <div>
                            <p className="font-bold text-gray-900">Số điện thoại</p>
                            <p className="text-xs text-gray-500 mt-0.5">0981.234.567</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-green-700 bg-green-200 px-2.5 py-1 rounded flex items-center gap-1"><CheckCircle2 size={12}/> Đã xác minh</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: CÀI ĐẶT THÔNG BÁO */}
              {activeTab === 'notifications' && (
                <div className="p-8 h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 overflow-y-auto custom-scrollbar">
                  <div className="border-b border-gray-100 pb-5 mb-6">
                    <h2 className="text-2xl font-black text-gray-900">Cài đặt Thông báo</h2>
                    <p className="text-gray-500 text-sm mt-1">Chọn loại thông báo bạn muốn nhận từ hệ thống.</p>
                  </div>

                  <div className="max-w-2xl space-y-6">
                    <div>
                      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Thông báo trong ứng dụng</h3>
                      <div className="border border-gray-200 rounded-2xl overflow-hidden divide-y divide-gray-100">
                        <div className="p-4 flex justify-between items-center bg-white hover:bg-gray-50 transition cursor-pointer" onClick={() => toggleNoti('appointment')}>
                          <div><p className="font-bold text-gray-900">Nhắc lịch khám & Tái khám</p><p className="text-xs text-gray-500 mt-0.5">Nhận thông báo trước 1 ngày và trước 2 giờ.</p></div>
                          <div className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${notiSettings.appointment ? 'bg-[#2563EB]' : 'bg-gray-300'}`}><div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${notiSettings.appointment ? 'translate-x-6' : 'translate-x-1'}`}></div></div>
                        </div>
                        <div className="p-4 flex justify-between items-center bg-white hover:bg-gray-50 transition cursor-pointer" onClick={() => toggleNoti('labResult')}>
                          <div><p className="font-bold text-gray-900">Có kết quả xét nghiệm mới</p><p className="text-xs text-gray-500 mt-0.5">Thông báo ngay khi bác sĩ trả kết quả.</p></div>
                          <div className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${notiSettings.labResult ? 'bg-[#2563EB]' : 'bg-gray-300'}`}><div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${notiSettings.labResult ? 'translate-x-6' : 'translate-x-1'}`}></div></div>
                        </div>
                        <div className="p-4 flex justify-between items-center bg-white hover:bg-gray-50 transition cursor-pointer" onClick={() => toggleNoti('prescription')}>
                          <div><p className="font-bold text-gray-900">Đơn thuốc & Nhắc uống thuốc</p><p className="text-xs text-gray-500 mt-0.5">Thông báo khi có đơn mới và nhắc giờ uống thuốc.</p></div>
                          <div className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${notiSettings.prescription ? 'bg-[#2563EB]' : 'bg-gray-300'}`}><div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${notiSettings.prescription ? 'translate-x-6' : 'translate-x-1'}`}></div></div>
                        </div>
                        <div className="p-4 flex justify-between items-center bg-white hover:bg-gray-50 transition cursor-pointer" onClick={() => toggleNoti('billing')}>
                          <div><p className="font-bold text-gray-900">Nhắc nhở thanh toán viện phí</p><p className="text-xs text-gray-500 mt-0.5">Thông báo hóa đơn chưa thanh toán hoặc quá hạn.</p></div>
                          <div className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${notiSettings.billing ? 'bg-[#2563EB]' : 'bg-gray-300'}`}><div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${notiSettings.billing ? 'translate-x-6' : 'translate-x-1'}`}></div></div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Kênh thông báo khác</h3>
                      <div className="border border-gray-200 rounded-2xl overflow-hidden divide-y divide-gray-100">
                        <div className="p-4 flex justify-between items-center bg-white hover:bg-gray-50 transition cursor-pointer" onClick={() => toggleNoti('email')}>
                          <div className="flex items-center gap-3"><Mail size={20} className="text-gray-400"/><p className="font-bold text-gray-900">Nhận qua Email</p></div>
                          <div className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${notiSettings.email ? 'bg-green-500' : 'bg-gray-300'}`}><div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${notiSettings.email ? 'translate-x-6' : 'translate-x-1'}`}></div></div>
                        </div>
                        <div className="p-4 flex justify-between items-center bg-white hover:bg-gray-50 transition cursor-pointer" onClick={() => toggleNoti('sms')}>
                          <div className="flex items-center gap-3"><Smartphone size={20} className="text-gray-400"/><p className="font-bold text-gray-900">Nhận qua SMS (Khuyên dùng)</p></div>
                          <div className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${notiSettings.sms ? 'bg-green-500' : 'bg-gray-300'}`}><div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${notiSettings.sms ? 'translate-x-6' : 'translate-x-1'}`}></div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: THIẾT BỊ ĐĂNG NHẬP */}
              {activeTab === 'devices' && (
                <div className="p-8 h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 overflow-y-auto custom-scrollbar">
                  <div className="border-b border-gray-100 pb-5 mb-6 flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-black text-gray-900">Thiết bị & Phiên đăng nhập</h2>
                      <p className="text-gray-500 text-sm mt-1">Quản lý các thiết bị đang đăng nhập tài khoản của bạn.</p>
                    </div>
                    <button className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-red-100 transition hidden md:block">
                      Đăng xuất tất cả thiết bị khác
                    </button>
                  </div>

                  <div className="space-y-4 max-w-3xl">
                    <div className="border border-[#2563EB] bg-blue-50/30 p-5 rounded-2xl flex items-center justify-between shadow-sm relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2563EB]"></div>
                      <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 bg-white text-[#2563EB] rounded-xl flex items-center justify-center shadow-sm border border-blue-100"><Monitor size={24}/></div>
                        <div>
                          <p className="font-bold text-gray-900">Windows 11 • Trình duyệt Chrome</p>
                          <p className="text-sm text-gray-500 mt-0.5">IP: 192.168.1.100 • Hà Nội, Việt Nam</p>
                          <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold text-green-700 bg-green-100 border border-green-200">Thiết bị hiện tại</span>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 p-5 rounded-2xl flex items-center justify-between hover:bg-gray-50 transition group">
                      <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 bg-gray-100 text-gray-500 rounded-xl flex items-center justify-center"><Smartphone size={24}/></div>
                        <div>
                          <p className="font-bold text-gray-900">iPhone 14 Pro • App Y tế</p>
                          <p className="text-sm text-gray-500 mt-0.5">Lần cuối: 2 ngày trước • Hà Nội, Việt Nam</p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition" title="Đăng xuất thiết bị này">
                        <LogOut size={20}/>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: QUYỀN RIÊNG TƯ (DANGER ZONE) */}
              {activeTab === 'privacy' && (
                <div className="p-8 h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 overflow-y-auto custom-scrollbar">
                  <div className="border-b border-gray-100 pb-5 mb-6">
                    <h2 className="text-2xl font-black text-gray-900">Quyền riêng tư & Dữ liệu</h2>
                    <p className="text-gray-500 text-sm mt-1">Quản lý cách dữ liệu của bạn được sử dụng trong hệ thống.</p>
                  </div>

                  <div className="max-w-2xl space-y-8">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Trích xuất dữ liệu</h3>
                      <p className="text-sm text-gray-600 mb-4">Bạn có thể yêu cầu tải xuống toàn bộ dữ liệu khám chữa bệnh, lịch sử giao dịch và thông tin cá nhân dưới định dạng PDF/CSV.</p>
                      <button className="bg-gray-100 border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-200 transition">Yêu cầu trích xuất</button>
                    </div>

                    <div className="border-t border-gray-200 pt-8">
                      <div className="border-2 border-red-200 bg-red-50 rounded-2xl p-6">
                        <h3 className="font-black text-red-700 mb-2 flex items-center gap-2 text-lg"><AlertTriangle size={20}/> Khu vực nguy hiểm (Xóa tài khoản)</h3>
                        <p className="text-sm text-red-900/80 mb-6 leading-relaxed">
                          Hành động này sẽ xóa vĩnh viễn tài khoản, hồ sơ bệnh án và lịch sử giao dịch của bạn khỏi hệ thống. Vì lý do y tế, yêu cầu này cần được quản trị viên phê duyệt. <strong>Dữ liệu không thể khôi phục sau khi xóa.</strong>
                        </p>
                        <button className="bg-red-600 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-red-700 shadow-sm transition-all flex items-center gap-2">
                          <Trash2 size={16}/> Gửi yêu cầu xóa tài khoản
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </main>

    </div>
  );
}