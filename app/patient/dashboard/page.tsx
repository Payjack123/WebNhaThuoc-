// app/patient/dashboard/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, CalendarDays, FileText, Pill, TestTube, ChevronRight, Star,
  Bell, Settings, LogOut, Search, Activity, User, Wallet, 
  HeartPulse, Droplet, ArrowRight, Clock, MapPin, Stethoscope, Bot, CheckCircle2, AlertCircle, Loader2
} from 'lucide-react';

import { getPatientDashboardData } from '@/app/patient/dashboard/actions';

export default function PatientDashboard() {
  const router = useRouter();
  
  // States quản lý dữ liệu
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPatientDashboardData();
      if (res.success) {
        setData(res.data);
      } else {
        // Nếu lỗi (chưa đăng nhập), đẩy về trang login
        router.push('/login');
      }
      setIsLoading(false);
    };
    fetchData();
  }, [router]);

  const handleLogout = () => {
    router.push('/login');
  };

  // Màn hình chờ trong lúc fetch dữ liệu từ TiDB
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          <p className="font-medium text-gray-500">Đang tải dữ liệu y tế của bạn...</p>
        </div>
      </div>
    );
  }

  // Fallback nếu không có dữ liệu
  if (!data) return null;

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] font-sans text-gray-800 overflow-hidden">
      
      {/* SIDEBAR (Giữ nguyên như thiết kế của bạn) */}
       <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0 shrink-0 shadow-sm z-20">
        <div className="h-20 flex items-center justify-center border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Activity className="text-[#2563EB]" size={28}/>
            <span className="font-black text-xl tracking-tight text-gray-900">HEALTH<span className="text-[#2563EB]">CARE</span></span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-4 custom-scrollbar">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">Menu chính</p>
          
          <Link href="/patient/dashboard" className="flex items-center gap-3 px-4 py-3 bg-[#2563EB] text-white rounded-2xl font-bold shadow-md shadow-blue-200 transition-all text-sm">
            <LayoutDashboard size={18}/> Tổng quan
          </Link>
          {/* Active Menu */}
          <Link href="/patient/appointments" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] rounded-2xl transition-all text-sm font-semibold">
            <CalendarDays size={18}/> Đặt & Lịch khám
          </Link>
          <Link href="/patient/records" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] rounded-2xl transition-all text-sm font-semibold">
            <FileText size={18}/> Hồ sơ sức khỏe
          </Link>
          <Link href="/patient/prescriptions" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] rounded-2xl transition-all text-sm font-semibold">
            <Pill size={18}/> Đơn thuốc của tôi
          </Link>
          <Link href="/patient/lab-tests" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] rounded-2xl transition-all text-sm font-semibold">
            <TestTube size={18}/> Kết quả xét nghiệm
          </Link>
          <Link href="/patient/billing" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] rounded-2xl transition-all text-sm font-semibold">
            <Wallet size={18}/> Thanh toán viện phí
          </Link>

          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-6 mb-2 px-2">Tài khoản</p>
          <Link href="/patient/settings" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] rounded-2xl transition-all text-sm font-semibold">
            <Settings size={18}/> Cài đặt cá nhân
          </Link>
        </div>

        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-2xl transition-all text-sm font-bold">
            <LogOut size={18}/> Đăng xuất
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* HEADER */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-10">
          <div className="relative w-96 hidden md:block">
            <input type="text" placeholder="Tìm kiếm bác sĩ, dịch vụ, thuốc..." className="w-full pl-11 pr-4 py-2.5 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition-all font-medium text-gray-700"/>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
          </div>
          <div className="flex items-center gap-5 ml-auto">
            <button className="relative p-2.5 text-gray-500 hover:bg-blue-50 hover:text-[#2563EB] rounded-full transition bg-white border border-gray-200 shadow-sm">
              <Bell size={20}/>
            </button>
            <div className="flex items-center gap-3 pl-5 border-l border-gray-200 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900 group-hover:text-[#2563EB] transition">{data.user.fullName}</p>
                <p className="text-xs text-gray-500 font-medium">Bệnh nhân ({data.user.patientCode})</p>
              </div>
              <img src={`https://ui-avatars.com/api/?name=${data.user.fullName}&background=2563EB&color=fff`} alt="Avatar" className="w-11 h-11 rounded-full border-2 border-white shadow-sm"/>
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 animate-in fade-in duration-500">
          
          {/* HERO BANNER */}
          <div className="bg-[#0F172A] rounded-3xl p-8 mb-8 text-white relative overflow-hidden shadow-lg border border-gray-800">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB] rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 right-40 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-20"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-blue-200 mb-4 backdrop-blur-sm">
                  <Bot size={14}/> AI Health Assistant
                </div>
                <h2 className="text-3xl font-black mb-3">Xin chào, {data.user.fullName} 👋</h2>
                <p className="text-gray-300 text-base max-w-xl leading-relaxed">
                  {data.metric?.aiMessage || "Chưa có dữ liệu phân tích sức khỏe. Hãy đặt lịch khám để AI phân tích chi tiết nhé."}
                </p>
              </div>
              <div className="shrink-0">
                <button className="bg-[#2563EB] hover:bg-blue-600 text-white px-6 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all flex items-center gap-2">
                  <CalendarDays size={18}/> Đặt lịch khám mới
                </button>
              </div>
            </div>
          </div>

          {/* CHỈ SỐ CƠ THỂ */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Activity size={20} className="text-[#2563EB]"/> Chỉ số cơ thể gần nhất
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 xl:gap-6">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:border-red-200 hover:shadow-md transition">
                <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center shrink-0"><HeartPulse size={24}/></div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase mb-0.5">Nhịp tim</p>
                  <p className="text-xl font-black text-gray-900">{data.metric?.heartRate || '--'} <span className="text-xs font-medium text-gray-500">bpm</span></p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:border-blue-200 hover:shadow-md transition">
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center shrink-0"><Droplet size={24}/></div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase mb-0.5">Huyết áp</p>
                  <p className="text-xl font-black text-gray-900">{data.metric?.bloodPressure || '--'} <span className="text-xs font-medium text-gray-500">mmHg</span></p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:border-emerald-200 hover:shadow-md transition">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0"><User size={24}/></div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase mb-0.5">Cân nặng / BMI</p>
                  <p className="text-xl font-black text-gray-900">{data.metric?.weight || '--'} <span className="text-xs font-medium text-gray-500">kg ({data.metric?.bmi || '--'})</span></p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#2563EB] to-indigo-600 p-5 rounded-2xl shadow-sm border border-blue-600 flex items-center gap-4 hover:shadow-lg transition relative overflow-hidden">
                <div className="w-12 h-12 bg-white/20 text-white rounded-xl flex items-center justify-center shrink-0 relative z-10"><Star size={24} fill="currentColor"/></div>
                <div className="relative z-10">
                  <p className="text-xs text-blue-100 font-bold uppercase mb-0.5">AI Health Score</p>
                  <p className="text-2xl font-black text-white">{data.metric?.aiScore || '--'}<span className="text-sm font-medium text-blue-200">/100</span></p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            
            {/* LỊCH KHÁM */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg"><CalendarDays size={20} className="text-[#2563EB]"/> Lịch khám sắp tới</h3>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-center">
                
                {data.appointments.length > 0 ? data.appointments.map((apt: any) => (
                  <div key={apt.id} className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 mb-4 relative hover:border-[#2563EB] transition cursor-pointer">
                    <div className="absolute top-0 right-0 bg-[#2563EB] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase">Sắp tới</div>
                    <div className="flex gap-4">
                      <div className="bg-white border border-indigo-100 rounded-xl w-16 h-16 flex flex-col items-center justify-center shrink-0 shadow-sm">
                        {/* Lấy Tháng và Ngày từ chuỗi "15/08/2026" */}
                        <span className="text-xs text-gray-500 font-bold uppercase">Tháng {apt.bookingDate.split('/')[1]}</span>
                        <span className="text-xl font-black text-[#2563EB]">{apt.bookingDate.split('/')[0]}</span>
                      </div>
                      <div>
                        {/* Đổi serviceName thành specialty, doctorName thành doctor.fullName */}
                        <h4 className="font-bold text-gray-900 text-lg">{apt.specialty}</h4>
                        <p className="text-sm text-gray-600 mt-1 flex items-center gap-1.5"><Clock size={14}/> {apt.bookingTime}</p>
                        <p className="text-sm text-gray-600 mt-1 flex items-center gap-1.5"><Stethoscope size={14}/> {apt.doctor.fullName}</p>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="text-center text-gray-500 py-10">Bạn chưa có lịch hẹn nào sắp tới.</div>
                )}
                
              </div>
            </div>

            {/* ĐƠN THUỐC */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg"><Pill size={20} className="text-[#2563EB]"/> Đang sử dụng {data.prescription && `(${data.prescription.code})`}</h3>
              </div>
              <div className="p-0 flex-1 overflow-auto">
                {data.prescription?.items?.length > 0 ? (
                  <ul className="divide-y divide-gray-100">
                    {data.prescription.items.map((item: any) => (
                      <li key={item.id} className="p-5 hover:bg-gray-50 transition flex items-start justify-between">
                        <div className="flex gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${item.iconType === 'liquid' ? 'bg-blue-50 text-[#2563EB] border-blue-100' : 'bg-orange-50 text-orange-500 border-orange-100'}`}>
                            {item.iconType === 'liquid' ? <TestTube size={20}/> : <Pill size={20}/>}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-base">{item.medicationName}</p>
                            <p className="text-sm text-gray-600 mt-0.5">{item.dosage}</p>
                            <span className="inline-block mt-2 bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded">{item.instructions}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900">{item.remaining}</p>
                          <p className="text-xs text-gray-400 mt-1">{item.statusText}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center text-gray-500 py-10">Bạn không có đơn thuốc nào đang sử dụng.</div>
                )}
              </div>
            </div>
          </div>

          {/* KẾT QUẢ XÉT NGHIỆM */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
             <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
               <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg"><TestTube size={20} className="text-[#2563EB]"/> Kết quả xét nghiệm gần nhất</h3>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-white border-b border-gray-100 text-gray-500 font-bold">
                    <tr>
                      <th className="px-6 py-4">Ngày</th>
                      <th className="px-6 py-4">Loại xét nghiệm</th>
                      <th className="px-6 py-4">Bác sĩ chỉ định</th>
                      <th className="px-6 py-4">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {data.labTests.length > 0 ? data.labTests.map((test: any) => (
                      <tr key={test.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 font-bold text-gray-900">{new Date(test.date).toLocaleDateString('vi-VN')}</td>
                        <td className="px-6 py-4 font-medium text-[#2563EB]">{test.testName}</td>
                        <td className="px-6 py-4 text-gray-600">{test.doctorName}</td>
                        <td className="px-6 py-4">
                          {test.statusType === 'GOOD' ? (
                            <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-lg text-xs font-bold border border-green-200 flex items-center w-max gap-1"><CheckCircle2 size={14}/> {test.result}</span>
                          ) : (
                            <span className="bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-lg text-xs font-bold border border-yellow-200 flex items-center w-max gap-1"><AlertCircle size={14}/> {test.result}</span>
                          )}
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan={4} className="text-center text-gray-500 py-6">Chưa có kết quả xét nghiệm nào.</td></tr>
                    )}
                  </tbody>
                </table>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}