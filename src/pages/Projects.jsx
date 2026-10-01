import ProjectCard from "../components/projects/ProjectCard";

const projects = [
  {
    id: 1,
    name: "DevFlow Dashboard",
    description:
      "Developer productivity dashboard built with React and Tailwind.",
    status: "In Progress",
    progress: 65,
    dueDate: "2026-10-15",
    tasks: {
      total: 12,
      completed: 8,
    },
  },
  {
    id: 2,
    name: "Portfolio Website",
    description: "Personal developer portfolio and project showcase.",
    status: "Completed",
    progress: 100,
    dueDate: "Sep 30, 2026",
    tasks: {
      total: 10,
      completed: 10,
    },
  },
  {
    id: 3,
    name: "Weather App",
    description: "Weather application using a public weather API.",
    status: "Pending",
    progress: 25,
    dueDate: "Nov 5, 2026",
    tasks: {
      total: 8,
      completed: 2,
    },
  },
];
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
