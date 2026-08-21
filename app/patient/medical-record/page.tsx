'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Folder, Search, Filter, Loader2, FileText, ChevronRight,
  Calendar, User, Stethoscope, Activity, MapPin, SearchX 
} from 'lucide-react';

import PatientSidebar from '@/app/patient/Sidebar';
import { getMedicalRecordsList } from '@/app/patient/medical-record/actions';

export default function PatientMedicalRecordsListPage() {
  const router = useRouter();
  const [records, setRecords] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getMedicalRecordsList();
      if (res.success && res.data) {
        setRecords(res.data);
      } else {
        router.push('/login');
      }
      setIsLoading(false);
    };
    fetchData();
  }, [router]);

  const specialties = Array.from(new Set(records.map(r => r.specialty)));

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          record.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          record.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = filterSpecialty === 'all' || record.specialty === filterSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] font-sans text-gray-800">
      <PatientSidebar activePage="medical-record" />

      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F8FAFC]">
        {/* HEADER */}
        <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center justify-between shrink-0 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <Folder size={20} />
            </div>
            <h1 className="text-xl font-black text-gray-900">Danh sách hồ sơ bệnh án</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Tìm mã hồ sơ, chẩn đoán, bác sĩ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-80 pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            <div className="relative">
              <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select 
                value={filterSpecialty}
                onChange={(e) => setFilterSpecialty(e.target.value)}
                className="appearance-none pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
              >
                <option value="all">Tất cả chuyên khoa</option>
                {specialties.map((spec: any, i) => (
                  <option key={i} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {isLoading ? (
            <div className="h-full flex flex-col items-center justify-center">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
              <p className="text-gray-500 font-medium">Đang tải danh sách hồ sơ...</p>
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <SearchX size={48} className="text-gray-300" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy hồ sơ nào</h2>
              <p className="text-gray-500">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc chuyên khoa.</p>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto">
              
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500">
                  Hiển thị <span className="font-bold text-gray-900">{filteredRecords.length}</span> hồ sơ bệnh án
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-gray-50/50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 font-bold text-gray-600">Mã hồ sơ</th>
                        <th className="px-6 py-4 font-bold text-gray-600">Thời gian khám</th>
                        <th className="px-6 py-4 font-bold text-gray-600">Chuyên khoa</th>
                        <th className="px-6 py-4 font-bold text-gray-600">Bác sĩ phụ trách</th>
                        <th className="px-6 py-4 font-bold text-gray-600">Chẩn đoán</th>
                        <th className="px-6 py-4 font-bold text-gray-600 text-center">Trạng thái</th>
                        <th className="px-6 py-4 font-bold text-gray-600"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredRecords.map((record) => (
                        <tr key={record.id} onClick={() => router.push(`/patient/medical-record/${record.id}`)} className="hover:bg-blue-50/50 cursor-pointer transition-colors group">
                          <td className="px-6 py-5">
                            <span className="font-bold text-blue-600">{record.code}</span>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex flex-col">
                              <span className="font-bold text-gray-900">{record.date}</span>
                              <span className="text-xs text-gray-500 mt-1">{record.time}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-50 border border-gray-100 text-gray-700 font-medium text-xs">
                              <Stethoscope size={12}/> {record.specialty}
                            </span>
                          </td>
                          <td className="px-6 py-5 font-medium text-gray-800">
                            {record.doctorName}
                          </td>
                          <td className="px-6 py-5">
                            <div className="max-w-[200px] truncate font-bold text-gray-800" title={record.diagnosis}>
                              {record.diagnosis}
                            </div>
                          </td>
                          <td className="px-6 py-5 text-center">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold ${record.status === 'Hoàn thành' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                              {record.status}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-right">
                            <button className="text-gray-400 group-hover:text-blue-600 transition-colors p-2 hover:bg-white rounded-full">
                              <ChevronRight size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}
        </div>
      </main>
    </div>
  );
}
