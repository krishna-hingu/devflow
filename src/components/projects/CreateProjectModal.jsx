import { useContext, useState } from "react";
import DevFlowContext from "../../context/DevFlowContext";

function CreateProjectModal({ onClose }) {
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [newProjectStatus, setNewProjectStatus] = useState("Pending");
  const [newProjectDueDate, setNewProjectDueDate] = useState("");

  const { addProject, projectList } = useContext(DevFlowContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!newProjectName.trim()) {
      alert("Project name is required.");
      return;
    }

    const newProjectId =
      Math.max(...projectList.map((project) => project.id), 0) + 1;

    const newProject = {
      id: newProjectId,
      name: newProjectName.trim(),
      description: newProjectDescription.trim(),
      status: newProjectStatus,
      dueDate: newProjectDueDate,
    };

    addProject(newProject);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-lg rounded-xl border border-devflow-border bg-devflow-card p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-devflow-text">
            Create New Project
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
              htmlFor="projectName"
              className="mb-2 block text-sm font-medium text-devflow-text"
            >
              Project Name
            </label>

            <input
              id="projectName"
              type="text"
              placeholder="Enter project name"
              value={newProjectName}
              onChange={(event) => setNewProjectName(event.target.value)}
              className="w-full rounded-lg border border-devflow-border bg-devflow-background px-3 py-2 text-sm text-devflow-text outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="projectDescription"
              className="mb-2 block text-sm font-medium text-devflow-text"
            >
              Description
            </label>

            <textarea
              id="projectDescription"
              rows="3"
              placeholder="Describe your project..."
              value={newProjectDescription}
              onChange={(event) => setNewProjectDescription(event.target.value)}
              className="w-full rounded-lg border border-devflow-border bg-devflow-background px-3 py-2 text-sm text-devflow-text outline-none"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="projectStatus"
              className="mb-2 block text-sm font-medium text-devflow-text"
            >
              Project Status
            </label>

            <select
              id="projectStatus"
              value={newProjectStatus}
              onChange={(event) => setNewProjectStatus(event.target.value)}
              className="w-full rounded-lg border border-devflow-border bg-devflow-background px-3 py-2 text-sm text-devflow-text outline-none"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="projectDueDate"
              className="mb-2 block text-sm font-medium text-devflow-text"
            >
              Due Date
            </label>

            <input
              id="projectDueDate"
              type="date"
              value={newProjectDueDate}
              onChange={(event) => setNewProjectDueDate(event.target.value)}
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
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProjectModal;
