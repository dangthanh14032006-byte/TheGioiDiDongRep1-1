'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { BRANDS, MOCK_PRODUCTS } from '@/data/mock-data';
import { 
  Flame, 
  Sparkles, 
  ChevronRight, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Headphones, 
  Watch,
  PackageX
} from 'lucide-react';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string>('dien-thoai');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  // Countdown timer cho Flash Sale Deal Sốc
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Lọc sản phẩm theo Category được chọn và Bộ lọc
  const filteredProducts = useMemo(() => {
    let list = MOCK_PRODUCTS.filter((p) => p.category === activeCategory);

    if (selectedBrand !== 'all') {
      list = list.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    if (priceFilter === 'under-15m') {
      list = list.filter((p) => p.variants[0].salePrice < 15000000);
    } else if (priceFilter === '15m-30m') {
      list = list.filter((p) => p.variants[0].salePrice >= 15000000 && p.variants[0].salePrice <= 30000000);
    } else if (priceFilter === 'above-30m') {
      list = list.filter((p) => p.variants[0].salePrice > 30000000);
    }

    return list;
  }, [activeCategory, selectedBrand, priceFilter]);

  // Hãng khả dụng theo thể loại đang chọn
  const availableBrands = useMemo(() => {
    const categoryProds = MOCK_PRODUCTS.filter((p) => p.category === activeCategory);
    const brandNames = new Set(categoryProds.map((p) => p.brand));
    return BRANDS.filter((b) => brandNames.has(b.name));
  }, [activeCategory]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-4 space-y-6">
        {/* Hero Banner Slider TGDD style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2 rounded-xl overflow-hidden shadow-sm relative h-52 sm:h-72 bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center p-6 text-black">
            <div className="space-y-3 z-10 max-w-md">
              <span className="bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded uppercase tracking-wider">
                MỞ BÁN SIÊU PHẨM
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                iPhone 16 Pro Max Titan Sa Mạc
              </h2>
              <p className="text-xs sm:text-sm font-medium text-gray-900">
                Chip A18 Pro đột phá • Camera Control cảm ứng • Thu cũ đổi mới trợ giá đến 3 Triệu
              </p>
              <Link 
                href="/dien-thoai/iphone-16-pro-max" 
                className="inline-flex items-center gap-2 bg-black hover:bg-neutral-800 text-[#ffd400] font-bold px-4 py-2 rounded-lg text-sm transition"
              >
                Đặt Mua Ngay <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="absolute right-2 sm:right-6 bottom-2 sm:bottom-4 w-44 sm:w-60 h-44 sm:h-60 opacity-90 sm:opacity-100">
              <img 
                src="https://cdn.tgdd.vn/Products/Images/42/329149/iphone-16-pro-max-titan-sa-mac-thumb-600x600.jpg" 
                alt="iPhone 16 Pro Max" 
                className="w-full h-full object-contain drop-shadow-xl"
              />
            </div>
          </div>

          {/* 2 Banner phụ bên phải */}
          <div className="hidden md:flex flex-col gap-3">
            <div className="flex-1 bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between hover:shadow transition">
              <div>
                <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">GALAXY AI</span>
                <h4 className="font-bold text-sm text-gray-900 mt-1">Galaxy S24 Ultra</h4>
                <p className="text-xs text-red-600 font-extrabold">Giảm sốc 5.000.000₫</p>
                <Link href="/dien-thoai/samsung-galaxy-s24-ultra" className="text-xs text-blue-600 font-semibold hover:underline">
                  Xem ngay →
                </Link>
              </div>
              <img 
                src="https://cdn.tgdd.vn/Products/Images/42/307174/samsung-galaxy-s24-ultra-grey-thumb-600x600.jpg" 
                alt="S24 Ultra" 
                className="w-20 h-20 object-contain"
              />
            </div>

            <div className="flex-1 bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between hover:shadow transition">
              <div>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">APPLE SILICON</span>
                <h4 className="font-bold text-sm text-gray-900 mt-1">MacBook Air M3</h4>
                <p className="text-xs text-red-600 font-extrabold">Chỉ từ 34.490.000₫</p>
                <Link href="/dien-thoai?category=laptop" className="text-xs text-blue-600 font-semibold hover:underline">
                  Xem ngay →
                </Link>
              </div>
              <img 
                src="https://cdn.tgdd.vn/Products/Images/44/322619/macbook-air-13-inch-m3-xam-thumb-600x600.jpg" 
                alt="MacBook Air M3" 
                className="w-20 h-20 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Khối FLASH SALE / DEAL SỐC */}
        <section className="bg-gradient-to-r from-[#d0021b] via-[#e63946] to-[#d0021b] rounded-2xl p-4 sm:p-6 shadow-md text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-red-400/40 pb-4">
            <div className="flex items-center gap-2">
              <div className="bg-yellow-400 text-red-700 p-1.5 rounded-lg animate-pulse">
                <Flame className="w-6 h-6 fill-red-600" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-yellow-300 flex items-center gap-2">
                  GIỜ VÀNG DEAL SỐC
                </h3>
                <p className="text-xs text-white/90">Số lượng có hạn • Hết thời gian trở về giá gốc</p>
              </div>
            </div>

            {/* Đồng hồ đếm ngược */}
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="text-white/80">KẾT THÚC TRONG:</span>
              <div className="flex items-center gap-1">
                <span className="bg-black text-white px-2 py-1 rounded font-mono text-sm">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span>:</span>
                <span className="bg-black text-white px-2 py-1 rounded font-mono text-sm">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span>:</span>
                <span className="bg-black text-white px-2 py-1 rounded font-mono text-sm">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {MOCK_PRODUCTS.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* CÁC NÚT CHỌN THỂ LOẠI (ĐIỆN THOẠI, LAPTOP, TABLET...) TRỰC TIẾP TRÊN TRANG CHỦ */}
        <section className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                KHÁM PHÁ THEO NGÀNH HÀNG
              </h2>
              <p className="text-xs text-gray-500">Bấm chọn ngành hàng để xem danh sách sản phẩm và các bộ lọc riêng biệt</p>
            </div>

            {/* Link Xem chi tiết ngành hàng */}
            <Link
              href={`/dien-thoai?category=${activeCategory}`}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              Xem tất cả bộ lọc chuyên sâu →
            </Link>
          </div>

          {/* Các nút chuyển đổi thể loại */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'dien-thoai', name: 'Điện thoại', icon: Smartphone },
              { id: 'laptop', name: 'Laptop', icon: Laptop },
              { id: 'tablet', name: 'Tablet', icon: Tablet },
              { id: 'phu-kien', name: 'Phụ kiện', icon: Headphones },
              { id: 'smartwatch', name: 'Smartwatch', icon: Watch },
            ].map((cat) => {
              const Icon = cat.icon;
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setSelectedBrand('all');
                    setPriceFilter('all');
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap shadow-xs ${
                    isSelected
                      ? 'bg-[#ffd400] text-black shadow-md scale-102 border-2 border-black'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Danh sách Hãng theo thể loại đang bấm */}
          {availableBrands.length > 0 && (
            <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm flex items-center gap-2 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setSelectedBrand('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                  selectedBrand === 'all'
                    ? 'bg-black text-[#ffd400]'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tất cả hãng
              </button>
              {availableBrands.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBrand(b.slug)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition border ${
                    selectedBrand === b.slug
                      ? 'border-black bg-black text-[#ffd400]'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          )}

          {/* Grid sản phẩm hoặc Báo hết hàng */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center text-gray-500 border border-gray-200 space-y-3">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
                <PackageX className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-gray-900">
                HIỆN TẠI SẢN PHẨM KHÔNG CÓ HÀNG
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Hiện tại danh mục này đang tạm hết hàng hoặc chưa có sản phẩm phù hợp với bộ lọc bạn chọn.
              </p>
              <button
                onClick={() => {
                  setSelectedBrand('all');
                  setPriceFilter('all');
                }}
                className="bg-[#ffd400] text-black font-bold text-xs px-4 py-2 rounded-lg"
              >
                Xóa bộ lọc
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
