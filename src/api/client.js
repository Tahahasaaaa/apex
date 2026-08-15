const BASE_URL = "http://localhost:8000";
const TOKEN_KEY = "authToken";

const normalizeToken = (value) => {
  if (!value) return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  const withoutAuth = trimmed.replace(/^Authorization:\s*/i, "");
  return withoutAuth.replace(/^Bearer\s+/i, "").trim();
};

export const getAuthToken = () => normalizeToken(localStorage.getItem(TOKEN_KEY) || "");

export const setAuthToken = (token) => {
  const normalized = normalizeToken(token);
  if (normalized) {
    localStorage.setItem(TOKEN_KEY, normalized);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
};

const buildUrl = (path) => {
  if (!path) return BASE_URL;
  if (path.startsWith("http")) return path;
  return `${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
};

export const apiRequest = async (path, options = {}) => {
  const { method = "GET", data, token, headers, signal, form } = options;
  const isFormData = typeof FormData !== "undefined" && data instanceof FormData;
  const shouldFormEncode = Boolean(form) && !isFormData && data && typeof data === "object";
  const hasBody = data !== undefined && data !== null;
  const authToken = token === undefined ? getAuthToken() : token;
  const bodyPayload = hasBody
    ? isFormData
      ? data
      : shouldFormEncode
        ? new URLSearchParams(
            Object.entries(data).reduce((acc, [key, value]) => {
              if (value === undefined || value === null) return acc;
              acc.push([key, String(value)]);
              return acc;
            }, [])
          )
        : JSON.stringify(data)
    : undefined;

  const response = await fetch(buildUrl(path), {
    method,
    headers: {
      ...(isFormData || shouldFormEncode ? {} : { "Content-Type": "application/json" }),
      ...(shouldFormEncode ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...headers,
    },
    body: bodyPayload,
    signal,
  });

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      (payload && payload.detail) ||
      (payload && payload.message) ||
      (typeof payload === "string" ? payload : "درخواست ناموفق بود.");
    const error = new Error(message);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
};

export const api = {
  authGoogleCredential: (credential) =>
    apiRequest("/auth/google/credential/", {
      method: "POST",
      data: { token: credential },
      token: null,
    }),
  authGoogleCode: (code) =>
    apiRequest("/auth/google/code/", {
      method: "POST",
      data: { code },
      token: null,
    }),
  authOtpSend: (phone) =>
    apiRequest("/auth/otp/send/", {
      method: "POST",
      data: { phone },
      token: null,
    }),
  authOtpVerify: (phone, code) =>
    apiRequest("/auth/otp/verify/", {
      method: "POST",
      data: { phone, code },
      token: null,
    }),
  getGoals: (token) => apiRequest("/goals/", { token }),
  createGoal: (payload, token) => apiRequest("/goals/", { method: "POST", data: payload, token, form: true }),
  updateGoal: (id, payload, token) => apiRequest(`/goals/${id}/`, { method: "PATCH", data: payload, token, form: true }),
  getTasks: (token) => apiRequest("/tasks/", { token }),
  createTask: (payload, token) => apiRequest("/tasks/", { method: "POST", data: payload, token }),
  updateTask: (id, payload, token) => apiRequest(`/tasks/${id}/`, { method: "PATCH", data: payload, token }),
  clearTodayTasks: (token) => apiRequest("/tasks/clear_today/", { method: "DELETE", token }),
  getProfile: (token) => apiRequest("/profile/", { token }),
  updateProfile: (payload, token) => apiRequest("/profile/", { method: "PATCH", data: payload, token }),
  generatePlan: (payload, token) => apiRequest("/ai/generate-plan/", { method: "POST", data: payload, token }),
};
