'use client';
import React, { useState, useEffect } from 'react';
import { AlertCircle, Clock, Loader2 } from 'lucide-react';
import DoctorSidebar from '@/app/doctor/Sidebar';
import { getDoctorProfileData, updateDoctorProfileData } from '@/app/doctor/settings/profile/actions';

export default function ScheduleSettingsPage() {
  const [schedule, setSchedule] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    async function loadData() {
      const res = await getDoctorProfileData();
      if (res.success && res.data) {
        setSchedule((res.data.schedule as any[]) || []);
        // Get today's date formatted
        setLastUpdated(new Date().toLocaleDateString('vi-VN'));
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] font-sans text-gray-800">
      <DoctorSidebar activePage="settings/schedule" />
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-8 max-w-4xl mx-auto">
          <div className="mb-6 flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Lịch làm việc</h1>
              <p className="text-slate-500 mt-1 text-sm">Xem lịch làm việc mặc định được Lễ tân phân công.</p>
            </div>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold border border-blue-100">
              Chỉ xem
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-300">
            <div className="p-6">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex gap-3">
                <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={18} />
                <div className="text-sm text-amber-800">
                  <strong>Lưu ý:</strong> Lịch làm việc chính thức do bộ phận Lễ tân và Admin phân công. Nếu bạn có nhu cầu nghỉ phép hoặc đổi ca, vui lòng liên hệ trực tiếp hoặc gửi yêu cầu trên hệ thống.
                </div>
              </div>

              <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2 text-sm">
                <Clock size={16} className="text-blue-500" /> 
                Ca làm việc định kỳ
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {schedule.length > 0 ? (
                  schedule.map((item, index) => (
                    <div key={index} className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-slate-800">{item.day.split(' - ')[0]}</span>
                        <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${
                          item.time.includes('08:00') && !item.time.includes('17:00') ? 'bg-green-100 text-green-700' :
                          item.time.includes('13:30') || item.time.includes('13:00') ? 'bg-orange-100 text-orange-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {item.time.includes('08:00') && item.time.includes('17:00') ? 'Cả ngày' :
                           item.time.includes('08:00') ? 'Sáng' : 'Chiều'}
                        </span>
                      </div>
                      <div className="text-sm text-slate-600 flex flex-col gap-1">
                        <div className="flex justify-between">
                          <span>Thời gian:</span>
                          <span className="font-medium text-slate-800">{item.time}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Phòng khám:</span>
                          <span className="font-medium text-slate-800">{item.room || 'Phòng 201'}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-1 md:col-span-2 text-center py-8 text-slate-500 border border-dashed border-slate-200 rounded-xl">
                    Chưa có lịch làm việc nào được phân công.
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
              <span className="text-sm text-slate-500">Cập nhật lần cuối: {lastUpdated}</span>
              <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors text-sm shadow-sm">
                Gửi yêu cầu đổi lịch
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
