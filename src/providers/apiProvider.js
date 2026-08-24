import { buildDashboardSummary } from "../services/dashboardMetrics";
import { apiRequest } from "./httpClient";

const missingContract = (feature) => {
  const error = new Error(`قرارداد API برای ${feature} هنوز مشخص نشده است.`);
  error.status = 501;
  throw error;
};

export const apiProvider = {
  // Existing frontend contracts retained from src/api/client.js.
  authGoogleCredential: (credential) =>
    apiRequest("/auth/google/credential/", { method: "POST", data: { token: credential } }),
  authGoogleCode: (code) => apiRequest("/auth/google/code/", { method: "POST", data: { code } }),
  authOtpSend: (phone) => apiRequest("/auth/otp/send/", { method: "POST", data: { phone } }),
  authOtpVerify: (phone, code) => apiRequest("/auth/otp/verify/", { method: "POST", data: { phone, code } }),

  getGoals: (token) => apiRequest("/goals/", { token }),
  createGoal: (payload, token) => apiRequest("/goals/", { method: "POST", data: payload, token, form: true }),
  updateGoal: (id, payload, token) => apiRequest(`/goals/${id}/`, { method: "PATCH", data: payload, token, form: true }),
  deleteGoal: () => missingContract("حذف هدف"),

  getTasks: (token) => apiRequest("/tasks/", { token }),
  createTask: (payload, token) => apiRequest("/tasks/", { method: "POST", data: payload, token }),
  updateTask: (id, payload, token) => apiRequest(`/tasks/${id}/`, { method: "PATCH", data: payload, token }),
  deleteTask: () => missingContract("حذف تسک"),
  clearTodayTasks: (token) => apiRequest("/tasks/clear_today/", { method: "DELETE", token }),

  getProfile: (token) => apiRequest("/profile/", { token }),
  updateProfile: (payload, token) => apiRequest("/profile/", { method: "PATCH", data: payload, token }),
  generatePlan: (payload, token) => apiRequest("/ai/generate-plan/", { method: "POST", data: payload, token }),

  async getDashboard(token) {
    const [goals, tasks] = await Promise.all([this.getGoals(token), this.getTasks(token)]);
    return buildDashboardSummary({
      goals: Array.isArray(goals) ? goals : [],
      tasks: Array.isArray(tasks) ? tasks : [],
    });
  },

  getGrowthAnalytics: () => missingContract("تحلیل رشد"),
  login: () => missingContract("ورود با ایمیل و رمز عبور"),
};
