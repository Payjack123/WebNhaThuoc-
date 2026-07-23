'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Users, CalendarDays, FileText, Pill, TestTube, 
  Settings, LogOut, Search, Activity, User, Building2, Check,
  ShieldCheck, History, Wallet, CheckCircle2, XCircle, Clock,
  Download, Printer, Filter, Eye, Plus, Receipt, Banknote, 
  CreditCard, QrCode, AlertCircle, FilePlus, ChevronRight
} from 'lucide-react';

export default function AdminBillingPage() {
  const router = useRouter();
  const [selectedInvoiceId, setSelectedInvoiceId] = useState('HD001');
  const [activeTab, setActiveTab] = useState('details');
  const [isAddInvoiceModalOpen, setIsAddInvoiceModalOpen] = useState(false);

  const handleLogout = () => {
    // localStorage.removeItem('token');
    router.push('/login');
  };

  // Mock dữ liệu Hóa đơn
  const invoices = [
    { id: 'HD001', patient: 'Nguyễn Văn A', phone: '0981234567', doctor: 'BS Nguyễn Văn Bình', date: '15/08/2026', total: '850.000', final: '750.000', method: 'Chuyển khoản', status: 'Đã thanh toán', statusColor: 'text-green-700 bg-green-100 border-green-200' },
    { id: 'HD002', patient: 'Trần Thị B', phone: '0971234567', doctor: 'BS Trần Thị An', date: '15/08/2026', total: '450.000', final: '450.000', method: 'Tiền mặt', status: 'Chờ thanh toán', statusColor: 'text-yellow-700 bg-yellow-100 border-yellow-200' },
    { id: 'HD003', patient: 'Lê Văn C', phone: '0961234567', doctor: 'BS Lê Minh Hải', date: '14/08/2026', total: '1.250.000', final: '1.250.000', method: 'Chưa chọn', status: 'Quá hạn', statusColor: 'text-red-700 bg-red-100 border-red-200' },
    { id: 'HD004', patient: 'Phạm Minh D', phone: '0951234567', doctor: 'BS Trần Hùng', date: '14/08/2026', total: '320.000', final: '250.000', method: 'QR Banking', status: 'Đã thanh toán', statusColor: 'text-green-700 bg-green-100 border-green-200' },
    { id: 'HD005', patient: 'Hoàng Ngọc E', phone: '0941234567', doctor: 'BS Nguyễn Văn Bình', date: '13/08/2026', total: '150.000', final: '150.000', method: 'Tiền mặt', status: 'Đã thanh toán', statusColor: 'text-green-700 bg-green-100 border-green-200' },
  ];

  const activeInvoice = invoices.find(inv => inv.id === selectedInvoiceId) || invoices[0];

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans text-gray-800 overflow-hidden">
      
      {/* ==========================================
          1. SIDEBAR (Active: Thanh toán & Viện phí)
      ========================================== */}
      <aside className="w-64 bg-[#0F172A] text-gray-300 flex flex-col h-screen sticky top-0 shrink-0 shadow-xl z-20">
        <div className="h-20 flex items-center justify-center border-b border-gray-800 bg-[#0B1120]">
          <div className="flex items-center gap-2 text-white">
            <Activity className="text-[#2563EB]" size={28}/>
            <span className="font-bold text-xl tracking-tight">ADMIN<span className="text-[#2563EB]">PRO</span></span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-6 px-3 custom-scrollbar">
          
          <div className="space-y-1">
            <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">1. Tổng quan</p>
            <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <LayoutDashboard size={18}/> Dashboard & Báo cáo
            </Link>
          </div>

          <div className="space-y-1">
            <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">2. Phòng khám</p>
            <Link href="/admin/doctors" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <User size={18}/> Quản lý Bác sĩ
            </Link>
            <Link href="/admin/patients" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <Users size={18}/> Quản lý Bệnh nhân
            </Link>
            <Link href="/admin/appointments" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <CalendarDays size={18}/> Quản lý Lịch khám
            </Link>
            <Link href="/admin/records" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <FileText size={18}/> Hồ sơ bệnh án
            </Link>
            <Link href="/admin/prescriptions" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <Pill size={18}/> Quản lý Đơn thuốc
            </Link>
            <Link href="/admin/lab-tests" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <TestTube size={18}/> Quản lý Xét nghiệm
            </Link>
          </div>

          <div className="space-y-1">
            <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">3. Hệ thống</p>
            <Link href="/admin/users" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <ShieldCheck size={18}/> Phân quyền (RBAC)
            </Link>
            <Link href="/admin/departments" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <Building2 size={18}/> Khoa phòng & Dịch vụ
            </Link>
            {/* Active Menu */}
            <Link href="/admin/billing" className="flex items-center gap-3 px-4 py-2.5 bg-[#2563EB] text-white rounded-xl font-medium shadow-md transition-all text-sm">
              <Wallet size={18}/> Thanh toán & Viện phí
            </Link>
          </div>

          <div className="space-y-1">
            <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">4. Cấu hình</p>
            <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 hover:text-white rounded-xl transition-all text-sm">
              <Settings size={18}/> Cài đặt chung
            </Link>
          </div>

        </div>

        <div className="p-4 border-t border-gray-800 bg-[#0B1120]">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all text-sm font-bold"
          >
            <LogOut size={18}/> Đăng xuất
          </button>
        </div>
      </aside>

      {/* ==========================================
          2. MAIN CONTENT AREA
      ========================================== */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50 relative">
        
        {/* TOP HEADER */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 p-2 rounded-lg"><Wallet className="text-[#2563EB]" size={24}/></div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Quản lý Thanh toán & Viện phí</h1>
              <p className="text-xs text-gray-500 font-medium">Quản lý hóa đơn, viện phí và theo dõi tình trạng thanh toán</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsAddInvoiceModalOpen(true)}
              className="bg-[#2563EB] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md transition-all flex items-center gap-2 text-sm"
            >
              <FilePlus size={18}/> Tạo Hóa đơn
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-gray-900">Quản trị viên</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#172554] text-white flex items-center justify-center font-bold border-2 border-white shadow-sm">AD</div>
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-8 animate-in fade-in duration-500">
          
          {/* 6 KPI CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            {[
              { label: 'Tổng hóa đơn', value: '2,356', icon: Receipt, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Doanh thu', value: '1.25 Tỷ', icon: Banknote, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Đã thanh toán', value: '2,180', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Chờ thanh toán', value: '156', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
              { label: 'Quá hạn', value: '20', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
              { label: 'Hóa đơn hôm nay', value: '65', icon: CalendarDays, color: 'text-purple-600', bg: 'bg-purple-50' },
            ].map((kpi, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all duration-300">
                <div className={`w-12 h-12 ${kpi.bg} ${kpi.color} rounded-2xl flex items-center justify-center shrink-0`}><kpi.icon size={24}/></div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">{kpi.label}</p>
                  <p className="text-xl font-black text-gray-900 leading-tight">{kpi.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* SEARCH & FILTER BAR */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex-1 flex gap-4 min-w-0">
              <div className="relative w-64">
                <input type="text" placeholder="Tên BN, mã HĐ, SĐT..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition-all"/>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
              </div>
              <select className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none">
                <option>Trạng thái (Tất cả)</option>
                <option>Đã thanh toán</option>
                <option>Chờ thanh toán</option>
                <option>Quá hạn</option>
              </select>
              <select className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none hidden md:block">
                <option>Phương thức (Tất cả)</option>
                <option>Tiền mặt</option>
                <option>Chuyển khoản / QR</option>
                <option>Thẻ / POS</option>
              </select>
              <input type="date" className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2563EB] outline-none hidden lg:block"/>
              <button className="bg-gray-100 border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-200 transition flex items-center gap-2 text-sm">
                <Filter size={18}/> Lọc
              </button>
            </div>
            <div className="flex gap-2">
              <button className="text-gray-500 hover:text-[#2563EB] font-bold text-sm underline underline-offset-2 transition-colors px-4">
                Làm mới
              </button>
              <button className="bg-green-50 border border-green-200 text-green-700 px-4 py-2.5 rounded-xl font-bold hover:bg-green-100 transition flex items-center gap-2 text-sm">
                <Download size={16}/> Xuất Excel
              </button>
            </div>
          </div>

          {/* MASTER-DETAIL LAYOUT */}
          <div className="flex flex-col xl:flex-row gap-8 h-[calc(100vh-320px)] min-h-[550px]">
            
            {/* CỘT TRÁI (MASTER): Danh sách Hóa đơn (55%) */}
            <div className="xl:w-[55%] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center shrink-0">
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><Receipt size={18} className="text-[#2563EB]"/> Danh sách Hóa đơn</h3>
                <span className="text-sm font-bold text-[#2563EB] bg-blue-100 px-3 py-1 rounded-full">{invoices.length} Hóa đơn</span>
              </div>
              
              <div className="flex-1 overflow-auto custom-scrollbar">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-white border-b border-gray-100 text-gray-500 font-bold sticky top-0 z-10 shadow-sm">
                    <tr>
                      <th className="px-5 py-4">Mã HĐ / Bệnh nhân</th>
                      <th className="px-5 py-4">Ngày lập</th>
                      <th className="px-5 py-4 text-right">Tổng tiền</th>
                      <th className="px-5 py-4 text-center">Trạng thái</th>
                      <th className="px-5 py-4 text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {invoices.map((inv) => (
                      <tr 
                        key={inv.id} 
                        onClick={() => setSelectedInvoiceId(inv.id)}
                        className={`cursor-pointer transition-colors ${selectedInvoiceId === inv.id ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
                      >
                        <td className="px-5 py-4">
                          <p className={`font-bold ${selectedInvoiceId === inv.id ? 'text-[#2563EB]' : 'text-gray-900'}`}>{inv.id}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{inv.patient}</p>
                        </td>
                        <td className="px-5 py-4 text-gray-600 font-medium">{inv.date}</td>
                        <td className="px-5 py-4 text-right font-black text-gray-900">{inv.final}đ</td>
                        <td className="px-5 py-4 text-center">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center justify-center w-max mx-auto gap-1.5 ${inv.statusColor}`}>
                            {inv.status === 'Đã thanh toán' ? <CheckCircle2 size={12}/> : inv.status === 'Quá hạn' ? <AlertCircle size={12}/> : <Clock size={12}/>}
                            {inv.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button className="p-1.5 text-gray-400 hover:text-[#2563EB] hover:bg-blue-50 rounded transition" title="Xem chi tiết"><Eye size={16}/></button>
                            <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded transition" title="In Hóa đơn"><Printer size={16}/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-gray-100 bg-white flex justify-between items-center text-sm text-gray-500">
                <span>Hiển thị 1-5 của 2,356 hóa đơn</span>
                <div className="flex gap-1">
                  <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Trước</button>
                  <button className="px-3 py-1 bg-[#2563EB] text-white rounded font-bold shadow-sm">1</button>
                  <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">2</button>
                  <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Sau</button>
                </div>
              </div>
            </div>

            {/* CỘT PHẢI (DETAIL): Biên lai chi tiết (45%) */}
            <div className="xl:w-[45%] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
              
              {/* Thẻ Summary - Ticket Style */}
              <div className="p-6 bg-[#0F172A] text-white relative shrink-0">
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold border border-white/10">
                  {activeInvoice.status === 'Đã thanh toán' ? <CheckCircle2 size={14} className="text-green-400"/> : activeInvoice.status === 'Quá hạn' ? <AlertCircle size={14} className="text-red-400"/> : <Clock size={14} className="text-yellow-400"/>}
                  {activeInvoice.status}
                </div>
                
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Receipt size={20} className="text-[#2563EB]"/> BIÊN LAI THU TIỀN
                </h2>
                
                <div className="grid grid-cols-2 gap-y-3 text-sm">
                  <div><span className="text-gray-400">Mã hóa đơn:</span> <span className="font-bold ml-1">{activeInvoice.id}</span></div>
                  <div><span className="text-gray-400">Ngày lập:</span> <span className="font-bold ml-1">{activeInvoice.date}</span></div>
                  <div className="col-span-2 border-b border-gray-700 pb-2 mb-1"><span className="text-gray-400">Bệnh nhân:</span> <span className="font-bold ml-1 text-[#2563EB]">{activeInvoice.patient}</span> ({activeInvoice.phone})</div>
                  <div className="col-span-2"><span className="text-gray-400">Bác sĩ khám:</span> <span className="font-bold ml-1">{activeInvoice.doctor}</span></div>
                </div>
              </div>

              {/* TABS NAVIGATION */}
              <div className="flex px-2 border-b border-gray-100 bg-gray-50 shrink-0 overflow-x-auto custom-scrollbar">
                {[
                  { id: 'details', label: 'Chi tiết Viện phí', icon: FileText },
                  { id: 'payment', label: 'Thanh toán', icon: CreditCard },
                  { id: 'history', label: 'Lịch sử', icon: History }
                ].map((tab) => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 py-3 px-4 font-bold text-sm border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id ? 'border-[#2563EB] text-[#2563EB] bg-white' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  >
                    <tab.icon size={16}/> {tab.label}
                  </button>
                ))}
              </div>

              {/* TAB CONTENT */}
              <div className="flex-1 overflow-y-auto p-6 bg-white">
                
                {/* 1. CHI TIẾT VIỆN PHÍ */}
                {activeTab === 'details' && (
                  <div className="animate-in fade-in flex flex-col h-full">
                    {/* Bảng hạng mục */}
                    <div className="flex-1">
                      <table className="w-full text-sm text-left">
                        <thead className="border-b-2 border-gray-800 text-gray-900 font-bold">
                          <tr>
                            <th className="pb-2">Hạng mục</th>
                            <th className="pb-2 text-right">Thành tiền</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-gray-700">
                          <tr><td className="py-3 font-medium">Khám tổng quát</td><td className="py-3 text-right">150.000 đ</td></tr>
                          <tr><td className="py-3 font-medium">Xét nghiệm máu sinh hóa</td><td className="py-3 text-right">250.000 đ</td></tr>
                          <tr><td className="py-3 font-medium">Siêu âm ổ bụng</td><td className="py-3 text-right">300.000 đ</td></tr>
                          <tr><td className="py-3 font-medium">Tiền thuốc (Đơn thuốc DT001)</td><td className="py-3 text-right">150.000 đ</td></tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Phần tính tổng */}
                    <div className="border-t border-dashed border-gray-300 pt-4 mt-4 space-y-2 text-sm">
                      <div className="flex justify-between text-gray-600"><span>Tổng cộng</span><span className="font-bold">850.000 VNĐ</span></div>
                      <div className="flex justify-between text-gray-600"><span>Khuyến mãi / Giảm giá</span><span className="font-bold">0 VNĐ</span></div>
                      <div className="flex justify-between text-green-600 font-bold"><span>Bảo hiểm Y tế (BHYT)</span><span>- 100.000 VNĐ</span></div>
                      
                      <div className="flex justify-between items-end border-t border-gray-800 pt-3 mt-3">
                        <span className="font-bold text-gray-900 uppercase">Phải thanh toán</span>
                        <span className="text-2xl font-black text-[#2563EB]">{activeInvoice.final} VNĐ</span>
                      </div>
                    </div>

                    <button className="w-full mt-6 bg-[#2563EB] text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-md">
                      <Printer size={18}/> In Biên lai
                    </button>
                  </div>
                )}

                {/* 2. PHƯƠNG THỨC THANH TOÁN */}
                {activeTab === 'payment' && (
                  <div className="animate-in fade-in space-y-5">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase">Phương thức đã chọn</h3>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className={`border p-4 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition ${activeInvoice.method === 'Tiền mặt' ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]' : 'border-gray-200 text-gray-500'}`}>
                        <Banknote size={24}/>
                        <span className="text-sm font-bold">Tiền mặt</span>
                      </div>
                      <div className={`border p-4 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition ${activeInvoice.method === 'Chuyển khoản' || activeInvoice.method === 'QR Banking' ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]' : 'border-gray-200 text-gray-500'}`}>
                        <QrCode size={24}/>
                        <span className="text-sm font-bold">QR / Chuyển khoản</span>
                      </div>
                      <div className={`border p-4 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition ${activeInvoice.method === 'Thẻ / POS' ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]' : 'border-gray-200 text-gray-500'}`}>
                        <CreditCard size={24}/>
                        <span className="text-sm font-bold">Thẻ / Quẹt POS</span>
                      </div>
                      <div className="border border-gray-200 p-4 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition text-gray-500 hover:bg-gray-50">
                        <Wallet size={24}/>
                        <span className="text-sm font-bold">Ví điện tử</span>
                      </div>
                    </div>

                    {(activeInvoice.method === 'Chuyển khoản' || activeInvoice.method === 'QR Banking') && (
                      <div className="bg-gray-100 rounded-xl p-6 flex flex-col items-center justify-center border border-gray-200 mt-4">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MockPayment" alt="QR Code" className="w-32 h-32 bg-white p-2 rounded-lg shadow-sm border border-gray-200"/>
                        <p className="text-sm font-bold text-gray-900 mt-4">Ngân hàng MB Bank</p>
                        <p className="text-xs text-gray-500">STK: 0981234567 • CTK: PHONG KHAM HEALTHCARE</p>
                        <p className="text-xs text-blue-600 font-bold mt-1">Số tiền: {activeInvoice.final} VNĐ</p>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. LỊCH SỬ THANH TOÁN */}
                {activeTab === 'history' && (
                  <div className="space-y-0 relative before:absolute before:inset-0 before:ml-[13px] before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#2563EB] before:to-gray-200 animate-in fade-in">
                    
                    <div className="relative pl-8 pb-6">
                      <span className="absolute left-0 top-1 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center -translate-x-2.5 z-10 shadow-[0_0_0_4px_white]"><Check size={14}/></span>
                      <div>
                        <p className="text-xs text-gray-500 font-bold">15/08/2026 - 09:15</p>
                        <h4 className="font-bold text-gray-900 mt-1">Hệ thống tạo hóa đơn</h4>
                        <p className="text-sm text-gray-600 mt-0.5">Tự động tổng hợp chi phí từ bệnh án.</p>
                      </div>
                    </div>

                    <div className="relative pl-8 pb-6">
                      <span className={`absolute left-0 top-1 w-7 h-7 rounded-full flex items-center justify-center -translate-x-2.5 z-10 shadow-[0_0_0_4px_white] ${activeInvoice.status === 'Đã thanh toán' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                        {activeInvoice.status === 'Đã thanh toán' ? <Check size={14}/> : <Clock size={14}/>}
                      </span>
                      <div>
                        <p className={`text-xs font-bold ${activeInvoice.status === 'Đã thanh toán' ? 'text-gray-500' : 'text-gray-400'}`}>15/08/2026 - 09:30</p>
                        <h4 className={`font-bold mt-1 ${activeInvoice.status === 'Đã thanh toán' ? 'text-gray-900' : 'text-gray-500'}`}>Bệnh nhân thanh toán</h4>
                        {activeInvoice.status === 'Đã thanh toán' && <p className="text-sm text-gray-600 mt-0.5">Xác nhận thanh toán qua: {activeInvoice.method}.</p>}
                      </div>
                    </div>

                    <div className="relative pl-8">
                      <span className={`absolute left-0 top-1 w-7 h-7 rounded-full flex items-center justify-center -translate-x-2.5 z-10 shadow-[0_0_0_4px_white] ${activeInvoice.status === 'Đã thanh toán' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                        {activeInvoice.status === 'Đã thanh toán' ? <CheckCircle2 size={14}/> : <Clock size={14}/>}
                      </span>
                      <div>
                        <p className={`text-xs font-bold ${activeInvoice.status === 'Đã thanh toán' ? 'text-green-600' : 'text-gray-400'}`}>15/08/2026 - 09:35</p>
                        <h4 className={`font-bold mt-1 ${activeInvoice.status === 'Đã thanh toán' ? 'text-green-700' : 'text-gray-500'}`}>Hoàn tất</h4>
                        {activeInvoice.status === 'Đã thanh toán' && <p className="text-sm text-gray-600 mt-0.5">In hóa đơn và đóng kỳ thu phí.</p>}
                      </div>
                    </div>

                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ==========================================
          MODAL: TẠO HÓA ĐƠN THỦ CÔNG
      ========================================== */}
      {isAddInvoiceModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><FilePlus size={20} className="text-[#2563EB]"/> Tạo Hóa đơn thu phí</h2>
              <button onClick={() => setIsAddInvoiceModalOpen(false)} className="text-gray-400 hover:text-gray-700 transition"><XCircle size={24}/></button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <div className="space-y-4">
                
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Bệnh nhân <span className="text-red-500">*</span></label>
                  <select className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors">
                    <option>Tìm bệnh nhân / Nhập mã BN...</option>
                    <option>BN001 - Nguyễn Văn A</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Lịch khám / Hồ sơ liên kết</label>
                  <select className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none text-sm bg-gray-50 focus:bg-white transition-colors">
                    <option>Tự động tổng hợp chi phí từ lịch khám gần nhất...</option>
                    <option>LK001 - Nội tổng quát (15/08/2026)</option>
                  </select>
                  <p className="text-xs text-[#2563EB] mt-1 italic">* Hệ thống sẽ tự động cộng: Tiền khám + Xét nghiệm + Đơn thuốc.</p>
                </div>

                <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-3">Tùy chọn BHYT</label>
                   <label className="flex items-center gap-2 text-sm font-bold text-gray-900 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB]" defaultChecked/>
                      Áp dụng khấu trừ Bảo hiểm Y tế (BHYT)
                   </label>
                </div>

              </div>
            </div>

            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setIsAddInvoiceModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 transition">Hủy</button>
              <button className="bg-[#2563EB] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md transition flex items-center gap-2">
                <CheckCircle2 size={18}/> Xác nhận tạo & In
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}