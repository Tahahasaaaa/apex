const SESSION_KEY = "apex.session";
const LEGACY_TOKEN_KEY = "authToken";
const LEGACY_PROFILE_KEY = "userProfile";

const readJson = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const normalizeToken = (value) => {
  if (!value) return "";
  const trimmed = String(value).trim();
  return trimmed.replace(/^Authorization:\s*/i, "").replace(/^Bearer\s+/i, "").trim();
};

export const getSession = () => {
  const session = readJson(SESSION_KEY);
  if (session?.token) return { ...session, token: normalizeToken(session.token) };

  const token = normalizeToken(localStorage.getItem(LEGACY_TOKEN_KEY));
  const user = readJson(LEGACY_PROFILE_KEY);
  return token ? { token, user } : null;
};

export const saveSession = (session) => {
  const normalized = {
    token: normalizeToken(session?.token),
    user: session?.user || null,
  };

  if (!normalized.token) {
    clearSession();
    return null;
  }

  writeJson(SESSION_KEY, normalized);
  localStorage.setItem(LEGACY_TOKEN_KEY, normalized.token);
  if (normalized.user) writeJson(LEGACY_PROFILE_KEY, normalized.user);
  return normalized;
};

export const updateStoredUser = (changes) => {
  const session = getSession();
  const user = { ...(session?.user || {}), ...(changes || {}) };
  if (session?.token) saveSession({ ...session, user });
  else writeJson(LEGACY_PROFILE_KEY, user);
  window.dispatchEvent(new Event("apex:profile-updated"));
  return user;
};

export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(LEGACY_TOKEN_KEY);
  localStorage.removeItem(LEGACY_PROFILE_KEY);
  window.dispatchEvent(new Event("apex:profile-updated"));
};

export const getToken = () => getSession()?.token || "";
