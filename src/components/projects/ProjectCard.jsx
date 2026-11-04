import getProjectStats from "../../utils/projectStats";
import { Link } from "react-router-dom";
function ProjectCard({ project, tasks }) {
  const { totalTasks, completedTasks, progress } = getProjectStats(tasks);
  return (
    <article className="rounded-xl border border-devflow-border bg-devflow-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-devflow-text">
            {project.name}
          </h2>
          <p className="mt-1 text-sm text-devflow-text-muted">
            {project.description}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
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
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-devflow-text-muted">Progress</span>
          <span className="text-sm text-devflow-text">{progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-devflow-background ">
          <div
            className="h-full rounded-full bg-devflow-blue"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm">
        <span className="text-devflow-text-muted">
          {completedTasks} of {totalTasks} tasks completed
        </span>
        <span className="text-devflow-text-muted">Due {project.dueDate}</span>
      </div>
      <div className="mt-5 flex justify-end">
        <Link
          to={`/projects/${project.id}`}
          className="text-sm font-medium text-devflow-blue hover:text-devflow-blue-hover"
        >
          {" "}
          View Project →
        </Link>
      </div>
    </article>
  );
}
export default ProjectCard;
