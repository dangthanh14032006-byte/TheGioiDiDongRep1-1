export interface DynamicSpecs {
  screen: string;       // e.g. "6.9 inch, Super Retina XDR OLED, 120Hz"
  cpu: string;          // e.g. "Apple A18 Pro 6 nhân"
  ram: string;          // e.g. "8 GB"
  storage: string;      // e.g. "256 GB"
  rearCamera: string;   // e.g. "Chính 48 MP & Phụ 48 MP, 12 MP"
  frontCamera: string;  // e.g. "12 MP"
  battery: string;      // e.g. "Khoảng 4.685 mAh, Sạc 25W"
  sim: string;          // e.g. "1 Nano SIM & 1 eSIM, Hỗ trợ 5G"
  os: string;           // e.g. "iOS 18"
}

export interface ProductVariant {
  id: string;
  sku: string;
  colorName: string;
  colorCode: string;
  storage: string;
  originalPrice: number;
  salePrice: number;
  image: string;
  stockQuantity: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  description: string;
  highlights: string[];
  specs: DynamicSpecs;
  variants: ProductVariant[];
  rating: number;
  reviewsCount: number;
  installment0: boolean; // Trả góp 0%
  isFeatured: boolean;
  warrantyMonths: number;
}

export interface CartItem {
  variantId: string;
  productId: string;
  productName: string;
  colorName: string;
  storage: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderCode: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryMethod: 'HOME_DELIVERY' | 'STORE_PICKUP';
  shippingAddress?: string;
  pickupStore?: string;
  paymentMethod: 'COD' | 'VIETQR' | 'VNPAY' | 'MOMO' | 'INSTALLMENT_CREDIT';
  paymentStatus: 'PENDING' | 'PAID' | 'REFUNDED';
  orderStatus: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'SHIPPING' | 'COMPLETED' | 'CANCELLED';
  totalAmount: number;
  items: {
    productName: string;
    variantName: string;
    price: number;
    quantity: number;
    assignedImei?: string;
  }[];
  createdAt: string;
}

export interface ImeiItem {
  id: string;
  variantId: string;
  productName: string;
  variantSku: string;
  imei: string;
  status: 'IN_STOCK' | 'SOLD' | 'DEFECTIVE' | 'WARRANTY';
  storeLocation: string;
  importDate: string;
  orderCode?: string;
}
