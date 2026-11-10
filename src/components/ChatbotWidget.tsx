'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  ChevronDown, 
  RotateCcw, 
  MessageSquare,
  ShieldAlert
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  '🔥 Tư vấn iPhone 16 Pro Max',
  '💰 Điện thoại dưới 10 triệu',
  '💻 Laptop văn phòng mỏng nhẹ',
  '💳 Hướng dẫn mua trả góp 0%',
  '🛡️ Chính sách bảo hành máy',
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: 'Dạ, em chào Anh/Chị! Em là Trợ lý AI của KikiMobile. Em có thể hỗ trợ Anh/Chị tìm mẫu Điện thoại, Laptop phù hợp ngân sách, hướng dẫn Mua Trả Góp 0% hoặc tra cứu bảo hành máy. Anh/Chị đang quan tâm đến sản phẩm nào ạ?',
      timestamp: 'Vừa xong',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Chuẩn bị lịch sử gửi lên API
      const historyPayload = messages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        content: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          history: historyPayload,
        }),
      });

      const data = await res.json();
      const botReply = data.reply || 'Dạ, em xin lỗi hiện đường truyền đang bận một chút ạ.';

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'bot',
        text: 'Dạ, em chưa kết nối được máy chủ AI. Anh/Chị vui lòng gửi lại câu hỏi hoặc gọi tổng đài miễn phí 1800.1060 để được hỗ trợ ngay nhé!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* 1. NÚT NỔI MỞ CHATBOT (GÓC DƯỚI BÊN PHẢI) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 bg-black hover:bg-neutral-800 text-white pl-4 pr-5 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-[#ffd400]"
          aria-label="Mở Chatbot AI Tư Vấn"
        >
          {/* Vòng sáng nhấp nháy */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-yellow-500"></span>
          </span>

          <div className="w-8 h-8 rounded-full bg-[#ffd400] text-black flex items-center justify-center font-black text-base shadow">
            ⚡
          </div>
          <div className="text-left leading-tight">
            <div className="text-[11px] font-extrabold text-[#ffd400] flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> TRỢ LÝ AI KIKIMOBILE
            </div>
            <div className="text-[10px] text-gray-300 font-semibold">Tư vấn chọn máy 24/7</div>
          </div>
        </button>
      )}

      {/* 2. CỬA SỔ HỘI THOẠI CHATBOT */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-300 w-[90vw] sm:w-96 h-[540px] max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Header Cửa sổ Chat */}
          <div className="bg-[#1e232a] text-white p-3.5 flex items-center justify-between border-b border-gray-800">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[#ffd400] text-black flex items-center justify-center font-black text-lg shadow">
                  ⚡
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#1e232a]"></span>
              </div>
              <div>
                <h3 className="font-extrabold text-xs text-white flex items-center gap-1.5">
                  <span>KIKIMOBILE AI ASSISTANT</span>
                  <span className="bg-[#ffd400] text-black text-[9px] font-black px-1.5 py-0.2 rounded">Gemini</span>
                </h3>
                <p className="text-[10px] text-gray-400">Trợ lý tư vấn sản phẩm & trả góp chính hãng</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-gray-400">
              <button
                onClick={() => setIsOpen(false)}
                className="hover:text-white p-1 rounded-lg transition"
                title="Thu nhỏ"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body: Danh sách tin nhắn */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-[#f8f9fa] text-xs">
            {/* Banner bảo mật nhỏ */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 text-[10px] text-yellow-800 flex items-start gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <span>
                Trợ lý AI chỉ tư vấn sản phẩm, giá bán, khuyến mãi và trả góp tại KikiMobile. Không hỗ trợ mật khẩu hoặc thông tin quản trị.
              </span>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-[#ffd400] text-black flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                    ⚡
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 space-y-1 shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-black text-white rounded-br-xs'
                      : 'bg-white text-gray-900 border border-gray-200 rounded-bl-xs'
                  }`}
                >
                  <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>
                  <div
                    className={`text-[9px] text-right ${
                      msg.sender === 'user' ? 'text-gray-400' : 'text-gray-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {/* Trạng thái đang gõ */}
            {isLoading && (
              <div className="flex gap-2 justify-start items-center text-gray-400 text-xs">
                <div className="w-6 h-6 rounded-full bg-[#ffd400] text-black flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                  ⚡
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl px-3 py-2 flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-[10px] text-gray-500 ml-1">Đang suy nghĩ câu trả lời...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Nút câu hỏi gợi ý nhanh */}
          <div className="bg-white border-t border-gray-100 p-2 overflow-x-auto scrollbar-none flex gap-1.5 flex-shrink-0">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="bg-gray-100 hover:bg-yellow-100 hover:text-black text-gray-700 text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap transition border border-gray-200 flex-shrink-0 disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Footer: Ô nhập câu hỏi */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 bg-white border-t border-gray-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder="Hỏi về máy, giá bán, trả góp 0%..."
              className="flex-1 bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-black transition disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-[#ffd400] hover:bg-[#ecc200] text-black p-2.5 rounded-xl transition font-bold disabled:opacity-40 disabled:hover:bg-[#ffd400]"
              aria-label="Gửi câu hỏi"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
