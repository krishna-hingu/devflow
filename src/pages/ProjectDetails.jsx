import { useParams } from "react-router-dom";
import projects from "../data/projects";
import tasks from "../data/tasks";

import ProjectHeader from "../components/projects/ProjectHeader";
import ProjectProgress from "../components/projects/ProjectProgress";
import ProjectTasks from "../components/projects/ProjectTasks";

function ProjectDetails() {
  const { projectId } = useParams();
  const project = projects.find((project) => project.id === Number(projectId));
  if (!project) {
    return <h1>Project Not Found</h1>;
  }
  const projectTasks = tasks.filter((task) => task.projectId === project.id)
  return (
    <>
        <ProjectHeader project={project}/>
        <ProjectProgress project={project} />
        <ProjectTasks tasks={projectTasks} />
    </>
  );
}
export default ProjectDetails;
