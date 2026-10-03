import ProjectCard from "../components/projects/ProjectCard";
import projects from "../data/projects";
function Projects() {
  return (
    <>
      <h1>Projects Page</h1>
      <div>
        {projects.map((project) => {
          return <ProjectCard key={project.id} project={project} />;
        })}
      </div>
    </>
  );
}
export default Projects;
