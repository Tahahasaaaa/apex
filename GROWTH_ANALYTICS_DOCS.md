# 📊 کامپوننت تحلیل رشد شخصی

## نمای کلی

کامپوننت `GrowthAnalytics` یک صفحه تحلیل هوشمند است که رشد شخصی کاربر را به صورت تصویری نمایش می‌دهد.

## 🎨 ویژگی‌ها

### 1. **چهار کارت آمار اصلی**
- **امتیاز رشد** (Growth Score): نمایش کلی پیشرفت
- **ساعات تمرکز** (Focus Hours): زمان تمرکز عمیق
- **وضوح ذهنی** (Mental Clarity): شفافیت ذهنی
- **اهداف محقق شده** (Goals Hit): درصد انجام اهداف

هر کارت دارای:
- آیکون مرتبط
- مقدار اصلی
- درصد تغییر (مثبت)
- رنگ مختص
- انیمیشن `hover-lift` (بالا رفتن هنگام hover)

### 2. **نمودار مسیر رشد**
- 3 خط نمودار (رشد، بهره‌وری، ذهن‌آگاهی)
- داده‌های ۱۲ ماهه
- رنگ‌های: Purple (#a855f7), Cyan (#22d3ee), Indigo (#6366f1)
- Library: `recharts` برای رندریگ حرفه‌ای
- Grid و Tooltip مخصوص

### 3. **بخش بینش‌های هوشمند**
3 کارت قابل گسترش:
- **استمرار رشد**: معلومات درباره رشد مداوم
- **بهبود تمرکز عمیق**: آمار تمرکز
- **انطباق اهداف**: وضعیت انجام اهداف

هر insight:
- Icon/Emoji
- عنوان
- توضیح (نمایش با toggle)
- Hover animation

### 4. **بخش اطلاع رسانی نهایی**
پیام حاوی آیکون و متن درباره مسیر مثبت

## 📊 ساختار داده

### Stat Cards Data
```javascript
{
  id: 'growth-score',
  label: 'امتیاز رشد',
  value: '۹۲',
  change: '+۱۲٪',
  icon: TrendingUp,
  color: '#a855f7'
}
```

### Growth Chart Data
```javascript
{
  month: 'فروردین',
  growth: 35,
  productivity: 40,
  mindfulness: 28
}
```

### AI Insights Data
```javascript
{
  id: 'consistency',
  title: 'استمرار رشد',
  description: '۱۴ روز رشد مداوم...',
  icon: '🔥'
}
```

## 🎯 رنگ‌های استفاده شده

| نام | کد | استفاده |
|-----|--|----|
| Purple | #a855f7 | رشد، Stat Cards |
| Cyan | #22d3ee | بهره‌وری، Focus |
| Indigo | #6366f1 | ذهن‌آگاهی |
| Primary BG | #0d1117 | پس‌زمینه |

## 🎬 انیمیشن‌ها

1. **Scroll Reveal**: fade-in + slide-up عند رفتن به صفحه
2. **Hover Lift**: کارت‌ها بالا می‌روند
3. **Chart Animation**: خطوط نمودار با smooth movement
4. **Icon Animation**: background glow hover

## 🔧 CSS Classes

### الگو
- `.glass` - Glass morphism panels
- `.hover-lift` - Hover lift animation
- `.scroll-reveal` - Scroll reveal animation
- `.gradient-text` - Purple→Cyan gradient text

## 📝 استفاده

### Route
```javascript
// در AppRouter.jsx
<Route path="/growth" element={<RequireAuth><Growth /></RequireAuth>} />
```

### صرف Link
```jsx
import { Link } from 'react-router-dom';
<Link to="/growth">تحلیل رشد</Link>
```

## 🔄 تغییر داده‌ها

### برای تغییر داده‌های فرضی:
1. آپ `statCardsData` در بالای فایل
2. آپ `growthData` برای ماه‌های مختلف
3. آپ `aiInsightsData` برای بینش‌های جدید

### برای اتصال به API:
```javascript
// داخل component
useEffect(() => {
  // Fetch data from API
  api.getGrowthAnalytics().then(data => {
    // Set state...
  });
}, []);
```

## 📱 Responsive Design

- **Mobile**: 1 ستون (stat cards)
- **Tablet**: 2 ستون
- **Desktop**: 4 ستون (stat cards)
- **Desktop**: 3 ستون (insights)

## ♿ Accessibility

✅ Semantic HTML  
✅ Icons + Text labels  
✅ Keyboard navigation  
✅ Color contrast WCAG AA  
✅ RTL layout support  

## 🚀 Performance

- Lazy chart rendering
- Memoized data
- No unnecessary re-renders
- Smooth 60fps animations

## 🎨 طراحی مطابقت

- ✅ رنگ‌های سیستم طراحی
- ✅ انیمیشن‌های smooth
- ✅ Glass morphism
- ✅ RTL layout
- ✅ Dark mode only

## 📦 Dependencies

- `recharts@2.x` - نمودارها
- `lucide-react` - Icons
- `tailwindcss` - Styling
- `react-router-dom` - Routing

## ⚠️ نکات مهم

1. داده‌ها فرضی هستند - بعداً می‌تونید از API تغذیه کنید
2. تمام متن‌ها فارسی هستند
3. براي تغییر رنگ‌ها، CSS variables در `index.css` رو update کنید
4. Animation timings قابل تنظیم هستند

---

**نسخه:** 1.0  
**آخرین بروزرسانی:** فروردین ۱۴۰۳  
**وضعیت:** پروداکشن رده‌ای
