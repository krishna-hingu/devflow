function ProjectHeader({ project, onEdit, onDelete }) {
  return (
    <section className="flex items-start justify-between rounded-xl border border-devflow-border bg-devflow-card p-6">
      <div>
        <p className="mb-2 text-sm text-devflow-text-muted">Project</p>

        <h1 className="text-2xl font-semibold text-devflow-text">
          {project.name}
        </h1>

        <p className="mt-2 text-sm text-devflow-text-muted">
          {project.description}
        </p>
      </div>

      <div className="flex flex-col items-end gap-3">
        <span className="rounded-full bg-devflow-blue/10 px-3 py-1 text-sm text-devflow-blue">
          {project.status}
        </span>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="rounded-lg bg-devflow-blue px-4 py-2 text-sm font-medium text-white hover:bg-devflow-blue-hover"
          >
            Edit Project
          </button>

          <button
            onClick={onDelete}
            className="rounded-lg border border-devflow-error/30 px-4 py-2 text-sm font-medium text-devflow-error hover:bg-devflow-error/10"
          >
            Delete Project
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProjectHeader;
