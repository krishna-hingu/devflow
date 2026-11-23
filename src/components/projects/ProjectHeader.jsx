function ProjectHeader({ project, onEdit, onDelete }) {
  return (
    <section className="flex flex-col gap-5 rounded-xl border border-devflow-border bg-devflow-card p-4 sm:p-6 lg:flex-row lg:items-start lg:justify-between">
      <div className="min-w-0 flex-1">
        <p className="mb-2 text-sm text-devflow-text-muted">Project</p>

        <h1 className="break-words text-xl font-semibold text-devflow-text sm:text-2xl">
          {project.name}
        </h1>

        <p className="mt-2 break-words text-sm leading-6 text-devflow-text-muted">
          {project.description}
        </p>
      </div>

      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end">
        <span
          className={`w-fit max-w-full rounded-full px-3 py-1 text-xs font-medium ${
            project.status === "Completed"
              ? "bg-devflow-success/10 text-devflow-success"
              : project.status === "In Progress"
                ? "bg-devflow-blue/10 text-devflow-blue"
                : "bg-devflow-warning/10 text-devflow-warning"
          }`}
        >
          {project.status}
        </span>

        <div className="grid w-full grid-cols-1 gap-2 sm:w-auto sm:grid-cols-2 lg:flex">
          <button
            type="button"
            onClick={onEdit}
            className="min-h-11 rounded-lg bg-devflow-blue px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-devflow-blue-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devflow-blue"
          >
            Edit Project
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="min-h-11 rounded-lg border border-devflow-error/30 px-4 py-2.5 text-sm font-medium text-devflow-error transition-colors hover:bg-devflow-error/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devflow-error"
          >
            Delete Project
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProjectHeader;
