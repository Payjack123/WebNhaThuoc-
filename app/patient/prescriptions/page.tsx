'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Bell, Search, Pill, User, Clock, 
  CalendarDays, Download, Printer, Filter, ShieldCheck, 
  ChevronRight, CalendarClock, ChevronDown, CheckCircle2,
  Lock, Calendar, FileText, ClipboardList, Stethoscope
} from 'lucide-react';
import PatientSidebar from '@/app/patient/Sidebar';
import { getPatientPrescriptionsData } from '@/app/patient/prescriptions/actions';

export default function PatientPrescriptionsPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState<number | string>('');
  const [activeTab, setActiveTab] = useState('Tất cả đơn thuốc');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getPatientPrescriptionsData();
      if (res.success && res.data) {
        setData(res.data);
        if (res.data.prescriptions.length > 0) {
          setSelectedPrescriptionId(res.data.prescriptions[0].id);
        }
      } else {
        router.push('/login');
      }
      setIsLoading(false);
    };
    fetchData();
  }, [router]);

  if (isLoading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="w-10 h-10 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const { patientInfo, prescriptions, kpis } = data;
  
  const filteredPrescriptions = prescriptions.filter((p: any) => {
    if (activeTab === 'Tất cả đơn thuốc') return true;
    if (activeTab === 'Đang sử dụng') return p.status === 'Đang sử dụng';
    if (activeTab === 'Sắp hết thuốc') return p.status === 'Đang sử dụng' && p.medicines.some((m:any) => m.quantity < 5); 
    if (activeTab === 'Đã hoàn thành') return p.status === 'Đã hoàn thành';
    return true;
  });

  const activePrescription = prescriptions.find((p: any) => p.id === selectedPrescriptionId) || prescriptions[0];

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] font-sans text-gray-800 overflow-hidden">
      
      {/* SIDEBAR */}
      <PatientSidebar activePage="prescriptions" />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* TOP HEADER */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-10">
          <div className="flex items-center w-full max-w-xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Tìm kiếm..." 
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] focus:bg-white outline-none transition-all shadow-sm"
            />
          </div>
          <div className="flex items-center gap-5 ml-auto">
            <button className="relative p-2.5 text-gray-500 hover:bg-blue-50 hover:text-[#2563EB] rounded-full transition bg-white border border-gray-200 shadow-sm">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-5 border-l border-gray-200 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900 group-hover:text-[#2563EB] transition">{patientInfo.name}</p>
                <p className="text-xs text-gray-500 font-medium">Bệnh nhân</p>
              </div>
              <img src={patientInfo.avatar} alt="Avatar" className="w-11 h-11 rounded-full border-2 border-white shadow-sm group-hover:shadow-md transition" />
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <div className="w-full max-w-[1600px] xl:max-w-none mx-auto space-y-6">
            
            {/* Tiêu đề */}
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2.5 rounded-xl text-[#2563EB]">
                <Pill size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900">Đơn thuốc của tôi</h1>
                <p className="text-gray-500 text-sm mt-0.5">Xem và quản lý các đơn thuốc đã được bác sĩ kê.</p>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 text-[#2563EB] rounded-xl flex items-center justify-center shrink-0">
                  <Lock size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Tổng đơn thuốc</p>
                  <p className="text-2xl font-black text-gray-900 mt-0.5">{kpis.total} <span className="text-sm font-medium text-gray-500 normal-case">đơn thuốc</span></p>
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center shrink-0 border border-green-100">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Đang sử dụng</p>
                  <p className="text-2xl font-black text-gray-900 mt-0.5">{kpis.using} <span className="text-sm font-medium text-gray-500 normal-case">đơn thuốc</span></p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Sắp hết thuốc</p>
                  <p className="text-2xl font-black text-gray-900 mt-0.5">{kpis.almostEmpty} <span className="text-sm font-medium text-gray-500 normal-case">đơn thuốc</span></p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Đã hoàn thành</p>
                  <p className="text-2xl font-black text-gray-900 mt-0.5">{kpis.completed} <span className="text-sm font-medium text-gray-500 normal-case">đơn thuốc</span></p>
                </div>
              </div>
            </div>

            {/* TABS & SEARCH */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 border-b border-gray-200">
              <div className="flex gap-8 w-full overflow-x-auto custom-scrollbar">
                {['Tất cả đơn thuốc', 'Đang sử dụng', 'Sắp hết thuốc', 'Đã hoàn thành'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? 'text-[#2563EB] border-[#2563EB]' : 'text-gray-500 border-transparent hover:text-gray-700'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-3 pb-2 w-full sm:w-auto shrink-0">
                <div className="relative">
                  <input type="text" placeholder="Tìm kiếm đơn thuốc..." className="w-64 pl-4 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#2563EB]" />
                  <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <button className="flex items-center gap-2 px-3 py-2 border border-[#2563EB] text-[#2563EB] font-bold rounded-lg text-sm bg-blue-50/50 hover:bg-blue-100 transition-colors">
                  <Filter size={16} /> Bộ lọc
                </button>
              </div>
            </div>

            {/* MASTER-DETAIL LAYOUT */}
            <div className="flex flex-col xl:flex-row gap-6">
              
              {/* CỘT TRÁI: Danh sách */}
              <div className="xl:w-[420px] shrink-0 space-y-4">
                {filteredPrescriptions.length > 0 ? (
                  <>
                    <div className="space-y-4">
                      {filteredPrescriptions.map((p: any) => {
                        const isSelected = selectedPrescriptionId === p.id;
                        return (
                          <div 
                            key={p.id}
                            onClick={() => setSelectedPrescriptionId(p.id)}
                            className={`bg-white rounded-2xl border p-5 cursor-pointer transition-all shadow-sm flex items-center justify-between ${isSelected ? 'border-[#2563EB] ring-1 ring-[#2563EB] bg-blue-50/20' : 'border-gray-100 hover:border-blue-200'}`}
                          >
                            <div className="flex items-center gap-5">
                              <div className="text-center w-14 shrink-0">
                                <p className="text-3xl font-black text-gray-900 leading-none mb-1">{p.day}</p>
                                <p className="text-[11px] text-gray-500 font-bold uppercase">{p.monthYear}</p>
                              </div>
                              <div className="border-l border-gray-100 pl-5">
                                <h3 className="font-bold text-gray-900 text-base mb-1.5 line-clamp-1">{p.diagnosis}</h3>
                                <p className="text-sm text-gray-500 flex items-center gap-1.5 mb-2.5"><User size={14}/> {p.doctor}</p>
                                <span className={`px-2.5 py-1 rounded text-xs font-bold border inline-block ${p.statusColor}`}>{p.status}</span>
                              </div>
                            </div>
                            <ChevronRight size={20} className="text-gray-300" />
                          </div>
                        );
                      })}
                    </div>
                    
                    <button className="w-full py-3 bg-white border border-gray-200 rounded-xl text-[#2563EB] text-sm font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-blue-50 transition-colors">
                      Xem thêm <ChevronDown size={16} />
                    </button>
                  </>
                ) : (
                  <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center">
                    <p className="text-gray-500 text-sm">Không tìm thấy đơn thuốc nào.</p>
                  </div>
                )}
              </div>

              {/* CỘT PHẢI: Chi tiết */}
              <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 xl:p-8 relative">
                {activePrescription ? (
                  <>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                      <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        Đơn thuốc: <span className="text-[#2563EB]">{activePrescription.code || `DT${activePrescription.id}`}</span>
                      </h2>
                      <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-[#2563EB] hover:border-[#2563EB] bg-white rounded-lg text-sm font-bold transition hover:bg-blue-50 shadow-sm">
                          <Download size={16} /> Tải đơn thuốc
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-[#2563EB] text-[#2563EB] bg-blue-50/50 hover:bg-blue-100 rounded-lg text-sm font-bold transition shadow-sm">
                          <Printer size={16} /> In đơn thuốc
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 border border-gray-100 rounded-2xl mb-8 divide-x divide-gray-100 text-sm bg-gray-50/50">
                      <div className="px-2">
                        <p className="text-gray-500 text-xs flex items-center gap-1.5 mb-1"><CalendarDays size={14}/> Ngày khám</p>
                        <p className="font-bold text-gray-900">{activePrescription.date}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{activePrescription.time}</p>
                      </div>
                      <div className="px-4">
                        <p className="text-gray-500 text-xs flex items-center gap-1.5 mb-1"><User size={14}/> Bác sĩ khám</p>
                        <p className="font-bold text-gray-900">{activePrescription.doctor}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{activePrescription.doctorSpecialty}</p>
                      </div>
                      <div className="px-4">
                        <p className="text-gray-500 text-xs flex items-center gap-1.5 mb-1"><Stethoscope size={14}/> Chẩn đoán</p>
                        <p className="font-bold text-gray-900 leading-relaxed pr-2">{activePrescription.diagnosis}</p>
                      </div>
                      <div className="px-4 flex flex-col justify-center">
                        <p className="text-gray-500 text-xs flex items-center gap-1.5 mb-1.5"><ClipboardList size={14}/> Tình trạng đơn thuốc</p>
                        <div><span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border inline-block ${activePrescription.statusColor}`}>{activePrescription.status}</span></div>
                      </div>
                    </div>

                    <h3 className="font-bold text-gray-900 mb-4 text-base">Danh sách thuốc</h3>
                    <div className="overflow-x-auto border border-gray-100 rounded-xl mb-8">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 bg-gray-50 border-b border-gray-100">
                          <tr>
                            <th className="px-5 py-4 font-bold">STT</th>
                            <th className="px-5 py-4 font-bold">Tên thuốc</th>
                            <th className="px-5 py-4 font-bold">Hàm lượng</th>
                            <th className="px-5 py-4 font-bold">Dạng bào chế</th>
                            <th className="px-5 py-4 font-bold text-center">Số lượng</th>
                            <th className="px-5 py-4 font-bold">Cách dùng</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {activePrescription.medicines.map((med: any, idx: number) => (
                            <tr key={idx} className="hover:bg-gray-50/50">
                              <td className="px-5 py-4 text-gray-500">{idx + 1}</td>
                              <td className="px-5 py-4 font-bold text-gray-900">{med.name}</td>
                              <td className="px-5 py-4 text-gray-600">{med.dosage || '-'}</td>
                              <td className="px-5 py-4 text-gray-600">{med.form || '-'}</td>
                              <td className="px-5 py-4 font-medium text-gray-900 text-center">{med.quantity}</td>
                              <td className="px-5 py-4 text-gray-600 leading-relaxed whitespace-pre-line">
                                {med.note}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      
                      <div className="border border-blue-100 bg-blue-50/30 rounded-2xl p-6">
                        <h3 className="font-bold text-[#2563EB] mb-4 flex items-center gap-2 text-sm">
                          <FileText size={18} /> Lưu ý của bác sĩ
                        </h3>
                        <ul className="space-y-2.5 text-sm text-gray-700 list-disc pl-5">
                          {activePrescription.instructions.map((inst: string, idx: number) => (
                            <li key={idx} className="leading-relaxed font-medium">{inst}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="border border-gray-100 rounded-2xl p-6 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-[#2563EB] mb-4 flex items-center gap-2 text-sm">
                            <CalendarClock size={18} /> Tái khám
                          </h3>
                          <p className="text-gray-500 text-sm mb-1.5">Ngày tái khám dự kiến</p>
                          <p className="font-black text-gray-900 text-lg">{activePrescription.followUpDate || 'Không có hẹn'}</p>
                        </div>
                        {activePrescription.followUpDate && (
                          <div className="mt-6 flex justify-end">
                            <button className="px-5 py-2.5 border border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white transition rounded-xl text-sm font-bold shadow-sm flex items-center gap-2">
                              <Calendar size={16}/> Đặt lịch tái khám
                            </button>
                          </div>
                        )}
                      </div>

                    </div>
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center flex-col text-gray-400 min-h-[400px]">
                    <Pill size={48} className="opacity-20 mb-4" />
                    <p className="font-bold text-gray-600">Chọn một đơn thuốc</p>
                    <p className="text-sm mt-1">Chi tiết đơn thuốc sẽ được hiển thị tại đây.</p>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

      </main>
    </div>
  );
}