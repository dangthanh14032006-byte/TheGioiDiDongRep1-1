import type { Metadata } from 'next';
import './globals.css';
import ChatbotWidget from '@/components/ChatbotWidget';

export const metadata: Metadata = {
  title: 'KikiMobile.com - Điện thoại, Laptop, Phụ kiện chính hãng',
  description: 'Hệ thống bán lẻ điện thoại, laptop, phụ kiện, đồng hồ chính hãng giá tốt nhất tại KikiMobile, trả góp 0%, giao hàng 2h, bảo hành 1 đổi 1.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col bg-[#f4f4f4] antialiased">
        {children}
        <ChatbotWidget />
      </body>
    </html>
  );
}
