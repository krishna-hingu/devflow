import { Link, useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import DevFlowContext from "../context/DevFlowContext";

function TaskDetails() {
  const { taskList, projectList, completeTask, deleteTask } =
    useContext(DevFlowContext);
  const { projectId, taskId } = useParams();
  const navigate = useNavigate();

  const task = taskList.find(
    (task) =>
      task.id === Number(taskId) && task.projectId === Number(projectId),
  );

  if (!task) {
    return <h1 className="text-xl font-semibold text-devflow-text">No Task Found</h1>;
  }

  const project = projectList.find((project) => project.id === task.projectId);

  const handleCompleteTask = () => {
    completeTask(task.id);
  };

  const handleDeleteTask = () => {
    deleteTask(task.id);
    navigate(`/projects/${projectId}`);
  };

  return (
    <main className="mx-auto w-full max-w-5xl min-w-0">
      <section className="rounded-xl border border-devflow-border bg-devflow-card p-4">
        <h1 className="break-words text-xl font-semibold text-devflow-text sm:text-2xl">
          {task.title}
        </h1>

        <p className="mt-3 max-w-2xl break-words text-sm leading-6 text-devflow-text-muted sm:text-base sm:leading-7">
          {task.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-devflow-text-muted">Status</span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium sm:text-sm ${
                task.status === "Completed"
                  ? "bg-devflow-success/10 text-devflow-success"
                  : task.status === "In Progress"
                    ? "bg-devflow-blue/10 text-devflow-blue"
                    : "bg-devflow-warning/10 text-devflow-warning"
              }`}
            >
              {task.status}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-devflow-text-muted">Priority</span>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                task.priority === "High"
                  ? "bg-devflow-error/10 text-devflow-error"
                  : task.priority === "Medium"
                    ? "bg-devflow-warning/10 text-devflow-warning"
                    : "bg-slate-500/10 text-slate-300"
              }`}
            >
              {task.priority}
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 border-t border-devflow-border pt-5 sm:grid-cols-2 sm:gap-6">
          <div className="min-w-0">
            <span className="text-sm text-devflow-text-muted">Due Date</span>
            <p className="mt-1 break-words text-sm font-medium text-devflow-text">
              {task.dueDate}
            </p>
          </div>
          <div className="min-w-0">
            <span className="text-sm text-devflow-text-muted">Project</span>
            <p className="mt-1 break-words text-sm font-medium text-devflow-text">
              {project?.name || "Unknown Project"}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2 border-t border-devflow-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to={`/projects/${projectId}`}
            className="inline-flex min-h-10 items-center rounded-lg px-3 py-2 text-sm font-medium text-devflow-text-muted transition-colors hover:bg-devflow-background hover:text-devflow-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devflow-blue"
          >
            ← Return to Project
          </Link>

          <div className="grid grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:justify-end sm:gap-3">
            <button
              type="button"
              className="min-h-10 rounded-lg border border-devflow-border px-4 py-2.5 text-sm font-medium text-devflow-text transition-colors hover:bg-devflow-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devflow-blue"
              onClick={() => navigate(`/projects/${projectId}/tasks/${taskId}/edit`)}
            >
              Edit
            </button>

            <button
              type="button"
              className="min-h-10 rounded-lg bg-devflow-blue px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-devflow-blue-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devflow-blue"
              onClick={handleCompleteTask}
              disabled={task.status === "Completed"}
            >
              {task.status === "Completed" ? "Task Completed" : "Complete Task"}
            </button>

            <button
              type="button"
              onClick={handleDeleteTask}
              className="min-h-10 rounded-lg border border-devflow-error/40 px-4 py-2.5 text-sm font-medium text-devflow-error transition-colors hover:bg-devflow-error/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devflow-error"
            >
              Delete
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default TaskDetails;
