'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, CalendarDays, Users, FileText, Pill, TestTube, 
  BarChart3, Bell, User, Settings, LogOut, Search, Star, 
  Activity, MapPin, Phone, Mail, Calendar, Award, Briefcase, 
  Clock, Edit, CheckCircle2, ThumbsUp, ShieldCheck, Loader2, X, Save
} from 'lucide-react';

// Chú ý đường dẫn import, hãy sửa lại cho đúng với cấu trúc thư mục của bạn
import { getDoctorProfileData, updateDoctorProfileData } from '@/app/doctor/profile/actions';

export default function DoctorProfile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('personal'); 
  
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // States cho Form Chỉnh sửa
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    phone: '', dob: '', gender: '', address: '',
    specialty: '', degree: '', university: '', experience: 0, languages: ''
  });

 // Kéo dữ liệu từ TiDB
  const fetchProfile = async () => {
    const res = await getDoctorProfileData();
    if (res.success && res.data) {
      setProfile(res.data);
      
      // FIX LỖI: Kiểm tra an toàn trước khi gán vào Form
      setEditForm({
        phone: res.data.phone && res.data.phone !== 'Chưa cập nhật' ? res.data.phone : '',
        dob: res.data.dob && res.data.dob !== 'Chưa cập nhật' ? res.data.dob : '',
        gender: res.data.gender || 'Nam',
        address: res.data.address && res.data.address !== 'Chưa cập nhật' ? res.data.address : '',
        specialty: res.data.specialty && res.data.specialty !== 'Chưa cập nhật' ? res.data.specialty : '',
        degree: res.data.degree && res.data.degree !== 'Chưa cập nhật' ? res.data.degree : '',
        university: res.data.university && res.data.university !== 'Chưa cập nhật' ? res.data.university : '',
        experience: res.data.experience || 0,
        languages: res.data.languages && res.data.languages !== 'Chưa cập nhật' ? res.data.languages : '',
      });
    } else {
      router.push('/login');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, [router]);

  const handleLogout = () => router.push('/login');

  // Hàm xử lý Lưu Hồ Sơ
  const handleSaveProfile = async () => {
    setIsSaving(true);
    const res = await updateDoctorProfileData(editForm);
    setIsSaving(false);
    
    if (res.success) {
      alert(res.message);
      setIsEditing(false); // Tắt Modal
      setIsLoading(true);
      fetchProfile(); // Tải lại dữ liệu mới nhất từ TiDB để cập nhật UI
    } else {
      alert(res.message);
    }
  };

  if (isLoading || !profile) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-10 h-10 text-[#2563EB] animate-spin" /></div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans text-gray-800">
      
      {/* ==========================================
          1. SIDEBAR
      ========================================== */}
      <aside className="w-64 bg-[#172554] text-gray-300 flex flex-col h-screen sticky top-0 shrink-0 z-10">
        <div className="h-20 flex items-center justify-center border-b border-blue-900/50">
          <div className="flex items-center gap-2 text-white">
            <Activity className="text-orange-500" size={28}/>
            <span className="font-bold text-xl tracking-tight">HEALTHCARE AI</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-1 px-3">
          <Link href="/doctor/dashboard" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-900/50 hover:text-white rounded-xl transition">
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
          <Link href="/doctor/profile" className="flex items-center gap-3 px-4 py-2 bg-[#2563EB] text-white rounded-lg font-medium shadow-md text-sm">
            <User size={18}/> Hồ sơ bác sĩ
          </Link>
          <Link href="/doctor/settings" className="flex items-center gap-3 px-4 py-2 hover:bg-blue-900/50 hover:text-white rounded-lg transition text-sm">
            <Settings size={18}/> Cài đặt
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition text-sm mt-2">
            <LogOut size={18}/> Đăng xuất
          </button>
        </div>
      </aside>

      {/* ==========================================
          2. MAIN CONTENT
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
                
                {/* NÚT MỞ MODAL CHỈNH SỬA */}
                <button 
                  onClick={() => setIsEditing(true)}
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
            {/* TABS NAVIGATION */}
            <div className="flex border-b border-gray-200 px-6">
              {[
                { id: 'personal', label: '👤 Thông tin cá nhân' },
                { id: 'professional', label: '🩺 Chuyên môn' },
                { id: 'schedule', label: '📅 Lịch làm việc' },
                { id: 'performance', label: '📊 Hiệu suất & Đánh giá' }
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)} 
                  className={`py-4 px-6 font-bold text-sm border-b-2 transition ${
                    activeTab === tab.id 
                      ? 'border-[#2563EB] text-[#2563EB]' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB CONTENTS */}
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

              {/* CÁC TAB KHÁC GIỮ NGUYÊN */}
              {activeTab === 'schedule' && (
                <div className="max-w-4xl animate-in fade-in">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Lịch làm việc cố định</h3>
                    <button className="text-sm text-[#2563EB] font-bold hover:underline">Yêu cầu đổi lịch</button>
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
                            <td className="p-4">{slot.room}</td>
                            <td className="p-4 text-center">
                              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Có lịch</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

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
          3. MODAL (POPUP) CHỈNH SỬA HỒ SƠ 
      ========================================== */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Edit size={20} className="text-[#2563EB]"/> Chỉnh sửa Hồ sơ Bác sĩ
              </h2>
              <button onClick={() => setIsEditing(false)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition">
                <X size={20}/>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-8">
              
              {/* Form 1: Thông tin cá nhân */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">1. Thông tin cá nhân</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Số điện thoại</label>
                    <input 
                      type="text" value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition" 
                      placeholder="VD: 0988 123 456" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Ngày sinh</label>
                    <input 
                      type="text" value={editForm.dob} onChange={e => setEditForm({...editForm, dob: e.target.value})}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition" 
                      placeholder="VD: 20/05/1988" 
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
                      placeholder="VD: Quận Cầu Giấy, Hà Nội" 
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
                      placeholder="VD: Nội tổng quát" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Học vị</label>
                    <input 
                      type="text" value={editForm.degree} onChange={e => setEditForm({...editForm, degree: e.target.value})}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition" 
                      placeholder="VD: Thạc sĩ Y Khoa" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Nơi đào tạo</label>
                    <input 
                      type="text" value={editForm.university} onChange={e => setEditForm({...editForm, university: e.target.value})}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition" 
                      placeholder="VD: Đại học Y Hà Nội" 
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
                      placeholder="VD: Tiếng Anh, Tiếng Pháp" 
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button 
                disabled={isSaving}
                onClick={() => setIsEditing(false)} 
                className="px-6 py-2.5 rounded-xl font-bold text-gray-600 bg-white border border-gray-300 hover:bg-gray-100 transition"
              >
                Hủy bỏ
              </button>
              <button 
                disabled={isSaving}
                onClick={handleSaveProfile} 
                className="px-6 py-2.5 rounded-xl font-bold text-white bg-[#2563EB] hover:bg-blue-700 shadow-md transition flex items-center gap-2 disabled:opacity-50"
              >
                {isSaving ? <Loader2 size={18} className="animate-spin"/> : <Save size={18}/>} Lưu thông tin
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}