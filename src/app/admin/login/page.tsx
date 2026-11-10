'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@thegioididong.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Kiểm tra tài khoản Quản trị
    setTimeout(() => {
      if (email.trim() && password.trim()) {
        const adminSession = {
          email,
          name: email.includes('admin') ? 'Super Admin' : 'Quản Lý Chi Nhánh',
          role: email.includes('admin') ? 'SUPER_ADMIN' : 'MANAGER',
          loggedInAt: new Date().toISOString(),
        };
        localStorage.setItem('tgdd_admin_session', JSON.stringify(adminSession));
        router.push('/admin');
      } else {
        setError('Vui lòng nhập đầy đủ email và mật khẩu!');
        setIsLoading(false);
      }
    }, 600);
  };

  const handleQuickFill = (role: 'admin' | 'staff') => {
    if (role === 'admin') {
      setEmail('admin@thegioididong.com');
      setPassword('admin123');
    } else {
      setEmail('kho.tphcm@thegioididong.com');
      setPassword('kho123');
    }
  };

  return (
    <div className="min-h-screen bg-[#14181d] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#1e232a] border border-gray-800 rounded-2xl shadow-2xl p-8 space-y-6">
        {/* Logo Quản trị TGDD */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-[#ffd400] text-black rounded-2xl mx-auto flex items-center justify-center font-black text-2xl shadow-lg">
            ⚡
          </div>
          <h1 className="text-xl font-black text-white tracking-tight">
            TGDD ADMIN PORTAL
          </h1>
          <p className="text-xs text-gray-400">
            Cổng đăng nhập dành riêng cho Quản trị viên & Nhân viên hệ thống
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-300 font-bold mb-1.5">Email quản trị / Tài khoản</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@thegioididong.com"
                className="w-full bg-[#14181d] border border-gray-700 text-white rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#ffd400] transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-bold mb-1.5">Mật khẩu truy cập</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#14181d] border border-gray-700 text-white rounded-xl pl-9 pr-10 py-2.5 focus:outline-none focus:border-[#ffd400] transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-gray-400">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded bg-gray-800 border-gray-700" />
              <span>Ghi nhớ đăng nhập (30 ngày)</span>
            </label>
            <Link href="#" className="hover:text-[#ffd400]">Quên mật khẩu?</Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#ffd400] hover:bg-[#ecc200] text-black font-black py-3 rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-md disabled:opacity-50"
          >
            {isLoading ? 'Đang xác thực...' : 'ĐĂNG NHẬP HỆ THỐNG'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Fast Logins */}
        <div className="border-t border-gray-800 pt-4 space-y-2">
          <div className="text-[11px] text-gray-500 text-center font-semibold">Tài khoản dùng thử nhanh:</div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <button
              type="button"
              onClick={() => handleQuickFill('admin')}
              className="p-2 bg-gray-800/60 hover:bg-gray-800 border border-gray-700 text-gray-300 rounded-lg text-center transition"
            >
              👑 Super Admin
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('staff')}
              className="p-2 bg-gray-800/60 hover:bg-gray-800 border border-gray-700 text-gray-300 rounded-lg text-center transition"
            >
              📦 Thủ Kho Chi Nhánh
            </button>
          </div>
        </div>

        <div className="text-center pt-2">
          <Link href="/" className="text-xs text-gray-400 hover:text-[#ffd400] transition">
            ← Quay lại Website Khách Hàng
          </Link>
        </div>
      </div>
    </div>
  );
}
