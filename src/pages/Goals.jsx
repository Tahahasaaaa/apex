import { useEffect, useMemo, useState } from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import { api, getAuthToken } from "../api/client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("متوسط");
  const [dueDate, setDueDate] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const normalizeGoal = (goal) => {
    const meta = goal && typeof goal.sub_goals === "object" && goal.sub_goals ? goal.sub_goals : {};
    const progress = typeof meta.progress === "number" ? meta.progress : goal.is_completed ? 100 : 0;
    const priorityValue = meta.priority || goal.category || "متوسط";

    return {
      ...goal,
      description: meta.description || "بدون توضیح",
      progress,
      priority: priorityValue,
      dueDate: goal.deadline || "بدون تاریخ",
    };
  };

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setError("برای دریافت اهداف لطفاً وارد شوید.");
      return;
    }

    let ignore = false;
    setIsLoading(true);
    setError("");

    api
      .getGoals(token)
      .then((data) => {
        if (ignore) return;
        const items = Array.isArray(data) ? data.map(normalizeGoal) : [];
        setGoals(items);
      })
      .catch((err) => {
        if (ignore) return;
        setError(err.message || "خطا در دریافت اهداف");
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const stats = useMemo(() => {
    const activeCount = goals.length;
    const completed = goals.filter((goal) => goal.progress >= 100 || goal.is_completed).length;
    const avg = goals.length ? Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length) : 0;
    return { activeCount, completed, avg };
  }, [goals]);

  const handleAddGoal = async (event) => {
    event.preventDefault();
    if (!title.trim()) return;

    const token = getAuthToken();
    if (!token) {
      setError("برای ثبت هدف جدید لطفاً وارد شوید.");
      return;
    }

    const payload = {
      title: title.trim(),
      category: priority,
      ...(dueDate ? { deadline: dueDate.toISOString().split('T')[0] } : {}),
    };

    setIsLoading(true);
    setError("");

    try {
      const created = await api.createGoal(payload, token);
      const enriched = {
        ...normalizeGoal(created),
        description: description.trim() || "بدون توضیح",
        priority,
        progress: 0,
        dueDate: dueDate ? dueDate.toISOString().split('T')[0] : created?.deadline || "بدون تاریخ",
      };
      setGoals((prev) => [enriched, ...prev]);
      setTitle("");
      setDescription("");
      setPriority("متوسط");
      setDueDate(null);
      setShowToast(true);
      window.setTimeout(() => setShowToast(false), 1800);
    } catch (err) {
      setError(err.message || "خطا در ثبت هدف");
    } finally {
      setIsLoading(false);
    }
  };

  const priorityStyle = (value) => {
    if (value === "بالا") return "bg-red-500/10 text-red-400";
    if (value === "متوسط") return "bg-yellow-500/10 text-yellow-400";
    return "bg-emerald-500/10 text-emerald-400";
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-white font-vazir p-4 md:p-6" dir="rtl">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        <DashboardSidebar />

        <div className="lg:col-span-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black">اهداف</h1>
              <p className="text-gray-500 mt-2">اهداف فعال و مسیر پیشرفت شما</p>
            </div>
              <button
              type="button"
              onClick={() => document.getElementById("goal-form")?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="bg-[#00f2ea] text-black font-black px-6 py-3 rounded-2xl shadow-[0_15px_30px_rgba(0,242,234,0.3)] hover:brightness-110 transition-all w-full md:w-auto"
            >
              افزودن هدف جدید
            </button>
          </div>

          {(isLoading || error) && (
            <div className="bg-[#0d121d] border border-white/5 rounded-2xl px-4 py-3 text-xs text-gray-400">
              {isLoading ? "در حال دریافت اهداف..." : error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#0d121d] border border-white/5 rounded-3xl p-6">
              <p className="text-[10px] text-gray-500 mb-1">اهداف فعال</p>
              <p className="text-2xl font-black">{stats.activeCount}</p>
            </div>
            <div className="bg-[#0d121d] border border-white/5 rounded-3xl p-6">
              <p className="text-[10px] text-gray-500 mb-1">اهداف تکمیل‌شده</p>
              <p className="text-2xl font-black">{stats.completed}</p>
            </div>
            <div className="bg-[#0d121d] border border-white/5 rounded-3xl p-6">
              <p className="text-[10px] text-gray-500 mb-1">میانگین پیشرفت</p>
              <p className="text-2xl font-black">{stats.avg}%</p>
            </div>
          </div>

          <form
            id="goal-form"
            onSubmit={handleAddGoal}
            className="bg-[#0d121d] border border-white/5 rounded-[2rem] p-6 md:p-8 shadow-2xl"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold">افزودن هدف جدید</h2>
                <p className="text-xs text-gray-500 mt-1">هدف جدید را اضافه کنید تا در برنامه نمایش داده شود</p>
              </div>
              {showToast && (
                <span className="text-xs bg-[#00f2ea]/10 text-[#00f2ea] px-3 py-1 rounded-full">
                  هدف جدید اضافه شد
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="عنوان هدف"
                className="bg-[#121826] border border-white/5 rounded-2xl px-4 py-3 outline-none focus:border-[#00f2ea]/50"
                required
              />
              <DatePicker
                selected={dueDate}
                onChange={setDueDate}
                placeholderText="تاریخ هدف (اختیاری)"
                dateFormat="yyyy/MM/dd"
                className="bg-[#121826] border border-white/5 rounded-2xl px-4 py-3 outline-none focus:border-[#00f2ea]/50 w-full"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="توضیح کوتاه"
                className="bg-[#121826] border border-white/5 rounded-2xl px-4 py-3 outline-none focus:border-[#00f2ea]/50 md:col-span-2 min-h-[110px]"
              />
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="bg-[#121826] border border-white/5 rounded-2xl px-4 py-3 outline-none focus:border-[#00f2ea]/50"
              >
                <option value="بالا">اولویت بالا</option>
                <option value="متوسط">اولویت متوسط</option>
                <option value="پایین">اولویت پایین</option>
              </select>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="bg-[#00f2ea] text-black font-black px-8 py-3 rounded-2xl shadow-[0_15px_30px_rgba(0,242,234,0.3)] hover:brightness-110 transition-all"
              >
                ثبت هدف
              </button>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="bg-[#0d121d] border border-white/5 rounded-[2rem] p-6 shadow-2xl hover:border-white/10 transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-bold">{goal.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{goal.description}</p>
                  </div>
                  <span className={`text-[10px] px-3 py-1 rounded-full ${priorityStyle(goal.priority)}`}>
                    {goal.priority}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-[#00f2ea]">{goal.progress}%</span>
                    <span className="text-gray-500 font-normal">درصد پیشرفت</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#00f2ea] transition-all duration-700" style={{ width: `${goal.progress}%` }}></div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between text-xs text-gray-500">
                  <span>تاریخ هدف: {goal.dueDate}</span>
                  <button className="text-[#00f2ea] hover:brightness-110 transition-all">مشاهده</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;
