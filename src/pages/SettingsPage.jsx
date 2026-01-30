import { useState } from "react";
import { User, Palette, Database, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useHabits } from "../contexts/HabitContext";
import { theme, habitColors } from "../config/theme";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

const SettingsPage = () => {
  const { user, logout } = useAuth();
  const { habits, completions } = useHabits();
  const [showExportModal, setShowExportModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleExportData = () => {
    const data = {
      exportDate: new Date().toISOString(),
      user: {
        email: user.email,
        displayName: user.displayName,
      },
      habits,
      completions,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `habit-tracker-export-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowExportModal(false);
  };

  return (
    <div className="max-w-2xl mx-auto my-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]">
          Settings
        </h1>
        <p className="text-[var(--color-text-secondary)] mt-1">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Section */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <User size={20} className="text-[var(--color-accent)]" />
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
            Profile
          </h2>
        </div>
        <div className="flex items-center gap-4">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-16 h-16 rounded-full"
            />
          ) : (
            <div className="w-16 h-16 bg-[var(--color-accent)] rounded-full flex items-center justify-center">
              <span className="text-2xl text-white font-medium">
                {user?.displayName?.[0] || user?.email?.[0]}
              </span>
            </div>
          )}
          <div>
            <p className="font-semibold text-[var(--color-text-primary)]">
              {user?.displayName}
            </p>
            <p className="text-[var(--color-text-muted)]">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Theme Colors */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <Palette size={20} className="text-[var(--color-accent)]" />
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
            Theme Colors
          </h2>
        </div>
        <p className="text-[var(--color-text-secondary)] text-sm mb-4">
          Current color palette used in the app. Colors can be customized in
          <code className="mx-1 px-2 py-0.5 bg-[var(--color-bg-tertiary)] rounded text-xs">
            src/config/theme.js
          </code>
        </p>
        <div className="grid grid-cols-5 gap-3">
          {habitColors.map((color) => (
            <div key={color.value} className="text-center">
              <div
                className="w-10 h-10 rounded-lg mx-auto mb-1"
                style={{ backgroundColor: color.value }}
              />
              <span className="text-xs text-[var(--color-text-muted)]">
                {color.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Data Management */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <Database size={20} className="text-[var(--color-accent)]" />
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
            Data Management
          </h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">
                Export Data
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">
                Download all your habits and progress as JSON
              </p>
            </div>
            <Button
              variant="secondary"
              onClick={() => setShowExportModal(true)}
            >
              Export
            </Button>
          </div>
          <hr className="border-[var(--color-border)]" />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">
                Total Habits
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">
                {habits.length} habits tracked
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">
                Days Tracked
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">
                {Object.keys(completions).length} days with data
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <LogOut size={20} className="text-[var(--color-danger)]" />
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
            Account
          </h2>
        </div>
        <Button className="lg" variant="danger" onClick={logout}>
          Sign Out
        </Button>
      </div>

      {/* Export Modal */}
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Data"
      >
        <div className="text-center">
          <div className="text-5xl mb-4">📦</div>
          <p className="text-[var(--color-text-primary)] mb-4">
            Your data will be exported as a JSON file containing:
          </p>
          <ul className="text-left text-[var(--color-text-secondary)] mb-6 space-y-2">
            <li>• All your habits ({habits.length} habits)</li>
            <li>
              • Completion history ({Object.keys(completions).length} days)
            </li>
            <li>• Mood and motivation data</li>
          </ul>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={() => setShowExportModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleExportData}
              className="flex-1"
            >
              Download
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SettingsPage;
