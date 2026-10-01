import { Link } from "react-router-dom";
function ProjectCard({project}) {
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
          <span>{project.status}</span>
        </div>
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-devflow-text-muted">Progress</span>
            <span className="text-sm text-devflow-text">
              {project.progress}%
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-devflow-background ">
            <div
              className="h-full rounded-full bg-devflow-blue"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm">
          <span className="text-devflow-text-muted">
            {project.tasks.completed} of {project.tasks.total} tasks completed
          </span>
          <span className="text-devflow-text-muted">Due {project.dueDate}</span>
        </div>
        <div className="mt-5 flex justify-end">
          <Link to={`/projects/${project.id}`} className="text-sm font-medium text-devflow-blue hover:text-devflow-blue-hover"> View Project →</Link>
        </div>
      </article>
    );
}
export default ProjectCard;