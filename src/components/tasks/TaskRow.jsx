import { Link } from "react-router-dom";

function TaskRow({ task, project }) {
  // Styling based on task status
  const statusStyles = {
    Pending: "border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10",
    "In Progress": "border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10",
    Completed: "border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10",
  };

  // Badge colors based on task status
  const statusBadgeStyles = {
    Pending: "bg-amber-500/15 text-amber-300",
    "In Progress": "bg-blue-500/15 text-blue-300",
    Completed: "bg-emerald-500/15 text-emerald-300",
  };

  // Badge colors based on task priority
  const priorityStyles = {
    High: "bg-red-500/15 text-red-300",
    Medium: "bg-amber-500/15 text-amber-300",
    Low: "bg-slate-500/15 text-slate-300",
  };

  return (
    <Link
      to={`/projects/${task.projectId}/tasks/${task.id}`}
      className={`block rounded-xl border p-4 transition-colors duration-200 ${
        statusStyles[task.status] || "border-devflow-border bg-devflow-card"
      }`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Task and Project Information */}
        <div>
          <h3 className="font-medium text-devflow-text">{task.title}</h3>

          <p className="mt-1 text-sm text-devflow-text-muted">
            {project?.name || "Unknown Project"}
          </p>
        </div>

        {/* Status, Priority and Due Date */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          {/* Status Badge */}
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              statusBadgeStyles[task.status] || "bg-slate-500/15 text-slate-300"
            }`}
          >
            {task.status}
          </span>

          {/* Priority Badge */}
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              priorityStyles[task.priority] || "bg-slate-500/15 text-slate-300"
            }`}
          >
            {task.priority}
          </span>

          {/* Due Date */}
          <span className="text-xs text-devflow-text-muted">
            Due: {task.dueDate}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default TaskRow;
