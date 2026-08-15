import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";
import GoalCard from "../components/GoalCard";
import ProfileDropdown from "./ProfileDropdown";

const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null); // رفرنس برای تشخیص کلیک بیرون

  // ۱. مدیریت اسکرول
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ۲. مدیریت کلیک به بیرون (بسته شدن منو)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ۳. توابع کمکی پروفایل
  const getInitials = (name) => {
    if (!name) return "??";
    const parts = name.trim().split(" ");
    return parts.length >= 2 ? parts[0][0] + parts[1][0] : name.slice(0, 2);
  };

  const savedProfile = JSON.parse(localStorage.getItem("userProfile") || "{}");
  const userImage = savedProfile.image;
  const userName = savedProfile.name || "کاربر";

  return (
    <div className="min-h-screen bg-[#020608] text-white font-vazir relative overflow-x-hidden selection:bg-[#00f2ea]/30" dir="rtl">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#00f2ea]/10 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#ff9d42]/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10">
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 px-8 py-6 ${scrolled ? "bg-[#020608]/80 backdrop-blur-xl py-4 border-b border-white/5" : ""}`}>
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-[#00f2ea] p-1.5 rounded-lg text-black shadow-[0_0_20px_rgba(0,242,234,0.4)]">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tighter ltr">Apex</span>
              
              {/* بخش ناوبری (Navbar) - رفرنس در اینجا اضافه شد */}
              <div className="flex items-center gap-4">
                <div className="relative flex items-center" ref={dropdownRef}>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDropdown(!showDropdown);
                    }}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-300 p-0.5 overflow-hidden ${
                      showDropdown ? 'border-[#00f2ea] scale-110 shadow-[0_0_15px_rgba(0,242,234,0.5)]' : 'border-[#00f2ea]/30'
                    }`}
                  >
                    {(() => {
                      const saved = JSON.parse(localStorage.getItem("userProfile") || "{}");
                      if (saved.image) {
                        return <img src={saved.image} alt="profile" className="w-full h-full rounded-full object-cover" />;
                      }
                      const name = saved.name || "کاربر";
                      const initials = name.trim().split(" ").length >= 2 
                        ? name.trim().split(" ")[0][0] + name.trim().split(" ")[1][0]
                        : name.slice(0, 2);
                        
                      return (
                        <div className="w-full h-full bg-gradient-to-br from-[#00f2ea] to-[#00c2ff] rounded-full flex items-center justify-center text-[10px] font-black text-black uppercase">
                          {initials}
                        </div>
                      );
                    })()}
                  </button>

                  {showDropdown && (
                    <div className="absolute top-full left-0 mt-2 z-[100]">
                       <ProfileDropdown />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="hidden md:flex gap-10 text-gray-400 font-medium text-sm">
              <a href="#features" className="hover:text-white transition-colors">امکانات</a>
              <a href="#pricing" className="hover:text-white transition-colors">قیمت‌ها</a>
              <a href="#" className="hover:text-white transition-colors">درباره ما</a>
            </div>
            <Link to="/dashboard" className="bg-white text-black font-black px-8 py-3 rounded-full hover:bg-[#00f2ea] hover:shadow-[0_0_30px_rgba(0,242,234,0.5)] transition-all transform active:scale-95 text-sm">
              ورود به پنل
            </Link>
          </div>
        </nav>

        <main className="flex flex-col items-center text-center pt-48 pb-32 px-4">
          <div className="mb-8 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-bold text-[#00f2ea] animate-bounce">
            پلتفرم هوشمند مدیریت اهداف با Apex          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-10 leading-[1.1] tracking-tight">
            مرزهای پتانسیل خود را <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ea] to-[#00c2ff]">جا‌به‌جا کنید</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mb-12 leading-relaxed font-medium">
            با قدرت هوش مصنوعی Apex، برنامه‌ای کاملاً اختصاصی برای رشد فردی، سلامتی و مهارت‌های خود داشته باشید.
          </p>
          <div className="flex flex-col md:flex-row gap-6">
            <Link to="/dashboard" className="bg-[#00f2ea] text-black font-black px-12 py-5 rounded-2xl text-xl shadow-[0_20px_50px_rgba(0,242,234,0.3)] hover:scale-105 transition-all">
              رایگان شروع کنید
            </Link>
            <button className="px-12 py-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md font-bold hover:bg-white/10 transition-all">
              مشاهده دمو
            </button>
          </div>
        </main>

        <section id="features" className="max-w-7xl mx-auto px-8 py-32 border-t border-white/5" dir="rtl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              ویژگی‌های <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ea] to-[#00c2ff]">قدرتمند</span>
            </h2>
            <p className="text-gray-500 text-lg">ابزارهایی که کمکت می‌کنن به اهدافت برسی و هر روز بهتر از دیروز باشی</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon="🧠" title="تحلیل شخصیت هوشمند" desc="با پاسخ به چند سوال ساده، پروفایل شخصیتی منحصر به‌فردت ساخته می‌شود." iconBg="bg-[#00f2ea]" hoverColor="hover:bg-[#00f2ea]/5 hover:border-[#00f2ea]/40" />
            <FeatureCard icon="🗓" title="برنامه‌ریزی شخصی‌سازی شده" desc="برنامه روزانه و هفتگی متناسب با سبک زندگی و اهدافت دریافت کن." iconBg="bg-[#ff7e42]" hoverColor="hover:bg-[#ff7e42]/5 hover:border-[#ff7e42]/40" isHighlighted={true} />
            <FeatureCard icon="✅" title="چک‌لیست روزانه" desc="تسک‌هات رو کامل کن و مثل یک بازی، پیشرفتت رو ببین." iconBg="bg-[#22c55e]" hoverColor="hover:bg-[#22c55e]/5 hover:border-[#22c55e]/40" />
            <FeatureCard icon="📈" title="تحلیل پیشرفت" desc="نمودارها و گزارش‌های بصری از رشدت در طول زمان." iconBg="bg-[#a855f7]" hoverColor="hover:bg-[#a855f7]/5 hover:border-[#a855f7]/40" />
            <FeatureCard icon="⚡" title="کوچ تطبیق‌پذیر" desc="هوش مصنوعی بر اساس عملکردت، برنامه‌ها رو بهینه می‌کنه." iconBg="bg-[#eab308]" hoverColor="hover:bg-[#eab308]/5 hover:border-[#eab308]/40" />
            <FeatureCard icon="📥" title="خروجی حرفه‌ای" desc="دانلود کن و آفلاین استفاده کن. PDF برنامه‌هات رو حرفه‌ای داشته باش." iconBg="bg-[#f43f5e]" hoverColor="hover:bg-[#f43f5e]/5 hover:border-[#f43f5e]/40" />
          </div>
        </section>

        <section id="pricing" className="max-w-7xl mx-auto px-8 py-24 border-t border-white/5" dir="rtl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4">طرح‌های هوشمند</h2>
            <p className="text-gray-500 text-lg">طرحی را انتخاب کن و مسیر رشدت را سریع‌تر کن</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0d121d] border border-white/5 rounded-[2rem] p-8 text-center">
              <p className="text-sm text-gray-500">استاندارد</p>
              <p className="text-3xl font-black my-4">۰</p>
              <p className="text-xs text-gray-500">برای شروع و تجربه اولیه</p>
            </div>
            <div className="bg-[#0d121d] border border-[#00f2ea]/40 rounded-[2rem] p-8 text-center shadow-[0_0_30px_rgba(0,242,234,0.1)]">
              <p className="text-sm text-gray-500">پرو</p>
              <p className="text-3xl font-black my-4 ltr">19$</p>
              <p className="text-xs text-gray-500">همه امکانات هوشمند</p>
            </div>
            <div className="bg-[#0d121d] border border-white/5 rounded-[2rem] p-8 text-center">
              <p className="text-sm text-gray-500">تیمی</p>
              <p className="text-3xl font-black my-4 ltr">69$</p>
              <p className="text-xs text-gray-500">مناسب برای تیم‌های کوچک</p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-8 py-24 relative" dir="rtl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              برای هر <span className="text-[#00f2ea]">هدفی</span> آماده‌ایم
            </h2>
            <p className="text-gray-500 text-lg">هر مسیری که انتخاب کنی، ما کنارتیم تا بهش برسی</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GoalCard icon="📚" title="بهبود تحصیلی" desc="برنامه‌ریزی درسی، تمرکز بیشتر، آمادگی امتحان" activeColor="hover:border-blue-500/50 hover:bg-blue-500/5" iconBg="bg-cyan-500" />
            <GoalCard icon="</>" title="یادگیری مهارت" desc="برنامه‌نویسی، زبان جدید، مهارت‌های دیجیتال" activeColor="hover:border-purple-500/50 hover:bg-purple-500/5" iconBg="bg-purple-500" />
            <GoalCard icon="💪" title="ورزش و سلامت" desc="تناسب اندام، ورزش منظم، زندگی سالم" activeColor="hover:border-green-500/50 hover:bg-green-500/5" iconBg="bg-green-500" isHighlighted={true} />
            <GoalCard icon="👥" title="مهارت‌های اجتماعی" desc="اعتماد به نفس، ارتباط موثر، رهبری" activeColor="hover:border-orange-500/50 hover:bg-orange-500/5" iconBg="bg-orange-500" />
            <GoalCard icon="❤️" title="توسعه فردی" desc="خودشناسی، مدیریت استرس، نظم شخصی" activeColor="hover:border-pink-500/50 hover:bg-pink-500/5" iconBg="bg-pink-500" />
            <GoalCard icon="🎨" title="هنر و خلاقیت" desc="نقاشی، موسیقی، نویسندگی، طراحی" activeColor="hover:border-indigo-500/50 hover:bg-indigo-500/5" iconBg="bg-indigo-500" />
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-8 py-32 relative overflow-hidden" dir="rtl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00f2ea]/10 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 mb-10 rounded-[2rem] bg-gradient-to-br from-[#00f2ea] to-[#ff9d42] p-[1px] shadow-[0_0_40px_rgba(0,242,234,0.3)]">
              <div className="w-full h-full bg-[#080c14] rounded-[2rem] flex items-center justify-center text-3xl">✨</div>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">آماده‌ای <span className="text-[#00f2ea]">نسخه بهتر</span> خودت بشی؟</h2>
            <p className="text-gray-400 text-lg max-w-2xl mb-12 leading-relaxed">همین الان رایگان شروع کن و ببین چطور هوش مصنوعی می‌تونه کمکت کنه به اهدافت برسی</p>
            <Link to="/dashboard" className="group relative px-12 py-5 bg-[#00f2ea] text-black font-black text-xl rounded-full shadow-[0_20px_40px_rgba(0,242,234,0.3)] hover:shadow-[0_25px_50px_rgba(0,242,234,0.5)] transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-3">
              شروع سفر رشد <span className="group-hover:translate-x-[-5px] transition-transform">←</span>
            </Link>
          </div>
        </section>

        <footer className="w-full max-w-7xl mx-auto px-8 py-20 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-2">
              <div className="bg-[#00f2ea] p-2 rounded-xl text-black shadow-lg">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-2xl font-black font-vazir ltr">Apex</span>
            </div>
            <div className="flex gap-10 text-gray-500 font-bold text-sm">
              <a href="#" className="hover:text-white transition-all">اینستاگرام</a>
              <a href="#" className="hover:text-white transition-all">تلگرام</a>
              <a href="#" className="hover:text-white transition-all">لینکدین</a>
            </div>
          </div>
          <p className="mt-12 text-center text-gray-600 text-[10px] tracking-widest" dir="ltr">© 2026 Apex. ALL RIGHTS RESERVED.</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
