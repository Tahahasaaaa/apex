import { dataProvider } from "../providers/dataProvider";
import { getToken } from "./storage";

export const taskService = {
  getTasks: () => dataProvider.getTasks(getToken()),
  createTask: (payload) => dataProvider.createTask(payload, getToken()),
  updateTask: (id, payload) => dataProvider.updateTask(id, payload, getToken()),
  toggleTask: async (id, currentValue) => dataProvider.updateTask(id, { is_completed: !currentValue }, getToken()),
  deleteTask: (id) => dataProvider.deleteTask(id, getToken()),
  clearTodayTasks: () => dataProvider.clearTodayTasks(getToken()),
};
