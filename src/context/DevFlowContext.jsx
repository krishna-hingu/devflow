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

  // Task CRUD Functions
  const addTask = (newTask) => {
    setTaskList((currentTasks) => {
      const newTaskId = Math.max(...currentTasks.map((task) => task.id), 0) + 1;

      return [
        ...currentTasks,
        {
          ...newTask,
          id: newTaskId,
        },
      ];
    });
  };

  const updateTask = (taskId, updatedData) => {
    setTaskList((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              ...updatedData,
              id: task.id,
              projectId: task.projectId,
            }
          : task,
      ),
    );
  };

  const deleteTask = (taskId) => {
    setTaskList((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  };

  const completeTask = (taskId) => {
    setTaskList((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, status: "Completed" } : task,
      ),
    );
  };

  return (
    <DevFlowContext.Provider
      value={{
        taskList,
        setTaskList,
        projectList,
        setProjectList,

        // Project CRUD
        addProject,
        updateProject,
        deleteProject,

        // Task CRUD
        addTask,
        updateTask,
        deleteTask,
        completeTask,
      }}
    >
      {children}
    </DevFlowContext.Provider>
  );
}
export default DevFlowContext;
