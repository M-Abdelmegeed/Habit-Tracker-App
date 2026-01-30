import { useHabits } from "../../contexts/HabitContext";
import { getHabitAnalysis } from "../../utils/calculations";

const AnalysisPanel = ({ year, month }) => {
  const { habits, completions } = useHabits();
  const analysis = getHabitAnalysis(habits, completions, year, month);

  if (habits.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
          Analysis
        </h3>
        <p className="text-[var(--color-text-muted)] text-center py-8">
          Add habits to see analysis
        </p>
      </div>
    );
  }

  return (
    <div className="card !mt-6">
      <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
        Analysis
      </h3>
      <div className="overflow-x-auto -mx-6">
        <table className="w-full min-w-[400px]">
          <thead>
            <tr className="border-b border-[var(--color-border)]">
              <th className="text-left px-6 py-2 text-sm font-medium text-[var(--color-text-secondary)]">
                Habit
              </th>
              <th className="text-center px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)]">
                Goal
              </th>
              <th className="text-center px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)]">
                Actual
              </th>
              <th className="text-center px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)]">
                Progress
              </th>
            </tr>
          </thead>
          <tbody>
            {analysis.map((item) => (
              <tr
                key={item.id}
                className="border-b border-[var(--color-border)] last:border-0"
              >
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <span>{item.icon}</span>
                    <span className="text-sm text-[var(--color-text-primary)] truncate max-w-[150px]">
                      {item.name}
                    </span>
                  </div>
                </td>
                <td className="text-center px-4 py-3 text-sm text-[var(--color-text-secondary)]">
                  {item.goal}
                </td>
                <td className="text-center px-4 py-3">
                  <span className="font-semibold" style={{ color: item.color }}>
                    {item.actual}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-[var(--color-bg-tertiary)] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(item.progress, 100)}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                    <span className="text-xs text-[var(--color-text-muted)] w-10 text-right">
                      {item.progress}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalysisPanel;
