import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import DevFlowContext from "../context/DevFlowContext";

import ProjectHeader from "../components/projects/ProjectHeader";
import ProjectProgress from "../components/projects/ProjectProgress";
import ProjectTasks from "../components/projects/ProjectTasks";

import EditProjectModal from "../components/projects/EditProjectModal";

function ProjectDetails() {
  const navigate = useNavigate();

  const { projectId } = useParams();
  const { taskList, projectList, deleteProject } = useContext(DevFlowContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const project = projectList.find(
    (project) => project.id === Number(projectId),
  );
  if (!project) {
    return <h1>Project Not Found</h1>;
  }
  const projectTasks = taskList.filter((task) => task.projectId === project.id);
  const handleDeleteProject = () => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete "${project.name}"? All tasks in this project will also be deleted.`,
    );

    if (!isConfirmed) {
      return;
    }

    deleteProject(project.id);
    navigate("/projects");
  };

  return (
    <>
      <div className="space-y-4">
        <ProjectHeader
          project={project}
          onEdit={() => setIsEditModalOpen(true)}
          onDelete={handleDeleteProject}
        />
        <ProjectProgress project={project} tasks={projectTasks} />
        <ProjectTasks tasks={projectTasks} projectId={projectId} />

        {isEditModalOpen && (
          <EditProjectModal
            project={project}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}
      </div>
    </>
  );
}
export default ProjectDetails;
