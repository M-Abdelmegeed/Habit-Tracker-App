import { useState } from "react";
import { habitIcons, habitColors } from "../../config/theme";
import Button from "../ui/Button";

const HabitForm = ({ habit, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: habit?.name || "",
    icon: habit?.icon || habitIcons[0],
    color: habit?.color || habitColors[0].value,
    goal: habit?.goal || 30,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Habit Name */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
          Habit Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., Morning Exercise"
          className="input"
          autoFocus
        />
      </div>

      {/* Icon Selection */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
          Icon
        </label>
        <div className="flex flex-wrap gap-2">
          {habitIcons.map((icon) => (
            <button
              key={icon}
              type="button"
              onClick={() => setFormData({ ...formData, icon })}
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${
                formData.icon === icon
                  ? "bg-[var(--color-accent)] ring-2 ring-[var(--color-accent-light)]"
                  : "bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border)]"
              }`}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
          Color
        </label>
        <div className="flex flex-wrap gap-2">
          {habitColors.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => setFormData({ ...formData, color: color.value })}
              className={`w-10 h-10 rounded-lg transition-all ${
                formData.color === color.value
                  ? "ring-2 ring-offset-2 ring-offset-[var(--color-bg-secondary)] ring-white"
                  : ""
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Monthly Goal */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
          Monthly Goal (days)
        </label>
        <input
          type="number"
          min="1"
          max="31"
          value={formData.goal}
          onChange={(e) =>
            setFormData({ ...formData, goal: parseInt(e.target.value) || 1 })
          }
          className="input w-32"
        />
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          How many days per month do you want to complete this habit?
        </p>
      </div>

      {/* Preview */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
          Preview
        </label>
        <div
          className="flex items-center gap-3 p-4 rounded-lg border border-[var(--color-border)]"
          style={{ borderLeftColor: formData.color, borderLeftWidth: "4px" }}
        >
          <span className="text-2xl">{formData.icon}</span>
          <div>
            <p className="font-medium text-[var(--color-text-primary)]">
              {formData.name || "Habit Name"}
            </p>
            <p className="text-sm text-[var(--color-text-muted)]">
              Goal: {formData.goal} days/month
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary" className="flex-1">
          {habit ? "Update Habit" : "Create Habit"}
        </Button>
      </div>
    </form>
  );
};

export default HabitForm;
