'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Smartphone, 
  ShoppingBag, 
  Barcode, 
  CreditCard, 
  Users, 
  ArrowLeft,
  Bell,
  LogOut,
  Search
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<{ name: string; role: string; email: string } | null>(null);

  // Không hiển thị sidebar khi ở trang /admin/login
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!isLoginPage) {
      const session = localStorage.getItem('tgdd_admin_session');
      if (session) {
        try {
          setAdminUser(JSON.parse(session));
        } catch {
          setAdminUser({ name: 'Super Admin', role: 'SUPER_ADMIN', email: 'admin@thegioididong.com' });
        }
      } else {
        setAdminUser({ name: 'Super Admin', role: 'SUPER_ADMIN', email: 'admin@thegioididong.com' });
      }
    }
  }, [isLoginPage]);

  const handleLogout = () => {
    localStorage.removeItem('tgdd_admin_session');
    router.push('/admin/login');
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  const navItems = [
    { name: 'Tổng quan (Dashboard)', href: '/admin', icon: LayoutDashboard },
    { name: 'Quản lý Sản phẩm', href: '/admin/products', icon: Smartphone },
    { name: 'Quản lý Đơn hàng', href: '/admin/orders', icon: ShoppingBag, badge: '3' },
    { name: 'Kho hàng & Mã IMEI', href: '/admin/inventory', icon: Barcode },
    { name: 'Hồ sơ Trả góp', href: '/admin/installments', icon: CreditCard, badge: 'New' },
    { name: 'Khách hàng (CRM)', href: '/admin/customers', icon: Users },
  ];

  return (
    <div className="flex h-screen bg-[#f8f9fa] overflow-hidden">
      {/* Sidebar Trái */}
      <aside className="w-64 bg-[#1e232a] text-white flex flex-col justify-between flex-shrink-0">
        <div>
          {/* Logo Quản trị */}
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#ffd400] text-black font-black flex items-center justify-center text-lg">
                ⚡
              </span>
              <div>
                <div className="font-extrabold text-sm text-[#ffd400] leading-none">TGDD ADMIN</div>
                <div className="text-[10px] text-gray-400">Hệ Thống Quản Trị Chuỗi</div>
              </div>
            </Link>
          </div>

          {/* Quick link về trang Khách hàng */}
          <div className="p-3">
            <Link
              href="/"
              className="flex items-center justify-center gap-1.5 w-full bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold py-2 px-3 rounded-lg transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Ra Website Khách Hàng
            </Link>
          </div>

          {/* Menu Điều Hướng */}
          <nav className="p-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition ${
                    isActive
                      ? 'bg-[#ffd400] text-black shadow-sm'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-black text-white' : 'bg-[#d0021b] text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Nút Đăng Xuất ở chân Sidebar */}
        <div className="p-4 border-t border-gray-800 text-xs space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-yellow-500 text-black font-extrabold flex items-center justify-center flex-shrink-0">
              AD
            </div>
            <div className="overflow-hidden flex-1">
              <div className="font-bold text-white truncate">{adminUser?.name || 'Super Admin'}</div>
              <div className="text-[10px] text-green-400">Đang trực tuyến</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg py-2 transition font-bold text-xs"
          >
            <LogOut className="w-3.5 h-3.5" /> Đăng Xuất Quản Trị
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-14 bg-white border-b border-gray-200 px-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3 w-96">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Tìm mã đơn hàng, số IMEI, khách hàng..."
                className="w-full bg-gray-50 border border-gray-200 text-xs rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5 text-gray-500 bg-gray-100 px-2.5 py-1.5 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span>Chi nhánh: Kho Tổng (TP.HCM)</span>
            </div>

            <button className="relative p-2 text-gray-600 hover:text-black">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
            </button>
          </div>
        </header>

        {/* Page Dynamic Body */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
