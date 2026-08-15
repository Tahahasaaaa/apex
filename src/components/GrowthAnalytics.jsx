import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  Zap,
  Brain,
  Target,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

// ==================== داده‌های فرضی ====================
const growthData = [
  { month: 'فروردین', growth: 35, productivity: 40, mindfulness: 28 },
  { month: 'اردیبهشت', growth: 42, productivity: 38, mindfulness: 35 },
  { month: 'خرداد', growth: 48, productivity: 45, mindfulness: 42 },
  { month: 'تیر', growth: 55, productivity: 52, mindfulness: 48 },
  { month: 'مرداد', growth: 62, productivity: 58, mindfulness: 55 },
  { month: 'شهریور', growth: 68, productivity: 65, mindfulness: 62 },
  { month: 'مهر', growth: 75, productivity: 72, mindfulness: 70 },
  { month: 'آبان', growth: 80, productivity: 78, mindfulness: 76 },
  { month: 'آذر', growth: 85, productivity: 82, mindfulness: 80 },
  { month: 'دی', growth: 88, productivity: 85, mindfulness: 83 },
  { month: 'بهمن', growth: 91, productivity: 88, mindfulness: 86 },
  { month: 'اسفند', growth: 92, productivity: 90, mindfulness: 87 },
];

const statCardsData = [
  {
    id: 'growth-score',
    label: 'امتیاز رشد',
    value: '۹۲',
    change: '+۱۲٪',
    icon: TrendingUp,
    color: '#a855f7',
  },
  {
    id: 'focus-hours',
    label: 'ساعات تمرکز',
    value: '۶.۴h',
    change: '+۱۸٪',
    icon: Zap,
    color: '#22d3ee',
  },
  {
    id: 'mental-clarity',
    label: 'وضوح ذهنی',
    value: '۸۷',
    change: '+۸٪',
    icon: Brain,
    color: '#6366f1',
  },
  {
    id: 'goals-hit',
    label: 'اهداف محقق شده',
    value: '۹۴٪',
    change: '+۵٪',
    icon: Target,
    color: '#a855f7',
  },
];

const aiInsightsData = [
  {
    id: 'consistency',
    title: 'استمرار رشد',
    description: '۱۴ روز رشد مداوم. این طولانی‌ترین دوره برای شما در این فصل است.',
    icon: '🔥',
  },
  {
    id: 'focus-improvement',
    title: 'بهبود تمرکز عمیق',
    description: 'میانگین جلسات تمرکز نسبت به ماه گذشته ۲۳٪ افزایش یافته است.',
    icon: '⚡',
  },
  {
    id: 'goal-alignment',
    title: 'انطباق اهداف',
    description: '۸۷٪ اهداف هفتگی تکمیل شده است. شما از خط مبنا بالاتر هستید.',
    icon: '🎯',
  },
];

// ==================== کامپوننت Stat Card ====================
function StatCard({ icon: Icon, label, value, change, color }) {
  return (
    <div className="group glass hover-lift relative overflow-hidden p-6">
      {/* Icon Background */}
      <div
        className="absolute -right-8 -top-8 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"
        style={{ backgroundColor: color }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <p className="text-color-text-secondary text-sm font-medium">{label}</p>
          <Icon size={20} style={{ color }} className="opacity-80" />
        </div>

        <div className="flex items-baseline justify-between">
          <h3 className="text-3xl font-bold text-color-text-primary">{value}</h3>
          <span
            className="text-xs font-semibold px-2 py-1 rounded-lg"
            style={{
              color,
              backgroundColor: color + '1a',
            }}
          >
            {change}
          </span>
        </div>
      </div>

      {/* Hover Glow Line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-500"
        style={{
          background: `linear-gradient(90deg, ${color}, transparent)`,
        }}
      />
    </div>
  );
}

// ==================== کامپوننت AI Insight ====================
function AIInsightCard({ title, description, icon, isExpanded, onToggle }) {
  return (
    <div
      className="glass hover-lift cursor-pointer p-5 transition-all duration-300"
      onClick={onToggle}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4 flex-1">
          <span className="text-2xl mt-1">{icon}</span>
          <div className="flex-1">
            <h4 className="text-color-text-primary font-semibold mb-2">{title}</h4>
            {isExpanded && (
              <p className="text-color-text-secondary text-sm leading-relaxed animate-pulse">
                {description}
              </p>
            )}
          </div>
        </div>
        <div className="text-color-text-secondary">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>
    </div>
  );
}

// ==================== کامپوننت اصلی ====================
export default function GrowthAnalytics() {
  const [expandedInsight, setExpandedInsight] = useState(null);

  const toggleInsight = (id) => {
    setExpandedInsight(expandedInsight === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-color-bg-primary pt-8 pb-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-12 scroll-reveal">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400" />
          <span className="text-xs font-semibold tracking-wider text-color-text-secondary uppercase">
            تحلیل هوشمند
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-color-text-primary mb-4">
          رشد <span className="gradient-text">شخصی</span>
        </h1>

        <p className="text-color-text-secondary max-w-2xl leading-relaxed">
          بررسی توسط هوش مصنوعی از رشد ذهنی، بهره‌وری و تکامل شخصی شما.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 space-y-12">
        {/* Stat Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 scroll-reveal">
          {statCardsData.map((card) => (
            <StatCard
              key={card.id}
              icon={card.icon}
              label={card.label}
              value={card.value}
              change={card.change}
              color={card.color}
            />
          ))}
        </div>

        {/* Growth Trajectory Section */}
        <div className="scroll-reveal">
          <div className="glass p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-color-text-primary mb-2">
                مسیر رشد
              </h2>
              <p className="text-color-text-secondary text-sm">
                معیارهای توسعه شخصی در ۱۲ ماه
              </p>
            </div>

            {/* Chart */}
            <div className="w-full h-80 -mx-4 md:mx-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={growthData}
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    stroke="rgba(255,255,255,0.3)"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis
                    stroke="rgba(255,255,255,0.3)"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(13, 17, 23, 0.9)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '0.75rem',
                      backdropFilter: 'blur(20px)',
                    }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="circle"
                  />

                  <Line
                    type="monotone"
                    dataKey="growth"
                    stroke="#a855f7"
                    strokeWidth={2.5}
                    dot={false}
                    name="رشد"
                    isAnimationActive={true}
                    animationDuration={1200}
                  />
                  <Line
                    type="monotone"
                    dataKey="productivity"
                    stroke="#22d3ee"
                    strokeWidth={2.5}
                    dot={false}
                    name="بهره‌وری"
                    isAnimationActive={true}
                    animationDuration={1200}
                  />
                  <Line
                    type="monotone"
                    dataKey="mindfulness"
                    stroke="#6366f1"
                    strokeWidth={2.5}
                    dot={false}
                    name="ذهن‌آگاهی"
                    isAnimationActive={true}
                    animationDuration={1200}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-color-text-secondary text-sm">رشد</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-400" />
                <span className="text-color-text-secondary text-sm">بهره‌وری</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500" />
                <span className="text-color-text-secondary text-sm">ذهن‌آگاهی</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights Section */}
        <div className="scroll-reveal">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles size={24} className="text-purple-500" />
            <h2 className="text-2xl font-bold text-color-text-primary">
              بینش‌های هوشمند
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiInsightsData.map((insight) => (
              <div key={insight.id} className="scroll-reveal">
                <AIInsightCard
                  title={insight.title}
                  description={insight.description}
                  icon={insight.icon}
                  isExpanded={expandedInsight === insight.id}
                  onToggle={() => toggleInsight(insight.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="scroll-reveal">
          <div className="glass p-8 bg-gradient-to-br from-purple-500/10 to-cyan-400/10 border border-purple-500/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-purple-500/20">
                <TrendingUp size={24} className="text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-color-text-primary">
                  خط مسیر شما مثبت است
                </h3>
                <p className="text-color-text-secondary text-sm">
                  برنامه‌های توصیه‌شده برای سه ماه آینده آماده است
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Reveal CSS Animation */}
      <style>{`
        @keyframes scrollReveal {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scroll-reveal {
          animation: scrollReveal 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          opacity: 0;
        }

        .scroll-reveal:nth-child(1) { animation-delay: 0ms; }
        .scroll-reveal:nth-child(2) { animation-delay: 100ms; }
        .scroll-reveal:nth-child(3) { animation-delay: 200ms; }
        .scroll-reveal:nth-child(4) { animation-delay: 300ms; }
        .scroll-reveal:nth-child(5) { animation-delay: 400ms; }
      `}</style>
    </div>
  );
}
