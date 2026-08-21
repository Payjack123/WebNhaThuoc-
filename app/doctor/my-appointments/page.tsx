'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  CalendarDays, ChevronLeft, ChevronRight, RefreshCw, 
  Search, Eye, Edit2, MoreVertical, CheckCircle2, Clock, XCircle, Calendar
} from 'lucide-react';
import { getAllDoctorAppointments } from '@/app/doctor/my-appointments/actions';
import DoctorSidebar from '@/app/doctor/Sidebar';

export default function MyAppointmentsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('ALL'); // ALL, UPCOMING, COMPLETED, CANCELED

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getAllDoctorAppointments();
      if (res.success && res.data) {
        setData(res.data);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const total = data?.stats?.total || 0;
  const completed = data?.stats?.completed || 0;
  const upcoming = data?.stats?.upcoming || 0;
  const canceled = data?.stats?.canceled || 0;

  const getPercent = (val: number) => {
    if (total === 0) return '0%';
    return ((val / total) * 100).toFixed(1) + '%';
  };

  const getStatusStyle = (status: string) => {
    if (status === 'Đã hoàn thành') return 'bg-blue-100 text-blue-700'; // Trong ảnh Đã hoàn thành là xanh dương
    if (status === 'Đã hủy') return 'bg-red-50 text-red-500'; // Đã hủy nền cam nhạt, chữ cam/đỏ
    return 'bg-green-100 text-green-600'; // Sắp tới là xanh lá
  };

  const filteredAppointments = data?.appointments?.filter((apt: any) => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'UPCOMING') return apt.status === 'Sắp tới';
    if (activeTab === 'COMPLETED') return apt.status === 'Đã hoàn thành';
    if (activeTab === 'CANCELED') return apt.status === 'Đã hủy';
    return true;
  }) || [];

  return (
    <div className="min-h-screen flex bg-white font-sans text-gray-800">
      <DoctorSidebar activePage="my-appointments" />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Lịch hẹn của tôi</h1>
            <p className="text-sm text-gray-500 mt-1">Quản lý và theo dõi tất cả lịch hẹn khám bệnh của bạn.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                <CalendarDays size={28} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Tổng lịch hẹn</p>
                <p className="text-3xl font-black text-gray-900 mt-1 flex items-baseline gap-1">
                  {total} <span className="text-sm font-medium text-gray-500">lịch</span>
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center shrink-0">
                <CheckCircle2 size={28} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Đã hoàn thành</p>
                <p className="text-3xl font-black text-gray-900 mt-1 flex items-baseline gap-1">
                  {completed} <span className="text-sm font-medium text-gray-500">lịch</span>
                </p>
                <p className="text-xs font-bold text-gray-500 mt-1">{getPercent(completed)}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                <Clock size={28} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Sắp tới</p>
                <p className="text-3xl font-black text-gray-900 mt-1 flex items-baseline gap-1">
                  {upcoming} <span className="text-sm font-medium text-gray-500">lịch</span>
                </p>
                <p className="text-xs font-bold text-gray-500 mt-1">{getPercent(upcoming)}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <XCircle size={28} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Đã hủy</p>
                <p className="text-3xl font-black text-gray-900 mt-1 flex items-baseline gap-1">
                  {canceled} <span className="text-sm font-medium text-gray-500">lịch</span>
                </p>
                <p className="text-xs font-bold text-gray-500 mt-1">{getPercent(canceled)}</p>
              </div>
            </div>
          </div>

          {/* Filters & Tabs */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6 border-b border-gray-200 pb-4">
            <div className="flex items-center gap-6 text-sm font-bold">
              <button 
                onClick={() => setActiveTab('ALL')}
                className={`pb-4 -mb-4 border-b-2 transition-colors ${activeTab === 'ALL' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
              >
                Tất cả ({total})
              </button>
              <button 
                onClick={() => setActiveTab('UPCOMING')}
                className={`pb-4 -mb-4 border-b-2 transition-colors ${activeTab === 'UPCOMING' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
              >
                Sắp tới ({upcoming})
              </button>
              <button 
                onClick={() => setActiveTab('COMPLETED')}
                className={`pb-4 -mb-4 border-b-2 transition-colors ${activeTab === 'COMPLETED' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
              >
                Đã hoàn thành ({completed})
              </button>
              <button 
                onClick={() => setActiveTab('CANCELED')}
                className={`pb-4 -mb-4 border-b-2 transition-colors ${activeTab === 'CANCELED' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
              >
                Đã hủy ({canceled})
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-500">
                <span>Từ ngày</span>
                <Calendar size={14} />
                <span className="mx-1">&rarr;</span>
                <span>Đến ngày</span>
                <Calendar size={14} />
              </div>

              <div className="relative">
                <select className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-3 pr-8 rounded-lg text-sm font-medium focus:outline-none focus:border-blue-500 min-w-[160px]">
                  <option>Tất cả chuyên khoa</option>
                  <option>Nội tổng quát</option>
                  <option>Da liễu</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <ChevronRight size={14} className="rotate-90" />
                </div>
              </div>

              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Tìm kiếm lịch hẹn..."
                  className="pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm w-[220px] focus:outline-none focus:border-blue-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Search size={14} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-4 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider w-12 text-center">STT</th>
                  <th className="py-4 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Bệnh nhân</th>
                  <th className="py-4 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">SĐT</th>
                  <th className="py-4 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Chuyên khoa</th>
                  <th className="py-4 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">Ngày hẹn</th>
                  <th className="py-4 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">Giờ hẹn</th>
                  <th className="py-4 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Lý do khám</th>
                  <th className="py-4 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">Trạng thái</th>
                  <th className="py-4 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Ghi chú</th>
                  <th className="py-4 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isLoading ? (
                  <tr>
                    <td colSpan={10} className="py-12 text-center text-gray-500">
                      Đang tải dữ liệu...
                    </td>
                  </tr>
                ) : filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-12 text-center text-gray-500">
                      Không có lịch hẹn nào.
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((apt: any, idx: number) => {
                    const lines = apt.dateWithDay.split('\n');
                    const formattedDate = lines.length > 1 ? (
                      <div className="text-center">
                        <div className="font-bold text-gray-900">{lines[0]}</div>
                        <div className="text-gray-500">{lines[1]}</div>
                      </div>
                    ) : (
                      <div className="font-bold text-gray-900">{apt.date}</div>
                    );

                    return (
                      <tr key={apt.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-4 text-sm font-bold text-gray-900 text-center">{idx + 1}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <img src={apt.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                            <div>
                              <p className="text-sm font-bold text-gray-900">{apt.patientName}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{apt.age} tuổi - {apt.gender}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm font-bold text-gray-700">{apt.patientDetails?.phone || '--'}</td>
                        <td className="py-4 px-4 text-sm font-bold text-gray-700">{apt.room}</td>
                        <td className="py-4 px-4 text-sm">{formattedDate}</td>
                        <td className="py-4 px-4 text-sm font-bold text-gray-900 text-center">{apt.time}</td>
                        <td className="py-4 px-4 text-sm text-gray-900 max-w-[150px] truncate" title={apt.reason}>{apt.reason}</td>
                        <td className="py-4 px-4 text-center">
                          <span className={`inline-flex px-3 py-1.5 text-[11px] font-bold rounded ${getStatusStyle(apt.status)}`}>
                            {apt.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm font-bold text-gray-700">
                          {apt.rawStatus === 'ĐÃ HỦY' ? 'Bệnh nhân hủy' : apt.rawStatus === 'HOÀN THÀNH' ? `Khám định kỳ` : '—'}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center gap-1">
                            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-blue-500 hover:bg-blue-50 transition" title="Xem chi tiết">
                              <Eye size={16} />
                            </button>
                            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-blue-500 hover:bg-blue-50 transition" title="Lưu trữ">
                              <Calendar size={16} />
                            </button>
                            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition">
                              <MoreVertical size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between mt-4">
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span>Hiển thị</span>
                <select className="border border-gray-200 rounded px-2 py-1 bg-white font-medium focus:outline-none focus:border-blue-500">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
                <span>kết quả mỗi trang</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-900">&laquo;</button>
                <button className="w-8 h-8 flex items-center justify-center rounded bg-[#2563EB] text-white font-bold shadow-sm">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium">3</button>
                <span className="text-gray-400 px-1">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium">6</button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-900">&raquo;</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
