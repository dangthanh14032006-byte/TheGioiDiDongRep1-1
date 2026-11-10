# TÀI LIỆU ĐẶC TẢ YÊU CẦU PHẦN MỀM (SRS)
## HỆ THỐNG WEBSITE THƯƠNG MẠI ĐIỆN TỬ BÁN LẺ THIẾT BỊ CÔNG NGHỆ (MÔ HÌNH THẾ GIỚI DI ĐỘNG)

---

## 1. TỔNG QUAN HỆ THỐNG (SYSTEM OVERVIEW)

### 1.1. Mục tiêu dự án
Xây dựng nền tảng thương mại điện tử chuyên biệt cho ngành bán lẻ thiết bị công nghệ (Điện thoại, Laptop, Phụ kiện, Đồng hồ thông minh...), mô phỏng theo mô hình kinh doanh và trải nghiệm người dùng của **Thegioididong.com**.

Hệ thống bao gồm 2 phân hệ cốt lõi:
1. **Phân hệ Khách hàng (Storefront / Customer Portal):** Tối ưu trải nghiệm mua sắm đa thiết bị (Mobile-first), chuẩn SEO, tốc độ cao, hỗ trợ mua trả góp, tìm kiếm và lọc thông minh.
2. **Phân hệ Quản trị (Admin / Backoffice Portal):** Quản lý chuỗi cung ứng, sản phẩm đa biến thể, quản lý kho theo IMEI/Serial, đơn hàng đa kênh, khuyến mãi động, phân quyền nhân sự chi tiết.

### 1.2. Đối tượng sử dụng (Stakeholders / Actors)
* **Khách hàng vãng lai (Guest):** Xem sản phẩm, tìm kiếm, so sánh giá, thêm giỏ hàng, đặt hàng không cần tài khoản.
* **Khách hàng thành viên (Member/Customer):** Đăng nhập qua SĐT/OTP, quản lý đơn hàng, theo dõi bảo hành, tích điểm quà tặng.
* **Nhân viên bán hàng & CSKH (Sale / Support Staff):** Tiếp nhận, gọi xác nhận đơn, hỗ trợ trả lời bình luận/hỏi đáp.
* **Thủ kho (Warehouse Staff):** Nhập kho, kiểm kê, gắn mã IMEI/Serial, điều chuyển hàng giữa các chi nhánh/kho.
* **Quản trị viên (Super Admin):** Cấu hình toàn bộ hệ thống, chiến dịch Marketing/Flash Sale, quản trị doanh thu, phân quyền nhân viên.

---

## 2. KIẾN TRÚC NGHIỆP VỤ ĐẶC THÙ NGÀNH BÁN LẺ ĐIỆN THOẠI

Khác với các trang thương mại điện tử thông thường (quần áo, đồ gia dụng), website bán lẻ điện thoại như Thế Giới Di Động có các đặc thù kỹ thuật bắt buộc:
1. **Quản lý sản phẩm đa tầng (Multi-variants):**
   * *Sản phẩm gốc (Master Product):* iPhone 16 Pro Max.
   * *Biến thể cấu hình (Variant Specs):* Dung lượng (256GB, 512GB, 1TB).
   * *Biến thể ngoại quan (Variant Colors):* Màu sắc (Titan Tự Nhiên, Titan Sa Mạc, Titan Trắng...).
   * *Định danh từng máy (Device Level):* Quản lý từng sản phẩm thực tế theo số **IMEI / Serial Number** (phục vụ bảo hành, chống hàng giả, kích hoạt bảo hành điện tử).
2. **Hình thức thanh toán Trả Góp (Installment):**
   * Trả góp 0% qua thẻ tín dụng (liên kết cổng thanh toán Alepay/OnePay...).
   * Trả góp qua công ty tài chính (Home Credit, FE Credit, HD SAISON...) với form xét duyệt hồ sơ online.
3. **Chương trình khuyến mãi phức tạp:**
   * Giảm giá tiền mặt trực tiếp.
   * Quà tặng kèm (khách có thể chọn quà hoặc trừ tiền).
   * Thu cũ đổi mới (Trade-in).
   * Ưu đãi thanh toán ngân hàng / Ví điện tử (VNPAY-QR, MoMo).

---

## 3. ĐẶC TẢ CHI TIẾT PHÂN HỆ KHÁCH HÀNG (STOREFRONT)

### 3.1. Trang chủ (Home Page)
* **Header & Điều hướng:**
  * Logo thương hiệu.
  * Thanh tìm kiếm thông minh (Auto-complete gợi ý từ khóa, thương hiệu, hiển thị thumbnail sản phẩm ngay khi gõ).
  * Nút Giỏ hàng (hiển thị số lượng hàng tức thì).
  * Nút "Lịch sử đơn hàng", "Tra cứu bảo hành".
  * Menu ngành hàng chính: Điện thoại, Laptop, Tablet, Phụ kiện, Smartwatch, Thu cũ đổi mới...
* **Hero Banner Carousel:** Banner khuyến mãi lớn, sự kiện ra mắt máy mới, flash sale.
* **Khung Flash Sale / Deal sốc theo khung giờ:**
  * Đồng hồ đếm ngược (Countdown timer).
  * Thanh trạng thái số lượng đã bán (Progress bar: "Đã bán 85%").
* **Danh mục nổi bật theo hãng (Brand Showcase):** Apple, Samsung, Xiaomi, OPPO...
* **Khối sản phẩm theo nhu cầu:**
  * Điện thoại chơi game, Điện thoại pin trâu, Điện thoại chụp ảnh đẹp...
* **Khu vực Tin tức công nghệ / Bài viết đánh giá (24h Công nghệ):** Hỗ trợ kéo traffic SEO.

### 3.2. Danh mục sản phẩm & Bộ lọc thông minh (Category & Smart Filter)
* **Bộ lọc đa tiêu chí (Dynamic Faceted Filter):**
  * Hãng sản xuất (Apple, Samsung, Xiaomi...).
  * Mức giá (Dưới 5 triệu, 5 - 10 triệu, 10 - 15 triệu, trên 15 triệu, hoặc thanh trượt giá).
  * Bộ nhớ RAM (4GB, 6GB, 8GB, 12GB...).
  * Bộ nhớ trong ROM (64GB, 128GB, 256GB, 512GB, 1TB).
  * Nhu cầu sử dụng (Chơi game, Pin khủng, Chụp ảnh/Quay phim...).
  * Tính năng đặc biệt (Màn hình 120Hz, Sạc nhanh >65W, Chống nước IP68, Hỗ trợ 5G, Sạc không dây...).
* **Sắp xếp:** Giá tăng/giảm dần, Khuyến mãi hot nhất, Bán chạy nhất, Hàng mới về.
* **Tính năng so sánh sản phẩm (Product Comparison):** Cho phép chọn 2-3 mẫu điện thoại để so sánh bảng thông số kỹ thuật song song (giống TGDD).

### 3.3. Trang chi tiết sản phẩm (Product Detail Page - PDP)
* **Khu vực Media:**
  * Album ảnh thực tế, ảnh 360 độ hoặc render 3D (nếu có).
  * Video đánh giá thực tế / Mở hộp (Unbox).
* **Thông tin giá & Phiên bản:**
  * Giá niêm yết, Giá khuyến mãi, Phần trăm tiết kiệm.
  * Bộ chọn dung lượng (Nút bấm chuyển đổi giá và tồn kho tức thời).
  * Bộ chọn màu sắc (Đổi ảnh đại diện sản phẩm theo màu).
* **Khối khuyến mãi & Ưu đãi kèm theo:**
  * Danh sách quà tặng / Giảm giá phụ kiện mua kèm (Giảm 20% khi mua kèm củ sạc, ốp lưng, tai nghe).
  * Ưu đãi thanh toán (Giảm thêm 500k khi quét VNPAY/MoMo).
* **Nút hành động chính:**
  * `MUA NGAY` (Giao tận nơi hoặc nhận tại siêu thị).
  * `TRẢ GÓP 0% QUA THẺ` hoặc `TRẢ GÓP DUYỆT HỒ SƠ`.
  * `THÊM VÀO GIỎ HÀNG`.
* **Thông số kỹ thuật chi tiết:**
  * Bảng rút gọn (Màn hình, Chip, RAM, ROM, Camera trước/sau, Pin/Sạc).
  * Nút "Xem cấu hình chi tiết" bật popup/modal toàn bộ thông số.
* **Chính sách bảo hành & Hậu mãi:**
  * Cam kết 1 đổi 1 trong 30 ngày nếu có lỗi NSX.
  * Bảo hành chính hãng 12 - 24 tháng.
* **Đánh giá & Bình luận (Rating & Comments):**
  * Đánh giá 1-5 sao kèm hình ảnh thực tế từ người mua (có nhãn "Đã mua tại cửa hàng").
  * Hỏi đáp trực tuyến (Q&A) có nhân viên kỹ thuật phản hồi.

### 3.4. Giỏ hàng & Thanh toán (Cart & Checkout)
* **Giỏ hàng:**
  * Tùy chỉnh số lượng, xóa sản phẩm, chọn màu/phiên bản khác.
  * Chọn mua kèm combo phụ kiện giá sốc.
  * Nhập mã Voucher / Phiếu mua hàng.
* **Quy trình đặt hàng (Checkout Flow):**
  * Thông tin người mua: Họ tên, Số điện thoại (bắt buộc).
  * Hình thức nhận hàng:
    * Giao hàng tận nơi (Chọn Tỉnh/Thành -> Quận/Huyện -> Phường/Xã -> Địa chỉ cụ thể).
    * Nhận tại cửa hàng (Tìm kiếm chi nhánh gần nhất còn hàng).
  * Ghi chú đơn hàng (Xuất hóa đơn VAT cho công ty, hỗ trợ dán màn hình...).
* **Cổng thanh toán:**
  * Tiền mặt khi nhận hàng (COD).
  * Chuyển khoản ngân hàng (VietQR tạo mã QR động tự động khớp giao dịch).
  * Ví điện tử: MoMo, ZaloPay, ShopeePay.
  * Thẻ ATM nội địa / Thẻ quốc tế (Visa, Mastercard, JCB).
* **Module Trả góp Online:**
  * Bảng tính trả góp: Chọn số tiền trả trước (0%, 20%, 30%...), kỳ hạn (6, 9, 12 tháng).
  * Tính toán lãi suất minh bạch, số tiền phải trả mỗi tháng.
  * Form điền thông tin duyệt hồ sơ (CCCD, ảnh chụp, liên kết đơn vị tài chính).

### 3.5. Tài khoản & Tiện ích khách hàng
* **Đăng nhập / Đăng ký:** Đơn giản hóa qua Số điện thoại + OTP SMS/Zalo ZNS, hoặc Google OAuth.
* **Tra cứu đơn hàng:** Chỉ cần nhập SĐT + Mã đơn hàng là tra cứu được tiến trình mà không bắt buộc tạo tài khoản.
* **Tra cứu bảo hành:** Nhập số IMEI hoặc SĐT để xem thời hạn bảo hành của từng thiết bị đã mua.
* **Tích điểm thành viên (Loyalty):** Tích điểm theo % giá trị đơn, dùng điểm để giảm giá đơn sau.

---

## 4. ĐẶC TẢ CHI TIẾT PHÂN HỆ QUẢN TRỊ (ADMIN BACKOFFICE)

### 4.1. Dashboard & Báo cáo tổng quan (Analytics & Metrics)
* Thống kê doanh thu theo thời gian thực (Hôm nay, tuần này, tháng này, năm nay).
* Số lượng đơn hàng mới, đơn chờ xử lý, đơn đang giao, đơn hủy/hoàn.
* Top 10 sản phẩm bán chạy nhất, sản phẩm xem nhiều nhất.
* Cảnh báo tồn kho: Sản phẩm sắp hết hàng (< 5 chiếc) hoặc tồn kho quá lâu (> 60 ngày).
* Biểu đồ tỷ trọng doanh thu theo ngành hàng (Điện thoại, Laptop, Phụ kiện...).

### 4.2. Quản lý Sản phẩm & Danh mục (Product Catalog Management)
* **Quản lý danh mục & Thương hiệu:** Tạo cây danh mục đa cấp (Điện thoại -> iPhone, Samsung...), quản lý Logo hãng.
* **Tạo sản phẩm Master:**
  * Tên sản phẩm, mô tả ngắn, bài viết đánh giá chi tiết (Rich-text Editor chuẩn SEO).
  * Định nghĩa nhóm thuộc tính kỹ thuật động (Dynamic Attributes): Chipset, RAM, Kích thước màn hình, Tần số quét, Dung lượng pin, Công nghệ sạc...
* **Quản lý biến thể (Variants):**
  * Tổ hợp biến thể theo Bộ nhớ + Màu sắc.
  * Giá bán lẻ, Giá khuyến mãi, Giá nhập (Cost).
  * Hình ảnh riêng cho từng màu sắc.
* **Quản lý mã IMEI / Serial:**
  * Nhập danh sách IMEI theo lô (File Excel/CSV) khi nhập hàng từ hãng/nhà phân phối.
  * Theo dõi trạng thái từng IMEI: Trong kho, Đã xuất bán (gắn với đơn hàng nào), Đổi trả, Bảo hành.

### 4.3. Quản lý Kho hàng & Chi nhánh (Inventory & Multi-store)
* Hỗ trợ quản lý nhiều kho / chuỗi cửa hàng vật lý:
  * Kho tổng / Trung tâm phân phối.
  * Các chi nhánh bán lẻ.
* **Phiếu nhập kho:** Nhập hàng từ nhà cung cấp kèm giá vốn, ngày nhập, mã PO.
* **Điều chuyển kho:** Chuyển hàng giữa các chi nhánh, xác nhận nhận hàng.
* **Kiểm kê kho:** Đối soát số lượng thực tế với phần mềm thông qua máy quét mã vạch / barcode scanner.

### 4.4. Quản lý Đơn hàng (Order Management System - OMS)
* **Luồng xử lý đơn hàng (Order State Machine):**
  1. `Chờ xác nhận`: Đơn mới từ web, nhân viên gọi xác thực đơn.
  2. `Đã xác nhận / Đang chuẩn bị`: In phiếu xuất kho, quét mã IMEI gán cho đơn hàng.
  3. `Đã giao vận chuyển`: Bàn giao cho shipper nội bộ hoặc đơn vị vận chuyển (GHN, GHTK, Viettel Post...).
  4. `Đang giao hàng`: Cập nhật webhook tracking từ đối tác vận chuyển.
  5. `Giao thành công / Đã thanh toán`: Đối soát tiền COD.
  6. `Hủy đơn / Hoàn hàng`: Tự động hoàn lại IMEI vào kho tồn.
* **In hóa đơn bán hàng & Phiếu giao hàng:** Hỗ trợ mẫu in nhiệt khổ A4/A5/K80.
* **Xuất hóa đơn điện tử (e-Invoice):** Kết nối API hóa đơn điện tử (VNPT, Viettel, MISA...).

### 4.5. Quản lý Khuyến mãi & Marketing
* **Mã giảm giá (Coupon/Voucher):** Giảm theo %, giảm số tiền cố định, giới hạn lượt dùng, áp dụng theo danh mục hoặc tổng giá trị đơn.
* **Flash Sale:** Cấu hình khung giờ bán hàng đặc biệt, giới hạn số lượng bán theo giá sale.
* **Quà tặng kèm & Combo:** Cấu hình mua sản phẩm A tặng sản phẩm B, hoặc mua kèm phụ kiện giảm X%.
* **Quản lý Banner & Pop-up:** Đổi banner trang chủ, slider, pop-up quảng cáo theo chiến dịch.
* **Quản lý Tin tức / Blog:** Hệ thống CMS viết bài tin tức công nghệ, thủ thuật, đánh giá sản phẩm.

### 4.6. Quản lý Khách hàng & CSKH (CRM)
* Danh sách khách hàng kèm lịch sử mua sắm, tổng chi tiêu (LTV).
* Phân hạng thành viên: Đồng, Bạc, Vàng, Kim Cương kèm chính sách chiết khấu.
* Quản lý Đánh giá / Bình luận: Duyệt bình luận, trả lời thắc mắc của khách hàng, ẩn bình luận vi phạm.

### 4.7. Quản lý Đơn Trả Góp (Installment Processing)
* Tiếp nhận hồ sơ đăng ký trả góp của khách.
* Trạng thái hồ sơ: Chờ thẩm định -> Đã duyệt -> Bị từ chối -> Đã thanh toán trước -> Hoàn tất.
* Phân công nhân viên phụ trách tư vấn hoàn thiện hồ sơ.

### 4.8. Phân quyền & Cài đặt hệ thống (RBAC & Settings)
* **Phân quyền vai trò (Role-Based Access Control):**
  * Super Admin, Quản lý chi nhánh, Nhân viên bán hàng, Thủ kho, Kế toán, Nhân viên CSKH.
  * Phân quyền chi tiết theo hành động: Xem, Thêm, Sửa, Xóa, Xuất file Excel.
* **Nhật ký hoạt động (Audit Logs):** Ghi lại ai đã sửa giá sản phẩm, ai xóa đơn hàng, ai xuất dữ liệu khách hàng.
* **Cấu hình tích hợp:**
  * Cổng thanh toán (VNPAY, MoMo, OnePay, Alepay).
  * Đơn vị vận chuyển (GHTK, GHN, Viettel Post, AhaMove).
  * Dịch vụ SMS OTP / Zalo ZNS.

---

## 5. YÊU CẦU PHI CHỨC NĂNG (NON-FUNCTIONAL REQUIREMENTS)

### 5.1. Hiệu năng & Tải (Performance & Scalability)
* **Tốc độ tải trang:** Thời gian tải trang đầu tiên (FCP) dưới 1.5 giây; điểm Google PageSpeed Insights cho Mobile > 85.
* **Chịu tải:** Hệ thống có khả năng phục vụ tối thiểu 5.000 người dùng đồng thời (CCU) trong các dịp Flash Sale/Black Friday mà không bị nghẽn giỏ hàng.
* **Caching:** Áp dụng Redis Caching cho dữ liệu sản phẩm, trang chủ và danh mục; CDN (Cloudflare) cho hình ảnh/video.

### 5.2. Chuẩn SEO cho Thương mại điện tử
* Hỗ trợ cấu trúc URL thân thiện (Friendly SEO URL): `/dien-thoai/iphone-16-pro-max-256gb`.
* Tự động sinh `sitemap.xml`, thẻ Meta (Title, Description, OpenGraph, Canonical).
* Tích hợp dữ liệu có cấu trúc Schema.org (`Product`, `AggregateRating`, `Offer`, `BreadcrumbList`).

### 5.3. Bảo mật (Security)
* Mã hóa toàn bộ đường truyền qua SSL/HTTPS.
* Chống các lỗ hổng bảo mật phổ biến theo chuẩn OWASP Top 10 (SQL Injection, XSS, CSRF, DDoS).
* Mã hóa mật khẩu người dùng bằng thuật toán `bcrypt` hoặc `Argon2`.
* Cơ chế Rate Limiting: Chống spam gửi mã OTP SMS và spam đặt đơn ảo (Dùng Captcha / Cloudflare Turnstile).

### 5.4. Tính sẵn sàng & Dự phòng (High Availability)
* Thời gian hoạt động (Uptime) cam kết đạt 99.9%.
* Tự động sao lưu cơ sở dữ liệu hàng ngày (Daily Auto-backup), lưu trữ đa vùng.

---

## 6. ĐỀ XUẤT CÔNG NGHỆ TRIỂN KHAI (TECH STACK)

| Phân hệ | Công nghệ đề xuất | Lý do lựa chọn |
| :--- | :--- | :--- |
| **Storefront (Khách hàng)** | **Next.js (React) + Tailwind CSS** | Server-Side Rendering (SSR) tối ưu SEO vượt trội, tốc độ tải trang cực nhanh, giao diện hiện đại. |
| **Admin Portal (Quản lý)** | **React.js / Vite + Ant Design** | Bộ component quản trị chuyên nghiệp, tốc độ xử lý bảng dữ liệu lớn (Table, DataGrid) mượt mà. |
| **Backend API** | **Node.js (NestJS) hoặc Golang** | Kiến trúc module rõ ràng, xử lý I/O không đồng bộ tốt, dễ mở rộng microservices khi cần. |
| **Cơ sở dữ liệu chính** | **PostgreSQL** | Xử lý giao dịch ACID toàn vẹn cho đơn hàng, hỗ trợ JSONB lưu thông số kỹ thuật linh hoạt. |
| **Bộ nhớ đệm & Xử lý hàng đợi** | **Redis + BullMQ** | Cache trang chủ/danh mục, quản lý hàng đợi gửi OTP, trừ kho không bị over-sale khi flash sale. |
| **Công cụ tìm kiếm** | **Meilisearch hoặc Elasticsearch** | Tìm kiếm sản phẩm thông minh, gợi ý typo tolerance (gõ "ipone" vẫn ra "iPhone"). |
| **Lưu trữ tệp tin & Ảnh** | **AWS S3 / Cloudflare R2** | Tối ưu chi phí lưu trữ ảnh sản phẩm, tốc độ tải toàn cầu nhanh qua CDN. |

---

## 7. CƠ SỞ DỮ LIỆU CỐT LÕI (CORE DATABASE ENTITIES)

1. `users`: ID, họ tên, SĐT, email, mật khẩu, role, hạng thành viên.
2. `categories`: ID, tên danh mục, slug, icon, parent_id.
3. `brands`: ID, tên hãng, slug, logo.
4. `products`: ID, tên máy, slug, category_id, brand_id, mô tả, thông số kỹ thuật (JSONB), is_active.
5. `product_variants`: ID, product_id, sku, tên phiên bản (VD: 256GB - Titan Đen), giá niêm yết, giá bán, giá nhập, tồn kho hiển thị.
6. `serial_imei`: ID, variant_id, imei_code, store_id, status (IN_STOCK, SOLD, DEFECTIVE, RETURNING), order_id.
7. `orders`: ID, mã đơn, user_id, tên người nhận, SĐT nhận, địa chỉ nhận, phương thức thanh toán, trạng thái thanh toán, trạng thái giao hàng, tổng tiền, ghi chú.
8. `order_items`: ID, order_id, variant_id, số lượng, đơn giá, mã serial_imei đã gán.
9. `promotions`: ID, mã voucher, loại giảm giá, giá trị, ngày bắt đầu, ngày kết thúc, giới hạn sử dụng.
10. `installment_requests`: ID, user_id, variant_id, gói trả góp, đơn vị tài chính, giấy tờ đính kèm, trạng thái duyệt.

---

## 8. LỘ TRÌNH TRIỂN KHAI DỰ ÁN (ROADMAP)

* **Giai đoạn 1 (MVP - 4 đến 6 tuần):**
  * Xây dựng Database & Backend API CRUD sản phẩm, biến thể, danh mục.
  * Hoàn thiện Storefront: Xem sản phẩm, giỏ hàng, đặt hàng COD.
  * Hoàn thiện Admin cơ bản: Nhập sản phẩm, quản lý đơn hàng.
* **Giai đoạn 2 (Hoàn thiện nghiệp vụ bán lẻ - 4 tuần):**
  * Quản lý kho theo IMEI/Serial.
  * Tích hợp thanh toán trực tuyến (VNPAY, Chuyển khoản QR tự động).
  * Phân quyền nhân viên (Admin, Bán hàng, Kho).
  * Bộ lọc thông minh và so sánh sản phẩm.
* **Giai đoạn 3 (Nâng cao & Marketing - 3 đến 4 tuần):**
  * Tích hợp đăng ký Trả góp online.
  * Hệ thống Flash Sale, Combo phụ kiện mua kèm, Voucher.
  * Tra cứu bảo hành điện tử theo IMEI.
  * Tối ưu hóa SEO và kiểm thử chịu tải.
