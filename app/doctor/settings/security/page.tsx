'use client';
import React from 'react';
import { Lock, Shield, Laptop, Smartphone, CheckCircle2 } from 'lucide-react';
import DoctorSidebar from '@/app/doctor/Sidebar';

export default function SecuritySettingsPage() {
  return (
    <div className="min-h-screen flex bg-[#F8FAFC] font-sans text-gray-800">
      <DoctorSidebar activePage="settings/security" />
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Bảo mật tài khoản</h1>
        <p className="text-slate-500 mt-1 text-sm">Quản lý mật khẩu và các tùy chọn bảo mật để bảo vệ tài khoản của bạn.</p>
      </div>

      <div className="flex flex-col gap-6 animate-in fade-in duration-300">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Lock size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Đổi mật khẩu</h2>
              <p className="text-sm text-slate-500">Đảm bảo tài khoản của bạn đang sử dụng mật khẩu mạnh.</p>
            </div>
          </div>

          <div className="p-6">
            <div className="max-w-md flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mật khẩu hiện tại</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mật khẩu mới</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Xác nhận mật khẩu mới</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm" />
              </div>
              <button className="w-fit mt-2 px-6 py-2 bg-slate-800 text-white font-medium rounded-xl hover:bg-slate-900 transition-colors text-sm">
                Cập nhật mật khẩu
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                    <Shield size={18} />
                  </div>
                  <h3 className="font-bold text-slate-800">Xác thực hai bước (2FA)</h3>
                </div>
                <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg flex items-center gap-1">
                  <CheckCircle2 size={12} /> Đã bật
                </span>
              </div>
              <p className="text-sm text-slate-600 mb-6 flex-1">
                Bảo vệ tài khoản của bạn bằng cách yêu cầu mã xác minh từ ứng dụng Authenticator khi đăng nhập.
              </p>
              <button className="w-full px-4 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors text-sm">
                Quản lý xác thực
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6">
              <h3 className="font-bold text-slate-800 mb-4">Thiết bị đăng nhập gần đây</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 text-slate-500 rounded-lg">
                      <Laptop size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 text-sm">Windows PC - Chrome</p>
                      <p className="text-xs text-slate-500">Hồ Chí Minh, VN • Đang hoạt động</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 text-slate-500 rounded-lg">
                      <Smartphone size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 text-sm">iPhone 14 Pro - Safari</p>
                      <p className="text-xs text-slate-500">Hồ Chí Minh, VN • 2 ngày trước</p>
                    </div>
                  </div>
                  <button className="text-sm text-red-600 font-medium hover:underline">
                    Đăng xuất
                  </button>
                </div>
              </div>
              <button className="mt-6 w-full px-4 py-2 text-red-600 bg-red-50 font-medium rounded-xl hover:bg-red-100 transition-colors text-sm">
                Đăng xuất tất cả thiết bị
              </button>
            </div>
          </div>
        </div>
      </div>
        </div>
      </main>
    </div>
  );
}
