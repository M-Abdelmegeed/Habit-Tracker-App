// Calculation utility functions

/**
 * Calculate progress percentage
 */
export const calculateProgress = (completed, goal) => {
  if (goal === 0) return 0;
  return Math.min(Math.round((completed / goal) * 100), 100);
};

/**
 * Calculate overall progress for all habits
 */
export const calculateOverallProgress = (habits, completions, year, month) => {
  if (habits.length === 0) return { completed: 0, total: 0, percentage: 0 };

  let totalCompleted = 0;
  let totalGoal = 0;

  habits.forEach((habit) => {
    const stats = calculateHabitMonthlyStats(
      habit.id,
      completions,
      year,
      month,
    );
    totalCompleted += stats.completed;
    totalGoal += habit.goal || 30;
  });

  return {
    completed: totalCompleted,
    total: totalGoal,
    percentage: calculateProgress(totalCompleted, totalGoal),
  };
};

/**
 * Calculate monthly stats for a single habit
 */
export const calculateHabitMonthlyStats = (
  habitId,
  completions,
  year,
  month,
) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let completed = 0;

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (completions[dateStr]?.habits?.[habitId]) {
      completed++;
    }
  }

  return { completed };
};

/**
 * Calculate daily progress (how many habits completed that day)
 */
export const calculateDailyProgress = (habits, completions, date) => {
  const dateStr =
    typeof date === "string" ? date : date.toISOString().split("T")[0];
  const dayCompletions = completions[dateStr]?.habits || {};

  let completed = 0;
  habits.forEach((habit) => {
    if (dayCompletions[habit.id]) {
      completed++;
    }
  });

  return {
    completed,
    total: habits.length,
    percentage: calculateProgress(completed, habits.length),
  };
};

/**
 * Calculate streak for a habit
 */
export const calculateStreak = (habitId, completions) => {
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Start from yesterday if today is not completed
  let checkDate = new Date(today);
  const todayStr = checkDate.toISOString().split("T")[0];

  if (!completions[todayStr]?.habits?.[habitId]) {
    checkDate.setDate(checkDate.getDate() - 1);
  }

  while (true) {
    const dateStr = checkDate.toISOString().split("T")[0];

    if (completions[dateStr]?.habits?.[habitId]) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }

    // Safety limit
    if (streak > 365) break;
  }

  return streak;
};

/**
 * Get progress data for chart (daily progress over a month)
 */
export const getProgressChartData = (habits, completions, year, month) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const data = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayProgress = calculateDailyProgress(habits, completions, dateStr);

    data.push({
      day,
      date: dateStr,
      completed: dayProgress.completed,
      total: dayProgress.total,
      percentage: dayProgress.percentage,
    });
  }

  return data;
};

/**
 * Get mental state chart data
 */
export const getMentalStateChartData = (completions, year, month) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const data = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const completion = completions[dateStr];

    data.push({
      day,
      date: dateStr,
      mood: completion?.mood || null,
      motivation: completion?.motivation || null,
    });
  }

  return data;
};

/**
 * Calculate habit analysis data
 */
export const getHabitAnalysis = (habits, completions, year, month) => {
  return habits.map((habit) => {
    const stats = calculateHabitMonthlyStats(
      habit.id,
      completions,
      year,
      month,
    );
    const streak = calculateStreak(habit.id, completions);

    return {
      id: habit.id,
      name: habit.name,
      icon: habit.icon,
      color: habit.color,
      goal: habit.goal || 30,
      actual: stats.completed,
      progress: calculateProgress(stats.completed, habit.goal || 30),
      streak,
    };
  });
};
