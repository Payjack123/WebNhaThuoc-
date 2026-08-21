'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  CalendarDays, ChevronLeft, ChevronRight, RefreshCw, 
  Search, Filter, Eye, Edit2, MoreVertical, CheckCircle2, Clock, XCircle, User, Stethoscope, Phone
} from 'lucide-react';
import { getDoctorAppointmentsData } from '@/app/doctor/today-appointments/actions';
import DoctorSidebar from '@/app/doctor/Sidebar';

export default function TodayAppointmentsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  
  // Lấy ngày hôm nay
  const today = new Date();
  const dateStr = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  const displayDate = today.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getDoctorAppointmentsData(dateStr);
      if (res.success && res.data) {
        setData(res.data);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [dateStr]);

  const refreshData = async () => {
    setIsLoading(true);
    const res = await getDoctorAppointmentsData(dateStr);
    if (res.success && res.data) {
      setData(res.data);
    }
    setIsLoading(false);
  };

  // Tính toán số liệu phụ (Đang khám)
  const total = data?.appointments?.length || 0;
  const completed = data?.stats?.completed || 0;
  const waiting = data?.stats?.waiting || 0;
  const canceled = data?.stats?.canceled || 0;
  const inProgress = Math.max(0, total - completed - waiting - canceled); // Giả định nếu có trạng thái khác

  const getPercent = (val: number) => {
    if (total === 0) return '0%';
    return ((val / total) * 100).toFixed(1) + '%';
  };

  const getStatusStyle = (status: string) => {
    if (status === 'HOÀN THÀNH') return 'bg-green-100 text-green-700';
    if (status === 'ĐÃ HỦY') return 'bg-gray-100 text-gray-700';
    if (status === 'ĐANG KHÁM') return 'bg-blue-100 text-blue-700';
    return 'bg-orange-100 text-orange-600'; // Đang chờ
  };

  const getStatusText = (status: string) => {
    if (status === 'HOÀN THÀNH') return 'Đã khám';
    if (status === 'ĐÃ HỦY') return 'Đã hủy';
    if (status === 'ĐANG KHÁM') return 'Đang khám';
    return 'Đang chờ'; 
  };

  const filteredAppointments = data?.appointments?.filter((apt: any) => {
    // 1. Filter by Status
    const aptStatus = getStatusText(apt.rawStatus);
    if (statusFilter !== 'ALL' && aptStatus !== statusFilter) {
      return false;
    }
    
    // 2. Filter by Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const nameMatch = apt.patientName?.toLowerCase().includes(q);
      const phoneMatch = apt.patientDetails?.phone?.includes(q);
      const codeMatch = apt.patientCode?.toLowerCase().includes(q);
      
      if (!nameMatch && !phoneMatch && !codeMatch) {
        return false;
      }
    }
    
    return true;
  }) || [];

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] font-sans text-gray-800">
      <DoctorSidebar activePage="today-appointments" />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header (Mô phỏng topbar nhỏ nếu cần, ở đây ghép vào body luôn cho giống thiết kế) */}
        
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Lịch hẹn hôm nay của tôi</h1>
              <p className="text-sm text-gray-500 mt-1">Danh sách các lịch hẹn của bạn trong ngày hôm nay.</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
                <button className="text-gray-400 hover:text-gray-700"><ChevronLeft size={18} /></button>
                <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
                   {displayDate} <CalendarDays size={16} className="text-gray-400" />
                </span>
                <button className="text-gray-400 hover:text-gray-700"><ChevronRight size={18} /></button>
              </div>
              <button 
                onClick={refreshData}
                className="flex items-center gap-2 bg-white border border-blue-200 text-[#2563EB] px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-blue-50 transition"
              >
                <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} /> Làm mới
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                <CalendarDays size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500">Tổng lịch hẹn hôm nay</p>
                <p className="text-2xl font-black text-gray-900 mt-1 flex items-baseline gap-1">
                  {total} <span className="text-sm font-medium text-gray-500">lịch</span>
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500">Đã khám</p>
                <p className="text-2xl font-black text-gray-900 mt-1 flex items-baseline gap-1">
                  {completed} <span className="text-sm font-medium text-gray-500">lịch</span>
                </p>
                <p className="text-[10px] font-bold text-gray-400 mt-0.5">{getPercent(completed)}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500">Đang chờ</p>
                <p className="text-2xl font-black text-gray-900 mt-1 flex items-baseline gap-1">
                  {waiting} <span className="text-sm font-medium text-gray-500">lịch</span>
                </p>
                <p className="text-[10px] font-bold text-gray-400 mt-0.5">{getPercent(waiting)}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <User size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500">Đang khám</p>
                <p className="text-2xl font-black text-gray-900 mt-1 flex items-baseline gap-1">
                  {inProgress} <span className="text-sm font-medium text-gray-500">lịch</span>
                </p>
                <p className="text-[10px] font-bold text-gray-400 mt-0.5">{getPercent(inProgress)}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gray-50 text-gray-600 flex items-center justify-center shrink-0">
                <XCircle size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500">Đã hủy</p>
                <p className="text-2xl font-black text-gray-900 mt-1 flex items-baseline gap-1">
                  {canceled} <span className="text-sm font-medium text-gray-500">lịch</span>
                </p>
                <p className="text-[10px] font-bold text-gray-400 mt-0.5">{getPercent(canceled)}</p>
              </div>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="flex items-center justify-between mb-4">
            <div className="relative">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 pl-4 pr-10 rounded-lg text-sm font-medium focus:outline-none focus:border-blue-500 shadow-sm min-w-[180px]"
              >
                <option value="ALL">Tất cả trạng thái</option>
                <option value="Đang chờ">Đang chờ</option>
                <option value="Đang khám">Đang khám</option>
                <option value="Đã khám">Đã khám</option>
                <option value="Đã hủy">Đã hủy</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronRight size={14} className="rotate-90" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm bệnh nhân, SĐT, mã lịch hẹn..."
                  className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm w-[300px] focus:outline-none focus:border-blue-500 shadow-sm"
                />
              </div>
              <button className="flex items-center gap-2 bg-white border border-gray-200 text-[#2563EB] px-4 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-50 transition">
                <Filter size={16} /> Bộ lọc
              </button>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider w-16">STT</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Giờ hẹn</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Bệnh nhân</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">SĐT</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Chuyên khoa</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Lý do khám</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Trạng thái</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Ghi chú</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-gray-500">
                      Đang tải dữ liệu...
                    </td>
                  </tr>
                ) : filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-gray-500">
                      Không tìm thấy lịch hẹn nào.
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((apt: any, idx: number) => (
                    <tr key={apt.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 text-sm font-bold text-gray-900">{idx + 1}</td>
                      <td className="py-4 px-6 text-sm font-bold text-gray-900">{apt.time}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img src={apt.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                          <div>
                            <p className="text-sm font-bold text-gray-900">{apt.patientName}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{apt.age} tuổi - {apt.gender}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm font-bold text-gray-700">{apt.patientDetails?.phone || '--'}</td>
                      <td className="py-4 px-6 text-sm font-bold text-gray-700">{apt.room}</td>
                      <td className="py-4 px-6 text-sm text-gray-900 max-w-[200px] truncate" title={apt.reason}>{apt.reason}</td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${getStatusStyle(apt.rawStatus)}`}>
                          {getStatusText(apt.rawStatus)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm font-bold text-gray-700">
                        {apt.rawStatus === 'ĐÃ HỦY' ? 'Bệnh nhân hủy' : apt.rawStatus === 'HOÀN THÀNH' ? `Đã khám lúc ${apt.time}` : '--'}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-1">
                          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-blue-500 hover:bg-blue-50 transition" title="Xem chi tiết">
                            <Eye size={16} />
                          </button>
                          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition" title="Chỉnh sửa">
                            <Edit2 size={16} />
                          </button>
                          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
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
                <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-900">&raquo;</button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-4 py-3 rounded-xl border border-blue-100">
            <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">i</span>
            Lưu ý: Giờ hẹn được hiển thị theo múi giờ hệ thống.
          </div>

        </div>
      </main>
    </div>
  );
}
