import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#080c14] text-white font-vazir flex items-center justify-center p-6" dir="rtl">
      <style>{`
        @keyframes floatY { 0% { transform: translateY(0) } 50% { transform: translateY(-10px) } 100% { transform: translateY(0) } }
        @keyframes slow-rotate { 0% { transform: rotate(0deg) } 100% { transform: rotate(360deg) } }
        .nf-glow { box-shadow: 0 10px 30px rgba(0,242,234,0.06); }
      `}</style>

      <div className="max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: hero 404 */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-6">
          <div className="relative">
            <div className="w-56 h-56 md:w-72 md:h-72 rounded-2xl bg-gradient-to-br from-[#061016] to-[#071018] border border-white/5 nf-glow flex items-center justify-center">
              <div className="text-[72px] md:text-[96px] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ea] to-[#00c2ff]">404</div>
            </div>
            <div className="pointer-events-none absolute -right-6 -top-6 w-16 h-16 rounded-xl bg-[#00f2ea] flex items-center justify-center text-black font-bold animate-[floatY_4s_ease-in-out_infinite] shadow-[0_10px_30px_rgba(0,242,234,0.12)]">
              A
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold">صفحه موردنظر پیدا نشد</h2>
          <p className="text-gray-400 max-w-lg">ممکنه آدرس را اشتباه وارد کردی یا صفحه پاک شده؛ نگران نباش، با یک کلیک برگرد به خانه یا به داشبورد برو.</p>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            <Link to="/" className="inline-flex items-center gap-2 bg-[#00f2ea] text-black font-black px-6 py-3 rounded-2xl shadow-[0_12px_40px_rgba(0,242,234,0.18)] hover:shadow-[0_18px_60px_rgba(0,242,234,0.22)] transition-all">
              بازگشت به خانه
            </Link>
            <Link to="/dashboard" className="inline-flex items-center gap-2 border border-white/8 text-white px-6 py-3 rounded-2xl hover:bg-white/5 transition-all">
              رفتن به داشبورد
            </Link>
          </div>
        </div>

        {/* Right: decorative panel with tips */}
        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-2xl bg-[#0d1218]/60 border border-white/5 nf-glow">
            <h4 className="text-sm text-gray-300 font-bold mb-2">چند راه سریع</h4>
            <ul className="text-gray-400 space-y-2">
              <li>• بررسی آدرس در نوار URL</li>
              <li>• بازگشت به صفحه قبلی</li>
              <li>• ورود به داشبورد برای مشاهده محتویات</li>
            </ul>
          </div>

          {/* support/contact block removed per request */}

          <div className="p-6 rounded-2xl bg-[#081018] border border-white/5 nf-glow text-gray-400">
            <p className="text-xs">اگر این صفحه از طرف لینک داخلی سایت خطا داده، لطفاً گزارش بده تا برطرفش کنیم.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
