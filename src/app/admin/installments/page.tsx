'use client';

import React, { useState } from 'react';
import { CreditCard, CheckCircle2, XCircle, PhoneCall, Clock, Search } from 'lucide-react';

interface InstallmentItem {
  id: string;
  code: string;
  customerName: string;
  phone: string;
  idCard: string;
  productName: string;
  prepaidPercent: number;
  termMonths: number;
  monthlyAmount: number;
  financeCompany: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

const INITIAL_INSTALLMENTS: InstallmentItem[] = [
  {
    id: 'ins-1',
    code: 'TGDD-TG-9821',
    customerName: 'Nguyễn Văn Thành',
    phone: '0988123456',
    idCard: '079098001234',
    productName: 'iPhone 16 Pro Max 256GB',
    prepaidPercent: 30,
    termMonths: 6,
    monthlyAmount: 3790500,
    financeCompany: 'Home Credit',
    status: 'PENDING',
    createdAt: '2026-11-10 15:45',
  },
  {
    id: 'ins-2',
    code: 'TGDD-TG-9819',
    customerName: 'Lê Hoàng Nam',
    phone: '0977889900',
    idCard: '001095009871',
    productName: 'Samsung Galaxy S24 Ultra 256GB',
    prepaidPercent: 20,
    termMonths: 12,
    monthlyAmount: 1932600,
    financeCompany: 'FE Credit',
    status: 'APPROVED',
    createdAt: '2026-11-10 11:20',
  },
  {
    id: 'ins-3',
    code: 'TGDD-TG-9812',
    customerName: 'Phạm Thị Thùy',
    phone: '0933445566',
    idCard: '079199004321',
    productName: 'Xiaomi 14 5G 256GB',
    prepaidPercent: 0,
    termMonths: 6,
    monthlyAmount: 3248300,
    financeCompany: 'Home Credit',
    status: 'APPROVED',
    createdAt: '2026-11-09 17:10',
  },
];

export default function AdminInstallmentsPage() {
  const [list, setList] = useState<InstallmentItem[]>(INITIAL_INSTALLMENTS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL');

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat('vi-VN').format(p) + '₫';
  };

  const handleUpdateStatus = (id: string, newStatus: 'APPROVED' | 'REJECTED') => {
    setList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const filtered = list.filter((item) => {
    if (filter !== 'ALL' && item.status !== filter) return false;
    if (search && !item.customerName.toLowerCase().includes(search.toLowerCase()) && !item.phone.includes(search)) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-black text-gray-900">THẨM ĐỊNH HỒ SƠ TRẢ GÓP ONLINE</h1>
          <p className="text-xs text-gray-500">Tiếp nhận đơn đăng ký mua trả góp 0% và phê duyệt liên kết công ty tài chính</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-xs text-gray-500">Hồ sơ chờ thẩm định</div>
          <div className="text-2xl font-black text-orange-600">
            {list.filter((i) => i.status === 'PENDING').length} Hồ sơ
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-xs text-gray-500">Đã phê duyệt (Đủ điều kiện)</div>
          <div className="text-2xl font-black text-green-600">
            {list.filter((i) => i.status === 'APPROVED').length} Hồ sơ
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-xs text-gray-500">Từ chối thẩm định</div>
          <div className="text-2xl font-black text-red-600">
            {list.filter((i) => i.status === 'REJECTED').length} Hồ sơ
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-3 border-b flex items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Tìm theo tên hoặc SĐT khách..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 border rounded-lg focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-600 uppercase font-bold border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">Mã hồ sơ</th>
                <th className="py-3 px-4">Khách hàng</th>
                <th className="py-3 px-4">Sản phẩm</th>
                <th className="py-3 px-4">Gói vay & Kỳ hạn</th>
                <th className="py-3 px-4">Góp / Tháng</th>
                <th className="py-3 px-4">Công ty tài chính</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono font-bold text-gray-900">
                    {item.code}
                    <div className="text-[10px] text-gray-400 font-normal">{item.createdAt}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-gray-900">{item.customerName}</div>
                    <div className="text-gray-500 text-[11px]">{item.phone} • CCCD: {item.idCard}</div>
                  </td>
                  <td className="py-3 px-4 font-bold text-gray-900">
                    {item.productName}
                  </td>
                  <td className="py-3 px-4">
                    <span>Trước {item.prepaidPercent}% • {item.termMonths}T</span>
                  </td>
                  <td className="py-3 px-4 font-bold text-red-600">
                    {formatPrice(item.monthlyAmount)}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {item.financeCompany}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.status === 'PENDING'
                        ? 'bg-orange-100 text-orange-800'
                        : item.status === 'APPROVED'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.status === 'PENDING' ? 'CHỜ DUYỆT' : item.status === 'APPROVED' ? 'ĐÃ DUYỆT' : 'TỪ CHỐI'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {item.status === 'PENDING' ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleUpdateStatus(item.id, 'APPROVED')}
                          className="bg-green-600 hover:bg-green-700 text-white font-bold px-2.5 py-1 rounded text-[11px] transition"
                        >
                          Duyệt
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(item.id, 'REJECTED')}
                          className="bg-gray-100 hover:bg-red-100 text-red-600 font-bold px-2.5 py-1 rounded text-[11px] transition"
                        >
                          Từ chối
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-[11px]">Đã xử lý</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
