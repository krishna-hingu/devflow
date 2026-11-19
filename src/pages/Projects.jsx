import ProjectCard from "../components/projects/ProjectCard";
import { useContext, useState } from "react";
import DevFlowContext from "../context/DevFlowContext";
import CreateProjectModal from "../components/projects/CreateProjectModal";
function Projects() {
  const { projectList, taskList } = useContext(DevFlowContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* project header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-devflow-text">Projects</h1>
          <p className="mt-1 text-sm text-devflow-text-muted">
            Manage and track your projects.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-lg bg-devflow-blue px-4 py-2 text-sm font-medium text-white hover:bg-devflow-blue-hover"
        >
          + Create Project
        </button>
      </div>

      {/* project list card  */}
      <div className="space-y-2">
        {projectList.map((project) => {
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
        })}
      </div>
      {/* Create project modal */}
      {isModalOpen && (
        <CreateProjectModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
export default Projects;
