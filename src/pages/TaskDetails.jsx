import { useParams } from "react-router-dom";
import tasks from "../data/tasks";

function TaskDetails() {
  const { projectId, taskId } = useParams();
  const task = tasks.find(
    (task) =>
      task.id === Number(taskId) && task.projectId === Number(projectId),
  );
  if (!task) {
    return <h1>No Task Found</h1>;
  }
  return (
    <main className="mx-auto max-w-4xl">
      <section className="rounded-xl border border-devflow-border bg-devflow-card p-6">
        <h1 className="text-2xl font-semibold text-devflow-text">
          {task.title}
        </h1>
        <p className=" mt-3 max-w-2xl text-base leading-7 text-devflow-text-muted">
          {task.description}
        </p>
      </section>
    </main>
  );
}
export default TaskDetails;
