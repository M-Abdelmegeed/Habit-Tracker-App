import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useHabits } from "../../contexts/HabitContext";
import { getProgressChartData } from "../../utils/calculations";
import { theme } from "../../config/theme";

const ProgressChart = ({ year, month }) => {
  const { habits, completions } = useHabits();
  const data = getProgressChartData(habits, completions, year, month);

  // Only show data up to today
  const today = new Date();
  const filteredData = data.filter((d) => {
    const date = new Date(d.date);
    return date <= today;
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg p-3 shadow-lg">
          <p className="text-[var(--color-text-secondary)] text-sm mb-1">
            Day {label}
          </p>
          <p className="text-[var(--color-text-primary)] font-semibold">
            {payload[0].value}% completed
          </p>
          <p className="text-[var(--color-text-muted)] text-xs">
            {payload[0].payload.completed} of {payload[0].payload.total} habits
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card h-full flex flex-col">
      <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
        Daily Progress
      </h3>
      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={theme.colors.accent.primary}
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor={theme.colors.accent.primary}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              stroke={theme.colors.text.muted}
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke={theme.colors.text.muted}
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="percentage"
              stroke={theme.colors.accent.primary}
              strokeWidth={2}
              fill="url(#progressGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;
