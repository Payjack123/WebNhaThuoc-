'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, Calendar, Phone, Fingerprint, Activity, Users,
  Stethoscope, MapPin, Check, Info, CheckCircle2, Ticket,
  Printer, ArrowRight, RotateCw, Clock, User, Loader2
} from 'lucide-react';
import Link from 'next/link';
import { searchAppointment, confirmCheckIn, getQueueAndHistory } from './actions';

export default function CheckInPage() {
  const [searchType, setSearchType] = useState('Mã lịch hẹn');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [appointments, setAppointments] = useState<any[]>([]);
  const [selectedAppId, setSelectedAppId] = useState<number | null>(null);
  const appointment = appointments.find(a => a.id === selectedAppId);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  
  const [queue, setQueue] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [isQueueLoading, setIsQueueLoading] = useState(true);

  // Load queue on mount
  useEffect(() => {
    loadSidebarData();
  }, []);

  const loadSidebarData = async () => {
    setIsQueueLoading(true);
    const res = await getQueueAndHistory();
    if (res.success && res.data) {
      setQueue(res.data.queue);
      setHistory(res.data.history);
    }
    setIsQueueLoading(false);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Vui lòng nhập thông tin tìm kiếm.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setSuccessMsg('');
    setAppointments([]);
    setSelectedAppId(null);

    const res = await searchAppointment(searchQuery, searchType);
    
    if (res.success && res.data && res.data.length > 0) {
      setAppointments(res.data);
      setSelectedAppId(res.data[0].id);
    } else {
      setError(res.error || 'Có lỗi xảy ra.');
    }
    
    setIsLoading(false);
  };

  const handleCheckIn = async () => {
    if (!appointment) return;
    
    setIsCheckingIn(true);
    setError('');
    
    const res = await confirmCheckIn(appointment.id);
    
    if (res.success) {
      setSuccessMsg('Check-in thành công!');
      // Update local state to reflect change
      setAppointments(appointments.map(a => a.id === appointment.id ? { ...a, status: 'ĐÃ XÁC NHẬN' } : a));
      // Reload sidebar
      await loadSidebarData();
    } else {
      setError(res.error || 'Có lỗi xảy ra khi check-in.');
    }
    
    setIsCheckingIn(false);
  };

  return (
    <div className="space-y-6 pb-10">
      
      {/* Page Header */}
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Check-in bệnh nhân</h1>
        <p className="text-sm text-gray-500">Tìm kiếm và check-in bệnh nhân đến khám</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN (approx 8/12) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. Tìm kiếm bệnh nhân / lịch hẹn */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-800 text-lg mb-4">1. Tìm kiếm bệnh nhân / lịch hẹn</h3>
            
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder={`Nhập ${searchType.toLowerCase()}...`}
                />
              </div>
              <button 
                onClick={handleSearch}
                disabled={isLoading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors whitespace-nowrap disabled:bg-blue-400 flex items-center gap-2"
              >
                {isLoading && <Loader2 size={16} className="animate-spin" />}
                Tìm kiếm
              </button>
            </div>
            
            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
            {successMsg && <p className="text-green-600 text-sm mt-3 font-medium">{successMsg}</p>}
          </div>

          {/* 2. Thông tin lịch hẹn */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 opacity-100 transition-opacity">
            <h3 className="font-bold text-gray-800 text-lg mb-6">2. Thông tin lịch hẹn</h3>
            
            {!appointment ? (
              <div className="text-center py-10 text-gray-400 border-2 border-dashed border-gray-100 rounded-xl">
                <Search size={32} className="mx-auto mb-3 text-gray-300" />
                <p>Nhập thông tin tìm kiếm để hiển thị lịch hẹn</p>
              </div>
            ) : (
              <>
                {/* Selector for multiple appointments */}
                {appointments.length > 1 && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                    <p className="text-sm text-blue-800 font-medium mb-3">Tìm thấy {appointments.length} lịch hẹn. Vui lòng chọn lịch hẹn cần thao tác:</p>
                    <div className="flex flex-wrap gap-3">
                      {appointments.map(a => (
                        <button
                          key={a.id}
                          onClick={() => setSelectedAppId(a.id)}
                          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors border ${
                            selectedAppId === a.id
                              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex flex-col items-start">
                            <span>{a.bookingDate} {a.bookingTime}</span>
                            <span className="text-xs opacity-80 font-normal">{a.specialty}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Patient Profile Card */}
                <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-5 mb-6 flex items-start gap-5">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 font-bold text-xl border-2 border-white shadow-sm overflow-hidden">
                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(appointment.patientName)}&background=eff6ff&color=2563eb`} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-bold text-xl text-gray-800">{appointment.patientName}</h4>
                      {appointment.status === 'CHỜ XÁC NHẬN' && <span className="px-2.5 py-1 bg-green-50 text-green-600 rounded-md text-xs font-semibold border border-green-100">Lịch hẹn hợp lệ</span>}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                      <div>
                        <div className="text-xs text-gray-500 flex items-center gap-1.5 mb-1"><User size={14} /> Mã bệnh nhân</div>
                        <div className="font-semibold text-gray-800 text-sm">{appointment.patientCode}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 flex items-center gap-1.5 mb-1"><Calendar size={14} /> Ngày sinh</div>
                        <div className="font-semibold text-gray-800 text-sm">{appointment.dob}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 flex items-center gap-1.5 mb-1"><Activity size={14} /> Giới tính</div>
                        <div className="font-semibold text-gray-800 text-sm">{appointment.gender}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 flex items-center gap-1.5 mb-1"><Phone size={14} /> Số điện thoại</div>
                        <div className="font-semibold text-gray-800 text-sm">{appointment.phone}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Appointment Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-gray-100 pb-6 mb-6">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Mã lịch hẹn</div>
                    <div className="font-bold text-gray-800">{appointment.appointmentCode}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Ngày khám</div>
                    <div className="font-bold text-gray-800">{appointment.bookingDate}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Khung giờ</div>
                    <div className="font-bold text-gray-800">{appointment.bookingTime}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Tình trạng</div>
                    {appointment.status === 'CHỜ XÁC NHẬN' && <span className="inline-block px-3 py-1 bg-orange-50 text-orange-600 rounded-md text-xs font-semibold border border-orange-100">Chưa check-in</span>}
                    {appointment.status === 'ĐÃ XÁC NHẬN' && <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-semibold border border-blue-100">Đã check-in</span>}
                    {(appointment.status !== 'CHỜ XÁC NHẬN' && appointment.status !== 'ĐÃ XÁC NHẬN') && <span className="inline-block px-3 py-1 bg-gray-50 text-gray-600 rounded-md text-xs font-semibold border border-gray-200">{appointment.status}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="col-span-1 md:col-span-1 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 overflow-hidden">
                      <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(appointment.doctorName)}&background=eff6ff&color=2563eb`} alt="Doctor" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">Bác sĩ</div>
                      <div className="font-semibold text-gray-800 text-sm">{appointment.doctorName}</div>
                      <div className="text-xs text-gray-500">{appointment.specialty}</div>
                    </div>
                  </div>
                  
                  <div className="col-span-1 md:col-span-1 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">Phòng khám</div>
                      <div className="font-semibold text-gray-800 text-sm">{appointment.room}</div>
                    </div>
                  </div>

                  <div className="col-span-1 md:col-span-1">
                    <div className="text-xs text-gray-500 mb-1">BHYT</div>
                    <div className="font-semibold text-gray-800 text-sm mt-2">{appointment.bhyt}</div>
                  </div>

                  <div className="col-span-1 md:col-span-1">
                    <div className="text-xs text-gray-500 mb-1">Ngày tạo</div>
                    <div className="font-semibold text-gray-800 text-sm mt-2">{appointment.createdAt}</div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 3. Xác nhận check-in */}
          {appointment && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fade-in">
              <h3 className="font-bold text-gray-800 text-lg mb-6">3. Xác nhận check-in</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Checklist */}
                <div className="space-y-3">
                  <p className="font-semibold text-gray-800 text-sm mb-2">Xác nhận thông tin</p>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Thông tin bệnh nhân khớp với lịch hẹn</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Lịch hẹn còn hiệu lực trong ngày</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Bệnh nhân chưa check-in trước đó</span>
                  </div>
                </div>
                
                {/* Warning/Notes box */}
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                  <div className="flex items-center gap-2 text-orange-700 font-semibold mb-3">
                    <Info size={18} /> Lưu ý
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                    <li>Vui lòng xác nhận đã kiểm tra CCCD/BHYT (nếu có)</li>
                    <li>Sau khi check-in, hệ thống sẽ cấp số thứ tự tự động</li>
                    <li>Bệnh nhân sẽ được đưa vào hàng đợi khám</li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={handleCheckIn}
                  disabled={isCheckingIn || appointment.status !== 'CHỜ XÁC NHẬN'}
                  className={`flex items-center justify-center gap-2 w-full md:w-auto px-12 py-4 text-white font-bold rounded-xl text-lg transition-colors shadow-md ${
                    appointment.status !== 'CHỜ XÁC NHẬN' 
                      ? 'bg-gray-400 cursor-not-allowed shadow-none' 
                      : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
                  }`}
                >
                  {isCheckingIn ? <Loader2 size={24} className="animate-spin" /> : <Check size={24} />}
                  {appointment.status !== 'CHỜ XÁC NHẬN' ? 'ĐÃ CHECK-IN' : 'Xác nhận CHECK-IN'}
                </button>
              </div>
            </div>
          )}

          {/* Workflow Diagram */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between overflow-x-auto">
            <div className="flex items-center gap-4 flex-shrink-0 pr-8 border-r border-gray-100 mr-8">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <Printer size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Sau khi check-in thành công</h4>
                <p className="text-xs text-gray-500 mt-0.5">Hệ thống sẽ tự động cấp số thứ tự và in phiếu cho bệnh nhân.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 flex-shrink-0 text-sm font-medium">
              <div className="flex flex-col items-center gap-2 text-blue-600">
                <div className="w-10 h-10 rounded-full border-2 border-blue-600 bg-blue-50 flex items-center justify-center"><User size={18} /></div>
                <span>1. Check-in</span>
              </div>
              <ArrowRight className="text-gray-300" size={16} />
              <div className="flex flex-col items-center gap-2 text-green-500">
                <div className="w-10 h-10 rounded-full border-2 border-green-500 bg-green-50 flex items-center justify-center"><Ticket size={18} /></div>
                <span>2. Cấp số thứ tự</span>
              </div>
              <ArrowRight className="text-gray-300" size={16} />
              <div className="flex flex-col items-center gap-2 text-purple-500">
                <div className="w-10 h-10 rounded-full border-2 border-purple-500 bg-purple-50 flex items-center justify-center"><Printer size={18} /></div>
                <span>3. In phiếu</span>
              </div>
              <ArrowRight className="text-gray-300" size={16} />
              <div className="flex flex-col items-center gap-2 text-orange-500">
                <div className="w-10 h-10 rounded-full border-2 border-orange-500 bg-orange-50 flex items-center justify-center"><Users size={18} /></div>
                <span>4. Hàng đợi</span>
              </div>
              <ArrowRight className="text-gray-300" size={16} />
              <div className="flex flex-col items-center gap-2 text-red-500">
                <div className="w-10 h-10 rounded-full border-2 border-red-500 bg-red-50 flex items-center justify-center"><Stethoscope size={18} /></div>
                <span>5. Khám bệnh</span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (approx 4/12) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Hàng đợi hiện tại */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-800">Hàng đợi hiện tại</h3>
              <button onClick={loadSidebarData} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <RotateCw size={16} className={isQueueLoading ? 'animate-spin' : ''} />
              </button>
            </div>
            
            <div className="p-4 flex flex-col gap-3 min-h-[200px]">
              {isQueueLoading ? (
                <div className="flex justify-center items-center h-32"><Loader2 size={24} className="animate-spin text-blue-500" /></div>
              ) : queue.length === 0 ? (
                <div className="text-center text-gray-500 text-sm py-8">Chưa có bệnh nhân trong hàng đợi hôm nay.</div>
              ) : (
                queue.map((item, idx) => (
                  <div key={idx} className={`flex items-center gap-4 p-3 rounded-xl border ${item.status === 'ĐANG KHÁM' ? 'bg-green-50/50 border-green-100' : 'bg-orange-50/30 border-orange-100'}`}>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-sm ${item.status === 'ĐANG KHÁM' ? 'bg-green-50 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                      {item.code}
                    </div>
                    <div className="flex-1">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold mb-1 ${item.status === 'ĐANG KHÁM' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                        {item.status}
                      </span>
                      <h4 className="font-bold text-gray-800 text-sm">{item.patientName}</h4>
                    </div>
                    <div className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock size={12} /> {item.time}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-3 border-t border-gray-100 bg-gray-50/50 flex justify-center">
              <Link href="/receptionist/queue" className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
                Xem tất cả hàng đợi <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Lịch sử check-in gần đây */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800">Lịch sử check-in hôm nay</h3>
            </div>
            
            <div className="divide-y divide-gray-100 min-h-[200px]">
              {isQueueLoading ? (
                <div className="flex justify-center items-center h-32"><Loader2 size={24} className="animate-spin text-blue-500" /></div>
              ) : history.length === 0 ? (
                <div className="text-center text-gray-500 text-sm py-8">Chưa có lịch sử check-in nào.</div>
              ) : (
                history.map((item, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="text-gray-500 font-bold text-sm w-10">{item.code}</div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm">{item.patientName}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{item.date}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs text-gray-500">{item.time}</span>
                      <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded text-[10px] font-semibold border border-green-100">Đã check-in</span>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="p-3 border-t border-gray-100 bg-gray-50/50 flex justify-center">
              <Link href="/receptionist/reports" className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
                Xem tất cả <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
