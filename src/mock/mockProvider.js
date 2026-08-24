import { appConfig } from "../config/env";
import { buildDashboardSummary } from "../services/dashboardMetrics";
import { readMockStore, updateMockStore } from "./store";

const wait = () => new Promise((resolve) => window.setTimeout(resolve, 250));
const clone = (value) => JSON.parse(JSON.stringify(value));
const publicUser = ({ password, ...user }) => user;

const createError = (message, status = 400) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const createId = (prefix) =>
  `${prefix}-${globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`}`;

const run = async (handler) => {
  await wait();
  if (appConfig.mockScenario === "error") {
    throw createError("خطای شبیه‌سازی‌شدهٔ Mock. مقدار VITE_MOCK_SCENARIO را بررسی کنید.", 503);
  }
  return handler();
};

const getUserId = (token) => {
  if (!token?.startsWith("mock-apex-")) throw createError("نشست ورود معتبر نیست.", 401);
  const userId = token.slice("mock-apex-".length);
  const user = readMockStore().users.find((item) => item.id === userId);
  if (!user) throw createError("کاربر پیدا نشد.", 401);
  return userId;
};

const makeSession = (user) => ({
  token: `mock-apex-${user.id}`,
  user: publicUser(user),
});

const getGoalsForUser = (store, userId) => store.goals.filter((goal) => goal.userId === userId);
const getTasksForUser = (store, userId) => store.tasks.filter((task) => task.userId === userId);

export const mockProvider = {
  async login({ email, password, name }) {
    return run(() => {
      const store = readMockStore();
      const user = store.users.find((item) => item.email.toLowerCase() === String(email || "").trim().toLowerCase());
      if (!user || user.password !== password) {
        throw createError("ایمیل یا رمز عبور آزمایشی درست نیست.", 401);
      }

      if (name?.trim() && user.name !== name.trim()) {
        updateMockStore((next) => {
          const target = next.users.find((item) => item.id === user.id);
          target.name = name.trim();
          next.profiles[user.id] = { ...next.profiles[user.id], name: name.trim() };
          return next;
        });
        user.name = name.trim();
      }

      return makeSession(user);
    });
  },

  async authGoogleCredential() {
    return run(() => makeSession(readMockStore().users[0]));
  },

  async authOtpSend() {
    return run(() => ({ message: "کد آزمایشی ارسال شد.", debug_code: "123456" }));
  },

  async authOtpVerify(_phone, code) {
    return run(() => {
      if (String(code).trim() !== "123456") throw createError("کد آزمایشی ۱۲۳۴۵۶ است.", 401);
      return makeSession(readMockStore().users[0]);
    });
  },

  async getGoals(token) {
    return run(() => {
      const userId = getUserId(token);
      if (appConfig.mockScenario === "empty") return [];
      return clone(getGoalsForUser(readMockStore(), userId));
    });
  },

  async createGoal(payload, token) {
    return run(() => {
      const userId = getUserId(token);
      const goal = {
        id: createId("goal"),
        userId,
        title: payload.title,
        category: payload.category || "عمومی",
        deadline: payload.deadline || null,
        is_completed: false,
        createdAt: new Date().toISOString(),
        sub_goals: {
          description: payload.description || "بدون توضیح",
          priority: payload.priority || payload.category || "متوسط",
          progress: Number(payload.progress) || 0,
        },
      };
      updateMockStore((store) => {
        store.goals.unshift(goal);
        return store;
      });
      return clone(goal);
    });
  },

  async updateGoal(id, payload, token) {
    return run(() => {
      const userId = getUserId(token);
      let updated;
      updateMockStore((store) => {
        const index = store.goals.findIndex((goal) => goal.id === id && goal.userId === userId);
        if (index < 0) throw createError("هدف پیدا نشد.", 404);
        const current = store.goals[index];
        updated = {
          ...current,
          ...payload,
          sub_goals: { ...current.sub_goals, ...(payload.sub_goals || {}) },
        };
        store.goals[index] = updated;
        return store;
      });
      return clone(updated);
    });
  },

  async deleteGoal(id, token) {
    return run(() => {
      const userId = getUserId(token);
      updateMockStore((store) => {
        const exists = store.goals.some((goal) => goal.id === id && goal.userId === userId);
        if (!exists) throw createError("هدف پیدا نشد.", 404);
        store.goals = store.goals.filter((goal) => goal.id !== id);
        return store;
      });
      return null;
    });
  },

  async getTasks(token) {
    return run(() => {
      const userId = getUserId(token);
      if (appConfig.mockScenario === "empty") return [];
      return clone(getTasksForUser(readMockStore(), userId));
    });
  },

  async createTask(payload, token) {
    return run(() => {
      const userId = getUserId(token);
      const task = {
        id: createId("task"),
        userId,
        title: payload.title,
        related_goal: payload.related_goal || null,
        category: payload.category || "عمومی",
        duration_minutes: Number(payload.duration_minutes) || 0,
        priority: payload.priority || "متوسط",
        due_date: payload.due_date || new Date().toISOString().slice(0, 10),
        is_completed: Boolean(payload.is_completed),
      };
      updateMockStore((store) => {
        store.tasks.unshift(task);
        return store;
      });
      return clone(task);
    });
  },

  async updateTask(id, payload, token) {
    return run(() => {
      const userId = getUserId(token);
      let updated;
      updateMockStore((store) => {
        const index = store.tasks.findIndex((task) => task.id === id && task.userId === userId);
        if (index < 0) throw createError("تسک پیدا نشد.", 404);
        updated = { ...store.tasks[index], ...payload };
        store.tasks[index] = updated;
        return store;
      });
      return clone(updated);
    });
  },

  async deleteTask(id, token) {
    return run(() => {
      const userId = getUserId(token);
      updateMockStore((store) => {
        const exists = store.tasks.some((task) => task.id === id && task.userId === userId);
        if (!exists) throw createError("تسک پیدا نشد.", 404);
        store.tasks = store.tasks.filter((task) => task.id !== id);
        return store;
      });
      return null;
    });
  },

  async clearTodayTasks(token) {
    return run(() => {
      const userId = getUserId(token);
      updateMockStore((store) => {
        store.tasks = store.tasks.filter((task) => task.userId !== userId);
        return store;
      });
      return null;
    });
  },

  async getProfile(token) {
    return run(() => {
      const userId = getUserId(token);
      return clone(readMockStore().profiles[userId]);
    });
  },

  async updateProfile(payload, token) {
    return run(() => {
      const userId = getUserId(token);
      let profile;
      updateMockStore((store) => {
        profile = { ...store.profiles[userId], ...payload };
        store.profiles[userId] = profile;
        const user = store.users.find((item) => item.id === userId);
        if (user) Object.assign(user, { name: profile.name, friendly_name: profile.friendly_name });
        return store;
      });
      return clone(profile);
    });
  },

  async generatePlan(payload, token) {
    return run(() => {
      const userId = getUserId(token);
      const prompt = String(payload?.prompt || "").trim();
      const plan = {
        id: createId("plan"),
        userId,
        title: prompt ? `برنامه برای: ${prompt.slice(0, 48)}` : "برنامه روزانه",
        date: new Date().toISOString().slice(0, 10),
        completion: 0,
        tasks: ["یک هدف کوچک و مشخص انتخاب کن", "۴۵ دقیقه تمرکز بدون حواس‌پرتی", "پایان روز پیشرفتت را مرور کن"],
      };
      updateMockStore((store) => {
        store.plans.unshift(plan);
        return store;
      });
      return {
        ...clone(plan),
        message: `برای «${prompt || "امروز"}» یک برنامه عملی آماده شد:\n۱. ${plan.tasks[0]}\n۲. ${plan.tasks[1]}\n۳. ${plan.tasks[2]}`,
      };
    });
  },

  async getDashboard(token) {
    return run(() => {
      const userId = getUserId(token);
      const store = readMockStore();
      const goals = appConfig.mockScenario === "empty" ? [] : getGoalsForUser(store, userId);
      const tasks = appConfig.mockScenario === "empty" ? [] : getTasksForUser(store, userId);
      return buildDashboardSummary({ goals, tasks });
    });
  },

  async getGrowthAnalytics(token) {
    return run(() => {
      getUserId(token);
      if (appConfig.mockScenario === "empty") {
        return { statCards: [], growthData: [], insights: [] };
      }
      return clone(readMockStore().growthAnalytics);
    });
  },
};
