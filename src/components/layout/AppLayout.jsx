import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import tasks from "../../data/tasks";
import { useState } from "react";
function AppLayout() {
  const [taskList, setTaskList] = useState(tasks);
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="min-h-screen bg-devflow-background p-6">
          <Outlet context={{taskList, setTaskList}}/>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
