import { Check } from "lucide-react";
import { useHabits } from "../contexts/HabitContext";
import { formatDate, formatDateDisplay, isToday } from "../utils/dateUtils";
import { calculateDailyProgress } from "../utils/calculations";
import Loading from "../components/ui/Loading";

const TodayPage = () => {
  const { habits, completions, loading, toggleCompletion, isHabitCompleted } =
    useHabits();

  const today = new Date();
  const todayStr = formatDate(today);
  const dailyProgress = calculateDailyProgress(habits, completions, todayStr);

  const handleToggle = async (habitId) => {
    await toggleCompletion(habitId, todayStr);
  };

  if (loading) {
    return <Loading message="Loading today's habits..." />;
  }

  return (
    <div className="max-w-2xl mx-auto my-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]">
          Today
        </h1>
        <p className="text-[var(--color-text-secondary)] mt-1">
          {formatDateDisplay(today)}
        </p>
      </div>

      {/* Progress Ring */}
      <div className="card mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="var(--color-bg-tertiary)"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="var(--color-accent)"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - dailyProgress.percentage / 100)}`}
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-[var(--color-text-primary)]">
                {dailyProgress.percentage}%
              </span>
              <span className="text-sm text-[var(--color-text-muted)]">
                complete
              </span>
            </div>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-4xl font-bold text-[var(--color-text-primary)]">
              {dailyProgress.completed} / {dailyProgress.total}
            </p>
            <p className="text-[var(--color-text-secondary)]">
              habits completed today
            </p>
            {dailyProgress.percentage === 100 && (
              <p className="text-[var(--color-success)] mt-2 font-medium">
                🎉 Great job! You've completed all habits!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Habits List */}
      <div className="space-y-3">
        {habits.length === 0 ? (
          <div className="card text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
              No habits yet
            </h3>
            <p className="text-[var(--color-text-secondary)]">
              Go to "My Habits" to add your first habit.
            </p>
          </div>
        ) : (
          habits.map((habit) => {
            const completed = isHabitCompleted(habit.id, todayStr);

            return (
              <button
                key={habit.id}
                onClick={() => handleToggle(habit.id)}
                className={`w-full card flex items-center gap-4 transition-all hover:border-[var(--color-border-light)] ${
                  completed ? "bg-[var(--color-bg-tertiary)]/50" : ""
                }`}
                style={{
                  borderLeftColor: habit.color,
                  borderLeftWidth: "4px",
                }}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    completed
                      ? "text-white"
                      : "border-2 border-[var(--color-border)]"
                  }`}
                  style={completed ? { backgroundColor: habit.color } : {}}
                >
                  {completed && <Check size={18} />}
                </div>
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{habit.icon}</span>
                  <span
                    className={`font-medium ${
                      completed
                        ? "text-[var(--color-text-muted)] line-through"
                        : "text-[var(--color-text-primary)]"
                    }`}
                  >
                    {habit.name}
                  </span>
                </div>
                {completed && (
                  <span className="text-xs text-[var(--color-success)] font-medium">
                    Done!
                  </span>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TodayPage;
