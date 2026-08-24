# APEX Mock Mode | Testing Guide
**Version:** 1.0  
**Status:** Ready for Testing  
**Last Updated:** August 19, 2026

---

## 📋 Quick Start

The APEX frontend is fully functional with Mock mode enabled by default. No backend required for development and testing.

### Default Configuration
```
VITE_USE_MOCK=true
VITE_MOCK_SCENARIO=success
Login credentials: test@example.com / password123
```

### Start Development Server
```bash
npm install
npm run dev
```

Then navigate to `http://localhost:5173` and login with test credentials.

---

## 🧪 Test Scenarios

### Scenario 1: Full Success (Default)
**Configuration:**
```env
VITE_USE_MOCK=true
VITE_MOCK_SCENARIO=success
```

**What Works:**
- ✅ Login with email/password
- ✅ Google OAuth (mocked)
- ✅ OTP flow (code: 123456)
- ✅ Dashboard with 5 sample tasks
- ✅ 3 sample goals
- ✅ Full CRUD on goals and tasks
- ✅ Profile view and edit
- ✅ Growth analytics with 12-month data
- ✅ AI plan generation
- ✅ Session persistence

**Test Flow:**
```
1. Open http://localhost:5173
2. Click "ورود" (Login)
3. Enter credentials: test@example.com / password123
4. Click "ورود به apex"
5. Explore Dashboard, Goals, Tasks, Growth, AI Chat
6. Refresh page → you stay logged in ✅
7. Logout → session cleared ✅
```

---

### Scenario 2: Empty Data Testing
**Configuration:**
```env
VITE_USE_MOCK=true
VITE_MOCK_SCENARIO=empty
```

**What Works:**
- ✅ Login succeeds
- ✅ Dashboard shows no tasks
- ✅ Goals page is empty
- ✅ Tasks page is empty
- ✅ Growth analytics are empty
- ✅ Can still ADD new goals/tasks (they appear immediately)

**Test Flow:**
```
1. Set VITE_MOCK_SCENARIO=empty
2. Refresh page
3. Login with credentials
4. Dashboard shows: "تسکی برای نمایش وجود ندارد"
5. Go to Goals → Show empty state
6. Click "افزودن هدف جدید" → Create a goal
7. Goal appears in list immediately ✅
8. Goal persists on page reload ✅
```

**Use Case:** Test empty state UIs, test create operations from scratch.

---

### Scenario 3: Error Handling
**Configuration:**
```env
VITE_USE_MOCK=true
VITE_MOCK_SCENARIO=error
```

**What Happens:**
- ❌ Login throws error: "خطای شبیه‌سازی‌شدهٔ Mock..."
- ❌ Any API call fails with 503 error
- ✅ Error messages display properly
- ✅ Retry logic works (if implemented)

**Test Flow:**
```
1. Set VITE_MOCK_SCENARIO=error
2. Refresh page
3. Try to login → Error message appears
4. Check console for error object
5. Verify error has .status = 503
6. Test error boundary displays properly
```

**Use Case:** Test error handling, loading states, retry buttons.

---

## 🔐 Authentication Testing

### Email/Password Login (Mock Credentials)
**Test Account:**
```
Email:    test@example.com
Password: password123
```

**Test Cases:**
```
✅ Login with correct credentials → Success
❌ Login with wrong password → Error: "ایمیل یا رمز عبور آزمایشی درست نیست."
❌ Login with wrong email → Error: "ایمیل یا رمز عبور آزمایشی درست نیست."
✅ Custom name during login → Updates user.friendly_name
✅ Session persists on page reload
```

### Google OAuth (Mocked)
**Test Cases:**
```
✅ Click Google login button
✅ Google credential accepted
✅ Login succeeds (mocked credential flow)
❌ No credential → Error displayed
```

### OTP/SMS Authentication
**Test Code:**
```
Phone: 09123456789 (any number in this format)
OTP Code: 123456
```

**Test Cases:**
```
✅ Valid phone format (09xxxxxxxxx) → OTP sent
✅ Show debug code: 123456
✅ Verify with code 123456 → Success
❌ Verify with wrong code → Error: "کد آزمایشی ۱۲۳۴۵۶ است."
✅ Session created after OTP verification
```

### Session Management
**Test Cases:**
```
✅ Login → Session saved to localStorage
✅ Reload page → User stays logged in (session restored)
✅ Open in new tab → Shared session across tabs
✅ Clear localStorage → Logout happens
✅ Logout button → Session cleared
❌ Access protected page without session → Redirect to login
```

---

## 📝 Goals CRUD Testing

### Create Goal
**Test Data:**
```javascript
{
  title: "یادگیری React",
  category: "مهارت",
  deadline: "2026-12-25",
  description: "تسلط کامل بر React و Hooks",
  priority: "بالا",
  progress: 0
}
```

**Test Cases:**
```
✅ Create with all fields → Goal appears in list
✅ Create with minimal fields → Defaults applied (category: "عمومی", priority: "متوسط")
✅ Goal ID is unique → createId("goal") generates UUID-like IDs
✅ Goal persists on page reload
✅ Goal appears at top of list (newest first)
✅ Error if title is missing → Validation error (UI side)
```

### Read Goals
**Test Cases:**
```
✅ GET /goals returns user's goals only (filtered by userId)
✅ Display 3 sample goals from seed
✅ Show sub_goals information (description, priority, progress)
✅ Show deadline in card
✅ Empty state when scenario=empty
❌ Error state when scenario=error
```

### Update Goal
**Test Cases:**
```
✅ Change title → Persists
✅ Change category → Persists
✅ Change deadline → Persists
✅ Update progress value → Persists
✅ Complete goal (is_completed: true) → Visual change
✅ Update only some fields → Other fields unchanged
❌ Update non-existent goal → Error: "هدف پیدا نشد."
```

**How to test:**
1. Go to Goals page
2. Click on any goal to edit
3. Change values
4. Click save
5. Verify changes appear
6. Refresh page → Changes persist ✅

### Delete Goal
**Test Cases:**
```
✅ Delete goal → Removed from list immediately
✅ Delete persists on reload
✅ Deleted goal cannot be recovered (no undo)
❌ Delete non-existent goal → Error: "هدف پیدا نشد."
✅ Related tasks remain (they just lose related_goal reference)
```

**How to test:**
1. Go to Goals page
2. Click delete button on any goal
3. Verify goal is removed
4. Refresh page → Still gone ✅

---

## ✅ Tasks CRUD Testing

### Create Task
**Test Data:**
```javascript
{
  title: "مطالعه React Hooks",
  related_goal: "goal-1",
  category: "مهارت",
  duration_minutes: 45,
  priority: "بالا",
  due_date: "2026-08-20",
  is_completed: false
}
```

**Test Cases:**
```
✅ Create with all fields → Task appears in dashboard
✅ Create with minimal fields → Defaults applied
✅ Task appears in Dashboard "تسک‌های امروز" if due_date = today
✅ Task persists on page reload
✅ Can complete task (is_completed: true) → Visual strikethrough
✅ Completed tasks hide from "to-do" list but count in progress bar
```

### Read Tasks
**Test Cases:**
```
✅ Dashboard shows today's tasks
✅ Tasks page shows all tasks
✅ Display 5 sample tasks from seed
✅ Show related_goal title (if linked)
✅ Show duration in minutes
✅ Show priority badge
✅ Show completion checkbox
❌ Error state when scenario=error
```

### Update Task
**Test Cases:**
```
✅ Mark complete/incomplete → Progress bar updates
✅ Change title → Persists
✅ Change priority → Persists
✅ Change duration → Persists
✅ Unlink from goal (set related_goal: null) → Persists
```

### Delete Task
**Test Cases:**
```
✅ Delete task → Removed immediately
✅ Delete persists on reload
✅ Progress bar recalculates
```

### Clear Today's Tasks
**Test Cases:**
```
✅ "پاک کردن تسک‌های امروز" button → Deletes current user's tasks
✅ Only logged-in user's tasks deleted
✅ Persists on reload
```

---

## 👤 Profile Testing

### View Profile
**Test Cases:**
```
✅ GET /profile returns logged-in user's profile
✅ Display name, friendly_name, email
✅ Display learning_style, focus_span_minutes
✅ Display coach_persona, daily_screen_time, age, gender
✅ Profile matches seed data
```

### Edit Profile
**Test Data:**
```javascript
{
  name: "نام جدید",
  friendly_name: "نام نمایشی",
  learning_style: "auditory",
  focus_span_minutes: 60,
  age: 25
}
```

**Test Cases:**
```
✅ Update name → User profile updated
✅ Update friendly_name → Persists
✅ Update all fields → All persist
✅ Profile syncs to Goals authored by user (name updates there too)
✅ Changes visible after page reload
❌ Update non-existent user → Error
```

---

## 📊 Growth Analytics Testing

### View Analytics
**Test Cases:**
```
✅ Display 4 stat cards (Growth Score, Focus Hours, Mental Clarity, Goals Hit)
✅ Show growth data chart (12 months of data)
✅ Display 3 insights about user growth
✅ Chart shows three lines: growth, productivity, mindfulness
✅ Stat cards show percentage change with color coding
```

**Test Data (from seed):**
```javascript
statCards: [
  { label: "امتیاز رشد", value: "۹۲", change: "+۱۲٪", color: "#a855f7" },
  { label: "ساعات تمرکز", value: "۶.۴h", change: "+۱۸٪", color: "#22d3ee" },
  // ... more cards
]

growthData: [
  { month: "فروردین", growth: 35, productivity: 40, mindfulness: 28 },
  // ... 12 months
]

insights: [
  { title: "استمرار رشد", description: "...", icon: "🔥" },
  // ... 3 insights
]
```

### Test Cases:
```
✅ Load analytics → Display all 4 stat cards
✅ Render chart with 12 data points
✅ Click insight card → Expand/collapse animation
✅ Chart responsive on mobile
❌ Error scenario → Display error message
✅ Empty scenario → Show empty state
```

---

## 💬 AI Chat / Plan Generation Testing

### Generate Plan
**Test Cases:**
```
✅ Enter prompt: "برنامه‌ای برای یادگیری React"
✅ Click send
✅ AI response generated with task list
✅ Response format: { id, userId, title, date, completion: 0, tasks: [], message }
✅ Plan persists (shows up on next visit if stored)
✅ Can delete or re-generate plans
```

**Mock Response Example:**
```javascript
{
  title: "برنامه برای: یادگیری React",
  date: "2026-08-19",
  tasks: [
    "یک هدف کوچک و مشخص انتخاب کن",
    "۴۵ دقیقه تمرکز بدون حواس‌پرتی",
    "پایان روز پیشرفتت را مرور کن"
  ],
  message: "برای «یادگیری React» یک برنامه عملی آماده شد:\n۱. ...\n۲. ...\n۳. ..."
}
```

### Test Cases:
```
✅ Send empty message → Ignored (no request sent)
✅ Send message → Message appears in chat
✅ Wait for AI response → Loading state shown
✅ Response appears → Chat history maintained
✅ Multiple turns in same session
✅ Create new chat session
✅ Chat history persists (basic, in-memory)
```

---

## 🔄 Session & Storage Testing

### Session Persistence
```bash
# Test via console
1. Login → Inspect localStorage
2. Find key "apex.session"
3. Value format: { "token": "mock-apex-user-1", "user": { "id": "user-1", "name": "..." } }
4. Reload page → Session restored ✅
5. Clear localStorage → Logout happens
```

### Mock Data Storage
```bash
# Test mock store
1. After login, create/update goals and tasks
2. Inspect localStorage key "apex.mock-data.v1"
3. Contains: { users, profiles, goals, tasks, plans, growthAnalytics }
4. Modify localStorage directly → Frontend reflects changes on reload
5. This allows manual testing of edge cases
```

### Reset to Defaults
```javascript
// In browser console:
import { resetMockStore } from './src/mock/store.js';
resetMockStore(); // Clears all changes and resets to seed data
// Page should show original sample data after reload
```

---

## 🚀 Performance Testing

### Load Time (Mock Mode)
```
✅ First page load: <1s (all data from localStorage)
✅ Navigation between pages: <100ms (instant)
✅ Create/Update/Delete operations: <500ms (includes 250ms mock delay)
```

### Memory Usage
```
Mock data size (localStorage): ~15KB compressed
Session storage: ~200 bytes
Total footprint: Small, suitable for low-end devices
```

### Concurrent Operations
```
✅ Multiple goals creation in quick succession
✅ Multiple tab interaction (shared localStorage)
✅ Rapid navigation between pages
```

---

## 🔍 Debugging with Mock

### View Current Configuration
```javascript
// In browser console:
import { appConfig, isMockMode } from './src/config/env.js';
console.log({ appConfig, isMockMode });
// Output: { useMock: true, apiBaseUrl: "...", mockScenario: "success", isMockMode: true }
```

### View Current Session
```javascript
import { getSession } from './src/services/storage.js';
const session = getSession();
console.log(session);
// Output: { token: "mock-apex-user-1", user: { id: "user-1", ... } }
```

### View Mock Store Contents
```javascript
import { readMockStore } from './src/mock/store.js';
const store = readMockStore();
console.log({ 
  users: store.users.length,
  goals: store.goals.length,
  tasks: store.tasks.length,
  plans: store.plans.length
});
```

### Manually Modify Mock Data
```javascript
import { updateMockStore } from './src/mock/store.js';
updateMockStore((store) => {
  // Add a new goal
  store.goals.push({
    id: "goal-test",
    userId: "user-1",
    title: "Test Goal",
    // ... rest of schema
  });
  return store;
});
// Reload page to see changes
```

---

## ✅ Checklist: All Tests Pass

Run through this checklist to verify mock mode is working correctly:

### Authentication (20 min)
- [ ] Login with correct credentials
- [ ] Login with wrong password shows error
- [ ] Custom name updates user profile
- [ ] Google login button works (mocked)
- [ ] OTP flow sends and verifies with code 123456
- [ ] Session persists after page reload
- [ ] Logout clears session

### Dashboard (10 min)
- [ ] Dashboard loads with 5 sample tasks
- [ ] Progress bar shows correct percentage
- [ ] Complete/uncomplete task updates progress
- [ ] Weekly progress displayed
- [ ] Stat cards show correct values

### Goals (15 min)
- [ ] Goals page shows 3 sample goals
- [ ] Create goal adds to list at top
- [ ] Update goal works
- [ ] Delete goal removes from list
- [ ] Goals persist on reload
- [ ] Empty state shows when VITE_MOCK_SCENARIO=empty

### Tasks (15 min)
- [ ] Tasks show in Dashboard
- [ ] Create task from Goals page
- [ ] Create task from Tasks page
- [ ] Update task works
- [ ] Delete task works
- [ ] Mark task complete/incomplete
- [ ] Clear today's tasks works

### Profile (10 min)
- [ ] View profile shows user data
- [ ] Edit profile saves changes
- [ ] Changes persist on reload
- [ ] User name updates in Navbar

### Growth Analytics (5 min)
- [ ] Analytics page loads
- [ ] Chart displays with 12 months
- [ ] Stat cards displayed
- [ ] Insights expand/collapse
- [ ] Empty state works

### AI Chat (5 min)
- [ ] Send message works
- [ ] AI response appears
- [ ] Multiple turns in one session
- [ ] Create new chat

### Error Scenarios (10 min)
- [ ] Set VITE_MOCK_SCENARIO=error
- [ ] Try any action → Error shown
- [ ] Error message displays properly
- [ ] Set back to VITE_MOCK_SCENARIO=success
- [ ] Everything works again

---

## 📝 Reporting Issues

If you find issues during testing:

1. **Note Configuration:**
   - VITE_USE_MOCK value
   - VITE_MOCK_SCENARIO value
   - Browser and OS

2. **Steps to Reproduce:**
   - Exact steps that caused the issue
   - Data used (goals/tasks created)

3. **Expected vs Actual:**
   - What should happen
   - What actually happened

4. **Browser Console:**
   - Any errors in console?
   - Screenshot of error

5. **localStorage State:**
   - Run debugging commands above
   - Share relevant data

---

## 🎯 Success Criteria

Mock mode is working correctly when:

✅ All 7 main features work without errors  
✅ Data persists across page reloads  
✅ Login/logout works reliably  
✅ CRUD operations work for goals and tasks  
✅ Growth analytics display correctly  
✅ Error scenarios handled gracefully  
✅ Session management works across tabs  
✅ Performance is fast (<500ms per operation)

---

**Test Document Version:** 1.0  
**Last Updated:** August 19, 2026  
**Status:** Ready for UAT and QA Testing
