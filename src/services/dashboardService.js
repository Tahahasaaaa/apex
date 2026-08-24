import { dataProvider } from "../providers/dataProvider";
import { getToken } from "./storage";

export const dashboardService = {
  getDashboard: () => dataProvider.getDashboard(getToken()),
};
