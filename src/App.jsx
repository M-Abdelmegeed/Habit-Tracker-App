import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { HabitProvider } from "./contexts/HabitContext";
import Layout from "./components/layout/Layout";
import Login from "./components/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import HabitsPage from "./pages/HabitsPage";
import TodayPage from "./pages/TodayPage";
import SettingsPage from "./pages/SettingsPage";

// Wrapper to handle login redirect for authenticated users
const LoginRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-primary)]">
        <div className="spinner"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Login />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HabitProvider>
          <Routes>
            {/* Public route */}
            <Route path="/login" element={<LoginRoute />} />

            {/* Protected routes */}
            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<DashboardPage />} />
              <Route path="/habits" element={<HabitsPage />} />
              <Route path="/today" element={<TodayPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>

            {/* Catch all - redirect to dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HabitProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
