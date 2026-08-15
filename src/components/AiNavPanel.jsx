import { NavLink } from "react-router-dom";
import { Bot, ClipboardList, LayoutDashboard, Target, TrendingUp, UserRound, X } from "lucide-react";

const AiNavPanel = ({ isOpen, onClose }) => {
  const linkBase = "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors";
  const active = "bg-[#00f2ea]/12 text-[#00f2ea] border border-[#00f2ea]/35";
  const idle = "text-gray-300 border border-transparent hover:border-white/10 hover:bg-white/5";

  return (
    <>
      <button
        type="button"
        onClick={onClose}
        aria-label="بستن منوی پنل"
        className={`absolute inset-0 z-20 bg-black/35 backdrop-blur-[1px] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        className={`absolute top-0 right-0 z-30 h-full w-[300px] max-w-[85vw] border-l border-white/10 bg-[#0a0a0c] p-4 shadow-[-18px_0_50px_rgba(0,0,0,0.35)] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        dir="rtl"
      >
        <div className="flex h-full flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-[#00f2ea] text-black flex items-center justify-center font-black">Z</div>
                <p className="text-sm font-black text-white">پنل سریع</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="h-9 w-9 rounded-lg border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                aria-label="بستن"
              >
                <X size={16} className="mx-auto" />
              </button>
            </div>

            <nav className="space-y-2">
              <NavLink to="/dashboard" onClick={onClose} className={({ isActive }) => `${linkBase} ${isActive ? active : idle}`}>
                <LayoutDashboard size={16} />
                داشبورد
              </NavLink>
              <NavLink to="/goals" onClick={onClose} className={({ isActive }) => `${linkBase} ${isActive ? active : idle}`}>
                <Target size={16} />
                اهداف
              </NavLink>
              <NavLink to="/tasks" onClick={onClose} className={({ isActive }) => `${linkBase} ${isActive ? active : idle}`}>
                <ClipboardList size={16} />
                چک‌لیست
              </NavLink>
              <NavLink to="/profile" onClick={onClose} className={({ isActive }) => `${linkBase} ${isActive ? active : idle}`}>
                <UserRound size={16} />
                پروفایل
              </NavLink>
              <NavLink to="/growth" onClick={onClose} className={({ isActive }) => `${linkBase} ${isActive ? active : idle}`}>
                <TrendingUp size={16} />
                تحلیل رشد
              </NavLink>
              <NavLink to="/ai" onClick={onClose} className={({ isActive }) => `${linkBase} ${isActive ? active : idle}`}>
                <Bot size={16} />
                صفحه AI
              </NavLink>
            </nav>
          </div>

          <p className="px-1 text-[11px] text-gray-500">دسترسی سریع به صفحات پنل</p>
        </div>
      </aside>
    </>
  );
};

export default AiNavPanel;
