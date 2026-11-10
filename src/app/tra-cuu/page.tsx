'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search, ShieldCheck, Package, Clock, CheckCircle, MapPin } from 'lucide-react';
import { MOCK_ORDERS, MOCK_IMEIS } from '@/data/mock-data';

export default function TrackingPage() {
  const [activeTab, setActiveTab] = useState<'ORDER' | 'IMEI'>('ORDER');
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);

    if (activeTab === 'ORDER') {
      const trimmed = query.trim();
      const found = MOCK_ORDERS.find(
        (o) => o.orderCode.toLowerCase().includes(trimmed.toLowerCase()) || o.customerPhone.includes(trimmed)
      );
      setSearchResult(found || null);
    } else {
      const trimmed = query.trim();
      const found = MOCK_IMEIS.find((i) => i.imei === trimmed);
      setSearchResult(found || null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
            TRA CỨU THÔNG TIN KHÁCH HÀNG
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Theo dõi tiến trình vận chuyển đơn hàng & thời hạn bảo hành điện tử chính hãng theo số IMEI
          </p>
        </div>

        {/* 2 Tabs chuyển đổi */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => { setActiveTab('ORDER'); setHasSearched(false); setSearchResult(null); }}
            className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition ${
              activeTab === 'ORDER'
                ? 'border-yellow-500 text-black'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Package className="w-4 h-4" /> Tra cứu Đơn Hàng
          </button>
          <button
            onClick={() => { setActiveTab('IMEI'); setHasSearched(false); setSearchResult(null); }}
            className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition ${
              activeTab === 'IMEI'
                ? 'border-yellow-500 text-black'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> Tra cứu Bảo Hành theo IMEI
          </button>
        </div>

        {/* Form tìm kiếm */}
        <form onSubmit={handleSearch} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex gap-2 mb-6">
          <input
            type="text"
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              activeTab === 'ORDER'
                ? 'Nhập số điện thoại đặt hàng (VD: 0988123456) hoặc mã đơn...'
                : 'Nhập mã IMEI gồm 15 số (VD: 358920114829102)...'
            }
            className="flex-1 text-sm border-0 focus:outline-none px-2"
          />
          <button
            type="submit"
            className="bg-[#ffd400] hover:bg-[#e6be00] text-black font-bold px-5 py-2.5 rounded-lg text-xs flex items-center gap-1.5 transition"
          >
            <Search className="w-4 h-4" /> Tra cứu
          </button>
        </form>

        {/* Kết quả tìm kiếm */}
        {hasSearched && (
          <div>
            {searchResult ? (
              activeTab === 'ORDER' ? (
                /* Kết quả Tra cứu Đơn Hàng */
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <span className="text-xs text-gray-500">Mã đơn hàng:</span>
                      <h3 className="font-mono font-bold text-base text-gray-900">{searchResult.orderCode}</h3>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
                      {searchResult.orderStatus === 'PREPARING' ? 'Đang chuẩn bị hàng' : searchResult.orderStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-gray-500 block">Khách hàng:</span>
                      <span className="font-bold text-gray-900">{searchResult.customerName} ({searchResult.customerPhone})</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Ngày đặt hàng:</span>
                      <span className="font-bold text-gray-900">{searchResult.createdAt}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500 block">Địa chỉ nhận hàng:</span>
                      <span className="font-medium text-gray-900">{searchResult.shippingAddress || searchResult.pickupStore}</span>
                    </div>
                  </div>

                  {/* Tiến trình vận chuyển */}
                  <div className="border-t pt-4">
                    <h4 className="text-xs font-bold text-gray-700 mb-3">Tiến trình xử lý đơn:</h4>
                    <div className="flex items-center justify-between text-xs relative">
                      <div className="flex flex-col items-center gap-1 text-green-600 font-bold">
                        <CheckCircle className="w-5 h-5" />
                        <span>Đã tiếp nhận</span>
                      </div>
                      <div className="h-0.5 flex-1 bg-green-500 mx-2"></div>
                      <div className="flex flex-col items-center gap-1 text-green-600 font-bold">
                        <CheckCircle className="w-5 h-5" />
                        <span>Đã xác nhận</span>
                      </div>
                      <div className="h-0.5 flex-1 bg-blue-500 mx-2"></div>
                      <div className="flex flex-col items-center gap-1 text-blue-600 font-bold">
                        <Clock className="w-5 h-5" />
                        <span>Gán mã IMEI</span>
                      </div>
                      <div className="h-0.5 flex-1 bg-gray-200 mx-2"></div>
                      <div className="flex flex-col items-center gap-1 text-gray-400">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                        <span>Đang giao</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Kết quả Tra cứu Bảo hành theo IMEI */
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
                  <div className="flex items-center gap-3 border-b pb-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-gray-900">{searchResult.productName}</h3>
                      <p className="font-mono text-xs text-gray-500">IMEI: {searchResult.imei}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-gray-500 block">Tình trạng máy:</span>
                      <span className="font-bold text-green-600">
                        {searchResult.status === 'SOLD' ? 'Đã kích hoạt bảo hành chính hãng' : 'Trong kho'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Thời hạn bảo hành:</span>
                      <span className="font-bold text-blue-600">12 Tháng (Hư gì đổi nấy 1 đổi 1)</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Ngày xuất bán:</span>
                      <span className="font-medium text-gray-800">{searchResult.importDate}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Mã đơn xuất:</span>
                      <span className="font-mono font-medium text-gray-800">{searchResult.orderCode || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-3 text-xs text-yellow-800">
                    💡 Khách hàng chỉ cần mang máy đến bất kỳ siêu thị Thegioididong nào trên toàn quốc, nhân viên sẽ tiếp nhận bảo hành qua số IMEI này mà không cần mang theo hóa đơn giấy.
                  </div>
                </div>
              )
            ) : (
              <div className="bg-white rounded-xl p-8 border border-gray-200 text-center text-gray-500 text-sm">
                Không tìm thấy dữ liệu phù hợp với thông tin đã nhập. Vui lòng kiểm tra lại số điện thoại hoặc mã IMEI!
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
