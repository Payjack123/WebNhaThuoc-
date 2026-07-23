'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, CalendarDays, FileText, Pill, TestTube, 
  Bell, Settings, LogOut, Search, Activity, User, Wallet, 
  Clock, CheckCircle2, AlertCircle, Download, Printer, 
  QrCode, CreditCard, Banknote, ShieldCheck, ArrowRight, Check
} from 'lucide-react';

export default function PatientBillingPage() {
  const router = useRouter();
  const [selectedInvoiceId, setSelectedInvoiceId] = useState('HD001');
  const [paymentMethod, setPaymentMethod] = useState('QR'); // 'QR' | 'CARD' | 'CASH' | 'EWALLET'

  const handleLogout = () => {
    router.push('/login');
  };

  // --- MOCK DATA ---
  const invoices = [
    { 
      id: 'HD001', 
      date: '15/08/2026', 
      doctor: 'BS. Nguyễn Văn Bình', 
      specialty: 'Nội tổng quát', 
      total: '850.000',
      insurance: '100.000',
      final: '750.000',
      status: 'Chưa thanh toán', 
      statusColor: 'text-yellow-700 bg-yellow-100 border-yellow-200',
      iconColor: 'text-yellow-500 bg-yellow-50',
      details: [
        { name: 'Khám chuyên khoa', price: '150.000đ' },
        { name: 'Xét nghiệm máu tổng quát', price: '250.000đ' },
        { name: 'Siêu âm ổ bụng', price: '200.000đ' },
        { name: 'Tiền thuốc (Đơn DT001)', price: '250.000đ' },
      ]
    },
    { 
      id: 'HD002', 
      date: '20/07/2026', 
      doctor: 'BS. Trần Thị Lan', 
      specialty: 'Tim mạch', 
      total: '450.000',
      insurance: '0',
      final: '450.000',
      status: 'Đã thanh toán', 
      statusColor: 'text-green-700 bg-green-100 border-green-200',
      iconColor: 'text-green-500 bg-green-50',
      details: [
        { name: 'Khám chuyên khoa', price: '250.000đ' },
        { name: 'Tiền thuốc (Đơn DT002)', price: '200.000đ' },
      ],
      paymentDate: '20/07/2026 - 10:30',
      paymentRef: 'VNPay-TXN98231'
    },
    { 
      id: 'HD003', 
      date: '10/06/2026', 
      doctor: 'BS. Lê Minh Hải', 
      specialty: 'Da liễu', 
      total: '1.250.000',
      insurance: '250.000',
      final: '1.000.000',
      status: 'Quá hạn', 
      statusColor: 'text-red-700 bg-red-100 border-red-200',
      iconColor: 'text-red-500 bg-red-50',
      details: [
        { name: 'Khám chuyên khoa', price: '200.000đ' },
        { name: 'Tiểu phẫu da', price: '800.000đ' },
        { name: 'Tiền thuốc (Đơn DT003)', price: '250.000đ' },
      ]
    }
  ];

  const activeInvoice = invoices.find(inv => inv.id === selectedInvoiceId) || invoices[0];

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] font-sans text-gray-800 overflow-hidden">
      
      {/* ==========================================
          1. SIDEBAR
      ========================================== */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0 shrink-0 shadow-sm z-20">
        <div className="h-20 flex items-center justify-center border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Activity className="text-[#2563EB]" size={28}/>
            <span className="font-black text-xl tracking-tight text-gray-900">HEALTH<span className="text-[#2563EB]">CARE</span></span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-4 custom-scrollbar">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">Menu chính</p>
          
          <Link href="/patient/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] rounded-2xl transition-all text-sm font-semibold">
            <LayoutDashboard size={18}/> Tổng quan
          </Link>
          <Link href="/patient/appointments" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] rounded-2xl transition-all text-sm font-semibold">
            <CalendarDays size={18}/> Đặt & Lịch khám
          </Link>
          <Link href="/patient/records" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] rounded-2xl transition-all text-sm font-semibold">
            <FileText size={18}/> Hồ sơ sức khỏe
          </Link>
          <Link href="/patient/prescriptions" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] rounded-2xl transition-all text-sm font-semibold">
            <Pill size={18}/> Đơn thuốc của tôi
          </Link>
          <Link href="/patient/lab-tests" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] rounded-2xl transition-all text-sm font-semibold">
            <TestTube size={18}/> Kết quả xét nghiệm
          </Link>
          {/* Active Menu */}
          <Link href="/patient/billing" className="flex items-center gap-3 px-4 py-3 bg-[#2563EB] text-white rounded-2xl font-bold shadow-md shadow-blue-200 transition-all text-sm">
            <Wallet size={18}/> Thanh toán viện phí
          </Link>

          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-6 mb-2 px-2">Tài khoản</p>
          <Link href="/patient/settings" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] rounded-2xl transition-all text-sm font-semibold">
            <Settings size={18}/> Cài đặt cá nhân
          </Link>
        </div>

        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-2xl transition-all text-sm font-bold">
            <LogOut size={18}/> Đăng xuất
          </button>
        </div>
      </aside>

      {/* ==========================================
          2. MAIN CONTENT AREA
      ========================================== */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* TOP HEADER */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 p-2 rounded-lg"><Wallet className="text-[#2563EB]" size={24}/></div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Thanh toán & Viện phí</h1>
            </div>
          </div>
          <div className="flex items-center gap-5 ml-auto">
            <button className="relative p-2.5 text-gray-500 hover:bg-blue-50 hover:text-[#2563EB] rounded-full transition bg-white border border-gray-200 shadow-sm">
              <Bell size={20}/>
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-5 border-l border-gray-200 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900 group-hover:text-[#2563EB] transition">Nguyễn Văn A</p>
                <p className="text-xs text-gray-500 font-medium">Bệnh nhân (BN001)</p>
              </div>
              <img src="https://ui-avatars.com/api/?name=Nguyễn+Văn+A&background=2563EB&color=fff" alt="Avatar" className="w-11 h-11 rounded-full border-2 border-white shadow-sm group-hover:shadow-md transition"/>
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 animate-in fade-in duration-500">
          
          {/* DASHBOARD MINI */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <div className="text-[#2563EB] mb-1"><FileText size={24}/></div>
              <p className="text-xs text-gray-500 font-bold uppercase">Hóa đơn</p>
              <p className="text-2xl font-black text-gray-900 mt-1">18</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <div className="text-green-500 mb-1"><CheckCircle2 size={24}/></div>
              <p className="text-xs text-gray-500 font-bold uppercase">Đã thanh toán</p>
              <p className="text-2xl font-black text-gray-900 mt-1">15</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <div className="text-yellow-500 mb-1"><Clock size={24}/></div>
              <p className="text-xs text-gray-500 font-bold uppercase">Chưa thanh toán</p>
              <p className="text-2xl font-black text-gray-900 mt-1">3</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center md:col-span-1">
              <div className="text-purple-500 mb-1"><Printer size={24}/></div>
              <p className="text-xs text-gray-500 font-bold uppercase">Biên lai</p>
              <p className="text-2xl font-black text-gray-900 mt-1">18</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center md:col-span-2 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100">
              <div className="text-emerald-600 mb-1"><Banknote size={24}/></div>
              <p className="text-xs text-emerald-800 font-bold uppercase">Tổng chi phí y tế</p>
              <p className="text-xl font-black text-emerald-900 mt-1">5.850.000 VNĐ</p>
            </div>
          </div>

          {/* CẢNH BÁO QUÁ HẠN NẾU CÓ */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-8 flex items-start gap-4">
            <div className="bg-red-100 text-red-600 p-2 rounded-xl mt-0.5"><AlertCircle size={20}/></div>
            <div>
              <h3 className="font-bold text-red-800">Bạn có 1 hóa đơn đang quá hạn thanh toán!</h3>
              <p className="text-sm text-red-700 mt-1">Vui lòng hoàn tất thanh toán hóa đơn <strong className="font-bold">HD003</strong> (1.000.000 VNĐ) để không làm gián đoạn quá trình cấp phát thuốc.</p>
              <button 
                onClick={() => setSelectedInvoiceId('HD003')}
                className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-red-700 transition"
              >
                Thanh toán ngay
              </button>
            </div>
          </div>

          {/* MASTER-DETAIL LAYOUT */}
          <div className="flex flex-col xl:flex-row gap-8 h-[calc(100vh-380px)] min-h-[600px]">
            
            {/* CỘT TRÁI (MASTER): Danh sách hóa đơn */}
            <div className="xl:w-[40%] flex flex-col bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50 space-y-4 shrink-0">
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><Wallet size={18} className="text-[#2563EB]"/> Lịch sử Hóa đơn</h3>
                <div className="relative w-full">
                  <input type="text" placeholder="Tìm theo mã HD..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition-all shadow-sm"/>
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16}/>
                </div>
              </div>
              
              <div className="flex-1 overflow-auto custom-scrollbar">
                <div className="divide-y divide-gray-50">
                  {invoices.map((inv) => (
                    <div 
                      key={inv.id} 
                      onClick={() => setSelectedInvoiceId(inv.id)}
                      className={`p-5 cursor-pointer transition-all border-l-4 ${selectedInvoiceId === inv.id ? 'bg-blue-50/50 border-[#2563EB]' : 'border-transparent hover:bg-gray-50'}`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className={`font-bold text-lg ${selectedInvoiceId === inv.id ? 'text-[#2563EB]' : 'text-gray-900'}`}>{inv.id}</span>
                          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5"><CalendarDays size={12}/> {inv.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-gray-900 mb-1">{inv.final}đ</p>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${inv.statusColor}`}>{inv.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CỘT PHẢI (DETAIL): Chi tiết Hóa đơn & Cổng thanh toán */}
            <div className="xl:w-[60%] flex flex-col bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300 relative">
              
              {/* Nếu chưa thanh toán -> Hiện form thanh toán */}
              {(activeInvoice.status === 'Chưa thanh toán' || activeInvoice.status === 'Quá hạn') && (
                <div className="flex flex-col h-full">
                  {/* Process Tracker */}
                  <div className="bg-gray-50 p-6 border-b border-gray-100 shrink-0">
                    <div className="flex items-center justify-between max-w-sm mx-auto relative">
                      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 z-0"></div>
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#2563EB] z-0 w-1/2"></div>
                      
                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold shadow-sm border-2 border-white"><Check size={16}/></div>
                        <span className="text-[10px] font-bold text-gray-900 uppercase">Tạo HĐ</span>
                      </div>
                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-[#2563EB] border-2 border-[#2563EB] flex items-center justify-center font-bold shadow-sm">2</div>
                        <span className="text-[10px] font-bold text-[#2563EB] uppercase">Thanh toán</span>
                      </div>
                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white text-gray-300 border-2 border-gray-200 flex items-center justify-center font-bold shadow-sm">3</div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Hoàn tất</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                    
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-2xl font-black text-gray-900">Thanh toán Viện phí</h2>
                        <p className="text-gray-500 text-sm mt-1">Mã hóa đơn: <strong className="text-gray-900">{activeInvoice.id}</strong></p>
                      </div>
                      <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border flex items-center gap-1.5 ${activeInvoice.statusColor}`}>
                        <AlertCircle size={14}/> {activeInvoice.status}
                      </span>
                    </div>

                    {/* Bill breakdown */}
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-8">
                      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Chi tiết dịch vụ</h3>
                      <div className="space-y-3">
                        {activeInvoice.details.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-gray-700 font-medium">{item.name}</span>
                            <span className="font-bold text-gray-900">{item.price}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-dashed border-gray-300 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Tổng chi phí:</span>
                          <span className="font-bold text-gray-900">{activeInvoice.total} VNĐ</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-green-600 font-bold flex items-center gap-1"><ShieldCheck size={16}/> BHYT Hỗ trợ:</span>
                          <span className="font-bold text-green-600">- {activeInvoice.insurance} VNĐ</span>
                        </div>
                        <div className="flex justify-between items-end mt-2 pt-4 border-t border-gray-200">
                          <span className="font-bold text-gray-900 uppercase">Cần thanh toán:</span>
                          <span className="font-black text-2xl text-[#2563EB]">{activeInvoice.final} VNĐ</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Methods */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Phương thức thanh toán</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                        {[
                          { id: 'QR', label: 'QR Banking', icon: QrCode },
                          { id: 'CASH', label: 'Tiền mặt', icon: Banknote },
                          { id: 'CARD', label: 'Thẻ ATM', icon: CreditCard },
                          { id: 'EWALLET', label: 'Ví điện tử', icon: Wallet }
                        ].map(method => (
                          <div 
                            key={method.id}
                            onClick={() => setPaymentMethod(method.id)}
                            className={`border rounded-xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all text-center ${paymentMethod === method.id ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] shadow-sm ring-2 ring-blue-100' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                          >
                            <method.icon size={24}/>
                            <span className="text-xs font-bold">{method.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* Dynamic Payment Content */}
                      {paymentMethod === 'QR' && (
                        <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-8 animate-in fade-in">
                          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 shrink-0">
                            {/* Dummy QR Code */}
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=PAY_${activeInvoice.id}_${activeInvoice.final}`} alt="QR Code" className="w-40 h-40"/>
                          </div>
                          <div className="w-full text-center md:text-left">
                            <p className="text-sm text-gray-500 font-bold uppercase mb-1">Chuyển khoản ngân hàng</p>
                            <p className="text-lg font-black text-gray-900 mb-1">Ngân hàng TMCP Quân Đội (MB)</p>
                            <p className="text-gray-600 mb-1">STK: <strong className="text-gray-900 text-lg">0981 234 567</strong></p>
                            <p className="text-gray-600 mb-3">Chủ TK: <strong className="text-gray-900">BV HEALTHCARE</strong></p>
                            <div className="bg-blue-100/50 p-3 rounded-lg border border-blue-200 inline-block w-full">
                              <p className="text-xs text-gray-500 mb-1">Nội dung chuyển khoản:</p>
                              <p className="font-mono font-bold text-[#2563EB] tracking-wider text-center">{activeInvoice.id} NGUYEN VAN A</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentMethod === 'CASH' && (
                        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 text-center animate-in fade-in">
                          <Banknote size={48} className="text-orange-500 mx-auto mb-3 opacity-50"/>
                          <p className="font-bold text-gray-900 text-lg mb-2">Thanh toán tại quầy</p>
                          <p className="text-gray-600 text-sm">Vui lòng mang theo mã hóa đơn <strong className="text-gray-900">{activeInvoice.id}</strong> đến quầy Thu ngân tầng 1 để hoàn tất thủ tục thanh toán bằng tiền mặt.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 border-t border-gray-100 bg-white shrink-0 mt-auto">
                    <button className="w-full bg-[#2563EB] hover:bg-blue-700 text-white py-4 rounded-xl font-bold shadow-xl shadow-blue-200 transition-all flex justify-center items-center gap-2 text-lg">
                      Xác nhận đã thanh toán <ArrowRight size={20}/>
                    </button>
                  </div>
                </div>
              )}

              {/* Nếu Đã thanh toán -> Hiện Biên lai điện tử */}
              {activeInvoice.status === 'Đã thanh toán' && (
                <div className="flex flex-col h-full animate-in zoom-in-95 duration-300">
                  {/* Success Banner */}
                  <div className="bg-green-500 text-white p-6 shrink-0 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"><CheckCircle2 size={28}/></div>
                       <div>
                         <h2 className="text-xl font-black">Thanh toán thành công!</h2>
                         <p className="text-green-100 text-sm mt-0.5">Giao dịch đã được hệ thống ghi nhận.</p>
                       </div>
                     </div>
                     <div className="hidden sm:block">
                        <button className="bg-white text-green-700 px-4 py-2 rounded-xl font-bold shadow-sm transition flex items-center gap-2 text-sm hover:bg-green-50">
                          <Download size={16}/> Lưu Biên lai
                        </button>
                     </div>
                  </div>

                  {/* E-Receipt */}
                  <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-gray-50 flex items-center justify-center custom-scrollbar">
                    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200 relative">
                       {/* Receipt cuts (styling) */}
                       <div className="absolute -left-3 top-1/2 w-6 h-6 bg-gray-50 rounded-full border-r border-gray-200"></div>
                       <div className="absolute -right-3 top-1/2 w-6 h-6 bg-gray-50 rounded-full border-l border-gray-200"></div>
                       <div className="absolute left-6 right-6 top-1/2 border-t-2 border-dashed border-gray-200"></div>

                       <div className="text-center pb-8">
                         <div className="w-16 h-16 bg-blue-50 text-[#2563EB] rounded-2xl flex items-center justify-center mx-auto mb-4"><Activity size={32}/></div>
                         <h3 className="font-black text-gray-900 text-lg uppercase tracking-widest">Biên lai điện tử</h3>
                         <p className="text-gray-500 text-sm mt-1">Mã: BL-{activeInvoice.id}</p>
                       </div>

                       <div className="space-y-4 pt-8 text-sm">
                         <div className="flex justify-between border-b border-gray-100 pb-2">
                           <span className="text-gray-500">Khách hàng:</span>
                           <span className="font-bold text-gray-900">Nguyễn Văn A</span>
                         </div>
                         <div className="flex justify-between border-b border-gray-100 pb-2">
                           <span className="text-gray-500">Thời gian TT:</span>
                           <span className="font-bold text-gray-900">{activeInvoice.paymentDate}</span>
                         </div>
                         <div className="flex justify-between border-b border-gray-100 pb-2">
                           <span className="text-gray-500">Mã giao dịch:</span>
                           <span className="font-bold text-gray-900">{activeInvoice.paymentRef}</span>
                         </div>
                         <div className="flex justify-between border-b border-gray-100 pb-2">
                           <span className="text-gray-500">Dịch vụ:</span>
                           <span className="font-bold text-gray-900">Khám & Cấp thuốc</span>
                         </div>
                         <div className="flex justify-between items-end pt-2">
                           <span className="font-bold text-gray-900 uppercase">Tổng tiền:</span>
                           <span className="font-black text-2xl text-[#2563EB]">{activeInvoice.final} VNĐ</span>
                         </div>
                       </div>

                       <div className="mt-8 text-center">
                         <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=ValidReceipt" alt="Valid QR" className="mx-auto opacity-50 mb-2"/>
                         <p className="text-xs text-gray-400">Cảm ơn bạn đã sử dụng dịch vụ của HEALTHCARE.</p>
                       </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </main>

    </div>
  );
}