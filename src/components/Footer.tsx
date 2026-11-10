import React from 'react';
import Link from 'next/link';
import { PhoneCall, ShieldCheck, Truck, RotateCcw, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 text-xs text-gray-600">
      {/* 4 Cam kết dịch vụ TGDD */}
      <div className="border-b border-gray-100 bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-gray-900">Giao hàng siêu tốc 2h</div>
              <div className="text-[11px] text-gray-500">Miễn phí cho đơn từ 500k</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-gray-900">Hư gì đổi nấy 12 tháng</div>
              <div className="text-[11px] text-gray-500">Tại hơn 3000 siêu thị toàn quốc</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-gray-900">Hàng chính hãng 100%</div>
              <div className="text-[11px] text-gray-500">Xuất hóa đơn VAT điện tử</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-gray-900">Bảo hành theo IMEI</div>
              <div className="text-[11px] text-gray-500">Tra cứu nhanh chóng online</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold text-gray-900 mb-3 text-sm">Tổng đài hỗ trợ (Miễn phí)</h4>
          <ul className="space-y-1.5">
            <li>Gọi mua: <span className="font-bold text-blue-600">1800.1060</span> (7:30 - 22:00)</li>
            <li>Khiếu nại: <span className="font-bold text-blue-600">1800.1062</span> (8:00 - 21:30)</li>
            <li>Bảo hành: <span className="font-bold text-blue-600">1800.1064</span> (8:00 - 21:00)</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-3 text-sm">Về công ty</h4>
          <ul className="space-y-1.5">
            <li><Link href="#" className="hover:text-blue-600">Giới thiệu công ty</Link></li>
            <li><Link href="#" className="hover:text-blue-600">Tuyển dụng mới nhất</Link></li>
            <li><Link href="#" className="hover:text-blue-600">Chính sách bảo mật</Link></li>
            <li><Link href="#" className="hover:text-blue-600">Quy chế hoạt động sàn TMĐT</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-3 text-sm">Thông tin & Chính sách</h4>
          <ul className="space-y-1.5">
            <li><Link href="/tra-cuu" className="hover:text-blue-600">Tra cứu thông tin đơn hàng</Link></li>
            <li><Link href="/tra-cuu" className="hover:text-blue-600">Tra cứu bảo hành theo số IMEI</Link></li>
            <li><Link href="#" className="hover:text-blue-600">Chính sách đổi trả bảo hành</Link></li>
            <li><Link href="/tra-gop" className="hover:text-blue-600">Hướng dẫn mua hàng trả góp 0%</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-3 text-sm">Hệ thống phân hệ</h4>
          <p className="text-gray-500 mb-3">
            Hệ thống website thương mại điện tử chuyên nghiệp mô phỏng mô hình Thegioididong.com.
          </p>
          <div className="flex flex-col gap-2">
            <Link 
              href="/admin" 
              className="inline-flex items-center justify-center bg-black hover:bg-neutral-800 text-[#ffd400] font-bold px-4 py-2 rounded text-xs transition"
            >
              Truy cập Cổng Quản Trị (Admin Portal) →
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-4 text-center text-gray-500 text-[11px] border-t border-gray-200">
        © 2026 thegioididong Clone Platform. Dự án thực hành hệ thống thương mại điện tử đa phân hệ.
      </div>
    </footer>
  );
}
