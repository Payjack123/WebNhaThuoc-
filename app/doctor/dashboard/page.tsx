'use client';

import { Star } from "lucide-react";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, CalendarDays, Users, FileText, Pill, TestTube, 
  Bot, BarChart3, Bell, User, Settings, LogOut, Search, Plus, 
  CheckCircle2, Clock, AlertTriangle, ArrowRight, Activity, 
  Printer, Mic, ChevronRight, FileSpreadsheet, Stethoscope, Save, 
  Megaphone, Loader2
} from 'lucide-react';

import { getDoctorDashboardData, saveExamination, savePrescription, saveLabRequests } from '@/app/doctor/dashboard/actions';

export default function DoctorDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('exam'); 
  
  // States xử lý dữ liệu backend
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State lưu Bệnh nhân đang được click để khám
  const [activeApt, setActiveApt] = useState<any>(null);

  // States Form Khám
  const [examForm, setExamForm] = useState({ symptoms: '', diagnosis: '', notes: '' });
  
  // States Form Thuốc
  const [medList, setMedList] = useState<any[]>([]);
  const [currentMed, setCurrentMed] = useState({ name: 'Paracetamol 500mg', dosage: '', time: '', qty: '' });

  // States Form Xét nghiệm
  const [selectedTests, setSelectedTests] = useState<string[]>(['Xét nghiệm máu (CBC)']);
  const [labNotes, setLabNotes] = useState('');

  // 1. Fetch dữ liệu khi Load trang
  useEffect(() => {
    const fetchDashboard = async () => {
      const res = await getDoctorDashboardData();
      if (res.success && res.data) {
        setDashboardData(res.data);
        // Mặc định chọn ca khám đầu tiên chưa hoàn thành
        const pendingApt = res.data.appointments.find((a: any) => a.status !== 'HOÀN THÀNH');
        if (pendingApt) setActiveApt(pendingApt);
      } else {
        router.push('/login');
      }
      setIsLoading(false);
    };
    fetchDashboard();
  }, [router]);

  const handleLogout = () => router.push('/login');

  // --- CÁC HÀM XỬ LÝ LƯU DỮ LIỆU ---
  const handleSaveExam = async () => {
    if (!activeApt || !examForm.diagnosis) return alert('Vui lòng nhập chẩn đoán!');
    setIsSubmitting(true);
    const res = await saveExamination({
      appointmentId: activeApt.id,
      patientId: activeApt.patientId,
      symptoms: examForm.symptoms,
      diagnosis: examForm.diagnosis,
      notes: examForm.notes
    });
    setIsSubmitting(false);
    if (res.success) {
      alert(res.message);
      window.location.reload(); 
    } else {
      alert(res.message);
    }
  };

  const handleAddMed = () => {
    if (!currentMed.dosage || !currentMed.qty) return;
    setMedList([...medList, { id: Date.now(), ...currentMed }]);
    setCurrentMed({ name: 'Paracetamol 500mg', dosage: '', time: '', qty: '' });
  };

  const handleSavePrescription = async () => {
    if (medList.length === 0) return alert('Chưa có thuốc nào trong đơn!');
    setIsSubmitting(true);
    const res = await savePrescription(activeApt.patientId, medList);
    setIsSubmitting(false);
    if (res.success) {
      alert(res.message);
      setMedList([]);
    } else alert(res.message);
  };

  const handleToggleTest = (testName: string) => {
    setSelectedTests(prev => 
      prev.includes(testName) ? prev.filter(t => t !== testName) : [...prev, testName]
    );
  };

  const handleSaveLabs = async () => {
    if (selectedTests.length === 0) return alert('Chọn ít nhất 1 loại xét nghiệm');
    setIsSubmitting(true);
    const res = await saveLabRequests(activeApt.patientId, selectedTests, labNotes);
    setIsSubmitting(false);
    if (res.success) {
      alert(res.message);
      setSelectedTests(['Xét nghiệm máu (CBC)']);
      setLabNotes('');
    } else alert(res.message);
  };

  if (isLoading || !dashboardData) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-10 h-10 text-[#2563EB] animate-spin" /></div>;
  }

  const { doctor, stats, appointments } = dashboardData;

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans text-gray-800">
      
      {/* ==========================================
          1. SIDEBAR (Menu trái)
      ========================================== */}
      <aside className="w-64 bg-[#172554] text-gray-300 flex flex-col h-screen sticky top-0">
        <div className="h-20 flex items-center justify-center border-b border-blue-900/50">
          <div className="flex items-center gap-2 text-white">
            <Activity className="text-orange-500" size={28}/>
            <span className="font-bold text-xl tracking-tight">HEALTHCARE AI</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-1 px-3">
          <Link href="/doctor/dashboard" className="flex items-center gap-3 px-4 py-3 bg-[#2563EB] text-white rounded-xl font-medium shadow-md">
            <LayoutDashboard size={20}/> Dashboard
          </Link>
          <Link href="/doctor/appointments" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-900/50 hover:text-white rounded-xl transition">
            <CalendarDays size={20}/> Lịch khám
          </Link>
          <Link href="/doctor/patients" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-900/50 hover:text-white rounded-xl transition">
            <Users size={20}/> Bệnh nhân
          </Link>
          <Link href="/doctor/records" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-900/50 hover:text-white rounded-xl transition">
            <FileText size={20}/> Hồ sơ bệnh án
          </Link>
          <Link href="/doctor/prescriptions" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-900/50 hover:text-white rounded-xl transition">
            <Pill size={20}/> Đơn thuốc
          </Link>
          <Link href="/doctor/lab-tests" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-900/50 hover:text-white rounded-xl transition">
            <TestTube size={20}/> Xét nghiệm
          </Link>        
          <Link href="/doctor/reports" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-900/50 hover:text-white rounded-xl transition">
            <BarChart3 size={20}/> Báo cáo
          </Link>
        </div>

        <div className="p-4 border-t border-blue-900/50 space-y-1">
          <Link href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-blue-900/50 hover:text-white rounded-lg transition text-sm">
            <Bell size={18}/> Thông báo <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">3</span>
          </Link>
          <Link href="/doctor/profile" className="flex items-center gap-3 px-4 py-2 hover:bg-blue-900/50 hover:text-white rounded-lg transition text-sm">
            <User size={18}/> Hồ sơ bác sĩ
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-blue-900/50 hover:text-white rounded-lg transition text-sm">
            <Settings size={18}/> Cài đặt
          </Link>

          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition text-sm mt-2">
            <LogOut size={18}/> Đăng xuất
          </button>
          <p className="text-[10px] text-blue-400/50 text-center pt-4">Phát triển bởi Phạm Đức Mạnh</p>
        </div>
      </aside>

      {/* ==========================================
          2. MAIN CONTENT
      ========================================== */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* TOP HEADER */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">👋 Xin chào, {doctor.fullName}</h1>
            <p className="text-sm text-gray-500">Chuyên khoa {doctor.doctorProfile?.specialty || 'Đa khoa'} • <span className="text-[#2563EB] font-medium">Hôm nay có {stats.todayCount} lịch khám</span></p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <input type="text" placeholder="Tìm kiếm bệnh nhân..." className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-[#2563EB] w-64"/>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16}/>
            </div>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-gray-900">{doctor.fullName}</p>
                <div className="flex text-yellow-400 text-xs justify-end">
                  <Star fill="currentColor" size={12}/><Star fill="currentColor" size={12}/><Star fill="currentColor" size={12}/><Star fill="currentColor" size={12}/><Star fill="currentColor" size={12}/>
                </div>
              </div>
              <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop" alt="Doctor" className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"/>
            </div>
          </div>
        </header>

        {/* SCROLLABLE DASHBOARD AREA */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          
          {/* 3. THỐNG KÊ (4 Cards) */}
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-[#2563EB] rounded-xl flex items-center justify-center"><CalendarDays size={24}/></div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Lịch khám hôm nay</p>
                <p className="text-2xl font-black text-gray-900">{stats.todayCount}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center"><Users size={24}/></div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Tổng bệnh nhân</p>
                <p className="text-2xl font-black text-gray-900">{stats.totalPatients}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center"><Pill size={24}/></div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Đơn thuốc đã kê</p>
                <p className="text-2xl font-black text-gray-900">{stats.prescriptionsCount}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center"><TestTube size={24}/></div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Xét nghiệm chờ KQ</p>
                <p className="text-2xl font-black text-gray-900">{stats.pendingLabsCount}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* 4. LỊCH KHÁM HÔM NAY (Cột trái - 2/3) */}
            <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-lg text-gray-900">Lịch khám hôm nay</h2>
                <div className="flex gap-2">
                  <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50 focus:outline-none">
                    <option>Hôm nay</option>
                    <option>Ngày mai</option>
                    <option>Tuần này</option>
                  </select>
                </div>
              </div>
              <div className="p-6 flex-1 h-[400px] overflow-y-auto custom-scrollbar">
                <div className="space-y-4">
                  {appointments.length > 0 ? appointments.map((apt: any) => {
                    const isCompleted = apt.status === 'HOÀN THÀNH';
                    const isActive = activeApt?.id === apt.id;
                    
                    return (
                      <div 
                        key={apt.id} 
                        onClick={() => !isCompleted && setActiveApt(apt)}
                        className={`flex items-center justify-between p-4 rounded-xl border transition cursor-pointer ${
                          isCompleted ? 'border-gray-100 bg-gray-50 opacity-60' : 
                          isActive ? 'border-[#2563EB] bg-blue-50 ring-1 ring-blue-200' : 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 bg-white rounded-xl shadow-sm flex flex-col items-center justify-center border ${isCompleted ? 'border-gray-200' : isActive ? 'border-[#2563EB] text-[#2563EB]' : 'border-yellow-200 text-yellow-600'}`}>
                            <span className="text-xs font-bold">{apt.bookingTime}</span>
                          </div>
                          <div>
                            <h4 className={`font-bold ${isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                              {apt.patient.fullName} <span className="text-xs font-normal text-gray-500 ml-2">24 tuổi • Nam</span>
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">Lý do: {apt.reason || 'Khám tổng quát'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {isCompleted ? (
                            <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><CheckCircle2 size={12}/> Đã hoàn thành</span>
                          ) : isActive ? (
                            <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Clock size={12}/> Đang khám</span>
                          ) : (
                            <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><AlertTriangle size={12}/> Đang chờ</span>
                          )}
                          {!isCompleted && (
                            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition">
                              Chi tiết
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  }) : (
                    <div className="text-center py-10 text-gray-500">Không có ca khám nào hôm nay.</div>
                  )}
                </div>
              </div>
            </div>

            {/* 5. AI HỖ TRỢ BÁC SĨ (Cột phải - 1/3) - GIỮ NGUYÊN */}
            <div className="xl:col-span-1 bg-gradient-to-b from-indigo-50 to-white rounded-2xl shadow-sm border border-indigo-100 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10"><Bot size={120}/></div>
              <div className="p-6 border-b border-indigo-100 relative z-10 flex items-center gap-2">
                <Bot className="text-indigo-600" size={24}/>
                <h2 className="font-bold text-lg text-indigo-900">AI Assistant</h2>
                <span className="ml-auto bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider animate-pulse">Beta</span>
              </div>
              <div className="p-6 flex-1 relative z-10 space-y-5">
                <div>
                  <label className="text-xs font-bold text-indigo-900 uppercase tracking-wider">Phân tích triệu chứng</label>
                  <div className="mt-2 bg-white rounded-xl p-3 border border-indigo-100 text-sm flex items-center gap-2 shadow-sm">
                    <Mic className="text-indigo-400" size={16}/> "{activeApt?.reason || 'Bệnh nhân sốt cao 39 độ, đau rát họng...'}"
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1"><Activity size={14}/> Gợi ý Chẩn đoán</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-indigo-200 cursor-pointer hover:bg-indigo-200">Viêm họng cấp (85%)</span>
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-indigo-200 cursor-pointer hover:bg-indigo-200">Viêm Amidan (70%)</span>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 cursor-pointer hover:bg-gray-200">Test Covid-19</span>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                  <p className="text-xs font-bold text-orange-800 uppercase tracking-wider mb-2 flex items-center gap-1"><AlertTriangle size={14}/> Khuyến nghị & Cảnh báo</p>
                  <p className="text-sm text-orange-900 mb-2">Đề xuất chỉ định xét nghiệm Công thức máu (CBC).</p>
                  <p className="text-xs text-red-600 font-medium">⚠ Cảnh báo: Bệnh nhân có tiền sử dị ứng với Penicillin.</p>
                </div>

                <p className="text-[10px] text-gray-400 text-center italic mt-auto">
                  *AI chỉ hỗ trợ gợi ý và tóm tắt, không thay thế quyết định chẩn đoán lâm sàng của Bác sĩ.
                </p>
              </div>
            </div>
          </div>

          {/* 6. KHU VỰC KHÁM BỆNH & HỒ SƠ */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {activeApt ? (
              <>
                {/* Context Bệnh nhân đang khám */}
                <div className="bg-blue-50/50 p-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#2563EB] text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md uppercase">
                      {activeApt.patient.fullName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{activeApt.patient.fullName} <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded ml-2">Đang khám</span></h3>
                      <p className="text-sm text-gray-500">Mã: {activeApt.patient.patientCode} • 24 tuổi • BHYT Hợp lệ • Tiền sử: Dị ứng Penicillin</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition">
                    <Printer size={16}/> Xuất hồ sơ PDF
                  </button>
                </div>

                {/* Tabs Điều hướng */}
                <div className="flex border-b border-gray-200 px-6">
                  <button onClick={() => setActiveTab('exam')} className={`py-4 px-6 font-bold text-sm border-b-2 transition ${activeTab === 'exam' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Nhập kết quả khám</button>
                  <button onClick={() => setActiveTab('prescription')} className={`py-4 px-6 font-bold text-sm border-b-2 transition ${activeTab === 'prescription' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Kê đơn thuốc</button>
                  <button onClick={() => setActiveTab('lab')} className={`py-4 px-6 font-bold text-sm border-b-2 transition ${activeTab === 'lab' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Yêu cầu xét nghiệm</button>
                  <button className="py-4 px-6 font-bold text-sm border-b-2 border-transparent text-gray-500 hover:text-gray-700 transition ml-auto flex items-center gap-1">Lịch sử khám <ChevronRight size={16}/></button>
                </div>

                {/* Nội dung Tabs */}
                <div className="p-6 bg-gray-50/30">
                  
                  {/* TAB 1: NHẬP KẾT QUẢ KHÁM */}
                  {activeTab === 'exam' && (
                    <div className="space-y-6 max-w-4xl">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Triệu chứng lâm sàng</label>
                        <textarea value={examForm.symptoms} onChange={e => setExamForm({...examForm, symptoms: e.target.value})} rows={3} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:outline-none bg-white" placeholder="Mô tả triệu chứng..."></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Chẩn đoán <span className="text-red-500">*</span></label>
                        <input value={examForm.diagnosis} onChange={e => setExamForm({...examForm, diagnosis: e.target.value})} type="text" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:outline-none bg-white" placeholder="VD: Viêm họng cấp (J00)"/>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Lời dặn của bác sĩ</label>
                        <textarea value={examForm.notes} onChange={e => setExamForm({...examForm, notes: e.target.value})} rows={2} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:outline-none bg-white" placeholder="Kiêng ăn uống đồ lạnh..."></textarea>
                      </div>
                      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-xl font-bold hover:bg-gray-50 transition">Lưu nháp</button>
                        <button disabled={isSubmitting} onClick={handleSaveExam} className="bg-[#2563EB] text-white px-8 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50">
                          {isSubmitting ? <Loader2 size={18} className="animate-spin"/> : <Save size={18}/>} Lưu bệnh án
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: KÊ ĐƠN THUỐC */}
                  {activeTab === 'prescription' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-12 gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm items-end">
                        <div className="col-span-4">
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tên thuốc</label>
                          <select value={currentMed.name} onChange={e => setCurrentMed({...currentMed, name: e.target.value})} className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none">
                            <option>Paracetamol 500mg</option>
                            <option>Amoxicillin 500mg</option>
                            <option>Vitamin C sủi</option>
                          </select>
                        </div>
                        <div className="col-span-3">
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Liều dùng</label>
                          <input value={currentMed.dosage} onChange={e => setCurrentMed({...currentMed, dosage: e.target.value})} type="text" className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none" placeholder="Sáng 1 - Tối 1"/>
                        </div>
                        <div className="col-span-2">
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Thời gian</label>
                          <input value={currentMed.time} onChange={e => setCurrentMed({...currentMed, time: e.target.value})} type="text" className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none" placeholder="5 ngày"/>
                        </div>
                        <div className="col-span-2">
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Số lượng</label>
                          <input value={currentMed.qty} onChange={e => setCurrentMed({...currentMed, qty: e.target.value})} type="number" className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none" placeholder="10"/>
                        </div>
                        <div className="col-span-1">
                          <button onClick={handleAddMed} className="w-full bg-green-500 text-white p-2.5 rounded-lg hover:bg-green-600 transition flex justify-center"><Plus size={20}/></button>
                        </div>
                      </div>

                      <table className="w-full text-left text-sm bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                        <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                          <tr>
                            <th className="p-3">Tên thuốc</th>
                            <th className="p-3">Liều dùng</th>
                            <th className="p-3">Thời gian</th>
                            <th className="p-3">Số lượng</th>
                            <th className="p-3 text-right">Thao tác</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {medList.length > 0 ? medList.map(med => (
                            <tr key={med.id} className="border-b border-gray-100">
                              <td className="p-3 font-medium">{med.name}</td>
                              <td className="p-3">{med.dosage}</td>
                              <td className="p-3">{med.time}</td>
                              <td className="p-3 font-bold">{med.qty} viên</td>
                              <td className="p-3 text-right"><button onClick={() => setMedList(medList.filter(m => m.id !== med.id))} className="text-red-500 hover:underline">Xóa</button></td>
                            </tr>
                          )) : (
                            <tr><td colSpan={5} className="p-6 text-center text-gray-400">Chưa có thuốc nào được kê.</td></tr>
                          )}
                        </tbody>
                      </table>

                      <div className="flex justify-end pt-4">
                        <button disabled={isSubmitting || medList.length === 0} onClick={handleSavePrescription} className="bg-[#2563EB] text-white px-8 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50">
                          {isSubmitting ? <Loader2 size={18} className="animate-spin"/> : <Printer size={18}/>} Lưu & In đơn thuốc
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: XÉT NGHIỆM */}
                  {activeTab === 'lab' && (
                    <div className="space-y-6 max-w-4xl">
                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Stethoscope className="text-[#2563EB]"/> Chọn loại xét nghiệm / Chẩn đoán hình ảnh</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {['Xét nghiệm máu (CBC)', 'Sinh hóa máu', 'X-Quang Phổi', 'Siêu âm ổ bụng'].map(test => (
                            <label key={test} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 transition">
                              <input type="checkbox" checked={selectedTests.includes(test)} onChange={() => handleToggleTest(test)} className="w-4 h-4 text-[#2563EB]" />
                              <span className="text-sm font-medium">{test}</span>
                            </label>
                          ))}
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-bold text-gray-700 mb-2">Yêu cầu cụ thể</label>
                          <textarea value={labNotes} onChange={e => setLabNotes(e.target.value)} rows={2} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none" placeholder="Ghi chú thêm cho phòng xét nghiệm..."></textarea>
                        </div>
                      </div>
                      <div className="flex justify-end pt-2">
                        <button disabled={isSubmitting} onClick={handleSaveLabs} className="bg-yellow-500 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-yellow-600 transition flex items-center gap-2 disabled:opacity-50">
                          {isSubmitting ? <Loader2 size={18} className="animate-spin"/> : <FileSpreadsheet size={18}/>} Gửi Yêu cầu Cận lâm sàng
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                <p>Vui lòng chọn một bệnh nhân từ Lịch khám để bắt đầu.</p>
              </div>
            )}
          </div>
          
        </div>
      </main>
    </div>
  );
}