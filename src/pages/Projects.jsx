import ProjectCard from "../components/projects/ProjectCard";
import { useContext, useState } from "react";
import DevFlowContext from "../context/DevFlowContext";
import CreateProjectModal from "../components/projects/CreateProjectModal";

function Projects() {
  const { projectList, taskList } = useContext(DevFlowContext);
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);

  return (
    <>
      {/* Project Heading and Primary Action */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-lg font-semibold text-devflow-text sm:text-xl">
            Projects
          </h1>
          <p className="mt-1 text-sm text-devflow-text-muted">
            Manage and track your projects.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateProjectModalOpen(true)}
          className="inline-flex min-h-10 w-full items-center justify-center rounded-lg bg-devflow-blue px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-devflow-blue-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devflow-blue focus-visible:ring-offset-2 focus-visible:ring-offset-devflow-background sm:w-auto"
        >
          + Create Project
        </button>
      </div>

      {/* Project List */}
      <div className="space-y-3">
        {projectList.length > 0 ? (
          projectList.map((project) => {
            const projectTasks = taskList.filter(
              (task) => task.projectId === project.id,
            );

            return (
              <ProjectCard
                key={project.id}
                project={project}
                tasks={projectTasks}
              />
            );
          })
        ) : (
          <div className="rounded-xl border border-devflow-border bg-devflow-card px-5 py-10 text-center">
            <h2 className="font-semibold text-devflow-text">
              No projects yet
            </h2>
            <p className="mt-2 text-sm text-devflow-text-muted">
              Create your first project to get started.
            </p>
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      {isCreateProjectModalOpen && (
        <CreateProjectModal onClose={() => setIsCreateProjectModalOpen(false)} />
      )}
    </>
  );
}

export default Projects;
