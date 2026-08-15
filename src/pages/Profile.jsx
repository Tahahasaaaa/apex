import { useEffect, useMemo, useState } from "react";
import { FiEdit2, FiMinus, FiPlus } from "react-icons/fi";
import DashboardSidebar from "../components/DashboardSidebar";
import { api, getAuthToken } from "../api/client";

const LEARNING_STYLE_OPTIONS = [
  ["visual", "بصری"],
  ["auditory", "شنیداری"],
  ["reading", "خواندن/نوشتن"],
  ["kinesthetic", "جنبشی"],
];

const GENDER_OPTIONS = [
  ["male", "مرد"],
  ["female", "زن"],
  ["other", "سایر"],
];

const toFormModel = (data) => ({
  name: data?.name || "",
  friendly_name: data?.friendly_name || "",
  learning_style: data?.learning_style || "",
  focus_span_minutes: data?.focus_span_minutes ?? "",
  coach_persona: data?.coach_persona || "",
  daily_screen_time: data?.daily_screen_time ?? "",
  age: data?.age ?? "",
  gender: data?.gender || "",
});

const formatWithUnit = (value, unit) => {
  if (value === null || value === undefined || value === "") return "—";
  return `${value} ${unit}`;
};

const fieldCardClass = (isActive) =>
  `group relative rounded-3xl border p-6 transition-all duration-300 ${
    isActive
      ? "border-[#00f2ea]/35 bg-[#111d33] shadow-[0_12px_40px_rgba(0,242,234,0.12)]"
      : "border-white/5 bg-[#121826] hover:border-white/15 hover:-translate-y-0.5"
  }`;

const NumberStepper = ({ value, onChange, step, min = 0, unitLabel }) => {
  const decrease = () => {
    const current = Number(value);
    const safeCurrent = Number.isFinite(current) ? current : 0;
    onChange(Math.max(min, safeCurrent - step));
  };

  const increase = () => {
    const current = Number(value);
    const safeCurrent = Number.isFinite(current) ? current : 0;
    onChange(Math.max(min, safeCurrent + step));
  };

  return (
    <div className="mt-3 rounded-2xl border border-[#00f2ea]/25 bg-[#0f1728] p-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={decrease}
          className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 text-gray-200 hover:bg-white/10"
          aria-label="کاهش مقدار"
        >
          <FiMinus className="mx-auto" />
        </button>

        <div className="flex-1 rounded-xl border border-white/10 bg-[#080f1f] px-3 py-1.5">
          <input
            type="number"
            value={value}
            min={min}
            step={step}
            onChange={(e) => onChange(e.target.value)}
            className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-full bg-transparent text-center text-lg font-black tracking-wide text-white outline-none"
            style={{ MozAppearance: "textfield" }}
          />
        </div>

        <button
          type="button"
          onClick={increase}
          className="h-9 w-9 rounded-xl border border-[#00f2ea]/35 bg-[#00f2ea]/10 text-[#00f2ea] hover:bg-[#00f2ea]/20"
          aria-label="افزایش مقدار"
        >
          <FiPlus className="mx-auto" />
        </button>
      </div>

      <p className="mt-2 text-[11px] text-gray-500">
        گام تغییر: {step} {unitLabel}
      </p>
    </div>
  );
};

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editing, setEditing] = useState(false);
  const [editingField, setEditingField] = useState(null);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setError("برای مشاهدهٔ پروفایل لطفاً وارد شوید.");
      return;
    }

    let ignore = false;
    setIsLoading(true);
    setError("");

    api
      .getProfile(token)
      .then((data) => {
        if (!ignore) {
          setProfile(data || null);
          setForm(toFormModel(data));
        }
      })
      .catch((err) => {
        if (!ignore) setError(err.message || "خطا در دریافت پروفایل");
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const learningStyleLabel = useMemo(() => {
    const map = {
      visual: "بصری",
      auditory: "شنیداری",
      reading: "خواندن/نوشتن",
      kinesthetic: "جنبشی",
    };
    if (!profile || !profile.learning_style) return "—";
    return map[profile.learning_style] || profile.learning_style;
  }, [profile]);

  const genderLabel = useMemo(() => {
    const map = {
      male: "مرد",
      female: "زن",
      other: "سایر",
    };
    if (!profile || !profile.gender) return "—";
    return map[profile.gender] || profile.gender;
  }, [profile]);

  const handleChange = (key) => (next) => {
    const value = next?.target ? next.target.value : next;
    setForm((s) => ({ ...s, [key]: value }));
  };

  const openFieldEditor = (field) => {
    setEditing(true);
    setEditingField(field);
  };

  const cancelEditing = () => {
    setEditing(false);
    setEditingField(null);
    setForm(toFormModel(profile));
    setError("");
    setSuccess("");
  };

  const handleSave = async () => {
    const token = getAuthToken();
    if (!token) {
      setError("برای ذخیره تغییرات لطفاً وارد شوید.");
      return;
    }

    setIsSaving(true);
    setError("");
    setSuccess("");

    const buildPayload = (includeGender) => ({
      ...(form.name ? { name: form.name } : {}),
      ...(form.friendly_name ? { friendly_name: form.friendly_name } : {}),
      ...(form.learning_style ? { learning_style: form.learning_style } : {}),
      ...(form.focus_span_minutes !== "" ? { focus_span_minutes: Number(form.focus_span_minutes) } : {}),
      ...(form.coach_persona ? { coach_persona: form.coach_persona } : {}),
      ...(form.daily_screen_time !== "" ? { daily_screen_time: Number(form.daily_screen_time) } : {}),
      ...(form.age !== "" ? { age: Number(form.age) } : {}),
      ...(includeGender && form.gender ? { gender: form.gender } : {}),
    });

    try {
      let successMessage = "پروفایل با موفقیت به‌روزرسانی شد";
      let payload = buildPayload(true);
      let updated;

      try {
        updated = await api.updateProfile(payload, token);
      } catch (firstError) {
        if (!("gender" in payload)) {
          throw firstError;
        }
        const fallbackPayload = buildPayload(false);
        if (Object.keys(fallbackPayload).length === 0) {
          setSuccess("فیلد جنسیت در API فعلی پشتیبانی نمی‌شود.");
          setEditing(false);
          setEditingField(null);
          setForm(toFormModel(profile));
          window.setTimeout(() => setSuccess(""), 2500);
          return;
        }
        updated = await api.updateProfile(fallbackPayload, token);
        payload = fallbackPayload;
        successMessage = "پروفایل ذخیره شد. فیلد جنسیت فعلاً در API پشتیبانی نمی‌شود.";
      }

      setSuccess(successMessage);

      const nextProfile = updated ? { ...(profile || {}), ...updated } : { ...(profile || {}), ...payload };

      setProfile(nextProfile);
      setForm(toFormModel(nextProfile));
      setEditing(false);
      setEditingField(null);
      window.setTimeout(() => setSuccess(""), 2500);
    } catch (err) {
      setError(err.message || "خطا در ذخیره پروفایل");
    } finally {
      setIsSaving(false);
    }
  };

  const isEditingField = (key) => editing && editingField === key;

  return (
    <div className="min-h-screen bg-[#080c14] text-white font-vazir p-4 md:p-6" dir="rtl">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        <DashboardSidebar />

        <div className="lg:col-span-10">
          <div className="bg-[#0d121d] border border-white/5 rounded-[2rem] p-6 md:p-10 shadow-2xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-black mb-0">پروفایل کاربر</h2>
                <button
                  type="button"
                  aria-label="ویرایش سریع"
                  title="ویرایش سریع"
                  onClick={() => setEditing((prev) => !prev)}
                  className={`rounded-full p-2 transition-colors ${
                    editing ? "bg-[#00f2ea]/15 text-[#00f2ea]" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <FiEdit2 />
                </button>
                <p className="text-sm text-gray-500">ویرایش سریع و دقیق اطلاعات</p>
              </div>

              {editing ? (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={cancelEditing}
                    className="px-4 py-2 rounded-2xl border border-white/10 bg-white/5 text-gray-200 hover:bg-white/10"
                  >
                    لغو
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-4 py-2 rounded-2xl bg-[#00f2ea] text-black font-black hover:brightness-110 disabled:opacity-60"
                  >
                    {isSaving ? "در حال ذخیره..." : "ذخیره"}
                  </button>
                </div>
              ) : null}
            </div>

            {(isLoading || error || success) && (
              <div
                className={`mt-6 rounded-2xl px-4 py-3 text-xs border ${
                  error
                    ? "bg-red-500/10 border-red-500/25 text-red-200"
                    : success
                    ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-200"
                    : "bg-[#121826] border-white/5 text-gray-400"
                }`}
              >
                {isLoading ? "در حال دریافت اطلاعات پروفایل..." : error || success}
              </div>
            )}

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={fieldCardClass(isEditingField("name"))}>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400">نام</p>
                  <button
                    type="button"
                    onClick={() => openFieldEditor("name")}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    ✎
                  </button>
                </div>
                {isEditingField("name") ? (
                  <input
                    value={form.name}
                    onChange={handleChange("name")}
                    className="mt-3 w-full rounded-xl border border-white/10 bg-[#0f1728] px-3 py-2.5 text-lg font-bold outline-none focus:border-[#00f2ea]/40"
                  />
                ) : (
                  <p className="text-lg font-bold mt-3">{profile?.name || "—"}</p>
                )}
              </div>

              <div className={fieldCardClass(isEditingField("friendly_name"))}>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400">نام نمایشی</p>
                  <button
                    type="button"
                    onClick={() => openFieldEditor("friendly_name")}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    ✎
                  </button>
                </div>
                {isEditingField("friendly_name") ? (
                  <input
                    value={form.friendly_name}
                    onChange={handleChange("friendly_name")}
                    className="mt-3 w-full rounded-xl border border-white/10 bg-[#0f1728] px-3 py-2.5 text-lg font-bold outline-none focus:border-[#00f2ea]/40"
                  />
                ) : (
                  <p className="text-lg font-bold mt-3">{profile?.friendly_name || "—"}</p>
                )}
              </div>

              <div className={fieldCardClass(isEditingField("learning_style"))}>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400">سبک یادگیری</p>
                  <button
                    type="button"
                    onClick={() => openFieldEditor("learning_style")}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    ✎
                  </button>
                </div>
                {isEditingField("learning_style") ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {LEARNING_STYLE_OPTIONS.map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setForm((s) => ({ ...s, learning_style: value }))}
                        className={`rounded-xl px-3 py-1.5 text-sm border transition-colors ${
                          form.learning_style === value
                            ? "border-[#00f2ea] bg-[#00f2ea] text-black font-bold"
                            : "border-white/10 bg-white/5 text-gray-200 hover:border-[#00f2ea]/40"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-lg font-bold mt-3">{learningStyleLabel}</p>
                )}
              </div>

              <div className={fieldCardClass(isEditingField("focus_span_minutes"))}>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400">مدت تمرکز (دقیقه)</p>
                  <button
                    type="button"
                    onClick={() => openFieldEditor("focus_span_minutes")}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    ✎
                  </button>
                </div>
                {isEditingField("focus_span_minutes") ? (
                  <NumberStepper
                    value={form.focus_span_minutes}
                    onChange={handleChange("focus_span_minutes")}
                    step={5}
                    unitLabel="دقیقه"
                  />
                ) : (
                  <p className="text-lg font-bold mt-3">{formatWithUnit(profile?.focus_span_minutes, "دقیقه")}</p>
                )}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <div className={fieldCardClass(isEditingField("coach_persona"))}>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400">شخصیت کوچ</p>
                  <button
                    type="button"
                    onClick={() => openFieldEditor("coach_persona")}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    ✎
                  </button>
                </div>
                {isEditingField("coach_persona") ? (
                  <input
                    value={form.coach_persona}
                    onChange={handleChange("coach_persona")}
                    className="mt-3 w-full rounded-xl border border-white/10 bg-[#0f1728] px-3 py-2.5 text-lg font-bold outline-none focus:border-[#00f2ea]/40"
                  />
                ) : (
                  <p className="text-lg font-bold mt-3">{profile?.coach_persona || "—"}</p>
                )}
              </div>

              <div className={fieldCardClass(isEditingField("daily_screen_time"))}>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400">میانگین استفاده (ساعت)</p>
                  <button
                    type="button"
                    onClick={() => openFieldEditor("daily_screen_time")}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    ✎
                  </button>
                </div>
                {isEditingField("daily_screen_time") ? (
                  <NumberStepper
                    value={form.daily_screen_time}
                    onChange={handleChange("daily_screen_time")}
                    step={1}
                    unitLabel="ساعت"
                  />
                ) : (
                  <p className="text-lg font-bold mt-3">{formatWithUnit(profile?.daily_screen_time, "ساعت")}</p>
                )}
              </div>

              <div className={fieldCardClass(isEditingField("age"))}>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400">سن</p>
                  <button
                    type="button"
                    onClick={() => openFieldEditor("age")}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    ✎
                  </button>
                </div>
                {isEditingField("age") ? (
                  <NumberStepper value={form.age} onChange={handleChange("age")} step={1} unitLabel="سال" />
                ) : (
                  <p className="text-lg font-bold mt-3">{profile?.age ?? "—"}</p>
                )}
              </div>

              <div className={fieldCardClass(isEditingField("gender"))}>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400">جنسیت</p>
                  <button
                    type="button"
                    onClick={() => openFieldEditor("gender")}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    ✎
                  </button>
                </div>
                {isEditingField("gender") ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {GENDER_OPTIONS.map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setForm((s) => ({ ...s, gender: value }))}
                        className={`rounded-xl px-3 py-1.5 text-sm border transition-colors ${
                          form.gender === value
                            ? "border-[#00f2ea] bg-[#00f2ea] text-black font-bold"
                            : "border-white/10 bg-white/5 text-gray-200 hover:border-[#00f2ea]/40"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-lg font-bold mt-3">{genderLabel}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
