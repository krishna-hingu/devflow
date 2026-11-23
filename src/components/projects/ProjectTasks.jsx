import { Link } from "react-router-dom";
import { useState } from "react";
import CreateTaskModal from "../tasks/CreateTaskModal";

function ProjectTasks({ tasks, projectId }) {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

  return (
    <section className="rounded-xl border border-devflow-border bg-devflow-card p-4 sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-devflow-text">Tasks</h2>
          <p className="mt-1 text-sm text-devflow-text-muted">
            Manage the work inside this project.
          </p>
        </div>

        <button
          type="button"
          className="min-h-11 w-full shrink-0 rounded-lg bg-devflow-blue px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-devflow-blue-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devflow-blue sm:w-auto"
          onClick={() => setIsCreateTaskModalOpen(true)}
        >
          + Add Task
        </button>
      </div>

      <div className="divide-y divide-devflow-border">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Link
              to={`/projects/${projectId}/tasks/${task.id}`}
              key={task.id}
              className="flex min-w-0 flex-col gap-3 py-4 transition-colors hover:bg-devflow-background/40 sm:flex-row sm:items-start sm:justify-between sm:gap-5"
            >
              <div className="min-w-0 flex-1">
                <h3 className="break-words font-medium text-devflow-text">
                  {task.title}
                </h3>
                <p className="mt-1 break-words text-sm leading-5 text-devflow-text-muted">
                  {task.description}
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-2 text-sm text-devflow-text-muted sm:justify-end">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    task.status === "Completed"
                      ? "bg-devflow-success/10 text-devflow-success"
                      : task.status === "In Progress"
                        ? "bg-devflow-blue/10 text-devflow-blue"
                        : "bg-devflow-warning/10 text-devflow-warning"
                  }`}
                >
                  {task.status}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    task.priority === "High"
                      ? "bg-devflow-error/10 text-devflow-error"
                      : task.priority === "Medium"
                        ? "bg-devflow-warning/10 text-devflow-warning"
                        : "bg-slate-500/10 text-slate-300"
                  }`}
                >
                  {task.priority}
                </span>
                <span className="text-xs text-devflow-text-muted">
                  Due {task.dueDate}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className="py-8 text-center">
            <p className="text-sm text-devflow-text-muted">
              No tasks in this project yet.
            </p>
          </div>
        )}
      </div>

      {isCreateTaskModalOpen && (
        <CreateTaskModal
          projectId={projectId}
          onClose={() => setIsCreateTaskModalOpen(false)}
        />
      )}
    </section>
  );
}

export default ProjectTasks;
