'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft, CalendarDays, Loader2, Wallet, Building2
} from 'lucide-react';
import { getPatientBillingData } from '@/app/patient/payments/invoices/actions';

export default function PatientBillingPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    const res = await getPatientBillingData();
    if (res.success && res.data) {
      setData(res.data);
    } else {
      router.push('/login');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [router]);

  if (isLoading || !data) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#2563EB] animate-spin" />
      </div>
    );
  }

  const { invoices } = data;
  const pendingInvoices = invoices.filter((inv: any) => inv.status === 'Chưa thanh toán' || inv.status === 'Quá hạn');

  return (
    <div className="w-full max-w-[1600px] xl:max-w-none mx-auto space-y-6">
      
      {/* Tiêu đề & Breadcrumb */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">Thanh toán viện phí</h1>
        <p className="text-gray-500 text-sm mt-1">Xem chi tiết và thanh toán các khoản phí khám chữa bệnh</p>
        
        <Link href="/patient/payments/history" className="inline-flex items-center gap-1 text-[#2563EB] text-sm font-bold mt-4 hover:underline">
          <ChevronLeft size={16} /> Xem lịch sử thanh toán
        </Link>
      </div>

      {/* DANH SÁCH CHỜ THANH TOÁN */}
      {pendingInvoices.length > 0 ? (
        <div className="animate-in fade-in duration-500">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Wallet size={20} className="text-[#2563EB]" /> Hóa đơn cần thanh toán ({pendingInvoices.length})
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {pendingInvoices.map((inv: any) => (
                <div 
                  key={inv.id} 
                  onClick={() => router.push(`/patient/payments/invoices/details?id=${inv.id}`)}
                  className="p-5 rounded-2xl border cursor-pointer transition-all duration-300 border-gray-200 bg-white hover:border-[#2563EB] hover:bg-blue-50/30 hover:shadow-md hover:scale-[1.02]"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-black text-gray-900">{inv.id}</span>
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${inv.status === 'Quá hạn' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>{inv.status}</span>
                  </div>
                  <div className="space-y-1.5 mb-4">
                    <p className="text-xs text-gray-500 flex items-center gap-1.5"><CalendarDays size={14}/> {inv.date}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1.5"><Building2 size={14}/> {inv.facility}</p>
                  </div>
                  <div className="pt-3 border-t border-gray-100/80">
                      <p className="text-[10px] text-gray-400 mb-0.5">Tổng thanh toán</p>
                      <p className="font-black text-[#2563EB] text-lg">{inv.final} ₫</p>
                  </div>
                </div>
            ))}
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