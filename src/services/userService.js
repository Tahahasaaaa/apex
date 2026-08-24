import { dataProvider } from "../providers/dataProvider";
import { getToken, updateStoredUser } from "./storage";

export const userService = {
  getProfile: () => dataProvider.getProfile(getToken()),
  async updateProfile(payload) {
    const profile = await dataProvider.updateProfile(payload, getToken());
    updateStoredUser(profile);
    return profile;
  },
};
