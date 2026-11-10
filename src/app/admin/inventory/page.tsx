'use client';

import React, { useState } from 'react';
import { MOCK_IMEIS } from '@/data/mock-data';
import { Barcode, Search, Plus, CheckCircle2, ShieldCheck, AlertCircle, FileSpreadsheet } from 'lucide-react';

export default function AdminInventoryPage() {
  const [imeiList, setImeiList] = useState(MOCK_IMEIS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newImeisText, setNewImeisText] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('iPhone 16 Pro Max 256GB');
  const [selectedLocation, setSelectedLocation] = useState('Kho TP.HCM');
  const [successMsg, setSuccessMsg] = useState('');

  const handleBatchImport = (e: React.FormEvent) => {
    e.preventDefault();
    const rawImeis = newImeisText
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 5);

    if (rawImeis.length === 0) return;

    const newRecords = rawImeis.map((code, idx) => ({
      id: `imei-new-${Date.now()}-${idx}`,
      variantId: 'var-new',
      productName: selectedProduct,
      variantSku: 'SKU-NEW',
      imei: code,
      status: 'IN_STOCK' as const,
      storeLocation: selectedLocation,
      importDate: new Date().toISOString().split('T')[0],
    }));

    setImeiList((prev) => [...newRecords, ...prev]);
    setShowAddModal(false);
    setNewImeisText('');
    setSuccessMsg(`Đã nhập thành công ${newRecords.length} mã IMEI vào ${selectedLocation}!`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const filtered = imeiList.filter((item) => {
    if (statusFilter !== 'ALL' && item.status !== statusFilter) return false;
    if (search && !item.imei.includes(search) && !item.productName.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-black text-gray-900">QUẢN LÝ KHO HÀNG THEO SỐ IMEI / SERIAL</h1>
          <p className="text-xs text-gray-500">Định danh từng thiết bị vật lý trong chuỗi siêu thị để phục vụ bảo hành chính hãng</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-black text-[#ffd400] hover:bg-neutral-800 text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 transition"
        >
          <Plus className="w-4 h-4" /> Nhập Kho IMEI Hàng Loạt
        </button>
      </div>

      {successMsg && (
        <div className="bg-green-50 border border-green-200 text-green-800 text-xs font-bold p-3 rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3 rounded-xl border border-gray-200">
          <div className="text-[11px] text-gray-500">Tổng máy trong hệ thống</div>
          <div className="text-xl font-black text-gray-900">{imeiList.length} Máy</div>
        </div>
        <div className="bg-white p-3 rounded-xl border border-gray-200">
          <div className="text-[11px] text-gray-500">Sẵn sàng xuất bán (Trong kho)</div>
          <div className="text-xl font-black text-green-600">
            {imeiList.filter((i) => i.status === 'IN_STOCK').length} Máy
          </div>
        </div>
        <div className="bg-white p-3 rounded-xl border border-gray-200">
          <div className="text-[11px] text-gray-500">Đã bán cho khách</div>
          <div className="text-xl font-black text-blue-600">
            {imeiList.filter((i) => i.status === 'SOLD').length} Máy
          </div>
        </div>
        <div className="bg-white p-3 rounded-xl border border-gray-200">
          <div className="text-[11px] text-gray-500">Máy lỗi / Đang bảo hành</div>
          <div className="text-xl font-black text-red-600">
            {imeiList.filter((i) => i.status === 'DEFECTIVE' || i.status === 'WARRANTY').length} Máy
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-gray-200">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Tìm theo số IMEI (15 số) hoặc tên máy..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
          />
        </div>

        <div className="flex items-center gap-2 text-xs w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
              statusFilter === 'ALL' ? 'bg-[#ffd400] text-black' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setStatusFilter('IN_STOCK')}
            className={`px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
              statusFilter === 'IN_STOCK' ? 'bg-[#ffd400] text-black' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Trong kho
          </button>
          <button
            onClick={() => setStatusFilter('SOLD')}
            className={`px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
              statusFilter === 'SOLD' ? 'bg-[#ffd400] text-black' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Đã bán
          </button>
        </div>
      </div>

      {/* IMEI Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-600 uppercase font-bold border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">Số IMEI (Serial)</th>
                <th className="py-3 px-4">Tên thiết bị</th>
                <th className="py-3 px-4">Vị trí kho / Chi nhánh</th>
                <th className="py-3 px-4">Ngày nhập</th>
                <th className="py-3 px-4">Mã đơn xuất</th>
                <th className="py-3 px-4">Tình trạng máy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono font-bold text-blue-700">
                    {item.imei}
                  </td>
                  <td className="py-3 px-4 font-bold text-gray-900">
                    {item.productName}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {item.storeLocation}
                  </td>
                  <td className="py-3 px-4 text-gray-500">
                    {item.importDate}
                  </td>
                  <td className="py-3 px-4 font-mono text-gray-700">
                    {item.orderCode ? (
                      <span className="text-black font-semibold">{item.orderCode}</span>
                    ) : (
                      <span className="text-gray-400 italic">Chưa bán</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.status === 'IN_STOCK'
                        ? 'bg-green-100 text-green-700'
                        : item.status === 'SOLD'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {item.status === 'IN_STOCK' ? 'TRONG KHO' : item.status === 'SOLD' ? 'ĐÃ XUẤT BÁN' : 'LỖI/BẢO HÀNH'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Nhập Kho Hàng Loạt */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleBatchImport} className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-green-600" />
                Nhập Lô Hàng & Mã IMEI Mới
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-black font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Thiết bị nhập *</label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:outline-none"
                >
                  <option value="iPhone 16 Pro Max 256GB">iPhone 16 Pro Max 256GB</option>
                  <option value="Samsung Galaxy S24 Ultra 256GB">Samsung Galaxy S24 Ultra 256GB</option>
                  <option value="Xiaomi 14 5G 256GB">Xiaomi 14 5G 256GB</option>
                  <option value="OPPO Reno12 5G 256GB">OPPO Reno12 5G 256GB</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Kho tiếp nhận *</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:outline-none"
                >
                  <option value="Kho TP.HCM">Kho TP.HCM</option>
                  <option value="Kho Hà Nội">Kho Hà Nội</option>
                  <option value="Kho Đà Nẵng">Kho Đà Nẵng</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700">
                Dán danh sách mã IMEI (mỗi mã 1 dòng, copy từ Excel/máy quét):
              </label>
              <textarea
                required
                rows={5}
                placeholder={"358920114829105\n358920114829106\n358920114829107"}
                value={newImeisText}
                onChange={(e) => setNewImeisText(e.target.value)}
                className="w-full border rounded-lg p-2.5 font-mono text-xs focus:outline-none focus:border-black"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-xs font-bold bg-black text-[#ffd400] hover:bg-neutral-800"
              >
                Lưu vào kho
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
