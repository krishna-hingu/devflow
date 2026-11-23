import { Link, NavLink } from "react-router-dom";

const navigationItems = [
  { name: "Dashboard", path: "/dashboard", abbreviation: "D" },
  { name: "Projects", path: "/projects", abbreviation: "P" },
  { name: "Tasks", path: "/tasks", abbreviation: "T" },
  { name: "Activity", path: "/activity", abbreviation: "A" },
];

function Sidebar({
  isMobileOpen,
  isDesktopOpen,
  onClose,
  onDesktopToggle,
}) {
  const mobileVisibility = isMobileOpen
    ? "visible translate-x-0"
    : "invisible -translate-x-full";

  const desktopVisibility = isDesktopOpen
    ? "lg:visible lg:translate-x-0 lg:w-60 lg:border-r"
    : "lg:invisible lg:translate-x-0 lg:w-0 lg:border-r-0 lg:overflow-hidden";

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-64 shrink-0 flex-col border-r border-devflow-border bg-devflow-sidebar transition-[width,transform] duration-300 ease-in-out lg:sticky lg:top-0 lg:z-20 lg:h-screen ${mobileVisibility} ${desktopVisibility}`}
        aria-label="Main navigation"
      >
        {/* Brand and desktop sidebar control */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-devflow-border px-4">
          <Link
            to="/dashboard"
            onClick={onClose}
            aria-label="DevFlow home"
            title="Go to Dashboard"
            className="flex min-w-0 items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-devflow-blue"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-devflow-blue text-base font-bold text-white">
              D
            </span>
            <span className="truncate text-base font-bold tracking-tight text-devflow-text">
              DevFlow
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={onDesktopToggle}
              aria-label="Hide sidebar"
              title="Hide sidebar"
              className="hidden h-8 w-8 items-center justify-center rounded-lg text-devflow-text-muted transition-colors hover:bg-devflow-card hover:text-devflow-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devflow-blue lg:inline-flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M9 4v16M14 9l-3 3 3 3" />
              </svg>
            </button>

            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={onClose}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-base text-devflow-text-muted transition-colors hover:bg-devflow-card hover:text-devflow-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devflow-blue lg:hidden"
            >
              ×
            </button>
          </div>
        </div>

        {/* Primary navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-devflow-text-muted">
            Workspace
          </p>

          {navigationItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex min-h-10 items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devflow-blue ${
                  isActive
                    ? "bg-devflow-blue/15 text-blue-300"
                    : "text-devflow-text-muted hover:bg-devflow-card hover:text-devflow-text"
                }`
              }
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/5 text-[11px] font-semibold text-current">
                {item.abbreviation}
              </span>
              <span className="truncate">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="shrink-0 border-t border-devflow-border px-4 py-3">
          <p className="text-[11px] leading-4 text-devflow-text-muted">
            Stay focused. Keep building.
          </p>
        </div>
      </aside>

      {/* Re-open handle stays beside the content when the desktop sidebar is hidden. */}
      {!isDesktopOpen && (
        <button
          type="button"
          onClick={onDesktopToggle}
          aria-label="Show sidebar"
          title="Show sidebar"
          className="fixed left-2 top-[4.25rem] z-30 hidden h-9 w-9 items-center justify-center rounded-lg border border-devflow-border bg-devflow-sidebar text-devflow-text-muted shadow-lg transition-colors hover:text-devflow-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devflow-blue lg:inline-flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M9 4v16m2-8 3-3m-3 3 3 3" />
          </svg>
        </button>
      )}
    </>
  );
}

export default Sidebar;
