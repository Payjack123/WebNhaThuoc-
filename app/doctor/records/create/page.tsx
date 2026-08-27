'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getInitialCreateData, createDoctorMedicalRecord } from '@/app/doctor/records/create/actions';
import {
  ArrowLeft, Search, Bell, ChevronRight, X, Save, ArrowRight
} from 'lucide-react';
import DoctorSidebar from '@/app/doctor/Sidebar';

function DoctorMedicalRecordCreateContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const patientId = parseInt(searchParams.get('patientId') || '0');
  const appointmentId = searchParams.get('appointmentId') ? parseInt(searchParams.get('appointmentId')!) : undefined;

  const [activeStep, setActiveStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initData, setInitData] = useState<any>(null);

  // Form State
  const [reason, setReason] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [bloodPressure, setBloodPressure] = useState('120/80');
  const [heartRate, setHeartRate] = useState('72');
  const [respiratoryRate, setRespiratoryRate] = useState('18');
  const [temperature, setTemperature] = useState('36.7');
  const [spO2, setSpO2] = useState('98');
  const [weight, setWeight] = useState('68');
  const [height, setHeight] = useState('170');
  const [clinicalExam, setClinicalExam] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [secondaryDiagnosis, setSecondaryDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [notes, setNotes] = useState('');
  const [followUpDate, setFollowUpDate] = useState('2026-09-01');
  const [followUpTime, setFollowUpTime] = useState('08:00');
  const [followUpReason, setFollowUpReason] = useState('Đánh giá hiệu quả điều trị');

  useEffect(() => {
    const fetchInit = async () => {
      if (!patientId) {
        setIsLoading(false);
        return;
      }
      const res = await getInitialCreateData(patientId);
      if (res.success && res.data) {
        setInitData(res.data);
        if (res.data.appointment?.reason && res.data.appointment.reason !== 'Khám tổng quát') setReason(res.data.appointment.reason);
        
        if (res.data.latestExamination) {
          if (res.data.latestExamination.symptoms) setSymptoms(res.data.latestExamination.symptoms);
          if (res.data.latestExamination.medicalHistory) setMedicalHistory(res.data.latestExamination.medicalHistory);
          if (res.data.latestExamination.clinicalExam) setClinicalExam(res.data.latestExamination.clinicalExam);
          if (res.data.latestExamination.diagnosis) setDiagnosis(res.data.latestExamination.diagnosis);
          if (res.data.latestExamination.secondaryDiagnosis) setSecondaryDiagnosis(res.data.latestExamination.secondaryDiagnosis);
          if (res.data.latestExamination.treatment) setTreatment(res.data.latestExamination.treatment);
          if (res.data.latestExamination.notes) setNotes(res.data.latestExamination.notes);
        } else if (res.data.patient?.medicalHistory && res.data.patient.medicalHistory !== 'Không có') {
          setMedicalHistory(res.data.patient.medicalHistory);
        }
      }
      setIsLoading(false);
    };
    fetchInit();
  }, [patientId]);

  const handleSave = async () => {
    setIsSubmitting(true);
    const data = {
      patientId,
      appointmentId: appointmentId || initData?.appointment?.id,
      reason,
      symptoms,
      medicalHistory,
      clinicalExam,
      diagnosis,
      secondaryDiagnosis,
      treatment,
      notes,
      followUpDate,
      followUpTime,
      followUpReason,
      vitals: { bloodPressure, heartRate, respiratoryRate, temperature, spO2, weight, height }
    };
    const res = await createDoctorMedicalRecord(data);
    setIsSubmitting(false);
    if (res.success) {
      router.push('/doctor/records/detail?id=' + res.data?.examinationId);
    } else {
      alert(res.message || 'Lỗi');
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>;
  if (!patientId || !initData) return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <DoctorSidebar activePage="records" />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="flex flex-col items-center justify-center h-[80vh] gap-4 text-gray-500">
          <p>Vui lòng chọn bệnh nhân trước khi tạo bệnh án.</p>
          <Link href="/doctor/patients" className="text-blue-500 font-bold hover:underline">Quay lại danh sách</Link>
        </div>
      </main>
    </div>
  );


  const steps = [
    { id: 1, name: 'Thông tin bệnh nhân' },
    { id: 2, name: 'Thông tin khám' },
    { id: 3, name: 'Khám & chẩn đoán' },
    { id: 4, name: 'Điều trị' },
    { id: 5, name: 'Xác nhận & lưu' }
  ];

  return (
    <div className="min-h-screen flex bg-white font-sans text-gray-800">
      <DoctorSidebar activePage="records" />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* TOP HEADER */}
        <header className="bg-white border-b border-gray-100 shrink-0 z-10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/doctor/records/detail')} className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-500">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-none mb-1.5">Tạo bệnh án mới</h1>
              <div className="text-[13px] text-gray-500 flex items-center gap-1.5">
                <Link href="/doctor/dashboard" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
                <ChevronRight size={12} className="text-gray-400" />
                <Link href="/doctor/records" className="hover:text-blue-600 transition-colors">Bệnh án</Link>
                <ChevronRight size={12} className="text-gray-400" />
                <span className="text-gray-700">Tạo bệnh án mới</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button className="relative p-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="flex items-center gap-3 cursor-pointer pl-4 border-l border-gray-100">
              <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(initData.doctor.name)}&background=E0E7FF&color=2563EB`} alt="Doctor" className="w-10 h-10 rounded-full" />
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-gray-900 leading-tight mb-0.5">BS. {initData.doctor.name}</p>
                <p className="text-xs text-gray-500">{initData.doctor.specialty}</p>
              </div>
            </div>
          </div>
        </header>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto px-6 py-6 pb-28 custom-scrollbar bg-[#FAFAFA]">
          <div className="w-full max-w-none mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* CỘT 1 */}
            <div className="flex flex-col gap-6 h-full">

              {/* Thông tin bệnh nhân */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="text-[11px] font-bold text-gray-600 mb-4 uppercase tracking-wider">Thông tin bệnh nhân</h3>

                <div className="flex items-center gap-4 mb-6">
                  <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(initData.patient.name)}&background=E0E7FF&color=2563EB&bold=true`} alt="Avatar" className="w-16 h-16 rounded-full object-cover shadow-sm" />
                  <div>
                    <p className="text-[11px] text-gray-500 mb-0.5">Mã bệnh nhân</p>
                    <p className="font-bold text-gray-900 text-sm mb-1.5">{initData.patient.code}</p>
                    <p className="text-[11px] text-gray-500 mb-0.5">Họ và tên</p>
                    <p className="font-black text-gray-900 text-sm">{initData.patient.name} <span className="text-blue-500 text-sm ml-0.5">♂</span></p>
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-gray-100 grid grid-cols-1 gap-y-2.5 text-[13px] mb-6">
                  <div className="flex items-center">
                    <span className="text-gray-500 w-[90px]">Ngày sinh:</span>
                    <span className="font-medium text-gray-900">{initData.patient.dob?.includes('-') ? initData.patient.dob.split('-').reverse().join('/') : initData.patient.dob}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 w-[90px]">Số điện thoại:</span>
                    <span className="font-medium text-gray-900">{initData.patient.phone}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-500 w-[90px]">Địa chỉ:</span>
                    <span className="font-medium text-gray-900 flex-1">{initData.patient.address}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 w-[90px]">Nhóm máu:</span>
                    <span className="font-medium text-gray-900">{initData.patient.bloodType}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 w-[90px]">Dị ứng:</span>
                    <span className="font-medium text-gray-900">{initData.patient.allergies}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 w-[90px]">Bảo hiểm Y Tế:</span>
                    <span className="font-medium text-gray-900">{initData.patient.insurance}</span>
                  </div>
                </div>

                <button className="w-full py-2.5 bg-white border border-blue-200 text-[#2563EB] font-bold rounded-lg text-[13px] hover:bg-blue-50 transition-colors">
                  Xem hồ sơ sức khỏe
                </button>
              </div>

              {/* Khám lâm sàng */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 relative flex flex-col flex-1">
                <h3 className="text-[11px] font-bold text-[#2563EB] mb-3 uppercase tracking-wider">Khám lâm sàng</h3>
                <textarea value={clinicalExam} onChange={e => setClinicalExam(e.target.value)} className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] focus:border-[#2563EB] outline-none resize-none leading-relaxed text-gray-800 flex-1"></textarea>
                <span className="absolute bottom-7 right-7 text-[10px] text-gray-400">{clinicalExam.length}/2000</span>
              </div>

            </div>

            {/* CỘT 2 */}
            <div className="flex flex-col gap-6 h-full">

              {/* Thông tin lần khám */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="text-[11px] font-bold text-[#2563EB] mb-4 uppercase tracking-wider">Thông tin lần khám</h3>

                <div className="grid grid-cols-3 gap-4 mb-5">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1.5">Ngày khám <span className="text-red-500">*</span></label>
                    <input type="date" defaultValue="2026-08-20" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-[13px] focus:border-[#2563EB] outline-none" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1.5">Giờ khám <span className="text-red-500">*</span></label>
                    <input type="time" defaultValue="08:30" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-[13px] focus:border-[#2563EB] outline-none" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1.5">Phòng khám <span className="text-red-500">*</span></label>
                    <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-[13px] focus:border-[#2563EB] outline-none appearance-none">
                      <option>Phòng khám 2</option>
                      <option>Phòng khám 1</option>
                    </select>
                  </div>
                </div>

                <div className="mb-5 relative">
                  <label className="block text-[11px] font-bold text-gray-600 mb-1.5">Lý do khám <span className="text-red-500">*</span></label>
                  <textarea rows={2} className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] focus:border-[#2563EB] outline-none resize-none leading-relaxed text-gray-800" value={reason} onChange={e => setReason(e.target.value)}></textarea>
                  <span className="absolute bottom-2 right-2 text-[10px] text-gray-400">36/255</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-[11px] font-bold text-gray-600 mb-1.5">Bệnh sử</label>
                    <textarea rows={3} className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] focus:border-[#2563EB] outline-none resize-none leading-relaxed text-gray-800" value={symptoms} onChange={e => setSymptoms(e.target.value)}></textarea>
                    <span className="absolute bottom-2 right-2 text-[10px] text-gray-400">{symptoms.length}/1000</span>
                  </div>
                  <div className="relative">
                    <label className="block text-[11px] font-bold text-gray-600 mb-1.5">Tiền sử bệnh</label>
                    <textarea rows={3} className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] focus:border-[#2563EB] outline-none resize-none leading-relaxed text-gray-800" value={medicalHistory} onChange={e => setMedicalHistory(e.target.value)}></textarea>
                    <span className="absolute bottom-2 right-2 text-[10px] text-gray-400">{medicalHistory.length}/1000</span>
                  </div>
                </div>
              </div>

              {/* Dấu hiệu sinh tồn */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="text-[11px] font-bold text-[#2563EB] mb-4 uppercase tracking-wider">Dấu hiệu sinh tồn</h3>
                <div className="grid grid-cols-4 gap-3 text-center">
                  <div>
                    <label className="block text-[10px] text-gray-500 mb-1.5">Huyết áp (mmHg) <span className="text-red-500">*</span></label>
                    <input type="text" value={bloodPressure} onChange={e => setBloodPressure(e.target.value)} placeholder="VD: 120/80" className="w-full py-2 text-center bg-white border border-gray-200 rounded-lg text-[13px] font-medium focus:border-[#2563EB] outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 mb-1.5">Nhịp tim (lần/phút) <span className="text-red-500">*</span></label>
                    <input type="text" value={heartRate} onChange={e => setHeartRate(e.target.value)} className="w-full py-2 text-center bg-white border border-gray-200 rounded-lg text-[13px] font-medium focus:border-[#2563EB] outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 mb-1.5">Nhịp thở (lần/phút)</label>
                    <input type="text" value={respiratoryRate} onChange={e => setRespiratoryRate(e.target.value)} className="w-full py-2 text-center bg-white border border-gray-200 rounded-lg text-[13px] font-medium focus:border-[#2563EB] outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 mb-1.5">Nhiệt độ (°C)</label>
                    <input type="text" value={temperature} onChange={e => setTemperature(e.target.value)} className="w-full py-2 text-center bg-white border border-gray-200 rounded-lg text-[13px] font-medium focus:border-[#2563EB] outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 mb-1.5">SpO2 (%)</label>
                    <input type="text" value={spO2} onChange={e => setSpO2(e.target.value)} className="w-full py-2 text-center bg-white border border-gray-200 rounded-lg text-[13px] font-medium focus:border-[#2563EB] outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 mb-1.5">Cân nặng (kg)</label>
                    <input type="text" value={weight} onChange={e => setWeight(e.target.value)} className="w-full py-2 text-center bg-white border border-gray-200 rounded-lg text-[13px] font-medium focus:border-[#2563EB] outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 mb-1.5">Chiều cao (cm)</label>
                    <input type="text" value={height} onChange={e => setHeight(e.target.value)} className="w-full py-2 text-center bg-white border border-gray-200 rounded-lg text-[13px] font-medium focus:border-[#2563EB] outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 mb-1.5">BMI</label>
                    <input type="text" value={(parseFloat(weight) && parseFloat(height)) ? (parseFloat(weight) / ((parseFloat(height) / 100) * (parseFloat(height) / 100))).toFixed(1) : ""} readOnly className="w-full py-2 text-center bg-gray-50 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-500 outline-none" />
                  </div>
                </div>
              </div>

              {/* Ghi chú của bác sĩ */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 relative flex flex-col flex-1">
                <h3 className="text-[11px] font-bold text-gray-700 mb-3 uppercase tracking-wider">Ghi chú của bác sĩ <span className="text-gray-400 font-normal lowercase tracking-normal">(không bắt buộc)</span></h3>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Nhập ghi chú thêm nếu cần..." className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] focus:border-[#2563EB] outline-none resize-none leading-relaxed text-gray-800 flex-1"></textarea>
                <span className="absolute bottom-7 right-7 text-[10px] text-gray-400">{notes.length}/1000</span>
              </div>

            </div>

            {/* CỘT 3 */}
            <div className="flex flex-col gap-6 h-full">

              {/* Chẩn đoán */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="text-[11px] font-bold text-[#2563EB] mb-4 uppercase tracking-wider">Chẩn đoán</h3>

                <div className="space-y-5">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1.5">Chẩn đoán chính <span className="text-red-500">*</span></label>
                    <div className="relative flex items-center">
                      <Search className="absolute left-3 text-gray-400" size={14} />
                      <input type="text" value={diagnosis} onChange={e => setDiagnosis(e.target.value)} placeholder="Nhập chẩn đoán" className="w-full pl-8 pr-16 py-2 bg-white border border-gray-200 rounded-lg text-[13px] font-medium focus:border-[#2563EB] outline-none" />
                      <div className="absolute right-2 px-1.5 py-0.5 border border-gray-200 rounded text-[10px] font-bold text-gray-600 flex items-center gap-0.5">
                        I10 <ChevronRight size={10} className="text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1.5">Chẩn đoán phụ</label>
                    <div className="relative flex items-center">
                      <Search className="absolute left-3 text-gray-400" size={14} />
                      <input type="text" value={secondaryDiagnosis} onChange={e => setSecondaryDiagnosis(e.target.value)} placeholder="Nhập chẩn đoán phụ (không bắt buộc)" className="w-full pl-8 pr-16 py-2 bg-white border border-gray-200 rounded-lg text-[13px] font-medium focus:border-[#2563EB] outline-none" />
                      <div className="absolute right-2 px-1.5 py-0.5 border border-gray-200 rounded text-[10px] font-bold text-gray-600 flex items-center gap-0.5">
                        F41.1 <ChevronRight size={10} className="text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="relative pt-2">
                    <label className="block text-[11px] font-bold text-gray-600 mb-1.5">Kết luận</label>
                    <textarea rows={4} className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] focus:border-[#2563EB] outline-none resize-none leading-relaxed text-gray-800" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Nhập kết luận"></textarea>
                    <span className="absolute bottom-2 right-2 text-[10px] text-gray-400">{notes.length}/1000</span>
                  </div>
                </div>
              </div>

              {/* Kế hoạch điều trị */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 relative flex flex-col flex-1">
                <h3 className="text-[11px] font-bold text-[#2563EB] mb-4 uppercase tracking-wider">Kế hoạch điều trị</h3>
                <label className="block text-[11px] font-bold text-gray-600 mb-1.5">Hướng điều trị</label>
                <textarea className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] focus:border-[#2563EB] outline-none resize-none leading-relaxed text-gray-800 flex-1" value={treatment} onChange={e => setTreatment(e.target.value)} placeholder="Hướng điều trị"></textarea>
                <span className="absolute bottom-7 right-7 text-[10px] text-gray-400">{treatment.length}/1000</span>
              </div>

              {/* Hẹn tái khám */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="text-[11px] font-bold text-[#2563EB] mb-4 uppercase tracking-wider">Hẹn tái khám</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1.5">Ngày tái khám</label>
                    <input type="date" value={followUpDate} onChange={e => setFollowUpDate(e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-[13px] focus:border-[#2563EB] outline-none" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1.5">Giờ</label>
                    <input type="time" value={followUpTime} onChange={e => setFollowUpTime(e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-[13px] focus:border-[#2563EB] outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1.5">Lý do tái khám</label>
                  <input type="text" value={followUpReason} onChange={e => setFollowUpReason(e.target.value)} placeholder="Lý do tái khám" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-[13px] focus:border-[#2563EB] outline-none text-gray-800" />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="bg-white border-t border-gray-100 px-8 py-4 shrink-0 flex items-center justify-between z-20">
          <button onClick={() => router.push('/doctor/records/detail')} className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-bold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <X size={16} /> Hủy
          </button>
          <div className="flex items-center justify-center absolute left-1/2 -translate-x-1/2">
            <button className="flex items-center gap-1.5 px-6 py-2 bg-white border border-gray-200 rounded-lg text-[13px] font-bold text-[#2563EB] hover:bg-blue-50 transition-colors">
              <Save size={16} /> Lưu nháp
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="flex items-center gap-1.5 px-5 py-2 bg-white border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors">
              <ArrowLeft size={16} /> Quay lại
            </button>
            <button onClick={handleSave} disabled={isSubmitting} className="flex items-center gap-1.5 px-6 py-2 bg-[#2563EB] text-white rounded-lg text-[13px] font-bold hover:bg-blue-700 transition-colors disabled:opacity-70">
              {isSubmitting ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Save size={16} />}
              {isSubmitting ? 'Đang lưu...' : 'Lưu bệnh án'}
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}

export default function DoctorMedicalRecordCreate() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>}>
      <DoctorMedicalRecordCreateContent />
    </Suspense>
  );
}
