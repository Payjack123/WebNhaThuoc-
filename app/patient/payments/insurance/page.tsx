'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search, Bell, ChevronDown, Download, RotateCcw,
  Info, Plus, CreditCard, Receipt, FileText, CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import PatientSidebar from '@/app/patient/Sidebar';
import { getInsuranceData } from '@/app/patient/payments/insurance/actions';

export default function InsurancePage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Patient mock info since it's not coming from insurance actions specifically here,
  // we'll mock the header patient info or we can fetch it but for simplicity:
  const patientInfo = {
    name: 'Nguyễn Văn An',
    code: 'BN0012345',
    avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+An&background=2563EB&color=fff'
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getInsuranceData();
      if (res.success && res.data) {
        setData(res.data);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="w-10 h-10 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const { insuranceInfo, usageHistory, overview } = data;

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] font-sans text-gray-800 overflow-hidden">
      
      {/* SIDEBAR */}
      <PatientSidebar activePage="insurance" />

      {/* MAIN CONTENT AREA */}
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
            <div className="flex items-center gap-3 pl-5 border-l border-gray-200 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900 group-hover:text-[#2563EB] transition">{patientInfo.name}</p>
                <p className="text-xs text-gray-500 font-medium">{patientInfo.code}</p>
              </div>
              <img src={patientInfo.avatar} alt="Avatar" className="w-11 h-11 rounded-full border-2 border-white shadow-sm group-hover:shadow-md transition" />
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <div className="w-full max-w-[1400px] xl:max-w-none mx-auto space-y-6">
            
            {/* Tiêu đề */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-black text-gray-900">Bảo hiểm y tế</h1>
                <p className="text-gray-500 text-sm mt-1">Thông tin thẻ bảo hiểm y tế và lịch sử sử dụng.</p>
              </div>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] text-white rounded-xl text-sm font-bold hover:bg-blue-600 shadow-sm transition">
                <Plus size={18} /> Thêm thẻ BHYT
              </button>
            </div>

            {/* Hàng 1: Thẻ BHYT & Thông chi tiết */}
            <div className="flex flex-col xl:flex-row gap-6">
              
              {/* KHỐI TRÁI: Thẻ BHYT */}
              <div className="xl:w-[540px] shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between">
                <h2 className="font-bold text-gray-900 mb-6 text-base">Thông tin thẻ bảo hiểm y tế</h2>
                
                {/* Thiết kế Thẻ BHYT Điện tử */}
                <div className="relative overflow-hidden rounded-xl border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-white shadow-inner p-5 aspect-[1.6/1] flex flex-col mb-6">
                  {/* Pattern background */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3"></div>
                  
                  {/* Header Thẻ */}
                  <div className="flex items-center gap-4 relative z-10 mb-5">
                    <div className="w-14 h-14 bg-white rounded-full border border-blue-200 shadow-sm flex items-center justify-center text-blue-600 shrink-0">
                      <ShieldCheck size={32} />
                    </div>
                    <div className="text-center w-full pr-14">
                      <p className="text-[#2563EB] font-black uppercase text-sm tracking-wide">Bảo hiểm xã hội Việt Nam</p>
                      <p className="text-red-600 font-black uppercase text-lg mt-0.5 tracking-wider">Thẻ bảo hiểm y tế</p>
                    </div>
                  </div>

                  {/* Nội dung Thẻ */}
                  <div className="flex gap-5 relative z-10 flex-1 items-start">
                    <div className="w-24 h-24 bg-white p-1 rounded-lg border border-gray-200 shadow-sm shrink-0">
                      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BHYT_${insuranceInfo.insuranceNumber}`} alt="QR Code" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-2 text-[13px]">
                      <div className="flex"><span className="text-gray-600 font-medium w-28">Mã số BHXH:</span> <span className="font-bold text-gray-900">{insuranceInfo.insuranceNumber}</span></div>
                      <div className="flex"><span className="text-gray-600 font-medium w-28">Họ và tên:</span> <span className="font-black text-gray-900 uppercase">{insuranceInfo.fullName}</span></div>
                      <div className="flex gap-4">
                        <div className="flex"><span className="text-gray-600 font-medium mr-2">Ngày sinh:</span> <span className="font-bold text-gray-900">{insuranceInfo.dob}</span></div>
                        <div className="flex"><span className="text-gray-600 font-medium mr-2">Giới tính:</span> <span className="font-bold text-gray-900">{insuranceInfo.gender}</span></div>
                      </div>
                      <div className="flex items-start"><span className="text-gray-600 font-medium w-28 shrink-0">Nơi ĐK KCB BĐ:</span> <span className="font-bold text-gray-900 line-clamp-2">{insuranceInfo.registrationPlace}</span></div>
                      <div className="flex"><span className="text-gray-600 font-medium w-28">Mã thẻ:</span> <span className="font-black text-gray-900 tracking-wider text-sm">{insuranceInfo.cardNumber}</span></div>
                      <div className="flex items-start"><span className="text-gray-600 font-medium w-28 shrink-0">Giá trị sử dụng:</span> <span className="font-bold text-gray-900">từ {insuranceInfo.validFrom} đến {insuranceInfo.validTo}</span></div>
                    </div>
                  </div>

                  <div className="text-right text-[11px] text-gray-500 font-medium mt-auto relative z-10 pt-3 border-t border-blue-100/50">
                    Ngày cấp: {insuranceInfo.issueDate}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-blue-200 text-[#2563EB] rounded-xl text-sm font-bold bg-white hover:bg-blue-50 transition shadow-sm">
                    <Download size={16} /> Tải thẻ BHYT
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-blue-200 text-[#2563EB] rounded-xl text-sm font-bold bg-white hover:bg-blue-50 transition shadow-sm">
                    <RotateCcw size={16} /> Xem thẻ (mặt sau)
                  </button>
                </div>
              </div>

              {/* KHỐI PHẢI: Thông tin chi tiết */}
              <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 xl:p-8">
                <h2 className="font-bold text-gray-900 mb-6 text-base">Thông tin chi tiết</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2.5 border-b border-gray-50 text-sm">
                    <span className="text-gray-500 font-medium">Mã số BHXH</span>
                    <span className="font-bold text-gray-900">{insuranceInfo.insuranceNumber}</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-gray-50 text-sm">
                    <span className="text-gray-500 font-medium">Mã thẻ BHYT</span>
                    <span className="font-bold text-gray-900 tracking-wide">{insuranceInfo.cardNumber}</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-gray-50 text-sm">
                    <span className="text-gray-500 font-medium">Họ và tên</span>
                    <span className="font-bold text-gray-900 uppercase">{insuranceInfo.fullName}</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-gray-50 text-sm">
                    <span className="text-gray-500 font-medium">Ngày sinh</span>
                    <span className="font-bold text-gray-900">{insuranceInfo.dob}</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-gray-50 text-sm">
                    <span className="text-gray-500 font-medium">Giới tính</span>
                    <span className="font-bold text-gray-900">{insuranceInfo.gender}</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-gray-50 text-sm">
                    <span className="text-gray-500 font-medium">Nơi đăng ký KCB ban đầu</span>
                    <span className="font-bold text-gray-900">{insuranceInfo.registrationPlace}</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-gray-50 text-sm">
                    <span className="text-gray-500 font-medium">Địa chỉ</span>
                    <span className="font-bold text-gray-900">{insuranceInfo.address}</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-gray-50 text-sm">
                    <span className="text-gray-500 font-medium">Giá trị sử dụng</span>
                    <span className="font-bold text-gray-900">{insuranceInfo.validFrom} - {insuranceInfo.validTo}</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-gray-50 text-sm">
                    <span className="text-gray-500 font-medium">Tuyến hưởng</span>
                    <span className="font-bold text-gray-900">{insuranceInfo.coverageLevel}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 text-sm pt-2">
                    <span className="text-gray-500 font-medium">Trạng thái</span>
                    <span className="px-3.5 py-1.5 bg-green-100 text-green-700 font-bold rounded-lg text-xs">{insuranceInfo.status}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Hàng 2: Lịch sử & Tổng quan */}
            <div className="flex flex-col xl:flex-row gap-6 mt-6">
              
              {/* Bảng Lịch sử sử dụng BHYT */}
              <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
                <h2 className="font-bold text-gray-900 mb-6 text-base">Lịch sử sử dụng BHYT</h2>
                <div className="overflow-x-auto flex-1">
                  <table className="w-full text-sm text-left whitespace-nowrap">
                    <thead className="text-[11px] text-gray-500 bg-gray-50 border-b border-gray-100 uppercase tracking-wider">
                      <tr>
                        <th className="px-5 py-4 font-bold">Ngày khám</th>
                        <th className="px-5 py-4 font-bold">Cơ sở khám chữa bệnh</th>
                        <th className="px-5 py-4 font-bold">Dịch vụ khám</th>
                        <th className="px-5 py-4 font-bold text-right">Tổng chi phí</th>
                        <th className="px-5 py-4 font-bold text-right">BHYT thanh toán</th>
                        <th className="px-5 py-4 font-bold text-right">Bệnh nhân thanh toán</th>
                        <th className="px-5 py-4 font-bold text-center">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {usageHistory.map((item: any) => (
                        <tr key={item.id} className="hover:bg-gray-50/50">
                          <td className="px-5 py-4 text-gray-600 font-medium">{item.date}</td>
                          <td className="px-5 py-4 font-bold text-gray-900">{item.clinic}</td>
                          <td className="px-5 py-4 text-gray-600 font-medium">{item.service}</td>
                          <td className="px-5 py-4 text-gray-900 font-bold text-right">{item.totalCost}</td>
                          <td className="px-5 py-4 text-green-600 font-bold text-right">{item.insurancePaid}</td>
                          <td className="px-5 py-4 text-[#2563EB] font-bold text-right">{item.patientPaid}</td>
                          <td className="px-5 py-4 text-center">
                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border inline-block ${item.statusColor}`}>{item.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                  <button className="px-6 py-2 border border-[#2563EB] text-[#2563EB] bg-white rounded-xl text-sm font-bold shadow-sm hover:bg-blue-50 transition inline-flex items-center gap-2">
                    Xem tất cả lịch sử <ChevronDown size={16} />
                  </button>
                </div>
              </div>

              {/* Thống kê sử dụng */}
              <div className="xl:w-[420px] shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-bold text-gray-900 text-base">Tổng quan sử dụng trong năm</h2>
                  <div className="relative">
                    <select className="pl-4 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none appearance-none font-bold text-sm text-gray-700">
                      <option>Năm {overview.year}</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-5">
                  
                  {/* Card Tổng chi phí */}
                  <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-5 flex items-center gap-5">
                    <div className="w-14 h-14 bg-blue-100/50 text-[#2563EB] rounded-xl flex items-center justify-center shrink-0">
                      <Receipt size={28} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">Tổng chi phí</p>
                      <p className="text-2xl font-black text-gray-900">{overview.totalCost}</p>
                    </div>
                  </div>

                  {/* 2 Card nhỏ */}
                  <div className="grid grid-cols-2 gap-5">
                    <div className="bg-green-50/50 border border-green-100 rounded-xl p-5 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-green-600 mb-1">
                        <CheckCircle2 size={18} />
                        <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wide">BHYT thanh toán</span>
                      </div>
                      <p className="text-xl font-black text-green-600">{overview.insurancePaid}</p>
                    </div>
                    
                    <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[#2563EB] mb-1">
                        <FileText size={18} />
                        <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wide">Bạn đã thanh toán</span>
                      </div>
                      <p className="text-xl font-black text-[#2563EB]">{overview.patientPaid}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <p className="font-bold text-gray-900 mb-2">Tỉ lệ thanh toán của BHYT</p>
                    <p className="text-4xl font-black text-gray-900 mb-4">{overview.coverageRatio}%</p>
                    <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full rounded-full" style={{ width: `${overview.coverageRatio}%` }}></div>
                    </div>
                    <p className="text-[11px] font-bold text-gray-500 mt-3 text-center uppercase tracking-wider">({overview.coverageRatio}% chi phí được bảo hiểm)</p>
                  </div>

                </div>
              </div>

            </div>

            {/* Lưu ý */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 flex gap-4 mt-6">
              <div className="text-[#2563EB] mt-0.5"><Info size={20} /></div>
              <div>
                <h3 className="font-bold text-[#2563EB] mb-1 text-sm">Lưu ý</h3>
                <p className="text-sm text-gray-700 font-medium leading-relaxed">Thông tin thẻ BHYT được cập nhật từ hệ thống Bảo hiểm xã hội Việt Nam. Vui lòng liên hệ cơ sở khám chữa bệnh nếu có sai sót.</p>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
