// Theme Configuration - All colors and design tokens in one place
// Modify these values to customize the app's appearance

export const theme = {
  colors: {
    // Base backgrounds
    background: {
      primary: "#0f172a", // Main background (slate-900)
      secondary: "#1e293b", // Cards, panels (slate-800)
      tertiary: "#334155", // Elevated elements (slate-700)
    },

    // Text colors
    text: {
      primary: "#f1f5f9", // Main text (slate-100)
      secondary: "#94a3b8", // Secondary text (slate-400)
      muted: "#64748b", // Muted text (slate-500)
    },

    // Accent colors
    accent: {
      primary: "#14b8a6", // Teal - main actions (teal-500)
      hover: "#0d9488", // Hover state (teal-600)
      light: "#5eead4", // Light accent (teal-300)
      dark: "#0f766e", // Dark accent (teal-700)
    },

    // Status colors
    status: {
      success: "#10b981", // Success (emerald-500)
      warning: "#f59e0b", // Warning (amber-500)
      danger: "#ef4444", // Danger (red-500)
      info: "#3b82f6", // Info (blue-500)
    },

    // Habit completion states
    habit: {
      completed: "#14b8a6", // Completed habit
      incomplete: "#334155", // Not completed
      streak: "#f59e0b", // Streak indicator
    },

    // Borders
    border: {
      default: "#334155", // Default border (slate-700)
      light: "#475569", // Lighter border (slate-600)
    },

    // Chart colors
    chart: {
      primary: "#14b8a6",
      secondary: "#06b6d4",
      tertiary: "#8b5cf6",
      gradient: {
        start: "#14b8a6",
        end: "#0d9488",
      },
    },
  },

  // Border radius values
  borderRadius: {
    sm: "0.25rem", // 4px
    md: "0.5rem", // 8px
    lg: "0.75rem", // 12px
    xl: "1rem", // 16px
    "2xl": "1.5rem", // 24px
    full: "9999px", // Full round
  },

  // Shadow definitions
  shadows: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.3)",
    md: "0 4px 6px rgba(0, 0, 0, 0.3)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.3)",
    xl: "0 20px 25px rgba(0, 0, 0, 0.3)",
  },

  // Transitions
  transitions: {
    fast: "150ms ease",
    normal: "200ms ease",
    slow: "300ms ease",
  },
};

// Available habit icons
export const habitIcons = [
  "⏰",
  "🏋️",
  "📚",
  "📋",
  "💼",
  "🚫",
  "📱",
  "✍️",
  "🚿",
  "🧘",
  "💧",
  "🥗",
  "😴",
  "🚶",
  "💊",
  "🎯",
  "💪",
  "🧠",
  "❤️",
  "🌟",
  "🎨",
  "🎵",
  "🏃",
  "🚴",
  "🧹",
  "💰",
  "📧",
  "🌿",
  "☀️",
  "🌙",
];

// Preset colors for habits
export const habitColors = [
  { name: "Teal", value: "#14b8a6" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Violet", value: "#8b5cf6" },
  { name: "Pink", value: "#ec4899" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Emerald", value: "#10b981" },
  { name: "Red", value: "#ef4444" },
  { name: "Lime", value: "#84cc16" },
];

// Default habits (pre-populated for new users)
export const defaultHabits = [
  { name: "Wake up at 06:00", icon: "⏰", color: "#14b8a6", goal: 30 },
  { name: "Gym", icon: "🏋️", color: "#3b82f6", goal: 20 },
  { name: "Reading / Learning", icon: "📚", color: "#8b5cf6", goal: 30 },
  { name: "Day Planning", icon: "📋", color: "#f59e0b", goal: 30 },
  { name: "Project Work", icon: "💼", color: "#ec4899", goal: 25 },
  { name: "Social Media Detox", icon: "📱", color: "#06b6d4", goal: 30 },
];

export default theme;
