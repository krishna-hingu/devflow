import { Link, NavLink } from "react-router-dom";

const navigationItems = [
  { name: "Dashboard", path: "/dashboard", abbreviation: "D" },
  { name: "Projects", path: "/projects", abbreviation: "P" },
  { name: "Tasks", path: "/tasks", abbreviation: "T" },
  { name: "Activity", path: "/activity", abbreviation: "A" },
];

function Sidebar({ isMobileOpen, isDesktopOpen, onClose }) {
  const mobileVisibility = isMobileOpen
    ? "visible translate-x-0"
    : "invisible -translate-x-full";

  const desktopVisibility = isDesktopOpen
    ? "lg:visible lg:translate-x-0 lg:w-64 lg:border-r"
    : "lg:invisible lg:translate-x-0 lg:w-0 lg:border-r-0 lg:overflow-hidden";

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-72 shrink-0 flex-col border-r border-devflow-border bg-devflow-sidebar transition-all duration-300 ease-in-out lg:sticky lg:top-0 lg:z-20 lg:h-screen ${mobileVisibility} ${desktopVisibility}`}
      aria-label="Main navigation"
    >
      {/* Brand */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-devflow-border px-5">
        <Link
          to="/dashboard"
          onClick={onClose}
          aria-label="DevFlow home"
          title="Go to Dashboard"
          className="flex min-w-0 items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-devflow-blue"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-devflow-blue text-lg font-bold text-white shadow-lg shadow-blue-500/20">
            D
          </span>
          <span className="truncate text-lg font-bold tracking-tight text-devflow-text">
            DevFlow
          </span>
        </Link>

        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={onClose}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg text-devflow-text-muted transition-colors hover:bg-devflow-card hover:text-devflow-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devflow-blue lg:hidden"
        >
          ×
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-devflow-text-muted">
          Workspace
        </p>

        {navigationItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `group flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devflow-blue ${
                isActive
                  ? "bg-devflow-blue/15 text-blue-300 shadow-sm"
                  : "text-devflow-text-muted hover:bg-devflow-card hover:text-devflow-text"
              }`
            }
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5 text-xs font-semibold text-current">
              {item.abbreviation}
            </span>
            <span className="truncate">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="shrink-0 border-t border-devflow-border p-4">
        <p className="text-xs leading-5 text-devflow-text-muted">
          Stay focused. Keep building.
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
