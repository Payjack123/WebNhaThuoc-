'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard, Users, CalendarDays, FileText, Pill, TestTube,
  Settings, LogOut, Search, Activity, User, Building2,
  ShieldCheck, History, Wallet, CheckCircle2,
  Clock, XCircle, Filter, Plus, Edit, Trash2, Calendar,
  MapPin, Stethoscope, ChevronRight, UserCog, CheckCircle, Printer, Download, Info, FileSignature, ShieldPlus, Loader2, Bell, MoreHorizontal
} from 'lucide-react';

import { getAdminPrescriptionsData } from '@/app/admin/prescriptions/actions';

export default function AdminPrescriptionsPage() {
  const router = useRouter();

  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('Tất cả bác sĩ');
  const [selectedPatient, setSelectedPatient] = useState('Chọn bệnh nhân');
  const [filterStatus, setFilterStatus] = useState('Tất cả trạng thái');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getAdminPrescriptionsData();
      if (res.success && res.data) {
        setData(res.data);
      } else {
        router.push('/login');
      }
      setIsLoading(false);
    };
    fetchData();
  }, [router]);

  const handleLogout = () => router.push('/login');

  if (isLoading || !data) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-10 h-10 text-[#2563EB] animate-spin" /></div>;

  const filteredPrescriptions = data.prescriptions.filter((p: any) => {
    const matchSearch = p.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'Tất cả trạng thái' || p.status === filterStatus;
    const matchDoctor = selectedDoctor === 'Tất cả bác sĩ' || p.doctor === selectedDoctor;
    const matchPatient = selectedPatient === 'Chọn bệnh nhân' || p.patient === selectedPatient;

    // Add simple date filtering if needed...

    return matchSearch && matchStatus && matchDoctor && matchPatient;
  });

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans text-gray-800 overflow-hidden">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0F172A] text-gray-300 flex flex-col h-screen sticky top-0 shrink-0 shadow-xl z-20">
        <div className="h-20 flex items-center justify-center border-b border-gray-800 bg-[#0B1120]">
          <div className="flex items-center gap-2 text-white">
            <Activity className="text-[#2563EB]" size={28} />
            <span className="font-bold text-xl tracking-tight">ADMIN<span className="text-[#2563EB]">PRO</span></span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-6 px-3 custom-scrollbar">
          <div className="space-y-1">
            <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">1. Tổng quan</p>
            <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <LayoutDashboard size={18} /> Dashboard & Báo cáo
            </Link>
          </div>

          <div className="space-y-1">
            <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">2. Phòng khám</p>
            <Link href="/admin/doctors" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <User size={18} /> Quản lý Bác sĩ
            </Link>
            <Link href="/admin/patients" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <Users size={18} /> Quản lý Bệnh nhân
            </Link>
            <Link href="/admin/appointments" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <CalendarDays size={18} /> Quản lý Lịch khám
            </Link>
            <Link href="/admin/records" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <FileText size={18} /> Hồ sơ bệnh án
            </Link>
            <Link href="/admin/prescriptions" className="flex items-center gap-3 px-4 py-2.5 bg-[#2563EB] text-white rounded-xl font-medium shadow-md transition-all text-sm">
              <Pill size={18} /> Quản lý Đơn thuốc
            </Link>

          </div>

          <div className="space-y-1">
            <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">3. Hệ thống</p>
            <Link href="/admin/users" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <ShieldCheck size={18} /> Phân quyền (RBAC)
            </Link>
            <Link href="/admin/departments" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <Building2 size={18} /> Khoa phòng & Dịch vụ
            </Link>
            <Link href="/admin/billing" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <Wallet size={18} /> Thanh toán & Viện phí
            </Link>
          </div>

          <div className="space-y-1">
            <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">4. Cấu hình</p>
            <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <Settings size={18} /> Cài đặt chung
            </Link>
          </div>
        </div>

        <div className="p-4 border-t border-gray-800 bg-[#0B1120]">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all text-sm font-bold">
            <LogOut size={18} /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F8FAFC] relative font-sans">

        {/* TOP HEADER */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 p-2.5 rounded-xl"><FileText className="text-blue-600" size={24} /></div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Quản lý đơn thuốc</h1>
              <p className="text-[13px] text-gray-500 font-medium mt-0.5">Quản lý toàn bộ đơn thuốc trong hệ thống</p>
            </div>
          </div>
          <div className="flex items-center gap-6 shrink-0">
            <div className="flex items-center gap-4">

              <button className="relative text-gray-500 hover:text-gray-900 transition-colors">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">5</span>
              </button>
              <button className="text-gray-500 hover:text-gray-900 transition-colors"><ShieldCheck size={20} /></button>
            </div>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200 cursor-pointer">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-gray-900">Admin</p>
                <p className="text-[11px] font-medium text-gray-500">Quản trị hệ thống</p>
              </div>
              <img src="https://ui-avatars.com/api/?name=Admin&background=2563EB&color=fff" alt="Admin" className="w-9 h-9 rounded-full shadow-sm" />
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">



          {/* KPI CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0"><FileText size={28} strokeWidth={2} /></div>
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">Tổng đơn thuốc</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-black text-blue-600 tracking-tight">{data.kpis.total}</p>
                  <span className="text-sm font-bold text-gray-500">đơn</span>
                </div>
                <p className="text-xs font-medium text-gray-500 mt-1">Tất cả đơn thuốc</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-14 h-14 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center shrink-0"><CheckCircle2 size={28} strokeWidth={2.5} /></div>
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">Đã hoàn thành</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-black text-green-600 tracking-tight">{data.kpis.dispensed}</p>
                  <span className="text-sm font-bold text-gray-500">đơn</span>
                </div>
                <p className="text-xs font-bold text-gray-400 mt-1">{data.kpis.dispensedPercent}%</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-14 h-14 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center shrink-0"><Clock size={28} strokeWidth={2.5} /></div>
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">Chờ xử lý</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-black text-gray-900 tracking-tight">{data.kpis.waiting}</p>
                  <span className="text-sm font-bold text-gray-500">đơn</span>
                </div>
                <p className="text-xs font-bold text-gray-400 mt-1">{data.kpis.waitingPercent}%</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-14 h-14 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center shrink-0"><XCircle size={28} strokeWidth={2.5} /></div>
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">Đã hủy</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-black text-gray-900 tracking-tight">{data.kpis.canceled}</p>
                  <span className="text-sm font-bold text-gray-500">đơn</span>
                </div>
                <p className="text-xs font-bold text-gray-400 mt-1">{data.kpis.canceledPercent}%</p>
              </div>
            </div>
          </div>

          {/* SEARCH & FILTER BAR */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
            <div className="flex flex-wrap items-end gap-4">
              <div className="w-full sm:w-[140px]">
                <label className="block text-xs font-bold text-gray-500 mb-2">Từ ngày</label>
                <div className="relative">
                  <input type="text" value="01/08/2026" readOnly className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none" />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
              <div className="w-full sm:w-[140px]">
                <label className="block text-xs font-bold text-gray-500 mb-2">Đến ngày</label>
                <div className="relative">
                  <input type="text" value="15/08/2026" readOnly className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none" />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>

              <div className="flex-1 min-w-[150px]">
                <label className="block text-xs font-bold text-gray-500 mb-2">Bác sĩ</label>
                <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white focus:ring-2 focus:ring-[#2563EB] outline-none cursor-pointer appearance-none">
                  <option value="Tất cả bác sĩ">Tất cả bác sĩ</option>
                  {data.filterData.doctors.map((d: string) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div className="flex-1 min-w-[150px]">
                <label className="block text-xs font-bold text-gray-500 mb-2">Bệnh nhân</label>
                <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white focus:ring-2 focus:ring-[#2563EB] outline-none cursor-pointer appearance-none text-gray-400">
                  <option value="Chọn bệnh nhân">Chọn bệnh nhân</option>
                  {data.filterData.patients.map((p: string) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div className="flex-1 min-w-[150px]">
                <label className="block text-xs font-bold text-gray-500 mb-2">Trạng thái</label>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white focus:ring-2 focus:ring-[#2563EB] outline-none cursor-pointer appearance-none">
                  <option value="Tất cả trạng thái">Tất cả trạng thái</option>
                  <option value="Đã hoàn thành">Đã hoàn thành</option>
                  <option value="Chờ xử lý">Chờ xử lý</option>
                  <option value="Đã hủy">Đã hủy</option>
                </select>
              </div>

              <div className="flex-[1.5] min-w-[200px]">
                <label className="block text-xs font-bold text-gray-500 mb-2">Tìm kiếm</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Tìm theo mã đơn, tên thuốc..."
                    className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>

              <div className="flex gap-2">
                <button className="bg-white border border-[#2563EB] text-[#2563EB] px-5 py-2.5 rounded-xl font-bold hover:bg-blue-50 transition flex items-center gap-2 text-sm shadow-sm">
                  <Filter size={16} /> Bộ lọc
                </button>
                <button
                  onClick={() => { setSearchTerm(''); setFilterStatus('Tất cả trạng thái'); setSelectedDoctor('Tất cả bác sĩ'); setSelectedPatient('Chọn bệnh nhân'); }}
                  className="bg-white border border-gray-200 text-gray-600 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-50 transition flex items-center gap-2 text-sm shadow-sm"
                >
                  Đặt lại
                </button>
              </div>
            </div>
          </div>

          {/* MAIN TABLE */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white">
              <h3 className="font-bold text-gray-900 text-lg">Danh sách đơn thuốc</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-500 font-bold">
                  <tr>
                    <th className="pl-6 pr-4 py-4 w-10">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    </th>
                    <th className="px-4 py-4">Mã đơn thuốc</th>
                    <th className="px-4 py-4">Bệnh nhân</th>
                    <th className="px-4 py-4">Bác sĩ</th>
                    <th className="px-4 py-4">Ngày kê đơn</th>
                    <th className="px-4 py-4">Chẩn đoán</th>
                    <th className="px-4 py-4 text-center">Tổng thuốc</th>
                    <th className="px-4 py-4">Trạng thái</th>
                    <th className="px-4 py-4 text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPrescriptions.length > 0 ? filteredPrescriptions.map((p: any) => (
                    <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="pl-6 pr-4 py-4">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      </td>
                      <td className="px-4 py-4 font-bold text-[#2563EB]">{p.code}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <img src={p.patientAvatar} alt={p.patient} className="w-10 h-10 rounded-full border border-gray-100 shadow-sm" />
                          <div>
                            <p className="font-bold text-gray-900">{p.patient}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{p.gender}, {p.age} tuổi</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-bold text-gray-900">{p.doctor}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{p.specialty}</p>
                      </td>
                      <td className="px-4 py-4 text-gray-600 font-medium">{p.date}</td>
                      <td className="px-4 py-4 text-gray-900 font-medium truncate max-w-[150px]" title={p.diagnosis}>{p.diagnosis}</td>
                      <td className="px-4 py-4 text-center font-bold text-gray-900">{p.drugCount}</td>
                      <td className="px-4 py-4">
                        <span className={`px-2.5 py-1 rounded text-[11px] font-bold tracking-wide ${p.statusColor}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button className="w-8 h-8 rounded-full border border-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-50 transition-colors" title="Xem chi tiết">
                            <Activity size={14} />
                          </button>
                          <button className="w-8 h-8 rounded-full border border-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-50 transition-colors" title="In đơn">
                            <Printer size={14} />
                          </button>
                          <button className="w-8 h-8 rounded-full border border-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-50 transition-colors" title="Thêm">
                            <MoreHorizontal size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={9} className="px-4 py-10 text-center text-gray-500 font-medium bg-gray-50/50">Không tìm thấy dữ liệu phù hợp.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                Hiển thị
                <select className="border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
                kết quả mỗi trang
              </div>
              <div className="flex items-center gap-1.5">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition">«</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#2563EB] text-white font-bold shadow-sm">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition">3</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition">4</button>
                <span className="w-8 h-8 flex items-center justify-center text-gray-400">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition">125</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition">»</button>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}