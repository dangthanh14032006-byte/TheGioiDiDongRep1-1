import prisma from '@/lib/prisma';
import { MOCK_PRODUCTS, MOCK_ORDERS, MOCK_IMEIS, BRANDS, CATEGORIES } from '@/data/mock-data';
import { Product, Order, ImeiItem } from '@/types';

// Kiểm tra trạng thái kết nối PostgreSQL
export async function checkDatabaseConnection(): Promise<{ connected: boolean; message: string }> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { connected: true, message: 'Đã kết nối thành công tới PostgreSQL!' };
  } catch (error: any) {
    return { 
      connected: false, 
      message: `Chưa kết nối PostgreSQL (${error.message?.slice(0, 80) || 'Connection refused'}). Đang chạy ở chế độ Safe Fallback Data.` 
    };
  }
}

// Lấy danh sách sản phẩm (từ PostgreSQL hoặc Mock data)
export async function getProducts(options?: { brand?: string; category?: string }): Promise<Product[]> {
  try {
    const where: any = { isActive: true };
    if (options?.brand && options.brand !== 'all') {
      where.brand = { slug: options.brand.toLowerCase() };
    }

    const dbProducts = await prisma.product.findMany({
      where,
      include: {
        brand: true,
        category: true,
        variants: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    if (dbProducts && dbProducts.length > 0) {
      return dbProducts.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        brand: p.brand.name,
        category: p.category.name,
        thumbnail: p.thumbnail,
        images: p.images,
        description: p.description,
        highlights: p.highlights,
        specs: p.specs as any,
        warrantyMonths: p.warrantyMonths,
        isFeatured: p.isFeatured,
        rating: 4.8,
        reviewsCount: 150,
        installment0: true,
        variants: p.variants.map((v) => ({
          id: v.id,
          sku: v.sku,
          colorName: v.colorName,
          colorCode: v.colorCode,
          storage: v.storage,
          originalPrice: Number(v.originalPrice),
          salePrice: Number(v.salePrice),
          image: v.image || p.thumbnail,
          stockQuantity: v.stockQuantity,
        })),
      }));
    }
  } catch (err) {
    // Fallback nếu database chưa khởi chạy
  }

  // Fallback Mock Data
  let results = [...MOCK_PRODUCTS];
  if (options?.brand && options.brand !== 'all') {
    results = results.filter((p) => p.brand.toLowerCase() === options.brand?.toLowerCase());
  }
  return results;
}

// Lấy chi tiết sản phẩm theo slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const p = await prisma.product.findUnique({
      where: { slug },
      include: {
        brand: true,
        category: true,
        variants: true,
      },
    });

    if (p) {
      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        brand: p.brand.name,
        category: p.category.name,
        thumbnail: p.thumbnail,
        images: p.images,
        description: p.description,
        highlights: p.highlights,
        specs: p.specs as any,
        warrantyMonths: p.warrantyMonths,
        isFeatured: p.isFeatured,
        rating: 4.9,
        reviewsCount: 280,
        installment0: true,
        variants: p.variants.map((v) => ({
          id: v.id,
          sku: v.sku,
          colorName: v.colorName,
          colorCode: v.colorCode,
          storage: v.storage,
          originalPrice: Number(v.originalPrice),
          salePrice: Number(v.salePrice),
          image: v.image || p.thumbnail,
          stockQuantity: v.stockQuantity,
        })),
      };
    }
  } catch (err) {
    // Fallback
  }

  return MOCK_PRODUCTS.find((p) => p.slug === slug) || MOCK_PRODUCTS[0];
}
