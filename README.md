# DỰ ÁN WEBSITE BÁN ĐIỆN THOẠI & THIẾT BỊ CÔNG NGHỆ (THEGIOIDIDONG CLONE)

Hệ thống thương mại điện tử chuyên nghiệp mô phỏng nền tảng **Thegioididong.com** với kiến trúc **Fullstack Next.js (App Router)** gồm đầy đủ 2 phân hệ: **Khách hàng (Storefront)** và **Quản lý (Admin Backoffice)**.

---

## 🌟 CÁC TÍNH NĂNG ĐÃ HOÀN THIỆN

### 1. Phân hệ Khách hàng (Customer Storefront)
* **Trang chủ (`/`):**
  * Banner khuyến mãi lớn phong cách Thế Giới Di Động.
  * Bộ chọn hãng điện thoại (Apple, Samsung, Xiaomi, OPPO, vivo, realme...).
  * Khối **Giờ vàng Deal Sốc (Flash Sale)** với đồng hồ đếm ngược thời gian thực.
  * Bộ lọc nhanh theo mức giá (Dưới 15 triệu, 15 - 30 triệu, Trên 30 triệu).
  * Thẻ sản phẩm chuẩn TGDD: Hiển thị giá niêm yết, giá giảm, chip, màn hình, RAM, dung lượng, đánh giá sao, nhãn Trả góp 0%.
* **Trang Chi tiết Sản phẩm (`/dien-thoai/[slug]`):**
  * Bộ chọn dung lượng (256GB, 512GB, 1TB) và màu sắc (Titan Sa Mạc, Titan Tự Nhiên...).
  * Tự động cập nhật giá bán, số tiền tiết kiệm và hình ảnh tương ứng theo thời gian thực.
  * Khối quà tặng & khuyến mãi phụ kiện trị giá 1.500.000₫.
  * Bảng thông số kỹ thuật chi tiết (Màn hình, Chip, Camera sau/trước, Pin & Sạc).
  * Nút `MUA NGAY`, `MUA TRẢ GÓP 0%`, `THÊM GIỎ HÀNG`.
* **Giỏ hàng & Đặt hàng (`/gio-hang`):**
  * Tăng giảm số lượng sản phẩm.
  * Form điền thông tin người nhận (Anh/Chị, Họ tên, SĐT).
  * Chọn hình thức nhận: Giao tận nơi hoặc nhận tại siêu thị gần nhất.
  * Thanh toán đa kênh: Quét mã **VietQR tự động** hoặc Tiền mặt khi nhận hàng (COD).
* **Tra cứu Đơn hàng & Bảo hành IMEI (`/tra-cuu`):**
  * Tra cứu tiến trình xử lý đơn hàng theo SĐT / Mã đơn.
  * **Tra cứu thời hạn bảo hành chính hãng theo số IMEI gồm 15 số** (đặc thù hàng đầu của Thế Giới Di Động).

### 2. Phân hệ Quản trị (Admin Backoffice)
* **Dashboard Tổng quan (`/admin`):**
  * Thống kê KPI: Doanh thu hôm nay, số đơn mới, số máy xuất kho đã kích hoạt bảo hành, cảnh báo tồn kho sắp hết (< 10 máy).
  * Bảng đơn hàng mới tiếp nhận.
  * Bảng xếp hạng điện thoại bán chạy nhất.
* **Quản lý Đơn hàng (`/admin/orders`):**
  * Lọc đơn theo trạng thái (Chờ xác nhận, Cần gán IMEI, Đang giao, Hoàn tất).
  * **Chức năng Quét & Gán mã IMEI cho từng máy xuất kho:** Chuyển trạng thái đơn sang Đang giao và kích hoạt bảo hành.
  * In phiếu xuất kho/giao hàng.
* **Kho hàng & Quản lý IMEI (`/admin/inventory`):**
  * Định danh từng chiếc máy vật lý trong chuỗi siêu thị.
  * Tìm kiếm theo 15 chữ số IMEI.
  * **Chức năng Nhập kho IMEI hàng loạt (Batch Import):** Hỗ trợ dán danh sách IMEI từ Excel hoặc máy quét mã vạch.
  * Phân chia theo vị trí kho: Kho TP.HCM, Kho Hà Nội, Kho Đà Nẵng.
* **Quản lý Sản phẩm (`/admin/products`):**
  * Quản lý danh mục máy, cấu hình biến thể (Màu, ROM, Giá bán lẻ, Tồn kho).
  * Thêm điện thoại mới với thông số kỹ thuật động.

---

## 🚀 HƯỚNG DẪN KHỞI CHẠY DỰ ÁN

### 1. Yêu cầu môi trường
* Node.js version 18.x hoặc 20.x+
* Trình duyệt web (Chrome, Edge, Firefox)

### 2. Cài đặt & Chạy ở chế độ phát triển
```bash
# 1. Cài đặt các gói phụ thuộc (nếu chưa cài)
npm install

# 2. Khởi chạy máy chủ phát triển
npm run dev
```

Sau khi chạy lệnh trên, mở trình duyệt truy cập:
* **Website Khách hàng:** [http://localhost:3000](http://localhost:3000)
* **Cổng Quản trị (Admin):** [http://localhost:3000/admin](http://localhost:3000/admin)
* **Tra cứu bảo hành theo IMEI:** [http://localhost:3000/tra-cuu](http://localhost:3000/tra-cuu)

---

## 📂 CẤU TRÚC THƯ MỤC DỰ ÁN

```text
├── prisma/
│   └── schema.prisma        # Sơ đồ Cơ sở dữ liệu PostgreSQL (Products, Variants, IMEI, Orders...)
├── src/
│   ├── app/
│   │   ├── page.tsx         # Trang chủ khách hàng (Home)
│   │   ├── layout.tsx       # Layout gốc & Font chữ
│   │   ├── globals.css      # Cấu hình Tailwind CSS & Bảng màu Thế Giới Di Động (#ffd400)
│   │   ├── dien-thoai/      # Trang chi tiết sản phẩm ([slug])
│   │   ├── gio-hang/        # Trang giỏ hàng & thanh toán VietQR / COD
│   │   ├── tra-cuu/         # Trang tra cứu đơn hàng & bảo hành IMEI
│   │   └── admin/           # Phân hệ Quản trị (Dashboard, Products, Orders, Inventory)
│   ├── components/          # Header, Footer, ProductCard
│   ├── data/
│   │   └── mock-data.ts     # Dữ liệu mẫu sản phẩm, đơn hàng, kho IMEI
│   └── types/
│       └── index.ts         # TypeScript Interfaces
├── SRS_Website_BanDienThoai.md       # Đặc tả yêu cầu phần mềm
├── KE_HOACH_TRIEN_KHAI_DU_AN.md      # Kế hoạch triển khai 5 giai đoạn
└── DATABASE_DESIGN.md                # Thiết kế chi tiết cơ sở dữ liệu
```
