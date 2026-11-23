import { useContext, useState } from "react";
import DevFlowContext from "../context/DevFlowContext";

const activityFilters = [
  { label: "All Activity", value: "All" },
  { label: "Tasks", value: "task" },
  { label: "Projects", value: "project" },
];

const actionLabels = {
  created: "Created",
  updated: "Updated",
  completed: "Completed",
  deleted: "Deleted",
};

function formatActivityTime(timestamp) {
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function Activity() {
  const { activityList } = useContext(DevFlowContext);
  const [activeFilter, setActiveFilter] = useState("All");

  // Show all events or only the selected entity type.
  const filteredActivities =
    activeFilter === "All"
      ? activityList
      : activityList.filter(
          (activity) => activity.entityType === activeFilter,
        );

  return (
    <div className="space-y-4">
      {/* Page Heading */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-devflow-text sm:text-2xl">
            Activity
          </h1>
          <p className="mt-1 text-sm text-devflow-text-muted">
            Keep track of changes across your projects and tasks.
          </p>
        </div>

        <p className="text-sm text-devflow-text-muted">
          {activityList.length}{" "}
          {activityList.length === 1 ? "activity" : "activities"} recorded
        </p>
      </div>

      {/* Activity Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {activityFilters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            aria-pressed={activeFilter === filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`min-h-10 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              activeFilter === filter.value
                ? "bg-violet-500/15 text-violet-300"
                : "border border-devflow-border text-devflow-text-muted hover:bg-devflow-card hover:text-devflow-text"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Activity Timeline */}
      <section className="space-y-2">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => {
            const entityLabel =
              activity.entityType === "task" ? "Task" : "Project";

            const entityStyles =
              activity.entityType === "task"
                ? "bg-blue-500/10 text-blue-300"
                : "bg-violet-500/10 text-violet-300";

            return (
              <article
                key={activity.id}
                className="rounded-xl border border-devflow-border bg-devflow-card p-3.5"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${entityStyles}`}
                      >
                        {entityLabel}
                      </span>

                      <span className="text-sm font-medium text-devflow-text">
                        {actionLabels[activity.action] || "Updated"}
                      </span>
                    </div>

                    <div>
                      <h2 className="font-semibold text-devflow-text">
                        {activity.entityName}
                      </h2>

                      {activity.projectName && (
                        <p className="mt-1 text-sm text-devflow-text-muted">
                          Project: {activity.projectName}
                        </p>
                      )}

                      {activity.details && (
                        <p className="mt-2 text-sm text-devflow-text-muted">
                          {activity.details}
                        </p>
                      )}
                    </div>
                  </div>

                  <time
                    dateTime={activity.createdAt}
                    className="shrink-0 text-xs text-devflow-text-muted"
                  >
                    {formatActivityTime(activity.createdAt)}
                  </time>
                </div>
              </article>
            );
          })
        ) : (
          <div className="rounded-xl border border-devflow-border bg-devflow-card px-4 py-8 text-center">
            <h2 className="font-semibold text-devflow-text">
              {activityList.length === 0
                ? "No activity yet"
                : "No matching activity"}
            </h2>

            <p className="mt-2 text-sm text-devflow-text-muted">
              {activityList.length === 0
                ? "Create, update, complete, or delete a project or task. Your actions will appear here."
                : "There are no events in this category yet. Try another filter."}
            </p>

            {activityList.length > 0 && activeFilter !== "All" && (
              <button
                type="button"
                onClick={() => setActiveFilter("All")}
                className="mt-4 min-h-10 rounded-lg border border-devflow-border px-4 py-2 text-sm font-medium text-devflow-text transition-colors hover:border-violet-500 hover:text-violet-300"
              >
                Show all activity
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default Activity;
