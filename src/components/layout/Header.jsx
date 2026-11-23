import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DevFlowContext from "../../context/DevFlowContext";

function Header({
  onMobileMenuClick,
  onDesktopSidebarToggle,
  isDesktopSidebarOpen,
}) {
  const navigate = useNavigate();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { projectList, taskList } = useContext(DevFlowContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredProjects = normalizedQuery
    ? projectList.filter((project) =>
        project.name.toLowerCase().includes(normalizedQuery) ||
        (project.description || "").toLowerCase().includes(normalizedQuery),
      )
    : [];

  const filteredTasks = normalizedQuery
    ? taskList.filter((task) =>
        task.title.toLowerCase().includes(normalizedQuery) ||
        (task.description || "").toLowerCase().includes(normalizedQuery),
      )
    : [];

  const showSearchResults = normalizedQuery.length > 0;
  const hasSearchResults =
    filteredProjects.length > 0 || filteredTasks.length > 0;

  function handleProjectClick(projectId) {
    navigate(`/projects/${projectId}`);
    setSearchQuery("");
    setIsSearchOpen(false);
  }

  function handleTaskClick(task) {
    navigate(`/projects/${task.projectId}/tasks/${task.id}`);
    setSearchQuery("");
    setIsSearchOpen(false);
  }

  function handleSearchKeyDown(event) {
    if (event.key === "Escape") {
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  }

  function handleSettingsClick() {
    navigate("/settings");
    setIsProfileOpen(false);
  }

  function handleProfileClick() {
    navigate("/profile");
    setIsProfileOpen(false);
  }

  const searchResults = (
    <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-xl border border-devflow-border bg-devflow-card p-1 shadow-xl">
      {hasSearchResults ? (
        <>
          {filteredProjects.length > 0 && (
            <div className="p-2">
              <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-devflow-text-muted">
                Projects
              </p>
              {filteredProjects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => handleProjectClick(project.id)}
                  className="flex w-full min-w-0 flex-col items-start rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-devflow-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devflow-blue"
                >
                  <span className="w-full truncate text-sm font-medium text-devflow-text">
                    {project.name}
                  </span>
                  <span className="line-clamp-2 w-full break-words text-xs text-devflow-text-muted">
                    {project.description}
                  </span>
                </button>
              ))}
            </div>
          )}

          {filteredTasks.length > 0 && (
            <div className="border-t border-devflow-border p-2">
              <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-devflow-text-muted">
                Tasks
              </p>
              {filteredTasks.map((task) => (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => handleTaskClick(task)}
                  className="flex w-full min-w-0 flex-col items-start rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-devflow-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devflow-blue"
                >
                  <span className="w-full truncate text-sm font-medium text-devflow-text">
                    {task.title}
                  </span>
                  <span className="line-clamp-2 w-full break-words text-xs text-devflow-text-muted">
                    {task.description}
                  </span>
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="p-4 text-sm text-devflow-text-muted">
          No matching projects or tasks
        </p>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full min-w-0 items-center gap-2 border-b border-devflow-border bg-devflow-header/95 px-3 backdrop-blur sm:gap-3 sm:px-4 lg:px-6">
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={onMobileMenuClick}
        aria-label="Open navigation menu"
        aria-expanded={undefined}
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-devflow-border text-devflow-text transition-colors hover:bg-devflow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devflow-blue lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Desktop show/hide sidebar button */}
      <button
        type="button"
        onClick={onDesktopSidebarToggle}
        aria-label={isDesktopSidebarOpen ? "Hide sidebar" : "Show sidebar"}
        aria-expanded={isDesktopSidebarOpen}
        title={isDesktopSidebarOpen ? "Hide sidebar" : "Show sidebar"}
        className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-devflow-border text-devflow-text-muted transition-colors hover:bg-devflow-card hover:text-devflow-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devflow-blue lg:inline-flex"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M9 4v16" />
          {isDesktopSidebarOpen && <path d="m14 9 3 3-3 3" />}
          {!isDesktopSidebarOpen && <path d="m10 9-3 3 3 3" />}
        </svg>
      </button>

      {/* Desktop Search */}
      <div className="relative hidden min-w-0 max-w-3xl flex-1 items-center sm:flex">
        <div className="flex w-full min-w-0 items-center gap-3 rounded-xl border border-devflow-border bg-devflow-card px-4 transition-colors focus-within:border-devflow-blue">
          <span className="text-devflow-text-muted" aria-hidden="true">
            ⌕
          </span>
          <input
            type="search"
            placeholder="Search projects and tasks..."
            aria-label="Search projects and tasks"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="w-full min-w-0 bg-transparent py-2.5 text-sm text-devflow-text outline-none placeholder:text-devflow-text-muted"
          />
        </div>
        {showSearchResults && searchResults}
      </div>

      {/* Mobile Search */}
      <div className="relative flex min-w-0 flex-1 items-center justify-end sm:hidden">
        {isSearchOpen ? (
          <>
            <input
              autoFocus
              type="search"
              placeholder="Search..."
              aria-label="Search projects and tasks"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="w-full min-w-0 rounded-xl border border-devflow-border bg-devflow-card px-3 py-2.5 text-sm text-devflow-text outline-none focus:border-devflow-blue"
            />
            <button
              type="button"
              aria-label="Close search"
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery("");
              }}
              className="ml-1 flex h-10 w-9 shrink-0 items-center justify-center rounded-lg text-devflow-text-muted hover:bg-devflow-card"
            >
              ×
            </button>
            {showSearchResults && searchResults}
          </>
        ) : (
          <button
            type="button"
            aria-label="Open search"
            onClick={() => setIsSearchOpen(true)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-devflow-border text-devflow-text transition-colors hover:bg-devflow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devflow-blue"
          >
            ⌕
          </button>
        )}
      </div>

      {/* Profile Menu */}
      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() => setIsProfileOpen((isOpen) => !isOpen)}
          aria-expanded={isProfileOpen}
          aria-label="Open profile menu"
          className="flex h-10 items-center gap-2 rounded-lg border border-devflow-border px-2.5 text-sm text-devflow-text transition-colors hover:bg-devflow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devflow-blue sm:px-3"
        >
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-devflow-blue text-xs font-semibold text-white"
            aria-hidden="true"
          >
            K
          </span>
          <span className="hidden md:inline">Profile</span>
        </button>

        {isProfileOpen && (
          <div className="absolute right-0 top-full z-50 mt-2 w-52 max-w-[calc(100vw-1.5rem)] rounded-xl border border-devflow-border bg-devflow-card p-2 shadow-xl">
            <div className="border-b border-devflow-border px-3 py-2">
              <p className="text-sm font-medium text-devflow-text">Krishna</p>
              <p className="text-xs text-devflow-text-muted">
                DevFlow Account
              </p>
            </div>
            <button
              type="button"
              onClick={handleProfileClick}
              className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-devflow-text transition-colors hover:bg-devflow-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devflow-blue"
            >
              My Profile
            </button>
            <button
              type="button"
              onClick={handleSettingsClick}
              className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-devflow-text transition-colors hover:bg-devflow-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devflow-blue"
            >
              Settings
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
