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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4">
      <div className="my-auto max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-xl border border-devflow-border bg-devflow-card p-4 shadow-xl sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3 sm:mb-6">
          <h2 className="text-lg font-semibold text-devflow-text sm:text-xl">
            Create New Task
          </h2>
          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg text-devflow-text-muted transition-colors hover:bg-devflow-background hover:text-devflow-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devflow-blue"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="taskTitle" className="mb-1.5 block text-xs font-medium text-devflow-text">
              Task Title
            </label>
            <input
              id="taskTitle"
              type="text"
              placeholder="Enter task title"
              value={newTaskTitle}
              onChange={(event) => setNewTaskTitle(event.target.value)}
              className="w-full min-w-0 rounded-lg border border-devflow-border bg-devflow-background px-3 py-2 text-[13px] text-devflow-text outline-none focus:border-devflow-blue"
            />
          </div>

          <div>
            <label htmlFor="taskDescription" className="mb-1.5 block text-xs font-medium text-devflow-text">
              Description
            </label>
            <textarea
              id="taskDescription"
              rows="3"
              placeholder="Describe your task..."
              value={newTaskDescription}
              onChange={(event) => setNewTaskDescription(event.target.value)}
              className="w-full min-w-0 resize-y rounded-lg border border-devflow-border bg-devflow-background px-3 py-2 text-[13px] text-devflow-text outline-none focus:border-devflow-blue"
            />
          </div>

          <div>
            <label htmlFor="taskStatus" className="mb-1.5 block text-xs font-medium text-devflow-text">
              Task Status
            </label>
            <select
              id="taskStatus"
              value={newTaskStatus}
              onChange={(event) => setNewTaskStatus(event.target.value)}
              className="w-full min-w-0 rounded-lg border border-devflow-border bg-devflow-background px-3 py-2 text-[13px] text-devflow-text outline-none focus:border-devflow-blue"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label htmlFor="taskPriority" className="mb-1.5 block text-xs font-medium text-devflow-text">
              Task Priority
            </label>
            <select
              id="taskPriority"
              value={newTaskPriority}
              onChange={(event) => setNewTaskPriority(event.target.value)}
              className="w-full min-w-0 rounded-lg border border-devflow-border bg-devflow-background px-3 py-2 text-[13px] text-devflow-text outline-none focus:border-devflow-blue"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label htmlFor="taskDueDate" className="mb-1.5 block text-xs font-medium text-devflow-text">
              Due Date
            </label>
            <input
              id="taskDueDate"
              type="date"
              value={newTaskDueDate}
              onChange={(event) => setNewTaskDueDate(event.target.value)}
              className="w-full min-w-0 rounded-lg border border-devflow-border bg-devflow-background px-3 py-2 text-[13px] text-devflow-text outline-none focus:border-devflow-blue"
            />
          </div>

          <div className="flex flex-col-reverse gap-2 border-t border-devflow-border pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="min-h-10 rounded-lg border border-devflow-border px-3 py-2 text-xs font-medium text-devflow-text-muted transition-colors hover:bg-devflow-background"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-h-10 rounded-lg bg-devflow-blue px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-devflow-blue-hover"
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
