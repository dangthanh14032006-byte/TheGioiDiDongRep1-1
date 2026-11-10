import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Cpu, Smartphone, HardDrive } from 'lucide-react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const defaultVariant = product.variants[0];
  const discountPercent = Math.round(
    ((defaultVariant.originalPrice - defaultVariant.salePrice) / defaultVariant.originalPrice) * 100
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-yellow-400 hover:shadow-lg transition-all duration-300 p-3 flex flex-col justify-between group relative overflow-hidden">
      {/* Badges góc trên */}
      <div className="flex items-center gap-1.5 flex-wrap mb-2">
        {product.installment0 && (
          <span className="bg-gray-100 text-gray-800 text-[10px] font-bold px-1.5 py-0.5 rounded border border-gray-300">
            Trả góp 0%
          </span>
        )}
        {discountPercent > 0 && (
          <span className="bg-[#d0021b] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded">
            Giảm {discountPercent}%
          </span>
        )}
      </div>

      {/* Ảnh sản phẩm */}
      <Link href={`/dien-thoai/${product.slug}`} className="block relative h-48 w-full my-2 overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </Link>

      {/* Các phiên bản bộ nhớ nhanh */}
      <div className="flex items-center gap-1 mb-2">
        {product.variants.map((v) => (
          <span 
            key={v.id} 
            className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 border border-gray-200"
          >
            {v.storage}
          </span>
        ))}
      </div>

      {/* Tên sản phẩm */}
      <Link href={`/dien-thoai/${product.slug}`} className="block mb-2">
        <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition line-clamp-2">
          {product.name} {defaultVariant.storage}
        </h3>
      </Link>

      {/* Giá bán */}
      <div className="mb-3">
        <div className="text-base font-extrabold text-[#d0021b]">
          {formatPrice(defaultVariant.salePrice)}
        </div>
        {discountPercent > 0 && (
          <div className="text-xs text-gray-400 line-through">
            {formatPrice(defaultVariant.originalPrice)}
          </div>
        )}
      </div>

      {/* Bảng cấu hình rút gọn đặc trưng TGDD */}
      <div className="bg-gray-50 rounded p-2 text-[11px] text-gray-600 space-y-1 mb-3">
        <div className="flex items-center gap-1 truncate">
          <Smartphone className="w-3 h-3 text-gray-400 flex-shrink-0" />
          <span className="truncate">{product.specs.screen}</span>
        </div>
        <div className="flex items-center gap-1 truncate">
          <Cpu className="w-3 h-3 text-gray-400 flex-shrink-0" />
          <span className="truncate">{product.specs.cpu}</span>
        </div>
        <div className="flex items-center gap-1 truncate">
          <HardDrive className="w-3 h-3 text-gray-400 flex-shrink-0" />
          <span>RAM {product.specs.ram} • ROM {product.specs.storage}</span>
        </div>
      </div>

      {/* Đánh giá sao & bảo hành */}
      <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-gray-100">
        <div className="flex items-center gap-1">
          <div className="flex text-yellow-400">
            <Star className="w-3.5 h-3.5 fill-yellow-400" />
          </div>
          <span className="font-bold text-gray-700">{product.rating}</span>
          <span className="text-gray-400">({product.reviewsCount})</span>
        </div>
        <span className="text-gray-400 text-[10px]">BH {product.warrantyMonths}T</span>
      </div>
    </div>
  );
}
