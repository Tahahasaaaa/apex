import { NavLink } from "react-router-dom";
import { authService } from "../services/authService";

const DashboardSidebar = () => {
  const linkBase = "flex items-center gap-3 p-4 rounded-2xl transition-all";
  const active = "bg-[#00f2ea]/10 text-[#00f2ea] font-bold shadow-[0_0_20px_rgba(0,242,234,0.05)]";
  const idle = "text-gray-400 hover:text-white hover:bg-white/5";

  return (
    <aside className="lg:col-span-2 hidden lg:flex flex-col justify-between py-2 border-l border-white/5 pr-2 lg:sticky lg:top-4 h-fit self-start">
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
  );
};

export default DashboardSidebar;
