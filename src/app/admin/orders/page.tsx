'use client';

import React, { useState } from 'react';
import { MOCK_ORDERS } from '@/data/mock-data';
import { Search, Filter, Barcode, CheckCircle, Clock, Truck, XCircle, Printer } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [imeiInput, setImeiInput] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat('vi-VN').format(p) + '₫';
  };

  const handleAssignImei = (orderId: string) => {
    if (!imeiInput.trim()) return;

    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            orderStatus: 'SHIPPING' as const,
            items: o.items.map((it) => ({
              ...it,
              assignedImei: imeiInput.trim(),
            })),
          };
        }
        return o;
      })
    );

    setSuccessMessage(`Đã gán thành công mã IMEI [${imeiInput.trim()}] cho đơn hàng! Trạng thái chuyển sang: Đang giao hàng.`);
    setSelectedOrder(null);
    setImeiInput('');
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const filteredOrders = orders.filter((o) => {
    if (activeFilter === 'PENDING') return o.orderStatus === 'PENDING';
    if (activeFilter === 'PREPARING') return o.orderStatus === 'PREPARING';
    if (activeFilter === 'SHIPPING') return o.orderStatus === 'SHIPPING';
    if (activeFilter === 'COMPLETED') return o.orderStatus === 'COMPLETED';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-black text-gray-900">QUẢN LÝ ĐƠN HÀNG & GÁN MÃ IMEI</h1>
          <p className="text-xs text-gray-500">Tiếp nhận đơn hàng, xác thực khách hàng và xuất kho gắn mã IMEI bảo hành</p>
        </div>
      </div>

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 text-xs font-bold p-3 rounded-xl flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setActiveFilter('ALL')}
          className={`px-3 py-1.5 rounded-lg font-bold transition ${
            activeFilter === 'ALL' ? 'bg-black text-[#ffd400]' : 'bg-white border text-gray-600'
          }`}
        >
          Tất cả đơn ({orders.length})
        </button>
        <button
          onClick={() => setActiveFilter('PENDING')}
          className={`px-3 py-1.5 rounded-lg font-bold transition ${
            activeFilter === 'PENDING' ? 'bg-black text-[#ffd400]' : 'bg-white border text-gray-600'
          }`}
        >
          Chờ xác nhận
        </button>
        <button
          onClick={() => setActiveFilter('PREPARING')}
          className={`px-3 py-1.5 rounded-lg font-bold transition ${
            activeFilter === 'PREPARING' ? 'bg-black text-[#ffd400]' : 'bg-white border text-gray-600'
          }`}
        >
          Cần gán IMEI xuất kho
        </button>
        <button
          onClick={() => setActiveFilter('SHIPPING')}
          className={`px-3 py-1.5 rounded-lg font-bold transition ${
            activeFilter === 'SHIPPING' ? 'bg-black text-[#ffd400]' : 'bg-white border text-gray-600'
          }`}
        >
          Đang giao
        </button>
        <button
          onClick={() => setActiveFilter('COMPLETED')}
          className={`px-3 py-1.5 rounded-lg font-bold transition ${
            activeFilter === 'COMPLETED' ? 'bg-black text-[#ffd400]' : 'bg-white border text-gray-600'
          }`}
        >
          Hoàn tất
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-600 uppercase font-bold border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">Mã đơn hàng</th>
                <th className="py-3 px-4">Khách hàng</th>
                <th className="py-3 px-4">Sản phẩm</th>
                <th className="py-3 px-4">Tổng tiền</th>
                <th className="py-3 px-4">Thanh toán</th>
                <th className="py-3 px-4">Mã IMEI máy</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-900">
                    {order.orderCode}
                    <div className="text-[10px] text-gray-400 font-normal">{order.createdAt}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900">{order.customerName}</div>
                    <div className="text-gray-500 text-[11px]">{order.customerPhone}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-gray-900 font-semibold">{order.items[0]?.productName}</div>
                    <div className="text-gray-500 text-[11px]">{order.items[0]?.variantName}</div>
                  </td>
                  <td className="py-3.5 px-4 font-black text-[#d0021b]">
                    {formatPrice(order.totalAmount)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      order.paymentStatus === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.paymentMethod} • {order.paymentStatus === 'PAID' ? 'Đã TT' : 'Thu COD'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {order.items[0]?.assignedImei ? (
                      <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {order.items[0]?.assignedImei}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-[11px] italic">Chưa gán máy</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                      order.orderStatus === 'PREPARING'
                        ? 'bg-orange-100 text-orange-800'
                        : order.orderStatus === 'PENDING'
                        ? 'bg-yellow-100 text-yellow-800'
                        : order.orderStatus === 'SHIPPING'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {!order.items[0]?.assignedImei && (
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="bg-[#ffd400] hover:bg-[#ecc200] text-black font-bold px-2.5 py-1 rounded text-[11px] flex items-center gap-1 transition"
                        >
                          <Barcode className="w-3.5 h-3.5" /> Gán IMEI
                        </button>
                      )}
                      <button
                        onClick={() => window.print()}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-1.5 rounded transition"
                        title="In phiếu xuất kho"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Quét Gán Mã IMEI */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                <Barcode className="w-4 h-4 text-yellow-500" />
                Gán Mã IMEI Cho Đơn: {selectedOrder.orderCode}
              </h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-black font-bold"
              >
                ✕
              </button>
            </div>

            <div className="text-xs bg-gray-50 p-3 rounded-lg space-y-1">
              <div><span className="font-semibold text-gray-500">Khách nhận:</span> {selectedOrder.customerName} ({selectedOrder.customerPhone})</div>
              <div><span className="font-semibold text-gray-500">Máy xuất kho:</span> <span className="font-bold text-gray-900">{selectedOrder.items[0]?.productName}</span></div>
              <div><span className="font-semibold text-gray-500">Phiên bản:</span> {selectedOrder.items[0]?.variantName}</div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700">
                Nhập hoặc Quét Barcode 15 số IMEI của máy:
              </label>
              <input
                type="text"
                autoFocus
                placeholder="VD: 358920114829104"
                value={imeiInput}
                onChange={(e) => setImeiInput(e.target.value)}
                className="w-full border-2 border-gray-300 focus:border-yellow-500 rounded-lg p-2.5 font-mono text-sm focus:outline-none"
              />
              <p className="text-[11px] text-gray-400">
                Gợi ý mã IMEI có sẵn trong kho: <span className="font-mono text-blue-600 font-bold">358920114829103</span>
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Hủy
              </button>
              <button
                onClick={() => handleAssignImei(selectedOrder.id)}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-black text-[#ffd400] hover:bg-neutral-800"
              >
                Xác nhận gán & Xuất kho
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
