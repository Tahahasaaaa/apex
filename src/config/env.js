const readBoolean = (value, fallback) => {
  if (value === undefined || value === null || value === "") return fallback;
  return String(value).trim().toLowerCase() === "true";
};

const trimSlashes = (value = "") => value.replace(/^\/+|\/+$/g, "");

const requestedScenario = String(import.meta.env.VITE_MOCK_SCENARIO || "success").toLowerCase();
const mockScenario = ["success", "empty", "error"].includes(requestedScenario)
  ? requestedScenario
  : "success";

export const appConfig = Object.freeze({
  useMock: readBoolean(import.meta.env.VITE_USE_MOCK, true),
  apiBaseUrl: String(import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, ""),
  apiVersion: trimSlashes(String(import.meta.env.VITE_API_VERSION || "")),
  mockScenario,
});

export const isMockMode = appConfig.useMock;

export const getApiPath = (path = "") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const versionPrefix = appConfig.apiVersion ? `/${appConfig.apiVersion}` : "";
  return `${versionPrefix}${normalizedPath}`;
};
