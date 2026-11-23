import getProjectStats from "../../utils/projectStats";
import { Link } from "react-router-dom";

function ProjectCard({ project, tasks }) {
  const { totalTasks, completedTasks, progress } = getProjectStats(tasks);

  return (
    <article className="rounded-xl border border-devflow-border bg-devflow-card p-4 sm:p-5">
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="break-words text-base font-semibold text-devflow-text sm:text-lg">
            {project.name}
          </h2>
          <p className="mt-1 break-words text-sm leading-5 text-devflow-text-muted">
            {project.description}
          </p>
        </div>

        <span
          className={`w-fit max-w-full shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
            project.status === "Completed"
              ? "bg-devflow-success/10 text-devflow-success"
              : project.status === "In Progress"
                ? "bg-devflow-blue/10 text-devflow-blue"
                : "bg-devflow-warning/10 text-devflow-warning"
          }`}
        >
          {project.status}
        </span>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-sm text-devflow-text-muted">Progress</span>
          <span className="shrink-0 text-sm tabular-nums text-devflow-text">
            {progress}%
          </span>
        </div>
        <div
          className="h-2 overflow-hidden rounded-full bg-devflow-background"
          role="progressbar"
          aria-label={`${project.name} completion`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div
            className="h-full rounded-full bg-devflow-blue transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3">
        <span className="text-devflow-text-muted">
          {completedTasks} of {totalTasks} tasks completed
        </span>
        <span className="text-devflow-text-muted">Due {project.dueDate}</span>
      </div>

      <div className="mt-4 flex justify-start sm:justify-end">
        <Link
          to={`/projects/${project.id}`}
          className="inline-flex min-h-10 items-center rounded-lg text-sm font-medium text-devflow-blue transition-colors hover:text-devflow-blue-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devflow-blue focus-visible:ring-offset-2 focus-visible:ring-offset-devflow-card"
        >
          View Project →
        </Link>
      </div>
    </article>
  );
}

export default ProjectCard;
