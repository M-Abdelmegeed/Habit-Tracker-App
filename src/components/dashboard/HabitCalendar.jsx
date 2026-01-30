import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useHabits } from "../../contexts/HabitContext";
import {
  getMonthName,
  formatDate,
  isToday,
  isFuture,
  getDaysInMonth,
} from "../../utils/dateUtils";

const HabitCalendar = () => {
  const { habits, toggleCompletion, isHabitCompleted } = useHabits();
  const [currentDate, setCurrentDate] = useState(new Date());
  const scrollContainerRef = useRef(null);
  const todayRef = useRef(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);

  // Create array of all days in the month
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => {
    return new Date(year, month, i + 1);
  });

  // Scroll to today on mount and when month changes
  useEffect(() => {
    if (todayRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const todayElement = todayRef.current;
      const containerWidth = container.clientWidth;
      const todayOffset = todayElement.offsetLeft;

      // Center today in the view
      container.scrollLeft =
        todayOffset - containerWidth / 2 + todayElement.clientWidth / 2;
    }
  }, [month, year]);

  // Day names starting from Saturday
  const dayNames = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToCurrentMonth = () => {
    setCurrentDate(new Date());
  };

  const handleToggle = async (habitId, date) => {
    if (isFuture(date)) return;
    await toggleCompletion(habitId, formatDate(date));
  };

  const getDayName = (date) => {
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday
    // Convert to Saturday-start index: Sat=0, Sun=1, Mon=2, etc.
    const saturdayStartIndex = day === 6 ? 0 : day + 1;
    return dayNames[saturdayStartIndex];
  };

  const isCurrentMonth = () => {
    const now = new Date();
    return year === now.getFullYear() && month === now.getMonth();
  };

  return (
    <div className="card !mt-8 !mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
            {getMonthName(month)} {year}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {!isCurrentMonth() && (
            <button
              onClick={goToCurrentMonth}
              className="px-3 py-1.5 text-sm text-[var(--color-accent)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors"
            >
              Today
            </button>
          )}
          <button
            onClick={goToPreviousMonth}
            className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors"
          >
            <ChevronLeft
              size={20}
              className="text-[var(--color-text-secondary)]"
            />
          </button>
          <button
            onClick={goToNextMonth}
            className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors"
          >
            <ChevronRight
              size={20}
              className="text-[var(--color-text-secondary)]"
            />
          </button>
        </div>
      </div>

      {habits.length === 0 ? (
        <div className="text-center py-12 text-[var(--color-text-muted)]">
          No habits to display. Add some habits to start tracking!
        </div>
      ) : (
        <div className="overflow-x-auto" ref={scrollContainerRef}>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-2 text-sm font-medium text-[var(--color-text-secondary)] min-w-[140px] sticky left-0 bg-[var(--color-bg-secondary)]">
                  Habit
                </th>
                {monthDays.map((day, index) => (
                  <th
                    key={index}
                    className="p-1 text-center min-w-[40px]"
                    ref={isToday(day) ? todayRef : null}
                  >
                    <div
                      className={`flex flex-col items-center ${
                        isToday(day)
                          ? "text-[var(--color-accent)]"
                          : "text-[var(--color-text-secondary)]"
                      }`}
                    >
                      <span className="text-[10px] font-medium">
                        {getDayName(day)}
                      </span>
                      <span
                        className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-semibold ${
                          isToday(day)
                            ? "bg-[var(--color-accent)] text-white"
                            : ""
                        }`}
                      >
                        {day.getDate()}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {habits.map((habit) => (
                <tr
                  key={habit.id}
                  className="border-t border-[var(--color-border)]"
                >
                  <td className="p-2 sticky left-0 bg-[var(--color-bg-secondary)]">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{habit.icon}</span>
                      <span className="text-sm font-medium text-[var(--color-text-primary)] truncate max-w-[100px]">
                        {habit.name}
                      </span>
                    </div>
                  </td>
                  {monthDays.map((day, index) => {
                    const dateStr = formatDate(day);
                    const completed = isHabitCompleted(habit.id, dateStr);
                    const future = isFuture(day);

                    return (
                      <td key={index} className="p-1 text-center">
                        <button
                          onClick={() => handleToggle(habit.id, day)}
                          disabled={future}
                          className={`w-7 h-7 rounded flex items-center justify-center mx-auto transition-all duration-200 ${
                            future
                              ? "bg-[var(--color-bg-tertiary)] opacity-30 cursor-not-allowed"
                              : completed
                                ? "text-white"
                                : "bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border)] border border-[var(--color-border)]"
                          }`}
                          style={
                            completed ? { backgroundColor: habit.color } : {}
                          }
                        >
                          {completed && <Check size={14} strokeWidth={3} />}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HabitCalendar;
