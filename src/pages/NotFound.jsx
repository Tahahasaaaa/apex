import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#080c14] text-white font-vazir flex flex-col items-center justify-center p-6" dir="rtl">
      <h1 className="text-5xl font-black mb-4">404</h1>
      <p className="text-gray-500 mb-8">این صفحه پیدا نشد</p>
      <Link to="/" className="bg-[#00f2ea] text-black font-black px-8 py-3 rounded-full hover:brightness-110 transition-all">
        برگشت به خانه
      </Link>
    </div>
  );
};

export default NotFound;
