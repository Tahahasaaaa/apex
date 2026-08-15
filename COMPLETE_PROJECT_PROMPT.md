# 🎨 RE-AKT: پرامپت تکمیل پروژه

> **تاریخ**: فوریه ۲۰۲۶  
> **وضعیت**: در حال توسعه | **نسخه**: ۰.۰.۰

---

## 📌 شناسایی پروژه

| مشخصه | توضیح |
|------|-------|
| **نام پروژه** | RE-AKT |
| **عنوان** | Personal Growth & Self-Development Platform |
| **زبان** | فارسی (RTL) |
| **حالت** | تاریک (Dark Mode) |
| **هدف مخاطب** | داوران، بازرسین حرفه‌ای، کاربران سازمانی |
| **فیلسوفی** | هوشمند، آرام، حرفه‌ای، تکنولوژی‌نما بدون cyberpunk |

---

## 🛠️ تک‌استک فنی

### Backend / Frontend
```
React:           19.2.0
Vite:            7.3.1
Tailwind CSS:    4.1.18 (با RTL)
React Router:    6.30.3
Axios:           1.13.5
Lucide Icons:    0.563.0
React Icons:     5.5.0
Recharts:        3.7.0
```

### فونت‌ها
```
اصلی:          DINNextArabic (وزن: 500)
فالبک اول:     Vazirmatn (وزن: 100, 300, 400, 700, 900)
فالبک دوم:     System sans-serif
```

### پلاگین‌ها
```
tailwindcss-rtl:  0.9.0  (پشتیبانی حالت راست-به-چپ)
PostCSS:          8.5.6
Autoprefixer:     10.4.24
```

---

## 🎨 سیستم رنگی (Color System)

### پس‌زمینه (Backgrounds)
```
رنگ اصلی:        #0d1117
رنگ دوم:         #161b22
رنگ سوم:         #21262d
```

### گرادیان‌ها (Gradients)
```
شروع:            #a855f7 (بنفش - Purple)
پایان:           #22d3ee (آبی روشن - Cyan)
```

### متن (Text)
```
متن اصلی:        #ffffff (سفید)
متن دوم:         #8b949e (خاکستری روشن)
متن مخفی:        #6e7681 (خاکستری تیره)
```

### نورپردازی (Lighting / Orbs)
```
orb کاهش:        #6366f1 (نیلی - Indigo)
orb اصلی:        #a855f7 (بنفش - Purple)
```

---

## 📐 سیستم تایپوگرافی

### سایز‌های عنوان (Typography Scales)
```
h1:  clamp(2rem, 5vw, 3.5rem)      // 32px تا 56px
h2:  clamp(1.5rem, 4vw, 2.5rem)    // 24px تا 40px
h3:  clamp(1.25rem, 3vw, 1.75rem)  // 20px تا 28px
body: 1rem                           // 16px
small: 0.875rem                      // 14px
```

### ویژگی‌های متن
```
حروف‌ریزی عنوان:  -0.02em (letter-spacing)
حروف‌ریزی متن:    +0.01em
ارتفاع خط:        1.7 (body) | 1.1-1.3 (headings)
```

### کلاس‌های کاربردی (Text Utilities)
```
.text-primary     → #ffffff (100% opacity)
.text-secondary   → #8b949e (با letter-spacing)
.text-muted       → #6e7681 (0.875rem)
```

---

## ⏱️ سیستم انیمیشن

### توابع تایمینگ (Cubic-Bezier)
```
--timing-subtle:     cubic-bezier(0.4, 0.0, 0.2, 1)
--timing-smooth:     cubic-bezier(0.34, 1.56, 0.64, 1) // Spring-like
--timing-controlled: cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

### مدت‌های انیمیشن
```
--duration-fast:  200ms     (تعاملات سریع)
--duration-base:  350ms     (انتقال‌های معمولی)
--duration-slow:  600ms     (ورود انیمیشن‌ها)
```

### انیمیشن‌های کلیدی

#### `.gradient-text`
- **انیمیشن**: `gradientShift` (8s, ease-in-out, infinite)
- **اثر**: تغییر رنگ ملایم در گرادیان متن
- **اضافی**: سایه‌ی درخشان (purple/cyan)

#### `.glass` (و Hover States)
- **Transform**: `translateY(-4px)` هنگام hover
- **Box-shadow**: درخشش بنفش + آبی
- **Transition**: تمام ویژگی‌ها (350ms)

#### `.orb` سیستم
- **نفس**: `orbBreathe` (7-9s, infinite)
- **درخشش**: `orbGlow` (6s, infinite)
- **اثر**: تغییر scale و opacity
- **هدف**: زمینه زنده و طبیعی

#### شبکه بدن (Body Grid)
- **انیمیشن**: `gridShift` (20s, linear, infinite)
- **اثر**: حرکت شبکه عصبی ملایم
- **Opacity**: 0.03 (بسیار ملایم)

#### `.scroll-reveal`
- **انیمیشن**: `scrollReveal` (600ms)
- **Stagger**: 100ms بین المانها (حداکثر 500ms)
- **اثر**: fade-in + slide-up

---

## 🧩 سیستم اجزاء (Component System)

### Glass Panel (`.glass`)
```css
✓ اثر شیشه مات (20px blur)
✓ درخشش درونی نرم گرادیانی
✓ حاشیه پریمیوم (rgba white, 0.12)
✓ اثر بلند شدن و درخشش هنگام hover
✓ انتقال‌های 350ms
```

### Hover Lift Utility (`.hover-lift`)
```css
✓ Transform: translateY(-6px)
✓ سایه‌های چند لایه (بنفش + آبی)
✓ تایمینگ smooth cubic-bezier
```

### Section Divider (`.section-divider`)
```css
✓ خط افقی با گرادیان
✓ محو شدن بنفش → آبی
✓ لایه blur نرم
✓ موضع‌گیری مرکزی
```

### Mouse Glow (`.mouse-glow`)
```css
✓ فقط دسکتاپ (@media hover: hover)
✓ 300x300px radial gradient
✓ گرادیان opacity بنفش → آبی
✓ فیلتر 40px blur
✓ پیگیری مکان‌نما
```

---

## 📄 ساختار صفحات

### صفحه Home (صفحه فرود)
```
اجزاء:
├── Navigation (بالا)
│   ├── لوگو + نام
│   ├── منوی ناوبری
│   └── پروفایل + dropdown
├── Hero Section
│   ├── عنوان بزرگ
│   ├── متن توصیفی
│   ├── دکمه اصلی
│   └── اثرهای بصری (orbs، gradient)
├── Feature Cards
│   ├── نمایش ویژگی‌ها
│   ├── انتقال‌های hover
│   └── glass effect
├── Goals Preview
│   ├── نمایش اهداف نمونه
│   ├── GoalCard اجزاء
│   └── scroll reveal
└── Footer
```

### صفحه Dashboard (داشبورد)
```
اجزاء:
├── DashboardSidebar (چپ)
│   ├── لینک‌های ناوبری
│   ├── آیکون‌ها
│   └── فعال/غیرفعال states
├── محتوای اصلی
│   ├── StatCards (3 تایی)
│   │   ├── روزهای متوالی
│   │   ├── امتیاز کل
│   │   └── اهداف فعال
│   ├── Tasks Section
│   │   ├── TaskItems
│   │   ├── Progress Bar
│   │   └── checkbox states
│   └── Weekly Progress
│       ├── نمودار میله‌ای
│       ├── روزهای هفته
│       └── درصد پیشرفت
```

### صفحه Goals (اهداف)
```
اجزاء:
├── Header
│   ├── عنوان
│   └── دکمه اضافه کردن
├── GoalCards Grid
│   ├── عنوان هدف
│   ├── توصیف
│   ├── Progress bar
│   ├── تاریخ مهلت
│   └── دکمه‌های عمل
├── Filter/Sort Options
└── Empty State (در صورت عدم وجود)
```

### صفحه Tasks (تسک‌ها)
```
اجزاء:
├── Filter Section
│   ├── All / Today / This Week
│   └── Priority filters
├── TaskList
│   ├── TaskItem Components
│   │   ├── Checkbox
│   │   ├── عنوان تسک
│   │   ├── توضیح
│   │   ├── Priority indicator
│   │   └── دکمه‌های عمل
│   └── Drag & Drop (اختیاری)
└── Stats Footer
    └── تعداد / درصد انجام شده
```

### صفحه AiChat (چت AI)
```
اجزاء:
├── ChatSidebar (چپ)
│   ├── لیست گفتگوها
│   ├── نو شروعی
│   └── تاریخچه
├── ChatArea (اصلی)
│   ├── پیام‌های قبلی
│   ├── Message Bubbles
│   │   ├── کاربر (راست)
│   │   └── AI (چپ)
│   ├── Typing Indicator
│   └── Input Area
│       ├── Text Input
│       └── Send Button
```

### صفحه Profile (پروفایل)
```
اجزاء:
├── ProfileHeader
│   ├── عکس پروفایل
│   ├── نام کاربر
│   └── دکمه ویرایش
├── User Info
│   ├── Email
│   ├── Phone
│   └── Bio
├── Settings Sections
│   ├── تنظیمات عمومی
│   ├── تنظیمات اطلاعیه
│   └── تنظیمات حریم‌خصوصی
└── Logout Button
```

### صفحه Login (ورود)
```
اجزاء:
├── Card محتوا
│   ├── لوگو
│   ├── عنوان
│   ├── Form Fields
│   │   ├── ایمیل / نام‌کاربری
│   │   └── رمزعبور
│   ├── دکمه ورود
│   ├── لینک فراموشی رمز
│   └── لینک ثبت‌نام
└── Background Effects (orbs, grid)
```

---

## 🌍 Layout و Spacing

### Breakpoints (نقاط تغییر)
```
Mobile:   < 640px   (پایه/بهینه)
Tablet:   640-1024px (بهبودهای متعادل)
Desktop:  > 1024px   (اثرات کامل)
```

### Spacing System
```
xs: 4px   (0.25rem)
sm: 8px   (0.5rem)
md: 16px  (1rem)
lg: 24px  (1.5rem)
xl: 32px  (2rem)
2xl: 48px (3rem)
3xl: 64px (4rem)
```

### Container & Grid
```
Max Width: 1400px
Grid Gaps: 
  ├── Mobile:  16px
  ├── Tablet:  24px
  └── Desktop: 32px
```

---

## 🔀 انتقال‌ها و State‌ها

### Button States
```
Default:   رنگ عادی، مکان‌نما تغییر
Hover:     تغییر رنگ + scale کوچک
Active:    scale(0.98) - فشار ملایم
Focus:     حلقه outline 2px (بنفش - دسترسی‌پذیری)
Disabled:  opacity کاهش + مکان‌نما نه‌دست
```

### Input/Form States
```
Default:   حاشیه سفید/0.2 - متن placeholder
Focus:     حاشیه سفید/0.5 + ring بنفش
Error:     حاشیه قرمز + رنگ خطا
Success:   حاشیه سبز + رنگ موفقیت
Disabled:  background خاکستری + opacity کم
```

### Card States
```
Default:   حاشیه سفید/0.1 - shadow ملایم
Hover:     elevation بالا - shadow گسترده‌تر
Active:    scale(0.98) - background روشن‌تر
```

---

## ♿ دسترسی‌پذیری (Accessibility)

### WCAG Compliance
```
✓ Semantic HTML (استفاده از تگ‌های معنایی)
✓ Focus States (على تمام اجزای تعاملی)
✓ Color Contrast ≥ 4.5:1 (WCAG AA)
✓ Reduced Motion Support (@media prefers-reduced-motion)
✓ Touch Targets ≥ 44px (برای موبایل)
✓ Keyboard Navigation (tab order مناسب)
✓ ARIA Labels (جایی که لازم باشد)
```

### کلیدهای صفحه‌کلید
```
Tab:      ناوبری بین اجزاء
Enter:    فعال‌کردن دکمه / form submission
Escape:   بستن modal / dropdown
Arrow Keys: ناوبری داخل بخش‌های خاص
```

---

## 🎬 میکروتعاملات (Micro-interactions)

### Hover Effects
```
Glass Panels:  translateY(-4px) + glow shadow
Buttons:       color change + slight scale
Links:         underline + color shift
Icons:         rotate/scale + glow
Cards:         elevation + soft shadow
```

### Scroll Interactions
```
Reveal Animation:  fade-in + slide-up (staggered)
Parallax (اختیاری): slight background move
Progress Bars:     width animate smooth + glow
```

### Loading States
```
Skeleton:      pulse animation + gray gradient
Spinner:       rotating circle + gradient
Progress:      bar width animate + glow
Typing:        dots fade in/out
```

---

## 📚 کتابخانه‌های طراحی

### Lucide Icons
```
استفاده برای: UI controls, navigation, indicators
سایز: 20px (مقدار پیش‌فرض)
رنگ: inherit (از رنگ والد)
```

### React Icons
```
استفاده برای: Social icons, alt representations
سایز: 24px
رنگ: inherit
```

### Recharts
```
استفاده برای: نمودارها و داده‌های بصری
تم: تاریک
رنگ‌ها: gradient بنفش→آبی
```

---

## 📱 موبایل با بهینه‌سازی

### تعدیل‌های موبایل
```
✓ Reduced animation speed: 1.3x slowdown
✓ Glass hover: 2px instead of 4px translateY
✓ Grid animation: 30s instead of 20s
✓ Orb breathing: slower (8-11s instead of 7-9s)
✓ Font size: clamp() برای responsiveness
✓ Touch friendly: padding بزرگ‌تر
✓ Tap targets: حداقل 48px
```

### Dark Mode Adjustments
```
Opacity نرم‌افزار:
  ├── White: 0.04 (borders) → 0.12 (hover)
  ├── Black: 0.3 (dark overlay)
  └── Colors: 0.02-0.18 (gradient & glow)
```

---

## 🗂️ ساختار فایل‌ها

```
src/
├── pages/
│   ├── Home.jsx              ← صفحه فرود
│   ├── Dashboard.jsx         ← داشبورد
│   ├── Goals.jsx             ← مدیریت اهداف
│   ├── Tasks.jsx             ← مدیریت تسک‌ها
│   ├── AiChat.jsx            ← چت AI
│   ├── Login.jsx             ← صفحه ورود
│   ├── Profile.jsx           ← پروفایل کاربر
│   ├── ProfileDropdown.jsx   ← منوی dropdown
│   └── NotFound.jsx          ← صفحه 404
├── components/
│   ├── ChatArea.jsx          ← محتوای چت
│   ├── ChatSidebar.jsx       ← sidebar چت
│   ├── DashboardSidebar.jsx  ← sidebar داشبورد
│   ├── FeatureCard.jsx       ← کارت ویژگی
│   ├── GoalCard.jsx          ← کارت هدف
│   ├── GrowthAnalytics.jsx   ← نمودار رشد
│   ├── StatCard.jsx          ← کارت آمار
│   └── TaskItem.jsx          ← آیتم تسک
├── data/
│   ├── goals.js              ← داده‌های هدف
│   └── tasks.js              ← داده‌های تسک
├── api/
│   └── client.js             ← Axios client
├── router/
│   └── AppRouter.jsx         ← تعریف مسیرها
├── App.jsx                   ← اجزای اصلی
├── main.jsx                  ← entry point
├── index.css                 ← طراحی global
```

---

## 🔧 CSS Variables (متغیرهای CSS)

```css
:root {
  /* Colors */
  --color-bg-primary: #0d1117;
  --color-bg-secondary: #161b22;
  --color-bg-tertiary: #21262d;
  
  /* Gradients */
  --color-gradient-start: #a855f7;
  --color-gradient-end: #22d3ee;
  
  /* Text */
  --color-text-primary: #ffffff;
  --color-text-secondary: #8b949e;
  --color-text-muted: #6e7681;
  
  /* Lighting */
  --color-orb-primary: #6366f1;
  --color-orb-secondary: #a855f7;
  
  /* Timing */
  --timing-subtle: cubic-bezier(0.4, 0.0, 0.2, 1);
  --timing-smooth: cubic-bezier(0.34, 1.56, 0.64, 1);
  --timing-controlled: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  /* Durations */
  --duration-fast: 200ms;
  --duration-base: 350ms;
  --duration-slow: 600ms;
}
```

---

## 📋 Tailwind Classes

### Custom Classes
```
.glass               ← panel شیشه مات
.gradient-text      ← متن گرادیان جنبشی
.orb                ← effect نورپردازی
.hover-lift         ← بلند شدن روی hover
.section-divider    ← خط جدای بندی
.scroll-reveal      ← انیمیشن ورود
.mouse-glow         ← اثر نور دنبال‌کن
```

### Color Classes
```
.bg-color-bg-primary      ← bg-[#0d1117]
.bg-color-bg-secondary    ← bg-[#161b22]
.text-color-text-primary  ← text-[#ffffff]
```

### Font Classes
```
.font-dinnext      ← DINNextArabic
.font-vazir        ← Vazirmatn
```

---

## 🎭 Pattern‌ها و بهترین شیوه‌ها

### DO ✓
```
✓ Subtle animations (breathing, fades)
✓ Generous white space
✓ Consistent depth (glass + orbs + shadows)
✓ Purposeful gradients
✓ Crystal clear hierarchy
✓ Smooth timing functions
✓ Accessible focus states
✓ Progressive enhancement
```

### DON'T ✗
```
✗ Neon abuse (رنگ‌های متعادل)
✗ Visual chaos (عناصر حداقل)
✗ Gaming effects (حرفه‌ای، بازی‌وار نیست)
✗ Aggressive motion (حرکات چند)
✗ Ignore accessibility
✗ Hard contrasts
✗ Flashing/strobing
✗ Auto-playing media
```

---

## 📊 Performance Guidelines

### بهینه‌سازی‌ها
```
✓ استفاده از will-change برای انیمیشن‌ها
✓ transform/opacity برای smooth animation
✓ Lazy loading برای تصاویر
✓ Code splitting با React Router
✓ CSS-in-JS جایی که مناسب است
✓ Minimize re-renders
✓ Optimize bundles
```

---

## 🚀 راه‌اندازی و Deploy

### Development
```bash
npm install
npm run dev
# Server: http://localhost:5173
```

### Production Build
```bash
npm run build
npm run preview
```

### Linting
```bash
npm run lint
```

---

## 🎯 خلاصه

**RE-AKT** یک پلتفرم توسعه شخصی پیشرفته است که:

- **زبان**: فارسی با RTL کامل
- **طراحی**: تاریک، پریمیوم، هوشمند
- **رنگ‌ها**: بنفش/آبی گرادیان بر روی زمینه تاریک
- **انیمیشن‌ها**: ملایم، تنفس‌دار، طبیعی
- **دسترسی‌پذیری**: WCAG AA حداقل
- **موبایل**: Responsive از صفر
- **عملکرد**: بهینه برای تجربه روان

---

**نسخه آخری**: ۱.۰  
**آخرین به‌روزرسانی**: فوریه ۲۰۲۶
