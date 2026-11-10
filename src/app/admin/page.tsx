'use client';

import React from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  ShoppingBag, 
  Barcode, 
  AlertTriangle, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  Smartphone
} from 'lucide-react';
import { MOCK_ORDERS, MOCK_PRODUCTS } from '@/data/mock-data';

export default function AdminDashboardPage() {
  const formatPrice = (p: number) => {
    return new Intl.NumberFormat('vi-VN').format(p) + '₫';
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-black text-gray-900">BẢNG ĐIỀU KHIỂN QUẢN TRỊ (DASHBOARD)</h1>
          <p className="text-xs text-gray-500">Số liệu bán hàng và vận hành kho tính đến thời điểm hiện tại</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/products"
            className="bg-[#ffd400] hover:bg-[#ecc200] text-black text-xs font-bold px-3 py-2 rounded-lg transition"
          >
            + Thêm Sản Phẩm Mới
          </Link>
          <Link
            href="/admin/inventory"
            className="bg-black hover:bg-neutral-800 text-white text-xs font-bold px-3 py-2 rounded-lg transition"
          >
            Nhập Kho IMEI
          </Link>
        </div>
      </div>

      {/* 4 Thẻ KPI Chỉ Số Chính */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Doanh thu hôm nay */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Doanh thu hôm nay</span>
            <div className="p-1.5 bg-green-50 text-green-600 rounded-lg">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900">80.970.000₫</div>
          <div className="flex items-center gap-1 text-[11px] text-green-600 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.5% so với hôm qua</span>
          </div>
        </div>

        {/* Đơn hàng mới */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Đơn hàng mới</span>
            <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900">14 Đơn</div>
          <div className="text-[11px] text-blue-600 font-semibold">
            Có 3 đơn đang chờ xác nhận
          </div>
        </div>

        {/* Thiết bị đã gán IMEI */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Máy xuất kho (gán IMEI)</span>
            <div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg">
              <Barcode className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900">9 Thiết bị</div>
          <div className="text-[11px] text-gray-500">
            Đã kích hoạt bảo hành điện tử
          </div>
        </div>

        {/* Cảnh báo tồn kho */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Cảnh báo tồn kho</span>
            <div className="p-1.5 bg-red-50 text-red-600 rounded-lg">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-red-600">2 Mẫu máy</div>
          <div className="text-[11px] text-red-500 font-semibold">
            Tồn kho dưới 10 máy, cần nhập thêm
          </div>
        </div>
      </div>

      {/* Grid: Đơn hàng mới cần duyệt & Top điện thoại bán chạy */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bảng Đơn Hàng Mới (2 Cột) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="font-bold text-sm text-gray-900">Đơn hàng mới tiếp nhận</h3>
              <p className="text-[11px] text-gray-500">Cần gọi điện xác thực và quét gán mã IMEI</p>
            </div>
            <Link href="/admin/orders" className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1">
              Xem tất cả đơn <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Mã đơn</th>
                  <th className="py-2.5 px-3">Khách hàng</th>
                  <th className="py-2.5 px-3">Sản phẩm</th>
                  <th className="py-2.5 px-3">Thanh toán</th>
                  <th className="py-2.5 px-3">Trạng thái</th>
                  <th className="py-2.5 px-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {MOCK_ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/80">
                    <td className="py-3 px-3 font-mono font-bold text-gray-900">{order.orderCode}</td>
                    <td className="py-3 px-3">
                      <div>{order.customerName}</div>
                      <div className="text-gray-400 text-[10px]">{order.customerPhone}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-gray-900">{order.items[0]?.productName}</div>
                      <div className="text-gray-400 text-[10px]">{order.items[0]?.variantName}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        order.paymentStatus === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.paymentStatus === 'PAID' ? 'ĐÃ TRẢ' : 'CHƯA TRẢ (COD)'}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-blue-600 font-bold text-[11px]">
                        {order.orderStatus === 'PREPARING' ? 'Gán IMEI' : order.orderStatus === 'PENDING' ? 'Chờ duyệt' : 'Hoàn tất'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        href={`/admin/orders`}
                        className="bg-gray-100 hover:bg-black hover:text-white px-2.5 py-1 rounded text-[11px] font-bold transition"
                      >
                        Xử lý
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Sản Phẩm Bán Chạy (1 Cột) */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-4">
          <div className="border-b pb-3">
            <h3 className="font-bold text-sm text-gray-900">Điện thoại bán chạy</h3>
            <p className="text-[11px] text-gray-500">Xếp hạng theo số lượng máy đã kích hoạt</p>
          </div>

          <div className="space-y-3">
            {MOCK_PRODUCTS.map((p, idx) => (
              <div key={p.id} className="flex items-center justify-between text-xs pb-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-gray-100 font-bold text-gray-700 flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                  <img src={p.thumbnail} alt={p.name} className="w-9 h-9 object-contain" />
                  <div>
                    <div className="font-bold text-gray-900 truncate max-w-[140px]">{p.name}</div>
                    <div className="text-gray-400 text-[10px]">{p.brand}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">{formatPrice(p.variants[0].salePrice)}</div>
                  <div className="text-green-600 text-[10px] font-semibold">Tồn: {p.variants[0].stockQuantity}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
