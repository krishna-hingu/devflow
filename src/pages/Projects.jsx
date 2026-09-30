import { Link } from "react-router-dom";

const projects = [
  { id: 1, name: "DevFlow Dashboard" },
  { id: 2, name: "Portfolio Website" },
  { id: 3, name: "Weather App" },
];
function Projects() {
  return (
    <>
      <h1>Projects Page</h1>
      <div>
        {projects.map((project) => {
          return (
            <div className="mb-2 bg-amber-900 text-white p-4 min-w-2" key={project.id}>
              <h2>{project.name}</h2>
              <Link to={`/projects/${project.id}`} className="bg-amber-600 p-1">
                {" "}
                View{" "}
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default Projects;
