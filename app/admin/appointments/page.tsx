'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Users, CalendarDays, FileText, Pill, TestTube, 
  Settings, LogOut, Search, Activity, User, Building2, 
  ShieldCheck, History, Wallet, CheckCircle2, 
  Clock, XCircle, Filter, Plus, Edit, Trash2, Calendar, 
  MapPin, Stethoscope, ChevronRight, UserCog, CheckCircle, Loader2
} from 'lucide-react';

import { getAdminAppointmentsData, createAdminAppointment, updateAdminAppointmentStatus } from '@/app/admin/appointments/actions';

export default function AppointmentManagementPage() {
  const router = useRouter();
  
  const [appointments, setAppointments] = useState<any[]>([]);
  const [patientsList, setPatientsList] = useState<any[]>([]);
  const [doctorsList, setDoctorsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedApptId, setSelectedApptId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('timeline');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('list');

  // Lọc
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]); // YYYY-MM-DD
  const [filterStatus, setFilterStatus] = useState('Tất cả');
  const [filterDoctor, setFilterDoctor] = useState('Tất cả');
  
  // Form Thêm Lịch
  const [addForm, setAddForm] = useState({
    patientId: '', doctorId: '', specialty: '', date: '', time: '', reason: ''
  });
  
  const fetchData = async () => {
    setIsLoading(true);
    const res = await getAdminAppointmentsData();
    if (res.success && res.data) {
      setAppointments(res.data.appointments);
      setPatientsList(res.data.patients);
      setDoctorsList(res.data.doctors);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => router.push('/login');

  const handleAddSubmit = async () => {
    if (!addForm.patientId || !addForm.doctorId || !addForm.date || !addForm.time) {
      return alert('Vui lòng nhập đủ thông tin bắt buộc (*)');
    }
    
    // Đổi định dạng ngày YYYY-MM-DD -> DD/MM/YYYY để lưu
    const [year, month, day] = addForm.date.split('-');
    const formattedDate = `${day}/${month}/${year}`;

    setIsSubmitting(true);
    const res = await createAdminAppointment({
      ...addForm,
      patientId: parseInt(addForm.patientId),
      doctorId: parseInt(addForm.doctorId),
      date: formattedDate
    });
    setIsSubmitting(false);

    if (res.success) {
      alert(res.message);
      setIsAddModalOpen(false);
      setAddForm({ patientId: '', doctorId: '', specialty: '', date: '', time: '', reason: '' });
      fetchData();
    } else {
      alert(res.message);
    }
  };

  const handleCancelAppt = async (rawId: number) => {
    if (confirm('Bạn có chắc chắn muốn hủy lịch khám này?')) {
      const res = await updateAdminAppointmentStatus(rawId, 'ĐÃ HỦY');
      if (res.success) fetchData();
      else alert(res.message);
    }
  };

  // Helper chuyển YYYY-MM-DD của filter thành DD/MM/YYYY để so sánh
  const filterDateFormatted = filterDate ? filterDate.split('-').reverse().join('/') : '';

  // Lọc danh sách
  const filteredAppts = appointments.filter(a => {
    const matchSearch = a.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        a.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        a.phone.includes(searchTerm);
    const matchDate = !filterDate || a.date === filterDateFormatted;
    const matchStatus = filterStatus === 'Tất cả' || a.status === filterStatus;
    const matchDoctor = filterDoctor === 'Tất cả' || a.doctorId.toString() === filterDoctor;
    
    return matchSearch && matchDate && matchStatus && matchDoctor;
  });

  // Gán chọn dòng đầu tiên nếu chưa chọn
  useEffect(() => {
    if (filteredAppts.length > 0 && (!selectedApptId || !filteredAppts.find(a => a.rawId === selectedApptId))) {
      setSelectedApptId(filteredAppts[0].rawId);
    }
  }, [filteredAppts, selectedApptId]);

  const activeAppt = filteredAppts.find(a => a.rawId === selectedApptId) || filteredAppts[0];

  // Tính toán KPI dựa trên ngày đang lọc (filterDate)
  const stats = {
    total: filteredAppts.length,
    completed: filteredAppts.filter(a => a.status === 'HOÀN THÀNH').length,
    waiting: filteredAppts.filter(a => a.status === 'CHỜ XÁC NHẬN' || a.status === 'ĐÃ XÁC NHẬN').length,
    canceled: filteredAppts.filter(a => a.status === 'ĐÃ HỦY').length,
    doctors: new Set(filteredAppts.map(a => a.doctorId)).size,
    rooms: new Set(filteredAppts.map(a => a.room)).size,
  };

  const getStatusColor = (status: string) => {
    if (status === 'HOÀN THÀNH') return 'text-green-700 bg-green-100 border-green-200';
    if (status === 'ĐÃ HỦY') return 'text-red-700 bg-red-100 border-red-200';
    if (status === 'ĐÃ XÁC NHẬN') return 'text-blue-700 bg-blue-100 border-blue-200';
    return 'text-yellow-700 bg-yellow-100 border-yellow-200'; // CHỜ XÁC NHẬN
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-10 h-10 text-[#2563EB] animate-spin" /></div>;

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans text-gray-800 overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0F172A] text-gray-300 flex flex-col h-screen sticky top-0 shrink-0 shadow-xl z-20">
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

          {/* Nhóm 2: Quản lý phòng khám */}
          <div className="space-y-1">
            <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">2. Phòng khám</p>
            <Link href="/admin/doctors" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <User size={18}/> Quản lý Bác sĩ
            </Link>
            <Link href="/admin/patients" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <Users size={18}/> Quản lý Bệnh nhân
            </Link>
            <Link href="/admin/appointments" className="flex items-center gap-3 px-4 py-2.5 bg-[#2563EB] text-white rounded-xl font-medium shadow-md transition-all text-sm">
              <CalendarDays size={18}/> Quản lý Lịch khám
            </Link>
            <Link href="/admin/records" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <FileText size={18}/> Hồ sơ bệnh án
            </Link>
            <Link href="/admin/prescriptions" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <Pill size={18}/> Quản lý Đơn thuốc
            </Link>          
          </div>

          {/* Nhóm 3: Quản trị hệ thống */}
          <div className="space-y-1">
            <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">3. Hệ thống</p>
            <Link href="/admin/users" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <ShieldCheck size={18}/> Phân quyền (RBAC)
            </Link>
            <Link href="/admin/departments" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <Building2 size={18}/> Khoa phòng & Dịch vụ
            </Link>
            <Link href="/admin/billing" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <Wallet size={18}/> Thanh toán & Viện phí
            </Link>
          </div>

          {/* Nhóm 4: Cấu hình */}
          <div className="space-y-1">
            <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">4. Cấu hình</p>
            <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <Settings size={18}/> Cài đặt chung
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

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50 relative">
        
        {/* TOP HEADER */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 p-2 rounded-lg"><CalendarDays className="text-[#2563EB]" size={24}/></div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Quản lý Lịch khám</h1>
              <p className="text-xs text-gray-500 font-medium">Quản lý, điều phối và theo dõi lịch khám của toàn bộ phòng khám</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#2563EB] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md transition-all flex items-center gap-2 text-sm"
            >
              <Plus size={18}/> Tạo Lịch khám
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-gray-900">Quản trị viên</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#172554] text-white flex items-center justify-center font-bold border-2 border-white shadow-sm">AD</div>
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-8 animate-in fade-in duration-500">
          
          {/* KPI CARDS (Dựa theo ngày Lọc) */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            {[
              { label: 'Tổng lịch lọc được', value: stats.total, icon: CalendarDays, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Đã hoàn thành', value: stats.completed, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Đang chờ khám', value: stats.waiting, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
              { label: 'Đã hủy', value: stats.canceled, icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
              { label: 'Bác sĩ trực', value: stats.doctors, icon: UserCog, color: 'text-purple-600', bg: 'bg-purple-50' },
              { label: 'Phòng khám', value: stats.rooms, icon: Building2, color: 'text-cyan-600', bg: 'bg-cyan-50' },
            ].map((kpi, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all duration-300">
                <div className={`w-12 h-12 ${kpi.bg} ${kpi.color} rounded-2xl flex items-center justify-center shrink-0`}><kpi.icon size={24}/></div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">{kpi.label}</p>
                  <p className="text-2xl font-black text-gray-900 leading-tight">{kpi.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* SEARCH & FILTER BAR */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex-1 flex gap-4 min-w-0">
              <div className="relative w-64">
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tên BN, Mã lịch, SĐT..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
              </div>
              <input 
                type="date" 
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none"
              />
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none"
              >
                <option value="Tất cả">Trạng thái (Tất cả)</option>
                <option value="CHỜ XÁC NHẬN">Chờ xác nhận</option>
                <option value="ĐÃ XÁC NHẬN">Đã xác nhận</option>
                <option value="HOÀN THÀNH">Hoàn thành</option>
                <option value="ĐÃ HỦY">Đã hủy</option>
              </select>
              <select 
                value={filterDoctor}
                onChange={(e) => setFilterDoctor(e.target.value)}
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none hidden lg:block"
              >
                <option value="Tất cả">Bác sĩ (Tất cả)</option>
                {doctorsList.map(d => (
                  <option key={d.id} value={d.id.toString()}>{d.fullName}</option>
                ))}
              </select>
            </div>
            <div className="flex bg-gray-100 p-1 rounded-xl">
               <button 
                 onClick={() => setViewMode('list')}
                 className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${viewMode === 'list' ? 'bg-white text-[#2563EB] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
               >
                 Danh sách
               </button>
               <button 
                 onClick={() => setViewMode('calendar')}
                 className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${viewMode === 'calendar' ? 'bg-white text-[#2563EB] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
               >
                 Lịch tháng
               </button>
            </div>
          </div>

          {viewMode === 'list' ? (
            /* MASTER-DETAIL LAYOUT (LIST VIEW) */
            <div className="flex flex-col xl:flex-row gap-8 h-[calc(100vh-320px)] min-h-[550px]">
              
              {/* MASTER: Danh sách Lịch khám (60%) */}
              <div className="xl:w-[60%] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center shrink-0">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2"><CalendarDays size={18} className="text-[#2563EB]"/> Danh sách lọc được</h3>
                  <span className="text-sm font-bold text-[#2563EB] bg-blue-100 px-3 py-1 rounded-full">{filteredAppts.length} Lịch hẹn</span>
                </div>
                
                <div className="flex-1 overflow-auto custom-scrollbar">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-white border-b border-gray-100 text-gray-500 font-bold sticky top-0 z-10 shadow-sm">
                      <tr>
                        <th className="px-5 py-4">Bệnh nhân / Mã lịch</th>
                        <th className="px-5 py-4">Bác sĩ & Chuyên khoa</th>
                        <th className="px-5 py-4">Thời gian & Phòng</th>
                        <th className="px-5 py-4">Trạng thái</th>
                        <th className="px-5 py-4 text-center">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredAppts.length > 0 ? filteredAppts.map((appt) => (
                        <tr 
                          key={appt.rawId} 
                          onClick={() => setSelectedApptId(appt.rawId)}
                          className={`cursor-pointer transition-colors ${selectedApptId === appt.rawId ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
                        >
                          <td className="px-5 py-4">
                            <p className={`font-bold ${selectedApptId === appt.rawId ? 'text-[#2563EB]' : 'text-gray-900'}`}>{appt.patient}</p>
                            <p className="text-xs text-gray-500">{appt.id} • {appt.phone}</p>
                          </td>
                          <td className="px-5 py-4">
                            <p className="font-bold text-gray-700">{appt.doctor}</p>
                            <p className="text-xs text-gray-500">{appt.specialty}</p>
                          </td>
                          <td className="px-5 py-4">
                            <p className="font-bold text-gray-900 flex items-center gap-1.5"><Clock size={14} className="text-blue-500"/> {appt.time} - {appt.date}</p>
                            <p className="text-xs text-gray-500 font-medium">{appt.room}</p>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center w-max gap-1.5 ${getStatusColor(appt.status)}`}>
                              {appt.status}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-center">
                            <div className="flex justify-center gap-2">
                              {appt.status !== 'ĐÃ HỦY' && appt.status !== 'HOÀN THÀNH' && (
                                <button 
                                  onClick={(e) => { e.stopPropagation(); handleCancelAppt(appt.rawId); }}
                                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition" 
                                  title="Hủy lịch"
                                >
                                  <Trash2 size={16}/>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      )) : (
                        <tr><td colSpan={5} className="px-5 py-10 text-center text-gray-500">Không tìm thấy lịch khám phù hợp.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* DETAIL: Chi tiết lịch khám (40%) */}
              <div className="xl:w-[40%] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
                {activeAppt ? (
                  <>
                    <div className="p-6 bg-gradient-to-br from-[#172554] to-[#2563EB] text-white relative">
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold shadow-sm">
                        {activeAppt.status}
                      </div>
                      <h2 className="text-xl font-bold mb-4">Chi tiết lịch hẹn</h2>
                      
                      <div className="bg-white/10 rounded-xl p-4 space-y-3">
                        <div className="flex justify-between items-center border-b border-white/20 pb-2">
                          <span className="text-blue-200 text-sm">Bệnh nhân</span>
                          <span className="font-bold">{activeAppt.patient} ({activeAppt.patientCode})</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/20 pb-2">
                          <span className="text-blue-200 text-sm">Bác sĩ</span>
                          <span className="font-bold">{activeAppt.doctor}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/20 pb-2">
                          <span className="text-blue-200 text-sm">Thời gian</span>
                          <span className="font-bold text-yellow-300">{activeAppt.time} - {activeAppt.date}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-blue-200 text-sm">Phòng khám</span>
                          <span className="font-bold">{activeAppt.room} ({activeAppt.specialty})</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex px-2 border-b border-gray-100 bg-gray-50 shrink-0 overflow-x-auto custom-scrollbar">
                      {[
                        { id: 'timeline', label: 'Tiến trình (Timeline)' },
                        { id: 'coordination', label: 'Điều phối' }
                      ].map((tab) => (
                        <button 
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`py-3 px-4 font-bold text-sm border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                      
                      {/* TIẾN TRÌNH LỊCH KHÁM */}
                      {activeTab === 'timeline' && (
                        <div className="space-y-0 relative before:absolute before:inset-0 before:ml-[13px] before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#2563EB] before:to-gray-200 animate-in fade-in">
                          
                          <div className="relative pl-8 pb-6">
                            <span className="absolute left-0 top-1 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center -translate-x-2.5 z-10 shadow-[0_0_0_4px_white]"><CheckCircle size={14}/></span>
                            <div>
                              <h4 className="font-bold text-gray-900">Đặt lịch</h4>
                              <p className="text-xs text-gray-500 mt-1">Đã tiếp nhận yêu cầu đặt lịch.</p>
                            </div>
                          </div>

                          <div className="relative pl-8 pb-6">
                            <span className={`absolute left-0 top-1 w-7 h-7 rounded-full flex items-center justify-center -translate-x-2.5 z-10 shadow-[0_0_0_4px_white] ${
                              ['ĐÃ XÁC NHẬN', 'HOÀN THÀNH'].includes(activeAppt.status) ? 'bg-blue-600 text-white' : 
                              activeAppt.status === 'ĐÃ HỦY' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-400'
                            }`}>
                              {activeAppt.status === 'ĐÃ HỦY' ? <XCircle size={14}/> : <CheckCircle size={14}/>}
                            </span>
                            <div>
                              <h4 className="font-bold text-gray-900">Xác nhận</h4>
                              <p className="text-xs text-gray-500 mt-1">{activeAppt.status === 'CHỜ XÁC NHẬN' ? 'Đang chờ Admin xử lý' : activeAppt.status === 'ĐÃ HỦY' ? 'Lịch bị hủy' : 'Admin đã xác nhận'}</p>
                            </div>
                          </div>

                          <div className="relative pl-8 pb-6">
                            <span className={`absolute left-0 top-1 w-7 h-7 rounded-full flex items-center justify-center -translate-x-2.5 z-10 shadow-[0_0_0_4px_white] ${
                              activeAppt.status === 'HOÀN THÀNH' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
                            }`}>
                              {activeAppt.status === 'HOÀN THÀNH' ? <CheckCircle size={14}/> : <Activity size={14}/>}
                            </span>
                            <div>
                              <h4 className="font-bold text-gray-900">Khám xong</h4>
                              <p className="text-xs text-gray-500 mt-1">{activeAppt.status === 'HOÀN THÀNH' ? 'Đã hoàn tất quy trình khám' : 'Chưa thực hiện'}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ĐIỀU PHỐI (Đổi bác sĩ/Phòng) */}
                      {activeTab === 'coordination' && (
                        <div className="space-y-6 animate-in fade-in">
                          <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl">
                            <h4 className="font-bold text-orange-800 text-sm mb-2">Ghi chú bệnh nhân</h4>
                            <div className="text-sm text-orange-900 space-y-1">
                              <p>Lý do: <span className="font-bold">{activeAppt.reason}</span></p>
                            </div>
                          </div>

                          {activeAppt.status !== 'ĐÃ HỦY' && activeAppt.status !== 'HOÀN THÀNH' && (
                            <div className="space-y-3">
                              <button className="w-full bg-white border border-gray-200 p-3 rounded-xl hover:border-[#2563EB] transition-colors flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                  <div className="bg-blue-50 p-2 rounded-lg text-[#2563EB]"><UserCog size={18}/></div>
                                  <div className="text-left">
                                    <p className="font-bold text-gray-900 text-sm">Đổi Bác sĩ</p>
                                    <p className="text-xs text-gray-500 mt-0.5">Chuyển sang bác sĩ khác cùng khoa</p>
                                  </div>
                                </div>
                                <ChevronRight className="text-gray-300 group-hover:text-[#2563EB]"/>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-6 text-center">
                    <CalendarDays size={48} className="opacity-20 mb-4"/>
                    <p>Hãy chọn một lịch hẹn bên trái để xem chi tiết.</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* CALENDAR VIEW */
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-[calc(100vh-320px)] min-h-[600px] flex flex-col animate-in fade-in text-center justify-center">
              <CalendarDays size={48} className="mx-auto text-gray-300 mb-4"/>
              <h2 className="text-xl font-bold text-gray-900">Tính năng Lịch tháng đang phát triển</h2>
              <p className="text-gray-500 mt-2">Vui lòng sử dụng chế độ "Danh sách" để quản lý lịch hẹn.</p>
            </div>
          )}

        </div>
      </main>

      {/* MODAL: TẠO LỊCH KHÁM MỚI */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><CalendarDays size={20} className="text-[#2563EB]"/> Tạo Lịch Khám (Admin)</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-700 transition"><XCircle size={24}/></button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Bệnh nhân <span className="text-red-500">*</span></label>
                  <select 
                    value={addForm.patientId} onChange={e => setAddForm({...addForm, patientId: e.target.value})}
                    className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors"
                  >
                    <option value="">Chọn bệnh nhân...</option>
                    {patientsList.map(p => <option key={p.id} value={p.id}>{p.fullName} - {p.phone}</option>)}
                  </select>
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Bác sĩ <span className="text-red-500">*</span></label>
                  <select 
                    value={addForm.doctorId} 
                    onChange={e => {
                      const doc = doctorsList.find(d => d.id.toString() === e.target.value);
                      setAddForm({...addForm, doctorId: e.target.value, specialty: doc ? doc.doctorProfile?.specialty || 'Đa khoa' : ''})
                    }}
                    className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors"
                  >
                    <option value="">Chọn bác sĩ...</option>
                    {doctorsList.map(d => <option key={d.id} value={d.id}>BS. {d.fullName} ({d.doctorProfile?.specialty || 'Đa khoa'})</option>)}
                  </select>
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Chuyên khoa</label>
                  <input type="text" value={addForm.specialty} disabled className="w-full p-2.5 border border-gray-200 rounded-xl text-sm bg-gray-100 text-gray-500 cursor-not-allowed"/>
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Ngày khám (YYYY-MM-DD) <span className="text-red-500">*</span></label>
                  <input type="date" value={addForm.date} onChange={e => setAddForm({...addForm, date: e.target.value})} className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors"/>
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Giờ khám <span className="text-red-500">*</span></label>
                  <select value={addForm.time} onChange={e => setAddForm({...addForm, time: e.target.value})} className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors">
                    <option value="">Chọn giờ...</option>
                    {['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Ghi chú / Lý do khám</label>
                  <textarea value={addForm.reason} onChange={e => setAddForm({...addForm, reason: e.target.value})} rows={3} className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors" placeholder="Lý do khám..."></textarea>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button disabled={isSubmitting} onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 transition">Hủy</button>
              <button disabled={isSubmitting} onClick={handleAddSubmit} className="bg-[#2563EB] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md transition flex items-center gap-2">
                {isSubmitting ? <Loader2 size={18} className="animate-spin"/> : <CheckCircle2 size={18}/>} Xác nhận tạo lịch
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}