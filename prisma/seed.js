const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Đang khởi tạo dữ liệu mẫu cho hệ thống Thế Giới Di Động...');

  // 1. Tạo Danh Mục (Categories)
  const catPhone = await prisma.category.upsert({
    where: { slug: 'dien-thoai' },
    update: {},
    create: {
      name: 'Điện thoại',
      slug: 'dien-thoai',
      icon: 'Smartphone',
      order: 1,
    },
  });

  const catLaptop = await prisma.category.upsert({
    where: { slug: 'laptop' },
    update: {},
    create: {
      name: 'Laptop',
      slug: 'laptop',
      icon: 'Laptop',
      order: 2,
    },
  });

  const catTablet = await prisma.category.upsert({
    where: { slug: 'tablet' },
    update: {},
    create: {
      name: 'Tablet',
      slug: 'tablet',
      icon: 'Tablet',
      order: 3,
    },
  });

  // 2. Tạo Thương Hiệu (Brands)
  const brandApple = await prisma.brand.upsert({
    where: { slug: 'apple' },
    update: {},
    create: {
      name: 'Apple',
      slug: 'apple',
      logo: 'https://cdn.tgdd.vn/Brand/1/logo-iphone-220x48.png',
    },
  });

  const brandSamsung = await prisma.brand.upsert({
    where: { slug: 'samsung' },
    update: {},
    create: {
      name: 'Samsung',
      slug: 'samsung',
      logo: 'https://cdn.tgdd.vn/Brand/1/samsungnew-220x48-1.png',
    },
  });

  const brandXiaomi = await prisma.brand.upsert({
    where: { slug: 'xiaomi' },
    update: {},
    create: {
      name: 'Xiaomi',
      slug: 'xiaomi',
      logo: 'https://cdn.tgdd.vn/Brand/1/logo-xiaomi-220x48-5.png',
    },
  });

  const brandOppo = await prisma.brand.upsert({
    where: { slug: 'oppo' },
    update: {},
    create: {
      name: 'OPPO',
      slug: 'oppo',
      logo: 'https://cdn.tgdd.vn/Brand/1/OPPO42-b0-220x48.png',
    },
  });

  // 3. Tạo Sản phẩm iPhone 16 Pro Max
  const ip16pm = await prisma.product.upsert({
    where: { slug: 'iphone-16-pro-max' },
    update: {},
    create: {
      id: 'prod-ip16pm',
      name: 'iPhone 16 Pro Max',
      slug: 'iphone-16-pro-max',
      categoryId: catPhone.id,
      brandId: brandApple.id,
      thumbnail: 'https://cdn.tgdd.vn/Products/Images/42/329149/iphone-16-pro-max-titan-sa-mac-thumb-600x600.jpg',
      images: [
        'https://cdn.tgdd.vn/Products/Images/42/329149/iphone-16-pro-max-titan-sa-mac-thumb-600x600.jpg',
        'https://cdn.tgdd.vn/Products/Images/42/329149/iphone-16-pro-max-titan-tu-nhien-thumb-600x600.jpg',
      ],
      description: 'iPhone 16 Pro Max viền titan mỏng nhất từ trước đến nay, chip A18 Pro và nút Camera Control cảm ứng.',
      highlights: [
        'Màn hình 6.9 inch ProMotion 120Hz',
        'Chip A18 Pro 3nm mạnh mẽ',
        'Nút Điều Khiển Camera cảm ứng lực',
        'Zoom quang học 5x sắc nét',
      ],
      specs: {
        screen: '6.9 inch, Super Retina XDR OLED, 120Hz',
        cpu: 'Apple A18 Pro 6 nhân',
        ram: '8 GB',
        storage: '256 GB',
        rearCamera: 'Chính 48 MP, Siêu rộng 48 MP, Tele 12 MP (Zoom 5x)',
        frontCamera: '12 MP TrueDepth',
        battery: 'Khoảng 4.685 mAh, Sạc 25W',
        sim: '1 Nano SIM & 1 eSIM, 5G',
        os: 'iOS 18',
      },
      warrantyMonths: 12,
      isFeatured: true,
      variants: {
        create: [
          {
            id: 'var-ip16pm-256-desert',
            sku: 'IP16PM-256-DESERT',
            colorName: 'Titan Sa Mạc',
            colorCode: '#C5B49E',
            storage: '256GB',
            originalPrice: 34990000,
            salePrice: 32490000,
            costPrice: 29500000,
            image: 'https://cdn.tgdd.vn/Products/Images/42/329149/iphone-16-pro-max-titan-sa-mac-thumb-600x600.jpg',
            stockQuantity: 18,
          },
          {
            id: 'var-ip16pm-256-natural',
            sku: 'IP16PM-256-NATURAL',
            colorName: 'Titan Tự Nhiên',
            colorCode: '#989793',
            storage: '256GB',
            originalPrice: 34990000,
            salePrice: 32490000,
            costPrice: 29500000,
            image: 'https://cdn.tgdd.vn/Products/Images/42/329149/iphone-16-pro-max-titan-tu-nhien-thumb-600x600.jpg',
            stockQuantity: 12,
          },
        ],
      },
    },
  });

  // 4. Tạo Sản phẩm Samsung Galaxy S24 Ultra
  const s24u = await prisma.product.upsert({
    where: { slug: 'samsung-galaxy-s24-ultra' },
    update: {},
    create: {
      id: 'prod-s24u',
      name: 'Samsung Galaxy S24 Ultra 5G',
      slug: 'samsung-galaxy-s24-ultra',
      categoryId: catPhone.id,
      brandId: brandSamsung.id,
      thumbnail: 'https://cdn.tgdd.vn/Products/Images/42/307174/samsung-galaxy-s24-ultra-grey-thumb-600x600.jpg',
      images: [
        'https://cdn.tgdd.vn/Products/Images/42/307174/samsung-galaxy-s24-ultra-grey-thumb-600x600.jpg',
      ],
      description: 'Galaxy S24 Ultra mở ra kỷ nguyên quyền năng Galaxy AI với khung titan siêu bền và bút S-Pen.',
      highlights: [
        'Tích hợp bút S-Pen quyền năng bên trong thân máy',
        'Tính năng Galaxy AI thông minh toàn diện',
        'Màn hình phẳng Dynamic AMOLED 2X, phủ lớp chống chói Gorilla Armor',
        'Camera chính 200 MP, zoom chuẩn quang học 2x, 3x, 5x, 10x',
      ],
      specs: {
        screen: '6.8 inch, Dynamic AMOLED 2X, QHD+, 120Hz',
        cpu: 'Snapdragon 8 Gen 3 for Galaxy',
        ram: '12 GB',
        storage: '256 GB',
        rearCamera: 'Chính 200 MP & Phụ 50 MP, 12 MP, 10 MP',
        frontCamera: '12 MP',
        battery: '5000 mAh, Sạc nhanh 45W',
        sim: '2 Nano SIM hoặc 1 eSIM + 1 Nano SIM, 5G',
        os: 'Android 14, One UI 6.1',
      },
      warrantyMonths: 12,
      isFeatured: true,
      variants: {
        create: [
          {
            id: 'var-s24u-256-grey',
            sku: 'S24U-256-GREY',
            colorName: 'Xám Titan',
            colorCode: '#6c6f70',
            storage: '256GB',
            originalPrice: 33990000,
            salePrice: 28990000,
            costPrice: 25000000,
            image: 'https://cdn.tgdd.vn/Products/Images/42/307174/samsung-galaxy-s24-ultra-grey-thumb-600x600.jpg',
            stockQuantity: 15,
          },
        ],
      },
    },
  });

  // 5. Tạo các bản ghi IMEI thực tế
  await prisma.inventoryIMEI.upsert({
    where: { imei: '358920114829102' },
    update: {},
    create: {
      variantId: 'var-ip16pm-256-desert',
      imei: '358920114829102',
      status: 'SOLD',
      storeLocation: 'Kho TP.HCM',
    },
  });

  await prisma.inventoryIMEI.upsert({
    where: { imei: '358920114829103' },
    update: {},
    create: {
      variantId: 'var-ip16pm-256-desert',
      imei: '358920114829103',
      status: 'IN_STOCK',
      storeLocation: 'Kho TP.HCM',
    },
  });

  console.log('✅ Đã nạp thành công dữ liệu mẫu vào PostgreSQL!');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi nạp dữ liệu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
