import ProjectCard from "../components/projects/ProjectCard";
import { useContext } from "react";
import DevFlowContext from "../context/DevFlowContext";
function Projects() {
  const { projectList, taskList } = useContext(DevFlowContext);
  return (
    <>
      <div>
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
    </>
  );
}
export default Projects;
