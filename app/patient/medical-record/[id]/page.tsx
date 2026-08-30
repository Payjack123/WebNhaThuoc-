'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { 
  ChevronLeft, Loader2, FolderOpen, Calendar, User, 
  Stethoscope, FileText, Activity, AlertCircle, 
  Pill, Beaker, Image as ImageIcon, CheckCircle2, Clock
} from 'lucide-react';

import PatientSidebar from '@/app/patient/Sidebar';
import { getMedicalRecordById } from '@/app/patient/medical-record/actions';

export default function PatientMedicalRecordDetailPage() {
  const router = useRouter();
  const params = useParams();
  const recordId = Number(params?.id);
  
  const [record, setRecord] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!recordId) return;
      
      setIsLoading(true);
      const res: any = await getMedicalRecordById(recordId);
      if (res && res.success && res.data) {
        setRecord(res.data);
      } else {
        setError(res?.message || 'Không thể tải hồ sơ');
      }
      setIsLoading(false);
    };
    
    fetchData();
  }, [recordId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error || !record) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Lỗi tải dữ liệu</h2>
          <p className="text-gray-500 mb-6">{error || 'Không tìm thấy hồ sơ bệnh án'}</p>
          <button onClick={() => router.push('/patient/medical-record')} className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] font-sans text-gray-800">
      
      <PatientSidebar activePage="medical-record" />

      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F8FAFC]">
        {/* HEADER */}
        <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center shrink-0 sticky top-0 z-10 shadow-sm gap-4">
          <button 
            onClick={() => router.push('/patient/medical-record')}
            className="w-10 h-10 bg-gray-50 text-gray-500 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-black text-gray-900 flex items-center gap-2">
              Chi tiết hồ sơ bệnh án
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm text-gray-500 font-medium border-r border-gray-200 pr-3">Mã hồ sơ: <span className="font-bold text-gray-900">{record.code}</span></span>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold ${record.status === 'Hoàn thành' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                {record.status === 'Hoàn thành' ? <CheckCircle2 size={12}/> : <Clock size={12}/>} 
                {record.status}
              </span>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-4xl mx-auto space-y-8 pb-10">

            {/* THÔNG TIN KHÁM */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-blue-50/50 px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                  <FolderOpen size={20} className="text-blue-500" /> THÔNG TIN KHÁM
                </h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">Ngày khám</p>
                  <p className="font-bold text-gray-900 flex items-center gap-2"><Calendar size={16} className="text-gray-400"/> {record.date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">Bác sĩ</p>
                  <p className="font-bold text-gray-900 flex items-center gap-2"><User size={16} className="text-gray-400"/> {record.doctorName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">Chuyên khoa</p>
                  <p className="font-bold text-gray-900 flex items-center gap-2"><Stethoscope size={16} className="text-gray-400"/> {record.specialty}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">Lý do khám</p>
                  <p className="font-bold text-gray-900">{record.reason}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs text-gray-500 font-medium mb-1">Bệnh sử</p>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-sm text-gray-700">
                    {record.symptoms}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs text-gray-500 font-medium mb-1">Tiền sử bệnh</p>
                  <p className="text-sm font-medium text-gray-800">{record.medicalHistory}</p>
                </div>
              </div>
            </section>

            {/* CHẨN ĐOÁN */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-orange-50/50 px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-orange-900 flex items-center gap-2">
                  <Activity size={20} className="text-orange-500" /> CHẨN ĐOÁN
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">Chẩn đoán chính</p>
                  <p className="text-lg font-black text-gray-900">{record.primaryDiagnosis}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">Chẩn đoán phụ</p>
                  <p className="text-sm font-medium text-gray-800">{record.secondaryDiagnosis}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">Kết luận</p>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-sm text-gray-700">
                    {record.conclusion}
                  </div>
                </div>
              </div>
            </section>

            {/* ĐIỀU TRỊ */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-green-50/50 px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-green-900 flex items-center gap-2">
                  <FileText size={20} className="text-green-500" /> ĐIỀU TRỊ
                </h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <p className="text-xs text-gray-500 font-medium mb-2">Hướng điều trị</p>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-sm text-gray-700">
                    {record.treatment.split('\n').map((line: string, i: number) => (
                      <p key={i} className="mb-1 last:mb-0">• {line}</p>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* KẾ HOẠCH TÁI KHÁM */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-blue-50/50 px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                  <Calendar size={20} className="text-blue-500" /> KẾ HOẠCH TÁI KHÁM
                </h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1.5">Thời gian tái khám</p>
                  <p className="text-lg font-black text-blue-700">
                    {record.followUpDate ? `${record.followUpTime ? record.followUpTime + ' - ' : ''}${record.followUpDate.includes('-') ? record.followUpDate.split('-').reverse().join('/') : record.followUpDate}` : 'Không có hẹn tái khám'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1.5">Trạng thái hồ sơ</p>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-bold ${record.status === 'Hoàn thành' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-orange-50 text-orange-700 border border-orange-200'}`}>
                      {record.status === 'Hoàn thành' ? <CheckCircle2 size={16}/> : <Clock size={16}/>} 
                      {record.status}
                    </span>
                  </div>
                </div>
                {record.followUpReason && (
                  <div className="md:col-span-2">
                    <p className="text-xs text-gray-500 font-medium mb-1.5">Lý do tái khám / Lời dặn</p>
                    <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100 text-sm font-medium text-blue-900">
                      {record.followUpReason}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* DỮ LIỆU LIÊN QUAN */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-purple-50/50 px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-purple-900 flex items-center gap-2">
                  <FileText size={20} className="text-purple-500" /> DỮ LIỆU LIÊN QUAN
                </h2>
              </div>
              <div className="p-6 flex flex-wrap gap-4">
                {record.prescriptionId ? (
                  <button onClick={() => alert('Chức năng xem popup Đơn thuốc đang phát triển')} className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-green-100 hover:border-green-300 hover:bg-green-50 rounded-xl text-green-700 font-bold transition-all shadow-sm group">
                    <Pill size={20} className="text-green-500 group-hover:scale-110 transition-transform" /> Xem Đơn thuốc
                  </button>
                ) : (
                  <div className="flex items-center gap-2 px-5 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-gray-400 font-bold cursor-not-allowed">
                    <Pill size={20} /> Không có Đơn thuốc
                  </div>
                )}

                <button onClick={() => alert('Chức năng xem popup Xét nghiệm đang phát triển')} className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-blue-100 hover:border-blue-300 hover:bg-blue-50 rounded-xl text-blue-700 font-bold transition-all shadow-sm group">
                  <Beaker size={20} className="text-blue-500 group-hover:scale-110 transition-transform" /> Xem Xét nghiệm
                </button>
                
                <button onClick={() => alert('Chức năng xem popup Hình ảnh đang phát triển')} className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-purple-100 hover:border-purple-300 hover:bg-purple-50 rounded-xl text-purple-700 font-bold transition-all shadow-sm group">
                  <ImageIcon size={20} className="text-purple-500 group-hover:scale-110 transition-transform" /> Chẩn đoán Hình ảnh
                </button>
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
