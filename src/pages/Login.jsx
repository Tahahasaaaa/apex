import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isMockMode } from "../config/env";
import { authService } from "../services/authService";

const normalizePhone = (value) =>
  String(value || "")
    .trim()
    .replace(/[۰-۹]/g, (digit) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(digit)])
    .replace(/[٠-٩]/g, (digit) => "0123456789"["٠١٢٣٤٥٦٧٨٩".indexOf(digit)])
    .replace(/\s+/g, "");

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const googleButtonRef = useRef(null);
  const [authMode, setAuthMode] = useState(isMockMode ? "password" : "google");
  const [name, setName] = useState("");
  const [email, setEmail] = useState(isMockMode ? "test@example.com" : "");
  const [password, setPassword] = useState(isMockMode ? "password123" : "");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");
  const [error, setError] = useState("");

  const completeLogin = useCallback((session) => {
    onLogin(session);
    navigate("/dashboard");
  }, [navigate, onLogin]);

  const handleGoogleCredential = useCallback(async (response) => {
    setLoading(true);
    setError("");
    try {
      if (!response?.credential) throw new Error("توکن ورود گوگل دریافت نشد.");
      completeLogin(await authService.loginWithGoogle(response.credential));
    } catch (loginError) {
      setError(loginError.message || "ورود با گوگل انجام نشد.");
    } finally {
      setLoading(false);
    }
  }, [completeLogin]);

  useEffect(() => {
    if (isMockMode || authMode !== "google") return undefined;
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      setError("VITE_GOOGLE_CLIENT_ID برای ورود با گوگل تنظیم نشده است.");
      return undefined;
    }

    const renderButton = () => {
      if (!window.google?.accounts?.id || !googleButtonRef.current) return;
      window.google.accounts.id.initialize({ client_id: clientId, callback: handleGoogleCredential });
      googleButtonRef.current.innerHTML = "";
      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: "outline", size: "large", text: "continue_with", shape: "pill", width: 320,
      });
    };

    const existingScript = document.getElementById("google-oauth");
    if (existingScript) {
      renderButton();
      return undefined;
    }

    const script = document.createElement("script");
    script.id = "google-oauth";
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = renderButton;
    script.onerror = () => setError("بارگذاری سرویس گوگل انجام نشد.");
    document.body.appendChild(script);
    return () => script.remove();
  }, [authMode, handleGoogleCredential]);

  const handlePasswordLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      completeLogin(await authService.login({ email, password, name }));
    } catch (loginError) {
      setError(loginError.message || "ورود انجام نشد.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSend = async () => {
    const normalizedPhone = normalizePhone(phone);
    if (!/^09\d{9}$/.test(normalizedPhone)) {
      setError("شماره موبایل باید مانند 09123456789 باشد.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const result = await authService.sendOtp(normalizedPhone);
      setOtpSent(true);
      setInfo(result?.debug_code ? `کد آزمایشی: ${result.debug_code}` : "کد تایید ارسال شد.");
    } catch (sendError) {
      setError(sendError.message || "ارسال کد انجام نشد.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async () => {
    setLoading(true);
    setError("");
    try {
      completeLogin(await authService.verifyOtp(normalizePhone(phone), code));
    } catch (verifyError) {
      setError(verifyError.message || "تایید کد انجام نشد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-white font-vazir flex flex-col items-center justify-center p-6" dir="rtl">
      <div className="w-full max-w-md flex justify-between items-center mb-12 px-2">
        <span className="text-xl font-black text-[#00f2ea]">ورود</span>
        <button type="button" className="text-white text-2xl" onClick={() => navigate(-1)}>←</button>
      </div>

      <div className="w-full max-w-md">
        <h1 className="text-3xl font-black mb-3 text-center">به <span className="text-[#00f2ea] ltr">apex</span> خوش آمدید</h1>
        <p className="text-gray-500 mb-8 text-center text-sm">
          {isMockMode ? "برای توسعهٔ رابط کاربری، ورود آزمایشی فعال است." : "یکی از روش‌های ورود را انتخاب کنید."}
        </p>

        {!isMockMode && (
          <div className="grid grid-cols-2 gap-2 mb-6">
            <button type="button" onClick={() => setAuthMode("google")} className={`py-3 rounded-xl text-sm font-bold ${authMode === "google" ? "bg-[#00f2ea] text-black" : "bg-white/5 text-gray-400"}`}>Google</button>
            <button type="button" onClick={() => setAuthMode("otp")} className={`py-3 rounded-xl text-sm font-bold ${authMode === "otp" ? "bg-[#00f2ea] text-black" : "bg-white/5 text-gray-400"}`}>پیامک</button>
          </div>
        )}

        {(isMockMode || authMode === "password") && (
          <form onSubmit={handlePasswordLogin} className="space-y-4">
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="نام نمایشی (اختیاری)" className="w-full bg-[#0d121d] border-2 border-white/5 rounded-2xl py-4 px-6 outline-none focus:border-white/20" />
            <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="ایمیل" className="w-full bg-[#0d121d] border-2 border-white/5 rounded-2xl py-4 px-6 outline-none focus:border-white/20 ltr" />
            <input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="رمز عبور" className="w-full bg-[#0d121d] border-2 border-white/5 rounded-2xl py-4 px-6 outline-none focus:border-white/20 ltr" />
            {isMockMode && <p className="rounded-xl bg-[#00f2ea]/10 px-4 py-3 text-xs text-[#00f2ea]" dir="ltr">test@example.com / password123</p>}
            <button disabled={loading} className="w-full bg-[#00f2ea] text-black font-black py-4 rounded-2xl text-lg disabled:opacity-60">{loading ? "در حال ورود..." : "ورود به apex"}</button>
          </form>
        )}

        {!isMockMode && authMode === "google" && <div ref={googleButtonRef} className="flex justify-center" />}

        {!isMockMode && authMode === "otp" && (
          <div className="space-y-4">
            <input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="شماره موبایل (09123456789)" className="w-full bg-[#0d121d] border-2 border-white/5 rounded-2xl py-4 px-6 outline-none focus:border-white/20 ltr" />
            {otpSent && <input value={code} onChange={(event) => setCode(event.target.value)} placeholder="کد تایید" className="w-full bg-[#0d121d] border-2 border-white/5 rounded-2xl py-4 px-6 outline-none focus:border-white/20 ltr" />}
            <button type="button" onClick={otpSent ? handleOtpVerify : handleOtpSend} disabled={loading} className="w-full bg-[#00f2ea] text-black font-black py-4 rounded-2xl disabled:opacity-60">{otpSent ? "تایید و ورود" : "ارسال کد"}</button>
          </div>
        )}

        {info && <p className="mt-4 text-center text-xs text-emerald-400">{info}</p>}
        {error && <p className="mt-4 text-center text-xs text-red-400">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
