'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, CalendarDays, Users, FileText, Pill, TestTube, 
  BarChart3, Bell, User, Settings, LogOut, Search, Star, 
  Activity, MapPin, Phone, Mail, Calendar, Award, Briefcase, 
  Clock, Edit, CheckCircle2, ThumbsUp, ShieldCheck, Loader2, X, Save, CalendarPlus
} from 'lucide-react';

import DoctorSidebar from "@/app/doctor/Sidebar";

import { getDoctorProfileData, updateDoctorProfileData } from '@/app/doctor/profile/actions';

export default function DoctorProfile() {
  const router = useRouter();
  
  // 1. Sắp xếp mặc định: Tab cá nhân hiện đầu tiên
  const [activeTab, setActiveTab] = useState('personal'); 
  
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Tách làm 2 State quản lý 2 Modal riêng biệt
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isEditScheduleOpen, setIsEditScheduleOpen] = useState(false);
  
  const [isSaving, setIsSaving] = useState(false);
  
  // Form lưu trữ toàn bộ dữ liệu tạm thời để edit
  const [editForm, setEditForm] = useState({
    fullName: '', phone: '', dob: '', gender: '', address: '',
    specialty: '', degree: '', university: '', experience: 0, languages: '',
    schedule: [] as any[]
  });

  const fetchProfile = async () => {
    const res = await getDoctorProfileData();
    if (res.success && res.data) {
      // 1. Ép kiểu schedule thành mảng thực tế nếu nó bị dính dạng chuỗi
      let parsedSchedule = [];
      if (res.data.schedule) {
        if (typeof res.data.schedule === 'string') {
          try {
            parsedSchedule = JSON.parse(res.data.schedule);
          } catch (e) {
            parsedSchedule = [];
          }
        } else if (Array.isArray(res.data.schedule)) {
          parsedSchedule = res.data.schedule;
        }
      }

      // 2. Gán dữ liệu đã xử lý vào state
      const processedData = { ...res.data, schedule: parsedSchedule };
      setProfile(processedData);
      
      setEditForm({
        fullName: res.data.fullName, 
        phone: res.data.phone && res.data.phone !== 'Chưa cập nhật' ? res.data.phone : '',
        dob: res.data.dob && res.data.dob !== 'Chưa cập nhật' ? res.data.dob : '',
        gender: res.data.gender || 'Nam',
        address: res.data.address && res.data.address !== 'Chưa cập nhật' ? res.data.address : '',
        specialty: res.data.specialty && res.data.specialty !== 'Chưa cập nhật' ? res.data.specialty : '',
        degree: res.data.degree && res.data.degree !== 'Chưa cập nhật' ? res.data.degree : '',
        university: res.data.university && res.data.university !== 'Chưa cập nhật' ? res.data.university : '',
        experience: res.data.experience || 0,
        languages: res.data.languages && res.data.languages !== 'Chưa cập nhật' ? res.data.languages : '',
        schedule: parsedSchedule // Dùng mảng đã parse
      });
    } else {
      router.push('/login');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, [router]);

  const handleSaveProfile = async () => {
    if (!editForm.fullName) return alert('Họ và tên không được để trống!');
    
    setIsSaving(true);
    const res = await updateDoctorProfileData(editForm);
    setIsSaving(false);
    
    if (res.success) {
      alert(res.message);
      setIsEditProfileOpen(false);
      setIsEditScheduleOpen(false);
      setIsLoading(true);
      fetchProfile(); 
    } else {
      alert(res.message);
    }
  };

  const handleScheduleChange = (index: number, field: string, value: string) => {
    const newSchedule = [...editForm.schedule];
    newSchedule[index] = { ...newSchedule[index], [field]: value };
    setEditForm({ ...editForm, schedule: newSchedule });
  };

  if (isLoading || !profile) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-10 h-10 text-[#2563EB] animate-spin" /></div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans text-gray-800">
      
      {/* ==========================================
          SIDEBAR
      ========================================== */}
      <DoctorSidebar activePage="profile" />

      {/* ==========================================
          MAIN CONTENT
      ========================================== */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        
        {/* TOP HEADER */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 sticky top-0 z-20">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hồ sơ chuyên môn</h1>
            <p className="text-sm text-gray-500">Quản lý thông tin cá nhân và lịch làm việc</p>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-400 hover:bg-gray-100 rounded-full transition">
              <Bell size={20}/>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">{profile.fullName}</p>
                <p className="text-xs text-gray-500">Bác sĩ</p>
              </div>
              <img src={profile.avatar} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-gray-200 object-cover"/>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto w-full space-y-6 animate-in fade-in duration-500">
          
          {/* BANNER & OVERVIEW CARD */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
            <div className="h-32 bg-gradient-to-r from-[#2563EB] to-[#172554]"></div>
            
            <div className="px-8 pb-8">
              <div className="flex justify-between items-end -mt-12 mb-6">
                <div className="flex items-end gap-6">
                  <img src={profile.avatar} alt="Doctor" className="w-32 h-32 rounded-2xl border-4 border-white shadow-md object-cover bg-white"/>
                  <div className="pb-2">
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-black text-gray-900">{profile.fullName}</h2>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 size={14}/> {profile.status}
                      </span>
                    </div>
                    <p className="text-gray-500 font-medium mt-1 flex items-center gap-2">
                      <Briefcase size={16} className="text-[#2563EB]"/> {profile.specialty} • {profile.experience} năm kinh nghiệm
                    </p>
                  </div>
                </div>
                
                {/* NÚT MỞ MODAL SỬA HỒ SƠ */}
                <button 
                  onClick={() => setIsEditProfileOpen(true)}
                  className="bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-50 transition flex items-center gap-2 shadow-sm mb-2"
                >
                  <Edit size={16}/> Chỉnh sửa hồ sơ
                </button>

              </div>

              {/* Quick Stats Banner */}
              <div className="grid grid-cols-4 divide-x divide-gray-100 border-t border-gray-100 pt-6 mt-6">
                <div className="text-center px-4">
                  <p className="text-gray-500 text-sm mb-1">Đánh giá</p>
                  <p className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-1">
                    {profile.rating} <Star className="text-yellow-400 fill-current" size={20}/>
                  </p>
                </div>
                <div className="text-center px-4">
                  <p className="text-gray-500 text-sm mb-1">Bệnh nhân</p>
                  <p className="text-2xl font-bold text-gray-900">{profile.stats.totalPatients}+</p>
                </div>
                <div className="text-center px-4">
                  <p className="text-gray-500 text-sm mb-1">Lượt khám</p>
                  <p className="text-2xl font-bold text-gray-900">{profile.stats.totalAppointments}</p>
                </div>
                <div className="text-center px-4">
                  <p className="text-gray-500 text-sm mb-1">Đơn thuốc</p>
                  <p className="text-2xl font-bold text-gray-900">{profile.stats.prescriptions}</p>
                </div>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT WITH TABS */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[500px]">
            <div className="flex border-b border-gray-200 px-6 overflow-x-auto">
              {[
                { id: 'personal', label: '👤 Thông tin cá nhân' },
                { id: 'professional', label: '🩺 Chuyên môn' },
                { id: 'schedule', label: '📅 Lịch làm việc' },
                { id: 'performance', label: '📊 Hiệu suất & Đánh giá' }
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)} 
                  className={`py-4 px-6 font-bold text-sm border-b-2 transition whitespace-nowrap ${
                    activeTab === tab.id 
                      ? 'border-[#2563EB] text-[#2563EB]' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-8">
              
              {/* TAB 1: THÔNG TIN CÁ NHÂN */}
              {activeTab === 'personal' && (
                <div className="grid grid-cols-2 gap-8 max-w-4xl animate-in fade-in">
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Họ và tên</label>
                      <p className="font-medium text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-100">{profile.fullName}</p>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Số điện thoại</label>
                      <p className="font-medium text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-100 flex items-center gap-2"><Phone size={16} className="text-gray-400"/> {profile.phone}</p>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Ngày sinh</label>
                      <p className="font-medium text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-100 flex items-center gap-2"><Calendar size={16} className="text-gray-400"/> {profile.dob}</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Mã định danh</label>
                      <p className="font-medium text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-100">{profile.id}</p>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Email</label>
                      <p className="font-medium text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-100 flex items-center gap-2"><Mail size={16} className="text-gray-400"/> {profile.email}</p>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Địa chỉ hiện tại</label>
                      <p className="font-medium text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-100 flex items-center gap-2"><MapPin size={16} className="text-gray-400"/> {profile.address}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: CHUYÊN MÔN */}
              {activeTab === 'professional' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in fade-in">
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Hồ sơ Năng lực</h3>
                    <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Chuyên khoa chính</span>
                        <span className="font-bold text-gray-900">{profile.specialty}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Học vị</span>
                        <span className="font-bold text-gray-900">{profile.degree}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Nơi đào tạo</span>
                        <span className="font-bold text-gray-900">{profile.university}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Ngoại ngữ</span>
                        <span className="font-bold text-gray-900">{profile.languages}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Chứng chỉ & Bằng cấp</h3>
                    <div className="space-y-3">
                      {profile.certificates.map((cert: any) => (
                        <div key={cert.id} className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl hover:shadow-md transition bg-white">
                          <div className="w-10 h-10 bg-yellow-50 text-yellow-600 rounded-lg flex items-center justify-center shrink-0">
                            <Award size={20}/>
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{cert.name}</p>
                            <p className="text-sm text-gray-500 mt-1">Cấp năm: {cert.year}</p>
                          </div>
                          <ShieldCheck size={20} className="text-green-500 ml-auto mt-2 opacity-50"/>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: LỊCH LÀM VIỆC */}
              {activeTab === 'schedule' && (
                <div className="max-w-4xl animate-in fade-in">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Lịch làm việc trong tuần</h3>
                    
                    {/* NÚT MỞ MODAL SỬA LỊCH */}
                    <button onClick={() => setIsEditScheduleOpen(true)} className="flex items-center gap-1.5 text-sm bg-blue-50 text-[#2563EB] px-4 py-2 rounded-lg font-bold hover:bg-blue-100 transition">
                      <CalendarPlus size={16}/> Cập nhật lịch
                    </button>
                    
                  </div>
                  <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                        <tr>
                          <th className="p-4 font-bold">Thứ / Ngày</th>
                          <th className="p-4 font-bold">Khung giờ làm việc</th>
                          <th className="p-4 font-bold">Phòng khám</th>
                          <th className="p-4 font-bold text-center">Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                      {profile.schedule.map((slot: any, index: number) => (
                      <tr key={index} className="hover:bg-gray-50 transition">
                            <td className="p-4 font-bold text-gray-900">{slot.day}</td>
                            <td className="p-4 flex items-center gap-2"><Clock size={16} className="text-gray-400"/> {slot.time}</td>
                            <td className="p-4 font-medium">{slot.room}</td>
                            <td className="p-4 text-center">
                              {slot.status === 'Có lịch' ? (
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">Có lịch</span>
                              ) : (
                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold border border-red-200">Nghỉ phép</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: HIỆU SUẤT & ĐÁNH GIÁ */}
              {activeTab === 'performance' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in fade-in">
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Thống kê tháng này</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm font-bold text-gray-700 mb-1">
                          <span>Số lượng khám thực tế</span>
                          <span className="text-[#2563EB]">88%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-3">
                          <div className="bg-[#2563EB] h-3 rounded-full" style={{ width: '88%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm font-bold text-gray-700 mb-1">
                          <span>Tỷ lệ hoàn thành lịch hẹn</span>
                          <span className="text-green-500">{profile.stats.completionRate}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-3">
                          <div className="bg-green-500 h-3 rounded-full" style={{ width: `${profile.stats.completionRate}%` }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 mt-6">
                      <p className="text-sm text-orange-800 font-medium flex gap-2">
                        <ThumbsUp size={20} className="shrink-0"/> Bác sĩ thuộc top 5% có tỷ lệ hài lòng cao nhất toàn viện trong quý này. Tiếp tục phát huy!
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Phản hồi từ bệnh nhân</h3>
                    <div className="space-y-4">
                      {profile.reviews.map((review: any) => (
                        <div key={review.id} className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-bold text-gray-900">{review.name}</p>
                              <p className="text-xs text-gray-400">{review.date}</p>
                            </div>
                            <div className="flex text-yellow-400">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} size={14} fill="currentColor"/>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 italic">"{review.comment}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>

      {/* ==========================================
          MODAL 1: CHỈNH SỬA HỒ SƠ (CÁ NHÂN & CHUYÊN MÔN)
      ========================================== */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Edit size={20} className="text-[#2563EB]"/> Chỉnh sửa Hồ sơ Bác sĩ
              </h2>
              <button onClick={() => setIsEditProfileOpen(false)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition">
                <X size={20}/>
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-8">
              
              {/* Form 1: Thông tin cá nhân */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">1. Thông tin cá nhân</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Họ và tên <span className="text-red-500">*</span></label>
                    <input 
                      type="text" value={editForm.fullName} onChange={e => setEditForm({...editForm, fullName: e.target.value})}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Số điện thoại</label>
                    <input 
                      type="text" value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Ngày sinh</label>
                    <input 
                      type="text" value={editForm.dob} onChange={e => setEditForm({...editForm, dob: e.target.value})}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Giới tính</label>
                    <select 
                      value={editForm.gender} onChange={e => setEditForm({...editForm, gender: e.target.value})}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition"
                    >
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Địa chỉ hiện tại</label>
                    <input 
                      type="text" value={editForm.address} onChange={e => setEditForm({...editForm, address: e.target.value})}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition" 
                    />
                  </div>
                </div>
              </div>

              {/* Form 2: Thông tin chuyên môn */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">2. Chuyên môn & Năng lực</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Chuyên khoa chính</label>
                    <input 
                      type="text" value={editForm.specialty} onChange={e => setEditForm({...editForm, specialty: e.target.value})}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Học vị</label>
                    <input 
                      type="text" value={editForm.degree} onChange={e => setEditForm({...editForm, degree: e.target.value})}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Nơi đào tạo</label>
                    <input 
                      type="text" value={editForm.university} onChange={e => setEditForm({...editForm, university: e.target.value})}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Số năm kinh nghiệm</label>
                    <input 
                      type="number" value={editForm.experience} onChange={e => setEditForm({...editForm, experience: Number(e.target.value)})}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Ngoại ngữ</label>
                    <input 
                      type="text" value={editForm.languages} onChange={e => setEditForm({...editForm, languages: e.target.value})}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition" 
                    />
                  </div>
                </div>
              </div>

            </div>

            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button 
                disabled={isSaving}
                onClick={() => setIsEditProfileOpen(false)} 
                className="px-6 py-2.5 rounded-xl font-bold text-gray-600 bg-white border border-gray-300 hover:bg-gray-100 transition"
              >
                Hủy bỏ
              </button>
              <button 
                disabled={isSaving}
                onClick={handleSaveProfile} 
                className="px-6 py-2.5 rounded-xl font-bold text-white bg-[#2563EB] hover:bg-blue-700 shadow-md transition flex items-center gap-2 disabled:opacity-50"
              >
                {isSaving ? <Loader2 size={18} className="animate-spin"/> : <Save size={18}/>} Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL 2: CHỈNH SỬA LỊCH LÀM VIỆC
      ========================================== */}
      {isEditScheduleOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[95vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <CalendarPlus size={20} className="text-[#2563EB]"/> Cập nhật Lịch làm việc tuần
              </h2>
              <button onClick={() => setIsEditScheduleOpen(false)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition">
                <X size={20}/>
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
              <div className="space-y-3">
                <div className="grid grid-cols-12 gap-3 px-3 pb-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <div className="col-span-3">Thứ / Ngày</div>
                  <div className="col-span-3">Khung Giờ</div>
                  <div className="col-span-3">Phòng Khám</div>
                  <div className="col-span-3">Trạng Thái</div>
                </div>
                
                {editForm.schedule.map((slot, index) => (
                  <div key={index} className="grid grid-cols-12 gap-3 items-center bg-gray-50 p-3 rounded-xl border border-gray-200">
                    <div className="col-span-3">
                      <input 
                        type="text" value={slot.day} 
                        onChange={e => handleScheduleChange(index, 'day', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold outline-none focus:ring-2 focus:ring-[#2563EB]"
                      />
                    </div>
                    <div className="col-span-3">
                      <input 
                        type="text" value={slot.time} 
                        onChange={e => handleScheduleChange(index, 'time', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#2563EB]"
                        placeholder="08:00 - 17:00"
                      />
                    </div>
                    <div className="col-span-3">
                      <input 
                        type="text" value={slot.room} 
                        onChange={e => handleScheduleChange(index, 'room', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#2563EB]"
                        placeholder="Tên phòng"
                      />
                    </div>
                    <div className="col-span-3">
                      <select 
                        value={slot.status} 
                        onChange={e => handleScheduleChange(index, 'status', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg text-sm font-bold outline-none focus:ring-2 focus:ring-[#2563EB] ${slot.status === 'Có lịch' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}
                      >
                        <option value="Có lịch" className="text-gray-900 bg-white">Có lịch</option>
                        <option value="Nghỉ phép" className="text-gray-900 bg-white">Nghỉ phép</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button 
                disabled={isSaving}
                onClick={() => setIsEditScheduleOpen(false)} 
                className="px-6 py-2.5 rounded-xl font-bold text-gray-600 bg-white border border-gray-300 hover:bg-gray-100 transition"
              >
                Hủy bỏ
              </button>
              <button 
                disabled={isSaving}
                onClick={handleSaveProfile} 
                className="px-6 py-2.5 rounded-xl font-bold text-white bg-[#2563EB] hover:bg-blue-700 shadow-md transition flex items-center gap-2 disabled:opacity-50"
              >
                {isSaving ? <Loader2 size={18} className="animate-spin"/> : <Save size={18}/>} Lưu Lịch trực
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}