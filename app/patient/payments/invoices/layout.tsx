'use client';
import React, { useState, useEffect } from 'react';
import { Bell, Search } from 'lucide-react';
import PatientSidebar from '@/app/patient/Sidebar';
import { getPatientBillingData } from '@/app/patient/payments/invoices/actions';
import { useRouter } from 'next/navigation';

export default function InvoicesLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [patientInfo, setPatientInfo] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getPatientBillingData();
      if (res.success && res.data) {
        setPatientInfo(res.data.patientInfo);
      } else {
        router.push('/login');
      }
    };
    fetchUser();
  }, [router]);

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] font-sans text-gray-800 overflow-hidden">
      <PatientSidebar activePage="invoices" />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* TOP HEADER */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-10">
          <div className="flex items-center w-full max-w-xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Tìm bác sĩ, chuyên khoa, dịch vụ..." 
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] focus:bg-white outline-none transition-all shadow-sm"
            />
          </div>
          <div className="flex items-center gap-5 ml-auto">
            <button className="relative p-2.5 text-gray-500 hover:bg-blue-50 hover:text-[#2563EB] rounded-full transition bg-white border border-gray-200 shadow-sm">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            {patientInfo && (
              <div className="flex items-center gap-3 pl-5 border-l border-gray-200 cursor-pointer group">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-gray-900 group-hover:text-[#2563EB] transition">{patientInfo.name}</p>
                  <p className="text-xs text-gray-500 font-medium">{patientInfo.code}</p>
                </div>
                <img src={patientInfo.avatar} alt="Avatar" className="w-11 h-11 rounded-full border-2 border-white shadow-sm group-hover:shadow-md transition" />
              </div>
            )}
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
