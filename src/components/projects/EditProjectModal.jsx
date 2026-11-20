import { useContext, useState } from "react";
import DevFlowContext from "../../context/DevFlowContext";

function EditProjectModal({ project, onClose }) {
  // Initialize form fields with existing project data
  const [projectName, setProjectName] = useState(project.name);
  const [projectDescription, setProjectDescription] = useState(
    project.description || "",
  );
  const [projectStatus, setProjectStatus] = useState(project.status);
  const [projectDueDate, setProjectDueDate] = useState(project.dueDate || "");

  const { updateProject } = useContext(DevFlowContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate project name
    if (!projectName.trim()) {
      alert("Project name is required.");
      return;
    }

    // Prepare updated project data
    const updatedProject = {
      name: projectName.trim(),
      description: projectDescription.trim(),
      status: projectStatus,
      dueDate: projectDueDate,
    };

    // Update project through Context
    updateProject(project.id, updatedProject);

    // Close modal after successful update
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-lg rounded-xl border border-devflow-border bg-devflow-card p-6 shadow-xl">
        {/* Modal Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-devflow-text">
            Edit Project
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

        {/* Edit Project Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Project Name */}
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
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
              className="w-full rounded-lg border border-devflow-border bg-devflow-background px-3 py-2 text-sm text-devflow-text outline-none"
            />
          </div>

          {/* Description */}
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
              value={projectDescription}
              onChange={(event) => setProjectDescription(event.target.value)}
              className="w-full rounded-lg border border-devflow-border bg-devflow-background px-3 py-2 text-sm text-devflow-text outline-none"
            ></textarea>
          </div>

          {/* Project Status */}
          <div>
            <label
              htmlFor="projectStatus"
              className="mb-2 block text-sm font-medium text-devflow-text"
            >
              Project Status
            </label>

            <select
              id="projectStatus"
              value={projectStatus}
              onChange={(event) => setProjectStatus(event.target.value)}
              className="w-full rounded-lg border border-devflow-border bg-devflow-background px-3 py-2 text-sm text-devflow-text outline-none"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Due Date */}
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
              value={projectDueDate}
              onChange={(event) => setProjectDueDate(event.target.value)}
              className="w-full rounded-lg border border-devflow-border bg-devflow-background px-3 py-2 text-sm text-devflow-text outline-none"
            />
          </div>

          {/* Modal Actions */}
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProjectModal;
