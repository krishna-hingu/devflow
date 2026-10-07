import { useParams } from "react-router-dom";
import tasks from "../data/tasks";
import projects from "../data/projects";

function TaskDetails() {
  const { projectId, taskId } = useParams();
  const task = tasks.find(
    (task) =>
      task.id === Number(taskId) && task.projectId === Number(projectId),
  );
  if (!task) {
    return <h1>No Task Found</h1>;
  }
  const project = projects.find((project) => project.id === task.projectId);
  return (
    <main className="mx-auto max-w-4xl">
      <section className="rounded-xl border border-devflow-border bg-devflow-card p-6">
        <h1 className="text-2xl font-semibold text-devflow-text">
          {task.title}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-devflow-text-muted">
          {task.description}
        </p>
        <div className="mt-6 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-devflow-text-muted">Status</span>
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${task.status === "Completed" ? "bg-devflow-success/10 text-devflow-success" : task.status === "In Progress" ? "bg-devflow-blue/10 text-devflow-blue" : "bg-devflow-warning/10 text-devflow-warning"}`}
            >
              {task.status}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-devflow-text-muted">Priority</span>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${task.priority === "High" ? "bg-devflow-error/10 text-devflow-error" : "bg-devflow-warning/10 text-devflow-warning"}`}
            >
              {task.priority}
            </span>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-6 border-t border-devflow-border pt-5">
          <div>
            <span className="text-sm text-devflow-text-muted">Due Date</span>
            <p className="mt-1 text-sm font-medium text-devflow-text">
              {task.dueDate}
            </p>
          </div>
          <div>
            <span className="text-sm text-devflow-text-muted">Project</span>
            <p className="mt-1 text-sm font-medium text-devflow-text">
              {project.name}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
export default TaskDetails;
