'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MOCK_PRODUCTS } from '@/data/mock-data';
import { CreditCard, CheckCircle2, ShieldCheck, Calculator, UserCheck } from 'lucide-react';

export default function InstallmentPage() {
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [prepaidPercent, setPrepaidPercent] = useState(30);
  const [termMonths, setTermMonths] = useState(6);
  const [financeCompany, setFinanceCompany] = useState('HOME_CREDIT');
  const [fullName, setFullName] = useState('Nguyễn Văn Thành');
  const [phone, setPhone] = useState('0988123456');
  const [idCard, setIdCard] = useState('079098001234');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const product = MOCK_PRODUCTS[selectedProductIndex];
  const variant = product.variants[0];
  const price = variant.salePrice;

  // Tính toán số tiền
  const prepaidAmount = Math.round((price * prepaidPercent) / 100);
  const loanAmount = price - prepaidAmount;
  // Lãi suất 0% nên chỉ chia theo số tháng
  const monthlyPayment = Math.round(loanAmount / termMonths);

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat('vi-VN').format(p) + '₫';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="bg-[#d0021b] text-white text-xs font-black px-3 py-1 rounded-full uppercase">
            CHƯƠNG TRÌNH ĐẶC QUYỀN
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
            MUA TRẢ GÓP 0% LÃI SUẤT - DUYỆT HỒ SƠ TRỰC TUYẾN
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Chỉ cần CCCD gắn chip • Không giữ giấy tờ gốc • Nhận máy ngay trong 15 phút
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center space-y-4 shadow-sm max-w-xl mx-auto">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">NỘP HỒ SƠ THÀNH CÔNG!</h2>
            <p className="text-xs text-gray-600">
              Hệ thống đã tiếp nhận yêu cầu trả góp của Quý khách <span className="font-bold">{fullName}</span>.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Thiết bị mua:</span>
                <span className="font-bold text-gray-900">{product.name} {variant.storage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Trả trước ({prepaidPercent}%):</span>
                <span className="font-bold text-gray-900">{formatPrice(prepaidAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Số tiền trả mỗi tháng:</span>
                <span className="font-bold text-red-600 text-sm">{formatPrice(monthlyPayment)}/tháng</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Thời hạn:</span>
                <span className="font-bold text-gray-900">{termMonths} Tháng (Lãi 0%)</span>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Nhân viên thẩm định hồ sơ của KikiMobile sẽ gọi điện thoại tới số <span className="font-bold text-black">{phone}</span> trong vòng 10 phút để xác nhận.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Cột 1: Bảng Tính Trả Góp (7 Cột) */}
            <div className="md:col-span-7 bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-5">
              <h3 className="font-black text-sm text-gray-900 flex items-center gap-2 border-b pb-3">
                <Calculator className="w-4 h-4 text-yellow-500" />
                1. Chọn thiết bị & Gói trả góp
              </h3>

              {/* Chọn sản phẩm */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Chọn máy muốn mua trả góp:</label>
                <div className="grid grid-cols-2 gap-2">
                  {MOCK_PRODUCTS.map((p, idx) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedProductIndex(idx)}
                      className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2 ${
                        selectedProductIndex === idx
                          ? 'border-yellow-500 bg-yellow-50/80'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <img src={p.thumbnail} alt={p.name} className="w-10 h-10 object-contain" />
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-gray-900 truncate">{p.name}</div>
                        <div className="text-[11px] text-[#d0021b] font-black">{formatPrice(p.variants[0].salePrice)}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tỷ lệ trả trước */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Chọn số tiền trả trước: <span className="text-red-600">{prepaidPercent}% ({formatPrice(prepaidAmount)})</span>
                </label>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  {[0, 20, 30, 50].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setPrepaidPercent(pct)}
                      className={`py-2 rounded-lg border font-bold transition ${
                        prepaidPercent === pct
                          ? 'border-yellow-500 bg-yellow-400 text-black shadow-sm'
                          : 'border-gray-300 bg-white text-gray-700'
                      }`}
                    >
                      {pct === 0 ? 'Trả trước 0đ' : `${pct}%`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Kỳ hạn trả góp */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Chọn kỳ hạn vay:
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[6, 9, 12].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setTermMonths(term)}
                      className={`py-2 rounded-lg border font-bold transition ${
                        termMonths === term
                          ? 'border-yellow-500 bg-yellow-400 text-black shadow-sm'
                          : 'border-gray-300 bg-white text-gray-700'
                      }`}
                    >
                      {term} Tháng (0%)
                    </button>
                  ))}
                </div>
              </div>

              {/* Kết quả tính toán */}
              <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Giá máy niêm yết:</span>
                  <span className="font-bold text-gray-900">{formatPrice(price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Số tiền trả trước:</span>
                  <span className="font-bold text-gray-900">{formatPrice(prepaidAmount)}</span>
                </div>
                <div className="flex justify-between border-t border-yellow-200 pt-2 text-sm">
                  <span className="font-bold text-gray-900">Góp mỗi tháng:</span>
                  <span className="font-black text-red-600 text-base">{formatPrice(monthlyPayment)}/tháng</span>
                </div>
              </div>
            </div>

            {/* Cột 2: Form Đăng Ký Hồ Sơ (5 Cột) */}
            <div className="md:col-span-5 bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
              <h3 className="font-black text-sm text-gray-900 flex items-center gap-2 border-b pb-3">
                <UserCheck className="w-4 h-4 text-blue-600" />
                2. Thông tin thẩm định online
              </h3>

              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Công ty tài chính đối tác *</label>
                  <select
                    value={financeCompany}
                    onChange={(e) => setFinanceCompany(e.target.value)}
                    className="w-full border rounded-lg p-2 focus:outline-none font-semibold"
                  >
                    <option value="HOME_CREDIT">Home Credit (Duyệt nhanh 10 phút)</option>
                    <option value="FE_CREDIT">FE Credit (Duyệt qua SĐT)</option>
                    <option value="HD_SAISON">HD SAISON</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">Họ và tên (theo CCCD) *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">Số điện thoại liên hệ *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">Số Căn cước công dân (12 số) *</label>
                  <input
                    type="text"
                    required
                    value={idCard}
                    onChange={(e) => setIdCard(e.target.value)}
                    className="w-full border rounded-lg p-2 text-sm font-mono focus:outline-none focus:border-black"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#d0021b] hover:bg-[#b50016] text-white py-3 rounded-xl font-black text-sm shadow-md transition"
                  >
                    ĐĂNG KÝ TRẢ GÓP NGAY
                  </button>
                  <p className="text-[10px] text-gray-500 text-center mt-2">
                    Không thu phí thẩm định hồ sơ • Cam kết bảo mật thông tin
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
