import ProjectCard from "../components/projects/ProjectCard";
import { useContext } from "react";
import DevFlowContext from "../context/DevFlowContext";
function Projects() {
  const { projectList } = useContext(DevFlowContext);
  return (
    <>
      <div>
        {projectList.map((project) => {
          return <ProjectCard key={project.id} project={project} />;
        })}
      </div>
    </>
  );
}
export default Projects;
