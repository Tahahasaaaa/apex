import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Goals from "../pages/Goals";
import Tasks from "../pages/Tasks";
import Profile from "../pages/Profile";
import AiChat from "../pages/AiChat";
import Growth from "../pages/Growth";
import NotFound from "../pages/NotFound";
import { authService } from "../services/authService";
import { dashboardService } from "../services/dashboardService";
import { taskService } from "../services/taskService";

const RequireAuth = ({ isLoggedIn, children }) =>
  isLoggedIn ? children : <Navigate to="/login" replace />;

const RouterContent = ({ isLoggedIn, handleLogin, normalizedTasks, toggleTask, tasksLoading, tasksError, dashboard }) => {
  const location = useLocation();

  return (
    <div className="page-transition" key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth isLoggedIn={isLoggedIn}>
              <Dashboard
                tasks={normalizedTasks}
                onToggleTask={toggleTask}
                isLoading={tasksLoading}
                error={tasksError}
                summary={dashboard}
              />
            </RequireAuth>
          }
        />
        <Route path="/goals" element={<RequireAuth isLoggedIn={isLoggedIn}><Goals /></RequireAuth>} />
        <Route
          path="/tasks"
          element={
            <RequireAuth isLoggedIn={isLoggedIn}>
              <Tasks tasks={normalizedTasks} onToggleTask={toggleTask} isLoading={tasksLoading} error={tasksError} />
            </RequireAuth>
          }
        />
        <Route path="/profile" element={<RequireAuth isLoggedIn={isLoggedIn}><Profile /></RequireAuth>} />
        <Route path="/ai" element={<RequireAuth isLoggedIn={isLoggedIn}><AiChat /></RequireAuth>} />
        <Route path="/growth" element={<RequireAuth isLoggedIn={isLoggedIn}><Growth /></RequireAuth>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const AppRouter = () => {
  const [session, setSession] = useState(() => authService.getSession());
  const [tasks, setTasks] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [tasksError, setTasksError] = useState("");
  const isLoggedIn = Boolean(session?.token);

  const normalizedTasks = useMemo(
    () =>
      tasks.map((task) => ({
        ...task,
        done: typeof task.done === "boolean" ? task.done : Boolean(task.is_completed),
        time:
          task.time ||
          (Number.isFinite(task.duration_minutes)
            ? `${task.duration_minutes} دقیقه`
            : task.start_time
              ? `ساعت ${task.start_time}`
              : "بدون زمان"),
        cat: task.cat || task.category || (task.related_goal ? `هدف ${task.related_goal}` : "عمومی"),
      })),
    [tasks]
  );

  const loadWorkspace = async () => {
    setTasksLoading(true);
    setTasksError("");
    try {
      const [taskData, summary] = await Promise.all([taskService.getTasks(), dashboardService.getDashboard()]);
      setTasks(Array.isArray(taskData) ? taskData : []);
      setDashboard(summary || null);
    } catch (error) {
      setTasksError(error.message || "خطا در دریافت اطلاعات داشبورد");
    } finally {
      setTasksLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setTasks([]);
      setDashboard(null);
      return;
    }
    loadWorkspace();
  }, [isLoggedIn]);

  const toggleTask = async (id) => {
    const target = normalizedTasks.find((task) => task.id === id);
    if (!target) return;
    const nextDone = !target.done;
    setTasks((previous) => previous.map((task) => (task.id === id ? { ...task, done: nextDone, is_completed: nextDone } : task)));

    try {
      const updated = await taskService.toggleTask(id, target.done);
      setTasks((previous) => previous.map((task) => (task.id === id ? { ...task, ...updated } : task)));
      setDashboard(await dashboardService.getDashboard());
    } catch (error) {
      setTasks((previous) => previous.map((task) => (task.id === id ? { ...task, done: target.done, is_completed: target.done } : task)));
      setTasksError(error.message || "خطا در به‌روزرسانی تسک");
    }
  };

  return (
    <BrowserRouter>
      <RouterContent
        isLoggedIn={isLoggedIn}
        handleLogin={setSession}
        normalizedTasks={normalizedTasks}
        toggleTask={toggleTask}
        tasksLoading={tasksLoading}
        tasksError={tasksError}
        dashboard={dashboard}
      />
    </BrowserRouter>
  );
};

export default AppRouter;
