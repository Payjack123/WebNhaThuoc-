'use client'; 

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Activity, ArrowLeft, Loader2, Stethoscope, ShieldCheck } from 'lucide-react';
// Import hàm registerUser và type UserRole từ auth.ts
import { registerUser, UserRole } from '@/app/actions/auth';

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // State phân quyền: PATIENT | DOCTOR | ADMIN
  const [selectedRole, setSelectedRole] = useState<UserRole>('PATIENT');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp!');
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    setIsLoading(true);

    try {
      // Gọi Server Action
      const res = await registerUser(fullName, email, password, selectedRole);

      if (res.success) {
        alert('Tạo tài khoản thành công! Vui lòng đăng nhập.');
        router.push('/login'); 
      } else {
        setError(res.message); 
      }
    } catch (err) {
      console.error('Lỗi khi đăng ký:', err);
      setError('Đã xảy ra lỗi kết nối. Vui lòng thử lại sau!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-10 font-sans">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row-reverse">
        
        {/* ... (Giữ nguyên Cột phải giao diện bên thương hiệu) ... */}
        <div className="hidden md:flex md:w-1/2 bg-blue-50 p-12 flex-col justify-between relative overflow-hidden border-l border-blue-100">
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-2 text-blue-600 mb-12 w-max hover:underline">
              <ArrowLeft size={20} />
              <span className="font-medium">Quay lại trang chủ</span>
            </Link>
            <div className="flex items-center gap-2 mb-6">
              <Activity className="h-10 w-10 text-blue-600" />
              <span className="font-bold text-3xl text-blue-600 tracking-tight">HEALTHCARE</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
              Bắt đầu hành trình <br /> sức khỏe mới
            </h1>
          </div>
        </div>

        {/* Cột trái: Form đăng ký */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Đăng ký tài khoản</h2>
          <p className="text-gray-500 mb-6">Chọn vai trò và điền thông tin</p>

          {/* BỘ NÚT CHỌN 3 QUYỀN ĐĂNG KÝ */}
          <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
            <button type="button" onClick={() => { setError(''); setSelectedRole('PATIENT'); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${selectedRole === 'PATIENT' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
              <User size={16} /> Bệnh nhân
            </button>
            <button type="button" onClick={() => { setError(''); setSelectedRole('DOCTOR'); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${selectedRole === 'DOCTOR' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
              <Stethoscope size={16} /> Bác sĩ
            </button>
            <button type="button" onClick={() => { setError(''); setSelectedRole('ADMIN'); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${selectedRole === 'ADMIN' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
              <ShieldCheck size={16} /> Admin
            </button>
          </div>

          {error && <div className="mb-5 text-red-600 bg-red-50 p-4 rounded-xl text-sm font-medium">{error}</div>}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
              <input 
                type="text" 
                required 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
                disabled={isLoading} 
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" 
                placeholder="Họ và tên " 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                disabled={isLoading} 
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" 
                placeholder="email@gmail.com" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
              <input 
                type="password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                disabled={isLoading} 
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" 
                placeholder="••••••••" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu</label>
              <input 
                type="password" 
                required 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                disabled={isLoading} 
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" 
                placeholder="••••••••" 
              />
            </div>
            
            <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl text-white bg-blue-600 hover:bg-blue-700 font-bold mt-4 transition-colors disabled:bg-blue-400">
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Tạo tài khoản'}
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm text-gray-600">
             Đã có tài khoản? <Link href="/login" className="font-medium text-blue-600">Đăng nhập ngay</Link>
          </div>
        </div>
      </div>
    </div>
  );
}