function ProjectTasks({ tasks }) {
  return (
    <section className="rounded-xl border border-devflow-border bg-devflow-card p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-devflow-text">Tasks</h2>
          <p className="mt-1 text-sm text-devflow-text-muted">
            Manage the work inside this project.
          </p>
        </div>
        <div>
          <button className="rounded-lg bg-devflow-blue px-4 py-2 text-sm font-medium text-devflow-text hover:bg-devflow-blue-hover">
            + Add Task
          </button>
        </div>
      </div>
      <div>
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-start justify-between gap-6 border-b border-devflow-border py-4"
          >
            {/* Left */}
            <div>
              <h3 className="font-medium text-devflow-text">{task.title}</h3>
              <p className="mt-1 text-sm text-devflow-text-muted">
                {task.description}
              </p>
            </div>
            {/* Right */}
            <div className="flex items-center gap-6 text-sm text-devflow-text-muted">
              <span
                className={`rounded-full px-3 py-1 font-medium ${task.status === "Completed" ? "bg-devflow-success/10 text-devflow-success" : task.status === "In Progress" ? "bg-devflow-blue/10 text-devflow-blue" : "bg-devflow-warning/10 text-devflow-warning"}`}
              >
                {task.status}
              </span>
              <span
                className={`rounded-full px-3 py-1 font-medium text-xs ${task.priority === "High" ? "bg-devflow-error/10 text-devflow-error" : "bg-devflow-warning/10 text-devflow-warning"}`}
              >
                {task.priority}
              </span>
              <span className="text-xs text-devflow-text-muted">Due {task.dueDate}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default ProjectTasks;
