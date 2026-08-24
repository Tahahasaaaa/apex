import { useState, useCallback, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import ChatSidebar from "../components/ChatSidebar";
import ChatArea from "../components/ChatArea";
import AiNavPanel from "../components/AiNavPanel";
import { authService } from "../services/authService";
import { planService } from "../services/planService";

const generateId = () => Math.random().toString(36).substring(2, 10);

const AiChat = () => {
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [messagesBySession, setMessagesBySession] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [navPanelOpen, setNavPanelOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({ name: "کاربر", image: null });

  useEffect(() => {
    const syncProfile = () => {
      const saved = localStorage.getItem("userProfile");
      if (saved) {
        try {
          const data = JSON.parse(saved);
          setUserProfile({ name: data.name || "کاربر", image: data.image || null });
        } catch (error) {
          console.error("Error", error);
        }
      }
    };

    syncProfile();
    window.addEventListener("storage", syncProfile);
    return () => window.removeEventListener("storage", syncProfile);
  }, []);

  const handleDeleteSession = useCallback(
    (id) => {
      setSessions((prev) => prev.filter((session) => session.id !== id));
      setMessagesBySession((prev) => {
        const nextMessages = { ...prev };
        delete nextMessages[id];
        return nextMessages;
      });
      if (activeSessionId === id) setActiveSessionId(null);
    },
    [activeSessionId]
  );

  const handleNewChat = useCallback(() => {
    const id = generateId();
    setSessions((prev) => [{ id, title: "گفتگوی جدید", timestamp: new Date() }, ...prev]);
    setActiveSessionId(id);
    setMessagesBySession((prev) => ({ ...prev, [id]: [] }));
  }, []);

  const buildAssistantText = (payload) => {
    if (!payload) return "";
    if (typeof payload === "string") return payload;
    if (payload.message) return payload.message;
    if (payload.detail) return payload.detail;
    if (payload.text) return payload.text;
    if (payload.response) return payload.response;
    return "";
  };

  const handleSendMessage = useCallback(
    async (content) => {
      if (!content.trim()) return;

      let sessionId = activeSessionId;
      if (!sessionId) {
        const id = generateId();
        setSessions((prev) => [{ id, title: `${content.substring(0, 20)}...`, timestamp: new Date() }, ...prev]);
        setActiveSessionId(id);
        setMessagesBySession((prev) => ({ ...prev, [id]: [] }));
        sessionId = id;
      }

      const currentSessionId = sessionId;
      const userMsg = { id: generateId(), role: "user", content, timestamp: new Date() };
      setMessagesBySession((prev) => ({
        ...prev,
        [currentSessionId]: [...(prev[currentSessionId] || []), userMsg],
      }));

      setIsTyping(true);

      try {
        if (!authService.isAuthenticated()) {
          throw new Error("برای استفاده از AI باید وارد شوید.");
        }

        const result = await planService.generatePlan({ prompt: content });
        const reply = buildAssistantText(result) || "پاسخی دریافت شد. در حال آماده‌سازی است.";
        const aiMsg = { id: generateId(), role: "assistant", content: reply, timestamp: new Date() };

        setMessagesBySession((prev) => ({
          ...prev,
          [currentSessionId]: [...(prev[currentSessionId] || []), aiMsg],
        }));
      } catch (error) {
        const aiMsg = {
          id: generateId(),
          role: "assistant",
          content: error.message || "خطا در ارتباط با سرویس AI",
          timestamp: new Date(),
        };
        setMessagesBySession((prev) => ({
          ...prev,
          [currentSessionId]: [...(prev[currentSessionId] || []), aiMsg],
        }));
      } finally {
        setIsTyping(false);
      }
    },
    [activeSessionId]
  );

  const activeMessages = activeSessionId && messagesBySession[activeSessionId] ? messagesBySession[activeSessionId] : [];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0a0a0c] text-white flex-col md:flex-row" dir="ltr">
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>

      <div
        className={`relative flex flex-col transition-all duration-300 border-r border-white/5 bg-[#0a0a0c] ${
          sidebarOpen ? "w-full h-72 md:h-full md:w-72" : "w-full h-16 md:w-20"
        }`}
      >
        <div className="p-4 border-b border-white/5 flex items-center justify-between h-20">
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className={`p-2 text-gray-400 hover:text-[#00f2ea] transition-all hover:bg-white/5 rounded-lg ${!sidebarOpen ? "mx-auto" : ""}`}
          >
            <FaBars size={20} />
          </button>

          {sidebarOpen ? (
            <div className="flex items-center gap-3 flex-row-reverse">
              <div className="w-11 h-11 rounded-full border border-white/10 overflow-hidden shrink-0 shadow-lg">
                {userProfile.image ? (
                  <img src={userProfile.image} className="w-full h-full object-cover" alt="Profile" />
                ) : (
                  <div className="w-full h-full bg-white/5 flex items-center justify-center text-gray-300 font-bold">
                    {userProfile.name?.charAt(0)}
                  </div>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm font-bold truncate text-gray-100">{userProfile.name}</p>
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-2">
          <ChatSidebar
            sessions={sessions}
            activeSessionId={activeSessionId}
            onNewChat={handleNewChat}
            onSelectSession={setActiveSessionId}
            onDeleteSession={handleDeleteSession}
            isOpen={sidebarOpen}
          />
        </div>
      </div>

      <div className="flex-1 relative flex flex-col min-w-0" dir="rtl">
        <ChatArea
          messages={activeMessages}
          onSendMessage={handleSendMessage}
          isTyping={isTyping}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onToggleNavPanel={() => setNavPanelOpen((prev) => !prev)}
        />
      </div>

      <AiNavPanel isOpen={navPanelOpen} onClose={() => setNavPanelOpen(false)} />
    </div>
  );
};

export default AiChat;
