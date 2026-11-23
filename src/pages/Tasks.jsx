import { useContext, useState } from "react";
import DevFlowContext from "../context/DevFlowContext";
import getTaskStats from "../utils/taskStats";
import TaskRow from "../components/tasks/TaskRow";

function Tasks() {
  const { taskList, projectList } = useContext(DevFlowContext);

  const [activeFilter, setActiveFilter] = useState("All");

  // Calculate task summary metrics
  const { totalTasks, pendingTasks, inProgressTasks, completedTasks } =
    getTaskStats(taskList);

  // Filter tasks based on selected status
  const filteredTasks =
    activeFilter === "All"
      ? taskList
      : taskList.filter((task) => task.status === activeFilter);

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-xl font-bold text-devflow-text sm:text-2xl">My Tasks</h1>

        <p className="mt-1 text-sm text-devflow-text-muted">
          Manage and track all your work in one place.
        </p>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Tasks */}
        <div className="group rounded-xl border border-violet-500/20 bg-violet-500/10 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/50 hover:bg-violet-500/15 hover:shadow-lg hover:shadow-violet-500/10">
          <p className="text-sm font-medium text-violet-300">Total Tasks</p>

          <h2 className="mt-3 text-3xl font-bold text-devflow-text transition-colors group-hover:text-violet-300">
            {totalTasks}
          </h2>
        </div>

        {/* Pending */}
        <div className="group rounded-xl border border-amber-500/20 bg-amber-500/10 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/50 hover:bg-amber-500/15 hover:shadow-lg hover:shadow-amber-500/10">
          <p className="text-sm font-medium text-amber-300">Pending</p>

          <h2 className="mt-3 text-3xl font-bold text-devflow-text transition-colors group-hover:text-amber-300">
            {pendingTasks}
          </h2>
        </div>

        {/* In Progress */}
        <div className="group rounded-xl border border-blue-500/20 bg-blue-500/10 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-blue-500/15 hover:shadow-lg hover:shadow-blue-500/10">
          <p className="text-sm font-medium text-blue-300">In Progress</p>

          <h2 className="mt-3 text-3xl font-bold text-devflow-text transition-colors group-hover:text-blue-300">
            {inProgressTasks}
          </h2>
        </div>

        {/* Completed */}
        <div className="group rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/50 hover:bg-emerald-500/15 hover:shadow-lg hover:shadow-emerald-500/10">
          <p className="text-sm font-medium text-emerald-300">Completed</p>

          <h2 className="mt-3 text-3xl font-bold text-devflow-text transition-colors group-hover:text-emerald-300">
            {completedTasks}
          </h2>
        </div>
      </div>

      {/* Task Overview */}
      <section className="space-y-5">
        {/* Task Overview Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-devflow-text">
              Task Overview
            </h2>

            <p className="mt-1 text-sm text-devflow-text-muted">
              View and manage tasks across all your projects.
            </p>
          </div>

          {/* Status Filter */}
          <div className="flex w-full items-center gap-3 sm:w-auto">
            <label
              htmlFor="task-filter"
              className="text-sm text-devflow-text-muted"
            >
              Filter by
            </label>

            <select
              id="task-filter"
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="min-h-11 min-w-0 flex-1 rounded-lg border border-devflow-border bg-devflow-card px-3 py-2 text-sm text-devflow-text outline-none transition-colors focus:border-violet-500 sm:flex-none sm:px-4"
            >
              <option value="All">All Tasks</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Filter Result Count */}
        <p className="text-sm text-devflow-text-muted">
          Showing {filteredTasks.length} tasks
        </p>
        <div className="space-y-3">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => {
              const project = projectList.find(
                (project) => project.id === task.projectId,
              );

              return <TaskRow key={task.id} task={task} project={project} />;
            })
          ) : (
            <div className="rounded-xl border border-devflow-border bg-devflow-card px-6 py-10 text-center">
              <h3 className="font-semibold text-devflow-text">
                {taskList.length === 0 ? "No tasks yet" : "No matching tasks"}
              </h3>

              <p className="mt-2 text-sm text-devflow-text-muted">
                {taskList.length === 0
                  ? "Create your first task to get started."
                  : "Try selecting a different status filter."}
              </p>

              {taskList.length > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveFilter("All")}
                  className="mt-4 rounded-lg border border-devflow-border px-4 py-2 text-sm text-devflow-text transition-colors hover:border-violet-500 hover:text-violet-300"
                >
                  Show all tasks
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Tasks;
