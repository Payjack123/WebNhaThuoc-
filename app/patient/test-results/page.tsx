'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText, Search, Bell, ChevronRight, Activity, 
  Filter, Download, Printer, CheckCircle2, Clock,
  AlertCircle, XCircle, Beaker, FileImage, Stethoscope, ChevronLeft
} from 'lucide-react';
import PatientSidebar from '@/app/patient/Sidebar';
import { getTestResults } from './actions';

export default function TestResultsPage() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTestId, setSelectedTestId] = useState<number | null>(null);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('Tất cả');
  const [selectedStatus, setSelectedStatus] = useState('Tất cả');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getTestResults();
      if (res.success && res.data) {
        setData(res.data);
        // Automatically select the first one if it has results
        const firstCompleted = res.data.find(t => t.status === 'Có kết quả' || t.status === 'Bác sĩ đã xác nhận');
        if (firstCompleted) {
          setSelectedTestId(firstCompleted.id);
        } else if (res.data.length > 0) {
          setSelectedTestId(res.data[0].id);
        }
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const testTypes = ['Tất cả', 'Xét nghiệm máu', 'Nước tiểu', 'Siêu âm', 'X-quang'];
  const testStatuses = ['Tất cả', 'Đã chỉ định', 'Đang thực hiện', 'Có kết quả', 'Bác sĩ đã xác nhận', 'Đã hủy'];

  const filteredData = data.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          test.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'Tất cả' || test.type === selectedType;
    const matchesStatus = selectedStatus === 'Tất cả' || test.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const selectedTest = data.find(t => t.id === selectedTestId);

  const getStatusConfig = (status: string) => {
    switch(status) {
      case 'Đã chỉ định': return { color: 'text-yellow-600', bg: 'bg-yellow-50', icon: <Clock size={14} className="text-yellow-500"/> };
      case 'Đang thực hiện': return { color: 'text-blue-600', bg: 'bg-blue-50', icon: <Activity size={14} className="text-blue-500 animate-pulse"/> };
      case 'Có kết quả': return { color: 'text-green-600', bg: 'bg-green-50', icon: <CheckCircle2 size={14} className="text-green-500"/> };
      case 'Bác sĩ đã xác nhận': return { color: 'text-emerald-700', bg: 'bg-emerald-50', icon: <CheckCircle2 size={14} className="text-emerald-600"/> };
      case 'Đã hủy': return { color: 'text-red-600', bg: 'bg-red-50', icon: <XCircle size={14} className="text-red-500"/> };
      default: return { color: 'text-gray-600', bg: 'bg-gray-50', icon: null };
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'Xét nghiệm máu': return <Beaker size={20} className="text-red-500" />;
      case 'Nước tiểu': return <Beaker size={20} className="text-yellow-500" />;
      case 'X-quang': return <FileImage size={20} className="text-purple-500" />;
      case 'Siêu âm': return <Activity size={20} className="text-cyan-500" />;
      default: return <Stethoscope size={20} className="text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] font-sans text-gray-800 overflow-hidden">
      <PatientSidebar activePage="test-results" />

      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F8FAFC]">
        {/* TOP HEADER */}
        <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center justify-between shrink-0 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center border border-indigo-100/50">
              <Beaker size={24} />
            </div>
            <h1 className="text-xl font-black text-gray-900">Kết quả xét nghiệm</h1>
          </div>
          <div className="flex items-center gap-5 ml-auto">
            <button className="relative p-2.5 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 rounded-full transition bg-white border border-gray-200 shadow-sm">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-5 border-l border-gray-200 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition">Nguyễn Văn A</p>
                <p className="text-xs text-gray-500 font-medium">Bệnh nhân (BN-202611)</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm">
                A
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="flex-1 overflow-hidden p-6 lg:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* LEFT: LIST & FILTERS */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4 h-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden shrink-0">
            <div className="p-5 border-b border-gray-100 space-y-4">
              <h2 className="text-lg font-black text-gray-900">Danh sách xét nghiệm</h2>
              
              {/* Search Box */}
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Tìm theo mã, tên xét nghiệm..." 
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filters */}
              <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1">
                <select 
                  className="text-xs bg-gray-50 border border-gray-200 text-gray-700 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 whitespace-nowrap"
                  value={selectedType}
                  onChange={e => setSelectedType(e.target.value)}
                >
                  {testTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <select 
                  className="text-xs bg-gray-50 border border-gray-200 text-gray-700 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 whitespace-nowrap"
                  value={selectedStatus}
                  onChange={e => setSelectedStatus(e.target.value)}
                >
                  {testStatuses.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 custom-scrollbar space-y-2">
              {isLoading ? (
                <div className="flex justify-center p-8"><Activity className="animate-spin text-indigo-500" /></div>
              ) : filteredData.length > 0 ? (
                filteredData.map(test => {
                  const statusConfig = getStatusConfig(test.status);
                  const isSelected = selectedTestId === test.id;
                  return (
                    <div 
                      key={test.id}
                      onClick={() => setSelectedTestId(test.id)}
                      className={`p-4 rounded-xl cursor-pointer transition-all border ${
                        isSelected 
                          ? 'bg-indigo-50 border-indigo-200 shadow-sm' 
                          : 'bg-white border-transparent hover:border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex gap-3">
                          <div className={`p-2 rounded-lg bg-white shadow-sm border ${isSelected ? 'border-indigo-100' : 'border-gray-100'}`}>
                            {getTypeIcon(test.type)}
                          </div>
                          <div>
                            <h3 className={`text-sm font-bold ${isSelected ? 'text-indigo-900' : 'text-gray-900'}`}>{test.name}</h3>
                            <p className="text-xs text-gray-500 mt-1">{test.date} • {test.time}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs font-semibold text-gray-500">{test.code}</span>
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold ${statusConfig.bg} ${statusConfig.color}`}>
                          {statusConfig.icon} {test.status}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center p-8 text-gray-500 text-sm">
                  Không tìm thấy kết quả nào
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: DETAIL VIEW */}
          <div className="w-full lg:flex-1 h-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            {selectedTest ? (
              <>
                <div className="p-6 border-b border-gray-100 flex flex-wrap gap-4 items-center justify-between bg-white sticky top-0 z-10">
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">{selectedTest.name}</h2>
                    <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                      <span className="font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md">{selectedTest.code}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5"><Clock size={14}/> {selectedTest.date} {selectedTest.time}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-sm font-bold transition shadow-sm">
                      <Printer size={16} /> In
                    </button>
                    {(selectedTest.status === 'Có kết quả' || selectedTest.status === 'Bác sĩ đã xác nhận') && (
                      <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition shadow-sm shadow-indigo-200">
                        <Download size={16} /> Tải PDF
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar bg-gray-50/30">
                  <div className="max-w-4xl mx-auto space-y-8">
                    
                    {/* INFO BOX */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Loại xét nghiệm</p>
                        <p className="font-bold text-gray-900 flex items-center gap-2">
                          {getTypeIcon(selectedTest.type)} {selectedTest.type}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Bác sĩ chỉ định</p>
                        <p className="font-bold text-gray-900">{selectedTest.doctor}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Trạng thái</p>
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${getStatusConfig(selectedTest.status).bg} ${getStatusConfig(selectedTest.status).color}`}>
                          {getStatusConfig(selectedTest.status).icon} {selectedTest.status}
                        </div>
                      </div>
                    </div>

                    {/* INDICATORS TABLE (If any) */}
                    {selectedTest.indicators && selectedTest.indicators.length > 0 && (
                      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                          <h3 className="font-black text-gray-900 flex items-center gap-2">
                            <Activity size={18} className="text-indigo-500" /> Kết quả đo lường
                          </h3>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50/30 text-gray-500 border-b border-gray-100">
                              <tr>
                                <th className="px-6 py-3 font-semibold w-1/4">Tên chỉ số</th>
                                <th className="px-6 py-3 font-semibold text-center">Kết quả</th>
                                <th className="px-6 py-3 font-semibold text-center">Đơn vị</th>
                                <th className="px-6 py-3 font-semibold text-center">Khoảng tham chiếu</th>
                                <th className="px-6 py-3 font-semibold text-right">Đánh giá</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                              {selectedTest.indicators.map((ind: any, idx: number) => (
                                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                  <td className="px-6 py-4 font-bold text-gray-900">{ind.name}</td>
                                  <td className={`px-6 py-4 font-black text-center text-lg ${ind.isAbnormal ? 'text-red-600' : 'text-gray-900'}`}>
                                    {ind.result}
                                  </td>
                                  <td className="px-6 py-4 text-gray-600 text-center">{ind.unit}</td>
                                  <td className="px-6 py-4 text-gray-500 text-center">{ind.reference}</td>
                                  <td className="px-6 py-4 text-right">
                                    {ind.isAbnormal ? (
                                      <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-md border border-red-100">
                                        <AlertCircle size={12} /> Bất thường
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-md border border-green-100">
                                        <CheckCircle2 size={12} /> Bình thường
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* CONCLUSION & NOTES */}
                    {(selectedTest.conclusion || selectedTest.doctorNotes) ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {selectedTest.conclusion && (
                          <div className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100/50 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-100 rounded-full blur-3xl opacity-50 -mr-10 -mt-10"></div>
                            <h3 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                              <FileText size={18} className="text-indigo-600" /> Kết luận
                            </h3>
                            <p className="text-gray-700 leading-relaxed font-medium relative z-10">
                              {selectedTest.conclusion}
                            </p>
                          </div>
                        )}
                        {selectedTest.doctorNotes && (
                          <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-100/50 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100 rounded-full blur-3xl opacity-50 -mr-10 -mt-10"></div>
                            <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                              <Stethoscope size={18} className="text-amber-600" /> Nhận xét của Bác sĩ
                            </h3>
                            <p className="text-gray-700 leading-relaxed font-medium relative z-10">
                              {selectedTest.doctorNotes}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      selectedTest.status !== 'Có kết quả' && selectedTest.status !== 'Bác sĩ đã xác nhận' && (
                        <div className="bg-white rounded-2xl border border-gray-100 p-12 flex flex-col items-center justify-center text-center shadow-sm">
                          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Clock size={32} className="text-gray-400" />
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">Đang chờ kết quả</h3>
                          <p className="text-gray-500 text-sm max-w-sm">
                            Xét nghiệm này đang trong quá trình thực hiện. Kết quả sẽ được cập nhật tại đây ngay khi có.
                          </p>
                        </div>
                      )
                    )}

                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Beaker size={40} className="text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Chưa chọn xét nghiệm</h3>
                <p className="text-gray-500 text-sm max-w-sm">
                  Vui lòng chọn một xét nghiệm từ danh sách bên trái để xem chi tiết kết quả.
                </p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
