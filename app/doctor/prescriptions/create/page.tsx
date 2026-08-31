'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard, CalendarDays, FileText, Pill, TestTube, BarChart3,
  Bell, Settings, LogOut, Search, Activity, User, Edit,
  Clock, CheckCircle2, Printer, Info, Plus, Users, Trash2, Calendar, Star, FileDown, Loader2, Filter, XCircle, ShieldAlert,
  ChevronLeft,
  Save,
  Send,
  ChevronUp, ChevronDown
} from 'lucide-react';

import DoctorSidebar from "@/app/doctor/Sidebar";

import { getDoctorPrescriptionsData, createFullPrescription } from '@/app/doctor/prescriptions/actions';

export default function CreatePrescriptionPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Form State
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [symptoms, setSymptoms] = useState(''); // Triệu chứng
  const [treatment, setTreatment] = useState(''); // Hướng điều trị
  const [examNotes, setExamNotes] = useState(''); // Ghi chú khám
  const [patientInstructions, setPatientInstructions] = useState(''); // Hướng dẫn cho bệnh nhân
  const [type, setType] = useState('Ngoại trú');
  const [followUpDate, setFollowUpDate] = useState('');
  
  const [searchPatientCode, setSearchPatientCode] = useState('');
  const [searchError, setSearchError] = useState('');
  
  const [items, setItems] = useState<any[]>([]);
  const [drugForm, setDrugForm] = useState({ name: '', dosage: '', quantity: '', form: 'Viên', usage: '' });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showExamModal, setShowExamModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getDoctorPrescriptionsData();
      if (res.success && res.data) {
        setData(res.data);
      } else {
        router.push('/login');
      }
      setIsLoading(false);
    };
    fetchData();
  }, [router]);

  const activePatient = data?.patients?.find((p: any) => p.id.toString() === selectedPatientId);
  const recentPrescriptions = data?.prescriptions?.filter((p: any) => p.patientId.toString() === selectedPatientId).slice(0, 3) || [];

  // Tự động điền thông tin khám từ Hồ sơ bệnh án mới nhất
  useEffect(() => {
    if (activePatient?.examinationsAsPatient && activePatient.examinationsAsPatient.length > 0) {
      const exam = activePatient.examinationsAsPatient[0];
      setSymptoms(exam.symptoms || '');
      setDiagnosis(exam.diagnosis || '');
      setTreatment(exam.treatment || '');
      setExamNotes(exam.notes || '');
    } else {
      setSymptoms('');
      setDiagnosis('');
      setTreatment('');
      setExamNotes('');
    }
  }, [activePatient]);

  const handleSearchPatient = () => {
     setSearchError('');
     if (!searchPatientCode.trim()) {
         setSearchError('Vui lòng nhập mã bệnh nhân');
         return;
     }
     
     const found = data?.patients?.find((p: any) => {
        const exactCode = p.patientProfile?.patientCode || `BN${p.id}`;
        return exactCode === searchPatientCode.trim();
     });

     if (found) {
        setSelectedPatientId(found.id.toString());
     } else {
        setSelectedPatientId('');
        setSearchError('Không tìm thấy bệnh nhân với mã này');
     }
  };

  const handleAddDrug = () => {
    if (!drugForm.name || !drugForm.quantity) return alert('Vui lòng nhập Tên thuốc và Số lượng!');
    setItems([...items, { ...drugForm, id: Date.now() }]);
    setDrugForm({ name: '', dosage: '', quantity: '', form: 'Viên', usage: '' });
  };

  const handleRemoveDrug = (id: number) => {
    setItems(items.filter(i => i.id !== id));
  };

  const handleSubmit = async () => {
    if (!selectedPatientId || !diagnosis) return alert("Vui lòng chọn Bệnh nhân và nhập Chẩn đoán!");
    if (items.length === 0) return alert("Vui lòng kê ít nhất 1 loại thuốc!");

    setIsSubmitting(true);
    const res = await createFullPrescription({
      patientId: parseInt(selectedPatientId),
      symptoms,
      diagnosis,
      treatment,
      type,
      notes: patientInstructions,
      followUpDate,
      items: items.map(i => ({
        name: i.name,
        dosage: i.dosage,
        quantity: i.quantity,
        instructions: i.usage
      }))
    });
    setIsSubmitting(false);

    if (res.success) {
      alert("Tạo đơn thuốc thành công!");
      router.push('/doctor/prescriptions');
    } else {
      alert(res.message);
    }
  };

  if (isLoading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="w-10 h-10 text-[#2563EB] animate-spin" />
      </div>
    );
  }

  const todayStr = new Date().toISOString().split('T')[0];
  const currentTime = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  let formattedDate = `${todayStr.split('-').reverse().join('/')} - ${currentTime}`;

  if (activePatient?.examinationsAsPatient && activePatient.examinationsAsPatient.length > 0) {
     const exam = activePatient.examinationsAsPatient[0];
     const createdAt = new Date(exam.createdAt);
     formattedDate = `${createdAt.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })} - ${createdAt.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`;
  }

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] font-sans text-gray-800 overflow-hidden">
      {/* SIDEBAR BÁC SĨ */}
      <DoctorSidebar activePage="prescriptions-create" />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* HEADER */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-10">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
               <Link href="/doctor/dashboard" className="hover:text-[#2563EB]">Trang chủ</Link>
               <span>›</span>
               <Link href="/doctor/prescriptions" className="hover:text-[#2563EB]">Khám bệnh</Link>
               <span>›</span>
               <span className="text-gray-900 font-medium">Đơn thuốc</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">Đơn thuốc</h1>
            <p className="text-sm text-gray-500">Tạo và quản lý đơn thuốc cho bệnh nhân</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-50 shadow-sm transition-all flex items-center gap-2 text-sm">
                <Save size={18} /> Lưu nháp
            </button>
            <button className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-50 shadow-sm transition-all flex items-center gap-2 text-sm">
                <Printer size={18} /> In đơn thuốc
            </button>
            <button onClick={handleSubmit} disabled={isSubmitting} className="bg-[#2563EB] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md transition-all flex items-center gap-2 text-sm">
                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />} Hoàn tất & Gửi
            </button>
          </div>
        </header>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#F8FAFC] custom-scrollbar">
           
           <div className="flex gap-8">
              {/* CỘT TRÁI - THÔNG TIN BỆNH NHÂN */}
              <div className="w-[350px] shrink-0 flex flex-col gap-6">
                 
                 {/* Card Chọn & Thông tin Bệnh nhân */}
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex justify-between items-center">
                       Thông tin bệnh nhân
                       <Edit size={16} className="text-[#2563EB] cursor-pointer" />
                    </h2>
                    
                    <div className="mb-4">
                       <div className="flex gap-2">
                           <input 
                              type="text" 
                              value={searchPatientCode} 
                              onChange={e => setSearchPatientCode(e.target.value)} 
                              onKeyDown={e => e.key === 'Enter' && handleSearchPatient()}
                              placeholder="Nhập mã bệnh nhân (VD: BN260001)..." 
                              className="flex-1 p-3 border border-gray-200 rounded-xl text-sm bg-gray-50 outline-none focus:ring-2 focus:ring-[#2563EB] font-medium text-gray-700"
                           />
                           <button 
                              onClick={handleSearchPatient}
                              className="bg-[#2563EB] text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center"
                           >
                              <Search size={20} />
                           </button>
                       </div>
                       {searchError && <p className="text-red-500 text-xs mt-2 font-medium">{searchError}</p>}
                    </div>

                    {activePatient ? (
                        <div className="flex flex-col gap-4">
                           <div className="flex gap-4 items-center">
                               <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(activePatient.fullName)}&background=random`} alt="Avatar" className="w-16 h-16 rounded-full border border-gray-200 shadow-sm" />
                               <div>
                                   <h3 className="font-bold text-gray-900 text-lg flex items-center gap-1">
                                       {activePatient.fullName}
                                       {activePatient.gender === 'Nam' ? <span className="text-blue-500 text-lg">♂</span> : <span className="text-pink-500 text-lg">♀</span>}
                                   </h3>
                                   <p className="text-sm text-gray-500">Mã bệnh nhân: <span className="font-medium text-gray-900">{activePatient.patientProfile?.patientCode || `BN${activePatient.id}`}</span></p>
                               </div>
                           </div>
                           <div className="grid grid-cols-[80px_1fr] gap-y-3 text-sm mt-2">
                               <div className="text-gray-500">Ngày sinh:</div>
                               <div className="font-medium text-gray-900">{activePatient.dob || 'Chưa cập nhật'}</div>
                               <div className="text-gray-500">CCCD:</div>
                               <div className="font-medium text-gray-900">{activePatient.patientProfile?.cccd || 'Chưa cập nhật'}</div>
                               <div className="text-gray-500">SĐT:</div>
                               <div className="font-medium text-gray-900">{activePatient.phone || 'Chưa cập nhật'}</div>
                               <div className="text-gray-500">Địa chỉ:</div>
                               <div className="font-medium text-gray-900">{activePatient.address || 'Chưa cập nhật'}</div>
                               <div className="text-gray-500">Dị ứng:</div>
                               <div className="font-medium text-red-600">{activePatient.healthMetric?.allergies || 'Không ghi nhận'}</div>
                           </div>
                           <button onClick={() => setShowExamModal(true)} className="text-[#2563EB] font-bold text-sm mt-2 hover:underline w-full text-center py-2 bg-blue-50 rounded-xl">Xem hồ sơ bệnh án</button>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-xl">
                            Vui lòng chọn bệnh nhân
                        </div>
                    )}
                 </div>

                 {/* Card Đơn thuốc gần đây */}
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Đơn thuốc gần đây</h2>
                    {activePatient ? (
                        <div className="space-y-3">
                            {recentPrescriptions.length > 0 ? recentPrescriptions.map((p: any) => (
                                <div key={p.id} className="flex justify-between items-center p-3 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-10 h-10 bg-blue-50 text-[#2563EB] rounded-lg flex items-center justify-center"><FileText size={18} /></div>
                                        <div>
                                            <p className="font-bold text-sm text-gray-900">{p.code}</p>
                                            <p className="text-xs text-gray-500">{p.date}</p>
                                        </div>
                                    </div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded ${p.status === 'Đã phát' ? 'text-green-700 bg-green-100' : p.status === 'Chờ phát' ? 'text-yellow-700 bg-yellow-100' : 'text-gray-700 bg-gray-100'}`}>{p.status}</span>
                                </div>
                            )) : (
                                <div className="text-center py-4 text-gray-400 text-sm italic">Bệnh nhân chưa có đơn thuốc nào</div>
                            )}
                            {recentPrescriptions.length > 0 && <button className="text-[#2563EB] font-bold text-sm mt-2 hover:underline w-full text-center py-2">Xem tất cả</button>}
                        </div>
                    ) : (
                         <div className="text-center py-4 text-gray-400 text-sm">Chưa có thông tin</div>
                    )}
                 </div>

              </div>

              {/* CỘT PHẢI - CHI TIẾT ĐƠN THUỐC */}
              <div className="flex-1 flex flex-col gap-6">
                  
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                      <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Chi tiết đơn thuốc</h2>
                      
                      <div className="grid grid-cols-3 gap-6 mb-8">
                          <div>
                              <label className="block text-sm font-bold text-gray-500 mb-2">Ngày kê đơn <span className="text-red-500">*</span></label>
                              <div className="relative">
                                  <input type="date" defaultValue={todayStr} className="w-full p-3 border border-gray-200 rounded-xl text-sm bg-gray-50 outline-none focus:ring-2 focus:ring-[#2563EB] font-medium" />
                              </div>
                          </div>
                          <div>
                              <label className="block text-sm font-bold text-gray-500 mb-2">Loại đơn thuốc</label>
                              <select value={type} onChange={e => setType(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl text-sm bg-gray-50 outline-none focus:ring-2 focus:ring-[#2563EB] font-medium">
                                  <option value="Ngoại trú">Ngoại trú</option>
                                  <option value="Nội trú">Nội trú</option>
                              </select>
                          </div>
                          <div>
                              <label className="block text-sm font-bold text-gray-500 mb-2">Chọn nhà thuốc (nếu có)</label>
                              <select className="w-full p-3 border border-gray-200 rounded-xl text-sm bg-gray-50 outline-none focus:ring-2 focus:ring-[#2563EB] font-medium text-gray-500">
                                  <option value="">Chọn nhà thuốc</option>
                                  <option value="Nhà thuốc Trung tâm">Nhà thuốc Trung tâm</option>
                              </select>
                          </div>
                      </div>

                      <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-bold text-gray-900">Danh sách thuốc</h3>
                          <div className="flex gap-3">
                              <div className="relative w-[250px]">
                                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                  <input type="text" placeholder="Tìm kiếm thuốc..." className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#2563EB]" />
                              </div>
                          </div>
                      </div>

                      {/* Bảng nhập thuốc mới (Nhanh) */}
                      <div className="flex gap-3 mb-4 p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
                          <div className="flex-1">
                              <label className="block text-xs font-bold text-gray-500 mb-1">Tên thuốc *</label>
                              <input value={drugForm.name} onChange={e => setDrugForm({...drugForm, name: e.target.value})} type="text" placeholder="VD: Amoxicillin" className="w-full p-2.5 border border-gray-200 rounded-lg text-sm" />
                          </div>
                          <div className="w-[120px]">
                              <label className="block text-xs font-bold text-gray-500 mb-1">Hàm lượng</label>
                              <input value={drugForm.dosage} onChange={e => setDrugForm({...drugForm, dosage: e.target.value})} type="text" placeholder="500mg" className="w-full p-2.5 border border-gray-200 rounded-lg text-sm" />
                          </div>
                          <div className="w-[100px]">
                              <label className="block text-xs font-bold text-gray-500 mb-1">Dạng</label>
                              <select value={drugForm.form} onChange={e => setDrugForm({...drugForm, form: e.target.value})} className="w-full p-2.5 border border-gray-200 rounded-lg text-sm bg-white">
                                  <option>Viên</option>
                                  <option>Gói</option>
                                  <option>Lọ</option>
                              </select>
                          </div>
                          <div className="w-[80px]">
                              <label className="block text-xs font-bold text-gray-500 mb-1">SL *</label>
                              <input value={drugForm.quantity} onChange={e => setDrugForm({...drugForm, quantity: e.target.value})} type="number" placeholder="20" className="w-full p-2.5 border border-gray-200 rounded-lg text-sm" />
                          </div>
                          <div className="flex-[1.5]">
                              <label className="block text-xs font-bold text-gray-500 mb-1">Cách dùng</label>
                              <input value={drugForm.usage} onChange={e => setDrugForm({...drugForm, usage: e.target.value})} type="text" placeholder="Uống 1 viên x 3 lần/ngày..." className="w-full p-2.5 border border-gray-200 rounded-lg text-sm" />
                          </div>
                          <div className="flex items-end">
                              <button onClick={handleAddDrug} className="bg-white border border-gray-200 text-[#2563EB] px-4 py-2.5 rounded-lg font-bold hover:bg-blue-50 transition-all flex items-center gap-1 text-sm shadow-sm h-[42px]">
                                  <Plus size={16}/> Thêm
                              </button>
                          </div>
                      </div>

                      {/* Bảng danh sách thuốc đã kê */}
                      <div className="border border-gray-200 rounded-xl overflow-hidden mb-8">
                          <table className="w-full text-left text-sm">
                              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold">
                                  <tr>
                                      <th className="p-4 text-center w-[60px]">STT</th>
                                      <th className="p-4">Tên thuốc</th>
                                      <th className="p-4 w-[120px]">Hàm lượng</th>
                                      <th className="p-4 w-[120px]">Dạng bào chế</th>
                                      <th className="p-4 text-center w-[80px]">Số lượng</th>
                                      <th className="p-4 w-[80px]">Đơn vị</th>
                                      <th className="p-4">Cách dùng</th>
                                      <th className="p-4 text-center w-[100px]">Thao tác</th>
                                  </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100">
                                  {items.length > 0 ? items.map((item, index) => (
                                      <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                                          <td className="p-4 text-center text-gray-400 font-bold">{index + 1}</td>
                                          <td className="p-4 font-bold text-gray-900">{item.name}</td>
                                          <td className="p-4 text-gray-700">{item.dosage || '-'}</td>
                                          <td className="p-4 text-gray-700">{item.form}</td>
                                          <td className="p-4 text-center font-bold text-[#2563EB]">{item.quantity}</td>
                                          <td className="p-4 text-gray-700">Viên</td>
                                          <td className="p-4 text-gray-600 whitespace-pre-wrap leading-relaxed">{item.usage}</td>
                                          <td className="p-4">
                                              <div className="flex justify-center gap-2">
                                                  <button className="text-[#2563EB] p-1.5 hover:bg-blue-100 rounded-lg transition-colors"><Edit size={16}/></button>
                                                  <button onClick={() => handleRemoveDrug(item.id)} className="text-red-500 p-1.5 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16}/></button>
                                              </div>
                                          </td>
                                      </tr>
                                  )) : (
                                      <tr><td colSpan={8} className="p-10 text-center text-gray-400 italic">Chưa có thuốc nào được kê.</td></tr>
                                  )}
                              </tbody>
                          </table>
                      </div>

                      {/* Hướng dẫn & Tái khám */}
                      <div className="grid grid-cols-2 gap-8">
                          <div>
                              <h3 className="text-sm font-bold text-gray-900 mb-3">Hướng dẫn cho bệnh nhân</h3>
                              <div className="relative">
                                  <textarea 
                                    rows={5} 
                                    value={patientInstructions}
                                    onChange={e => setPatientInstructions(e.target.value)}
                                    placeholder="- Uống thuốc đúng theo hướng dẫn.&#10;- Uống nhiều nước ấm..." 
                                    className="w-full p-4 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#2563EB] resize-none leading-relaxed"
                                  ></textarea>
                                  <span className="absolute bottom-3 right-3 text-xs text-gray-400">{patientInstructions.length}/500</span>
                              </div>
                          </div>
                          <div>
                              <h3 className="text-sm font-bold text-gray-900 mb-3">Lịch tái khám</h3>
                              <div className="grid grid-cols-2 gap-4">
                                  <div>
                                      <label className="block text-xs font-bold text-gray-500 mb-1">Ngày tái khám</label>
                                      <input type="date" value={followUpDate} onChange={e => setFollowUpDate(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#2563EB]" />
                                  </div>
                                  <div>
                                      <label className="block text-xs font-bold text-gray-500 mb-1">Ghi chú</label>
                                      <input type="text" placeholder="Tái khám kiểm tra..." className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#2563EB]" />
                                  </div>
                              </div>
                              <div className="mt-4 flex items-center gap-2">
                                  <input type="checkbox" id="remind" className="w-4 h-4 rounded text-[#2563EB] focus:ring-[#2563EB] cursor-pointer" defaultChecked />
                                  <label htmlFor="remind" className="text-sm text-gray-700 cursor-pointer font-medium">Nhắc lịch tái khám cho bệnh nhân</label>
                              </div>
                          </div>
                      </div>

                  </div>
                  
                  <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm flex items-start gap-3 border border-blue-100 mb-8">
                      <Info size={20} className="shrink-0 mt-0.5 text-[#2563EB]"/>
                      <p><strong className="text-[#2563EB]">Lưu ý:</strong> Kiểm tra kỹ thông tin thuốc và liều dùng trước khi gửi đơn thuốc cho bệnh nhân.</p>
                  </div>

              </div>
            </div>
         </div>
      </main>

      {/* Modal Thông tin khám (Hồ sơ bệnh án) */}
      {showExamModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-[750px] rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                 <FileText className="text-[#2563EB]" size={22} />
                 Thông tin khám
              </h2>
              <button onClick={() => setShowExamModal(false)} className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-1.5 rounded-lg transition-colors">
                 <XCircle size={22} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar flex flex-col gap-5 text-sm">
               <div className="flex items-center gap-2 bg-blue-50/50 p-3.5 rounded-xl border border-blue-100">
                   <Clock size={18} className="text-[#2563EB]" />
                   <span className="text-gray-600 font-medium">Ngày khám:</span>
                   <span className="font-bold text-[#2563EB] text-base">{formattedDate}</span>
               </div>
               
               <div>
                   <label className="block text-gray-600 mb-1.5 font-bold">Triệu chứng:</label>
                   <textarea value={symptoms} onChange={e => setSymptoms(e.target.value)} rows={3} placeholder="Đau đầu, mệt mỏi..." className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2563EB]/50 focus:border-[#2563EB] resize-none bg-gray-50 focus:bg-white transition-all"></textarea>
               </div>
               
               <div>
                   <label className="block text-gray-600 mb-1.5 font-bold">Chẩn đoán:</label>
                   <textarea value={diagnosis} onChange={e => setDiagnosis(e.target.value)} rows={3} placeholder="Viêm họng cấp..." className="w-full p-3 border border-blue-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2563EB]/50 focus:border-[#2563EB] font-bold text-[#2563EB] resize-none bg-blue-50/20 focus:bg-white transition-all"></textarea>
               </div>

               <div>
                   <label className="block text-gray-600 mb-1.5 font-bold">Điều trị:</label>
                   <textarea value={treatment} onChange={e => setTreatment(e.target.value)} rows={3} placeholder="Nghỉ ngơi..." className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2563EB]/50 focus:border-[#2563EB] resize-none bg-gray-50 focus:bg-white transition-all"></textarea>
               </div>
               
               <div>
                   <label className="block text-gray-600 mb-1.5 font-bold">Ghi chú:</label>
                   <textarea value={examNotes} onChange={e => setExamNotes(e.target.value)} rows={3} placeholder="Không có ghi chú..." className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2563EB]/50 focus:border-[#2563EB] resize-none bg-gray-50 focus:bg-white transition-all"></textarea>
               </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
               <button onClick={() => setShowExamModal(false)} className="px-6 py-2.5 rounded-xl font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-all">Đóng</button>
               <button onClick={() => setShowExamModal(false)} className="px-6 py-2.5 rounded-xl font-bold text-white bg-[#2563EB] hover:bg-blue-700 shadow-sm transition-all flex items-center gap-2"><CheckCircle2 size={18}/> Xác nhận & Lưu</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
