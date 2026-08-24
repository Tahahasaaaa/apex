import { useEffect, useRef, useState } from "react";
import { ArrowUp, Menu, User } from "lucide-react";

const ChatArea = ({ messages, onSendMessage, isTyping, onToggleNavPanel }) => {
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
    <div className="flex-1 flex flex-col h-full bg-[#0a0a0c] relative min-w-0">
      <div className="relative flex items-center justify-center h-14 px-4 border-b border-white/5">
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

      <div className="flex-1 overflow-y-auto p-3 sm:p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">چطور می‌تونم کمکت کنم؟</h2>
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
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#00f2ea]/20 text-[#00f2ea] shrink-0">
                    <User size={16} />
                  </div>
                ) : null}

                <div
                  className={`max-w-[85%] sm:max-w-[80%] p-3 sm:p-4 rounded-2xl break-words ${
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

      <div className="p-3 sm:p-4 border-t border-white/5">
        <div className="max-w-3xl mx-auto flex items-end gap-2 sm:gap-3">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="پیام خودت را بنویس..."
            rows={1}
            className="min-h-[52px] max-h-32 w-full resize-none overflow-y-auto bg-white/5 border border-white/10 rounded-2xl py-3 pl-4 pr-4 text-white outline-none focus:border-[#00f2ea] transition-all placeholder:text-gray-400"
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-[#00f2ea] text-black shadow-[0_0_20px_rgba(0,242,234,0.3)] hover:brightness-110 transition-all disabled:opacity-50"
            aria-label="ارسال پیام"
            disabled={!input.trim()}
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
