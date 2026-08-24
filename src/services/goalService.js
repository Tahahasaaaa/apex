import { dataProvider } from "../providers/dataProvider";
import { getToken } from "./storage";

export const goalService = {
  getGoals: () => dataProvider.getGoals(getToken()),
  createGoal: (payload) => dataProvider.createGoal(payload, getToken()),
  updateGoal: (id, payload) => dataProvider.updateGoal(id, payload, getToken()),
  deleteGoal: (id) => dataProvider.deleteGoal(id, getToken()),
};
