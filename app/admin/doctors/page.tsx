'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Users, CalendarDays, FileText, Pill, TestTube, 
  Settings, LogOut, Search, Activity, User, Building2, 
  ShieldCheck, History, Wallet, ArrowUpRight, CheckCircle2, 
  Star, Printer, Filter, Plus, Eye, Edit, Trash2, Mail, Phone, 
  Stethoscope, Calendar, Clock, Award, FileBadge, X, Loader2
} from 'lucide-react';

// Import API
import { getAdminDoctorsData, addDoctor, deleteDoctor } from '@/app/admin/doctors/actions';

export default function DoctorManagementPage() {
  const router = useRouter();
  
  // States điều khiển UI
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('schedule');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // States dữ liệu
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [kpis, setKpis] = useState<any>({});

  // States Bộ lọc
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('Tất cả');
  const [filterStatus, setFilterStatus] = useState('Tất cả');

  // State Form Thêm Bác Sĩ
  const [addForm, setAddForm] = useState({
    name: '', dob: '', gender: 'Nam', phone: '', email: '', specialty: 'Nội tổng quát', status: 'Đang làm việc'
  });

  // 1. Kéo dữ liệu từ TiDB
  const fetchDoctors = async () => {
    setIsLoading(true);
    const res = await getAdminDoctorsData();
    if (res.success && res.data) {
      setDoctors(res.data.doctors);
      setKpis(res.data.kpis);
      if (res.data.doctors.length > 0 && !selectedDoctorId) {
        setSelectedDoctorId(res.data.doctors[0].rawId); 
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // 2. Xử lý Thêm Bác sĩ
  const handleAddSubmit = async () => {
    if (!addForm.name || !addForm.email || !addForm.phone) {
      return alert('Vui lòng điền đủ Họ tên, Email và SĐT!');
    }
    setIsSubmitting(true);
    const res = await addDoctor(addForm);
    setIsSubmitting(false);

    if (res.success) {
      alert(res.message);
      setIsAddModalOpen(false);
      setAddForm({ name: '', dob: '', gender: 'Nam', phone: '', email: '', specialty: 'Nội tổng quát', status: 'Đang làm việc' });
      fetchDoctors(); 
    } else {
      alert(res.message);
    }
  };

  // 3. Xử lý Xóa Bác sĩ
  const handleDeleteDoctor = async (id: number, name: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa bác sĩ ${name}? Hành động này không thể hoàn tác!`)) {
      const res = await deleteDoctor(id);
      if (res.success) {
        alert(res.message);
        setSelectedDoctorId(null);
        fetchDoctors();
      } else {
        alert(res.message);
      }
    }
  };

  const handleLogout = () => router.push('/login');

  // Helpers màu sắc Status
  const getStatusStyle = (status: string) => {
    if (status === 'Đang làm việc') return 'text-green-700 bg-green-100 border-green-200';
    if (status === 'Nghỉ phép') return 'text-yellow-700 bg-yellow-100 border-yellow-200';
    return 'text-red-700 bg-red-100 border-red-200';
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-10 h-10 text-[#2563EB] animate-spin" /></div>;
  }

  // ==========================================
  // XỬ LÝ LỌC DỮ LIỆU (ĐÃ FIX LỖI)
  // ==========================================
  const filteredDoctors = doctors.filter(doc => {
    // Lọc theo Search Term
    const matchSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        doc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        doc.phone.includes(searchTerm);
    
    // Lọc theo Chuyên Khoa (Fix lỗi khoảng trắng và chữ hoa chữ thường)
    const matchSpecialty = filterSpecialty === 'Tất cả' || 
                           doc.specialty?.trim().toLowerCase() === filterSpecialty.trim().toLowerCase();
    
    // Lọc theo Trạng Thái
    const matchStatus = filterStatus === 'Tất cả' || 
                        doc.status?.trim().toLowerCase() === filterStatus.trim().toLowerCase();

    return matchSearch && matchSpecialty && matchStatus;
  });

  // Lấy chi tiết bác sĩ đang được chọn
  const activeDoc = doctors.find(d => d.rawId === selectedDoctorId) || filteredDoctors[0];

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
          
          <div className="space-y-1">
            <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">1. Tổng quan</p>
            <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <LayoutDashboard size={18}/> Dashboard & Báo cáo
            </Link>
          </div>

          <div className="space-y-1">
            <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">2. Phòng khám</p>
            <Link href="/admin/doctors" className="flex items-center gap-3 px-4 py-2.5 bg-[#2563EB] text-white rounded-xl font-medium shadow-md transition-all text-sm">
              <User size={18}/> Quản lý Bác sĩ
            </Link>
            <Link href="/admin/patients" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <Users size={18}/> Quản lý Bệnh nhân
            </Link>
            <Link href="/admin/appointments" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <CalendarDays size={18}/> Quản lý Lịch khám
            </Link>
            <Link href="/admin/records" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <FileText size={18}/> Hồ sơ bệnh án
            </Link>
            <Link href="/admin/prescriptions" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <Pill size={18}/> Quản lý Đơn thuốc
            </Link>
           
          </div>

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

          <div className="space-y-1">
            <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">4. Cấu hình</p>
            <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <Settings size={18}/> Cài đặt chung
            </Link>
          </div>

        </div>

        <div className="p-4 border-t border-gray-800 bg-[#0B1120]">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all text-sm font-bold">
            <LogOut size={18}/> Đăng xuất
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50 relative">
        
        {/* TOP HEADER */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 p-2 rounded-lg"><Stethoscope className="text-[#2563EB]" size={24}/></div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Quản lý Bác sĩ</h1>
              <p className="text-xs text-gray-500 font-medium">Theo dõi thông tin, lịch trực và hiệu suất nhân sự</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#2563EB] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md transition-all flex items-center gap-2 text-sm"
            >
              <Plus size={18}/> Thêm Bác sĩ
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-gray-900">Quản trị viên</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#172554] text-white flex items-center justify-center font-bold border-2 border-white shadow-sm">AD</div>
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-8 animate-in fade-in duration-500">
          
          {/* 6 KPI CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            {[
              { label: 'Tổng bác sĩ', value: kpis.total || 0, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Đang làm việc', value: kpis.working || 0, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Ca khám hôm nay', value: kpis.todayExams || 0, icon: CalendarDays, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { label: 'Đánh giá (TB)', value: kpis.avgRating || 0, icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-50' },
              { label: 'Chuyên khoa', value: kpis.specialties || 0, icon: Building2, color: 'text-purple-600', bg: 'bg-purple-50' },
              { label: 'Đang nghỉ phép', value: kpis.onLeave || 0, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
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
              <div className="relative w-72">
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm kiếm tên, mã, SĐT..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
              </div>
              <select 
                value={filterSpecialty}
                onChange={(e) => setFilterSpecialty(e.target.value)}
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none"
              >
                <option value="Tất cả">Chuyên khoa (Tất cả)</option>
                <option value="Nội tổng quát">Nội tổng quát</option>
                <option value="Tim mạch">Tim mạch</option>
                <option value="Nhi khoa">Nhi khoa</option>
                <option value="Cơ xương khớp">Cơ xương khớp</option>
                <option value="Mắt (Nhãn khoa)">Mắt (Nhãn khoa)</option>
                <option value="Da liễu">Da liễu</option>
              </select>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none"
              >
                <option value="Tất cả">Trạng thái (Tất cả)</option>
                <option value="Đang làm việc">Đang làm việc</option>
                <option value="Nghỉ phép">Nghỉ phép</option>
                <option value="Ngừng công tác">Ngừng công tác</option>
              </select>
            </div>
          </div>

          {/* MASTER-DETAIL LAYOUT */}
          <div className="flex flex-col xl:flex-row gap-8 h-[calc(100vh-320px)] min-h-[500px]">
            
            {/* CỘT TRÁI (MASTER): Danh sách Bác sĩ (55%) */}
            <div className="xl:w-[55%] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center shrink-0">
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><User size={18} className="text-[#2563EB]"/> Danh sách Bác sĩ</h3>
                <span className="text-sm font-bold text-[#2563EB] bg-blue-100 px-3 py-1 rounded-full">{filteredDoctors.length} Kết quả</span>
              </div>
              
              <div className="flex-1 overflow-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-white border-b border-gray-100 text-gray-500 font-bold sticky top-0 z-10 shadow-sm">
                    <tr>
                      <th className="px-5 py-4">Bác sĩ</th>
                      <th className="px-5 py-4">Chuyên khoa</th>
                      <th className="px-5 py-4">Liên hệ</th>
                      <th className="px-5 py-4">Trạng thái</th>
                      <th className="px-5 py-4 text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredDoctors.length > 0 ? filteredDoctors.map((doc) => (
                      <tr 
                        key={doc.rawId} 
                        onClick={() => setSelectedDoctorId(doc.rawId)}
                        className={`cursor-pointer transition-colors ${selectedDoctorId === doc.rawId ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <img src={doc.avatar} alt="Avatar" className="w-10 h-10 rounded-full border border-gray-200"/>
                            <div>
                              <p className={`font-bold ${selectedDoctorId === doc.rawId ? 'text-[#2563EB]' : 'text-gray-900'}`}>{doc.name}</p>
                              <p className="text-xs text-gray-500">{doc.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 font-medium text-gray-700">{doc.specialty}</td>
                        <td className="px-5 py-4">
                          <p className="text-gray-900 font-medium">{doc.phone}</p>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center gap-1.5 w-max ${getStatusStyle(doc.status)}`}>
                            {doc.status === 'Đang làm việc' && <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>}
                            {doc.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button className="p-1.5 text-gray-400 hover:text-[#2563EB] hover:bg-blue-50 rounded transition"><Edit size={16}/></button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleDeleteDoctor(doc.rawId, doc.name); }}
                              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition"
                            >
                              <Trash2 size={16}/>
                            </button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} className="px-5 py-10 text-center text-gray-500">
                          Không tìm thấy bác sĩ nào khớp với bộ lọc.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* CỘT PHẢI (DETAIL): Thông tin chi tiết (45%) */}
            <div className="xl:w-[45%] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
              {activeDoc ? (
                <>
                  {/* Thẻ Hồ sơ tóm tắt */}
                  <div className="p-6 bg-gradient-to-br from-[#172554] to-[#2563EB] text-white relative">
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold text-yellow-300 shadow-sm">
                      <Star fill="currentColor" size={14}/> {activeDoc.rating}
                    </div>
                    <div className="flex gap-5 items-center">
                      <img src={activeDoc.avatar} alt="Avatar" className="w-24 h-24 rounded-2xl border-4 border-white/20 shadow-xl object-cover bg-white"/>
                      <div>
                        <h2 className="text-2xl font-bold">{activeDoc.name}</h2>
                        <p className="text-blue-200 text-sm mt-1">{activeDoc.specialty} • {activeDoc.gender} • {activeDoc.age} tuổi</p>
                        <div className="flex gap-4 mt-3 text-sm font-medium">
                          <p className="flex items-center gap-1.5"><Phone size={14} className="text-blue-300"/> {activeDoc.phone}</p>
                          <p className="flex items-center gap-1.5"><Mail size={14} className="text-blue-300"/> {activeDoc.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* TABS NAVIGATION */}
                  <div className="flex px-2 border-b border-gray-100 bg-gray-50 shrink-0 overflow-x-auto custom-scrollbar">
                    {[
                      { id: 'schedule', label: 'Lịch làm việc', icon: Calendar },
                      { id: 'performance', label: 'Hiệu suất', icon: Activity },
                      { id: 'certificates', label: 'Chứng chỉ', icon: Award },
                      { id: 'activity', label: 'Hoạt động', icon: History }
                    ].map((tab) => (
                      <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 py-3 px-4 font-bold text-sm border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                      >
                        <tab.icon size={16}/> {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* TAB CONTENT */}
                  <div className="flex-1 overflow-y-auto p-6">
                    
                    {/* LỊCH LÀM VIỆC & KHOA PHÒNG */}
                    {activeTab === 'schedule' && (
                      <div className="space-y-6 animate-in fade-in">
                        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-lg shadow-sm"><Building2 className="text-[#2563EB]" size={20}/></div>
                            <div>
                              <p className="text-sm font-bold text-gray-900">Phân công hiện tại</p>
                              <p className="text-xs text-gray-600 mt-0.5">Khoa {activeDoc.specialty} • <span className="font-bold text-[#2563EB]">{activeDoc.room}</span></p>
                            </div>
                          </div>
                          <button className="text-[#2563EB] text-xs font-bold hover:underline">Chuyển khoa</button>
                        </div>

                        <div>
                          <h4 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-2"><Clock size={16} className="text-gray-400"/> Lịch trực tuần này</h4>
                          <div className="space-y-2">
                            {activeDoc.schedule.map((s: any, i: number) => (
                              <div key={i} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg bg-white hover:bg-gray-50 transition">
                                <span className="font-bold text-gray-700 text-sm w-16">{s.day}</span>
                                <span className={`text-sm font-medium ${s.time === 'Nghỉ phép' ? 'text-red-500' : 'text-gray-900'}`}>{s.time}</span>
                                <span className="text-xs text-gray-400 text-right w-32">{s.room}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* HIỆU SUẤT */}
                    {activeTab === 'performance' && (
                      <div className="space-y-6 animate-in fade-in">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border border-gray-100 p-4 rounded-xl text-center bg-gray-50/50">
                            <p className="text-xs text-gray-500 font-bold uppercase mb-1">Tổng ca khám</p>
                            <p className="text-3xl font-black text-[#2563EB]">{activeDoc.totalExams}</p>
                          </div>
                          <div className="border border-gray-100 p-4 rounded-xl text-center bg-gray-50/50">
                            <p className="text-xs text-gray-500 font-bold uppercase mb-1">Đánh giá trung bình</p>
                            <p className="text-3xl font-black text-yellow-500 flex items-center justify-center gap-1">{activeDoc.rating} <Star fill="currentColor" size={20}/></p>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm font-bold text-gray-700 mb-2">
                            <span>Hoàn thành bệnh án</span>
                            <span className="text-green-600">{activeDoc.totalExams > 0 ? Math.round((activeDoc.completed / activeDoc.totalExams)*100) : 0}% ({activeDoc.completed}/{activeDoc.totalExams})</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                            <div className="bg-green-500 h-2 rounded-full" style={{width: `${activeDoc.totalExams > 0 ? (activeDoc.completed / activeDoc.totalExams)*100 : 0}%`}}></div>
                          </div>

                          <div className="flex justify-between text-sm font-bold text-gray-700 mb-2">
                            <span>Tỷ lệ trực đúng giờ</span>
                            <span className="text-[#2563EB]">{activeDoc.onTime}</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div className="bg-[#2563EB] h-2 rounded-full" style={{width: activeDoc.onTime}}></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* CHỨNG CHỈ */}
                    {activeTab === 'certificates' && (
                      <div className="space-y-4 animate-in fade-in">
                        {activeDoc.certificates.length > 0 ? activeDoc.certificates.map((cert: any, i: number) => (
                          <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-sm transition bg-white">
                            <div className="flex items-start gap-3">
                              <FileBadge size={20} className="text-purple-600 shrink-0 mt-0.5"/>
                              <div>
                                <p className="font-bold text-gray-900 text-sm">{cert.name}</p>
                                <p className="text-xs text-gray-500 mt-0.5">Năm: {cert.year}</p>
                              </div>
                            </div>
                            <button className="text-[#2563EB] bg-blue-50 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-100 transition">Xem File</button>
                          </div>
                        )) : (
                          <p className="text-center text-gray-500 py-10">Bác sĩ chưa cập nhật chứng chỉ.</p>
                        )}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                  <User size={64} className="text-gray-200 mb-4" />
                  <h3 className="font-bold text-xl text-gray-700 mb-2">Chưa chọn bác sĩ</h3>
                  <p>Vui lòng chọn một bác sĩ từ danh sách bên trái để xem chi tiết hồ sơ.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* ==========================================
          3. MODAL: THÊM BÁC SĨ MỚI
      ========================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center animate-in fade-in duration-200 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><User size={20} className="text-[#2563EB]"/> Thêm Bác sĩ Mới</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-700 transition"><X size={24}/></button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
              {/* Upload Ảnh */}
              <div className="flex items-center gap-6 mb-6">
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 text-gray-400">
                  <User size={32}/>
                </div>
                <div>
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition">Tải ảnh lên</button>
                  <p className="text-xs text-gray-500 mt-2">JPG, PNG. Max 2MB.</p>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Họ và tên <span className="text-red-500">*</span></label>
                  <input value={addForm.name} onChange={e => setAddForm({...addForm, name: e.target.value})} type="text" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors" placeholder="VD: Nguyễn Văn A"/>
                </div>
                <div className="col-span-2 md:col-span-1 grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Ngày sinh</label>
                    <input value={addForm.dob} onChange={e => setAddForm({...addForm, dob: e.target.value})} type="text" placeholder="DD/MM/YYYY" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors"/>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Giới tính</label>
                    <select value={addForm.gender} onChange={e => setAddForm({...addForm, gender: e.target.value})} className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors">
                      <option value="Nam">Nam</option><option value="Nữ">Nữ</option>
                    </select>
                  </div>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Số điện thoại <span className="text-red-500">*</span></label>
                  <input value={addForm.phone} onChange={e => setAddForm({...addForm, phone: e.target.value})} type="text" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors" placeholder="09xx..."/>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email <span className="text-red-500">*</span></label>
                  <input value={addForm.email} onChange={e => setAddForm({...addForm, email: e.target.value})} type="email" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors" placeholder="email@example.com"/>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Chuyên khoa <span className="text-red-500">*</span></label>
                  <select value={addForm.specialty} onChange={e => setAddForm({...addForm, specialty: e.target.value})} className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors">
                    <option value="Nội tổng quát">Nội tổng quát</option>
                    <option value="Tim mạch">Tim mạch</option>
                    <option value="Nhi khoa">Nhi khoa</option>
                    <option value="Cơ xương khớp">Cơ xương khớp</option>
                    <option value="Mắt (Nhãn khoa)">Mắt (Nhãn khoa)</option>
                    <option value="Da liễu">Da liễu</option>
                  </select>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Trạng thái</label>
                  <select value={addForm.status} onChange={e => setAddForm({...addForm, status: e.target.value})} className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors">
                    <option value="Đang làm việc">Đang làm việc</option>
                    <option value="Nghỉ phép">Nghỉ phép</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
              <button disabled={isSubmitting} onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 transition">Hủy</button>
              <button disabled={isSubmitting} onClick={handleAddSubmit} className="bg-[#2563EB] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md transition flex items-center gap-2 disabled:opacity-50">
                {isSubmitting ? <Loader2 size={18} className="animate-spin"/> : <CheckCircle2 size={18}/>} Lưu hồ sơ
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
} 
