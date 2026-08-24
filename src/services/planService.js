import { dataProvider } from "../providers/dataProvider";
import { getToken } from "./storage";

export const planService = {
  generatePlan: (payload) => dataProvider.generatePlan(payload, getToken()),
};
