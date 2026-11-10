'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  ChevronLeft, 
  CheckCircle2, 
  QrCode, 
  Clock, 
  AlertTriangle, 
  Copy, 
  Check, 
  RotateCcw,
  ShieldCheck,
  Building2,
  Smartphone
} from 'lucide-react';

export default function CartPage() {
  const [deliveryMethod, setDeliveryMethod] = useState<'HOME' | 'STORE'>('HOME');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'VIETQR'>('VIETQR');
  const [gender, setGender] = useState<'MALE' | 'FEMALE'>('MALE');
  const [customerName, setCustomerName] = useState('Nguyễn Văn Thành');
  const [customerPhone, setCustomerPhone] = useState('0988123456');
  const [address, setAddress] = useState('Tòa Landmark 81, P. 22, Q. Bình Thạnh, TP.HCM');
  const [quantity, setQuantity] = useState(1);

  // Trạng thái đơn hàng: FORM -> WAITING_QR (chế độ chờ 5 phút) -> SUCCESS hoặc EXPIRED
  const [orderState, setOrderState] = useState<'FORM' | 'WAITING_QR' | 'SUCCESS' | 'EXPIRED'>('FORM');
  const [countdownSeconds, setCountdownSeconds] = useState(300); // 5 phút = 300 giây
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const price = 32490000;
  const originalPrice = 34990000;
  const totalPrice = price * quantity;
  const orderCode = 'TGDD-20261110-8921';
  const transferContent = 'TGDD 8921';

  // Đếm ngược 5 phút khi ở chế độ chờ quét mã QR
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (orderState === 'WAITING_QR' && countdownSeconds > 0) {
      timer = setInterval(() => {
        setCountdownSeconds((prev) => {
          if (prev <= 1) {
            setOrderState('EXPIRED');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [orderState, countdownSeconds]);

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat('vi-VN').format(p) + '₫';
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'VIETQR') {
      // Khi chọn VietQR: Chuyển sang CHẾ ĐỘ CHỜ TRONG 5 PHÚT (Chưa hiện thành công)
      setCountdownSeconds(300);
      setOrderState('WAITING_QR');
    } else {
      // COD thì đặt hàng xác nhận luôn
      setOrderState('SUCCESS');
    }
  };

  // Người dùng xác nhận đã chuyển khoản thành công
  const handlePaymentConfirmed = () => {
    setOrderState('SUCCESS');
  };

  // Tạo lại mã QR khi hết hạn 5 phút
  const handleResetQR = () => {
    setCountdownSeconds(300);
    setOrderState('WAITING_QR');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mb-4 font-semibold">
          <ChevronLeft className="w-4 h-4" /> Tiếp tục tìm kiếm sản phẩm khác
        </Link>

        {/* 1. MÀN HÌNH CHẾ ĐỘ CHỜ QUÉT MÃ QR TRONG 5 PHÚT */}
        {orderState === 'WAITING_QR' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-yellow-400 shadow-xl space-y-6 animate-in fade-in duration-200">
            {/* Header đếm ngược */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b pb-4">
              <div>
                <span className="bg-yellow-400 text-black text-[10px] font-black px-2.5 py-0.5 rounded uppercase">
                  ĐANG CHỜ THANH TOÁN
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-1">
                  QUÉT MÃ VIETQR ĐỂ HOÀN TẤT ĐƠN HÀNG
                </h2>
                <p className="text-xs text-gray-500">Vui lòng quét mã và chuyển khoản trước khi hết thời gian</p>
              </div>

              {/* Đồng hồ đếm ngược 5 phút */}
              <div className="flex items-center gap-2 bg-red-50 border border-red-300 px-4 py-2 rounded-xl text-red-600">
                <Clock className="w-5 h-5 animate-pulse" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-gray-600">Hết hạn sau:</div>
                  <div className="text-xl font-black font-mono tracking-wider">{formatTime(countdownSeconds)}</div>
                </div>
              </div>
            </div>

            {/* Khung QR Code & Thông tin chuyển khoản */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Cột Trái: Ảnh Mã QR */}
              <div className="md:col-span-5 bg-gradient-to-b from-yellow-50 to-orange-50 border border-yellow-300 rounded-2xl p-5 text-center space-y-3">
                <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-inner inline-block">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=vietqr_kikimobile_${orderCode}_${totalPrice}`}
                    alt="VietQR Payment Code"
                    className="w-48 h-48 mx-auto object-contain"
                  />
                </div>
                <div className="text-[11px] text-gray-700 font-semibold flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                  <span>Đang lắng nghe giao dịch chuyển khoản...</span>
                </div>
                <div className="text-[10px] text-gray-500">
                  Mở App ngân hàng (Vietcombank, MB, Techcombank, MoMo...) quét mã tự động điền số tiền và nội dung.
                </div>
              </div>

              {/* Cột Phải: Thông tin tài khoản nhận */}
              <div className="md:col-span-7 space-y-3 text-xs">
                <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Ngân hàng thụ hưởng:</span>
                    <span className="font-bold text-gray-900 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-blue-600" /> MB Bank (Ngân Hàng Quân Đội)
                    </span>
                  </div>

                  <div className="flex justify-between items-center border-t pt-2">
                    <span className="text-gray-500">Số tài khoản:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-black">0988123456</span>
                      <button
                        onClick={() => handleCopy('0988123456', 'stk')}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Sao chép số tài khoản"
                      >
                        {copiedField === 'stk' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t pt-2">
                    <span className="text-gray-500">Tên chủ tài khoản:</span>
                    <span className="font-bold text-gray-900">CONG TY CO PHAN THE GIOI DI DONG</span>
                  </div>

                  <div className="flex justify-between items-center border-t pt-2">
                    <span className="text-gray-500">Số tiền chuyển:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-base text-[#d0021b]">{formatPrice(totalPrice)}</span>
                      <button
                        onClick={() => handleCopy(String(totalPrice), 'amount')}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Sao chép số tiền"
                      >
                        {copiedField === 'amount' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t pt-2">
                    <span className="text-gray-500">Nội dung chuyển khoản (bắt buộc):</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {transferContent}
                      </span>
                      <button
                        onClick={() => handleCopy(transferContent, 'content')}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Sao chép nội dung"
                      >
                        {copiedField === 'content' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Các nút hành động */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={handlePaymentConfirmed}
                    className="w-full bg-[#d0021b] hover:bg-[#b50016] text-white py-3 rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Tôi Đã Chuyển Khoản Xong (Kiểm Tra Khớp Lệnh)
                  </button>

                  <button
                    onClick={() => setOrderState('FORM')}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-xl font-semibold text-xs transition"
                  >
                    Hủy hoặc Thay đổi hình thức thanh toán
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. MÀN HÌNH HẾT HẠN 5 PHÚT */}
        {orderState === 'EXPIRED' && (
          <div className="bg-white rounded-2xl p-8 border border-red-200 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">MÃ THANH TOÁN ĐÃ HẾT HẠN</h2>
            <p className="text-xs text-gray-600 max-w-md mx-auto">
              Thời gian chờ 5 phút cho phiên chuyển khoản của bạn đã kết thúc. Vui lòng bấm bên dưới để tạo lại mã QR mới và tiếp tục đặt hàng.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={handleResetQR}
                className="bg-[#ffd400] text-black font-bold px-5 py-2.5 rounded-lg text-xs hover:bg-[#f0c500] transition flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" /> Tạo Lại Mã QR Mới (5 Phút)
              </button>
              <button
                onClick={() => setOrderState('FORM')}
                className="bg-gray-100 text-gray-700 font-bold px-5 py-2.5 rounded-lg text-xs hover:bg-gray-200 transition"
              >
                Quay Lại Giỏ Hàng
              </button>
            </div>
          </div>
        )}

        {/* 3. MÀN HÌNH ĐẶT HÀNG THÀNH CÔNG (CHỈ HIỆN KHI ĐÃ QUÉT HOẶC CHỌN COD) */}
        {orderState === 'SUCCESS' && (
          <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center space-y-4 shadow-sm animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">ĐẶT HÀNG THÀNH CÔNG!</h2>
            <p className="text-sm text-gray-600">
              Cảm ơn <span className="font-bold">{customerName}</span> đã mua hàng tại KikiMobile!
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Mã đơn hàng:</span>
                <span className="font-mono font-bold text-black">{orderCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Số điện thoại nhận:</span>
                <span className="font-bold text-black">{customerPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Hình thức thanh toán:</span>
                <span className="font-bold text-blue-600">
                  {paymentMethod === 'VIETQR' ? 'Đã quét VietQR (Khớp lệnh thành công)' : 'Tiền mặt khi nhận hàng (COD)'}
                </span>
              </div>
              <div className="flex justify-between border-t pt-2 text-sm">
                <span className="font-bold text-gray-800">Tổng thanh toán:</span>
                <span className="font-black text-[#d0021b]">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <Link 
                href="/tra-cuu"
                className="bg-black text-[#ffd400] px-4 py-2.5 rounded-lg text-xs font-bold hover:bg-neutral-800 transition"
              >
                Tra cứu tiến trình đơn hàng →
              </Link>
              <Link 
                href="/"
                className="bg-gray-100 text-gray-800 px-4 py-2.5 rounded-lg text-xs font-bold hover:bg-gray-200 transition"
              >
                Về trang chủ
              </Link>
            </div>
          </div>
        )}

        {/* 4. FORM NHẬP THÔNG TIN ĐẶT HÀNG BAN ĐẦU */}
        {orderState === 'FORM' && (
          <form onSubmit={handleOrderSubmit} className="space-y-4">
            {/* Danh sách giỏ hàng */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <h2 className="font-bold text-base text-gray-900 border-b pb-3 mb-3">
                Giỏ hàng của bạn (1 sản phẩm)
              </h2>

              <div className="flex items-start gap-4 py-2">
                <img
                  src="https://cdn.tgdd.vn/Products/Images/42/329149/iphone-16-pro-max-titan-sa-mac-thumb-600x600.jpg"
                  alt="iPhone 16 Pro Max"
                  className="w-20 h-20 object-contain border rounded-lg p-1"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-gray-900">
                    iPhone 16 Pro Max 256GB - Titan Sa Mạc
                  </h3>
                  <div className="text-xs text-gray-500 mt-1">
                    Bảo hành chính hãng 12 tháng • 1 đổi 1 trong 30 ngày
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-baseline gap-2">
                      <span className="font-black text-sm text-[#d0021b]">{formatPrice(price)}</span>
                      <span className="text-xs text-gray-400 line-through">{formatPrice(originalPrice)}</span>
                    </div>

                    {/* Bộ tăng giảm số lượng */}
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-2.5 py-0.5 text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-3 py-0.5 text-xs font-bold">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-2.5 py-0.5 text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tạm tính */}
              <div className="border-t border-gray-100 pt-3 mt-3 flex justify-between items-center text-sm">
                <span className="text-gray-600">Tổng tiền tạm tính:</span>
                <span className="font-black text-lg text-[#d0021b]">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            {/* Thông tin khách hàng */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-gray-900">1. Thông tin người nhận hàng</h3>

              <div className="flex items-center gap-4 text-xs font-medium">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    checked={gender === 'MALE'}
                    onChange={() => setGender('MALE')}
                  />
                  <span>Anh</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    checked={gender === 'FEMALE'}
                    onChange={() => setGender('FEMALE')}
                  />
                  <span>Chị</span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Họ và tên *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Số điện thoại *</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>

            {/* Hình thức nhận hàng */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-gray-900">2. Chọn hình thức nhận hàng</h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('HOME')}
                  className={`p-3 rounded-lg border font-bold text-center transition ${
                    deliveryMethod === 'HOME'
                      ? 'border-yellow-500 bg-yellow-50 text-black'
                      : 'border-gray-300 bg-white text-gray-700'
                  }`}
                >
                  Giao tận nơi miễn phí
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('STORE')}
                  className={`p-3 rounded-lg border font-bold text-center transition ${
                    deliveryMethod === 'STORE'
                      ? 'border-yellow-500 bg-yellow-50 text-black'
                      : 'border-gray-300 bg-white text-gray-700'
                  }`}
                >
                  Nhận tại siêu thị (có hàng)
                </button>
              </div>

              {deliveryMethod === 'HOME' ? (
                <div className="text-xs space-y-2">
                  <label className="block text-gray-700 font-semibold">Địa chỉ nhận hàng cụ thể *</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black"
                  />
                </div>
              ) : (
                <div className="text-xs bg-gray-50 p-3 rounded-lg text-gray-700">
                  <span className="font-bold">Siêu thị được chọn:</span> 136 Nguyễn Thái Học, P. Phạm Ngũ Lão, Quận 1, TP.HCM (Sẵn hàng lấy ngay trong 30 phút).
                </div>
              )}
            </div>

            {/* Phương thức thanh toán */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-gray-900">3. Chọn phương thức thanh toán</h3>

              <div className="space-y-2 text-xs">
                <label className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition ${paymentMethod === 'VIETQR' ? 'border-yellow-500 bg-yellow-50/60' : 'border-gray-200'}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'VIETQR'}
                    onChange={() => setPaymentMethod('VIETQR')}
                  />
                  <div>
                    <div className="font-bold text-gray-900 flex items-center gap-2">
                      <span>Quét mã VietQR (Chế độ chờ 5 phút để chuyển khoản)</span>
                      <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.2 rounded font-extrabold">Giảm thêm 500k</span>
                    </div>
                    <div className="text-gray-500 text-[11px]">Hệ thống sẽ giữ hàng và chờ bạn quét mã trong 5 phút</div>
                  </div>
                </label>

                <label className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition ${paymentMethod === 'COD' ? 'border-yellow-500 bg-yellow-50/60' : 'border-gray-200'}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                  />
                  <div>
                    <div className="font-bold text-gray-900">Thanh toán tiền mặt khi nhận hàng (COD)</div>
                    <div className="text-gray-500 text-[11px]">Kiểm tra máy trước khi thanh toán cho shipper</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Nút Đặt hàng */}
            <button
              type="submit"
              className="w-full bg-[#d0021b] hover:bg-[#b50016] text-white py-3.5 rounded-xl font-black text-base shadow-lg transition flex flex-col items-center justify-center"
            >
              <span>{paymentMethod === 'VIETQR' ? `TIẾP TỤC QUÉT MÃ QR (${formatPrice(totalPrice)})` : `ĐẶT HÀNG NGAY (${formatPrice(totalPrice)})`}</span>
              <span className="text-[11px] font-normal text-white/90">
                {paymentMethod === 'VIETQR' ? 'Chuyển sang màn hình chờ thanh toán 5 phút' : 'Cam kết bảo mật thông tin tuyệt đối'}
              </span>
            </button>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
