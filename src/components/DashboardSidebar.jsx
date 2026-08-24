import { useState } from "react";
import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { authService } from "../services/authService";
import AiNavPanel from "./AiNavPanel";

const DashboardSidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const linkBase = "flex items-center gap-3 p-4 rounded-2xl transition-all";
  const active = "bg-[#00f2ea]/10 text-[#00f2ea] font-bold shadow-[0_0_20px_rgba(0,242,234,0.05)]";
  const idle = "text-gray-400 hover:text-white hover:bg-white/5";

  return (
    <>
      {/* Mobile menu button (visible on small screens) */}
      <div className="lg:hidden fixed right-4 top-4 z-40">
        <button
          type="button"
          aria-label="باز کردن منوی پنل"
          onClick={() => setMobileOpen(true)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#0d121d]/90 text-gray-200 shadow-[0_0_25px_rgba(0,0,0,0.35)] transition-all hover:bg-white/10 hover:text-[#00f2ea]"
        >
          <Menu size={20} />
        </button>
      </div>

      <AiNavPanel isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <aside className="hidden lg:col-span-2 lg:flex lg:flex-col lg:justify-between lg:py-2 lg:border-l lg:border-white/5 lg:pr-2 lg:sticky lg:top-4 lg:h-fit lg:self-start">
        <div className="space-y-8">
          <div className="flex items-center gap-2 mb-8 px-1">
            <div className="w-8 h-8 bg-[#00f2ea] rounded-lg shadow-[0_0_15px_rgba(0,242,234,0.4)] flex items-center justify-center text-black font-bold">
              A
            </div>
            <span className="text-xl font-black italic ltr">Apex</span>
          </div>

          <nav className="space-y-1.5">
            <NavLink to="/dashboard" className={({ isActive }) => `${linkBase} ${isActive ? active : idle}`}>
              <span>🏠</span> داشبورد
            </NavLink>
            <NavLink to="/goals" className={({ isActive }) => `${linkBase} ${isActive ? active : idle}`}>
              <span>🎯</span> اهداف
            </NavLink>
            <NavLink to="/tasks" className={({ isActive }) => `${linkBase} ${isActive ? active : idle}`}>
              <span>📋</span> چک‌لیست
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => `${linkBase} ${isActive ? active : idle}`}>
              <span>👤</span> پروفایل
            </NavLink>
            <NavLink to="/growth" className={({ isActive }) => `${linkBase} ${isActive ? active : idle}`}>
              <span>📈</span> تحلیل رشد
            </NavLink>
            <NavLink to="/ai" className={({ isActive }) => `${linkBase} ${isActive ? active : idle}`}>
              <span>🤖</span> استفاده از AI
            </NavLink>
          </nav>
        </div>

        <div className="space-y-4 px-2">
          <div className="flex items-center gap-3 text-gray-500 hover:text-white cursor-pointer py-2 transition-all">
            <span>⚙️</span> تنظیمات
          </div>
          <button
            type="button"
            onClick={() => {
              authService.logout();
              window.location.href = "/";
            }}
            className="flex items-center gap-3 text-red-400/70 hover:text-red-400 cursor-pointer py-2 transition-all text-sm font-bold w-full text-right"
          >
            <span>↪</span> خروج از پنل
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
