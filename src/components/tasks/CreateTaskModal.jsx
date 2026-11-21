import { useContext, useState } from "react";
import DevFlowContext from "../../context/DevFlowContext";

function CreateTaskModal({ projectId, onClose }) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState("Pending");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");

  const { addTask } = useContext(DevFlowContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!newTaskTitle.trim()) {
      alert("Task title is required.");
      return;
    }

    if (!newTaskDueDate) {
      alert("Task due date is required.");
      return;
    }

    const newTask = {
      projectId: Number(projectId),
      title: newTaskTitle.trim(),
      description: newTaskDescription.trim(),
      status: newTaskStatus,
      priority: newTaskPriority,
      dueDate: newTaskDueDate,
    };

    addTask(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-lg rounded-xl border border-devflow-border bg-devflow-card p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-devflow-text">
            Create New Task
          </h2>

          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="text-devflow-text-muted hover:text-devflow-text"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="taskTitle"
              className="mb-2 block text-sm font-medium text-devflow-text"
            >
              Task Title
            </label>

            <input
              id="taskTitle"
              type="text"
              placeholder="Enter task title"
              value={newTaskTitle}
              onChange={(event) => setNewTaskTitle(event.target.value)}
              className="w-full rounded-lg border border-devflow-border bg-devflow-background px-3 py-2 text-sm text-devflow-text outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="taskDescription"
              className="mb-2 block text-sm font-medium text-devflow-text"
            >
              Description
            </label>

            <textarea
              id="taskDescription"
              rows="3"
              placeholder="Describe your task..."
              value={newTaskDescription}
              onChange={(event) => setNewTaskDescription(event.target.value)}
              className="w-full rounded-lg border border-devflow-border bg-devflow-background px-3 py-2 text-sm text-devflow-text outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="taskStatus"
              className="mb-2 block text-sm font-medium text-devflow-text"
            >
              Task Status
            </label>

            <select
              id="taskStatus"
              value={newTaskStatus}
              onChange={(event) => setNewTaskStatus(event.target.value)}
              className="w-full rounded-lg border border-devflow-border bg-devflow-background px-3 py-2 text-sm text-devflow-text outline-none"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="taskPriority"
              className="mb-2 block text-sm font-medium text-devflow-text"
            >
              Task Priority
            </label>

            <select
              id="taskPriority"
              value={newTaskPriority}
              onChange={(event) => setNewTaskPriority(event.target.value)}
              className="w-full rounded-lg border border-devflow-border bg-devflow-background px-3 py-2 text-sm text-devflow-text outline-none"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="taskDueDate"
              className="mb-2 block text-sm font-medium text-devflow-text"
            >
              Due Date
            </label>

            <input
              id="taskDueDate"
              type="date"
              value={newTaskDueDate}
              onChange={(event) => setNewTaskDueDate(event.target.value)}
              className="w-full rounded-lg border border-devflow-border bg-devflow-background px-3 py-2 text-sm text-devflow-text outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-devflow-border px-4 py-2 text-sm font-medium text-devflow-text-muted hover:bg-devflow-background"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-devflow-blue px-4 py-2 text-sm font-medium text-white hover:bg-devflow-blue-hover"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTaskModal;
