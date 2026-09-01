'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Bell, Search, User, Lock, ChevronLeft, CalendarDays,
  ShieldCheck, Loader2, Landmark, Wallet, Users, Info, Building2, ChevronRight, FileText
} from 'lucide-react';

import PatientSidebar from '@/app/patient/Sidebar';
import { getPatientBillingData, confirmInvoicePayment } from '@/app/patient/payments/invoices/actions';

export default function PatientBillingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramId = searchParams.get('id');
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsSubmitting] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'ONLINE' | 'BANK' | 'EWALLET' | 'COUNTER'>('ONLINE');

  const fetchData = async () => {
    setIsLoading(true);
    const res = await getPatientBillingData();
    if (res.success && res.data) {
      setData(res.data);
      // Select the invoice from query param, or fallback to the first unpaid invoice, or just the first invoice
      if (paramId) {
        setSelectedInvoiceId(paramId);
      } else {
        const unpaidInvoice = res.data.invoices.find((inv: any) => inv.status === 'Chưa thanh toán' || inv.status === 'Quá hạn');
        if (unpaidInvoice && !selectedInvoiceId) {
          setSelectedInvoiceId(unpaidInvoice.id);
        } else if (res.data.invoices.length > 0 && !selectedInvoiceId) {
          setSelectedInvoiceId(res.data.invoices[0].id);
        }
      }
    } else {
      router.push('/login');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [router]);

  useEffect(() => {
    if (paramId && data?.invoices?.find((i: any) => i.id === paramId)) {
      setSelectedInvoiceId(paramId);
    }
  }, [paramId, data]);

  const handleConfirmPayment = async (rawId: number) => {
    setIsSubmitting(true);
    const res = await confirmInvoicePayment(rawId);
    setIsSubmitting(false);

    if (res.success) {
      fetchData();
      alert("Thanh toán thành công!");
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

  const { patientInfo, invoices } = data;
  const activeInvoice = invoices.find((inv: any) => inv.id === selectedInvoiceId) || invoices[0];

  return (
    <div className="w-full max-w-[1600px] xl:max-w-none mx-auto space-y-6">
            
            {/* Tiêu đề & Breadcrumb */}
            <div>
              <h1 className="text-2xl font-black text-gray-900">Thanh toán viện phí</h1>
              <p className="text-gray-500 text-sm mt-1">Xem chi tiết và thanh toán các khoản phí khám chữa bệnh</p>
              
              <Link href="#" className="inline-flex items-center gap-1 text-[#2563EB] text-sm font-bold mt-4 hover:underline">
                <ChevronLeft size={16} /> Quay lại danh sách hóa đơn
              </Link>
            </div>

            {/* Danh sách hóa đơn */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-lg text-gray-900">Danh sách hóa đơn</h2>
              </div>
              
              <div className="overflow-x-auto rounded-lg border border-gray-100">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-500 bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-4 py-3 font-bold">Mã hóa đơn</th>
                      <th className="px-4 py-3 font-bold">Ngày tạo</th>
                      <th className="px-4 py-3 font-bold">Số tiền</th>
                      <th className="px-4 py-3 font-bold">Phương thức</th>
                      <th className="px-4 py-3 font-bold">Trạng thái</th>
                      <th className="px-4 py-3 font-bold text-center">Chi tiết</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {invoices.length > 0 ? (
                      invoices.map((inv: any, idx: number) => (
                        <tr 
                          key={idx} 
                          onClick={() => setSelectedInvoiceId(inv.id)}
                          className={`hover:bg-gray-50/50 transition-colors cursor-pointer ${selectedInvoiceId === inv.id ? 'bg-blue-50/50' : ''}`}
                        >
                          <td className="px-4 py-3.5 font-medium text-gray-900">{inv.id}</td>
                          <td className="px-4 py-3.5 text-gray-600">{inv.date}</td>
                          <td className="px-4 py-3.5 font-medium text-gray-900">{inv.final} ₫</td>
                          <td className="px-4 py-3.5 text-gray-600">{inv.paymentMethod || '-'}</td>
                          <td className="px-4 py-3.5">
                            <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${inv.status === 'Chưa thanh toán' || inv.status === 'Quá hạn' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                              {inv.status}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-center">
                            <button className={`p-1.5 rounded-lg transition-colors inline-flex ${selectedInvoiceId === inv.id ? 'text-[#2563EB] bg-blue-100' : 'text-gray-400 hover:text-[#2563EB] hover:bg-blue-50'}`}>
                              <FileText size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                          Bạn không có hóa đơn nào.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {activeInvoice ? (
              <div className="grid xl:grid-cols-3 gap-6">
                
                {/* Cột Trái: Chi tiết hóa đơn */}
                <div className="xl:col-span-2 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                      <h2 className="font-bold text-lg text-gray-900">Chi tiết hóa đơn</h2>
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${activeInvoice.status === 'Chưa thanh toán' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {activeInvoice.status}
                      </span>
                    </div>

                    {/* Metadata Hóa đơn */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div>
                        <p className="text-xs text-gray-500 flex items-center gap-1.5 mb-1"><FileText size={14}/> Mã hóa đơn</p>
                        <p className="font-bold text-gray-900">{activeInvoice.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 flex items-center gap-1.5 mb-1"><CalendarDays size={14}/> Ngày tạo</p>
                        <p className="font-bold text-gray-900">{activeInvoice.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 flex items-center gap-1.5 mb-1"><CalendarDays size={14}/> Ngày hết hạn</p>
                        <p className="font-bold text-red-500">27/05/2025</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 flex items-center gap-1.5 mb-1"><Building2 size={14}/> Cơ sở khám</p>
                        <p className="font-bold text-gray-900">Phòng khám MediCare</p>
                      </div>
                    </div>

                    {/* Bệnh nhân & Bác sĩ */}
                    <div className="flex flex-col gap-4 mb-8 bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
                      
                      <div className="flex items-start gap-4 pb-4 border-b border-blue-100/50">
                        <div className="p-2.5 bg-blue-100 text-[#2563EB] rounded-lg mt-0.5 shrink-0"><User size={20} /></div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full text-sm">
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Họ và tên bệnh nhân</p>
                            <p className="font-bold text-gray-900">{patientInfo.name}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Mã bệnh nhân</p>
                            <p className="font-bold text-gray-900">{patientInfo.code}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Ngày sinh</p>
                            <p className="font-bold text-gray-900">12/05/1995</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Giới tính</p>
                            <p className="font-bold text-gray-900">Nam</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-lg mt-0.5 shrink-0"><Users size={20} /></div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full text-sm">
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Bác sĩ điều trị</p>
                            <p className="font-bold text-gray-900">BS. Trần Minh Đức</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Chuyên khoa</p>
                            <p className="font-bold text-gray-900">Nội tổng quát</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Ngày khám</p>
                            <p className="font-bold text-gray-900">{activeInvoice.date}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Số hồ sơ</p>
                            <p className="font-bold text-gray-900">HS{activeInvoice.id.replace('HD', '')}</p>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Danh sách dịch vụ */}
                    <div className="mb-6">
                      <h3 className="font-bold text-gray-900 mb-3">Danh sách dịch vụ</h3>
                      <div className="overflow-x-auto rounded-lg border border-gray-100">
                        <table className="w-full text-sm text-left">
                          <thead className="text-xs text-gray-500 bg-gray-50 border-b border-gray-100">
                            <tr>
                              <th className="px-4 py-3 font-bold">STT</th>
                              <th className="px-4 py-3 font-bold">Dịch vụ</th>
                              <th className="px-4 py-3 font-bold text-right">Đơn giá</th>
                              <th className="px-4 py-3 font-bold text-center">Số lượng</th>
                              <th className="px-4 py-3 font-bold text-right">Thành tiền</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50">
                            {activeInvoice.details?.length > 0 ? (
                              activeInvoice.details.map((item: any, idx: number) => (
                                <tr key={idx} className="hover:bg-gray-50/50">
                                  <td className="px-4 py-3 text-gray-500">{idx + 1}</td>
                                  <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                                  <td className="px-4 py-3 text-right">{item.price} ₫</td>
                                  <td className="px-4 py-3 text-center">1</td>
                                  <td className="px-4 py-3 text-right font-medium">{item.price} ₫</td>
                                </tr>
                              ))
                            ) : (
                                <tr className="hover:bg-gray-50/50">
                                  <td className="px-4 py-3 text-gray-500">1</td>
                                  <td className="px-4 py-3 font-medium text-gray-900">Khám bệnh & Thuốc</td>
                                  <td className="px-4 py-3 text-right">{activeInvoice.total} ₫</td>
                                  <td className="px-4 py-3 text-center">1</td>
                                  <td className="px-4 py-3 text-right font-medium">{activeInvoice.total} ₫</td>
                                </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="flex flex-col items-end gap-2 text-sm pt-4 border-t border-gray-100">
                      <div className="flex justify-between w-full md:w-64">
                        <span className="text-gray-500">Tổng tiền dịch vụ</span>
                        <span className="font-bold text-gray-900">{activeInvoice.total} ₫</span>
                      </div>
                      <div className="flex justify-between w-full md:w-64">
                        <span className="text-gray-500">Giảm giá</span>
                        <span className="font-bold text-green-600">- {activeInvoice.insurance} ₫</span>
                      </div>
                      <div className="flex justify-between w-full md:w-64 pt-2 border-t border-gray-100">
                        <span className="font-bold text-gray-900 text-base">Tổng thanh toán</span>
                        <span className="font-black text-xl text-[#2563EB]">{activeInvoice.final} ₫</span>
                      </div>
                    </div>

                    {/* Warning Note */}
                    <div className="mt-6 flex items-start gap-2 text-sm text-[#2563EB] bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                      <Info size={16} className="mt-0.5 shrink-0" />
                      <p>Vui lòng thanh toán trước <strong className="font-bold">27/05/2025 10:30</strong> để tránh hóa đơn quá hạn.</p>
                    </div>

                  </div>
                </div>

                {/* Cột Phải: Thanh toán */}
                <div className="xl:col-span-1 animate-in fade-in slide-in-from-right-4 duration-500 delay-100">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-6">
                    <h2 className="font-bold text-gray-900 mb-2">Số tiền cần thanh toán</h2>
                    <p className="font-black text-3xl xl:text-4xl text-[#2563EB] mb-6">{activeInvoice.final} <span className="text-2xl">₫</span></p>

                    <h3 className="font-bold text-gray-900 text-sm mb-3">Chọn phương thức thanh toán</h3>
                    
                    <div className="space-y-3 mb-6">
                      
                      {/* Phương thức 1 */}
                      <label className={`flex gap-3 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'ONLINE' ? 'border-[#2563EB] bg-blue-50/50 shadow-sm ring-1 ring-blue-100' : 'border-gray-200 hover:border-blue-300'}`}>
                        <div className="pt-0.5">
                          <input type="radio" name="paymentMethod" className="w-4 h-4 text-[#2563EB]" checked={paymentMethod === 'ONLINE'} onChange={() => setPaymentMethod('ONLINE')} />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-900 text-sm">Thanh toán online</p>
                          <p className="text-xs text-gray-500 mt-1 leading-relaxed">Thanh toán qua thẻ ATM, Visa, MasterCard, JCB</p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          {/* Fake logos */}
                          <div className="h-5 w-7 bg-[#1434CB] rounded flex items-center justify-center text-[9px] text-white font-bold italic">VISA</div>
                          <div className="h-5 w-7 bg-red-500 rounded flex items-center justify-center text-[9px] text-white font-bold">MC</div>
                        </div>
                      </label>

                      {/* Phương thức 2 */}
                      <label className={`flex gap-3 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'BANK' ? 'border-[#2563EB] bg-blue-50/50 shadow-sm ring-1 ring-blue-100' : 'border-gray-200 hover:border-blue-300'}`}>
                        <div className="pt-0.5">
                          <input type="radio" name="paymentMethod" className="w-4 h-4 text-[#2563EB]" checked={paymentMethod === 'BANK'} onChange={() => setPaymentMethod('BANK')} />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-900 text-sm">Chuyển khoản ngân hàng</p>
                          <p className="text-xs text-gray-500 mt-1 leading-relaxed">Chuyển khoản qua tài khoản của phòng khám</p>
                        </div>
                        <div className="flex items-center text-[#2563EB]">
                          <Landmark size={24} />
                        </div>
                      </label>

                      {/* Phương thức 3 */}
                      <label className={`flex gap-3 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'EWALLET' ? 'border-[#2563EB] bg-blue-50/50 shadow-sm ring-1 ring-blue-100' : 'border-gray-200 hover:border-blue-300'}`}>
                        <div className="pt-0.5">
                          <input type="radio" name="paymentMethod" className="w-4 h-4 text-[#2563EB]" checked={paymentMethod === 'EWALLET'} onChange={() => setPaymentMethod('EWALLET')} />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-900 text-sm">Ví điện tử</p>
                          <p className="text-xs text-gray-500 mt-1 leading-relaxed">Thanh toán qua MoMo, ZaloPay, VNPay</p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <div className="h-6 w-6 bg-[#A50064] rounded-md flex items-center justify-center text-[9px] text-white font-bold">mo</div>
                          <div className="h-6 w-6 bg-[#0068FF] rounded-md flex items-center justify-center text-[9px] text-white font-bold">Zalo</div>
                        </div>
                      </label>

                      {/* Phương thức 4 */}
                      <label className={`flex gap-3 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'COUNTER' ? 'border-[#2563EB] bg-blue-50/50 shadow-sm ring-1 ring-blue-100' : 'border-gray-200 hover:border-blue-300'}`}>
                        <div className="pt-0.5">
                          <input type="radio" name="paymentMethod" className="w-4 h-4 text-[#2563EB]" checked={paymentMethod === 'COUNTER'} onChange={() => setPaymentMethod('COUNTER')} />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-900 text-sm">Thanh toán tại quầy</p>
                          <p className="text-xs text-gray-500 mt-1 leading-relaxed">Thanh toán trực tiếp tại quầy lễ tân</p>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <Users size={24} />
                        </div>
                      </label>

                    </div>

                    <button
                      disabled={isProcessing || activeInvoice.status === 'Đã thanh toán'}
                      onClick={() => handleConfirmPayment(activeInvoice.rawId)}
                      className="w-full bg-[#2563EB] hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all flex justify-center items-center gap-2 disabled:opacity-50"
                    >
                      {isProcessing ? <Loader2 size={18} className="animate-spin" /> : <Lock size={18} />} 
                      {activeInvoice.status === 'Đã thanh toán' ? 'Hóa đơn đã thanh toán' : 'Thanh toán ngay'}
                    </button>
                    
                    <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-gray-500 text-center">
                      <ShieldCheck size={14} /> Thông tin thanh toán của bạn được bảo mật tuyệt đối.
                    </div>

                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center animate-in fade-in duration-500">
                <Wallet size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium">Bạn không có hóa đơn nào đang chờ thanh toán.</p>
              </div>
            )}

    </div>
  );
}