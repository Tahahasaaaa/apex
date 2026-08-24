import { appConfig, getApiPath } from "../config/env";

const buildUrl = (path) => {
  if (/^https?:\/\//i.test(path)) return path;
  if (!appConfig.apiBaseUrl) {
    throw new Error("VITE_API_BASE_URL برای حالت API تنظیم نشده است.");
  }
  return `${appConfig.apiBaseUrl}${getApiPath(path)}`;
};

export const apiRequest = async (path, options = {}) => {
  const { method = "GET", data, token, headers, signal, form } = options;
  const isFormData = typeof FormData !== "undefined" && data instanceof FormData;
  const shouldFormEncode = Boolean(form) && !isFormData && data && typeof data === "object";
  const hasBody = data !== undefined && data !== null;
  const body = hasBody
    ? isFormData
      ? data
      : shouldFormEncode
        ? new URLSearchParams(
            Object.entries(data).flatMap(([key, value]) =>
              value === undefined || value === null ? [] : [[key, String(value)]]
            )
          )
        : JSON.stringify(data)
    : undefined;

  const response = await fetch(buildUrl(path), {
    method,
    headers: {
      ...(isFormData || shouldFormEncode ? {} : { "Content-Type": "application/json" }),
      ...(shouldFormEncode ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body,
    signal,
  });

  if (response.status === 204) return null;

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json") ? await response.json() : await response.text();
  if (!response.ok) {
    const error = new Error(
      payload?.detail || payload?.message || (typeof payload === "string" ? payload : "درخواست ناموفق بود.")
    );
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
};
