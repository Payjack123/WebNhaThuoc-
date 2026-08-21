'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Users, CalendarDays, FileText, Pill, TestTube, 
  Settings, LogOut, Search, Activity, User, Building2, 
  ShieldCheck, History, Wallet, CheckCircle2, 
  Filter, Plus, Edit, Lock, Unlock, Phone, Mail, MapPin, Loader2, X
} from 'lucide-react';

import { getAdminPatientsData, addPatient, togglePatientStatus } from '@/app/admin/patients/actions';

export default function PatientManagementPage() {
  const router = useRouter();
  
  // States dữ liệu
  const [patients, setPatients] = useState<any[]>([]);
  const [kpis, setKpis] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // States UI & Bộ lọc
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('history');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('Tất cả');
  const [filterStatus, setFilterStatus] = useState('Tất cả');

  // State Form Thêm Bệnh nhân
  const [addForm, setAddForm] = useState({
    name: '', dob: '', gender: 'Nam', phone: '', email: '', 
    address: '', cccd: '', bhyt: '', status: 'Hoạt động'
  });

  const fetchData = async () => {
    setIsLoading(true);
    const res = await getAdminPatientsData();
    if (res.success && res.data) {
      setPatients(res.data.patients);
      setKpis(res.data.kpis);
      if (res.data.patients.length > 0 && !selectedPatientId) {
        setSelectedPatientId(res.data.patients[0].id);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddSubmit = async () => {
    if (!addForm.name || !addForm.phone) {
      return alert('Vui lòng điền đủ Họ tên và Số điện thoại!');
    }
    setIsSubmitting(true);
    const res = await addPatient(addForm);
    setIsSubmitting(false);

    if (res.success) {
      alert(res.message);
      setIsAddModalOpen(false);
      setAddForm({ name: '', dob: '', gender: 'Nam', phone: '', email: '', address: '', cccd: '', bhyt: '', status: 'Hoạt động' });
      fetchData();
    } else {
      alert(res.message);
    }
  };

  const handleToggleStatus = async (id: number, currentStatus: string) => {
    if (confirm(`Bạn muốn ${currentStatus === 'Khóa tài khoản' ? 'MỞ KHÓA' : 'KHÓA'} tài khoản bệnh nhân này?`)) {
      const res = await togglePatientStatus(id, currentStatus);
      if (res.success) {
        fetchData();
      } else {
        alert(res.message);
      }
    }
  };

  const handleLogout = () => router.push('/login');

  // Lọc dữ liệu
  const filteredPatients = patients.filter(pat => {
    const matchSearch = pat.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        pat.patientCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        pat.phone.includes(searchTerm);
    const matchGender = filterGender === 'Tất cả' || pat.gender === filterGender;
    const matchStatus = filterStatus === 'Tất cả' || pat.status === filterStatus;
    return matchSearch && matchGender && matchStatus;
  });

  const activePat = patients.find(p => p.id === selectedPatientId) || filteredPatients[0];

  const getStatusColor = (status: string) => {
    if (status === 'Hoạt động') return 'text-green-700 bg-green-100 border-green-200';
    if (status === 'Khóa tài khoản') return 'text-red-700 bg-red-100 border-red-200';
    if (status === 'Đang điều trị') return 'text-blue-700 bg-blue-100 border-blue-200';
    return 'text-yellow-700 bg-yellow-100 border-yellow-200';
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
            <Link href="/admin/patients" className="flex items-center gap-3 px-4 py-2.5 bg-[#2563EB] text-white rounded-xl font-medium shadow-md transition-all text-sm">
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
            <div className="bg-blue-50 p-2 rounded-lg"><Users className="text-[#2563EB]" size={24}/></div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Quản lý Bệnh nhân</h1>
              <p className="text-xs text-gray-500 font-medium">Quản lý thông tin, hồ sơ và tài khoản của tất cả bệnh nhân</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#2563EB] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md transition-all flex items-center gap-2 text-sm"
            >
              <Plus size={18}/> Thêm Bệnh nhân
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
          
          {/* KPI CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            {[
              { label: 'Tổng bệnh nhân', value: kpis.total, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Đang hoạt động', value: kpis.active, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Đăng ký hôm nay', value: kpis.today, icon: CalendarDays, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { label: 'Đang điều trị', value: kpis.inTreatment, icon: Activity, color: 'text-yellow-600', bg: 'bg-yellow-50' },
              { label: 'Chưa thanh toán', value: kpis.unpaid, icon: Wallet, color: 'text-red-600', bg: 'bg-red-50' },
              { label: 'Đã có hồ sơ', value: kpis.hasRecords, icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' },
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
                  placeholder="Tìm kiếm tên, SĐT, Mã BN..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
              </div>
              <select 
                value={filterGender}
                onChange={(e) => setFilterGender(e.target.value)}
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none"
              >
                <option value="Tất cả">Giới tính (Tất cả)</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none"
              >
                <option value="Tất cả">Trạng thái (Tất cả)</option>
                <option value="Hoạt động">Hoạt động</option>
                <option value="Khóa tài khoản">Khóa tài khoản</option>
                <option value="Đang điều trị">Đang điều trị</option>
              </select>
            </div>
          </div>

          {/* MASTER-DETAIL LAYOUT */}
          <div className="flex flex-col xl:flex-row gap-8 h-[calc(100vh-320px)] min-h-[550px]">
            
            {/* CỘT TRÁI (MASTER) */}
            <div className="xl:w-[55%] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center shrink-0">
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><Users size={18} className="text-[#2563EB]"/> Danh sách Bệnh nhân</h3>
                <span className="text-sm font-bold text-[#2563EB] bg-blue-100 px-3 py-1 rounded-full">{filteredPatients.length} Kết quả</span>
              </div>
              
              <div className="flex-1 overflow-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-white border-b border-gray-100 text-gray-500 font-bold sticky top-0 z-10 shadow-sm">
                    <tr>
                      <th className="px-5 py-4">Bệnh nhân</th>
                      <th className="px-5 py-4">SĐT</th>
                      <th className="px-5 py-4">Khám gần nhất</th>
                      <th className="px-5 py-4">Trạng thái</th>
                      <th className="px-5 py-4 text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredPatients.length > 0 ? filteredPatients.map((pat) => (
                      <tr 
                        key={pat.id} 
                        onClick={() => setSelectedPatientId(pat.id)}
                        className={`cursor-pointer transition-colors ${selectedPatientId === pat.id ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <img src={pat.avatar} alt="Avatar" className="w-10 h-10 rounded-full border border-gray-200"/>
                            <div>
                              <p className={`font-bold ${selectedPatientId === pat.id ? 'text-[#2563EB]' : 'text-gray-900'}`}>{pat.name}</p>
                              <p className="text-xs text-gray-500">{pat.patientCode} • {pat.gender} • {pat.age}T</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 font-medium text-gray-700">{pat.phone}</td>
                        <td className="px-5 py-4 font-medium text-gray-700">{pat.lastVisit}</td>
                        <td className="px-5 py-4">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center w-max gap-1.5 ${getStatusColor(pat.status)}`}>
                            {pat.status === 'Hoạt động' && <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>}
                            {pat.status === 'Khóa tài khoản' && <Lock size={12}/>}
                            {pat.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button className="p-1.5 text-gray-400 hover:text-[#2563EB] hover:bg-blue-50 rounded transition" title="Chỉnh sửa"><Edit size={16}/></button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleToggleStatus(pat.id, pat.status); }}
                              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition" 
                              title={pat.status === 'Khóa tài khoản' ? 'Mở khóa' : 'Khóa tài khoản'}
                            >
                              {pat.status === 'Khóa tài khoản' ? <Unlock size={16}/> : <Lock size={16}/>}
                            </button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan={5} className="px-5 py-10 text-center text-gray-500">Không tìm thấy bệnh nhân nào.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* CỘT PHẢI (DETAIL) */}
            <div className="xl:w-[45%] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
              {activePat ? (
                <>
                  <div className="p-6 bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white relative">
                    <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold shadow-sm border border-white/20">
                      {activePat.status === 'Hoạt động' ? <CheckCircle2 size={14} className="text-green-400"/> : <Lock size={14} className="text-red-400"/>}
                      {activePat.status}
                    </div>
                    <div className="flex gap-5 items-center">
                      <img src={activePat.avatar} alt="Avatar" className="w-20 h-20 rounded-2xl border-4 border-white/20 shadow-xl"/>
                      <div>
                        <h2 className="text-2xl font-bold">{activePat.name}</h2>
                        <p className="text-gray-300 text-sm mt-1">Mã BN: {activePat.patientCode} • {activePat.gender} • {activePat.age} tuổi</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm font-medium">
                          <p className="flex items-center gap-1.5"><Phone size={14} className="text-gray-400"/> {activePat.phone}</p>
                          <p className="flex items-center gap-1.5"><Mail size={14} className="text-gray-400"/> {activePat.email}</p>
                          <p className="flex items-center gap-1.5 w-full"><MapPin size={14} className="text-gray-400"/> {activePat.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex px-2 border-b border-gray-100 bg-gray-50 shrink-0 overflow-x-auto custom-scrollbar">
                    {[
                      { id: 'history', label: 'Lịch sử khám', icon: CalendarDays },
                      { id: 'records', label: 'Hồ sơ bệnh án', icon: FileText },
                      { id: 'payments', label: 'Thanh toán', icon: Wallet },
                      { id: 'account', label: 'Tài khoản', icon: ShieldCheck }
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

                  <div className="flex-1 overflow-y-auto p-6">
                    {/* Placeholder content for Tabs */}
                    {activeTab === 'history' && (
                      <div className="text-center py-10 text-gray-400">
                        <CalendarDays size={40} className="mx-auto mb-3 opacity-50" />
                        <p>Lịch sử khám của bệnh nhân sẽ hiển thị ở đây.</p>
                      </div>
                    )}
                    {activeTab === 'records' && (
                       <div className="text-center py-10 text-gray-400">
                       <FileText size={40} className="mx-auto mb-3 opacity-50" />
                       <p>Hồ sơ bệnh án chi tiết sẽ hiển thị ở đây.</p>
                     </div>
                    )}
                    {activeTab === 'account' && (
                      <div className="space-y-4 animate-in fade-in">
                        <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-white hover:shadow-sm transition">
                          <div className="flex items-center gap-3">
                            <div className="bg-gray-100 p-2 rounded-lg"><ShieldCheck className="text-gray-600" size={18}/></div>
                            <span className="font-bold text-gray-900 text-sm">Trạng thái tài khoản</span>
                          </div>
                          <span className={`text-sm font-bold flex items-center gap-1 ${activePat.status === 'Khóa tài khoản' ? 'text-red-500' : 'text-green-600'}`}>
                            {activePat.status === 'Khóa tài khoản' ? <Lock size={16}/> : <Unlock size={16}/>} 
                            {activePat.status}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-400">Chưa chọn bệnh nhân</div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* MODAL: THÊM BỆNH NHÂN */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><User size={20} className="text-[#2563EB]"/> Thêm Bệnh nhân Mới</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-700 transition"><X size={24}/></button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Họ và tên <span className="text-red-500">*</span></label>
                  <input value={addForm.name} onChange={e => setAddForm({...addForm, name: e.target.value})} type="text" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors" placeholder="Nguyễn Văn A"/>
                </div>
                <div className="col-span-2 md:col-span-1 grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Ngày sinh (DD/MM/YYYY)</label>
                    <input value={addForm.dob} onChange={e => setAddForm({...addForm, dob: e.target.value})} type="text" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors"/>
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
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                  <input value={addForm.email} onChange={e => setAddForm({...addForm, email: e.target.value})} type="email" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors" placeholder="email@example.com"/>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Số CCCD / CMND</label>
                  <input value={addForm.cccd} onChange={e => setAddForm({...addForm, cccd: e.target.value})} type="text" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors" placeholder="Nhập số CCCD"/>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Số BHYT</label>
                  <input value={addForm.bhyt} onChange={e => setAddForm({...addForm, bhyt: e.target.value})} type="text" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors" placeholder="Nhập mã số BHYT"/>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Địa chỉ liên hệ</label>
                  <input value={addForm.address} onChange={e => setAddForm({...addForm, address: e.target.value})} type="text" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors" placeholder="Số nhà, đường, phường/xã..."/>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Trạng thái tài khoản</label>
                  <select value={addForm.status} onChange={e => setAddForm({...addForm, status: e.target.value})} className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors">
                    <option value="Hoạt động">Hoạt động</option>
                    <option value="Chờ xác minh">Chờ xác minh</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button disabled={isSubmitting} onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 transition">Hủy</button>
              <button disabled={isSubmitting} onClick={handleAddSubmit} className="bg-[#2563EB] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md transition flex items-center gap-2">
                {isSubmitting ? <Loader2 size={18} className="animate-spin"/> : <CheckCircle2 size={18}/>} Lưu hồ sơ
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
} 