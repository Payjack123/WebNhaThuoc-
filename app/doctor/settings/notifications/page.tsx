'use client';
import React from 'react';
import DoctorSidebar from '@/app/doctor/Sidebar';

export default function NotificationSettingsPage() {
  const Toggle = ({ defaultChecked = false }: { defaultChecked?: boolean }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  );

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] font-sans text-gray-800">
      <DoctorSidebar activePage="settings/notifications" />
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Cài đặt Thông báo</h1>
        <p className="text-slate-500 mt-1 text-sm">Tùy chỉnh các thông báo bạn muốn nhận từ hệ thống.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-300">
        <div className="p-0">
          <div className="divide-y divide-slate-100">
            <div className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div>
                <p className="font-medium text-slate-800">Lịch hẹn mới</p>
                <p className="text-sm text-slate-500 mt-0.5">Nhận thông báo khi có bệnh nhân đặt lịch khám mới.</p>
              </div>
              <Toggle defaultChecked={true} />
            </div>

            <div className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div>
                <p className="font-medium text-slate-800">Bệnh nhân check-in</p>
                <p className="text-sm text-slate-500 mt-0.5">Thông báo khi bệnh nhân đã đến phòng khám và hoàn tất thủ tục.</p>
              </div>
              <Toggle defaultChecked={true} />
            </div>

            <div className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div>
                <p className="font-medium text-slate-800">Có kết quả xét nghiệm</p>
                <p className="text-sm text-slate-500 mt-0.5">Báo hiệu khi có kết quả xét nghiệm mới của bệnh nhân.</p>
              </div>
              <Toggle defaultChecked={true} />
            </div>

            <div className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div>
                <p className="font-medium text-slate-800">Bệnh nhân hủy lịch</p>
                <p className="text-sm text-slate-500 mt-0.5">Thông báo khi bệnh nhân hủy lịch khám đã hẹn.</p>
              </div>
              <Toggle defaultChecked={true} />
            </div>

            <div className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div>
                <p className="font-medium text-slate-800">Nhắc lịch khám</p>
                <p className="text-sm text-slate-500 mt-0.5">Thông báo nhắc nhở 30 phút trước khi bắt đầu ca làm việc.</p>
              </div>
              <Toggle defaultChecked={true} />
            </div>

            <div className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div>
                <p className="font-medium text-slate-800">Thông báo Email</p>
                <p className="text-sm text-slate-500 mt-0.5">Nhận bản tóm tắt lịch trình qua email mỗi buổi sáng.</p>
              </div>
              <Toggle defaultChecked={false} />
            </div>
          </div>
        </div>
      </div>
        </div>
      </main>
    </div>
  );
}
