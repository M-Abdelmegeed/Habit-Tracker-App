import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ListTodo,
  CalendarCheck,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/habits", icon: ListTodo, label: "My Habits" },
    { to: "/today", icon: CalendarCheck, label: "Today" },
    { to: "/settings", icon: Settings, label: "Settings" },
  ];

  const NavContent = () => (
    <>
      {/* Logo */}
      <div className="p-4 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--color-accent)] rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-xl">📊</span>
          </div>
          {!isCollapsed && (
            <span className="font-bold text-lg text-[var(--color-text-primary)]">
              Habit Tracker
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-3">
          {navItems.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-5 py-4 rounded-lg transition-colors ${
                    isActive
                      ? "bg-[var(--color-accent)] text-white"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]"
                  }`
                }
              >
                <Icon size={22} />
                {!isCollapsed && <span className="font-medium">{label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-[var(--color-border)]">
        {user && (
          <div
            className={`flex items-center gap-3 mb-4 ${isCollapsed ? "justify-center" : ""}`}
          >
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
            ) : (
              <div className="w-10 h-10 bg-[var(--color-accent)] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-medium">
                  {user.displayName?.[0] || user.email?.[0]}
                </span>
              </div>
            )}
            {!isCollapsed && (
              <div className="overflow-hidden">
                <p className="font-medium text-[var(--color-text-primary)] truncate">
                  {user.displayName}
                </p>
                <p className="text-sm text-[var(--color-text-muted)] truncate">
                  {user.email}
                </p>
              </div>
            )}
          </div>
        )}
        <button
          onClick={handleLogout}
          className={`flex items-center gap-4 px-5 py-4 rounded-lg w-full text-[var(--color-text-secondary)] hover:bg-[var(--color-danger)] hover:text-white transition-colors ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <LogOut size={22} />
          {!isCollapsed && <span className="font-medium">Sign Out</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border)]"
      >
        <Menu size={24} className="text-[var(--color-text-primary)]" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-[var(--color-bg-secondary)] border-r border-[var(--color-border)] transform transition-transform duration-300 flex flex-col ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsMobileOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)]"
        >
          <X size={20} className="text-[var(--color-text-secondary)]" />
        </button>
        <NavContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col fixed inset-y-0 left-0 z-30 bg-[var(--color-bg-secondary)] border-r border-[var(--color-border)] transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <NavContent />
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-full flex items-center justify-center hover:bg-[var(--color-bg-tertiary)] transition-colors"
        >
          <ChevronLeft
            size={14}
            className={`text-[var(--color-text-secondary)] transition-transform ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </aside>

      {/* Spacer for main content */}
      <div
        className={`hidden lg:block flex-shrink-0 transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}
      />
    </>
  );
};

export default Sidebar;
