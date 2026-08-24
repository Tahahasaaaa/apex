# APEX Mock Mode | Quick Reference Card

## 🚀 Start Development (30 seconds)

```bash
npm install
npm run dev
# Login: test@example.com / password123
```

---

## 🔧 Configuration

| Variable | Value | Purpose |
|----------|-------|---------|
| `VITE_USE_MOCK` | `true` | Enable mock mode (default) |
| `VITE_MOCK_SCENARIO` | `success` | Return complete data (default) |
| `VITE_MOCK_SCENARIO` | `empty` | Return empty lists (test UI) |
| `VITE_MOCK_SCENARIO` | `error` | All requests fail (test errors) |
| `VITE_API_BASE_URL` | `http://localhost:8000` | Backend URL (when mock=false) |

---

## 🔐 Authentication

| Method | Credentials | Code |
|--------|-------------|------|
| **Email** | test@example.com / password123 | - |
| **Google** | Mocked (any credential accepted) | - |
| **OTP** | 09123456789 | 123456 |

---

## 📝 Features (All Working)

| Feature | Status | API Calls |
|---------|--------|-----------|
| Login/Auth | ✅ Complete | 4 methods |
| Goals CRUD | ✅ Complete | 4 endpoints |
| Tasks CRUD | ✅ Complete | 4 endpoints |
| Dashboard | ✅ Complete | 1 endpoint |
| Profile | ✅ Complete | 2 endpoints |
| Growth Analytics | ✅ Complete | 1 endpoint |
| AI Chat | ✅ Complete | 1 endpoint |

---

## 📂 File Structure

```
src/
├── mock/
│   ├── mockProvider.js        ← All 14 mock methods
│   ├── store.js               ← localStorage persistence
│   └── data/seed.js           ← Sample data
├── services/                  ← 7 service files
├── providers/                 ← dataProvider (magic switcher)
├── pages/                     ← 7 pages using services
└── config/env.js              ← Config loader
```

---

## 🧪 Test Scenarios

### Success (Default)
```env
VITE_MOCK_SCENARIO=success
```
All features work, complete data returned.

### Empty
```env
VITE_MOCK_SCENARIO=empty
```
Test empty state UIs, no data returned.

### Error
```env
VITE_MOCK_SCENARIO=error
```
All requests fail, test error handling.

---

## 🗄️ Mock Data

| Entity | Count | Persists |
|--------|-------|----------|
| **Users** | 1 | Yes (localStorage) |
| **Profiles** | 1 | Yes |
| **Goals** | 3 | Yes |
| **Tasks** | 5 | Yes |
| **Plans** | 0 (empty) | Yes |
| **Analytics** | 1 full set | Yes |

**Storage Keys:**
- Session: `apex.session`
- Mock Data: `apex.mock-data.v1`

---

## 🐛 Debugging

```javascript
// View config
import { appConfig, isMockMode } from './src/config/env.js';
console.log(appConfig);

// View session
import { getSession } from './src/services/storage.js';
console.log(getSession());

// View mock store
import { readMockStore } from './src/mock/store.js';
console.log(readMockStore());

// Reset to defaults
import { resetMockStore } from './src/mock/store.js';
resetMockStore();
```

---

## ✅ Quick Checks

- [ ] Mock mode enabled: `VITE_USE_MOCK=true` ✅
- [ ] Dev server running: `npm run dev` ✅
- [ ] Login works: test@example.com / password123 ✅
- [ ] Session persists: Refresh page stays logged in ✅
- [ ] Can create goals: Click "افزودن هدف جدید" ✅
- [ ] Can create tasks: Click "افزودن تسک جدید" ✅
- [ ] Analytics loads: Go to Growth page ✅
- [ ] Chat works: Go to AI Chat, send message ✅

---

## 🔄 Mode Switching

### Mock → Real Backend
```env
VITE_USE_MOCK=false
VITE_API_BASE_URL=http://your-backend:8000
VITE_GOOGLE_CLIENT_ID=your-id
```
**No code changes needed!** Services abstract the difference.

### Real Backend → Mock
```env
VITE_USE_MOCK=true
```
Falls back to mock immediately.

---

## 📋 API Endpoints (Reference)

### Auth
```
POST   /auth/login
POST   /auth/google
POST   /auth/otp/send
POST   /auth/otp/verify
POST   /auth/logout
```

### Goals
```
GET    /goals
POST   /goals
PUT    /goals/:id
DELETE /goals/:id
```

### Tasks
```
GET    /tasks
POST   /tasks
PUT    /tasks/:id
DELETE /tasks/:id
```

### Other
```
GET    /profile
PUT    /profile
GET    /dashboard
GET    /growth/analytics
POST   /plans/generate
```

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| `MOCK_SUMMARY.md` | This summary |
| `MOCK_ARCHITECTURE_AUDIT.md` | Detailed audit & API specs |
| `MOCK_TESTING_GUIDE.md` | Complete test cases |
| `.env.example` | Configuration reference |

---

## ⚡ Tips & Tricks

1. **Test Empty State**
   ```env
   VITE_MOCK_SCENARIO=empty
   ```

2. **Test Error Handling**
   ```env
   VITE_MOCK_SCENARIO=error
   ```

3. **Clear All Data**
   ```javascript
   localStorage.clear();
   location.reload();
   ```

4. **Inspect Mock Store**
   - Open DevTools → Storage → localStorage
   - Find key: `apex.mock-data.v1`

5. **Add More Test Users**
   - Edit `src/mock/data/seed.js`
   - Add to `users` array
   - Run `resetMockStore()` in console

---

## 🎯 Success Indicators

✅ Frontend works without backend  
✅ All 7 features functional  
✅ Data persists across reloads  
✅ Can test error scenarios  
✅ Easy to switch to real API  

**Status: READY FOR DEVELOPMENT** 🚀

---

**Quick Reference Version:** 1.0  
**Last Updated:** August 19, 2026
