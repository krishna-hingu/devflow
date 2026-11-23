import { useContext, useState } from "react";
import DevFlowContext from "../../context/DevFlowContext";

function EditProjectModal({ project, onClose }) {
  const [projectName, setProjectName] = useState(project.name);
  const [projectDescription, setProjectDescription] = useState(project.description || "");
  const [projectStatus, setProjectStatus] = useState(project.status);
  const [projectDueDate, setProjectDueDate] = useState(project.dueDate || "");

  const { updateProject } = useContext(DevFlowContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!projectName.trim()) {
      alert("Project name is required.");
      return;
    }

    const updatedProject = {
      name: projectName.trim(),
      description: projectDescription.trim(),
      status: projectStatus,
      dueDate: projectDueDate,
    };

    updateProject(project.id, updatedProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4">
      <div className="my-auto max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-xl border border-devflow-border bg-devflow-card p-4 shadow-xl sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3 sm:mb-6">
          <h2 className="text-lg font-semibold text-devflow-text sm:text-xl">
            Edit Project
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="projectName" className="mb-2 block text-sm font-medium text-devflow-text">
              Project Name
            </label>
            <input
              id="projectName"
              type="text"
              placeholder="Enter project name"
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
              className="w-full min-w-0 rounded-lg border border-devflow-border bg-devflow-background px-3 py-2.5 text-sm text-devflow-text outline-none focus:border-devflow-blue"
            />
          </div>

          <div>
            <label htmlFor="projectDescription" className="mb-2 block text-sm font-medium text-devflow-text">
              Description
            </label>
            <textarea
              id="projectDescription"
              rows="3"
              placeholder="Describe your project..."
              value={projectDescription}
              onChange={(event) => setProjectDescription(event.target.value)}
              className="w-full min-w-0 resize-y rounded-lg border border-devflow-border bg-devflow-background px-3 py-2.5 text-sm text-devflow-text outline-none focus:border-devflow-blue"
            />
          </div>

          <div>
            <label htmlFor="projectStatus" className="mb-2 block text-sm font-medium text-devflow-text">
              Project Status
            </label>
            <select
              id="projectStatus"
              value={projectStatus}
              onChange={(event) => setProjectStatus(event.target.value)}
              className="w-full min-w-0 rounded-lg border border-devflow-border bg-devflow-background px-3 py-2.5 text-sm text-devflow-text outline-none focus:border-devflow-blue"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label htmlFor="projectDueDate" className="mb-2 block text-sm font-medium text-devflow-text">
              Due Date
            </label>
            <input
              id="projectDueDate"
              type="date"
              value={projectDueDate}
              onChange={(event) => setProjectDueDate(event.target.value)}
              className="w-full min-w-0 rounded-lg border border-devflow-border bg-devflow-background px-3 py-2.5 text-sm text-devflow-text outline-none focus:border-devflow-blue"
            />
          </div>

          <div className="flex flex-col-reverse gap-2 border-t border-devflow-border pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 rounded-lg border border-devflow-border px-4 py-2.5 text-sm font-medium text-devflow-text-muted transition-colors hover:bg-devflow-background"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-h-11 rounded-lg bg-devflow-blue px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-devflow-blue-hover"
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
