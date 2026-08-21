'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getDoctorMedicalRecordById } from '@/app/doctor/records/detail/actions';
import { 
  ArrowLeft, Search, Bell, Activity, Stethoscope, Clock, Plus, 
  Printer, Save, ChevronRight, FileText, Pill, TestTube, Image as ImageIcon, History, ClipboardList
} from 'lucide-react';
import DoctorSidebar from '@/app/doctor/Sidebar';

function MedicalRecordDetailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = parseInt(searchParams.get('id') || '0');
  const [activeTab, setActiveTab] = useState('Thông tin khám');
  const [record, setRecord] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const res = await getDoctorMedicalRecordById(id);
          if (res.success && res.data) {
            setRecord(res.data);
          } else {
            setErrorMsg(res.message || 'Lỗi lấy dữ liệu');
          }
        } catch (err: any) {
          setErrorMsg(err.message || 'Lỗi ngoại lệ');
        }
      }
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>;
  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center h-[80vh] bg-transparent font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md">
        <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M8 13h2"/><path d="M8 17h2"/><path d="M14 13h2"/><path d="M14 17h2"/></svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Chưa chọn hồ sơ bệnh án</h2>
        {errorMsg && <p className="text-red-500 mb-4 font-bold text-sm bg-red-50 p-2 rounded border border-red-100">{errorMsg}</p>}
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">Vui lòng chọn một bệnh nhân từ danh sách để xem chi tiết hoặc tạo mới hồ sơ bệnh án.</p>
        <Link href="/doctor/patients" className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-sm hover:bg-blue-700 transition-all">
          Về danh sách bệnh nhân
        </Link>
      </div>
    </div>
  );


  const tabs = [
    { name: 'Thông tin khám', icon: Activity },
    { name: 'Chẩn đoán', icon: Stethoscope },
    { name: 'Đơn thuốc', icon: Pill },
    { name: 'Xét nghiệm', icon: TestTube },
    { name: 'Tiến trình điều trị', icon: ClipboardList },
    { name: 'Lịch sử khám', icon: History },
    { name: 'Ghi chú', icon: FileText }
  ];

  return (
    <div className="min-h-screen flex bg-[#FAFAFA] font-sans text-gray-800">
      <DoctorSidebar activePage="records" />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* TOP HEADER */}
        <header className="bg-white border-b border-gray-100 shrink-0 z-10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/doctor/records')} className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-500">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-none mb-1.5">Hồ sơ bệnh án</h1>
              <div className="text-[13px] text-gray-500 flex items-center gap-1.5">
                <Link href="/doctor/patients" className="hover:text-blue-600 transition-colors">Danh sách bệnh nhân</Link> 
                <ChevronRight size={12} className="text-gray-400" /> 
                <span className="text-gray-700">Hồ sơ bệnh án</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-5">
            <div className="relative hidden md:block">
              <input type="text" placeholder="Tìm bệnh nhân (Ctrl + K)" className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-[13px] w-64 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
            <div className="flex items-center gap-4 border-l border-gray-100 pl-5">
              <button className="relative p-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
              <div className="flex items-center gap-3 cursor-pointer">
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(record?.doctor || 'Nguyễn Văn Bình')}&background=E0E7FF&color=2563EB`} alt="Doctor" className="w-10 h-10 rounded-full" />
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-bold text-gray-900 leading-tight mb-0.5">{record?.doctor || 'BS. Nguyễn Văn Bình'}</p>
                  <p className="text-xs text-gray-500">Bác sĩ nội tổng quát</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto px-6 py-6 pb-28 custom-scrollbar">
          {(!id || !record) ? renderEmptyState() : (
            <div className="max-w-[1400px] mx-auto space-y-6">
            
            {/* PATIENT INFO CARD */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-start justify-between">
              <div className="flex items-start gap-6">
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent('{record.patientName}')}&background=E0E7FF&color=2563EB&bold=true`} alt="Avatar" className="w-[84px] h-[84px] rounded-full object-cover" />
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-[22px] font-black text-gray-900 tracking-tight">{record.patientName}</h2>
                    <span className="px-2 py-0.5 bg-blue-50 text-[#2563EB] border border-blue-100 rounded text-xs font-bold flex items-center gap-1">
                      ♂ {record.patientCode}
                    </span>
                  </div>
                  <p className="text-[13px] text-gray-600 mb-2.5 font-medium">
                    {record.age} tuổi ({record.patientDob}) • Nam • Nhóm máu: <span className="font-bold text-gray-900">{record.bloodType}</span>
                  </p>
                  <div className="text-[13px] text-gray-500 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                    <span className="flex items-center gap-1.5">{record.patientPhone}</span>
                    <span className="text-gray-300">•</span>
                    <span className="flex items-center gap-1.5">CCCD: {record.patientCode}</span>
                    <span className="flex items-center gap-1.5 w-full mt-0.5">{record.patientAddress}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-12 border-l border-gray-100 pl-10">
                <div className="space-y-5">
                  <div>
                    <p className="text-[11px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Bác sĩ phụ trách</p>
                    <p className="text-[13px] font-bold text-gray-900 flex items-center gap-1.5"><Stethoscope size={14} className="text-gray-400"/> {record.doctor}</p>
                  </div>
                </div>
                <div className="space-y-5">
                  <div>
                    <p className="text-[11px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Chuyên khoa</p>
                    <p className="text-[13px] font-bold text-gray-900 flex items-center gap-1.5"><Activity size={14} className="text-gray-400"/> {record.doctorSpecialty}</p>
                  </div>
                </div>
                <div className="space-y-5">
                  <div>
                    <p className="text-[11px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Lần khám gần nhất</p>
                    <p className="text-[13px] font-bold text-gray-900 flex items-center gap-1.5"><Clock size={14} className="text-gray-400"/> {record.date} - {record.time}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  <button className="px-5 py-2 text-[13px] font-bold text-[#2563EB] bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors w-40">Xem hồ sơ sức khỏe</button>
                  <Link href={`/doctor/records/create?patientId=${record.patientId}`} className="px-5 py-2 text-[13px] font-bold text-white bg-[#2563EB] rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 w-40">
                    <Plus size={16}/> Tạo bệnh án mới
                  </Link>
                </div>
              </div>
            </div>

            {/* TABS */}
            <div className="bg-white rounded-xl border border-gray-200 px-2 pt-2 pb-0">
              <div className="flex overflow-x-auto custom-scrollbar gap-2 px-2">
                {tabs.map(tab => (
                  <button 
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`flex items-center gap-2 px-4 py-2.5 text-[13px] font-bold whitespace-nowrap transition-all border-b-2 ${activeTab === tab.name ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-t-lg'}`}
                  >
                    <tab.icon size={15} /> {tab.name}
                  </button>
                ))}
              </div>
            </div>

            {/* MAIN GRID */}
            {activeTab === 'Lịch sử khám' ? (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-h-[500px]">
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                  <h3 className="text-[15px] font-bold text-gray-900">Lịch sử khám bệnh ({record.pastVisits?.length || 0})</h3>
                </div>
                <div className="p-0">
                  {!record.pastVisits || record.pastVisits.length === 0 ? (
                    <div className="p-12 text-center text-gray-500 font-medium">
                      Bệnh nhân chưa có lịch sử khám nào trước đây.
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {record.pastVisits.map((visit: any) => (
                        <div key={visit.id} className="p-6 hover:bg-blue-50/50 transition-colors flex gap-6">
                          <div className="w-32 shrink-0">
                            <p className="text-[13px] font-bold text-[#2563EB] mb-1">{visit.date}</p>
                            <p className="text-[11px] font-bold text-gray-600 bg-gray-100 inline-block px-2 py-0.5 rounded">{visit.doctorName}</p>
                          </div>
                          <div className="flex-1 space-y-2">
                            <p className="text-[13px]"><span className="text-gray-500 font-medium w-24 inline-block">Lý do khám:</span> <span className="font-medium text-gray-900">{visit.symptoms}</span></p>
                            <p className="text-[13px]"><span className="text-gray-500 font-medium w-24 inline-block">Chẩn đoán:</span> <span className="font-bold text-gray-900">{visit.diagnosis}</span></p>
                            <p className="text-[13px]"><span className="text-gray-500 font-medium w-24 inline-block">Điều trị:</span> <span className="text-gray-900">{visit.treatment}</span></p>
                          </div>
                          <div className="shrink-0 flex items-center">
                            <Link href={`/doctor/records/detail?id=${visit.id}`} className="px-4 py-2 bg-white border border-blue-200 text-blue-600 text-[12px] font-bold rounded-lg hover:bg-blue-50 transition-colors">
                              Xem chi tiết
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* COL 1: Thông tin y tế cơ bản */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="text-[11px] font-bold text-[#2563EB] mb-4 uppercase tracking-wider">Thông tin lần khám</h3>
                  <div className="space-y-4 text-[13px]">
                    <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                      <div><p className="text-[11px] text-gray-500 mb-1">Mã bệnh án</p><p className="font-bold text-gray-900">{record.baCode}</p></div>
                      <div><p className="text-[11px] text-gray-500 mb-1">Ngày khám</p><p className="font-bold text-gray-900">{record.date} - {record.time}</p></div>
                      <div><p className="text-[11px] text-gray-500 mb-1">Phòng khám</p><p className="font-bold text-gray-900">{record.appointment?.room || "Phòng khám"}</p></div>
                      <div><p className="text-[11px] text-gray-500 mb-1">Hình thức khám</p><p className="font-bold text-gray-900">{record.appointment?.room ? "Khám trực tiếp" : "Khám từ xa"}</p></div>
                    </div>
                    <div className="pt-2">
                      <p className="text-[11px] text-gray-500 mb-1">Lý do khám</p>
                      <p className="font-medium text-gray-900 leading-relaxed">{record.reason}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <h3 className="text-[11px] font-bold text-[#2563EB] mb-3 uppercase tracking-wider">Bệnh sử</h3>
                    <p className="text-[13px] text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {record.symptoms}
                    </p>
                    <button className="text-[11px] text-[#2563EB] font-bold mt-2 hover:underline">Xem thêm v</button>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <h3 className="text-[11px] font-bold text-[#2563EB] mb-3 uppercase tracking-wider">Tiền sử</h3>
                    <div className="space-y-2.5 text-[12px]">
                      <div className="flex justify-between border-b border-gray-50 pb-1.5"><span className="text-gray-500">Bệnh nền</span><span className="font-medium text-gray-900 text-right">Không có</span></div>
                      <div className="flex justify-between border-b border-gray-50 pb-1.5"><span className="text-gray-500">Dị ứng</span><span className="font-medium text-gray-900 text-right">{record.allergies}</span></div>
                      <div className="flex justify-between border-b border-gray-50 pb-1.5"><span className="text-gray-500">Phẫu thuật</span><span className="font-medium text-gray-900 text-right">Chưa có phẫu thuật</span></div>
                      <div className="flex justify-between border-b border-gray-50 pb-1.5"><span className="text-gray-500">Tiền sử gia đình</span><span className="font-medium text-gray-900 text-right">{record.medicalHistory}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Thuốc đang dùng</span><span className="font-medium text-gray-900 text-right">Không có</span></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="text-[11px] font-bold text-[#2563EB] mb-4 uppercase tracking-wider">Dấu hiệu sinh tồn</h3>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="bg-red-50/50 border border-red-50 rounded-lg p-2 text-center flex flex-col items-center justify-center h-20">
                      <span className="text-[10px] text-gray-500 font-medium mb-0.5">Huyết áp</span>
                      <span className="text-lg font-black text-red-600 leading-none">{record.vitals.bloodPressure}</span>
                      <span className="text-[9px] text-red-400 mt-1 font-bold">mmHg</span>
                    </div>
                    <div className="bg-emerald-50/50 border border-emerald-50 rounded-lg p-2 text-center flex flex-col items-center justify-center h-20">
                      <span className="text-[10px] text-gray-500 font-medium mb-0.5">Nhịp tim</span>
                      <span className="text-lg font-black text-emerald-600 leading-none">{record.vitals.heartRate}</span>
                      <span className="text-[9px] text-emerald-400 mt-1 font-bold">lần/phút</span>
                    </div>
                    <div className="bg-blue-50/50 border border-blue-50 rounded-lg p-2 text-center flex flex-col items-center justify-center h-20">
                      <span className="text-[10px] text-gray-500 font-medium mb-0.5">Nhịp thở</span>
                      <span className="text-lg font-black text-blue-600 leading-none">{record.vitals.respiratoryRate}</span>
                      <span className="text-[9px] text-blue-400 mt-1 font-bold">lần/phút</span>
                    </div>
                    <div className="bg-orange-50/50 border border-orange-50 rounded-lg p-2 text-center flex flex-col items-center justify-center h-20">
                      <span className="text-[10px] text-gray-500 font-medium mb-0.5">Nhiệt độ</span>
                      <span className="text-lg font-black text-orange-500 leading-none">{record.vitals.temperature}</span>
                      <span className="text-[9px] text-orange-400 mt-1 font-bold">°C</span>
                    </div>
                    <div className="bg-purple-50/50 border border-purple-50 rounded-lg p-2 text-center flex flex-col items-center justify-center h-20 mt-2">
                      <span className="text-[10px] text-gray-500 font-medium mb-0.5">SpO₂</span>
                      <span className="text-lg font-black text-purple-600 leading-none">98</span>
                      <span className="text-[9px] text-purple-400 mt-1 font-bold">%</span>
                    </div>
                    <div className="bg-cyan-50/50 border border-cyan-50 rounded-lg p-2 text-center flex flex-col items-center justify-center h-20 mt-2">
                      <span className="text-[10px] text-gray-500 font-medium mb-0.5">Cân nặng</span>
                      <span className="text-lg font-black text-cyan-600 leading-none">{record.vitals.weight}</span>
                      <span className="text-[9px] text-cyan-400 mt-1 font-bold">kg</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="text-[11px] font-bold text-[#2563EB] mb-3 uppercase tracking-wider">Khám lâm sàng</h3>
                  <div className="text-[13px] text-gray-700 space-y-1.5 leading-relaxed">
                    {record.notes.split('\n').map((n: string, i: number) => <p key={i}>{n}</p>)}
                  </div>
                  <button className="text-[11px] text-[#2563EB] font-bold mt-2 hover:underline">Xem thêm v</button>
                </div>
              </div>

              {/* COL 2: Chẩn đoán & Hướng điều trị */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="text-[11px] font-bold text-[#2563EB] mb-5 uppercase tracking-wider border-b border-gray-100 pb-3">Chẩn đoán</h3>
                  <div className="space-y-5 text-[13px]">
                    <div>
                      <p className="text-[11px] text-gray-500 mb-1.5">Chẩn đoán chính</p>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-sm">{record.diagnosis}</span>
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded">ICD</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-500 mb-1.5">Chẩn đoán phụ</p>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-sm">Không có</span>
                        <span className="px-2 py-0.5 bg-gray-50 text-gray-600 text-[10px] font-bold rounded">N/A</span>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-[11px] text-gray-500 mb-1.5">Kết luận</p>
                      <p className="text-gray-700 leading-relaxed font-medium">{record.treatment}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="text-[11px] font-bold text-[#2563EB] mb-4 uppercase tracking-wider border-b border-gray-100 pb-3">Hướng điều trị</h3>
                  <div className="text-[13px] text-gray-700 space-y-1.5 leading-relaxed">
                    {record.treatment.split('\n').map((t: string, i: number) => <p key={i}>{t}</p>)}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="text-[11px] font-bold text-[#2563EB] mb-4 uppercase tracking-wider border-b border-gray-100 pb-3">Kế hoạch tái khám</h3>
                  <div className="space-y-4 text-[13px]">
                    <div>
                      <p className="text-[11px] text-gray-500 mb-1.5">Thời gian tái khám</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg font-bold text-gray-900">
                        <Clock size={14} className="text-gray-400" /> 01/09/2026 - 07:30
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-500 mb-1">Lý do tái khám</p>
                      <p className="font-bold text-gray-900">{record.reason}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-500 mb-1">Ghi chú</p>
                      <p className="text-gray-700 font-medium">{record.notes}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* COL 3: Đơn thuốc, Xét nghiệm, CĐHA, Ghi chú */}
              <div className="space-y-6">
                
                {/* Đơn thuốc */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider">Đơn thuốc (2)</h3>
                    <button className="text-[11px] font-bold text-[#2563EB] hover:underline">Xem tất cả</button>
                  </div>
                  <table className="w-full text-[12px] mb-4">
                    <thead className="text-[11px] text-gray-400 text-left border-b border-gray-100">
                      <tr><th className="pb-2 font-medium">Tên thuốc</th><th className="pb-2 font-medium">Liều dùng</th><th className="pb-2 font-medium text-right">Số lượng</th></tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr className="border-b border-gray-50">
                        <td className="py-2.5 font-bold text-gray-900">1. Amlodipine 5mg</td>
                        <td className="py-2.5 text-[11px]">1 viên x 1 lần/ngày</td>
                        <td className="py-2.5 text-right font-medium">30 viên</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold text-gray-900">2. Paracetamol 500mg</td>
                        <td className="py-2.5 text-[11px]">1 viên khi đau đầu</td>
                        <td className="py-2.5 text-right font-medium">10 viên</td>
                      </tr>
                    </tbody>
                  </table>
                  <button className="w-full py-2 bg-white border border-gray-200 text-[#2563EB] hover:bg-blue-50 rounded-lg font-bold text-[13px] flex items-center justify-center gap-1.5 transition-colors">
                    <Plus size={14} /> Kê đơn thuốc
                  </button>
                </div>

                {/* Xét nghiệm */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">Xét nghiệm (1) <span className="px-1.5 py-0.5 bg-green-50 text-green-600 text-[9px] rounded">Đã có kết quả</span></h3>
                    <button className="text-[11px] font-bold text-[#2563EB] hover:underline">Xem tất cả</button>
                  </div>
                  <table className="w-full text-[12px] mb-4">
                    <thead className="text-[11px] text-gray-400 text-left border-b border-gray-100">
                      <tr><th className="pb-2 font-medium">Tên xét nghiệm</th><th className="pb-2 font-medium">Ngày chỉ định</th><th className="pb-2 font-medium text-right">Trạng thái</th></tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr>
                        <td className="py-2.5 font-bold text-gray-900">Tổng phân tích máu</td>
                        <td className="py-2.5 text-[11px]">20/08/2026</td>
                        <td className="py-2.5 text-right"><span className="px-2 py-0.5 bg-green-50 text-green-600 border border-green-100 rounded text-[10px] font-bold">Đã có kết quả</span></td>
                      </tr>
                    </tbody>
                  </table>
                  <button className="w-full py-2 bg-white border border-gray-200 text-[#2563EB] hover:bg-blue-50 rounded-lg font-bold text-[13px] flex items-center justify-center gap-1.5 transition-colors">
                    <Plus size={14} /> Chỉ định xét nghiệm
                  </button>
                </div>


                {/* Lịch sử khám */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="text-[11px] font-bold text-gray-900 mb-4 uppercase tracking-wider">Lịch sử khám ({record.pastVisits?.length || 0})</h3>
                  {!record.pastVisits || record.pastVisits.length === 0 ? (
                    <div className="py-4 text-center text-gray-400 text-[12px] bg-gray-50 rounded-lg">
                      Chưa có lịch sử khám nào khác
                    </div>
                  ) : (
                    <div className="space-y-4 pr-1">
                      {record.pastVisits.slice(0, 3).map((visit: any) => (
                        <div key={visit.id} className="border border-gray-100 rounded-lg p-3 hover:border-blue-200 transition-colors bg-gray-50">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-[12px] font-bold text-[#2563EB]">{visit.date}</span>
                            <span className="text-[10px] bg-white border border-gray-200 px-1.5 py-0.5 rounded text-gray-600 font-bold">{visit.doctorName}</span>
                          </div>
                          <div className="text-[12px] text-gray-700 space-y-1">
                            <p><span className="text-gray-500 font-medium">Lý do:</span> {visit.symptoms}</p>
                            <p><span className="text-gray-500 font-medium">CĐ:</span> <span className="font-bold">{visit.diagnosis}</span></p>
                            <p><span className="text-gray-500 font-medium">ĐT:</span> {visit.treatment}</p>
                          </div>
                          <Link href={`/doctor/records/detail?id=${visit.id}`} className="mt-2 text-[11px] text-blue-500 font-bold hover:underline inline-block">Xem chi tiết &rarr;</Link>
                        </div>
                      ))}
                      {record.pastVisits.length > 3 && (
                        <button onClick={() => setActiveTab('Lịch sử khám')} className="w-full py-2 mt-2 text-center text-[12px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                          Xem tất cả ({record.pastVisits.length})
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Ghi chú */}
                <div className="bg-[#FFFDF5] border border-[#FDE68A] rounded-xl p-5 relative">
                  <h3 className="text-[11px] font-bold text-gray-900 mb-2 uppercase tracking-wider">Ghi chú của bác sĩ</h3>
                  <p className="text-[13px] text-gray-800 leading-relaxed font-medium whitespace-pre-wrap">
                    Bệnh nhân lo lắng nhiều về công việc.<br/>Tư vấn tâm lý, theo dõi thêm nếu triệu chứng kéo dài.
                  </p>
                  <div className="flex justify-between items-end mt-4">
                    <span className="text-[10px] text-gray-400">Cập nhật: 20/08/2026 - 08:10</span>
                    <div className="flex items-center gap-1.5">
                      <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent('Nguyễn Văn Bình')}&background=E0E7FF&color=2563EB`} alt="Doctor" className="w-5 h-5 rounded-full" />
                      <span className="text-[11px] font-bold text-gray-900">{record.doctor}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            )}
          </div>
          )}
        </div>

        {/* BOTTOM FIXED ACTION BAR */}
        {(!id || !record) ? null : (
        <div className="bg-white border-t border-gray-100 px-8 py-3.5 flex items-center justify-between shrink-0 z-20">
          <button className="flex items-center gap-1.5 text-red-500 border border-red-200 hover:bg-red-50 px-5 py-2 rounded-lg font-bold transition-colors text-[13px]">
            Kết thúc điều trị
          </button>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-5 py-2 bg-white border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors">
              <Printer size={16} /> In bệnh án
            </button>
            <button className="flex items-center gap-1.5 px-5 py-2 bg-white border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors">
              <Save size={16} /> Lưu nháp
            </button>
            <button className="flex items-center gap-1.5 px-6 py-2 bg-[#2563EB] text-white rounded-lg text-[13px] font-bold hover:bg-blue-700 transition-colors">
              <Save size={16} /> Lưu bệnh án
            </button>
          </div>
        </div>
        )}

      </main>
    </div>
  );
}

export default function DoctorMedicalRecordDetail() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>}>
      <MedicalRecordDetailContent />
    </Suspense>
  );
}
