import { NavLink } from "react-router-dom";
const navigationItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Projects",
    path: "/projects",
  },
  {
    name: "Tasks",
    path: "/tasks",
  },
  {
    name: "Activity",
    path: "/activity",
  },
  {
    name: "Analytics",
    path: "/analytics",
  },
];

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-devflow-sidebar border-r border-devflow-border">
      <div className="px-6 py-5">
        <h1 className="text-xl font-bold text-devflow-text ">Devflow</h1>
      </div>
      <nav className="flex flex-col px-4 gap-1">
        {navigationItems.map((item) => {
          return (
            <NavLink
              to={item.path}
              key={item.path}
              className={({ isActive }) =>
                isActive ? "py-2 px-3 bg-blue-500" : "py-2 px-3"
              }
            >
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
export default Sidebar;
