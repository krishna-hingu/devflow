import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DevFlowContext from "../context/DevFlowContext";

function EditTask() {
  const { taskList, setTaskList } = useContext(DevFlowContext);
  const { projectId, taskId } = useParams();
  const navigate = useNavigate();

  const task = taskList.find(
    (task) =>
      task.id === Number(taskId) && task.projectId === Number(projectId),
  );

  const [formData, setFormData] = useState({
    title: task?.title ?? "",
    description: task?.description ?? "",
    status: task?.status ?? "",
    priority: task?.priority ?? "",
    dueDate: task?.dueDate ?? "",
  });

  const handleSaveTask = () => {
    console.log("Save Changes clicked");
    setTaskList((currentTasks) => {
      return currentTasks.map((item) => {
        if (item.id === task.id && item.projectId === task.projectId) {
          return {
            ...item,
            ...formData,
          };
        }
        return item;
      });
    });
    navigate(`/projects/${projectId}/tasks/${taskId}`);
  };

  return (
    <main className="mx-auto max-w-5xl">
      <div className="mb-6">
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-devflow-text">
          Edit Task
        </h1>
        <p className="mt-2 text-sm leading-6 text-devflow-text-muted">
          Update your task details, priority, status, and deadline.
        </p>
      </div>

      <form
        className="rounded-xl border border-devflow-border bg-devflow-card p-6 sm:p-8"
        onSubmit={(event) => {
          event.preventDefault();
          handleSaveTask();
        }}
      >
        <div className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-devflow-text"
            >
              Task title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={(event) => {
                setFormData((previousData) => ({
                  ...previousData,
                  title: event.target.value,
                }));
              }}
              required
              className="w-full rounded-lg border border-devflow-border bg-devflow-background px-4 py-3 text-sm text-devflow-text outline-none transition placeholder:text-devflow-text-muted focus:border-devflow-blue focus:ring-2 focus:ring-devflow-blue/20"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-devflow-text"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={(event) => {
                setFormData((previousData) => ({
                  ...previousData,
                  description: event.target.value,
                }));
              }}
              className="w-full resize-y rounded-lg border border-devflow-border bg-devflow-background px-4 py-3 text-sm leading-6 text-devflow-text outline-none transition placeholder:text-devflow-text-muted focus:border-devflow-blue focus:ring-2 focus:ring-devflow-blue/20"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="status"
                className="mb-2 block text-sm font-medium text-devflow-text"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={(event) => {
                  setFormData((previousData) => ({
                    ...previousData,
                    status: event.target.value,
                  }));
                }}
                className="w-full rounded-lg border border-devflow-border bg-devflow-background px-4 py-3 text-sm text-devflow-text outline-none transition focus:border-devflow-blue focus:ring-2 focus:ring-devflow-blue/20"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="priority"
                className="mb-2 block text-sm font-medium text-devflow-text"
              >
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={(event) => {
                  setFormData((previousData) => ({
                    ...previousData,
                    priority: event.target.value,
                  }));
                }}
                className="w-full rounded-lg border border-devflow-border bg-devflow-background px-4 py-3 text-sm text-devflow-text outline-none transition focus:border-devflow-blue focus:ring-2 focus:ring-devflow-blue/20"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="mb-2 block text-sm font-medium text-devflow-text"
            >
              Due date
            </label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(event) => {
                setFormData((previousData) => ({
                  ...previousData,
                  dueDate: event.target.value,
                }));
              }}
              className="w-full rounded-lg border border-devflow-border bg-devflow-background px-4 py-3 text-sm text-devflow-text outline-none transition focus:border-devflow-blue focus:ring-2 focus:ring-devflow-blue/20 sm:max-w-sm"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-devflow-border pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate(`/projects/${projectId}/tasks/${taskId}`)}
            className="rounded-lg border border-devflow-border px-5 py-3 text-sm font-medium text-devflow-text transition hover:bg-devflow-background"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-devflow-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-devflow-blue-hover focus:outline-none focus:ring-2 focus:ring-devflow-blue/40 focus:ring-offset-2 focus:ring-offset-devflow-card"
          >
            Save Changes
          </button>
        </div>
      </form>
    </main>
  );
}
export default EditTask;
