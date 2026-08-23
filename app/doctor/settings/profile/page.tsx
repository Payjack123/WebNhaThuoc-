'use client';
import React, { useState, useEffect } from 'react';
import { User, Camera, Save, Loader2 } from 'lucide-react';
import DoctorSidebar from '@/app/doctor/Sidebar';
import { getDoctorProfileData, updateDoctorProfileData } from '@/app/doctor/settings/profile/actions';

export default function ProfileSettingsPage() {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    dob: '',
    doctorCode: '',
    gender: 'Nam',
    degree: '',
    university: '',
    languages: '',
    specialty: '',
    experience: '',
    certificateNumber: '',
    bio: '',
    price: ''
  });

  useEffect(() => {
    async function loadData() {
      const res = await getDoctorProfileData();
      if (res.success && res.data) {
        setProfile(res.data);
        setFormData({
          fullName: res.data.fullName || '',
          phone: res.data.phone || '',
          address: res.data.address || '',
          dob: res.data.dob || '',
          doctorCode: res.data.doctorCode || '',
          gender: res.data.gender || 'Nam',
          degree: res.data.degree || '',
          university: res.data.university || '',
          languages: res.data.languages || '',
          specialty: res.data.specialty || '',
          experience: res.data.experience?.toString() || '',
          certificateNumber: res.data.certificates?.certificateNumber || '',
          bio: res.data.certificates?.bio || '',
          price: res.data.price?.toString() || '150000'
        });
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    const res = await updateDoctorProfileData({
      ...profile,
      fullName: formData.fullName,
      phone: formData.phone,
      address: formData.address,
      dob: formData.dob,
      doctorCode: formData.doctorCode,
      gender: formData.gender,
      degree: formData.degree,
      university: formData.university,
      languages: formData.languages,
      specialty: formData.specialty,
      experience: formData.experience,
      certificates: {
        ...(profile.certificates || {}),
        certificateNumber: formData.certificateNumber,
        bio: formData.bio
      }
    });
    if (res.success) {
      alert("Lưu thay đổi thành công!");
    } else {
      alert(res.message || "Có lỗi xảy ra");
    }
    setIsSaving(false);
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] font-sans text-gray-800">
      <DoctorSidebar activePage="settings/profile" />
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-8 max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800">Hồ sơ cá nhân</h1>
            <p className="text-slate-500 mt-1 text-sm">Cập nhật thông tin cá nhân và chi tiết nghề nghiệp của bạn.</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-300">
            <div className="p-6">
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  {profile?.avatar ? (
                    <img src={profile.avatar} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover" />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-slate-200 border-4 border-white shadow-md overflow-hidden flex items-center justify-center text-slate-400">
                      <User size={40} />
                    </div>
                  )}
                  <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-sm">
                    <Camera size={14} />
                  </button>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">BS. {formData.fullName || 'Chưa cập nhật'}</h3>
                  <p className="text-slate-500 text-sm mb-2">Chuyên khoa {formData.specialty || 'Chưa cập nhật'}</p>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50">
                      Thay đổi ảnh
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Họ và tên</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-slate-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mã bác sĩ (Tự động)</label>
                  <input type="text" name="doctorCode" value={formData.doctorCode} disabled className="w-full px-4 py-2 border border-slate-200 bg-slate-50 rounded-xl text-sm text-slate-500 cursor-not-allowed" placeholder="VD: BS0001" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ngày sinh</label>
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-slate-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Giới tính</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-slate-700">
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email (Chỉ đọc)</label>
                  <input type="email" value={profile?.email || ''} disabled className="w-full px-4 py-2 border border-slate-200 bg-slate-50 rounded-xl text-sm text-slate-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Số điện thoại</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-slate-700" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Địa chỉ liên hệ</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-slate-700" />
                </div>
                
                {/* THÔNG TIN NGHỀ NGHIỆP */}
                <div className="md:col-span-2 mt-2">
                  <h4 className="font-semibold text-slate-800 border-b border-slate-100 pb-2">Thông tin nghề nghiệp</h4>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Chuyên khoa</label>
                  <input type="text" name="specialty" value={formData.specialty} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-slate-700" placeholder="VD: Tim mạch, Nhi khoa..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Bằng cấp</label>
                  <input type="text" name="degree" value={formData.degree} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-slate-700" placeholder="VD: Tiến sĩ Y Khoa, Thạc sĩ..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nơi đào tạo (Đại học/Học viện)</label>
                  <input type="text" name="university" value={formData.university} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-slate-700" placeholder="VD: Đại học Y Hà Nội..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ngôn ngữ</label>
                  <input type="text" name="languages" value={formData.languages} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-slate-700" placeholder="VD: Tiếng Việt, Tiếng Anh..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Số chứng chỉ hành nghề</label>
                  <input type="text" name="certificateNumber" value={formData.certificateNumber} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-slate-700" placeholder="Số chứng chỉ hành nghề..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Kinh nghiệm làm việc (năm)</label>
                  <input type="number" name="experience" value={formData.experience} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-slate-700" min="0" placeholder="VD: 10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Giá khám (VNĐ)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-slate-700" min="0" step="50000" placeholder="VD: 150000" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Giới thiệu bản thân</label>
                  <textarea name="bio" rows={4} value={formData.bio} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-slate-700 resize-none" placeholder="Giới thiệu về quá trình công tác, kinh nghiệm chuyên môn..."></textarea>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button 
                onClick={handleSave} 
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors text-sm shadow-sm shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
