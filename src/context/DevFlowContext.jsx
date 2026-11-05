import { createContext, useState } from "react";
import tasks from "../data/tasks";
import projects from "../data/projects";

const DevFlowContext = createContext();

export function DevFlowProvider({ children }) {
  const [taskList, setTaskList] = useState(tasks);
  const [projectList, setProjectList] = useState(projects);

  // Project CRUD Function
  const addProject = (newProject) => {
    setProjectList((currentProjects) => [...currentProjects, newProject]);
  };

  const updateProject = (projectId, updatedData) => {
    setProjectList((currentProjects) =>
      currentProjects.map((project) =>
        project.id === projectId ? { ...project, ...updatedData } : project,
      ),
    );
  };

  const deleteProject = (projectId) => {
    setProjectList((currentProjects) =>
      currentProjects.filter((project) => project.id !== projectId),
    );

    setTaskList((currentTasks) =>
      currentTasks.filter((task) => task.projectId !== projectId),
    );
  };

  return (
    <DevFlowContext.Provider
      value={{
        taskList,
        setTaskList,
        projectList,
        setProjectList,
        addProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </DevFlowContext.Provider>
  );
}
export default DevFlowContext;
