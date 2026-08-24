import { dataProvider } from "../providers/dataProvider";
import { clearSession, getSession, saveSession } from "./storage";

const extractToken = (payload) =>
  payload?.token ||
  payload?.access ||
  payload?.access_token ||
  payload?.jwt ||
  payload?.auth_token ||
  payload?.key ||
  payload?.data?.access ||
  payload?.data?.access_token ||
  "";

const toSession = (payload) => {
  const token = extractToken(payload);
  if (!token) throw new Error("توکن ورود از سرویس دریافت نشد.");
  return saveSession({ token, user: payload?.user || payload?.profile || payload?.data?.user || null });
};

export const authService = {
  getSession,
  isAuthenticated: () => Boolean(getSession()?.token),
  async login(credentials) {
    return toSession(await dataProvider.login(credentials));
  },
  async loginWithGoogle(credential) {
    return toSession(await dataProvider.authGoogleCredential(credential));
  },
  async verifyOtp(phone, code) {
    return toSession(await dataProvider.authOtpVerify(phone, code));
  },
  sendOtp: (phone) => dataProvider.authOtpSend(phone),
  logout: clearSession,
};
