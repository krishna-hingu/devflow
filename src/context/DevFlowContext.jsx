import { createContext, useState } from "react";
import tasks from "../data/tasks";
import projects from "../data/projects";

const DevFlowContext = createContext();

export function DevFlowProvider({ children }) {
  const [taskList, setTaskList] = useState(tasks);
  const [projectList, setProjectList] = useState(projects);
  return (
    <DevFlowContext.Provider
      value={{ taskList, setTaskList, projectList, setProjectList }}
    >
      {children}
    </DevFlowContext.Provider>
  );
}
export default DevFlowContext;
