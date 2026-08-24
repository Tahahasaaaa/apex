export const buildDashboardSummary = ({ tasks = [], goals = [] } = {}) => {
  const completedTasks = tasks.filter((task) => Boolean(task.done ?? task.is_completed)).length;
  const activeGoals = goals.filter((goal) => !goal.is_completed).length;
  const progress = tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0;

  return {
    streakDays: 12,
    totalScore: 2450,
    activeGoals,
    completedTasks,
    taskCount: tasks.length,
    progress,
    weeklyProgress: [
      { day: "شنبه", value: 100 },
      { day: "یکشنبه", value: 80 },
      { day: "دوشنبه", value: 70 },
      { day: "سه‌شنبه", value: 60 },
      { day: "چهارشنبه", value: 40 },
      { day: "پنج‌شنبه", value: 30 },
      { day: "جمعه", value: 0 },
    ],
  };
};
