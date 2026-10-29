import { useParams } from "react-router-dom";
import { useContext } from "react";
import DevFlowContext from "../context/DevFlowContext";

import ProjectHeader from "../components/projects/ProjectHeader";
import ProjectProgress from "../components/projects/ProjectProgress";
import ProjectTasks from "../components/projects/ProjectTasks";

function ProjectDetails() {
  const { projectId } = useParams();
  const { taskList, projectList } = useContext(DevFlowContext);
  const project = projectList.find(
    (project) => project.id === Number(projectId),
  );
  if (!project) {
    return <h1>Project Not Found</h1>;
  }
  const projectTasks = taskList.filter((task) => task.projectId === project.id);
  return (
    <>
      <ProjectHeader project={project} />
      <ProjectProgress project={project} />
      <ProjectTasks tasks={projectTasks} projectId={projectId} />
    </>
  );
}
export default ProjectDetails;
