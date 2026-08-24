import { dataProvider } from "../providers/dataProvider";
import { getToken } from "./storage";

export const growthService = {
  getAnalytics: () => dataProvider.getGrowthAnalytics(getToken()),
};
