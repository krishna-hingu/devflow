import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="min-h-screen bg-devflow-background p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
