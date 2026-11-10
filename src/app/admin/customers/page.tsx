'use client';

import React, { useState } from 'react';
import { Users, Search, Award, Star, Phone, Mail } from 'lucide-react';

interface CustomerItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  loyaltyPoints: number;
  membershipRank: 'BRONZE' | 'SILVER' | 'GOLD' | 'DIAMOND';
  joinedDate: string;
}

const INITIAL_CUSTOMERS: CustomerItem[] = [
  {
    id: 'cust-1',
    name: 'Nguyễn Văn Thành',
    phone: '0988123456',
    email: 'thanh.nguyen@example.com',
    totalOrders: 3,
    totalSpent: 89470000,
    loyaltyPoints: 8940,
    membershipRank: 'DIAMOND',
    joinedDate: '2024-03-15',
  },
  {
    id: 'cust-2',
    name: 'Trần Thị Mai',
    phone: '0912345678',
    email: 'mai.tran@example.com',
    totalOrders: 1,
    totalSpent: 28990000,
    loyaltyPoints: 2890,
    membershipRank: 'GOLD',
    joinedDate: '2025-06-20',
  },
  {
    id: 'cust-3',
    name: 'Lê Hoàng Nam',
    phone: '0977889900',
    email: 'nam.le@example.com',
    totalOrders: 2,
    totalSpent: 35480000,
    loyaltyPoints: 3540,
    membershipRank: 'GOLD',
    joinedDate: '2025-01-10',
  },
  {
    id: 'cust-4',
    name: 'Phạm Minh Đức',
    phone: '0901239876',
    email: 'duc.pham@example.com',
    totalOrders: 1,
    totalSpent: 11990000,
    loyaltyPoints: 1190,
    membershipRank: 'SILVER',
    joinedDate: '2026-02-05',
  },
];

export default function AdminCustomersPage() {
  const [customers] = useState<CustomerItem[]>(INITIAL_CUSTOMERS);
  const [search, setSearch] = useState('');

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat('vi-VN').format(p) + '₫';
  };

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-black text-gray-900">QUẢN LÝ KHÁCH HÀNG & HẠNG THÀNH VIÊN (CRM)</h1>
          <p className="text-xs text-gray-500">Lịch sử tích lũy chi tiêu, đổi điểm quà tặng và chính sách tri ân khách hàng</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-xs text-gray-500">Tổng khách hàng</div>
          <div className="text-2xl font-black text-gray-900">{customers.length} Thành viên</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-xs text-gray-500">Thành viên Kim Cương</div>
          <div className="text-2xl font-black text-purple-600">
            {customers.filter((c) => c.membershipRank === 'DIAMOND').length} Khách
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-xs text-gray-500">Tổng chi tiêu tích lũy</div>
          <div className="text-2xl font-black text-red-600">
            {formatPrice(customers.reduce((acc, curr) => acc + curr.totalSpent, 0))}
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-xs text-gray-500">Tổng điểm thưởng khả dụng</div>
          <div className="text-2xl font-black text-yellow-600">
            {customers.reduce((acc, curr) => acc + curr.loyaltyPoints, 0).toLocaleString()} Điểm
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-3 rounded-xl border border-gray-200 flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Tìm theo tên, SĐT hoặc email khách hàng..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 border rounded-lg focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-600 uppercase font-bold border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">Khách hàng</th>
                <th className="py-3 px-4">Số điện thoại</th>
                <th className="py-3 px-4">Hạng thành viên</th>
                <th className="py-3 px-4">Số đơn mua</th>
                <th className="py-3 px-4">Tổng chi tiêu (LTV)</th>
                <th className="py-3 px-4">Điểm tích lũy</th>
                <th className="py-3 px-4">Ngày tham gia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    {item.name}
                    <div className="text-[11px] text-gray-400 font-normal">{item.email}</div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-gray-800">
                    {item.phone}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      item.membershipRank === 'DIAMOND'
                        ? 'bg-purple-100 text-purple-800 border border-purple-200'
                        : item.membershipRank === 'GOLD'
                        ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                        : 'bg-gray-100 text-gray-800 border border-gray-200'
                    }`}>
                      ★ {item.membershipRank}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    {item.totalOrders} Đơn
                  </td>
                  <td className="py-3.5 px-4 font-black text-[#d0021b]">
                    {formatPrice(item.totalSpent)}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-yellow-600">
                    +{item.loyaltyPoints.toLocaleString()} Điểm
                  </td>
                  <td className="py-3.5 px-4 text-gray-500">
                    {item.joinedDate}
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
