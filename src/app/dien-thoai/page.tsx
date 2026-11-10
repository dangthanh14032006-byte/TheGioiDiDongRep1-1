'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { BRANDS, CATEGORIES, MOCK_PRODUCTS } from '@/data/mock-data';
import { 
  Filter, 
  ArrowUpDown, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Headphones, 
  Watch, 
  Sparkles, 
  X, 
  Cpu, 
  HardDrive,
  PackageX
} from 'lucide-react';

function CategoryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Thể loại đang chọn: 'dien-thoai', 'laptop', 'tablet', 'phu-kien', 'smartwatch'
  const initialCategory = searchParams.get('category') || 'dien-thoai';
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  // Đồng bộ URL khi đổi category từ Header
  useEffect(() => {
    const cat = searchParams.get('category') || 'dien-thoai';
    setSelectedCategory(cat);
    resetFilters();
  }, [searchParams]);

  // Bộ lọc chung
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'POPULAR' | 'PRICE_ASC' | 'PRICE_DESC'>('POPULAR');

  // Bộ lọc riêng cho Điện thoại
  const [phoneRam, setPhoneRam] = useState<string>('all');
  const [phoneRom, setPhoneRom] = useState<string>('all');
  const [phoneNeed, setPhoneNeed] = useState<string>('all');

  // Bộ lọc riêng cho Laptop
  const [laptopCpu, setLaptopCpu] = useState<string>('all');
  const [laptopRam, setLaptopRam] = useState<string>('all');
  const [laptopNeed, setLaptopNeed] = useState<string>('all');

  // Bộ lọc riêng cho Tablet
  const [tabletSim, setTabletSim] = useState<string>('all');

  // Chuyển đổi category
  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    resetFilters();
    router.push(`/dien-thoai?category=${slug}`);
  };

  const resetFilters = () => {
    setSelectedBrand('all');
    setPriceRange('all');
    setPhoneRam('all');
    setPhoneRom('all');
    setPhoneNeed('all');
    setLaptopCpu('all');
    setLaptopRam('all');
    setLaptopNeed('all');
    setTabletSim('all');
  };

  // 1. Lọc sản phẩm đúng thể loại (Điện thoại hoặc Laptop hoặc Tablet...)
  const categoryProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // 2. Lọc sản phẩm chi tiết theo bộ lọc riêng của từng thể loại
  const filteredProducts = useMemo(() => {
    let list = [...categoryProducts];

    // Lọc theo Hãng
    if (selectedBrand !== 'all') {
      list = list.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    // Lọc theo Mức giá
    if (priceRange === 'under-10m') {
      list = list.filter((p) => p.variants[0].salePrice < 10000000);
    } else if (priceRange === '10m-20m') {
      list = list.filter((p) => p.variants[0].salePrice >= 10000000 && p.variants[0].salePrice <= 20000000);
    } else if (priceRange === 'above-20m') {
      list = list.filter((p) => p.variants[0].salePrice > 20000000);
    }

    // --- LỌC RIÊNG CHO ĐIỆN THOẠI ---
    if (selectedCategory === 'dien-thoai') {
      if (phoneRam !== 'all') {
        list = list.filter((p) => p.specs.ram.includes(phoneRam));
      }
      if (phoneRom !== 'all') {
        list = list.filter((p) => p.variants.some((v) => v.storage === phoneRom));
      }
      if (phoneNeed === 'gaming') {
        list = list.filter((p) => p.specs.cpu.includes('Snapdragon 8') || p.specs.cpu.includes('A18') || p.specs.cpu.includes('A16'));
      } else if (phoneNeed === 'battery') {
        list = list.filter((p) => p.specs.battery.includes('5000') || p.specs.battery.includes('4685'));
      } else if (phoneNeed === 'camera') {
        list = list.filter((p) => p.specs.rearCamera.includes('200 MP') || p.specs.rearCamera.includes('Leica') || p.brand === 'Apple');
      }
    }

    // --- LỌC RIÊNG CHO LAPTOP ---
    if (selectedCategory === 'laptop') {
      if (laptopCpu !== 'all') {
        list = list.filter((p) => p.specs.cpu.toLowerCase().includes(laptopCpu.toLowerCase()));
      }
      if (laptopRam !== 'all') {
        list = list.filter((p) => p.specs.ram.includes(laptopRam));
      }
      if (laptopNeed === 'gaming') {
        list = list.filter((p) => p.highlights.some((h) => h.toLowerCase().includes('rtx') || h.toLowerCase().includes('gaming')));
      } else if (laptopNeed === 'office') {
        list = list.filter((p) => p.highlights.some((h) => h.toLowerCase().includes('mỏng') || h.toLowerCase().includes('office') || h.toLowerCase().includes('pin')));
      }
    }

    // --- LỌC RIÊNG CHO TABLET ---
    if (selectedCategory === 'tablet') {
      if (tabletSim === '5g') {
        list = list.filter((p) => p.specs.sim.includes('5G'));
      } else if (tabletSim === 'wifi') {
        list = list.filter((p) => p.specs.sim.toLowerCase().includes('wi-fi'));
      }
    }

    // Sắp xếp
    if (sortBy === 'PRICE_ASC') {
      list.sort((a, b) => a.variants[0].salePrice - b.variants[0].salePrice);
    } else if (sortBy === 'PRICE_DESC') {
      list.sort((a, b) => b.variants[0].salePrice - a.variants[0].salePrice);
    }

    return list;
  }, [categoryProducts, selectedCategory, selectedBrand, priceRange, phoneRam, phoneRom, phoneNeed, laptopCpu, laptopRam, laptopNeed, tabletSim, sortBy]);

  // Danh sách hãng có sản phẩm trong thể loại đang chọn
  const availableBrands = useMemo(() => {
    const brandSet = new Set(categoryProducts.map((p) => p.brand));
    return BRANDS.filter((b) => brandSet.has(b.name));
  }, [categoryProducts]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 space-y-6">
        {/* THANH CHỌN THỂ LOẠI (ĐIỆN THOẠI, LAPTOP, TABLET...) */}
        <div className="bg-white rounded-2xl p-2.5 border border-gray-200 shadow-sm flex items-center gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'dien-thoai', name: 'Điện thoại', icon: Smartphone },
            { id: 'laptop', name: 'Laptop', icon: Laptop },
            { id: 'tablet', name: 'Tablet', icon: Tablet },
            { id: 'phu-kien', name: 'Phụ kiện', icon: Headphones },
            { id: 'smartwatch', name: 'Smartwatch', icon: Watch },
          ].map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap shadow-xs ${
                  isSelected
                    ? 'bg-[#ffd400] text-black shadow-md scale-102'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.name}</span>
                <span className="text-[10px] bg-black/10 px-1.5 py-0.2 rounded-full font-semibold">
                  {MOCK_PRODUCTS.filter((p) => p.category === cat.id).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* BANNER THEO TỪNG THỂ LOẠI */}
        <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-2xl p-6 text-black flex items-center justify-between shadow-sm">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight flex items-center gap-2">
              {selectedCategory === 'dien-thoai' && <Smartphone className="w-8 h-8" />}
              {selectedCategory === 'laptop' && <Laptop className="w-8 h-8" />}
              {selectedCategory === 'tablet' && <Tablet className="w-8 h-8" />}
              {selectedCategory === 'phu-kien' && <Headphones className="w-8 h-8" />}
              {selectedCategory === 'smartwatch' && <Watch className="w-8 h-8" />}
              <span>
                {selectedCategory === 'dien-thoai' && 'ĐIỆN THOẠI CHÍNH HÃNG'}
                {selectedCategory === 'laptop' && 'LAPTOP CHÍNH HÃNG - MỎNG NHẸ & GAMING'}
                {selectedCategory === 'tablet' && 'MÁY TÍNH BẢNG (TABLET) CHÍNH HÃNG'}
                {selectedCategory === 'phu-kien' && 'PHỤ KIỆN CÔNG NGHỆ CHÍNH HÃNG'}
                {selectedCategory === 'smartwatch' && 'ĐỒNG HỒ THÔNG MINH (SMARTWATCH)'}
              </span>
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-gray-900 mt-1">
              Cam kết 100% hàng mới chính hãng • Trả góp 0% duyệt online • Bảo hành 1 đổi 1 trong 30 ngày
            </p>
          </div>
          <div className="hidden sm:block text-right">
            <span className="bg-black text-[#ffd400] text-xs font-black px-3 py-1.5 rounded-lg uppercase">
              Thế Giới Di Động
            </span>
          </div>
        </div>

        {/* DANH SÁCH HÃNG THUỘC THỂ LOẠI NÀY */}
        {availableBrands.length > 0 && (
          <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm flex items-center gap-2.5 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setSelectedBrand('all')}
              className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                selectedBrand === 'all'
                  ? 'bg-black text-[#ffd400]'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tất cả hãng ({categoryProducts.length})
            </button>
            {availableBrands.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBrand(b.slug)}
                className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition border flex items-center gap-1.5 ${
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

        {/* BỘ LỌC NHANH RIÊNG BIỆT CHO TỪNG THỂ LOẠI */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-bold text-gray-700 border-b pb-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-yellow-500" />
              <span>
                BỘ LỌC TÌM KIẾM CHO{' '}
                <span className="text-black uppercase">
                  {selectedCategory === 'dien-thoai' && 'ĐIỆN THOẠI'}
                  {selectedCategory === 'laptop' && 'LAPTOP'}
                  {selectedCategory === 'tablet' && 'TABLET'}
                  {selectedCategory === 'phu-kien' && 'PHỤ KIỆN'}
                  {selectedCategory === 'smartwatch' && 'SMARTWATCH'}
                </span>
              </span>
              <button
                onClick={resetFilters}
                className="text-red-600 hover:underline flex items-center gap-1 text-[11px] font-semibold ml-2"
              >
                <X className="w-3 h-3" /> Xóa bộ lọc
              </button>
            </div>

            {/* Sắp xếp */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
              <span>Sắp xếp:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-black font-semibold"
              >
                <option value="POPULAR">Bán chạy nhất</option>
                <option value="PRICE_ASC">Giá tăng dần</option>
                <option value="PRICE_DESC">Giá giảm dần</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* Lọc khoảng giá chung */}
            <div>
              <span className="font-bold text-gray-700 block mb-2">Khoảng giá:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'Tất cả giá' },
                  { id: 'under-10m', label: 'Dưới 10 triệu' },
                  { id: '10m-20m', label: '10 - 20 triệu' },
                  { id: 'above-20m', label: 'Trên 20 triệu' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPriceRange(item.id)}
                    className={`px-2.5 py-1 rounded-md border transition text-[11px] font-medium ${
                      priceRange === item.id
                        ? 'border-yellow-500 bg-yellow-400 text-black font-bold'
                        : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* CÁC TIÊU CHÍ LỌC RIÊNG CỦA ĐIỆN THOẠI */}
            {selectedCategory === 'dien-thoai' && (
              <>
                <div>
                  <span className="font-bold text-gray-700 block mb-2 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Nhu cầu sử dụng:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'all', label: 'Tất cả' },
                      { id: 'gaming', label: 'Chơi game đỉnh' },
                      { id: 'battery', label: 'Pin trâu khủng' },
                      { id: 'camera', label: 'Chụp ảnh nét' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setPhoneNeed(item.id)}
                        className={`px-2.5 py-1 rounded-md border transition text-[11px] font-medium ${
                          phoneNeed === item.id
                            ? 'border-yellow-500 bg-yellow-400 text-black font-bold'
                            : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-gray-700 block mb-2">Dung lượng RAM:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['all', '6 GB', '8 GB', '12 GB'].map((ram) => (
                      <button
                        key={ram}
                        onClick={() => setPhoneRam(ram)}
                        className={`px-2.5 py-1 rounded-md border transition text-[11px] font-medium ${
                          phoneRam === ram
                            ? 'border-black bg-black text-[#ffd400] font-bold'
                            : 'border-gray-200 bg-gray-50 text-gray-700'
                        }`}
                      >
                        {ram === 'all' ? 'Tất cả' : ram}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-gray-700 block mb-2">Bộ nhớ ROM:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['all', '128GB', '256GB'].map((rom) => (
                      <button
                        key={rom}
                        onClick={() => setPhoneRom(rom)}
                        className={`px-2.5 py-1 rounded-md border transition text-[11px] font-medium ${
                          phoneRom === rom
                            ? 'border-black bg-black text-[#ffd400] font-bold'
                            : 'border-gray-200 bg-gray-50 text-gray-700'
                        }`}
                      >
                        {rom === 'all' ? 'Tất cả' : rom}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* CÁC TIÊU CHÍ LỌC RIÊNG CỦA LAPTOP */}
            {selectedCategory === 'laptop' && (
              <>
                <div>
                  <span className="font-bold text-gray-700 block mb-2 flex items-center gap-1">
                    <Laptop className="w-3.5 h-3.5 text-blue-600" /> Nhu cầu Laptop:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'all', label: 'Tất cả nhu cầu' },
                      { id: 'gaming', label: 'Gaming / Đồ họa RTX' },
                      { id: 'office', label: 'Mỏng nhẹ văn phòng' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setLaptopNeed(item.id)}
                        className={`px-2.5 py-1 rounded-md border transition text-[11px] font-medium ${
                          laptopNeed === item.id
                            ? 'border-yellow-500 bg-yellow-400 text-black font-bold'
                            : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-gray-700 block mb-2 flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-purple-600" /> Vi xử lý (CPU):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'all', label: 'Tất cả CPU' },
                      { id: 'M3', label: 'Apple M3' },
                      { id: 'i7', label: 'Intel Core i7' },
                      { id: 'i5', label: 'Intel Core i5' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setLaptopCpu(item.id)}
                        className={`px-2.5 py-1 rounded-md border transition text-[11px] font-medium ${
                          laptopCpu === item.id
                            ? 'border-black bg-black text-[#ffd400] font-bold'
                            : 'border-gray-200 bg-gray-50 text-gray-700'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-gray-700 block mb-2 flex items-center gap-1">
                    <HardDrive className="w-3.5 h-3.5 text-green-600" /> RAM Laptop:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['all', '16 GB'].map((ram) => (
                      <button
                        key={ram}
                        onClick={() => setLaptopRam(ram)}
                        className={`px-2.5 py-1 rounded-md border transition text-[11px] font-medium ${
                          laptopRam === ram
                            ? 'border-black bg-black text-[#ffd400] font-bold'
                            : 'border-gray-200 bg-gray-50 text-gray-700'
                        }`}
                      >
                        {ram === 'all' ? 'Tất cả' : ram}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* CÁC TIÊU CHÍ LỌC RIÊNG CỦA TABLET */}
            {selectedCategory === 'tablet' && (
              <div>
                <span className="font-bold text-gray-700 block mb-2">Kết nối mạng:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'all', label: 'Tất cả' },
                    { id: '5g', label: 'Có SIM 5G nghe gọi' },
                    { id: 'wifi', label: 'Chỉ Wi-Fi' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setTabletSim(item.id)}
                      className={`px-2.5 py-1 rounded-md border transition text-[11px] font-medium ${
                        tabletSim === item.id
                          ? 'border-yellow-500 bg-yellow-400 text-black font-bold'
                          : 'border-gray-200 bg-gray-50 text-gray-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* DANH SÁCH SẢN PHẨM HOẶC BÁO "HIỆN TẠI SẢN PHẨM KHÔNG CÓ HÀNG" */}
        <div>
          <div className="text-xs text-gray-500 mb-3 flex items-center justify-between">
            <span>
              Tìm thấy <span className="font-bold text-gray-900">{filteredProducts.length}</span> sản phẩm phù hợp
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            /* THÔNG BÁO KHI KHÔNG CÓ SẢN PHẨM NÀO THEO ĐÚNG YÊU CẦU */
            <div className="bg-white rounded-2xl p-12 text-center text-gray-500 border border-gray-200 space-y-4 shadow-sm animate-in fade-in">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
                <PackageX className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-gray-900">
                  HIỆN TẠI SẢN PHẨM KHÔNG CÓ HÀNG
                </h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto">
                  Rất tiếc, danh mục này hiện tại tạm thời hết hàng hoặc không có sản phẩm nào thỏa mãn bộ lọc bạn đã chọn. Quý khách vui lòng chọn danh mục khác hoặc xóa bộ lọc để xem các sản phẩm khác!
                </p>
              </div>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={resetFilters}
                  className="bg-[#ffd400] text-black font-black text-xs px-5 py-2.5 rounded-xl hover:bg-[#ecc200] transition shadow-xs"
                >
                  Xóa bộ lọc danh mục này
                </button>
                <button
                  onClick={() => handleCategoryChange('dien-thoai')}
                  className="bg-gray-100 text-gray-800 font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-gray-200 transition"
                >
                  Về danh mục Điện Thoại
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function CategoryPhonePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-gray-500">Đang tải danh mục sản phẩm...</div>}>
      <CategoryContent />
    </Suspense>
  );
}
