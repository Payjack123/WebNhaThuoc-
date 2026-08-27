'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  CalendarDays, Calendar, CheckCircle2, UserCircle2, Search,
  Clock, MapPin, User, Stethoscope, Loader2, Download,
  Printer, ChevronRight, FileText, Pill, Activity, Bell,
  Stethoscope as StethoscopeIcon, History, Trash2
} from 'lucide-react';
import PatientSidebar from '@/app/patient/Sidebar';
import { getMedicalHistoryData } from './actions';

export default function MedicalHistoryPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('');
  const [filterDoctor, setFilterDoctor] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMedicalHistoryData();
      if (res.success && res.data) {
        setUserData(res.data.user);
        setAppointments(res.data.appointments);
        setStats(res.data.stats);
        if (res.data.appointments.length > 0) {
          setSelectedAppointment(res.data.appointments[0]);
        }
      } else {
        router.push('/login');
      }
      setIsLoading(false);
    };
    fetchData();
  }, [router]);

  let filteredAppointments = appointments;

  if (filterSpecialty) {
    filteredAppointments = filteredAppointments.filter(app => app.specialty === filterSpecialty);
  }

  if (filterDoctor) {
    filteredAppointments = filteredAppointments.filter(app => app.doctor === filterDoctor);
  }

  if (filterStatus) {
    filteredAppointments = filteredAppointments.filter(app => app.status === filterStatus);
  }

  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    filteredAppointments = filteredAppointments.filter(app =>
      app.doctor.toLowerCase().includes(q) ||
      app.specialty.toLowerCase().includes(q) ||
      app.reason.toLowerCase().includes(q)
    );
  }

  const parseDateForFilter = (raw: string) => {
    if (!raw) return '';
    if (raw.includes('/')) {
      const parts = raw.split('/');
      if (parts.length === 3) {
        return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
      }
    }
    return '';
  };

  if (fromDate) {
    filteredAppointments = filteredAppointments.filter(app => {
      const dateStr = parseDateForFilter(app.rawDate);
      return dateStr ? dateStr >= fromDate : true;
    });
  }

  if (toDate) {
    filteredAppointments = filteredAppointments.filter(app => {
      const dateStr = parseDateForFilter(app.rawDate);
      return dateStr ? dateStr <= toDate : true;
    });
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [filterSpecialty, filterDoctor, filterStatus, fromDate, toDate, searchQuery]);

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirstItem, indexOfLastItem);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]"><Loader2 className="w-10 h-10 text-[#2563EB] animate-spin" /></div>;
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] font-sans text-gray-800 overflow-hidden">
      
      {/* SIDEBAR */}
      <PatientSidebar activePage="medical-history" />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* HEADER */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-10">
          <div className="flex-1">
            {/* Thanh tìm kiếm trên header (tuỳ chọn theo thiết kế) */}
            <div className="relative w-full max-w-md hidden sm:block">
              <input type="text" placeholder="Tìm bác sĩ, chuyên khoa, dịch vụ..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <button className="relative p-2.5 text-gray-500 hover:bg-gray-100 rounded-full transition">
                <Bell size={20} />
                <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900 group-hover:text-[#2563EB] transition">{userData?.fullName}</p>
                <p className="text-xs text-gray-500 font-medium">{userData?.patientCode || 'BN0012345'}</p>
              </div>
              <img src={`https://ui-avatars.com/api/?name=${userData?.fullName}&background=2563EB&color=fff`} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-white shadow-sm group-hover:shadow-md transition" />
            </div>
          </div>
        </header>

        {/* SCROLLABLE PAGE CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 animate-in fade-in duration-500">
          
          {/* TOP SECTION: TITLE & DOWNLOAD BUTTON */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Lịch sử khám</h1>
              <p className="text-sm text-gray-500 mt-1">Theo dõi toàn bộ lịch sử khám và điều trị của bạn tại MediCare.</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 text-[#2563EB] rounded-lg text-sm font-bold hover:bg-blue-50 shadow-sm transition">
              <Download size={16} />
              Tải toàn bộ lịch sử
            </button>
          </div>

          {/* STATS CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-50 text-[#2563EB]">
                <CalendarDays size={24} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-0.5">Tổng số lần khám</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-gray-900">{stats?.totalVisits || 0}</span>
                  <span className="text-xs font-medium text-gray-500">lần</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-50 text-green-500">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-0.5">Lần khám gần nhất</p>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-gray-900">{stats?.latestVisit}</span>
                  {/* <span className="text-xs font-medium text-gray-400">2 ngày trước</span> */}
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-orange-50 text-orange-500">
                <UserCircle2 size={24} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-0.5">Bác sĩ đã khám</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-gray-900">{stats?.doctorsCount || 0}</span>
                  <span className="text-xs font-medium text-gray-500">bác sĩ</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-50 text-purple-500">
                <StethoscopeIcon size={24} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-0.5">Chuyên khoa</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-gray-900">{stats?.specialtiesCount || 0}</span>
                  <span className="text-xs font-medium text-gray-500">chuyên khoa</span>
                </div>
              </div>
            </div>
          </div>

          {/* FILTER BAR */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-wrap gap-4 items-end animate-in fade-in slide-in-from-bottom-2">
            <div className="flex-1 min-w-[130px]">
              <label className="block text-xs font-medium text-gray-500 mb-1">Từ ngày</label>
              <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
            </div>
            <div className="flex-1 min-w-[130px]">
              <label className="block text-xs font-medium text-gray-500 mb-1">Đến ngày</label>
              <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block text-xs font-medium text-gray-500 mb-1">Trạng thái</label>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-gray-700 bg-white">
                <option value="">Tất cả trạng thái</option>
                <option value="Đã hoàn thành">Đã hoàn thành</option>
                <option value="Đã hủy">Đã hủy</option>
              </select>
            </div>
            <div className="flex-1 min-w-[170px]">
              <label className="block text-xs font-medium text-gray-500 mb-1">Chuyên khoa</label>
              <select value={filterSpecialty} onChange={(e) => setFilterSpecialty(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-gray-700 bg-white">
                <option value="">Tất cả chuyên khoa</option>
                {Array.from(new Set(appointments.map(a => a.specialty))).map(spec => (
                  <option key={spec as string} value={spec as string}>{spec as string}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-[170px]">
              <label className="block text-xs font-medium text-gray-500 mb-1">Bác sĩ</label>
              <select value={filterDoctor} onChange={(e) => setFilterDoctor(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-gray-700 bg-white">
                <option value="">Tất cả bác sĩ</option>
                {Array.from(new Set(appointments.map(a => a.doctor))).map(doc => (
                  <option key={doc} value={doc}>{doc}</option>
                ))}
              </select>
            </div>
            <div className="flex-[2] min-w-[200px] relative">
              <input type="text" placeholder="Tìm kiếm lịch sử khám..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
            <button
              onClick={() => {
                setFromDate('');
                setToDate('');
                setFilterStatus('');
                setFilterSpecialty('');
                setFilterDoctor('');
                setSearchQuery('');
              }}
              className="flex items-center gap-2 px-4 py-2.5 border border-blue-200 text-[#2563EB] rounded-lg text-sm font-medium hover:bg-blue-50 transition shrink-0 h-[42px]"
            >
              <Trash2 size={16} /> Bỏ lọc
            </button>
          </div>

          {/* MAIN LAYOUT: 2 COLUMNS */}
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* LEFT COLUMN: LIST */}
            <div className="flex-[3] lg:max-w-3xl flex flex-col">
              <h2 className="text-sm font-bold text-gray-700 mb-3 px-1">Danh sách lịch sử khám</h2>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {currentAppointments.length > 0 ? currentAppointments.map((app, idx) => (
                  <div
                    key={app.id}
                    onClick={() => setSelectedAppointment(app)}
                    className={`flex items-center p-4 border-b border-gray-50 cursor-pointer transition-all hover:bg-gray-50 ${selectedAppointment?.id === app.id ? 'bg-blue-50/40 relative' : ''}`}
                  >
                    {/* Active Indicator line */}
                    {selectedAppointment?.id === app.id && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2563EB]"></div>
                    )}
                    
                    {/* Date Block */}
                    <div className="w-28 flex flex-col items-center justify-center shrink-0 pr-4">
                      <span className="text-3xl font-black text-gray-900">{app.day}</span>
                      <span className="text-[11px] text-gray-500 uppercase font-medium mt-0.5">Tháng {app.month}, {app.year}</span>
                      <span className="text-xs font-bold text-gray-700 mt-1">{app.time}</span>
                    </div>

                    {/* Icon based on specialty or default avatar */}
                    <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center shrink-0 mr-4 bg-gray-50 overflow-hidden">
                      <img src={app.avatar} alt="Doctor" className="w-full h-full object-cover" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] font-bold text-gray-900">{app.specialty}</p>
                      <p className="text-[13px] text-gray-600 mt-0.5">{app.doctor}</p>
                      <p className="text-[12px] text-gray-400 mt-0.5">{app.clinic}</p>
                    </div>

                    {/* Status & Arrow */}
                    <div className="flex items-center gap-4 shrink-0 pl-4">
                      <span className={`px-3 py-1 rounded-md text-[11px] font-bold ${app.statusColor}`}>
                        {app.status}
                      </span>
                      <ChevronRight size={20} className={selectedAppointment?.id === app.id ? "text-[#2563EB]" : "text-gray-300"} />
                    </div>
                  </div>
                )) : (
                  <div className="p-12 text-center text-gray-500 flex flex-col items-center">
                    <History size={48} className="text-gray-300 mb-4" />
                    <p className="font-medium text-gray-900 text-lg">Không có lịch sử khám</p>
                  </div>
                )}
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="p-4 border-t border-gray-100 flex justify-center gap-2">
                    <button 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition disabled:opacity-50"
                    >&laquo;</button>
                    
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button 
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg border font-medium transition ${
                          currentPage === i + 1 
                            ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-sm' 
                            : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition disabled:opacity-50"
                    >&raquo;</button>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: DETAILS */}
            <div className="flex-[2] flex flex-col">
              <h2 className="text-sm font-bold text-gray-700 mb-3 px-1">Thông tin chi tiết</h2>
              
              {selectedAppointment ? (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
                  {/* Top Header of Detail */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-[#2563EB]">{selectedAppointment.specialty}</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-md text-[11px] font-bold ${selectedAppointment.statusColor}`}>
                        {selectedAppointment.status}
                      </span>
                      <button className="text-gray-400 hover:text-gray-700 transition" title="In">
                        <Printer size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Info List */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <CalendarDays className="text-gray-400 shrink-0 mt-0.5" size={16} />
                      <div className="grid grid-cols-3 w-full gap-2">
                        <p className="text-sm text-gray-500">Thời gian khám</p>
                        <p className="text-sm font-semibold text-gray-900 col-span-2">{selectedAppointment.time} - {selectedAppointment.rawDate}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <UserCircle2 className="text-gray-400 shrink-0 mt-0.5" size={16} />
                      <div className="grid grid-cols-3 w-full gap-2">
                        <p className="text-sm text-gray-500">Bác sĩ khám</p>
                        <p className="text-sm font-semibold text-gray-900 col-span-2">{selectedAppointment.doctor}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="text-gray-400 shrink-0 mt-0.5" size={16} />
                      <div className="grid grid-cols-3 w-full gap-2">
                        <p className="text-sm text-gray-500">Phòng khám</p>
                        <p className="text-sm font-semibold text-gray-900 col-span-2">{selectedAppointment.clinic}</p>
                      </div>
                    </div>
                    {/* Thông tin người khám */}
                    <div className="h-px bg-gray-100 w-full"></div>
                    <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                      <h4 className="text-sm font-bold text-[#2563EB] mb-3">Thông tin người khám</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Họ và tên</p>
                          <p className="text-sm font-semibold text-gray-900">{selectedAppointment.patientDetails?.name || userData?.fullName || 'Không có'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Số điện thoại</p>
                          <p className="text-sm font-semibold text-gray-900">{selectedAppointment.patientDetails?.phone || userData?.phone || 'Không có'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">CMND/CCCD</p>
                          <p className="text-sm font-semibold text-gray-900">{selectedAppointment.patientDetails?.cccd || 'Không có'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Địa chỉ</p>
                          <p className="text-sm font-semibold text-gray-900 truncate" title={selectedAppointment.patientDetails?.address || userData?.address || 'Không có'}>{selectedAppointment.patientDetails?.address || userData?.address || 'Không có'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <InfoIcon className="text-gray-400 shrink-0 mt-0.5" size={16} />
                      <div className="grid grid-cols-3 w-full gap-2">
                        <p className="text-sm text-gray-500">Lý do khám</p>
                        <p className="text-sm font-semibold text-gray-900 col-span-2 leading-relaxed bg-yellow-50 p-3 rounded-xl border border-yellow-100">{selectedAppointment.reason}</p>
                      </div>
                    </div>

                  </div>

                  {/* Dịch vụ đã thực hiện */}
                  {selectedAppointment.status === 'Đã hoàn thành' && (
                    <div className="mb-8">
                      <h4 className="text-sm font-bold text-gray-900 mb-3">Dịch vụ đã thực hiện</h4>
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <div className="flex justify-between items-center mb-3 text-sm">
                          <span className="text-gray-700">{selectedAppointment.specialty}</span>
                          <span className="font-medium text-gray-900">{formatCurrency(selectedAppointment.price)}</span>
                        </div>
                        <div className="h-px w-full bg-gray-200 mb-3"></div>
                        <div className="flex justify-between items-center text-sm font-bold">
                          <span className="text-gray-900">Tổng tiền</span>
                          <span className="text-gray-900">{formatCurrency(selectedAppointment.price)}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-auto space-y-2">
                    <Link href="/patient/medical-record" className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-[#2563EB] hover:bg-blue-50 transition group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center group-hover:bg-white">
                          <FileText size={16} />
                        </div>
                        <span className="text-sm font-bold text-gray-700 group-hover:text-[#2563EB]">Xem hồ sơ bệnh án</span>
                      </div>
                      <ChevronRight size={16} className="text-gray-300 group-hover:text-[#2563EB]" />
                    </Link>
                    <Link href="/patient/prescriptions" className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-[#2563EB] hover:bg-blue-50 transition group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center group-hover:bg-white">
                          <Pill size={16} />
                        </div>
                        <span className="text-sm font-bold text-gray-700 group-hover:text-[#2563EB]">Xem đơn thuốc</span>
                      </div>
                      <ChevronRight size={16} className="text-gray-300 group-hover:text-[#2563EB]" />
                    </Link>
                    <button className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-[#2563EB] hover:bg-blue-50 transition group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center group-hover:bg-white">
                          <Activity size={16} />
                        </div>
                        <span className="text-sm font-bold text-gray-700 group-hover:text-[#2563EB]">Xem kết quả xét nghiệm</span>
                      </div>
                      <ChevronRight size={16} className="text-gray-300 group-hover:text-[#2563EB]" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 flex flex-col items-center justify-center h-full text-gray-400">
                  <FileText size={48} className="mb-4 opacity-50" />
                  <p>Chọn một lịch sử khám để xem chi tiết</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

const InfoIcon = ({ size, className }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);
