'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard, CalendarDays, FileText, Pill, TestTube, BarChart3,
  Bell, Settings, LogOut, Search, Activity, User, Edit,
  Clock, CheckCircle2, Printer, Info, Plus, Users, Trash2, Calendar, Star, FileDown, Loader2, Filter, XCircle, ShieldAlert, ChevronUp, ChevronDown
} from 'lucide-react';

import DoctorSidebar from "@/app/doctor/Sidebar";

import { getDoctorPrescriptionsData, deletePrescription, dispensePrescription } from '@/app/doctor/prescriptions/actions';

export default function DoctorPrescriptionsPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('drugs');

  // STATE BỘ LỌC DỮ LIỆU
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('Tất cả');
  const [selectedPatient, setSelectedPatient] = useState('Tất cả');
  const [filterStatus, setFilterStatus] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');

  // FORM THÊM THUỐC TRONG MODAL
  const [drugForm, setDrugForm] = useState({ name: '', dosage: '', quantity: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal Chi tiết (Thay thế cho phần Detail Panel bên phải)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus, selectedDoctor, selectedPatient, fromDate, toDate]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getDoctorPrescriptionsData();
      if (res.success && res.data) {
        setData(res.data);
      } else {
        router.push('/login');
      }
      setIsLoading(false);
    };
    fetchData();
  }, [router]);

  // Reset bộ lọc
  const handleResetFilter = () => {
    setFromDate('');
    setToDate('');
    setSelectedDoctor('Tất cả');
    setSelectedPatient('Tất cả');
    setFilterStatus('Tất cả');
    setSearchTerm('');
  };

  // Mở modal chi tiết
  const openDetailModal = (presc: any) => {
    setSelectedPrescriptionId(presc.id);
    setActiveTab('drugs');
    setIsDetailModalOpen(true);
  };

  // Hàm xóa đơn thuốc
  const handleDeletePrescription = async (id: number) => {
    if (confirm('Bạn có chắc muốn xóa đơn thuốc này không? Toàn bộ thuốc trong đơn sẽ bị xóa.')) {
      setIsLoading(true);
      const res = await deletePrescription(id);
      if (res.success) {
        const newData = await getDoctorPrescriptionsData();
        if (newData.success) setData(newData.data);
      } else {
        alert(res.message);
      }
      setIsLoading(false);
    }
  };

  // Hàm phát thuốc
  const handleDispense = async (id: number) => {
    if (confirm('Xác nhận phát đơn thuốc này cho bệnh nhân?')) {
      setIsLoading(true);
      const res = await dispensePrescription(id);
      if (res.success) {
        const newData = await getDoctorPrescriptionsData();
        if (newData.success) setData(newData.data);
      } else {
        alert(res.message);
      }
      setIsLoading(false);
    }
  };

  if (isLoading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="w-10 h-10 text-[#2563EB] animate-spin" />
      </div>
    );
  }

  const rawPrescriptions = data.prescriptions || [];

  const uniqueDoctors = Array.from(new Set(rawPrescriptions.map((p: any) => p.doctorName || p.doctor).filter(Boolean)));
  const uniquePatients = data.patients || Array.from(new Set(rawPrescriptions.map((p: any) => p.patientName).filter(Boolean)));

  // LỌC DỮ LIỆU
  const filteredPrescriptions = rawPrescriptions.filter((p: any) => {
    const pName = p.patientName || p.patient || '';
    const pCode = p.code || '';
    const doctorName = p.doctorName || p.doctor || '';

    const matchSearch = pName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'Tất cả' || p.status === filterStatus;
    const matchDoctor = selectedDoctor === 'Tất cả' || doctorName === selectedDoctor;
    const matchPatient = selectedPatient === 'Tất cả' || pName === selectedPatient;

    let matchDate = true;
    if (p.date) {
      const [d, m, y] = p.date.split('/');
      const pDateObj = new Date(Number(y), Number(m) - 1, Number(d));

      if (fromDate) {
        const fromDateObj = new Date(fromDate);
        fromDateObj.setHours(0, 0, 0, 0);
        if (pDateObj < fromDateObj) matchDate = false;
      }
      if (toDate) {
        const toDateObj = new Date(toDate);
        toDateObj.setHours(23, 59, 59, 999);
        if (pDateObj > toDateObj) matchDate = false;
      }
    }

    return matchSearch && matchStatus && matchDoctor && matchPatient && matchDate;
  });

  // PAGINATION CALCULATION
  const totalItems = filteredPrescriptions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPrescriptions = filteredPrescriptions.slice(startIndex, startIndex + itemsPerPage);

  const activePre = rawPrescriptions.find((p: any) => p.id === selectedPrescriptionId);

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] font-sans text-gray-800 overflow-hidden">

      {/* SIDEBAR BÁC SĨ */}
      <DoctorSidebar activePage="prescriptions-list" />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">

        {/* HEADER */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">Quản lý Đơn thuốc</h1>
            <p className="text-sm text-gray-500">Tạo, chỉnh sửa và theo dõi đơn thuốc điện tử</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-gray-900">BS. {data.doctorInfo.name}</p>
                <div className="flex text-yellow-400 text-xs justify-end">
                  {[...Array(Math.floor(data.doctorInfo.rating))].map((_, i) => <Star key={i} fill="currentColor" size={12} />)}
                </div>
              </div>
              <img src={data.doctorInfo.avatar} alt="Doctor" className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover bg-white" />
            </div>
          </div>
        </header>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50/50 animate-in fade-in duration-500">

          {/* THỐNG KÊ */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-[#2563EB] rounded-2xl flex items-center justify-center"><Pill size={24} /></div>
              <div><p className="text-sm text-gray-500 font-medium">Tổng đơn thuốc</p><p className="text-2xl font-black text-gray-900">{data.kpis.total}</p></div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center"><CheckCircle2 size={24} /></div>
              <div><p className="text-sm text-gray-500 font-medium">Đã phát thuốc</p><p className="text-2xl font-black text-gray-900">{data.kpis.dispensed}</p></div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center"><Clock size={24} /></div>
              <div><p className="text-sm text-gray-500 font-medium">Chờ phát thuốc</p><p className="text-2xl font-black text-gray-900">{data.kpis.waiting}</p></div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center"><Calendar size={24} /></div>
              <div><p className="text-sm text-gray-500 font-medium">Đơn hôm nay</p><p className="text-2xl font-black text-gray-900">{data.kpis.today}</p></div>
            </div>
          </div>

          {/* SEARCH & FILTER BAR */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-8 w-full">
            <div className="flex flex-wrap xl:flex-nowrap items-end gap-3 w-full">

              <div className="flex-1 min-w-[130px] flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Từ ngày</label>
                <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium outline-none focus:ring-2 focus:ring-[#2563EB] focus:bg-white text-gray-700 transition-all" />
              </div>

              <div className="flex-1 min-w-[130px] flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Đến ngày</label>
                <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium outline-none focus:ring-2 focus:ring-[#2563EB] focus:bg-white text-gray-700 transition-all" />
              </div>



              <div className="flex-1 min-w-[140px] flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Bệnh nhân</label>
                <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium outline-none focus:ring-2 focus:ring-[#2563EB] focus:bg-white cursor-pointer text-gray-700 transition-all">
                  <option value="Tất cả">Tất cả Bệnh nhân</option>
                  {uniquePatients.map((p: any, i: number) => <option key={i} value={p.fullName || p}>{p.fullName || p}</option>)}
                </select>
              </div>

              <div className="flex-1 min-w-[130px] flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Trạng thái</label>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium outline-none focus:ring-2 focus:ring-[#2563EB] focus:bg-white cursor-pointer text-gray-700 transition-all">
                  <option value="Tất cả">Tất cả</option>
                  <option value="Đã phát">Đã phát</option>
                  <option value="Chờ phát">Chờ phát</option>
                  <option value="Đã hủy">Đã hủy</option>
                </select>
              </div>

              <div className="flex-[1.5] min-w-[180px] flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Tìm kiếm</label>
                <div className="relative w-full">
                  <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Tên BN, mã đơn..." className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#2563EB] focus:bg-white text-gray-700 transition-all" />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 h-[38px] mb-[1px]">

                <button onClick={handleResetFilter} className="bg-[#2563EB] text-white px-5 h-full rounded-lg font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-1.5 text-sm shadow-sm">
                  Đặt lại
                </button>
              </div>

            </div>
          </div>

          {/* DANH SÁCH BẢNG */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">

            {/* HEADER DANH SÁCH + NÚT TẠO ĐƠN THUỐC MỚI */}
            <div className="p-5 border-b border-gray-100 bg-gray-50 font-bold text-gray-700 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-base">Danh sách đơn thuốc</span>
                <span className="text-[#2563EB] bg-blue-100 px-3 py-1 rounded-md text-xs font-bold">{filteredPrescriptions.length} Kết quả</span>
              </div>
              <Link
                href="/doctor/prescriptions/create"
                className="bg-[#2563EB] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md transition-all flex items-center gap-2 text-sm"
              >
                <Plus size={18} /> Tạo đơn thuốc mới
              </Link>
            </div>

            <div className="overflow-x-auto custom-scrollbar min-h-[400px]">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-white border-b border-gray-100 text-gray-500 font-bold">
                  <tr>
                    <th className="px-6 py-4 text-center">STT</th>
                    <th className="px-6 py-4">Mã đơn thuốc</th>
                    <th className="px-6 py-4">Bệnh nhân</th>
                    <th className="px-6 py-4">Ngày kê đơn</th>
                    <th className="px-6 py-4">Chẩn đoán</th>
                    <th className="px-6 py-4">Trạng thái</th>
                    <th className="px-6 py-4 text-center">Tổng thuốc</th>
                    <th className="px-6 py-4 text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {currentPrescriptions.length > 0 ? currentPrescriptions.map((p: any, index: number) => (
                    <tr
                      key={p.id}
                      className="hover:bg-blue-50/50 transition-colors group cursor-pointer"
                      onClick={() => openDetailModal(p)}
                    >
                      <td className="px-6 py-4 text-center font-bold text-gray-400">{startIndex + index + 1}</td>
                      <td className="px-6 py-4 font-bold text-[#2563EB] group-hover:underline">{p.code}</td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-900">{p.patientName}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{p.patientCode} • {p.gender} • {p.age} tuổi</p>
                      </td>
                      <td className="px-6 py-4 text-gray-700 flex items-center gap-1.5 h-[72px]"><Calendar size={14} /> {p.date}</td>
                      <td className="px-6 py-4 font-medium text-gray-800 max-w-[200px] truncate" title={p.diagnosis}>{p.diagnosis}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center w-max gap-1.5 ${p.statusColor}`}>
                          {p.status === 'Đã phát' ? <CheckCircle2 size={12} /> : p.status === 'Đã hủy' ? <XCircle size={12} /> : <Clock size={12} />}
                          {p.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-gray-700">{p.drugCount} loại</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); openDetailModal(p); }}
                            className="text-[#2563EB] bg-blue-50 hover:bg-[#2563EB] hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm border border-blue-100"
                          >
                            Xem chi tiết
                          </button>
                          {p.status !== 'Đã phát' && (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDispense(p.id); }}
                              className="text-green-600 bg-green-50 hover:bg-green-600 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm border border-green-100"
                            >
                              Phát thuốc
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={8} className="px-6 py-16 text-center text-gray-500">
                        <FileText size={48} className="mx-auto mb-4 opacity-20" />
                        Không tìm thấy đơn thuốc nào phù hợp với bộ lọc.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* BỘ PHÂN TRANG */}
            <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                Hiển thị
                <select
                  className="border border-gray-200 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-[#2563EB] bg-gray-50"
                  value={itemsPerPage}
                  onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                kết quả mỗi trang
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                >
                  &laquo;
                </button>

                {totalPages > 0 && [...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  // Hiding logic if there are too many pages
                  if (totalPages > 7) {
                    if (page !== 1 && page !== totalPages && Math.abs(page - currentPage) > 1) {
                      if (page === 2 || page === totalPages - 1) return <span key={page} className="px-2 text-gray-400">...</span>;
                      return null;
                    }
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3.5 py-1.5 rounded-lg border text-sm font-bold transition-colors ${currentPage === page
                        ? 'bg-[#2563EB] border-[#2563EB] text-white'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage(Math.min(Math.max(1, totalPages), currentPage + 1))}
                  disabled={currentPage >= totalPages}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                >
                  &raquo;
                </button>
              </div>
            </div>

          </div>

        </div>
      </main>



      {/* ==========================================
          MODAL: CHI TIẾT & CHỈNH SỬA ĐƠN THUỐC
      ========================================== */}
      {isDetailModalOpen && activePre && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col animate-in zoom-in-95 max-h-[90vh]">

            <div className="p-6 border-b border-gray-100 bg-white shadow-sm flex justify-between items-start z-10 shrink-0">
              <div className="flex items-center gap-4">
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(activePre.patientName)}&background=random`} alt="Avatar" className="w-16 h-16 rounded-xl border border-gray-200 shadow-sm" />
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-gray-900">{activePre.patientName}</h2>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${activePre.statusColor}`}>
                      {activePre.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Mã BN: {activePre.patientCode} • {activePre.gender} • {activePre.age} tuổi</p>
                  <p className="text-sm text-gray-700 font-medium mt-2 bg-gray-50 px-3 py-1.5 rounded-lg inline-block border border-gray-100">
                    <span className="text-gray-500">Chẩn đoán:</span> {activePre.diagnosis}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 flex-col items-end">
                <button
                  onClick={() => { handleDeletePrescription(activePre.id); setIsDetailModalOpen(false); }}
                  className="bg-red-50 text-red-600 border border-red-200 px-6 py-2 rounded-xl font-bold hover:bg-red-100 transition-colors flex items-center gap-2 text-sm shadow-sm"
                >
                  <Trash2 size={16} /> Xóa đơn thuốc
                </button>
                <button onClick={() => setIsDetailModalOpen(false)} className="mt-2 text-gray-400 hover:text-gray-700"><XCircle size={20} /></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30 custom-scrollbar">
              <div className="space-y-6 animate-in fade-in">
                <table className="w-full text-left text-sm bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <thead className="bg-gray-100 text-gray-600 font-bold border-b border-gray-200">
                    <tr>
                      <th className="p-4 text-center">STT</th>
                      <th className="p-4">Tên thuốc</th>
                      <th className="p-4">Hàm lượng</th>
                      <th className="p-4">Dạng bào chế</th>
                      <th className="p-4 text-center">Số lượng</th>
                      <th className="p-4">Cách dùng</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {activePre.items && activePre.items.length > 0 ? activePre.items.map((med: any, idx: number) => (
                      <tr key={med.id} className="hover:bg-blue-50/50 transition-colors">
                        <td className="p-4 text-center font-bold text-gray-400">{idx + 1}</td>
                        <td className="p-4 font-bold text-gray-900">{med.name}</td>
                        <td className="p-4 text-gray-700">{med.dosage}</td>
                        <td className="p-4 text-gray-700">{med.form || 'Viên'}</td>
                        <td className="p-4 text-center font-bold text-[#2563EB] text-lg">{med.quantity}</td>
                        <td className="p-4 text-gray-700 whitespace-pre-wrap">{med.instructions}</td>
                      </tr>
                    )) : (
                      <tr><td colSpan={6} className="p-8 text-center text-gray-400 italic">Đơn thuốc chưa có thuốc nào.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end shrink-0">
              <button onClick={() => setIsDetailModalOpen(false)} className="bg-gray-800 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-black transition-colors shadow-md">
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}