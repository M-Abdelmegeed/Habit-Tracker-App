import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Smile, Zap } from "lucide-react";
import { useHabits } from "../../contexts/HabitContext";
import { getMentalStateChartData } from "../../utils/calculations";
import { formatDate, isToday, isFuture } from "../../utils/dateUtils";
import { theme } from "../../config/theme";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

const MentalStateTracker = ({ year, month }) => {
  const { completions, updateMentalState, getMentalState } = useHabits();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mood, setMood] = useState(5);
  const [motivation, setMotivation] = useState(5);

  const data = getMentalStateChartData(completions, year, month);

  // Filter to only show data up to today
  const today = new Date();
  const filteredData = data.filter((d) => {
    const date = new Date(d.date);
    return date <= today && (d.mood !== null || d.motivation !== null);
  });

  const handleOpenModal = (date = new Date()) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    if (isFuture(dateObj)) return;

    setSelectedDate(dateObj);
    const state = getMentalState(dateObj);
    setMood(state.mood || 5);
    setMotivation(state.motivation || 5);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    await updateMentalState(selectedDate, mood, motivation);
    setIsModalOpen(false);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg p-3 shadow-lg">
          <p className="text-[var(--color-text-secondary)] text-sm mb-2">
            Day {label}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}/10
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const todayState = getMentalState(formatDate(new Date()));

  return (
    <div className="card h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
          Mental State
        </h3>
        <Button variant="secondary" size="sm" onClick={() => handleOpenModal()}>
          Log Today
        </Button>
      </div>

      {/* Today's stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[var(--color-bg-tertiary)] rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Smile size={16} className="text-[var(--color-warning)]" />
            <span className="text-xs text-[var(--color-text-secondary)]">
              Mood
            </span>
          </div>
          <p className="text-xl font-bold text-[var(--color-warning)]">
            {todayState.mood || "-"}/10
          </p>
        </div>
        <div className="bg-[var(--color-bg-tertiary)] rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Zap size={16} className="text-[var(--color-info)]" />
            <span className="text-xs text-[var(--color-text-secondary)]">
              Motivation
            </span>
          </div>
          <p className="text-xl font-bold text-[var(--color-info)]">
            {todayState.motivation || "-"}/10
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-48">
        {filteredData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData}>
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
                domain={[0, 10]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="mood"
                name="Mood"
                stroke={theme.colors.status.warning}
                strokeWidth={2}
                dot={{ fill: theme.colors.status.warning, strokeWidth: 0 }}
                connectNulls
              />
              <Line
                type="monotone"
                dataKey="motivation"
                name="Motivation"
                stroke={theme.colors.status.info}
                strokeWidth={2}
                dot={{ fill: theme.colors.status.info, strokeWidth: 0 }}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-[var(--color-text-muted)]">
            No data yet. Log your mood and motivation to see trends.
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Log Mental State - ${isToday(selectedDate) ? "Today" : formatDate(selectedDate)}`}
      >
        <div className="space-y-6">
          {/* Mood */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] mb-3">
              <Smile size={18} className="text-[var(--color-warning)]" />
              Mood: {mood}/10
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={mood}
              onChange={(e) => setMood(parseInt(e.target.value))}
              className="w-full accent-[var(--color-warning)]"
            />
            <div className="flex justify-between text-xs text-[var(--color-text-muted)] mt-1">
              <span>😢 Low</span>
              <span>😊 High</span>
            </div>
          </div>

          {/* Motivation */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] mb-3">
              <Zap size={18} className="text-[var(--color-info)]" />
              Motivation: {motivation}/10
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={motivation}
              onChange={(e) => setMotivation(parseInt(e.target.value))}
              className="w-full accent-[var(--color-info)]"
            />
            <div className="flex justify-between text-xs text-[var(--color-text-muted)] mt-1">
              <span>😴 Low</span>
              <span>🔥 High</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave} className="flex-1">
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MentalStateTracker;
