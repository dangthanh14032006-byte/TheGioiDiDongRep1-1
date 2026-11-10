'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MOCK_PRODUCTS } from '@/data/mock-data';
import { 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Gift, 
  CreditCard, 
  Check, 
  ChevronRight, 
  Cpu, 
  Smartphone, 
  Battery, 
  Camera, 
  Layers,
  ArrowLeft
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  // Tìm sản phẩm theo slug (mặc định lấy iPhone nếu không khớp)
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug) || MOCK_PRODUCTS[0];

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const selectedVariant = product.variants[selectedVariantIndex] || product.variants[0];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const discountAmount = selectedVariant.originalPrice - selectedVariant.salePrice;
  const discountPercent = Math.round((discountAmount / selectedVariant.originalPrice) * 100);

  // Tính tiền trả góp ước tính (trả trước 30%, kỳ hạn 6 tháng, lãi 0%)
  const installmentMonthly = Math.round((selectedVariant.salePrice * 0.7) / 6);

  const handleBuyNow = () => {
    router.push('/gio-hang');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-4 space-y-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-blue-600">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/dien-thoai" className="hover:text-blue-600">Điện thoại</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-medium">{product.brand}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-bold">{product.name}</span>
        </div>

        {/* Tiêu đề & Đánh giá */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-3">
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">
            {product.name} {selectedVariant.storage} ({selectedVariant.colorName})
          </h1>
          <div className="flex items-center gap-3 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-gray-900">{product.rating}</span>
              <span>({product.reviewsCount} đánh giá)</span>
            </div>
            <span>•</span>
            <span className="text-green-600 font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Còn hàng ({selectedVariant.stockQuantity} máy)
            </span>
          </div>
        </div>

        {/* Main Grid: Cột Trái (Ảnh & Đánh giá) - Cột Giữa (Chọn màu, giá, mua) - Cột Phải (Thông số kỹ thuật) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* CỘT 1: HÌNH ẢNH SẢN PHẨM (5 CỘT) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center justify-center relative overflow-hidden shadow-sm">
              <img
                src={selectedVariant.image || product.thumbnail}
                alt={product.name}
                className="max-h-96 w-full object-contain transition-all duration-300"
              />
              {discountPercent > 0 && (
                <div className="absolute top-4 left-4 bg-[#d0021b] text-white text-xs font-black px-2 py-1 rounded">
                  GIẢM {discountPercent}%
                </div>
              )}
            </div>

            {/* Điểm nổi bật */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-2">
              <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                Đặc điểm nổi bật của {product.name}
              </h3>
              <ul className="text-xs text-gray-600 space-y-1.5 list-disc pl-4">
                {product.highlights.map((h, idx) => (
                  <li key={idx}>{h}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* CỘT 2: CHỌN PHIÊN BẢN, GIÁ, KHUYẾN MÃI & NÚT MUA (4 CỘT) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Bộ chọn dung lượng */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-gray-700">1. Chọn dung lượng:</span>
              <div className="flex items-center gap-2 flex-wrap">
                {product.variants.map((v, idx) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariantIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                      selectedVariantIndex === idx
                        ? 'border-yellow-500 bg-yellow-50 text-black shadow-sm'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {v.storage}
                  </button>
                ))}
              </div>
            </div>

            {/* Bộ chọn màu sắc */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-gray-700">2. Chọn màu sắc:</span>
              <div className="flex items-center gap-2 flex-wrap">
                {product.variants.map((v, idx) => (
                  <button
                    key={v.id + v.colorName}
                    onClick={() => setSelectedVariantIndex(idx)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                      selectedVariantIndex === idx
                        ? 'border-yellow-500 bg-yellow-50 text-black shadow-sm'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <span 
                      className="w-3.5 h-3.5 rounded-full border border-gray-300" 
                      style={{ backgroundColor: v.colorCode }}
                    ></span>
                    {v.colorName}
                  </button>
                ))}
              </div>
            </div>

            {/* Khu vực giá bán */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-3.5">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-[#d0021b]">
                  {formatPrice(selectedVariant.salePrice)}
                </span>
                {discountPercent > 0 && (
                  <span className="text-xs text-gray-400 line-through">
                    {formatPrice(selectedVariant.originalPrice)}
                  </span>
                )}
              </div>
              <p className="text-xs text-green-700 font-semibold mt-1">
                Tiết kiệm: {formatPrice(discountAmount)} ({discountPercent}%)
              </p>
            </div>

            {/* Khối Khuyến Mãi (TGDD Iconic Offer Box) */}
            <div className="border border-orange-300 bg-orange-50/50 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-orange-800 uppercase tracking-wide">
                <Gift className="w-4 h-4 text-orange-600" />
                Khuyến Mãi Trị Giá Đến 1.500.000₫
              </div>
              <ul className="text-xs text-gray-700 space-y-1.5">
                <li className="flex items-start gap-1.5">
                  <span className="bg-orange-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">1</span>
                  <span>Tặng gói bảo hành mở rộng rơi vỡ màn hình 12 tháng chính hãng.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="bg-orange-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">2</span>
                  <span>Giảm ngay 20% khi mua kèm củ sạc nhanh 25W hoặc tai nghe.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="bg-orange-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">3</span>
                  <span>Giảm thêm 500.000₫ khi thanh toán quét mã VietQR tự động.</span>
                </li>
              </ul>
            </div>

            {/* Các nút hành động mua hàng */}
            <div className="space-y-2 pt-2">
              {/* Nút MUA NGAY to rực rỡ */}
              <button
                onClick={handleBuyNow}
                className="w-full bg-[#d0021b] hover:bg-[#b50016] text-white py-3 rounded-xl font-black text-base shadow-md transition flex flex-col items-center justify-center"
              >
                <span>MUA NGAY</span>
                <span className="text-[11px] font-normal text-white/90">Giao hàng tận nơi hoặc nhận tại siêu thị</span>
              </button>

              {/* 2 Nút phụ: Trả góp 0% & Thêm giỏ */}
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/tra-gop"
                  className="bg-[#288ad6] hover:bg-[#1a74ba] text-white py-2.5 rounded-xl font-bold text-xs text-center flex flex-col items-center justify-center transition"
                >
                  <span>MUA TRẢ GÓP 0%</span>
                  <span className="text-[10px] text-white/90">Duyệt hồ sơ online</span>
                </Link>

                <button
                  onClick={handleBuyNow}
                  className="border-2 border-[#d0021b] text-[#d0021b] hover:bg-red-50 py-2.5 rounded-xl font-bold text-xs text-center flex flex-col items-center justify-center transition"
                >
                  <span>THÊM GIỎ HÀNG</span>
                  <span className="text-[10px] text-gray-500">Mua kèm phụ kiện</span>
                </button>
              </div>
            </div>

            {/* Thông tin hỗ trợ & bảo hành */}
            <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-600 space-y-1.5">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-600" />
                <span>Giao hàng miễn phí toàn quốc</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-green-600" />
                <span>Hư gì đổi nấy 12 tháng tại hơn 3000 siêu thị</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-red-600" />
                <span>Quản lý bảo hành điện tử chính hãng theo số IMEI</span>
              </div>
            </div>
          </div>

          {/* CỘT 3: BẢNG THÔNG SỐ KỸ THUẬT (3 CỘT) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
              <h3 className="font-extrabold text-sm text-gray-900 border-b pb-2 mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-yellow-500" />
                Thông số kỹ thuật {product.name}
              </h3>

              <div className="divide-y divide-gray-100 text-xs">
                <div className="py-2">
                  <span className="font-semibold text-gray-500 block">Màn hình:</span>
                  <span className="text-gray-900 font-medium">{product.specs.screen}</span>
                </div>
                <div className="py-2">
                  <span className="font-semibold text-gray-500 block">Chip xử lý (CPU):</span>
                  <span className="text-gray-900 font-medium">{product.specs.cpu}</span>
                </div>
                <div className="py-2">
                  <span className="font-semibold text-gray-500 block">RAM & Bộ nhớ:</span>
                  <span className="text-gray-900 font-medium">RAM {product.specs.ram} • ROM {selectedVariant.storage}</span>
                </div>
                <div className="py-2">
                  <span className="font-semibold text-gray-500 block">Camera sau:</span>
                  <span className="text-gray-900 font-medium">{product.specs.rearCamera}</span>
                </div>
                <div className="py-2">
                  <span className="font-semibold text-gray-500 block">Camera trước:</span>
                  <span className="text-gray-900 font-medium">{product.specs.frontCamera}</span>
                </div>
                <div className="py-2">
                  <span className="font-semibold text-gray-500 block">Pin & Sạc:</span>
                  <span className="text-gray-900 font-medium">{product.specs.battery}</span>
                </div>
                <div className="py-2">
                  <span className="font-semibold text-gray-500 block">Hệ điều hành:</span>
                  <span className="text-gray-900 font-medium">{product.specs.os}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
