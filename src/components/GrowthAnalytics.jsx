import { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Brain, ChevronDown, ChevronUp, Sparkles, Target, TrendingUp, Zap } from "lucide-react";
import { growthService } from "../services/growthService";

const iconMap = { growth: TrendingUp, focus: Zap, clarity: Brain, goals: Target };

const AnalyticsStatCard = ({ icon: Icon, label, value, change, color }) => (
  <div className="group glass hover-lift relative overflow-hidden p-6">
    <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300" style={{ backgroundColor: color }} />
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4"><p className="text-color-text-secondary text-sm font-medium">{label}</p><Icon size={20} style={{ color }} className="opacity-80" /></div>
      <div className="flex items-baseline justify-between"><h3 className="text-3xl font-bold text-color-text-primary">{value}</h3><span className="text-xs font-semibold px-2 py-1 rounded-lg" style={{ color, backgroundColor: `${color}1a` }}>{change}</span></div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-500" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
  </div>
);

const InsightCard = ({ insight, isExpanded, onToggle }) => (
  <button type="button" onClick={onToggle} className="glass hover-lift cursor-pointer p-5 transition-all duration-300 text-right w-full">
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-4 flex-1"><span className="text-2xl mt-1">{insight.icon}</span><div><h4 className="text-color-text-primary font-semibold mb-2">{insight.title}</h4>{isExpanded && <p className="text-color-text-secondary text-sm leading-relaxed">{insight.description}</p>}</div></div>
      <div className="text-color-text-secondary">{isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</div>
    </div>
  </button>
);

export default function GrowthAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [expandedInsight, setExpandedInsight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    growthService
      .getAnalytics()
      .then((data) => { if (!cancelled) setAnalytics(data); })
      .catch((requestError) => { if (!cancelled) setError(requestError.message || "خطا در دریافت تحلیل رشد"); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const statCards = analytics?.statCards || [];
  const growthData = analytics?.growthData || [];
  const insights = analytics?.insights || [];

  return (
    <div className="min-h-screen bg-color-bg-primary pt-8 pb-16" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 mb-12 scroll-reveal">
        <div className="flex items-center gap-3 mb-4"><div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400" /><span className="text-xs font-semibold tracking-wider text-color-text-secondary uppercase">تحلیل هوشمند</span></div>
        <h1 className="text-4xl md:text-5xl font-bold text-color-text-primary mb-4">رشد <span className="gradient-text">شخصی</span></h1>
        <p className="text-color-text-secondary max-w-2xl leading-relaxed">بررسی روند رشد ذهنی، بهره‌وری و تکامل شخصی شما.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 space-y-12">
        {(loading || error) && <div className={`rounded-2xl border px-4 py-3 text-sm ${error ? "border-red-500/25 bg-red-500/10 text-red-200" : "border-white/5 bg-white/5 text-gray-400"}`}>{loading ? "در حال دریافت تحلیل رشد..." : error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 scroll-reveal">
          {statCards.map((card) => <AnalyticsStatCard key={card.id} {...card} icon={iconMap[card.icon] || TrendingUp} />)}
        </div>

        {growthData.length ? (
          <div className="scroll-reveal"><div className="glass p-8"><div className="mb-8"><h2 className="text-2xl font-bold text-color-text-primary mb-2">مسیر رشد</h2><p className="text-color-text-secondary text-sm">معیارهای توسعه شخصی در دوازده ماه</p></div>
            <div className="w-full h-80 -mx-4 md:mx-0"><ResponsiveContainer width="100%" height="100%"><LineChart data={growthData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} /><XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" style={{ fontSize: "12px" }} /><YAxis stroke="rgba(255,255,255,0.3)" style={{ fontSize: "12px" }} /><Tooltip contentStyle={{ backgroundColor: "rgba(13, 17, 23, 0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.75rem" }} labelStyle={{ color: "#fff" }} /><Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" /><Line type="monotone" dataKey="growth" stroke="#a855f7" strokeWidth={2.5} dot={false} name="رشد" animationDuration={1200} /><Line type="monotone" dataKey="productivity" stroke="#22d3ee" strokeWidth={2.5} dot={false} name="بهره‌وری" animationDuration={1200} /><Line type="monotone" dataKey="mindfulness" stroke="#6366f1" strokeWidth={2.5} dot={false} name="ذهن‌آگاهی" animationDuration={1200} /></LineChart></ResponsiveContainer></div>
          </div></div>
        ) : !loading && !error ? <p className="glass p-8 text-center text-color-text-secondary">هنوز داده‌ای برای تحلیل رشد ثبت نشده است.</p> : null}

        <div className="scroll-reveal"><div className="flex items-center gap-3 mb-6"><Sparkles size={24} className="text-purple-500" /><h2 className="text-2xl font-bold text-color-text-primary">بینش‌های هوشمند</h2></div><div className="grid grid-cols-1 md:grid-cols-3 gap-4">{insights.map((insight) => <InsightCard key={insight.id} insight={insight} isExpanded={expandedInsight === insight.id} onToggle={() => setExpandedInsight((current) => current === insight.id ? null : insight.id)} />)}</div></div>
      </div>
    </div>
  );
}
