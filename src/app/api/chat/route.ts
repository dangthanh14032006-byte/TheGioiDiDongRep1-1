import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_INSTRUCTION = `
Bạn là "TGDD Smart Assistant" - Chuyên viên tư vấn khách hàng ảo thông minh, thân thiện và tận tâm của chuỗi siêu thị Thế Giới Di Động (thegioididong.com).

QUY TẮC BẢO MẬT & GIỚI HẠN PHẠM VI (BẮT BUỘC TUÂN THỦ TUYỆT ĐỐI):
1. TUYỆT ĐỐI KHÔNG BAO GIỜ trả lời, hướng dẫn, gợi ý, xác nhận hoặc tiết lộ bất kỳ thông tin nào liên quan đến:
   - Quản trị viên (Admin), tài khoản quản lý, mật khẩu, đăng nhập nội bộ, phân quyền nhân sự.
   - Cơ sở dữ liệu (Database), API Key, mã nguồn, máy chủ hoặc cấu hình kỹ thuật của website.
   - Cách hack, bypass bảo mật, lấy lại mật khẩu quản trị.
2. TUYỆT ĐỐI KHÔNG BAO GIỜ đề cập, so sánh, giới thiệu hoặc quảng bá về các website khác hoặc đối thủ cạnh tranh (như FPT Shop, CellphoneS, Shopee, Lazada, Tiki, v.v.). Bạn chỉ đại diện độc quyền cho Thế Giới Di Động.
3. NẾU KHÁCH HÀNG HỎI về mật khẩu, tài khoản quản lý, website khác hoặc các vấn đề nằm ngoài sản phẩm/dịch vụ của Thế Giới Di Động, bạn BẮT BUỘC từ chối lịch sự:
   "Dạ, em là Trợ lý tư vấn bán hàng của Thế Giới Di Động ạ. Em chỉ hỗ trợ tư vấn thông tin sản phẩm (Điện thoại, Laptop, Tablet, Phụ kiện, Smartwatch) và chính sách mua sắm, trả góp, bảo hành tại chuỗi siêu thị. Em không được phép cung cấp thông tin liên quan đến quản lý hệ thống, mật khẩu hay các trang web khác ạ. Anh/Chị cần em hỗ trợ tư vấn mẫu máy nào phù hợp với nhu cầu không ạ?"

VAI TRÒ & DỊCH VỤ HỖ TRỢ:
1. Tư vấn chi tiết các thiết bị công nghệ:
   - Điện thoại: iPhone 16 Pro Max, iPhone 15, Samsung Galaxy S24 Ultra, Galaxy A55, Xiaomi 14, Redmi Note 13 Pro, OPPO Reno12...
   - Laptop: MacBook Air M3, ASUS TUF Gaming F15 RTX 4060, Dell Inspiron 15, HP Pavilion...
   - Tablet: iPad Pro M4, Galaxy Tab S9 FE 5G...
   - Phụ kiện & Smartwatch: AirPods Pro 2, Sạc nhanh, Pin dự phòng Anker, Apple Watch Series 9, Galaxy Watch 6...
2. Hướng dẫn chính sách của Thế Giới Di Động:
   - Trả góp 0% lãi suất: Duyệt hồ sơ online chỉ cần CCCD gắn chip trong 10-15 phút qua Home Credit / FE Credit.
   - Bảo hành chính hãng: Hư gì đổi nấy 1 đổi 1 trong 30 ngày nếu lỗi NSX. Quản lý và tra cứu bảo hành điện tử theo số IMEI 15 chữ số tại hơn 3000 siêu thị toàn quốc.
   - Thanh toán & Giao hàng: Giao hàng miễn phí toàn quốc (2 giờ tại nội thành), thanh toán tiền mặt COD hoặc quét mã VietQR tự động.
3. Phong cách nói chuyện:
   - Dạ/thưa lịch sự, xưng "em", gọi khách là "Anh/Chị".
   - Ngắn gọn, súc tích, định dạng gạch đầu dòng rõ ràng.
`;

// Danh sách từ khóa cấm liên quan đến quản lý mật khẩu, admin hoặc web khác
const FORBIDDEN_KEYWORDS = [
  'mật khẩu', 'mat khau', 'password', 'pass admin', 'tài khoản admin', 'tai khoan admin',
  'quản trị viên', 'quan tri vien', 'login admin', 'hack', 'database', 'cơ sở dữ liệu',
  'fpt shop', 'cellphones', 'shopee', 'lazada', 'tiki', 'hoang ha mobile', 'viettel store'
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Nội dung tin nhắn không hợp lệ' }, { status: 400 });
    }

    const lowerMsg = message.toLowerCase();

    // 1. Kiểm tra Guardrail ngay ở lớp API: Chặn câu hỏi về mật khẩu, admin hoặc web khác
    const containsForbidden = FORBIDDEN_KEYWORDS.some((kw) => lowerMsg.includes(kw));
    if (containsForbidden) {
      return NextResponse.json({
        reply: 'Dạ, em là Trợ lý tư vấn bán hàng của Thế Giới Di Động ạ. Em chỉ hỗ trợ tư vấn các thiết bị công nghệ (Điện thoại, Laptop, Tablet, Phụ kiện, Smartwatch) và chính sách mua sắm, trả góp, bảo hành tại chuỗi siêu thị. Em không được phép cung cấp thông tin liên quan đến quản trị hệ thống, mật khẩu hay các trang web khác ạ. Anh/Chị có cần em hỗ trợ tư vấn mẫu máy nào phù hợp với nhu cầu không ạ?'
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // 2. Nếu có GEMINI_API_KEY: Gọi Google Gemini API với danh sách mô hình dự phòng
    if (apiKey) {
      const genAI = new GoogleGenerativeAI(apiKey);
      const candidateModels = [
        'gemini-3.5-flash-lite',
        'gemini-3.6-flash',
        'gemini-3-flash-preview',
        'gemini-3.5-flash'
      ];

      const formattedHistory = Array.isArray(history)
        ? history.slice(-6).map((item: any) => ({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text: item.content || '' }],
          }))
        : [];

      for (const modelName of candidateModels) {
        try {
          const model = genAI.getGenerativeModel({
            model: modelName,
            systemInstruction: SYSTEM_INSTRUCTION,
          });

          const chat = model.startChat({
            history: formattedHistory,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 600,
            },
          });

          const result = await chat.sendMessage(message);
          const text = result.response.text();
          if (text) {
            return NextResponse.json({ reply: text });
          }
        } catch (geminiError: any) {
          console.warn(`Model ${modelName} gặp sự cố, thử model tiếp theo:`, geminiError?.message?.slice(0, 100));
        }
      }
    }

    // 3. Fallback tư vấn thông minh (khi chưa nhập GEMINI_API_KEY hoặc mất kết nối API)
    let fallbackReply = '';
    if (lowerMsg.includes('iphone 16') || lowerMsg.includes('16 pro max')) {
      fallbackReply = 'Dạ, iPhone 16 Pro Max 256GB bên em đang có giá ưu đãi chỉ 32.490.000₫ (giảm từ 34.990.000₫) ạ! Máy có thiết kế titan siêu bền, chip Apple A18 Pro và nút Camera Control mới nhất. Đặc biệt đang hỗ trợ Mua Trả Góp 0% lãi suất qua CCCD duyệt trong 15 phút. Anh/Chị có muốn xem chi tiết phiên bản màu Titan Sa Mạc không ạ?';
    } else if (lowerMsg.includes('samsung') || lowerMsg.includes('s24')) {
      fallbackReply = 'Dạ, dòng Samsung Galaxy S24 Ultra 5G bên em đang có chương trình giảm sốc 5.000.000₫, giá chỉ còn 28.990.000₫ ạ! Máy nổi bật với quyền năng Galaxy AI phiên dịch trực tiếp, camera 200MP và có sẵn bút S-Pen bên trong thân máy. Ngoài ra dòng tầm trung có Galaxy A55 5G giá chỉ 8.790.000₫ rất đáng mua ạ!';
    } else if (lowerMsg.includes('laptop') || lowerMsg.includes('macbook')) {
      fallbackReply = 'Dạ, bên em có đầy đủ các dòng Laptop phục vụ mọi nhu cầu:\n- Văn phòng, mỏng nhẹ: MacBook Air M3 (giá từ 34.490.000₫) hoặc Dell Inspiron 15 (15.490.000₫).\n- Chơi game, đồ họa: ASUS TUF Gaming F15 (Intel i7, RTX 4060 giá 26.990.000₫).\nTất cả Laptop đều được tặng balo chính hãng và hỗ trợ trả góp 0% lãi suất ạ!';
    } else if (lowerMsg.includes('trả góp') || lowerMsg.includes('tra gop')) {
      fallbackReply = 'Dạ, thủ tục mua Trả Góp 0% tại Thế Giới Di Động cực kỳ nhanh chóng ạ:\n- Chỉ cần CCCD gắn chip (từ 18 tuổi trở lên).\n- Không cần chứng minh thu nhập, không giữ giấy tờ gốc.\n- Hỗ trợ trả trước từ 0đ đến 50%, thời hạn 6 - 12 tháng.\n- Duyệt hồ sơ online chỉ trong 10-15 phút là nhận máy ngay ạ!';
    } else if (lowerMsg.includes('bảo hành') || lowerMsg.includes('bao hanh') || lowerMsg.includes('imei')) {
      fallbackReply = 'Dạ, chính sách bảo hành của Thế Giới Di Động luôn đặt quyền lợi của khách hàng lên hàng đầu:\n- Hư gì đổi nấy 1 đổi 1 trong 30 ngày đầu tiên nếu có lỗi từ nhà sản xuất.\n- Bảo hành chính hãng 12 - 24 tháng theo số IMEI điện tử tại hơn 3.000 siêu thị trên toàn quốc mà không cần giữ lại hóa đơn giấy.\n- Anh/Chị có thể bấm vào mục "Bảo hành IMEI" trên website để tra cứu bất cứ lúc nào ạ!';
    } else if (lowerMsg.includes('dưới 10 triệu') || lowerMsg.includes('giá rẻ') || lowerMsg.includes('chơi game')) {
      fallbackReply = 'Dạ, trong tầm giá dưới 10 triệu phục vụ chơi game và chụp ảnh đẹp, em đề xuất 2 mẫu đang bán chạy nhất bên em:\n1. Samsung Galaxy A55 5G (8.790.000₫): Màn hình Super AMOLED 120Hz mượt mà, khung kim loại cao cấp và chống nước IP67.\n2. Xiaomi Redmi Note 13 Pro (6.490.000₫): Camera 200MP siêu nét, sạc nhanh 67W đầy pin chỉ trong 40 phút.\nAnh/Chị muốn tham khảo kỹ hơn về mẫu nào ạ?';
    } else {
      fallbackReply = 'Dạ, em chào Anh/Chị! Em là trợ lý tư vấn bán hàng của Thế Giới Di Động. Em có thể hỗ trợ Anh/Chị tìm kiếm các mẫu Điện thoại, Laptop, Tablet, Phụ kiện phù hợp ngân sách, hướng dẫn Mua trả góp 0% hoặc kiểm tra thông tin bảo hành máy. Anh/Chị đang quan tâm đến sản phẩm nào ạ?';
    }

    return NextResponse.json({ reply: fallbackReply });
  } catch (err: any) {
    return NextResponse.json({
      reply: 'Dạ, hiện tại đường truyền đang bận một chút. Anh/Chị vui lòng nhắn lại câu hỏi hoặc gọi tổng đài miễn phí 1800.1060 để được nhân viên siêu thị hỗ trợ ngay nhé!'
    });
  }
}
