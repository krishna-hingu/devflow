import { createContext, useState } from "react";
import tasks from "../data/tasks";

const DevFlowContext = createContext();

export function DevFlowProvider({ children }) {
  const [taskList, setTaskList] = useState(tasks);
  return (
    <DevFlowContext.Provider value={{ taskList, setTaskList }}>
      {children}
    </DevFlowContext.Provider>
  );
}
export default DevFlowContext;
