'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, CalendarDays, Users, FileText, Pill, TestTube, 
  BarChart3, Bell, User, Settings, LogOut, Search, Plus, ShieldCheck,
  CheckCircle2, Clock, Activity, Printer, Building2,Wallet,Check,
  ChevronRight, FileSpreadsheet, Stethoscope, Save, Filter,
  Image as ImageIcon, Download, TrendingUp, Calendar, QrCode, Star, Heart, Droplet, ShieldPlus, Weight, Thermometer, FilePlus, Paperclip, Edit, Loader2
} from 'lucide-react';

import { getAdminMedicalRecordsData } from '@/app/admin/records/actions';

export default function AdminRecordsPage() {
  const router = useRouter();
  
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('content');

  // Lọc
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Trạng thái (Tất cả)');
  const [filterSpecialty, setFilterSpecialty] = useState('Chuyên khoa (Tất cả)');
  const [filterDoctor, setFilterDoctor] = useState('Bác sĩ (Tất cả)');

  const fetchData = async () => {
    setIsLoading(true);
    const res = await getAdminMedicalRecordsData();
    if (res.success && res.data) {
      setData(res.data);
      if (res.data.records.length > 0) {
        setSelectedRecordId(res.data.records[0].id);
      }
    } else {
      router.push('/login');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [router]);

  const handleLogout = () => {
    router.push('/login');
  };

  if (isLoading || !data) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-10 h-10 text-[#2563EB] animate-spin" /></div>;

  // Xử lý bộ lọc
  const filteredRecords = data.records.filter((r: any) => {
    const matchSearch = r.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        r.baCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'Trạng thái (Tất cả)' || r.status === filterStatus;
    const matchSpecialty = filterSpecialty === 'Chuyên khoa (Tất cả)' || r.specialty === filterSpecialty;
    const matchDoctor = filterDoctor === 'Bác sĩ (Tất cả)' || r.doctor === filterDoctor;
    return matchSearch && matchStatus && matchSpecialty && matchDoctor;
  });

  const activeBA = data.records.find((r: any) => r.id === selectedRecordId) || filteredRecords[0];

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
            <Link href="/admin/doctors" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <User size={18}/> Quản lý Bác sĩ
            </Link>
            <Link href="/admin/patients" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <Users size={18}/> Quản lý Bệnh nhân
            </Link>
            <Link href="/admin/appointments" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <CalendarDays size={18}/> Quản lý Lịch khám
            </Link>
            <Link href="/admin/records" className="flex items-center gap-3 px-4 py-2.5 bg-[#2563EB] text-white rounded-xl font-medium shadow-md transition-all text-sm">
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
            <div className="bg-blue-50 p-2 rounded-lg"><FileText className="text-[#2563EB]" size={24}/></div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Quản lý Hồ sơ Bệnh án</h1>
              <p className="text-xs text-gray-500 font-medium">Quản lý, tra cứu và theo dõi toàn bộ hồ sơ khám chữa bệnh</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 pl-4 border-gray-200">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-gray-900">Quản trị viên</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#172554] text-white flex items-center justify-center font-bold border-2 border-white shadow-sm">AD</div>
            </div>
          </div>
        </header>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto p-8 animate-in fade-in duration-500">
          
          {/* KPI CARDS (Dữ liệu thật) */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0"><FileText size={24}/></div>
              <div><p className="text-xs text-gray-500 font-bold uppercase">Tổng hồ sơ</p><p className="text-2xl font-black text-gray-900">{data.kpis.total}</p></div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0"><FilePlus size={24}/></div>
              <div><p className="text-xs text-gray-500 font-bold uppercase">Tạo hôm nay</p><p className="text-2xl font-black text-gray-900">{data.kpis.createdToday}</p></div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center shrink-0"><Stethoscope size={24}/></div>
              <div><p className="text-xs text-gray-500 font-bold uppercase">Đang điều trị</p><p className="text-2xl font-black text-gray-900">{data.kpis.inTreatment}</p></div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center shrink-0"><CheckCircle2 size={24}/></div>
              <div><p className="text-xs text-gray-500 font-bold uppercase">Đã hoàn thành</p><p className="text-2xl font-black text-gray-900">{data.kpis.completed}</p></div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0"><Paperclip size={24}/></div>
              <div><p className="text-xs text-gray-500 font-bold uppercase">Tệp đính kèm</p><p className="text-2xl font-black text-gray-900">{data.kpis.withAttachments}</p></div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-2xl flex items-center justify-center shrink-0"><User size={24}/></div>
              <div><p className="text-xs text-gray-500 font-bold uppercase">BS Tham gia</p><p className="text-2xl font-black text-gray-900">{data.kpis.doctorsCount}</p></div>
            </div>
          </div>

          {/* SEARCH & FILTER BAR */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col lg:flex-row gap-4 justify-between items-center">
            <div className="flex-1 flex gap-4 w-full">
              <div className="relative w-64">
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm tên BN, mã BA..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
              </div>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none">
                <option value="Trạng thái (Tất cả)">Trạng thái (Tất cả)</option>
                <option value="Hoàn thành">Hoàn thành</option>
                <option value="Đang điều trị">Đang điều trị</option>
              </select>
              <select value={filterSpecialty} onChange={(e) => setFilterSpecialty(e.target.value)} className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none hidden md:block">
                <option value="Chuyên khoa (Tất cả)">Chuyên khoa (Tất cả)</option>
                {data.filters.specialties.map((s: string) => <option key={s} value={s}>{s}</option>)}
              </select>
              <select value={filterDoctor} onChange={(e) => setFilterDoctor(e.target.value)} className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none hidden lg:block">
                <option value="Bác sĩ (Tất cả)">Bác sĩ (Tất cả)</option>
                {data.filters.doctors.map((d: string) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="flex gap-2">
              <button className="bg-gray-100 border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-50 font-bold transition flex items-center gap-2 whitespace-nowrap">
                <Printer size={18}/> Xuất danh sách
              </button>
            </div>
          </div>

          {/* MASTER-DETAIL LAYOUT */}
          <div className="flex flex-col xl:flex-row gap-8 h-[calc(100vh-320px)] min-h-[550px]">
            
            {/* CỘT TRÁI (MASTER): Danh sách Bệnh án (40%) */}
            <div className="xl:w-[40%] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center shrink-0">
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><FileText size={18} className="text-[#2563EB]"/> Danh sách Bệnh án</h3>
                <span className="text-sm font-bold text-[#2563EB] bg-blue-100 px-3 py-1 rounded-full">{filteredRecords.length} Kết quả</span>
              </div>
              
              <div className="flex-1 overflow-auto custom-scrollbar">
                <div className="divide-y divide-gray-50">
                  {filteredRecords.length > 0 ? filteredRecords.map((rec: any) => (
                    <div 
                      key={rec.id} 
                      onClick={() => setSelectedRecordId(rec.id)}
                      className={`p-4 cursor-pointer transition-colors border-l-4 ${selectedRecordId === rec.id ? 'bg-blue-50/50 border-[#2563EB]' : 'border-transparent hover:bg-gray-50'}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className={`font-bold ${selectedRecordId === rec.id ? 'text-[#2563EB]' : 'text-gray-900'}`}>{rec.patient}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{rec.baCode} • {rec.doctor}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${rec.statusColor}`}>
                          {rec.status}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 space-y-1">
                        <p className="font-medium text-gray-700 truncate block">CĐ: {rec.diagnosis}</p>
                        <p className="flex items-center gap-1 mt-2 text-gray-400"><Calendar size={12}/> {rec.date} - {rec.time}</p>
                      </div>
                    </div>
                  )) : (
                    <div className="p-8 text-center text-gray-400">Không tìm thấy hồ sơ bệnh án nào.</div>
                  )}
                </div>
              </div>
            </div>

            {/* CỘT PHẢI (DETAIL): Chi tiết bệnh án (60%) */}
            <div className="xl:w-[60%] h-full bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
              
              {activeBA ? (
                <>
                  <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50/50 to-white shrink-0">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <img src={`https://ui-avatars.com/api/?name=${activeBA.patient.replace(/ /g, '+')}&background=random`} alt="Avatar" className="w-16 h-16 rounded-xl border border-gray-200 shadow-sm"/>
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">{activeBA.patient}</h2>
                          <p className="text-sm text-gray-500 mt-1">
                            Mã BN: {activeBA.patientId} • {activeBA.gender} • {activeBA.age} tuổi • Nhóm máu: {activeBA.bloodType} • <span className={activeBA.bhyt === 'Có' ? "text-green-600 font-medium" : "text-gray-400"}>BHYT: {activeBA.bhyt}</span>
                          </p>
                          <div className="flex gap-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded"><FileText size={14}/> {activeBA.baCode}</span>
                            <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded"><Calendar size={14}/> {activeBA.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => window.print()} className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition" title="In hồ sơ"><Printer size={18}/></button>
                        <button className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg font-bold hover:bg-red-100 transition flex items-center gap-2">
                          <QrCode size={18}/> Xuất PDF
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex px-6 border-b border-gray-200 bg-white shrink-0 overflow-x-auto custom-scrollbar">
                    {[
                      { id: 'content', label: 'Nội dung', icon: FileText },
                      { id: 'timeline', label: 'Lịch sử', icon: Clock },
                      { id: 'prescriptions', label: 'Đơn thuốc', icon: Pill },
                      { id: 'labs', label: 'Xét nghiệm', icon: TestTube }
                    ].map((tab) => (
                      <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-3 px-4 font-bold text-sm border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${activeTab === tab.id ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                      >
                        <tab.icon size={14}/> {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30 custom-scrollbar">
                    
                    {/* TAB: NỘI DUNG BỆNH ÁN */}
                    {activeTab === 'content' && (
                      <div className="space-y-5 animate-in fade-in">
                        {/* Chỉ số sinh tồn */}
                        <div className="grid grid-cols-4 gap-4 mb-4">
                          <div className="bg-white p-3 rounded-xl border border-gray-100 text-center shadow-sm">
                            <p className="text-[10px] text-gray-500 font-bold uppercase">Nhịp tim</p>
                            <p className="text-lg font-black text-gray-900">{activeBA.vitals.heartRate}</p>
                          </div>
                          <div className="bg-white p-3 rounded-xl border border-gray-100 text-center shadow-sm">
                            <p className="text-[10px] text-gray-500 font-bold uppercase">Huyết áp</p>
                            <p className="text-lg font-black text-gray-900">{activeBA.vitals.bloodPressure}</p>
                          </div>
                          <div className="bg-white p-3 rounded-xl border border-gray-100 text-center shadow-sm">
                            <p className="text-[10px] text-gray-500 font-bold uppercase">Nhiệt độ</p>
                            <p className="text-lg font-black text-gray-900">{activeBA.vitals.temperature}</p>
                          </div>
                          <div className="bg-white p-3 rounded-xl border border-gray-100 text-center shadow-sm">
                            <p className="text-[10px] text-gray-500 font-bold uppercase">BMI</p>
                            <p className="text-lg font-black text-gray-900">{activeBA.vitals.bmi}</p>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                          <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Lý do khám / Triệu chứng</h4>
                          <p className="text-sm text-gray-900 font-medium whitespace-pre-wrap">{activeBA.symptoms}</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl shadow-sm">
                          <h4 className="text-xs font-bold text-[#2563EB] uppercase mb-2 flex items-center gap-1.5"><Stethoscope size={14}/> Chẩn đoán</h4>
                          <p className="text-base text-blue-900 font-bold">{activeBA.diagnosis}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                          <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Hướng điều trị / Lời dặn</h4>
                          <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                            {activeBA.notes}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 pt-2">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold border border-gray-300">BS</div>
                          <div>
                            <p className="text-xs text-gray-500">Bác sĩ điều trị</p>
                            <p className="font-bold text-gray-900 text-sm">{activeBA.doctor}</p>
                            <p className="text-xs text-gray-500">{activeBA.specialty}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB: LỊCH SỬ (TIMELINE) */}
                    {activeTab === 'timeline' && (
                      <div className="space-y-0 relative before:absolute before:inset-0 before:ml-[13px] before:-translate-x-px before:h-full before:w-0.5 before:bg-gray-200 animate-in fade-in">
                        <div className="relative pl-8 pb-6">
                          <span className="absolute left-0 top-1 w-7 h-7 bg-[#2563EB] text-white border-2 border-white shadow-sm rounded-full flex items-center justify-center -translate-x-2.5 z-10"><CheckCircle2 size={14}/></span>
                          <div>
                            <p className="text-xs text-[#2563EB] font-bold">{new Date(activeBA.updatedAt).toLocaleString('vi-VN')}</p>
                            <h4 className="font-bold text-[#2563EB] mt-1">Cập nhật hồ sơ</h4>
                            <p className="text-sm text-gray-600 mt-0.5">Trạng thái: {activeBA.status}</p>
                          </div>
                        </div>
                        <div className="relative pl-8">
                          <span className="absolute left-0 top-1 w-7 h-7 bg-white text-gray-400 border-2 border-gray-200 rounded-full flex items-center justify-center -translate-x-2.5 z-10"><Check size={14}/></span>
                          <div>
                            <p className="text-xs text-gray-500 font-bold">{new Date(activeBA.createdAt).toLocaleString('vi-VN')}</p>
                            <h4 className="font-bold text-gray-900 mt-1">Khởi tạo bệnh án</h4>
                            <p className="text-sm text-gray-600 mt-0.5">Tạo bởi {activeBA.doctor}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB: ĐƠN THUỐC */}
                    {activeTab === 'prescriptions' && (
                      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm animate-in fade-in">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                          <h3 className="font-bold text-gray-900 flex items-center gap-2"><Pill size={18} className="text-[#2563EB]"/> Đơn thuốc được kê</h3>
                        </div>
                        <table className="w-full text-left text-sm">
                          <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-bold">
                            <tr><th className="px-4 py-3">Tên thuốc</th><th className="px-4 py-3">Liều dùng</th><th className="px-4 py-3 text-center">Số lượng</th></tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50">
                            {activeBA.prescription?.items?.length > 0 ? activeBA.prescription.items.map((item: any, i: number) => (
                              <tr key={i} className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-bold text-gray-900">{item.medicationName}</td>
                                <td className="px-4 py-3 text-gray-600">{item.dosage}</td>
                                <td className="px-4 py-3 text-center font-bold text-[#2563EB]">{item.remaining}</td>
                              </tr>
                            )) : (
                              <tr><td colSpan={3} className="px-4 py-8 text-center text-gray-500">Chưa có thuốc nào được kê cho hồ sơ này.</td></tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* TAB: XÉT NGHIỆM */}
                    {activeTab === 'labs' && (
                      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm animate-in fade-in">
                        <table className="w-full text-left text-sm">
                          <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-bold">
                            <tr><th className="px-4 py-3">Loại XN</th><th className="px-4 py-3">Ngày</th><th className="px-4 py-3">Trạng thái</th></tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50">
                            {activeBA.labTests?.length > 0 ? activeBA.labTests.map((lab: any) => (
                              <tr key={lab.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-bold text-gray-900">{lab.testName}</td>
                                <td className="px-4 py-3 text-gray-600 font-medium">{new Date(lab.date).toLocaleDateString('vi-VN')}</td>
                                <td className="px-4 py-3 font-bold text-blue-600">{lab.statusType}</td>
                              </tr>
                            )) : (
                              <tr><td colSpan={3} className="px-4 py-8 text-center text-gray-500">Chưa có chỉ định xét nghiệm nào.</td></tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}

                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center bg-gray-50/30">
                  <FileText size={64} className="mb-4 opacity-20" />
                  <p className="font-bold text-gray-600">Bạn chưa chọn hồ sơ nào</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>

    </div>
  );
}