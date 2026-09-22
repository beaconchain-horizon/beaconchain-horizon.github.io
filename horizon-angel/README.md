# Horizon Angel — Live Demo

پیش‌نمایش زنده از قابلیت‌های Horizon Core.

## راه‌اندازی

### DEMO Mode (GitHub Pages)
هیچ تنظیمی لازم نیست. داده‌ها شبیه‌سازی می‌شن.

### PRODUCTION Mode (Liara)
در `config.js`، مقدار `liara:` را به دامنه واقعی تغییر بده.

## حالت‌های اجرا

| حالت | فعال‌سازی | Backend |
|---|---|---|
| DEMO | GitHub Pages یا `?mode=demo` | ندارد |
| LOCAL | localhost | 127.0.0.1:8080 |
| PRODUCTION | Liara یا `?mode=live` | دامنه Liara |

## فایل‌ها

- `index.html` — صفحه اصلی
- `dashboard.html` — داشبورد
- `sensors.html` — سنسورها
- `blocks.html` — بلاک‌ها
- `license.html` — لایسنس
- `admin.html` — ادمین
- `config.js` — تنظیمات
- `sw.js` — Service Worker (Air-Gap)

## © 2026 Horizon Core
