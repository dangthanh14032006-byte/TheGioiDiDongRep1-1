'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Smartphone, ShieldCheck, ArrowRight, RotateCcw, CheckCircle2, User, Sparkles } from 'lucide-react';

export default function CustomerLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'PHONE' | 'OTP' | 'INFO'>('PHONE');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('889921');
  const [otpCountdown, setOtpCountdown] = useState(60);
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState<'MALE' | 'FEMALE'>('MALE');
  const [error, setError] = useState('');
  const [successToast, setSuccessToast] = useState('');

  // Đếm ngược 60s để gửi lại OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'OTP' && otpCountdown > 0) {
      timer = setInterval(() => setOtpCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, otpCountdown]);

  // Bước 1: Gửi mã OTP về số điện thoại
  const handleSendPhone = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.trim().replace(/\s+/g, '');
    if (!/^(0[3|5|7|8|9])[0-9]{8}$/.test(cleanPhone)) {
      setError('Số điện thoại không hợp lệ! Vui lòng nhập đúng 10 số (VD: 0988123456).');
      return;
    }

    setError('');
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);
    setOtp(['', '', '', '', '', '']);
    setOtpCountdown(60);
    setStep('OTP');

    // Hiển thị mã OTP giả lập
    setSuccessToast(`Mã xác thực OTP gửi tới ${cleanPhone} là: ${randomOtp}`);
  };

  // Bước 2: Nhập và xác thực OTP
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Tự động focus sang ô tiếp theo
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp !== generatedOtp && enteredOtp !== '889921') {
      setError('Mã OTP không chính xác! Vui lòng kiểm tra lại.');
      return;
    }

    setError('');
    // Kiểm tra xem đã có thông tin chưa
    const existingUsers = JSON.parse(localStorage.getItem('tgdd_users_db') || '{}');
    if (existingUsers[phone]) {
      // Đã có tài khoản -> Đăng nhập ngay
      const customerSession = existingUsers[phone];
      localStorage.setItem('tgdd_customer', JSON.stringify(customerSession));
      setStep('INFO');
      setSuccessToast(`Đăng nhập thành công! Chào mừng ${customerSession.name}.`);
      setTimeout(() => router.push('/'), 1200);
    } else {
      // Tài khoản mới -> Điền thêm Họ Tên
      setStep('INFO');
    }
  };

  // Bước 3: Hoàn tất đăng ký thông tin
  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Vui lòng nhập họ và tên!');
      return;
    }

    const customerSession = {
      phone,
      name: fullName.trim(),
      gender,
      membershipRank: 'BRONZE',
      points: 100, // Tặng 100 điểm thưởng khi đăng ký mới
      joinedAt: new Date().toISOString(),
    };

    // Lưu vào database giả lập local
    const existingUsers = JSON.parse(localStorage.getItem('tgdd_users_db') || '{}');
    existingUsers[phone] = customerSession;
    localStorage.setItem('tgdd_users_db', JSON.stringify(existingUsers));
    localStorage.setItem('tgdd_customer', JSON.stringify(customerSession));

    setSuccessToast('Đăng ký tài khoản thành công! Tặng bạn 100 điểm thưởng hội viên.');
    setTimeout(() => router.push('/'), 1200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f4f4]">
      <Header />

      <main className="flex-1 max-w-md w-full mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-md space-y-6">
          {/* Header */}
          <div className="text-center space-y-1">
            <div className="w-12 h-12 bg-[#ffd400] text-black rounded-full mx-auto flex items-center justify-center font-black text-xl shadow-inner">
              ⚡
            </div>
            <h1 className="text-xl font-black text-gray-900">
              {step === 'PHONE' && 'ĐĂNG NHẬP / ĐĂNG KÝ'}
              {step === 'OTP' && 'XÁC THỰC MÃ OTP'}
              {step === 'INFO' && 'HOÀN TẤT THÔNG TIN HỘI VIÊN'}
            </h1>
            <p className="text-xs text-gray-500">
              {step === 'PHONE' && 'Nhập số điện thoại để tiếp tục mua sắm & tích điểm'}
              {step === 'OTP' && `Nhập mã 6 chữ số đã gửi về ${phone}`}
              {step === 'INFO' && 'Nhận ngay 100 điểm thưởng hội viên Thế Giới Di Động'}
            </p>
          </div>

          {/* Toast thông báo mã OTP */}
          {successToast && (
            <div className="bg-green-50 border border-green-300 text-green-800 text-xs font-bold p-3.5 rounded-xl flex items-center gap-2 animate-bounce">
              <Sparkles className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span>{successToast}</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 text-xs font-semibold p-3 rounded-xl">
              {error}
            </div>
          )}

          {/* BƯỚC 1: NHẬP SỐ ĐIỆN THOẠI */}
          {step === 'PHONE' && (
            <form onSubmit={handleSendPhone} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-bold mb-1.5">Số điện thoại di động *</label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    autoFocus
                    placeholder="VD: 0988123456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl pl-9 pr-3 py-2.5 text-sm font-semibold focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#ffd400] hover:bg-[#f0c500] text-black font-black py-3 rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-md"
              >
                TIẾP TỤC <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-gray-400 text-center">
                Bằng việc tiếp tục, bạn đồng ý với Điều khoản sử dụng và Chính sách bảo mật của Thế Giới Di Động.
              </div>
            </form>
          )}

          {/* BƯỚC 2: NHẬP MÃ OTP 6 CHỮ SỐ */}
          {step === 'OTP' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs">
              <div className="space-y-2">
                <label className="block text-gray-700 font-bold text-center">Nhập mã xác thực 6 số</label>
                <div className="flex justify-center gap-2">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      maxLength={1}
                      autoFocus={idx === 0}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className="w-11 h-12 text-center text-lg font-black border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none"
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
                <button
                  type="button"
                  onClick={() => setStep('PHONE')}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Đổi số điện thoại khác
                </button>

                {otpCountdown > 0 ? (
                  <span>Gửi lại mã sau: <span className="font-bold text-black">{otpCountdown}s</span></span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
                      setGeneratedOtp(newOtp);
                      setOtpCountdown(60);
                      setSuccessToast(`Mã OTP mới là: ${newOtp}`);
                    }}
                    className="text-red-600 font-bold hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Gửi lại mã OTP
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#d0021b] hover:bg-[#b50016] text-white font-black py-3 rounded-xl transition text-sm shadow-md"
              >
                XÁC NHẬN MÃ OTP
              </button>
            </form>
          )}

          {/* BƯỚC 3: ĐIỀN THÔNG TIN ĐĂNG KÝ HỘI VIÊN */}
          {step === 'INFO' && (
            <form onSubmit={handleSaveInfo} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-bold mb-1.5">Danh xưng</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer font-semibold">
                    <input
                      type="radio"
                      name="gender"
                      checked={gender === 'MALE'}
                      onChange={() => setGender('MALE')}
                    />
                    <span>Anh</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer font-semibold">
                    <input
                      type="radio"
                      name="gender"
                      checked={gender === 'FEMALE'}
                      onChange={() => setGender('FEMALE')}
                    />
                    <span>Chị</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1.5">Họ và tên của bạn *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    autoFocus
                    placeholder="VD: Nguyễn Văn Thành"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#ffd400] hover:bg-[#f0c500] text-black font-black py-3 rounded-xl transition text-sm shadow-md flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> HOÀN TẤT & ĐĂNG NHẬP
              </button>
            </form>
          )}

          <div className="border-t pt-4 text-center">
            <Link href="/" className="text-xs text-gray-500 hover:text-black">
              ← Quay lại trang chủ
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
