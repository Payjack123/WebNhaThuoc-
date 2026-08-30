'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  HeartPulse, ShieldCheck, FileText, Pill, CalendarDays, 
  Droplet, Scale, User, Bell, Phone, Mail, MapPin, 
  AlertCircle, Link2, Search, ArrowRight, ChevronRight, Stethoscope, 
  Beaker, CheckCircle2, History, Syringe, Users, Loader2, Calendar, ClipboardList, Weight, Scissors
} from 'lucide-react';

import { getPatientMedicalRecordsData } from '@/app/patient/records/actions';
import PatientSidebar from '@/app/patient/Sidebar';

export default function PatientRecordsPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getPatientMedicalRecordsData();
      if (res.success && res.data) {
        setData(res.data);
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
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  const {
    patientInfo,
    vitals,
    visitHistory,
    currentMedications,
    allergies,
    chronicDiseases,
    recentLabs,
  } = data;

  const displayChronicDiseases = chronicDiseases || [];
  const displayVisitHistory = (visitHistory || []).slice(0, 4);

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] font-sans text-gray-800 overflow-hidden">
      
      <PatientSidebar activePage="records" />

      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F8FAFC]">
        
        {/* TOP HEADER */}
        <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center justify-between shrink-0 sticky top-0 z-10">
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              Hồ sơ sức khỏe <ShieldCheck size={20} className="text-blue-500"/>
            </h1>
            <p className="text-[13px] text-gray-500 mt-0.5">Quản lý thông tin sức khỏe cá nhân và tiền sử bệnh của bạn.</p>
          </div>
          <div className="flex items-center gap-6 ml-auto">
            <button className="relative text-gray-500 hover:text-blue-600 transition">
              <Bell size={22}/>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">3</span>
            </button>
            <div className="flex items-center gap-3 cursor-pointer group">
              <img src={patientInfo.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(patientInfo.name)}&background=2563EB&color=fff`} alt="Avatar" className="w-10 h-10 rounded-full border border-gray-200 object-cover"/>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition">{patientInfo.name}</p>
                <p className="text-xs text-gray-500 font-medium">Bệnh nhân</p>
              </div>
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar space-y-6">
          
          {/* TOP ROW */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* THÔNG TIN CÁ NHÂN (LEFT) */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
              <div className="flex items-start gap-5 mb-8">
                <div className="w-24 h-24 rounded-full bg-blue-50 p-1 shrink-0">
                  <img src={patientInfo.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover"/>
                </div>
                <div className="pt-2">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-3">
                    {patientInfo.name}
                    <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-md">{patientInfo.gender}</span>
                  </h2>
                  <div className="space-y-2.5">
                    <p className="text-sm text-gray-600 flex items-center gap-3"><Calendar size={16} className="text-gray-400"/> {patientInfo.dob} ({new Date().getFullYear() - parseInt(patientInfo.dob.split('/')[2] || '1995')} tuổi)</p>
                    <p className="text-sm text-gray-600 flex items-center gap-3"><Phone size={16} className="text-gray-400"/> {patientInfo.phone}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-3"><Mail size={16} className="text-gray-400"/> {patientInfo.email}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-3"><MapPin size={16} className="text-gray-400"/> {patientInfo.address}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-3"><AlertCircle size={16} className="text-red-500"/> Dị ứng: <span className="font-medium text-red-500">{allergies?.length > 0 ? allergies.join(', ') : 'Không có'}</span></p>
                  </div>
                </div>
              </div>

              <button className="w-full py-2.5 bg-white border border-blue-200 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-50 transition-colors">
                Cập nhật thông tin
              </button>
            </div>

            {/* CHỈ SỐ SỨC KHỎE (RIGHT) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Row 1: Tình trạng & Nhóm máu */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 relative overflow-hidden group">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                    <ClipboardList size={24} className="text-green-500"/>
                  </div>
                  <div className="flex-1 relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-gray-900">Tình trạng sức khỏe</h3>
                      <span className="bg-green-50 text-green-600 text-xs font-bold px-2.5 py-0.5 rounded-md">Tốt</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Không có vấn đề sức khỏe nghiêm trọng.</p>
                    <p className="text-xs text-gray-400 mt-4">Cập nhật lần cuối: 15/08/2026</p>
                  </div>
                  <HeartPulse className="absolute bottom-2 right-2 w-24 h-24 text-green-50/50 -z-0 pointer-events-none"/>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 relative overflow-hidden group">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                    <ShieldCheck size={24} className="text-orange-500"/>
                  </div>
                  <div className="flex-1 relative z-10">
                    <h3 className="font-bold text-gray-900 mb-1">Nhóm máu</h3>
                    <p className="text-3xl font-black text-gray-900 mt-1">{patientInfo.bloodType}</p>
                    <p className="text-xs text-gray-500 mt-3">Yếu tố Rh: Dương tính</p>
                  </div>
                  <Droplet className="absolute bottom-2 right-2 w-24 h-24 text-orange-50/50 -z-0 pointer-events-none"/>
                </div>
              </div>

              {/* Row 2: Chiều cao, Cân nặng, BMI */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
                    <Beaker size={24} className="text-purple-500"/>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-600">Chiều cao</p>
                    <p className="text-xl font-black text-gray-900 mt-1">{vitals.height}</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                    <Scale size={24} className="text-blue-500"/>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-600">Cân nặng</p>
                    <p className="text-xl font-black text-gray-900 mt-1">{vitals.weight}</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                    <Scale size={24} className="text-green-500"/>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-600">BMI</p>
                    <p className="text-xl font-black text-gray-900 mt-1">{vitals.bmi}</p>
                    <p className="text-[11px] text-gray-500 font-medium">Bình thường</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* MIDDLE ROW: LỊCH SỬ BỆNH, DỊ ỨNG & THUỐC */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* KẾT QUẢ XÉT NGHIỆM */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col p-6">
              <div className="flex items-center gap-2 mb-6">
                <Beaker size={20} className="text-blue-500"/>
                <h3 className="font-bold text-gray-900 text-lg">Kết quả xét nghiệm</h3>
              </div>
              <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="border-b border-gray-100 text-gray-500">
                    <tr>
                      <th className="pb-3 font-semibold pr-4 w-1/3">Tên xét nghiệm</th>
                      <th className="pb-3 font-semibold px-4 w-1/4">Ngày thực hiện</th>
                      <th className="pb-3 font-semibold pl-4">Kết quả</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {(recentLabs && recentLabs.length > 0 ? recentLabs : [
                      { type: 'Tổng phân tích máu', date: '20/08/2026', result: 'Bình thường' },
                      { type: 'Sinh hóa máu', date: '20/08/2026', result: 'Cần theo dõi' },
                      { type: 'Siêu âm ổ bụng', date: '15/05/2026', result: 'Bình thường' }
                    ]).map((lab: any, i: number) => (
                      <tr key={i}>
                        <td className="py-4 font-bold text-gray-800 pr-4">{lab.type}</td>
                        <td className="py-4 text-gray-600 px-4">{lab.date}</td>
                        <td className="py-4 text-gray-600 pl-4">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${lab.result === 'Bình thường' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                            {lab.result}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link href="/patient/test-results" className="w-full mt-4 py-2 border border-gray-200 text-blue-600 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors flex items-center justify-center">
                Xem tất cả
              </Link>
            </div>

            {/* THUỐC ĐANG SỬ DỤNG */}
            <div className="flex flex-col gap-6">
              {/* Thuốc đang sử dụng */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-6">
                  <Link2 size={20} className="text-blue-500"/>
                  <h3 className="font-bold text-gray-900 text-lg">Thuốc đang sử dụng</h3>
                </div>
                <div className="flex-1 flex flex-col justify-center mt-2">
                  {currentMedications?.length > 0 ? (
                    <div className="space-y-3">
                      {currentMedications.map((med: any, i: number) => (
                        <div key={i} className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0">
                          <div>
                            <p className="text-sm font-bold text-gray-800">{med.name}</p>
                            <p className="text-xs text-gray-500">{med.instructions}</p>
                          </div>
                          <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-md">{med.quantity}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-700 mb-1">Không có thuốc đang sử dụng.</p>
                      <p className="text-sm text-gray-500">Bạn không có thuốc nào đang được kê đơn.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>



          </div>

          {/* BOTTOM ROW: TIMELINE LỊCH SỬ KHÁM */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between mb-10">
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                <CalendarDays size={20} className="text-blue-500"/>
                Lịch sử khám bệnh gần đây
              </h3>
              <Link href="/patient/appointments" className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
                Xem toàn bộ lịch sử <ArrowRight size={14}/>
              </Link>
            </div>

            <div className="relative">
              {/* Horizontal line */}
              <div className="absolute top-[8px] left-8 right-8 h-0.5 bg-blue-100 z-0"></div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                {displayVisitHistory.map((visit: any, index: number) => (
                  <div key={index} className="flex flex-col relative pt-[24px]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-sm z-10"></div>
                    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-between">
                       <div>
                         <p className="text-xs text-gray-500 font-bold mb-2">{visit.date}</p>
                         <p className="text-sm font-black text-gray-900 mb-2">{visit.dept}</p>
                         <p className="text-xs text-gray-600 flex items-center gap-1.5 mb-4">
                           <User size={14} className="text-gray-400"/>
                           {visit.doctor}
                         </p>
                       </div>
                       <div className="flex justify-end">
                         <span className="inline-flex items-center px-3 py-1 text-xs font-bold rounded-md bg-green-50 text-green-600">
                           {visit.status}
                         </span>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="h-4"></div>
        </div>
      </main>
    </div>
  );
}