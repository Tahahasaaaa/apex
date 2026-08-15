# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# RE-AKT

پلتفرم رشد فردی و خودشناسی مبتنی بر هوش مصنوعی — یک وب‌اپلیکیشن فارسی (راست‌به‌چپ) که به کاربر کمک می‌کند اهداف شخصی‌اش را بشناسد، برنامه‌ریزی کند، پیشرفتش را دنبال کند و از یک دستیار هوشمند برای مسیر رشد خودش راهنمایی بگیرد.

## امکانات

- **چت هوشمند (AI Chat):** گفتگو با یک دستیار هوش مصنوعی برای مشاوره و راهنمایی در مسیر رشد فردی
- **مدیریت اهداف (Goals):** تعریف، پیگیری و دسته‌بندی اهداف شخصی
- **مدیریت تسک‌ها (Tasks):** چک‌لیست روزانه برای رسیدن به اهداف
- **داشبورد:** نمای کلی از پیشرفت، امتیاز و روند فعالیت کاربر
- **پروفایل کاربری:** مدیریت اطلاعات شخصی و تنظیمات حساب
- **ورود با کد تایید (OTP):** احراز هویت ساده و امن با شماره موبایل

## تکنولوژی‌های استفاده‌شده

| بخش | ابزار |
|---|---|
| فریم‌ورک | React 19 |
| ابزار Build | Vite |
| استایل‌دهی | Tailwind CSS (با پشتیبانی RTL) |
| مسیریابی | React Router |
| ارتباط با سرور | Axios |
| آیکون | Lucide React / React Icons |
| فونت | DINNextArabic، Vazirmatn |

## پیش‌نیازها

- [Node.js](https://nodejs.org/) نسخه‌ی ۱۸ یا بالاتر
- npm (همراه Node.js نصب می‌شود)

## راه‌اندازی پروژه

```bash
# ۱. کلون کردن ریپازیتوری
git clone https://github.com/Tahahasaaaa/reakt.git
cd reakt

# ۲. نصب پکیج‌ها
npm install

# ۳. اجرای نسخه‌ی توسعه
npm run dev
```

بعد از اجرا، پروژه روی آدرسی مثل `http://localhost:5173` در دسترس خواهد بود.

### دستورات دیگر

```bash
npm run build      # ساخت نسخه‌ی نهایی برای انتشار (production)
npm run preview    # پیش‌نمایش نسخه‌ی build شده
npm run lint       # بررسی کیفیت کد با ESLint
```

## ساختار پروژه

```
src/
├── api/           # اتصال به بک‌اند (Axios client)
├── components/    # کامپوننت‌های قابل استفاده‌ی مجدد
├── pages/         # صفحات اصلی اپلیکیشن (Home, Dashboard, Goals, ...)
├── router/        # تعریف مسیرهای اپلیکیشن
├── data/          # داده‌های نمونه/mock
└── index.css      # سیستم طراحی و استایل‌های سراسری
```

## نکته درباره‌ی بک‌اند

این ریپازیتوری فقط شامل **فرانت‌اند** پروژه است. برای کارکرد کامل (لاگین، ذخیره‌سازی داده و ...)، باید سرور بک‌اند به‌صورت جداگانه روی `http://localhost:8000` در حال اجرا باشد (تنظیم‌شده در `src/api/client.js`).

## وضعیت پروژه

این پروژه در مرحله‌ی توسعه است. بخش‌های داشبورد و تحلیل رشد (Growth Analytics) در نسخه‌ی فعلی از داده‌ی نمونه استفاده می‌کنند و هنوز به بک‌اند واقعی متصل نشده‌اند.
