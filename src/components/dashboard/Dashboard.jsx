import { useState } from "react";
import { Target, CheckCircle2, TrendingUp, Calendar } from "lucide-react";
import { useHabits } from "../../contexts/HabitContext";
import { calculateOverallProgress } from "../../utils/calculations";
import { getMonthName } from "../../utils/dateUtils";
import HabitCalendar from "./HabitCalendar";
import ProgressChart from "./ProgressChart";
import AnalysisPanel from "./AnalysisPanel";
import MentalStateTracker from "./MentalStateTracker";
import Loading from "../ui/Loading";

const Dashboard = () => {
  const { habits, completions, loading } = useHabits();
  const [currentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  if (loading) {
    return <Loading message="Loading dashboard..." />;
  }

  const overallProgress = calculateOverallProgress(
    habits,
    completions,
    year,
    month,
  );

  const stats = [
    {
      label: "Total Habits",
      value: habits.length,
      icon: Target,
      color: "var(--color-accent)",
    },
    {
      label: "Completed",
      value: overallProgress.completed,
      icon: CheckCircle2,
      color: "var(--color-success)",
    },
    {
      label: "Progress",
      value: `${overallProgress.percentage}%`,
      icon: TrendingUp,
      color: "var(--color-warning)",
    },
    {
      label: "Month",
      value: getMonthName(month),
      icon: Calendar,
      color: "var(--color-info)",
    },
  ];

  return (
    <div className="space-y-6 !mt-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]">
          Dashboard
        </h1>
        <p className="text-[var(--color-text-secondary)] mt-1">
          Track your habits and monitor your progress
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="card !p-4 !mb-0">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-[var(--color-text-muted)] truncate">
                  {stat.label}
                </p>
                <p className="text-xl font-bold text-[var(--color-text-primary)] truncate">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Calendar */}
      <HabitCalendar />

      {/* Charts & Analysis Grid */}
      <div className="grid lg:grid-cols-2 gap-6 items-stretch">
        <ProgressChart year={year} month={month} />
        <MentalStateTracker year={year} month={month} />
      </div>

      {/* Analysis */}
      <AnalysisPanel year={year} month={month} />
    </div>
  );
};

export default Dashboard;
