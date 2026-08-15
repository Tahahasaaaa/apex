import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";

const extractAuthToken = (payload) => {
  if (!payload || typeof payload !== "object") return "";
  return (
    payload.access ||
    payload.access_token ||
    payload.token ||
    payload.jwt ||
    payload.auth_token ||
    payload.key ||
    payload?.data?.access ||
    payload?.data?.access_token ||
    ""
  );
};

const decodeGooglePayload = (credential) => {
  if (!credential) return null;
  const parts = credential.split(".");
  if (parts.length < 2) return null;
  try {
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
};

const normalizePhone = (value) => {
  if (!value) return "";
  const map = {
    "۰": "0",
    "۱": "1",
    "۲": "2",
    "۳": "3",
    "۴": "4",
    "۵": "5",
    "۶": "6",
    "۷": "7",
    "۸": "8",
    "۹": "9",
    "٠": "0",
    "١": "1",
    "٢": "2",
    "٣": "3",
    "٤": "4",
    "٥": "5",
    "٦": "6",
    "٧": "7",
    "٨": "8",
    "٩": "9",
  };
  return value
    .trim()
    .replace(/[۰-۹٠-٩]/g, (char) => map[char] || char)
    .replace(/\s+/g, "");
};

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const buttonRef = useRef(null);

  const [authMode, setAuthMode] = useState("google");
  const [googleError, setGoogleError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpInfo, setOtpInfo] = useState("");
  const [otpDebugCode, setOtpDebugCode] = useState("");

  const handleCredentialResponse = useCallback(
    async (response) => {
      setGoogleLoading(true);
      setGoogleError("");
      try {
        const credential = response?.credential;
        if (!credential) {
          throw new Error("توکن گوگل دریافت نشد.");
        }

        const googleProfile = decodeGooglePayload(credential);
        const profileName = name.trim() || googleProfile?.name || "کاربر";
        const profileEmail = email.trim() || googleProfile?.email || "";
        const profileImage = googleProfile?.picture || null;

        const storedProfile = {
          name: profileName,
          email: profileEmail,
          image: profileImage,
        };
        localStorage.setItem("userProfile", JSON.stringify(storedProfile));

        const result = await api.authGoogleCredential(credential);
        const token = extractAuthToken(result);
        if (!token) {
          throw new Error("توکن ورود از سرور برنگشت.");
        }

        onLogin(token);
        navigate("/dashboard");
      } catch (err) {
        setGoogleError(err.message || "ورود با گوگل انجام نشد.");
      } finally {
        setGoogleLoading(false);
      }
    },
    [email, name, navigate, onLogin]
  );

  useEffect(() => {
    if (authMode !== "google") return;
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      setGoogleError("Google Client ID تنظیم نشده است.");
      return;
    }

    const initGoogle = () => {
      if (!window.google?.accounts?.id) {
        setGoogleError("خطا در بارگذاری سرویس Google.");
        return;
      }

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
      });

      if (buttonRef.current) {
        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: "outline",
          size: "large",
          text: "continue_with",
          shape: "pill",
          width: 320,
        });
      }
    };

    const existingScript = document.getElementById("google-oauth");
    if (existingScript) {
      initGoogle();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.id = "google-oauth";
    script.onload = initGoogle;
    script.onerror = () => setGoogleError("خطا در بارگذاری سرویس Google.");

    document.body.appendChild(script);
  }, [authMode, handleCredentialResponse]);

  const handleOtpSend = async () => {
    setOtpError("");
    setOtpInfo("");
    setOtpDebugCode("");
    const normalizedPhone = normalizePhone(phone);
    if (!normalizedPhone) {
      setOtpError("شماره موبایل را وارد کنید.");
      return;
    }
    if (!/^09\d{9}$/.test(normalizedPhone)) {
      setOtpError("شماره موبایل باید مثل 09123456789 باشد.");
      return;
    }

    setOtpLoading(true);
    try {
      const result = await api.authOtpSend(normalizedPhone);
      setOtpSent(true);
      const isDevMode = import.meta.env.DEV;
      const debugCode = isDevMode ? result?.debug_code || "" : "";
      if (debugCode) {
        setOtpDebugCode(debugCode);
        setOtpInfo(`کد تایید ارسال شد. کد تست: ${debugCode}`);
      } else {
        setOtpInfo("کد تایید برای شماره شما پیامک شد.");
      }
    } catch (err) {
      setOtpError(err.message || "ارسال کد انجام نشد.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleOtpVerify = async () => {
    setOtpError("");
    setOtpInfo("");
    const normalizedPhone = normalizePhone(phone);
    if (!normalizedPhone) {
      setOtpError("شماره موبایل را وارد کنید.");
      return;
    }
    if (!/^09\d{9}$/.test(normalizedPhone)) {
      setOtpError("شماره موبایل باید مثل 09123456789 باشد.");
      return;
    }
    if (!code.trim()) {
      setOtpError("کد تایید را وارد کنید.");
      return;
    }

    setOtpLoading(true);
    try {
      const result = await api.authOtpVerify(normalizedPhone, code.trim());
      const token = extractAuthToken(result);
      if (!token) {
        throw new Error("توکن ورود از سرور برنگشت.");
      }

      const storedProfile = {
        name: name.trim() || "کاربر",
        email: email.trim() || "",
        phone: normalizedPhone,
        image: null,
      };
      localStorage.setItem("userProfile", JSON.stringify(storedProfile));

      onLogin(token);
      navigate("/dashboard");
    } catch (err) {
      setOtpError(err.message || "تایید کد انجام نشد.");
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-white font-vazir flex flex-col items-center justify-center p-6" dir="rtl">
      <div className="w-full max-w-md flex justify-between items-center mb-12 px-2">
        <span className="text-xl font-black text-[#00f2ea]">ورود</span>
        <button className="text-white text-2xl" onClick={() => navigate(-1)}>←</button>
      </div>

      <div className="w-full max-w-md">
        <h1 className="text-3xl font-black mb-3 text-center">
          به <span className="text-[#00f2ea] ltr">apex</span> خوش آمدید
        </h1>
        <p className="text-gray-500 mb-8 text-center text-sm">یکی از روش‌ها را انتخاب کنید</p>

        <div className="space-y-4">
          <div className="relative group">
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="نام کاربری"
              className="w-full bg-[#0d121d] border-2 border-[#00f2ea] rounded-2xl py-5 px-6 outline-none shadow-[0_0_15px_rgba(0,242,234,0.1)]"
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-50">👤</span>
          </div>

          <div className="relative group">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="ایمیل"
              className="w-full bg-[#0d121d] border-2 border-white/5 rounded-2xl py-5 px-6 outline-none focus:border-white/20"
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-50">✉️</span>
          </div>

          <div className="relative group">
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="رمز عبور"
              className="w-full bg-[#0d121d] border-2 border-white/5 rounded-2xl py-5 px-6 outline-none focus:border-white/20"
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-50">🔒</span>
          </div>

          <div className="text-[10px] text-gray-500 text-center">
            این فیلدها برای نمایش پروفایل ذخیره می‌شوند (ورود واقعی با Google یا OTP انجام می‌شود).
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              type="button"
              onClick={() => setAuthMode("google")}
              className={`py-3 rounded-xl text-sm font-bold transition-all ${
                authMode === "google"
                  ? "bg-[#00f2ea] text-black"
                  : "bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              Google
            </button>
            <button
              type="button"
              onClick={() => setAuthMode("otp")}
              className={`py-3 rounded-xl text-sm font-bold transition-all ${
                authMode === "otp"
                  ? "bg-[#00f2ea] text-black"
                  : "bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              OTP
            </button>
          </div>

          {authMode === "google" && (
            <div className="flex flex-col items-center gap-4 pt-4">
              <div ref={buttonRef} className="flex justify-center"></div>

              {googleLoading && <p className="text-xs text-gray-400">در حال ورود...</p>}
              {googleError && <p className="text-xs text-red-400 text-center">{googleError}</p>}

              <button
                onClick={() => window.google?.accounts?.id?.prompt()}
                className="text-xs text-gray-400 hover:text-white transition-colors"
                type="button"
              >
                یا ورود با پنجره گوگل
              </button>
            </div>
          )}

          {authMode === "otp" && (
            <div className="space-y-4 pt-4">
              <div className="relative group">
                <input
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="شماره موبایل (مثال: 09123456789)"
                  className="w-full bg-[#0d121d] border-2 border-white/5 rounded-2xl py-5 px-6 outline-none focus:border-white/20 ltr"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-50">📱</span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleOtpSend}
                  disabled={otpLoading}
                  className="flex-1 bg-white/5 border border-white/5 rounded-2xl py-4 text-sm font-bold hover:bg-white/10 transition-all disabled:opacity-50"
                >
                  ارسال کد
                </button>
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="px-4 py-4 text-xs text-gray-400 hover:text-white transition-colors"
                >
                  ویرایش شماره
                </button>
              </div>

              {otpSent && (
                <div className="relative group">
                  <input
                    type="text"
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                    placeholder="کد تایید"
                    className="w-full bg-[#0d121d] border-2 border-white/5 rounded-2xl py-5 px-6 outline-none focus:border-white/20 ltr"
                  />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-50">🔢</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleOtpVerify}
                disabled={otpLoading}
                className="w-full bg-[#00f2ea] text-black font-black py-5 rounded-2xl text-xl shadow-[0_15px_30px_rgba(0,242,234,0.3)] hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
              >
                تایید و ورود
              </button>

              {otpLoading && <p className="text-xs text-gray-400">در حال ارسال درخواست...</p>}
              {otpInfo && <p className="text-xs text-emerald-400">{otpInfo}</p>}
              {!otpInfo && otpDebugCode && (
                <p className="text-xs text-emerald-400">کد تست: {otpDebugCode}</p>
              )}
              {otpError && <p className="text-xs text-red-400">{otpError}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
