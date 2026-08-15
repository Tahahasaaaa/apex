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
import { api, getAuthToken, setAuthToken } from "../api/client";

const RequireAuth = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const RouterContent = ({
  isLoggedIn,
  handleLogin,
  normalizedTasks,
  toggleTask,
  tasksLoading,
  tasksError,
}) => {
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
              />
            </RequireAuth>
          }
        />
        <Route
          path="/goals"
          element={
            <RequireAuth isLoggedIn={isLoggedIn}>
              <Goals />
            </RequireAuth>
          }
        />
        <Route
          path="/tasks"
          element={
            <RequireAuth isLoggedIn={isLoggedIn}>
              <Tasks
                tasks={normalizedTasks}
                onToggleTask={toggleTask}
                isLoading={tasksLoading}
                error={tasksError}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth isLoggedIn={isLoggedIn}>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/ai"
          element={
            <RequireAuth isLoggedIn={isLoggedIn}>
              <AiChat />
            </RequireAuth>
          }
        />
        <Route
          path="/growth"
          element={
            <RequireAuth isLoggedIn={isLoggedIn}>
              <Growth />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const AppRouter = () => {
  const [authToken, setAuthTokenState] = useState(() => getAuthToken());
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(getAuthToken()));
  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [tasksError, setTasksError] = useState("");

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
        cat:
          task.cat ||
          (task.related_goal ? `هدف ${task.related_goal}` : task.difficulty_rating ? `سختی ${task.difficulty_rating}` : "عمومی"),
      })),
    [tasks]
  );

  const loadTasks = async (token) => {
    setTasksLoading(true);
    setTasksError("");
    try {
      const data = await api.getTasks(token);
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      setTasksError(error.message || "خطا در دریافت تسک‌ها");
    } finally {
      setTasksLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    const token = authToken || getAuthToken();
    if (!token) return;
    loadTasks(token);
  }, [isLoggedIn, authToken]);

  const toggleTask = async (id) => {
    const target = normalizedTasks.find((task) => task.id === id);
    if (!target) return;
    const nextDone = !target.done;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: nextDone, is_completed: nextDone } : task
      )
    );

    try {
      await api.updateTask(id, { is_completed: nextDone }, authToken);
    } catch (error) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, done: target.done, is_completed: target.done } : task
        )
      );
      setTasksError(error.message || "خطا در بروزرسانی تسک");
    }
  };

  const handleLogin = (token) => {
    setAuthToken(token);
    setAuthTokenState(token);
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      <RouterContent
        isLoggedIn={isLoggedIn}
        handleLogin={handleLogin}
        normalizedTasks={normalizedTasks}
        toggleTask={toggleTask}
        tasksLoading={tasksLoading}
        tasksError={tasksError}
      />
    </BrowserRouter>
  );
};

export default AppRouter;
