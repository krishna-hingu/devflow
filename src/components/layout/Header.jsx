import { useState, useContext } from "react";
import DevFlowContext from "../../context/DevFlowContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { projectList, taskList } = useContext(DevFlowContext);
  const [searchQuery, setSearchQuery] = useState("");

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredProjects = normalizedQuery
    ? projectList.filter((project) => {
        return (
          project.name.toLowerCase().includes(normalizedQuery) ||
          project.description.toLowerCase().includes(normalizedQuery)
        );
      })
    : [];

  const filteredTasks = normalizedQuery
    ? taskList.filter((task) => {
        return (
          task.title.toLowerCase().includes(normalizedQuery) ||
          task.description.toLowerCase().includes(normalizedQuery)
        );
      })
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

  return (
    <header className="flex h-16 items-center justify-between border-b border-devflow-border bg-devflow-header px-6">
      {/* Desktop Search */}
      <div className="hidden w-full max-w-5xl items-center sm:flex">
        <div className="relative flex w-full items-center gap-3 rounded-lg border border-devflow-border bg-devflow-card px-4 focus-within:border-devflow-blue">
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
            className="w-full bg-transparent py-2 text-sm text-devflow-text placeholder:text-devflow-text-muted outline-none"
          />

          {showSearchResults && (
            <div className="absolute left-0 top-full z-50 mt-2 max-h-96 w-full overflow-y-auto rounded-lg border border-devflow-border bg-devflow-card shadow-xl">
              {hasSearchResults ? (
                <>
                  {/* Projects Section */}
                  {filteredProjects.length > 0 && (
                    <div className="p-2">
                      <p className="px-2 py-1 text-xs font-semibold uppercase text-devflow-text-muted">
                        Projects
                      </p>

                      {filteredProjects.map((project) => (
                        <button
                          key={project.id}
                          type="button"
                          onClick={() => handleProjectClick(project.id)}
                          className="flex w-full flex-col items-start rounded-md px-2 py-2 text-left hover:bg-devflow-border"
                        >
                          <span className="text-sm font-medium text-devflow-text">
                            {project.name}
                          </span>

                          <span className="text-xs text-devflow-text-muted">
                            {project.description}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Tasks Section */}
                  {filteredTasks.length > 0 && (
                    <div className="border-t border-devflow-border p-2">
                      <p className="px-2 py-1 text-xs font-semibold uppercase text-devflow-text-muted">
                        Tasks
                      </p>

                      {filteredTasks.map((task) => (
                        <button
                          key={task.id}
                          type="button"
                          onClick={() => handleTaskClick(task)}
                          className="flex w-full flex-col items-start rounded-md px-2 py-2 text-left hover:bg-devflow-border"
                        >
                          <span className="text-sm font-medium text-devflow-text">
                            {task.title}
                          </span>

                          <span className="text-xs text-devflow-text-muted">
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
          )}
        </div>
      </div>

      {/* Mobile Search */}
      <div className="flex w-full items-center justify-end gap-1.5 sm:hidden">
        {isSearchOpen ? (
          <div className="relative flex min-w-0 flex-1 items-center gap-2">
            <input
              autoFocus
              type="search"
              placeholder="Search..."
              aria-label="Search projects and tasks"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="w-full min-w-0 rounded-lg border border-devflow-border bg-devflow-card px-3 py-2 text-sm text-devflow-text outline-none focus:border-devflow-blue"
            />

            <button
              type="button"
              aria-label="Close search"
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery("");
              }}
              className="shrink-0 rounded-lg px-2 py-2 text-devflow-text-muted hover:bg-devflow-card"
            >
              ×
            </button>

            {/* Mobile Search Results */}
            {showSearchResults && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 min-w-64 overflow-y-auto rounded-lg border border-devflow-border bg-devflow-card shadow-xl">
                {hasSearchResults ? (
                  <>
                    {/* Projects Section */}
                    {filteredProjects.length > 0 && (
                      <div className="p-2">
                        <p className="px-2 py-1 text-xs font-semibold uppercase text-devflow-text-muted">
                          Projects
                        </p>

                        {filteredProjects.map((project) => (
                          <button
                            key={project.id}
                            type="button"
                            onClick={() => handleProjectClick(project.id)}
                            className="flex w-full flex-col items-start rounded-md px-2 py-2 text-left hover:bg-devflow-border"
                          >
                            <span className="text-sm font-medium text-devflow-text">
                              {project.name}
                            </span>

                            <span className="text-xs text-devflow-text-muted">
                              {project.description}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Tasks Section */}
                    {filteredTasks.length > 0 && (
                      <div className="border-t border-devflow-border p-2">
                        <p className="px-2 py-1 text-xs font-semibold uppercase text-devflow-text-muted">
                          Tasks
                        </p>

                        {filteredTasks.map((task) => (
                          <button
                            key={task.id}
                            type="button"
                            onClick={() => handleTaskClick(task)}
                            className="flex w-full flex-col items-start rounded-md px-2 py-2 text-left hover:bg-devflow-border"
                          >
                            <span className="text-sm font-medium text-devflow-text">
                              {task.title}
                            </span>

                            <span className="text-xs text-devflow-text-muted">
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
            )}
          </div>
        ) : (
          <button
            type="button"
            aria-label="Open search"
            onClick={() => setIsSearchOpen(true)}
            className="rounded-lg border border-devflow-border px-3 py-2 text-devflow-text hover:bg-devflow-card"
          >
            ⌕
          </button>
        )}
      </div>

      {/* Profile */}
      <button
        type="button"
        className="ml-4 flex shrink-0 items-center gap-2 rounded-lg border border-devflow-border px-3 py-2 text-sm text-devflow-text transition-colors hover:bg-devflow-card"
      >
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full bg-devflow-blue font-semibold text-white"
          aria-hidden="true"
        >
          K
        </span>

        <span className="hidden sm:inline">Profile</span>
      </button>
    </header>
  );
}

export default Header;
