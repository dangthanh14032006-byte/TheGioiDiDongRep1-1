'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { MOCK_PRODUCTS } from '@/data/mock-data';
import { Product } from '@/types';
import { 
  Smartphone, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  Search, 
  Upload, 
  Image as ImageIcon, 
  X, 
  Layers,
  Sparkles
} from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Form states cho sản phẩm mới
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('Apple');
  const [price, setPrice] = useState(25990000);
  const [originalPrice, setOriginalPrice] = useState(28990000);
  const [storage, setStorage] = useState('256GB');
  const [colorName, setColorName] = useState('Titan Tự Nhiên');
  const [colorCode, setColorCode] = useState('#989793');
  const [stockQuantity, setStockQuantity] = useState(25);

  // Specs
  const [screen, setScreen] = useState('6.7 inch, 120Hz OLED');
  const [cpu, setCpu] = useState('Chip thế hệ mới');
  const [ram, setRam] = useState('8 GB');
  const [battery, setBattery] = useState('5000 mAh, Sạc 45W');

  // Quản lý ảnh đăng kèm
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('https://cdn.tgdd.vn/Products/Images/42/329149/iphone-16-pro-max-titan-sa-mac-thumb-600x600.jpg');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState('');

  const [successMsg, setSuccessMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat('vi-VN').format(p) + '₫';
  };

  // Xử lý upload ảnh đại diện (Thumbnail) từ máy tính
  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setThumbnailPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Xử lý upload album nhiều ảnh chi tiết
  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setGalleryImages((prev) => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Thêm ảnh từ link URL
  const handleAddImageUrl = () => {
    if (imageUrlInput.trim()) {
      setThumbnailPreview(imageUrlInput.trim());
      setImageUrlInput('');
    }
  };

  // Xóa ảnh khỏi album
  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Lưu sản phẩm mới
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: name.trim(),
      slug,
      brand,
      category: 'Điện thoại',
      thumbnail: thumbnailPreview,
      images: galleryImages.length > 0 ? galleryImages : [thumbnailPreview],
      description: `${name} trang bị vi xử lý ${cpu}, màn hình ${screen} và thời lượng pin ${battery}.`,
      highlights: [
        `Màn hình ${screen} sắc nét`,
        `Hiệu năng vượt trội với ${cpu}`,
        `RAM ${ram} mượt mà đa nhiệm`,
        `Pin dung lượng cao ${battery}`,
      ],
      specs: {
        screen,
        cpu,
        ram,
        storage,
        rearCamera: 'Chính 50 MP & Phụ 12 MP',
        frontCamera: '12 MP',
        battery,
        sim: '1 Nano SIM & 1 eSIM, 5G',
        os: 'Android / iOS',
      },
      variants: [
        {
          id: `var-${Date.now()}`,
          sku: `${brand.toUpperCase()}-${storage}-${Date.now().toString().slice(-4)}`,
          colorName,
          colorCode,
          storage,
          originalPrice: Number(originalPrice),
          salePrice: Number(price),
          image: thumbnailPreview,
          stockQuantity: Number(stockQuantity),
        },
      ],
      rating: 5.0,
      reviewsCount: 1,
      installment0: true,
      isFeatured: true,
      warrantyMonths: 12,
    };

    setProducts([newProduct, ...products]);
    setShowModal(false);
    setName('');
    setGalleryImages([]);
    setSuccessMsg(`Đã thêm thành công sản phẩm [${newProduct.name}] kèm ảnh thực tế vào hệ thống!`);
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-black text-gray-900">QUẢN LÝ SẢN PHẨM & ĐĂNG ẢNH KÈM THEO</h1>
          <p className="text-xs text-gray-500">Quản trị danh mục máy, đăng ảnh đại diện, album ảnh thực tế và cấu hình biến thể</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#ffd400] text-black hover:bg-[#ecc200] text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition shadow-sm"
        >
          <Plus className="w-4 h-4" /> Thêm Sản Phẩm & Đăng Ảnh
        </button>
      </div>

      {successMsg && (
        <div className="bg-green-50 border border-green-200 text-green-800 text-xs font-bold p-3.5 rounded-xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white p-3 rounded-xl border border-gray-200 flex items-center gap-3 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Tìm theo tên máy hoặc hãng sản xuất..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
          />
        </div>
        <div className="text-xs text-gray-500">
          Tổng số: <span className="font-bold text-gray-900">{filtered.length}</span> máy
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-600 uppercase font-bold border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">Hình ảnh</th>
                <th className="py-3 px-4">Tên sản phẩm</th>
                <th className="py-3 px-4">Hãng</th>
                <th className="py-3 px-4">Biến thể (ROM / Màu)</th>
                <th className="py-3 px-4">Giá bán lẻ</th>
                <th className="py-3 px-4">Tồn kho</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="w-14 h-14 object-contain border rounded-lg p-1 bg-white shadow-xs"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-gray-900 text-sm">{product.name}</div>
                    <div className="text-[11px] text-gray-500">{product.specs.cpu} • {product.specs.screen}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-gray-700">{product.brand}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 flex-wrap">
                      {product.variants.map((v) => (
                        <span key={v.id} className="bg-gray-100 px-2 py-0.5 rounded text-[10px] text-gray-700 border">
                          {v.storage} - {v.colorName}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-black text-[#d0021b] text-sm">
                    {formatPrice(product.variants[0].salePrice)}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-green-600">
                      {product.variants.reduce((acc, curr) => acc + curr.stockQuantity, 0)} máy
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/dien-thoai/${product.slug}`}
                        target="_blank"
                        className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition"
                        title="Xem trang sản phẩm"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <button className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL THÊM SẢN PHẨM MỚI KÈM CHỨC NĂNG ĐĂNG ẢNH */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-2xl max-h-[90vh] flex flex-col space-y-4">
            {/* Header Modal */}
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-base text-gray-900 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-yellow-500" />
                THÊM SẢN PHẨM MỚI & TẢI LÊN HÌNH ẢNH
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-black font-bold p-1 text-base"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="flex-1 overflow-y-auto pr-1 space-y-5 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* CỘT TRÁI: KHU VỰC ĐĂNG ẢNH (5 CỘT) */}
                <div className="md:col-span-5 space-y-4 border-r pr-4">
                  <div>
                    <label className="block text-gray-800 font-bold mb-1.5 flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-blue-600" />
                      1. Ảnh đại diện chính (Thumbnail) *
                    </label>

                    {/* Khung xem trước ảnh đại diện */}
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-3 text-center bg-gray-50 hover:bg-gray-100 transition relative group">
                      {thumbnailPreview ? (
                        <div className="relative">
                          <img
                            src={thumbnailPreview}
                            alt="Preview Thumbnail"
                            className="w-full h-44 object-contain mx-auto rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute inset-0 bg-black/40 text-white font-bold opacity-0 group-hover:opacity-100 transition rounded-lg flex items-center justify-center gap-1.5 text-xs"
                          >
                            <Upload className="w-4 h-4" /> Đổi ảnh khác
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="py-8 cursor-pointer space-y-2 text-gray-400"
                        >
                          <Upload className="w-8 h-8 mx-auto text-gray-400" />
                          <div className="font-semibold text-xs text-gray-700">Bấm để tải ảnh từ máy tính</div>
                          <div className="text-[10px] text-gray-400">PNG, JPG, WEBP (Khuyên dùng 600x600)</div>
                        </div>
                      )}
                    </div>

                    {/* Nút bấm chọn file máy tính */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                      className="hidden"
                    />

                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1.5 px-3 rounded-lg flex items-center justify-center gap-1 text-[11px] transition"
                      >
                        <Upload className="w-3.5 h-3.5" /> Chọn từ máy tính
                      </button>
                    </div>

                    {/* Hoặc nhập link ảnh */}
                    <div className="mt-2">
                      <div className="text-[10px] text-gray-500 mb-1">Hoặc dán URL ảnh trực tiếp:</div>
                      <div className="flex gap-1.5">
                        <input
                          type="url"
                          placeholder="https://... ảnh sản phẩm"
                          value={imageUrlInput}
                          onChange={(e) => setImageUrlInput(e.target.value)}
                          className="flex-1 border rounded px-2 py-1 text-[11px] focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleAddImageUrl}
                          className="bg-black text-white px-2.5 py-1 rounded text-[11px] font-bold"
                        >
                          Áp dụng
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Album ảnh chi tiết (Gallery) */}
                  <div className="border-t pt-3">
                    <label className="block text-gray-800 font-bold mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-purple-600" />
                        2. Album ảnh chi tiết ({galleryImages.length} ảnh)
                      </span>
                      <button
                        type="button"
                        onClick={() => galleryInputRef.current?.click()}
                        className="text-blue-600 hover:underline text-[11px] font-bold"
                      >
                        + Thêm ảnh
                      </button>
                    </label>

                    <input
                      type="file"
                      ref={galleryInputRef}
                      multiple
                      accept="image/*"
                      onChange={handleGalleryUpload}
                      className="hidden"
                    />

                    {galleryImages.length > 0 ? (
                      <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto p-1 bg-gray-50 rounded-lg border">
                        {galleryImages.map((img, idx) => (
                          <div key={idx} className="relative group border rounded-lg bg-white p-1">
                            <img src={img} alt={`Gallery ${idx}`} className="w-full h-14 object-contain" />
                            <button
                              type="button"
                              onClick={() => handleRemoveGalleryImage(idx)}
                              className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold shadow"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div
                        onClick={() => galleryInputRef.current?.click()}
                        className="p-3 border border-dashed rounded-lg text-center text-gray-400 text-[11px] cursor-pointer hover:bg-gray-50"
                      >
                        Bấm để tải thêm ảnh mở hộp, góc cạnh máy...
                      </div>
                    )}
                  </div>
                </div>

                {/* CỘT PHẢI: THÔNG TIN CHI TIẾT & BIẾN THỂ (7 CỘT) */}
                <div className="md:col-span-7 space-y-4">
                  {/* Tên & Hãng */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-gray-700 font-bold mb-1">Tên sản phẩm *</label>
                      <input
                        type="text"
                        required
                        placeholder="VD: iPhone 16 Plus"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded-lg p-2 focus:outline-none focus:border-black font-semibold"
                      />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-gray-700 font-bold mb-1">Hãng sản xuất *</label>
                      <select
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="w-full border rounded-lg p-2 focus:outline-none font-semibold"
                      >
                        <option value="Apple">Apple</option>
                        <option value="Samsung">Samsung</option>
                        <option value="Xiaomi">Xiaomi</option>
                        <option value="OPPO">OPPO</option>
                        <option value="vivo">vivo</option>
                        <option value="realme">realme</option>
                      </select>
                    </div>
                  </div>

                  {/* Giá bán lẻ & Giá niêm yết */}
                  <div className="grid grid-cols-2 gap-3 bg-red-50/50 p-3 rounded-xl border border-red-100">
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">Giá bán thực tế (VNĐ) *</label>
                      <input
                        type="number"
                        required
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-full border rounded-lg p-2 font-bold text-red-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">Giá niêm yết (Gạch ngang)</label>
                      <input
                        type="number"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(Number(e.target.value))}
                        className="w-full border rounded-lg p-2 text-gray-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Biến thể cấu hình ban đầu */}
                  <div className="border-t pt-3 space-y-2">
                    <span className="font-bold text-gray-800 block">Biến thể ban đầu (Màu sắc & Dung lượng):</span>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-[11px] text-gray-500 block">Dung lượng:</label>
                        <select
                          value={storage}
                          onChange={(e) => setStorage(e.target.value)}
                          className="w-full border rounded p-1.5"
                        >
                          <option value="128GB">128GB</option>
                          <option value="256GB">256GB</option>
                          <option value="512GB">512GB</option>
                          <option value="1TB">1TB</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] text-gray-500 block">Tên màu sắc:</label>
                        <input
                          type="text"
                          value={colorName}
                          onChange={(e) => setColorName(e.target.value)}
                          placeholder="Titan Tự Nhiên"
                          className="w-full border rounded p-1.5"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-gray-500 block">Số lượng nhập kho:</label>
                        <input
                          type="number"
                          value={stockQuantity}
                          onChange={(e) => setStockQuantity(Number(e.target.value))}
                          className="w-full border rounded p-1.5 font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Thông số kỹ thuật nhanh */}
                  <div className="border-t pt-3 space-y-2">
                    <span className="font-bold text-gray-800 block">Thông số kỹ thuật chính:</span>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] text-gray-500 block">Màn hình:</label>
                        <input
                          type="text"
                          value={screen}
                          onChange={(e) => setScreen(e.target.value)}
                          className="w-full border rounded p-1.5"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-gray-500 block">Vi xử lý (CPU):</label>
                        <input
                          type="text"
                          value={cpu}
                          onChange={(e) => setCpu(e.target.value)}
                          className="w-full border rounded p-1.5"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-gray-500 block">RAM:</label>
                        <input
                          type="text"
                          value={ram}
                          onChange={(e) => setRam(e.target.value)}
                          className="w-full border rounded p-1.5"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-gray-500 block">Pin & Sạc:</label>
                        <input
                          type="text"
                          value={battery}
                          onChange={(e) => setBattery(e.target.value)}
                          className="w-full border rounded p-1.5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nút bấm Lưu */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-lg text-xs font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg text-xs font-black bg-[#ffd400] text-black hover:bg-[#ecc200] transition shadow-md flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> ĐĂNG BÁN SẢN PHẨM MỚI
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
