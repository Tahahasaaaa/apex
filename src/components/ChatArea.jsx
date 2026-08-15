import { useEffect, useRef, useState } from "react";
import { ArrowUp, Menu, User } from "lucide-react";

const ChatArea = ({ messages, onSendMessage, isTyping, onToggleSidebar, onToggleNavPanel }) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    onSendMessage(trimmed);
    setInput("");
  };

  const suggestions = ["کمکم کن برنامه امروزمو بچینم", "برای تمرکز چی کار کنم؟", "یه برنامه شروع سریع بده"];

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0a0a0c] relative">
      <div className="relative flex items-center justify-center h-14 px-4 border-b border-white/5">
        <button
          onClick={onToggleSidebar}
          className="absolute left-4 p-2 text-gray-400 hover:text-[#00f2ea] md:hidden rounded-lg"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
        <span className="font-semibold text-white">Apex</span>
        <button
          type="button"
          onClick={onToggleNavPanel}
          className="absolute right-4 p-2 text-gray-400 hover:text-[#00f2ea] rounded-lg hover:bg-white/5 transition-colors"
          aria-label="باز کردن منوی پنل"
        >
          <Menu size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h2 className="text-3xl font-bold text-white mb-6">چطور می‌تونم کمکت کنم؟</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => onSendMessage(suggestion)}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "flex-row-reverse gap-4" : "justify-start"}`}>
                {msg.role === "user" ? (
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#00f2ea]/20 text-[#00f2ea]">
                    <User size={16} />
                  </div>
                ) : null}

                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.role === "user" ? "bg-[#00f2ea] text-black" : "bg-white/5 text-gray-200"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping ? (
              <div className="max-w-3xl">
                <div className="inline-block rounded-2xl bg-white/5 text-gray-300 px-4 py-3 text-sm">در حال فکر کردن...</div>
              </div>
            ) : null}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="max-w-3xl mx-auto relative">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && handleSubmit()}
            placeholder="پیام خودت را بنویس..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-[#00f2ea] transition-all"
          />
          <button
            onClick={handleSubmit}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-xl flex items-center justify-center text-black hover:bg-gray-200"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
