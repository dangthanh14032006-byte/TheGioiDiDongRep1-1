'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  ShoppingCart, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Headphones, 
  Watch, 
  ShieldCheck, 
  ClipboardList, 
  LayoutDashboard,
  MapPin,
  Menu,
  X,
  Database,
  ArrowRight,
  TrendingUp,
  Check,
  User,
  LogOut
} from 'lucide-react';
import { MOCK_PRODUCTS, TRENDING_KEYWORDS } from '@/data/mock-data';
import { ALL_PROVINCES, TOP_CITIES } from '@/data/provinces';

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState('Hồ Chí Minh');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [provinceSearch, setProvinceSearch] = useState('');
  const [customer, setCustomer] = useState<{ name: string; phone: string; points: number } | null>(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [dbStatus, setDbStatus] = useState<{ connected: boolean; message: string }>({
    connected: false,
    message: 'Đang kiểm tra...',
  });
  const searchRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Khôi phục tỉnh thành & khách hàng đã đăng nhập từ localStorage
  useEffect(() => {
    const savedProv = localStorage.getItem('tgdd_selected_province');
    if (savedProv) setSelectedProvince(savedProv);

    const savedCustomer = localStorage.getItem('tgdd_customer');
    if (savedCustomer) {
      try {
        setCustomer(JSON.parse(savedCustomer));
      } catch {}
    }
  }, []);

  // Kiểm tra kết nối Supabase PostgreSQL ngầm
  useEffect(() => {
    fetch('/api/db-status')
      .then((res) => res.json())
      .then((data) => setDbStatus({ connected: data.connected, message: data.message }))
      .catch(() => setDbStatus({ connected: false, message: 'Offline mode' }));
  }, []);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectProvince = (name: string) => {
    setSelectedProvince(name);
    localStorage.setItem('tgdd_selected_province', name);
    setShowLocationModal(false);
    setProvinceSearch('');
  };

  const handleCustomerLogout = () => {
    localStorage.removeItem('tgdd_customer');
    setCustomer(null);
    setShowUserDropdown(false);
    router.refresh();
  };

  // Lọc sản phẩm gợi ý theo từ khóa
  const searchResults = searchQuery.trim()
    ? MOCK_PRODUCTS.filter((p) => {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.specs.cpu.toLowerCase().includes(q) ||
          p.variants.some((v) => v.storage.toLowerCase().includes(q) || v.colorName.toLowerCase().includes(q))
        );
      })
    : [];

  const filteredProvinces = ALL_PROVINCES.filter((p) =>
    p.name.toLowerCase().includes(provinceSearch.toLowerCase())
  );

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat('vi-VN').format(p) + '₫';
  };

  return (
    <header className="w-full sticky top-0 z-50 shadow-md">
      {/* Top Banner Khuyến mãi */}
      <div className="bg-[#e11b1e] text-white text-xs py-1 text-center font-medium flex items-center justify-center gap-2">
        <span>🎉 THÁNG VÀNG CÔNG NGHỆ: SĂN DEAL SIÊU RẺ - TRẢ GÓP 0% - BẢO HÀNH ĐỔI MỚI 1 ĐỔI 1 TRONG 30 NGÀY!</span>
        <span className={`text-[10px] px-2 py-0.2 rounded-full font-bold flex items-center gap-1 ${
          dbStatus.connected ? 'bg-green-600' : 'bg-gray-700'
        }`}>
          <Database className="w-3 h-3" />
          {dbStatus.connected ? 'Supabase Live' : 'Dev Data Mode'}
        </span>
      </div>

      {/* Main Yellow Header */}
      <div className="bg-[#ffd400] text-black px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo KikiMobile */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-black text-[#ffd400] w-9 h-9 rounded-full flex items-center justify-center font-black text-xl shadow-inner">
              ⚡
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-black">
                kikimobile<span className="text-[#d0021b]">.com</span>
              </span>
              <span className="text-[10px] font-semibold text-gray-800 -mt-1">
                Điện thoại • Laptop • Phụ kiện chính hãng
              </span>
            </div>
          </Link>

          {/* Chọn địa điểm giao hàng (Tỉnh thành phố Việt Nam) */}
          <button
            onClick={() => setShowLocationModal(true)}
            className="hidden lg:flex items-center gap-1.5 bg-[#f0c500] hover:bg-[#e6bd00] px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition text-left"
            title="Bấm để chọn Tỉnh/Thành phố xem giá và kho hàng"
          >
            <MapPin className="w-4 h-4 text-gray-800 flex-shrink-0" />
            <div className="leading-tight max-w-[130px]">
              <div className="text-[10px] text-gray-700">Xem giá tại</div>
              <div className="font-bold truncate">{selectedProvince} ▾</div>
            </div>
          </button>

          {/* Thanh tìm kiếm thông minh có Live Auto-complete & Trending Suggestions */}
          <div ref={searchRef} className="flex-1 max-w-xl relative">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Bạn tìm gì... (VD: iPhone 16, Samsung Galaxy S24, Xiaomi...)"
                value={searchQuery}
                onFocus={() => setIsSearching(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearching(true);
                }}
                className="w-full bg-white text-sm text-gray-900 pl-4 pr-10 py-2 rounded-lg border border-transparent focus:border-black focus:outline-none shadow-sm placeholder:text-gray-400"
              />
              <button 
                type="button" 
                onClick={() => router.push(`/dien-thoai?search=${encodeURIComponent(searchQuery)}`)}
                className="absolute right-2.5 text-gray-500 hover:text-black transition"
                aria-label="Tìm kiếm"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* LIVE SEARCH & TRENDING DROPDOWN */}
            {isSearching && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                {searchQuery.trim().length === 0 ? (
                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                      <TrendingUp className="w-3.5 h-3.5 text-red-600" />
                      <span>TÌM KIẾM PHỔ BIẾN NHẤT</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {TRENDING_KEYWORDS.map((kw) => (
                        <button
                          key={kw}
                          onClick={() => {
                            setSearchQuery(kw);
                            setIsSearching(true);
                          }}
                          className="bg-gray-100 hover:bg-yellow-100 hover:text-black text-gray-700 text-xs px-2.5 py-1 rounded-full border border-gray-200 transition"
                        >
                          {kw}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="p-2 bg-gray-50 border-b text-[11px] font-bold text-gray-500 flex justify-between">
                      <span>SẢN PHẨM GỢI Ý CHO &quot;{searchQuery}&quot;</span>
                      <span>{searchResults.length} kết quả</span>
                    </div>

                    {searchResults.length > 0 ? (
                      <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                        {searchResults.map((item) => (
                          <Link
                            key={item.id}
                            href={`/dien-thoai/${item.slug}`}
                            onClick={() => setIsSearching(false)}
                            className="flex items-center gap-3 p-3 hover:bg-yellow-50 transition"
                          >
                            <img
                              src={item.thumbnail}
                              alt={item.name}
                              className="w-12 h-12 object-contain flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-xs text-gray-900 truncate">{item.name}</h4>
                              <div className="text-[11px] text-gray-500">{item.specs.cpu} • RAM {item.specs.ram}</div>
                              <div className="flex items-baseline gap-2 mt-0.5">
                                <span className="font-black text-xs text-[#d0021b]">
                                  {formatPrice(item.variants[0].salePrice)}
                                </span>
                                <span className="text-[10px] text-gray-400 line-through">
                                  {formatPrice(item.variants[0].originalPrice)}
                                </span>
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-xs text-gray-500">
                        Không tìm thấy sản phẩm nào khớp với từ khóa &quot;{searchQuery}&quot;.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Tiện ích Khách hàng & Quản trị */}
          <div className="flex items-center gap-2 sm:gap-2.5 text-xs font-semibold flex-shrink-0">
            {/* Đăng nhập Khách hàng qua SĐT */}
            <div ref={userRef} className="relative">
              {customer ? (
                <div>
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center gap-1.5 bg-[#f0c500] hover:bg-[#e6bd00] px-3 py-2 rounded-md transition"
                  >
                    <User className="w-4 h-4 text-black" />
                    <span className="font-bold max-w-[100px] truncate">{customer.name} ▾</span>
                  </button>

                  {/* Dropdown thông tin khách hàng */}
                  {showUserDropdown && (
                    <div className="absolute right-0 top-full mt-1.5 w-52 bg-white rounded-xl shadow-xl border border-gray-200 p-2 z-50 text-xs space-y-1">
                      <div className="p-2 border-b">
                        <div className="font-bold text-gray-900">{customer.name}</div>
                        <div className="text-[11px] text-gray-500">{customer.phone}</div>
                        <div className="text-[10px] font-bold text-yellow-700 bg-yellow-100 rounded px-1.5 py-0.5 mt-1 inline-block">
                          Điểm tích lũy: {customer.points || 100} điểm
                        </div>
                      </div>
                      <Link
                        href="/tra-cuu"
                        onClick={() => setShowUserDropdown(false)}
                        className="block px-3 py-2 hover:bg-gray-100 rounded-lg text-gray-700"
                      >
                        Đơn hàng của tôi
                      </Link>
                      <button
                        onClick={handleCustomerLogout}
                        className="w-full text-left flex items-center gap-2 px-3 py-2 hover:bg-red-50 text-red-600 rounded-lg font-bold"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  href="/dang-nhap" 
                  className="flex items-center gap-1.5 hover:bg-[#f0c500] px-2.5 py-2 rounded-md transition"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Đăng nhập</span>
                </Link>
              )}
            </div>

            {/* Tra cứu đơn hàng */}
            <Link 
              href="/tra-cuu" 
              className="hidden md:flex items-center gap-1.5 hover:bg-[#f0c500] px-2.5 py-2 rounded-md transition"
            >
              <ClipboardList className="w-4 h-4" />
              <span className="leading-tight">Tra cứu<br/>đơn hàng</span>
            </Link>

            {/* Giỏ hàng */}
            <Link 
              href="/gio-hang" 
              className="flex items-center gap-1.5 bg-[#f0c500] hover:bg-[#e6bd00] px-3 py-2 rounded-md transition relative"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Giỏ hàng</span>
              <span className="bg-[#d0021b] text-white text-[11px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                1
              </span>
            </Link>

            {/* Cổng Quản Trị (ADMIN) */}
            <Link 
              href="/admin/login" 
              className="flex items-center gap-1.5 bg-black hover:bg-neutral-800 text-white px-3 py-2 rounded-md transition shadow"
            >
              <LayoutDashboard className="w-4 h-4 text-[#ffd400]" />
              <span className="hidden sm:inline">Quản Trị (Admin)</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-black text-white text-xs font-semibold overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2 min-w-max lg:min-w-0">
          <Link href="/dien-thoai?category=dien-thoai" className="flex items-center gap-1.5 px-3 py-1 hover:text-[#ffd400] transition">
            <Smartphone className="w-4 h-4 text-[#ffd400]" />
            <span>Điện thoại</span>
          </Link>
          <Link href="/dien-thoai?category=laptop" className="flex items-center gap-1.5 px-3 py-1 hover:text-[#ffd400] transition">
            <Laptop className="w-4 h-4 text-[#ffd400]" />
            <span>Laptop</span>
          </Link>
          <Link href="/dien-thoai?category=tablet" className="flex items-center gap-1.5 px-3 py-1 hover:text-[#ffd400] transition">
            <Tablet className="w-4 h-4 text-[#ffd400]" />
            <span>Tablet</span>
          </Link>
          <Link href="/dien-thoai?category=phu-kien" className="flex items-center gap-1.5 px-3 py-1 hover:text-[#ffd400] transition">
            <Headphones className="w-4 h-4 text-[#ffd400]" />
            <span>Phụ kiện</span>
          </Link>
          <Link href="/dien-thoai?category=smartwatch" className="flex items-center gap-1.5 px-3 py-1 hover:text-[#ffd400] transition">
            <Watch className="w-4 h-4 text-[#ffd400]" />
            <span>Smartwatch</span>
          </Link>
          <Link href="/tra-cuu" className="flex items-center gap-1.5 px-3 py-1 hover:text-[#ffd400] transition">
            <ShieldCheck className="w-4 h-4 text-[#ffd400]" />
            <span>Bảo hành IMEI</span>
          </Link>
          <Link href="/tra-gop" className="flex items-center gap-1.5 px-3 py-1 hover:text-[#ffd400] transition">
            <span className="bg-[#d0021b] text-white px-1.5 py-0.5 rounded text-[10px] font-bold">0%</span>
            <span>Mua Trả Góp</span>
          </Link>
        </div>
      </nav>

      {/* MODAL CHỌN TỈNH THÀNH PHỐ VIỆT NAM */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-base text-gray-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-600" />
                CHỌN TỈNH, THÀNH PHỐ ĐỂ XEM KHO HÀNG & GIÁ CHÍNH XÁC
              </h3>
              <button
                onClick={() => setShowLocationModal(false)}
                className="text-gray-400 hover:text-black font-bold p-1 text-base"
              >
                ✕
              </button>
            </div>

            {/* Tìm kiếm tỉnh thành */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Nhập tên tỉnh/thành phố (VD: Hà Nội, Đà Nẵng, Cần Thơ...)"
                value={provinceSearch}
                onChange={(e) => setProvinceSearch(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                autoFocus
              />
            </div>

            {/* Thành phố lớn ưu tiên */}
            {!provinceSearch && (
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-gray-500 uppercase">Thành phố trọng điểm:</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TOP_CITIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleSelectProvince(c.name)}
                      className={`p-2 rounded-lg text-xs font-bold border transition text-center flex items-center justify-center gap-1 ${
                        selectedProvince === c.name
                          ? 'border-yellow-500 bg-yellow-400 text-black'
                          : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-800'
                      }`}
                    >
                      {selectedProvince === c.name && <Check className="w-3.5 h-3.5" />}
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Danh sách tất cả 63 tỉnh thành */}
            <div className="flex-1 overflow-y-auto border-t pt-3 space-y-1">
              <div className="text-[11px] font-bold text-gray-500 uppercase mb-2">
                Danh sách Tỉnh/Thành phố ({filteredProvinces.length}):
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
                {filteredProvinces.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectProvince(p.name)}
                    className={`p-2 rounded-lg text-left transition flex items-center justify-between ${
                      selectedProvince === p.name
                        ? 'bg-yellow-100 font-bold text-black border border-yellow-400'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className="truncate">{p.name}</span>
                    {selectedProvince === p.name && <Check className="w-3.5 h-3.5 text-yellow-700" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
