import { useState } from "react";
import { Edit2, Trash2, MoreVertical, TrendingUp } from "lucide-react";
import { useHabits } from "../../contexts/HabitContext";
import { calculateStreak } from "../../utils/calculations";

const HabitCard = ({ habit, onEdit, onDelete }) => {
  const { completions, getHabitStats } = useHabits();
  const [showMenu, setShowMenu] = useState(false);

  const now = new Date();
  const stats = getHabitStats(habit.id, now.getFullYear(), now.getMonth());
  const streak = calculateStreak(habit.id, completions);

  return (
    <div
      className="card !mb-0 relative group hover:border-[var(--color-border-light)] transition-colors"
      style={{ borderLeftColor: habit.color, borderLeftWidth: "4px" }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${habit.color}20` }}
          >
            {habit.icon}
          </div>
          <div>
            <h3 className="font-semibold text-[var(--color-text-primary)] text-lg">
              {habit.name}
            </h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Goal: {habit.goal} days/month
            </p>
          </div>
        </div>

        {/* Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors opacity-0 group-hover:opacity-100"
          >
            <MoreVertical
              size={18}
              className="text-[var(--color-text-secondary)]"
            />
          </button>

          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 top-full mt-1 w-36 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg shadow-lg z-20 overflow-hidden">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onEdit(habit);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-[var(--color-text-primary)] hover:bg-[var(--color-border)] transition-colors"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onDelete(habit);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-[var(--color-danger)] hover:bg-[var(--color-border)] transition-colors"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold" style={{ color: habit.color }}>
            {stats.completed}
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">Completed</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-[var(--color-text-primary)]">
            {stats.percentage}%
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">Progress</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-[var(--color-warning)]">
            {streak}
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            <TrendingUp size={12} className="inline mr-1" />
            Streak
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="h-2 bg-[var(--color-bg-tertiary)] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(stats.percentage, 100)}%`,
              backgroundColor: habit.color,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
