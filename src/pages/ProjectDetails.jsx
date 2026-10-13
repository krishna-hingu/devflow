import { useParams, useOutletContext } from "react-router-dom";
import projects from "../data/projects";

import ProjectHeader from "../components/projects/ProjectHeader";
import ProjectProgress from "../components/projects/ProjectProgress";
import ProjectTasks from "../components/projects/ProjectTasks";

function ProjectDetails() {
  const { projectId } = useParams();
  const { taskList } = useOutletContext();
  const project = projects.find((project) => project.id === Number(projectId));
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
