import { createContext, useState } from "react";
import tasks from "../data/tasks";
import projects from "../data/projects";

const DevFlowContext = createContext();

export function DevFlowProvider({ children }) {
  const [taskList, setTaskList] = useState(tasks);
  const [projectList, setProjectList] = useState(projects);
  const [activityList, setActivityList] = useState([]);

  // Add a new activity event to the beginning of the activity list.
  const addActivity = (activityData) => {
    const newActivity = {
      ...activityData,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
    };

    setActivityList((currentActivities) => [
      newActivity,
      ...currentActivities,
    ]);
  };

  // Project CRUD Functions
  const addProject = (newProject) => {
    setProjectList((currentProjects) => [...currentProjects, newProject]);

    addActivity({
      action: "created",
      entityType: "project",
      entityName: newProject.name,
    });
  };

  const updateProject = (projectId, updatedData) => {
    const existingProject = projectList.find(
      (project) => project.id === projectId,
    );

    setProjectList((currentProjects) =>
      currentProjects.map((project) =>
        project.id === projectId ? { ...project, ...updatedData } : project,
      ),
    );

    if (existingProject) {
      addActivity({
        action: "updated",
        entityType: "project",
        entityName: updatedData.name || existingProject.name,
      });
    }
  };

  const deleteProject = (projectId) => {
    const projectToDelete = projectList.find(
      (project) => project.id === projectId,
    );

    if (!projectToDelete) {
      return;
    }

    const deletedTaskCount = taskList.filter(
      (task) => task.projectId === projectId,
    ).length;

    setProjectList((currentProjects) =>
      currentProjects.filter((project) => project.id !== projectId),
    );

    setTaskList((currentTasks) =>
      currentTasks.filter((task) => task.projectId !== projectId),
    );

    addActivity({
      action: "deleted",
      entityType: "project",
      entityName: projectToDelete.name,
      details:
        deletedTaskCount > 0
          ? `Also removed ${deletedTaskCount} associated ${deletedTaskCount === 1 ? "task" : "tasks"}.`
          : undefined,
    });
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

    const project = projectList.find(
      (item) => item.id === newTask.projectId,
    );

    addActivity({
      action: "created",
      entityType: "task",
      entityName: newTask.title,
      projectName: project?.name || "Unknown project",
    });
  };

  const updateTask = (taskId, updatedData) => {
    const existingTask = taskList.find((task) => task.id === taskId);

    if (!existingTask) {
      return;
    }

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

    const project = projectList.find(
      (item) => item.id === existingTask.projectId,
    );

    const action =
      existingTask.status !== "Completed" &&
      updatedData.status === "Completed"
        ? "completed"
        : "updated";

    addActivity({
      action,
      entityType: "task",
      entityName: updatedData.title || existingTask.title,
      projectName: project?.name || "Unknown project",
    });
  };

  const deleteTask = (taskId) => {
    const taskToDelete = taskList.find((task) => task.id === taskId);

    if (!taskToDelete) {
      return;
    }

    setTaskList((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );

    const project = projectList.find(
      (item) => item.id === taskToDelete.projectId,
    );

    addActivity({
      action: "deleted",
      entityType: "task",
      entityName: taskToDelete.title,
      projectName: project?.name || "Unknown project",
    });
  };

  const completeTask = (taskId) => {
    const taskToComplete = taskList.find((task) => task.id === taskId);

    if (!taskToComplete || taskToComplete.status === "Completed") {
      return;
    }

    setTaskList((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, status: "Completed" } : task,
      ),
    );

    const project = projectList.find(
      (item) => item.id === taskToComplete.projectId,
    );

    addActivity({
      action: "completed",
      entityType: "task",
      entityName: taskToComplete.title,
      projectName: project?.name || "Unknown project",
    });
  };

  return (
    <DevFlowContext.Provider
      value={{
        taskList,
        setTaskList,
        projectList,
        setProjectList,
        activityList,

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
