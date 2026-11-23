import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DevFlowContext from "../../context/DevFlowContext";

function Header({
  onMobileMenuClick,
  isMobileSidebarOpen,
  onDesktopSidebarToggle,
  isDesktopSidebarOpen,
}) {
  const navigate = useNavigate();

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
  }

  function handleTaskClick(task) {
    navigate(`/projects/${task.projectId}/tasks/${task.id}`);
    setSearchQuery("");
  }

  function handleSearchKeyDown(event) {
    if (event.key === "Escape") {
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
    <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-lg border border-devflow-border bg-devflow-card p-1 shadow-xl">
      {hasSearchResults ? (
        <>
          {filteredProjects.length > 0 && (
            <div className="p-1.5">
              <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-devflow-text-muted">
                Projects
              </p>
              {filteredProjects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => handleProjectClick(project.id)}
                  className="flex w-full min-w-0 flex-col items-start rounded-md px-2.5 py-2 text-left transition-colors hover:bg-devflow-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devflow-blue"
                >
                  <span className="w-full truncate text-[13px] font-medium text-devflow-text">
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
            <div className="border-t border-devflow-border p-1.5">
              <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-devflow-text-muted">
                Tasks
              </p>
              {filteredTasks.map((task) => (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => handleTaskClick(task)}
                  className="flex w-full min-w-0 flex-col items-start rounded-md px-2.5 py-2 text-left transition-colors hover:bg-devflow-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devflow-blue"
                >
                  <span className="w-full truncate text-[13px] font-medium text-devflow-text">
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
        <p className="p-3 text-xs text-devflow-text-muted">
          No matching projects or tasks
        </p>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full min-w-0 items-center gap-2 border-b border-devflow-border bg-devflow-header/95 px-3 backdrop-blur sm:gap-3 sm:px-4 lg:px-5">
      {/* Mobile sidebar toggle: preserves the current mobile drawer behaviour. */}
      <button
        type="button"
        onClick={onMobileMenuClick}
        aria-label={isMobileSidebarOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMobileSidebarOpen}
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-devflow-border text-devflow-text transition-colors hover:bg-devflow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devflow-blue lg:hidden"
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
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Desktop sidebar toggle: stays in the header when the sidebar is hidden. */}
      <button
        type="button"
        onClick={onDesktopSidebarToggle}
        aria-label={isDesktopSidebarOpen ? "Hide sidebar" : "Show sidebar"}
        aria-expanded={isDesktopSidebarOpen}
        title={isDesktopSidebarOpen ? "Hide sidebar" : "Show sidebar"}
        className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-devflow-border text-devflow-text transition-colors hover:bg-devflow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devflow-blue lg:inline-flex"
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
          <path d="M9 4v16" />
          {isDesktopSidebarOpen ? (
            <path d="m14 9 3 3-3 3" />
          ) : (
            <path d="m10 9-3 3 3 3" />
          )}
        </svg>
      </button>

      {/* Search expands to fill all available header space. */}
      <div className="relative flex min-w-0 flex-1 items-center">
        <div className="flex h-9 w-full min-w-0 items-center gap-2 rounded-lg border border-devflow-border bg-devflow-card px-3 transition-colors focus-within:border-devflow-blue">
          <span className="shrink-0 text-xs text-devflow-text-muted" aria-hidden="true">
            ⌕
          </span>
          <input
            type="search"
            placeholder="Search projects and tasks..."
            aria-label="Search projects and tasks"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="w-full min-w-0 bg-transparent text-[13px] text-devflow-text outline-none placeholder:text-devflow-text-muted"
          />
        </div>
        {showSearchResults && searchResults}
      </div>

      {/* Profile stays anchored to the far right. */}
      <div className="relative ml-auto shrink-0">
        <button
          type="button"
          onClick={() => setIsProfileOpen((isOpen) => !isOpen)}
          aria-expanded={isProfileOpen}
          aria-label="Open profile menu"
          className="flex h-9 items-center gap-2 rounded-lg border border-devflow-border px-2.5 text-[13px] text-devflow-text transition-colors hover:bg-devflow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devflow-blue"
        >
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-devflow-blue text-[11px] font-semibold text-white"
            aria-hidden="true"
          >
            K
          </span>
          <span className="hidden sm:inline">Profile</span>
        </button>

        {isProfileOpen && (
          <div className="absolute right-0 top-full z-50 mt-2 w-48 max-w-[calc(100vw-1.5rem)] rounded-lg border border-devflow-border bg-devflow-card p-1.5 shadow-xl">
            <div className="border-b border-devflow-border px-2.5 py-2">
              <p className="text-[13px] font-medium text-devflow-text">Krishna</p>
              <p className="text-[11px] text-devflow-text-muted">
                DevFlow Account
              </p>
            </div>
            <button
              type="button"
              onClick={handleProfileClick}
              className="w-full rounded-md px-2.5 py-2 text-left text-[13px] text-devflow-text transition-colors hover:bg-devflow-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devflow-blue"
            >
              My Profile
            </button>
            <button
              type="button"
              onClick={handleSettingsClick}
              className="w-full rounded-md px-2.5 py-2 text-left text-[13px] text-devflow-text transition-colors hover:bg-devflow-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devflow-blue"
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
