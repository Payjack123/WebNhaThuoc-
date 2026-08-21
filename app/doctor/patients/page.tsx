'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Users, UserPlus, CalendarDays, Activity, ChevronLeft, ChevronRight,
  Eye, Folder, MoreVertical, Search, Bell, Filter
} from 'lucide-react';
import DoctorSidebar from "@/app/doctor/Sidebar";
import { getDoctorPatientsData } from '@/app/doctor/patients/actions';

export default function DoctorPatientsPage() {
  const router = useRouter();

  const [patients, setPatients] = useState<any[]>([]);
  const [kpis, setKpis] = useState<any>({});
  const [doctorInfo, setDoctorInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination & Filter state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('Giới tính (Tất cả)');
  const [filterAge, setFilterAge] = useState('Nhóm tuổi (Tất cả)');
  const [filterStatus, setFilterStatus] = useState('Tình trạng (Tất cả)');
  const [sortOrder, setSortOrder] = useState('Mới nhất');

  const fetchData = async () => {
    setIsLoading(true);
    const res = await getDoctorPatientsData();
    if (res.success && res.data) {
      setPatients(res.data.patients);
      setKpis(res.data.kpis);
      setDoctorInfo(res.data.doctorInfo);
    } else {
      router.push('/login');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [router]);

  // Derived mock KPIs (since backend doesn't provide exactly 5 matching ones)
  const stats = {
    total: kpis?.total || 568,
    following: kpis?.inTreatment || 132,
    new: kpis?.new || 28,
    revisit: Math.floor((kpis?.total || 568) * 0.15),
    longTerm: Math.floor((kpis?.total || 568) * 0.08)
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Đang điều trị':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'Tái khám':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'Đã khỏi':
        return 'text-gray-600 bg-gray-100 border-gray-200';
      default:
        return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Đang điều trị':
        return 'Đang theo dõi';
      case 'Tái khám':
        return 'Tái khám';
      case 'Đã khỏi':
        return 'Hoàn thành';
      default:
        return 'Điều trị dài hạn';
    }
  };

  // Filtering & Sorting logic
  const filteredPatients = patients.filter(p => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      if (!p.name.toLowerCase().includes(term) && !p.phone.includes(term) && !p.code.toLowerCase().includes(term)) return false;
    }
    if (filterGender !== 'Giới tính (Tất cả)' && p.gender !== filterGender) return false;
    if (filterAge !== 'Nhóm tuổi (Tất cả)') {
      const age = parseInt(p.age) || 0;
      if (filterAge === 'Dưới 18' && age >= 18) return false;
      if (filterAge === '18 - 60' && (age < 18 || age > 60)) return false;
      if (filterAge === 'Trên 60' && age <= 60) return false;
    }
    if (filterStatus !== 'Tình trạng (Tất cả)') {
      if (getStatusText(p.status) !== filterStatus) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortOrder === 'Mới nhất') return b.id - a.id;
    return a.id - b.id;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage) || 1;
  const paginatedPatients = filteredPatients.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (isLoading || !doctorInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="w-10 h-10 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] font-sans text-gray-800">

      {/* SIDEBAR */}
      <DoctorSidebar activePage="patients" />

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-white">

        {/* HEADER CỐ ĐỊNH NHƯ DASHBOARD */}
        <header className="bg-white border-b border-gray-100 px-8 h-20 shrink-0 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bệnh nhân</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              <button className="relative text-gray-400 hover:text-gray-600 transition">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">3</span>
              </button>
            </div>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">BS. {doctorInfo.name}</p>
                <p className="text-xs text-gray-500">Khoa Nội tổng quát</p>
              </div>
              <img src={doctorInfo.avatar} alt="Doctor" className="w-10 h-10 rounded-full border border-gray-200 object-cover" />
            </div>
          </div>
        </header>

        {/* NỘI DUNG SCROLL */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">

          {/* 5 STATS CARDS */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-[#2563EB] rounded-2xl flex items-center justify-center shrink-0">
                <Users size={24} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-500 uppercase">Tổng bệnh nhân</p>
                <div className="flex items-end gap-1 mt-1">
                  <span className="text-2xl font-black text-gray-900 leading-none">{stats.total}</span>
                  <span className="text-[10px] text-gray-500 font-medium pb-0.5">bệnh nhân</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center shrink-0">
                <Activity size={24} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-500 uppercase">Đang theo dõi</p>
                <div className="flex items-end gap-1 mt-1">
                  <span className="text-2xl font-black text-gray-900 leading-none">{stats.following}</span>
                  <span className="text-[10px] text-gray-500 font-medium pb-0.5">bệnh nhân</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center shrink-0">
                <UserPlus size={24} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-500 uppercase">Bệnh nhân mới</p>
                <div className="flex items-end gap-1 mt-1">
                  <span className="text-2xl font-black text-gray-900 leading-none">{stats.new}</span>
                  <span className="text-[10px] text-gray-500 font-medium pb-0.5">bệnh nhân</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
                <CalendarDays size={24} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-500 uppercase">Tái khám</p>
                <div className="flex items-end gap-1 mt-1">
                  <span className="text-2xl font-black text-gray-900 leading-none">{stats.revisit}</span>
                  <span className="text-[10px] text-gray-500 font-medium pb-0.5">bệnh nhân</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center shrink-0">
                <Activity size={24} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-500 uppercase">Điều trị dài hạn</p>
                <div className="flex items-end gap-1 mt-1">
                  <span className="text-2xl font-black text-gray-900 leading-none">{stats.longTerm}</span>
                  <span className="text-[10px] text-gray-500 font-medium pb-0.5">bệnh nhân</span>
                </div>
              </div>
            </div>
          </div>

          {/* FILTER SECTION */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col xl:flex-row gap-4 justify-between items-center mt-6">
            <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-4 w-full">
              <div className="col-span-2 relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  placeholder="Nhập tên, SĐT, mã hồ sơ..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
              <div className="flex flex-col">
                <select value={filterGender} onChange={(e) => { setFilterGender(e.target.value); setCurrentPage(1); }} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 outline-none">
                  <option>Giới tính (Tất cả)</option>
                  <option>Nam</option>
                  <option>Nữ</option>
                </select>
              </div>
              <div className="flex flex-col">
                <select value={filterAge} onChange={(e) => { setFilterAge(e.target.value); setCurrentPage(1); }} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 outline-none">
                  <option>Nhóm tuổi (Tất cả)</option>
                  <option>Dưới 18</option>
                  <option>18 - 60</option>
                  <option>Trên 60</option>
                </select>
              </div>
              <div className="flex flex-col">
                <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 outline-none">
                  <option>Tình trạng (Tất cả)</option>
                  <option>Đang theo dõi</option>
                  <option>Tái khám</option>
                  <option>Điều trị dài hạn</option>
                  <option>Hoàn thành</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 w-full xl:w-auto shrink-0 mt-4 xl:mt-0">
              <select value={sortOrder} onChange={(e) => { setSortOrder(e.target.value); setCurrentPage(1); }} className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 outline-none flex-1 xl:flex-none">
                <option>Mới nhất</option>
                <option>Cũ nhất</option>
              </select>

            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col mt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-500 text-xs font-bold">
                  <tr>
                    <th className="px-6 py-5">STT</th>
                    <th className="px-6 py-5">Bệnh nhân</th>
                    <th className="px-6 py-5">Mã hồ sơ</th>
                    <th className="px-6 py-5">Năm sinh</th>
                    <th className="px-6 py-5">Giới tính</th>
                    <th className="px-6 py-5">SĐT</th>
                    <th className="px-6 py-5">Lần khám gần nhất</th>
                    <th className="px-6 py-5">Tình trạng</th>
                    <th className="px-6 py-5 text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedPatients.length > 0 ? paginatedPatients.map((p, idx) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-500">
                        {(currentPage - 1) * itemsPerPage + idx + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=random`} alt={p.name} className="w-10 h-10 rounded-full border border-gray-200 object-cover" />
                          <div>
                            <p className="font-bold text-gray-900">{p.name}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{p.age} tuổi</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {p.code}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {p.dob}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-[11px] font-bold rounded ${p.gender === 'Nam' ? 'bg-blue-50 text-[#2563EB]' : 'bg-pink-50 text-pink-600'}`}>
                          {p.gender}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-700">
                        {p.phone}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-900">{p.lastVisit}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{p.history?.[0]?.dept || p.spec || 'Khám tổng quát'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${getStatusStyle(p.status)}`}>
                          {getStatusText(p.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            {p.lastRecordId && (
                              <Link href={`/doctor/records/detail?id=${p.lastRecordId}`} className="px-3 py-1.5 rounded-lg border font-bold transition-colors text-[13px] bg-blue-50 text-[#2563EB] border-blue-100 hover:bg-[#2563EB] hover:text-white">
                                Xem bệnh án
                              </Link>
                            )}
                            <Link href={`/doctor/records/create?patientId=${p.id}`} className="px-3 py-1.5 rounded-lg border font-bold transition-colors text-[13px] bg-green-50 text-green-600 border-green-100 hover:bg-green-600 hover:text-white">
                              Tạo mới
                            </Link>
                          </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={9} className="px-6 py-10 text-center text-gray-500">
                        Không có bệnh nhân nào.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            {filteredPatients.length > 0 && (
              <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  Hiển thị
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="border border-gray-200 rounded px-2 py-1 outline-none focus:border-[#2563EB]"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                  kết quả mỗi trang
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="w-8 h-8 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-transparent"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium transition-colors ${currentPage === i + 1 ? 'bg-[#2563EB] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-transparent"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}