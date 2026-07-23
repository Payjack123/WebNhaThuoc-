'use client'; 

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Activity, ArrowLeft, Loader2, User, Stethoscope, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/app/actions/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // THÊM MỚI: State lưu trữ quyền đang được chọn (Mặc định là Bệnh nhân)
  const [selectedRole, setSelectedRole] = useState<'PATIENT' | 'DOCTOR' | 'ADMIN'>('PATIENT');
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setError('');
    setIsLoading(true);

    try {
      // Truyền thêm selectedRole xuống backend
      const res = await loginUser(email, password, selectedRole);

      if (res.success) {
        switch (res.role) {
          case 'patient':
            router.push('/patient/dashboard');
            break;
          case 'doctor':
            router.push('/doctor/dashboard');
            break;
          case 'admin':
            router.push('/admin/dashboard');
            break;
          default:
            router.push('/patient/dashboard');
            break;
        }
      } else {
        setError(res.message || 'Đăng nhập không thành công.');
      }
    } catch (err) {
      console.error('Lỗi khi đăng nhập:', err);
      setError('Đã xảy ra lỗi kết nối hệ thống. Vui lòng thử lại!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Cột trái (Thương hiệu) */}
        <div className="hidden md:flex md:w-1/2 bg-blue-600 p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-2 text-white mb-12 w-max">
              <ArrowLeft size={20} />
              <span className="font-medium hover:underline">Quay lại trang chủ</span>
            </Link>
            
            <div className="flex items-center gap-2 mb-6">
              <Activity className="h-10 w-10 text-white" />
              <span className="font-bold text-3xl text-white tracking-tight">HEALTHCARE</span>
            </div>
            <h1 className="text-4xl font-bold text-white leading-tight mb-4">
              Chào mừng <br /> quay trở lại!
            </h1>
            <p className="text-blue-100 text-lg">
              Đăng nhập để đặt lịch khám, quản lý hồ sơ và trải nghiệm dịch vụ chăm sóc sức khỏe.
            </p>
          </div>
        </div>

        {/* Cột phải (Form Đăng nhập) */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="md:hidden flex items-center gap-2 mb-8 text-blue-600">
            <Activity className="h-8 w-8" />
            <span className="font-bold text-2xl tracking-tight">HEALTHCARE</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Đăng nhập</h2>

          {/* THÊM MỚI: Thanh chọn quyền đăng nhập (Tabs) */}
          <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => { setError(''); setSelectedRole('PATIENT'); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${
                selectedRole === 'PATIENT' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <User size={16} />
              Bệnh nhân
            </button>
            <button
              type="button"
              onClick={() => { setError(''); setSelectedRole('DOCTOR'); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${
                selectedRole === 'DOCTOR' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Stethoscope size={16} />
              Bác sĩ
            </button>
            <button
              type="button"
              onClick={() => { setError(''); setSelectedRole('ADMIN'); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${
                selectedRole === 'ADMIN' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <ShieldCheck size={16} />
              Admin
            </button>
          </div>

          {error && (
            <div className="mb-5 text-red-600 bg-red-50 p-4 rounded-xl text-sm font-medium border border-red-100 animate-in fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-100"
                  placeholder="nhapemail@gmail.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-100"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input 
                  id="remember-me" 
                  type="checkbox" 
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <div className="text-sm">
                <Link href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Quên mật khẩu?
                </Link>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition mt-2 disabled:bg-blue-400 cursor-pointer disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Đang xử lý...</span>
                </>
              ) : (
                'Đăng nhập'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Chưa có tài khoản?{' '}
              <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}