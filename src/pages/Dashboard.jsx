import DashboardSidebar from "../components/DashboardSidebar";
import StatCard from "../components/StatCard";
import TaskItem from "../components/TaskItem";

const Dashboard = ({ tasks, onToggleTask, isLoading, error, summary }) => {
  const completedCount = tasks.filter((task) => task.done).length;
  const progressPercent = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;
  const weeklyProgress = summary?.weeklyProgress || [];

  return (
    <div className="min-h-screen bg-[#080c14] text-white font-vazir p-4 md:p-6" dir="rtl">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        <DashboardSidebar />

        <div className="lg:col-span-10 space-y-6">
          {(isLoading || error) && (
            <div className="bg-[#0d121d] border border-white/5 rounded-2xl px-4 py-3 text-xs text-gray-400">
              {isLoading ? "در حال دریافت اطلاعات داشبورد..." : error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard icon="🔥" label="روزهای متوالی" value={`${summary?.streakDays ?? 0} روز`} color="orange" />
            <StatCard icon="🏆" label="امتیاز کل" value={(summary?.totalScore ?? 0).toLocaleString("fa-IR")} color="yellow" />
            <StatCard icon="🎯" label="اهداف فعال" value={String(summary?.activeGoals ?? 0)} color="cyan" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-[#0d121d] border border-white/5 rounded-[2rem] p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">تسک‌های امروز</h3>
                <span className="text-gray-500 text-xs">{completedCount} از {tasks.length} انجام شده</span>
              </div>

              <div className="mb-8">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-[#00f2ea]">{progressPercent}%</span>
                  <span className="text-gray-500 font-normal">میزان پیشرفت</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00f2ea] shadow-[0_0_15px_rgba(0,242,234,0.6)] transition-all duration-700" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>

              <div className="space-y-3">
                {tasks.length ? tasks.map((task) => <TaskItem key={task.id} task={task} onToggle={onToggleTask} />) : (
                  <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-gray-500">تسکی برای نمایش وجود ندارد.</p>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#0d121d] border border-white/5 rounded-[2rem] p-8 h-fit">
              <h3 className="text-lg font-bold mb-8">پیشرفت هفتگی</h3>
              <div className="space-y-6">
                {weeklyProgress.length ? weeklyProgress.map(({ day, value }) => (
                  <div key={day} className="space-y-2">
                    <div className="flex justify-between text-[10px] text-gray-500"><span>{day}</span><span>{value}%</span></div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-[#00f2ea]" style={{ width: `${value}%` }} /></div>
                  </div>
                )) : <p className="text-sm text-gray-500">هنوز داده‌ای برای این هفته ثبت نشده است.</p>}
              </div>
              <div className="mt-10 p-5 bg-[#00f2ea]/5 rounded-2xl border border-[#00f2ea]/10 text-center">
                <p className="text-[10px] text-gray-500 mb-1">میانگین بازدهی</p>
                <p className="text-2xl font-black text-[#00f2ea]">{summary?.progress ?? progressPercent}%</p>
                <p className="text-[10px] text-green-400 mt-1">پیشرفت شما ثبت و قابل پیگیری است ✨</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
