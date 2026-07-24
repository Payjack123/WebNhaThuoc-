'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, CalendarDays, FileText, Pill, TestTube, History,
  Bell, Settings, LogOut, Search, Activity, User, Wallet,
  HeartPulse, ArrowRight, Clock, MapPin, Stethoscope, CheckCircle2, 
  ChevronRight, ArrowLeft, Star, Baby, Eye, Bone, Check, Loader2
} from 'lucide-react';

import { getPatientAppointmentData, getBookedTimes, createAppointment } from '@/app/patient/appointments/actions';

export default function PatientAppointmentsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('book');
  const [step, setStep] = useState(1);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [userData, setUserData] = useState<any>(null);
  const [doctorsList, setDoctorsList] = useState<any[]>([]);
  const [historyList, setHistoryList] = useState<any[]>([]);
  const [generatedDates, setGeneratedDates] = useState<string[]>([]);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);

  const [bookingData, setBookingData] = useState({
    specialty: '',
    doctor: '',
    doctorId: 0,
    doctorPrice: 150000,
    date: '',
    time: '',
    reason: '',
    finalCode: ''
  });

  const specialties = [
    { id: 'SP1', name: 'Nội tổng quát', icon: Stethoscope, color: 'text-blue-500 bg-blue-50' },
    { id: 'SP2', name: 'Tim mạch', icon: HeartPulse, color: 'text-red-500 bg-red-50' },
    { id: 'SP3', name: 'Nhi khoa', icon: Baby, color: 'text-yellow-500 bg-yellow-50' },
    { id: 'SP4', name: 'Cơ xương khớp', icon: Bone, color: 'text-orange-500 bg-orange-50' },
    { id: 'SP5', name: 'Mắt (Nhãn khoa)', icon: Eye, color: 'text-emerald-500 bg-emerald-50' },
    { id: 'SP6', name: 'Da liễu', icon: Activity, color: 'text-purple-500 bg-purple-50' },
  ];
  const availableTimes = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '14:00', '14:30', '15:00', '15:30'];

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPatientAppointmentData();
      if (res.success && res.data) {
        setUserData(res.data.user);
        
        const formattedDoctors = res.data.doctors.map((doc: any) => ({
          id: doc.id,
          name: doc.fullName,
          specialty: doc.doctorProfile?.specialty || 'Đa khoa',
          exp: doc.doctorProfile?.experience || '5 năm',
          rating: doc.doctorProfile?.rating || 5.0,
          price: (doc.doctorProfile?.price || 150000).toLocaleString('vi-VN') + 'đ',
          rawPrice: doc.doctorProfile?.price || 150000,
          image: doc.doctorProfile?.imagePrefix || 'BS'
        }));
        setDoctorsList(formattedDoctors);

        const formattedHistory = res.data.history.map((apt: any) => {
          let color = 'text-gray-700 bg-gray-100 border-gray-200';
          if (apt.status === 'ĐÃ XÁC NHẬN') color = 'text-green-700 bg-green-100 border-green-200';
          if (apt.status === 'CHỜ XÁC NHẬN') color = 'text-yellow-700 bg-yellow-100 border-yellow-200';
          
          return {
            id: `LK260${apt.id}`,
            date: apt.bookingDate,
            time: apt.bookingTime,
            doctor: apt.doctor.fullName,
            dept: apt.specialty,
            status: apt.status,
            color: color
          };
        });
        setHistoryList(formattedHistory);
      } else {
        router.push('/login');
      }
      setIsLoading(false);
    };
    fetchData();

    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      const dayStr = String(nextDate.getDate()).padStart(2, '0');
      const monthStr = String(nextDate.getMonth() + 1).padStart(2, '0');
      dates.push(`${dayStr}/${monthStr}`);
    }
    setGeneratedDates(dates);
  }, [router]);

  useEffect(() => {
    const fetchTimes = async () => {
      if (bookingData.doctorId && bookingData.date) {
        const fullDate = `${bookingData.date}/${new Date().getFullYear()}`;
        const res = await getBookedTimes(bookingData.doctorId, fullDate);
        if (res.success) setBookedTimes(res.bookedTimes);
      }
    };
    fetchTimes();
  }, [bookingData.doctorId, bookingData.date]);

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    const fullDate = `${bookingData.date}/${new Date().getFullYear()}`;
    
    const res = await createAppointment({
      doctorId: bookingData.doctorId,
      specialty: bookingData.specialty,
      date: fullDate,
      time: bookingData.time,
      reason: bookingData.reason
    });

    setIsSubmitting(false);

    if (res.success) {
      setBookingData(prev => ({ ...prev, finalCode: res.appointmentCode! }));
      setStep(5);
    } else {
      alert(res.message);
    }
  };

  const handleLogout = () => router.push('/login');

  // FIX LỖI Ở ĐÂY: Lọc không phân biệt hoa thường và bỏ khoảng trắng thừa
  const filteredDoctors = doctorsList.filter(doc => 
    doc.specialty?.trim().toLowerCase() === bookingData.specialty?.trim().toLowerCase()
  );

  // Hàm tính số lượng bác sĩ của 1 khoa
  const getDoctorCount = (specialtyName: string) => {
    return doctorsList.filter(doc => 
      doc.specialty?.trim().toLowerCase() === specialtyName.trim().toLowerCase()
    ).length;
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]"><Loader2 className="w-10 h-10 text-[#2563EB] animate-spin" /></div>;
  }

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] font-sans text-gray-800 overflow-hidden">
      
      {/* ==========================================
          1. SIDEBAR
      ========================================== */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0 shrink-0 shadow-sm z-20">
        <div className="h-20 flex items-center justify-center border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Activity className="text-[#2563EB]" size={28}/>
            <span className="font-black text-xl tracking-tight text-gray-900">HEALTH<span className="text-[#2563EB]">CARE</span></span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-4 custom-scrollbar">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">Menu chính</p>
          <Link href="/patient/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] rounded-2xl transition-all text-sm font-semibold">
            <LayoutDashboard size={18}/> Tổng quan
          </Link>
          <Link href="/patient/appointments" className="flex items-center gap-3 px-4 py-3 bg-[#2563EB] text-white rounded-2xl font-bold shadow-md shadow-blue-200 transition-all text-sm">
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

      {/* ==========================================
          2. MAIN CONTENT AREA
      ========================================== */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* TOP HEADER */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 p-2 rounded-lg"><CalendarDays className="text-[#2563EB]" size={24}/></div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Quản lý Lịch khám</h1>
            </div>
          </div>
          <div className="flex items-center gap-5 ml-auto">
            <button className="relative p-2.5 text-gray-500 hover:bg-blue-50 hover:text-[#2563EB] rounded-full transition bg-white border border-gray-200 shadow-sm">
              <Bell size={20}/>
            </button>
            <div className="flex items-center gap-3 pl-5 border-l border-gray-200 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900 group-hover:text-[#2563EB] transition">{userData?.fullName}</p>
                <p className="text-xs text-gray-500 font-medium">Bệnh nhân ({userData?.patientCode})</p>
              </div>
              <img src={`https://ui-avatars.com/api/?name=${userData?.fullName}&background=2563EB&color=fff`} alt="Avatar" className="w-11 h-11 rounded-full border-2 border-white shadow-sm group-hover:shadow-md transition"/>
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 animate-in fade-in duration-500">
          
          {/* TABS THÔNG MINH */}
          <div className="flex bg-gray-200/50 p-1.5 rounded-2xl w-max mb-8 border border-gray-200">
            <button 
              onClick={() => { setActiveTab('book'); setStep(1); }}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'book' ? 'bg-white text-[#2563EB] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <Activity size={16}/> Đặt lịch trực tuyến
            </button>
            <button 
              onClick={() => { setActiveTab('history'); }}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'history' ? 'bg-white text-[#2563EB] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <History size={16}/> Lịch sử khám
            </button>
          </div>

          {/* =======================================
              TAB 1: WIZARD ĐẶT LỊCH
          ======================================= */}
          {activeTab === 'book' && (
            <div className="max-w-4xl mx-auto">
              
              {/* Stepper / Breadcrumb */}
              {step < 5 && (
                <div className="flex items-center justify-between mb-8 relative">
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 rounded-full z-0"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#2563EB] rounded-full z-0 transition-all duration-500" style={{ width: `${(step - 1) * 33.33}%` }}></div>
                  
                  {[
                    { s: 1, label: 'Chuyên khoa' },
                    { s: 2, label: 'Bác sĩ' },
                    { s: 3, label: 'Thời gian' },
                    { s: 4, label: 'Xác nhận' }
                  ].map((item) => (
                    <div key={item.s} className="relative z-10 flex flex-col items-center gap-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step >= item.s ? 'bg-[#2563EB] text-white shadow-md shadow-blue-200 border-2 border-white' : 'bg-gray-100 text-gray-400 border-2 border-white'}`}>
                        {step > item.s ? <Check size={18}/> : item.s}
                      </div>
                      <span className={`text-xs font-bold ${step >= item.s ? 'text-gray-900' : 'text-gray-400'}`}>{item.label}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px] flex flex-col relative animate-in fade-in slide-in-from-bottom-4">
                
                {/* STEP 1: CHỌN CHUYÊN KHOA */}
                {step === 1 && (
                  <div className="p-8 flex-1 flex flex-col animate-in slide-in-from-right-8">
                    <div className="mb-6 text-center">
                      <h2 className="text-2xl font-black text-gray-900">Chọn chuyên khoa</h2>
                      <p className="text-gray-500 mt-2">Vui lòng chọn chuyên khoa bạn muốn thăm khám để chúng tôi đề xuất bác sĩ phù hợp.</p>
                    </div>
                    <div className="relative mb-8 max-w-md mx-auto w-full">
                      <input type="text" placeholder="Tìm kiếm chuyên khoa..." className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition-all"/>
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {specialties.map((spec) => {
                        // Tính số bác sĩ có trong khoa này
                        const count = getDoctorCount(spec.name);
                        
                        return (
                          <div 
                            key={spec.id} 
                            onClick={() => { setBookingData({ ...bookingData, specialty: spec.name, doctor: '', doctorId: 0 }); setStep(2); }}
                            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center text-center gap-3 group ${bookingData.specialty === spec.name ? 'border-[#2563EB] bg-blue-50/50' : 'border-gray-100 bg-white hover:border-blue-200 hover:shadow-md'}`}
                          >
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${spec.color} transition-transform group-hover:scale-110`}>
                              <spec.icon size={28}/>
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900">{spec.name}</h3>
                              {/* Hiển thị số lượng bác sĩ */}
                              <p className={`text-xs mt-1 ${count > 0 ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
                                {count > 0 ? `${count} bác sĩ` : 'Chưa có bác sĩ'}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 2: CHỌN BÁC SĨ */}
                {step === 2 && (
                  <div className="p-8 flex-1 flex flex-col animate-in slide-in-from-right-8">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                      <button onClick={() => setStep(1)} className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-600 transition"><ArrowLeft size={20}/></button>
                      <div>
                        <h2 className="text-xl font-black text-gray-900">Chọn bác sĩ ({bookingData.specialty})</h2>
                        <p className="text-gray-500 text-sm mt-1">Lựa chọn bác sĩ mà bạn muốn đặt lịch khám.</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredDoctors.length > 0 ? filteredDoctors.map((doc) => (
                        <div 
                          key={doc.id} 
                          className="border border-gray-200 rounded-2xl p-5 hover:border-[#2563EB] hover:shadow-md transition-all flex flex-col bg-white"
                        >
                          <div className="flex gap-4">
                            <div className="w-16 h-16 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xl font-black text-indigo-600 shrink-0">
                              {doc.image}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-900 text-lg leading-tight">{doc.name}</h3>
                              <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5"><Stethoscope size={14}/> Kinh nghiệm: {doc.exp}</p>
                              <div className="flex items-center gap-1 mt-1 text-sm font-bold text-orange-500">
                                <Star size={14} fill="currentColor"/> {doc.rating}
                              </div>
                            </div>
                          </div>
                          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                            <div>
                              <p className="text-xs text-gray-500 uppercase font-bold">Phí khám</p>
                              <p className="font-black text-[#2563EB]">{doc.price}</p>
                            </div>
                            <div className="flex gap-2">
                              <Link 
                                href={`/doctor/profile`} 
                                target="_blank" 
                                className="bg-white border border-[#2563EB] text-[#2563EB] hover:bg-blue-50 px-4 py-2 rounded-xl font-bold transition-colors text-sm flex items-center"
                              >
                                Xem hồ sơ
                              </Link>
                              <button 
                                onClick={() => { setBookingData({ ...bookingData, doctor: doc.name, doctorId: doc.id, doctorPrice: doc.rawPrice }); setStep(3); }}
                                className="bg-blue-50 text-[#2563EB] hover:bg-[#2563EB] hover:text-white px-5 py-2 rounded-xl font-bold transition-colors text-sm"
                              >
                                Chọn khám
                              </button>
                            </div>
                          </div>
                        </div>
                      )) : (
                        <div className="col-span-2 text-center py-12 bg-gray-50 rounded-2xl border border-gray-100 text-gray-500">
                          <Stethoscope size={48} className="mx-auto text-gray-300 mb-3" />
                          <p className="font-medium text-gray-900">Không có bác sĩ</p>
                          <p className="text-sm mt-1">Hiện không có bác sĩ nào đăng ký thuộc chuyên khoa này.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* STEP 3: CHỌN NGÀY GIỜ & LÝ DO */}
                {step === 3 && (
                  <div className="p-8 flex-1 flex flex-col animate-in slide-in-from-right-8">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                      <button onClick={() => setStep(2)} className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-600 transition"><ArrowLeft size={20}/></button>
                      <div>
                        <h2 className="text-xl font-black text-gray-900">Chọn thời gian khám</h2>
                        <p className="text-gray-500 text-sm mt-1">Bác sĩ: <strong className="text-gray-900">{bookingData.doctor}</strong></p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Chọn Ngày */}
                      <div>
                        <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase">1. Chọn ngày</h3>
                        <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                          {generatedDates.map(d => (
                            <button 
                              key={d}
                              onClick={() => setBookingData({ ...bookingData, date: d, time: '' })}
                              className={`shrink-0 w-20 py-3 rounded-xl border-2 font-bold flex flex-col items-center gap-1 transition-all ${bookingData.date === d ? 'border-[#2563EB] bg-[#2563EB] text-white shadow-md' : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'}`}
                            >
                              <span className="text-xs font-normal opacity-80">Ngày</span>
                              <span className="text-lg">{d}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Chọn Giờ */}
                      <div className={`transition-opacity ${bookingData.date ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                        <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase flex items-center gap-2">2. Chọn khung giờ <span className="text-xs font-normal normal-case bg-green-100 text-green-700 px-2 py-0.5 rounded">Khung giờ trống</span></h3>
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                          {availableTimes.map((t) => {
                            const isFull = bookedTimes.includes(t); 
                            return (
                              <button 
                                key={t}
                                disabled={isFull}
                                onClick={() => setBookingData({ ...bookingData, time: t })}
                                className={`py-2 rounded-xl border font-bold text-sm transition-all ${
                                  isFull ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-50 relative overflow-hidden' : 
                                  bookingData.time === t ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] ring-2 ring-blue-200' : 
                                  'border-green-200 bg-white text-green-700 hover:bg-green-50'
                                }`}
                              >
                                {isFull && <div className="absolute inset-0 flex items-center justify-center bg-gray-200/50"><div className="w-full h-px bg-red-400 rotate-12"></div></div>}
                                {t}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Lý do khám */}
                      <div className={`transition-opacity ${bookingData.time ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                        <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase">3. Lý do khám (Tùy chọn)</h3>
                        <textarea 
                          rows={3}
                          value={bookingData.reason}
                          onChange={(e) => setBookingData({...bookingData, reason: e.target.value})}
                          placeholder="Mô tả sơ bộ triệu chứng của bạn để bác sĩ nắm thông tin..."
                          className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white resize-none"
                        ></textarea>
                      </div>
                    </div>

                    <div className="mt-auto pt-6 flex justify-end">
                      <button 
                        disabled={!bookingData.date || !bookingData.time}
                        onClick={() => setStep(4)}
                        className="bg-[#2563EB] text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-md transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Tiếp tục <ArrowRight size={18}/>
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: XÁC NHẬN */}
                {step === 4 && (
                  <div className="p-8 flex-1 flex flex-col animate-in slide-in-from-right-8 bg-gray-50/50">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                      <button onClick={() => setStep(3)} className="p-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-full text-gray-600 transition"><ArrowLeft size={20}/></button>
                      <div>
                        <h2 className="text-2xl font-black text-gray-900">Xác nhận lịch hẹn</h2>
                        <p className="text-gray-500 text-sm mt-1">Vui lòng kiểm tra lại thông tin trước khi hoàn tất.</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 relative overflow-hidden">
                      <div className="absolute -left-3 top-1/2 w-6 h-6 bg-gray-50 rounded-full border-r border-gray-200"></div>
                      <div className="absolute -right-3 top-1/2 w-6 h-6 bg-gray-50 rounded-full border-l border-gray-200"></div>
                      <div className="absolute left-4 right-4 top-1/2 border-t-2 border-dashed border-gray-100"></div>

                      <div className="pb-6">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Thông tin bệnh nhân</h3>
                        <div className="grid grid-cols-2 gap-y-3 text-sm">
                          <div><span className="text-gray-500">Họ và tên:</span> <span className="font-bold text-gray-900">{userData?.fullName}</span></div>
                          <div><span className="text-gray-500">Mã BN:</span> <span className="font-bold text-gray-900">{userData?.patientCode}</span></div>
                          <div><span className="text-gray-500">SĐT Đăng ký:</span> <span className="font-bold text-gray-900">0981.234.567</span></div>
                          <div><span className="text-gray-500">BHYT:</span> <span className="font-bold text-green-600">Có</span></div>
                        </div>
                      </div>

                      <div className="pt-6">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Thông lịch khám</h3>
                        <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                          <p className="font-black text-lg text-gray-900">{bookingData.doctor}</p>
                          <p className="text-sm text-[#2563EB] font-bold mt-0.5 mb-3">{bookingData.specialty}</p>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm bg-white p-3 rounded-lg border border-gray-100">
                            <div className="flex items-center gap-2 font-bold text-gray-800"><CalendarDays size={16} className="text-[#2563EB]"/> {bookingData.date}/{new Date().getFullYear()}</div>
                            <div className="flex items-center gap-2 font-bold text-gray-800"><Clock size={16} className="text-[#2563EB]"/> {bookingData.time}</div>
                          </div>
                        </div>
                        {bookingData.reason && (
                           <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm italic text-gray-600 border border-gray-100">
                             Lý do: "{bookingData.reason}"
                           </div>
                        )}
                        <div className="mt-4 flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200">
                          <span className="font-bold text-gray-700">Phí khám dự kiến:</span>
                          <span className="font-black text-xl text-emerald-600">{bookingData.doctorPrice.toLocaleString('vi-VN')} VNĐ</span>
                        </div>
                        <p className="text-xs text-center text-gray-400 mt-3">* Thanh toán trực tiếp tại quầy lễ tân tầng 1.</p>
                      </div>
                    </div>

                    <div className="mt-auto pt-6">
                      <button 
                        disabled={isSubmitting}
                        onClick={handleConfirmBooking}
                        className="w-full bg-[#2563EB] text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-2 disabled:bg-blue-400"
                      >
                        {isSubmitting ? <Loader2 className="animate-spin" size={24}/> : <CheckCircle2 size={24}/>} Xác nhận đặt lịch ngay
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 5: THÀNH CÔNG */}
                {step === 5 && (
                  <div className="p-8 flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                      <Check size={48} strokeWidth={3}/>
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-2">Đặt lịch thành công!</h2>
                    <p className="text-gray-600 max-w-md">Bạn đã đặt lịch khám thành công với <strong className="text-gray-900">{bookingData.doctor}</strong> vào lúc <strong className="text-[#2563EB]">{bookingData.time} ngày {bookingData.date}/{new Date().getFullYear()}</strong>.</p>
                    
                    <div className="mt-6 bg-gray-50 border border-gray-200 px-6 py-4 rounded-2xl">
                      <p className="text-xs text-gray-500 font-bold uppercase mb-1">Mã Lịch Khám</p>
                      <p className="text-2xl font-mono font-black text-[#2563EB] tracking-widest">{bookingData.finalCode}</p>
                    </div>

                    <p className="text-sm text-gray-500 mt-6 max-w-md">Hệ thống đã cập nhật lịch khám. Vui lòng có mặt tại phòng khám trước 15 phút để làm thủ tục.</p>

                    <div className="mt-8 flex gap-4 w-full max-w-sm">
                      <button 
                        onClick={() => { window.location.reload(); }}
                        className="flex-1 bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:border-gray-300 hover:bg-gray-50 transition"
                      >
                        Đặt lịch mới
                      </button>
                      <button 
                        onClick={() => router.push('/patient/dashboard')}
                        className="flex-1 bg-[#2563EB] text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-md transition"
                      >
                        Về trang chủ
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =======================================
              TAB 2: LỊCH SỬ ĐẶT LỊCH
          ======================================= */}
          {activeTab === 'history' && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg"><History size={20} className="text-[#2563EB]"/> Lịch sử Khám bệnh</h3>
                <div className="flex gap-2">
                  <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium outline-none shadow-sm">
                    <option>Trạng thái (Tất cả)</option>
                    <option>Chờ xác nhận</option>
                    <option>Đã xác nhận</option>
                    <option>Hoàn thành</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-white border-b border-gray-100 text-gray-500 font-bold">
                    <tr>
                      <th className="px-6 py-4">Mã lịch</th>
                      <th className="px-6 py-4">Thời gian</th>
                      <th className="px-6 py-4">Bác sĩ & Chuyên khoa</th>
                      <th className="px-6 py-4 text-center">Trạng thái</th>
                      <th className="px-6 py-4 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {historyList.length > 0 ? historyList.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition group">
                        <td className="px-6 py-4 font-bold text-gray-900">{item.id}</td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-[#2563EB]">{item.time}</p>
                          <p className="text-gray-500 text-xs mt-0.5">{item.date}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-gray-800">{item.doctor}</p>
                          <p className="text-gray-500 text-xs mt-0.5">{item.dept}</p>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center justify-center w-max mx-auto gap-1.5 ${item.color}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-[#2563EB] font-bold text-sm bg-blue-50 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition">Chi tiết</button>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan={5} className="text-center py-10 text-gray-500">Bạn chưa có lịch hẹn nào.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}