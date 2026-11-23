import { useContext } from "react";
import { Link } from "react-router-dom";
import DevFlowContext from "../context/DevFlowContext";
import getTaskStats from "../utils/taskStats";
import TaskRow from "../components/tasks/TaskRow";

function Dashboard() {
  const { taskList, projectList } = useContext(DevFlowContext);

  // Calculate task metrics from the shared task list.
  const { totalTasks, pendingTasks, inProgressTasks, completedTasks } =
    getTaskStats(taskList);

  const openTasks = pendingTasks + inProgressTasks;
  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const activeProjects = projectList.filter(
    (project) => project.status === "In Progress",
  ).length;

  const highPriorityOpenTasks = taskList.filter(
    (task) => task.priority === "High" && task.status !== "Completed",
  ).length;

  // Prepare the most important unfinished tasks for the focus queue.
  const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  const focusTasks = taskList
    .filter((task) => task.status !== "Completed")
    .slice()
    .sort((taskA, taskB) => {
      const priorityDifference =
        (priorityOrder[taskA.priority] || 99) -
        (priorityOrder[taskB.priority] || 99);

      if (priorityDifference !== 0) {
        return priorityDifference;
      }

      return (taskA.dueDate || "9999-12-31").localeCompare(
        taskB.dueDate || "9999-12-31",
      );
    })
    .slice(0, 3);

  const statusBreakdown = [
    {
      label: "Completed",
      count: completedTasks,
      color: "bg-emerald-400",
      textColor: "text-emerald-300",
    },
    {
      label: "In Progress",
      count: inProgressTasks,
      color: "bg-blue-400",
      textColor: "text-blue-300",
    },
    {
      label: "Pending",
      count: pendingTasks,
      color: "bg-amber-400",
      textColor: "text-amber-300",
    },
  ];

  const priorityBreakdown = [
    {
      label: "High",
      count: taskList.filter(
        (task) => task.priority === "High" && task.status !== "Completed",
      ).length,
      color: "bg-red-400",
    },
    {
      label: "Medium",
      count: taskList.filter(
        (task) => task.priority === "Medium" && task.status !== "Completed",
      ).length,
      color: "bg-amber-400",
    },
    {
      label: "Low",
      count: taskList.filter(
        (task) => task.priority === "Low" && task.status !== "Completed",
      ).length,
      color: "bg-slate-400",
    },
  ];

  const metrics = [
    {
      label: "Open Tasks",
      value: openTasks,
      description: "Tasks that still need attention",
      valueColor: "text-violet-300",
      borderColor: "border-violet-500/20",
      backgroundColor: "bg-violet-500/10",
    },
    {
      label: "Completion Rate",
      value: `${completionRate}%`,
      description: `${completedTasks} of ${totalTasks} tasks completed`,
      valueColor: "text-emerald-300",
      borderColor: "border-emerald-500/20",
      backgroundColor: "bg-emerald-500/10",
    },
    {
      label: "High Priority",
      value: highPriorityOpenTasks,
      description: "Important unfinished tasks",
      valueColor: "text-rose-300",
      borderColor: "border-rose-500/20",
      backgroundColor: "bg-rose-500/10",
    },
    {
      label: "Active Projects",
      value: activeProjects,
      description: "Projects currently in progress",
      valueColor: "text-blue-300",
      borderColor: "border-blue-500/20",
      backgroundColor: "bg-blue-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Dashboard Heading */}
      <div>
        <h1 className="text-xl font-bold text-devflow-text sm:text-2xl">
          Your Productivity
        </h1>
        <p className="mt-1 text-sm text-devflow-text-muted">
          Understand your workload, priorities, and progress at a glance.
        </p>
      </div>

      {/* Personal Productivity Metrics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className={`rounded-xl border ${metric.borderColor} ${metric.backgroundColor} p-5 transition-transform duration-200 hover:-translate-y-1`}
          >
            <p className="text-sm font-medium text-devflow-text-muted">
              {metric.label}
            </p>
            <p className={`mt-3 text-3xl font-bold ${metric.valueColor}`}>
              {metric.value}
            </p>
            <p className="mt-2 text-xs text-devflow-text-muted">
              {metric.description}
            </p>
          </div>
        ))}
      </section>

      {/* Workload and Priority Analysis */}
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-devflow-border bg-devflow-card p-5">
          <div>
            <h2 className="text-lg font-semibold text-devflow-text">
              Workload Distribution
            </h2>
            <p className="mt-1 text-sm text-devflow-text-muted">
              How your tasks are currently progressing.
            </p>
          </div>

          <div className="mt-6 space-y-5">
            {statusBreakdown.map((item) => {
              const percentage =
                totalTasks === 0
                  ? 0
                  : Math.round((item.count / totalTasks) * 100);

              return (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className={item.textColor}>{item.label}</span>
                    <span className="text-devflow-text-muted">
                      {item.count} ({percentage}%)
                    </span>
                  </div>

                  <div
                    className="h-2 overflow-hidden rounded-full bg-devflow-border"
                    role="progressbar"
                    aria-label={`${item.label} tasks`}
                    aria-valuemin={0}
                    aria-valuemax={totalTasks}
                    aria-valuenow={item.count}
                  >
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}

            {totalTasks === 0 && (
              <p className="text-sm text-devflow-text-muted">
                Task distribution will appear here when you create tasks.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-devflow-border bg-devflow-card p-5">
          <div>
            <h2 className="text-lg font-semibold text-devflow-text">
              Priority Focus
            </h2>
            <p className="mt-1 text-sm text-devflow-text-muted">
              Unfinished tasks grouped by their priority.
            </p>
          </div>

          <div className="mt-6 space-y-5">
            {priorityBreakdown.map((item) => {
              const percentage =
                openTasks === 0
                  ? 0
                  : Math.round((item.count / openTasks) * 100);

              return (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-devflow-text">{item.label}</span>
                    <span className="text-devflow-text-muted">
                      {item.count} {item.count === 1 ? "task" : "tasks"}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-devflow-border">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}

            {openTasks === 0 && (
              <p className="text-sm text-devflow-text-muted">
                You have no unfinished tasks. Nice work!
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Actionable Productivity Insight */}
      <section className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-5">
        <h2 className="font-semibold text-devflow-text">Focus Insight</h2>
        <p className="mt-2 text-sm leading-6 text-devflow-text-muted">
          {openTasks === 0
            ? "All your tasks are complete. You can create new tasks or review your finished work."
            : highPriorityOpenTasks > 0
              ? `You have ${highPriorityOpenTasks} high-priority ${highPriorityOpenTasks === 1 ? "task" : "tasks"} still open. Consider tackling ${highPriorityOpenTasks === 1 ? "it" : "them"} first.`
              : `You have ${openTasks} unfinished ${openTasks === 1 ? "task" : "tasks"} and no high-priority blockers. Start with the next task in your focus queue.`}
        </p>
      </section>

      {/* Next Actions */}
      <section className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-devflow-text">
              Next Actions
            </h2>
            <p className="mt-1 text-sm text-devflow-text-muted">
              Your highest-priority unfinished tasks.
            </p>
          </div>

          <Link
            to="/tasks"
            className="inline-flex min-h-10 items-center text-sm font-medium text-violet-300 transition-colors hover:text-violet-200"
          >
            View all tasks
          </Link>
        </div>

        {focusTasks.length > 0 ? (
          <div className="space-y-3">
            {focusTasks.map((task) => {
              const project = projectList.find(
                (project) => project.id === task.projectId,
              );

              return (
                <TaskRow
                  key={task.id}
                  task={task}
                  project={project}
                />
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-devflow-border bg-devflow-card px-6 py-10 text-center">
            <h3 className="font-semibold text-devflow-text">
              No unfinished tasks
            </h3>
            <p className="mt-2 text-sm text-devflow-text-muted">
              Your focus queue is clear. Create a task when you are ready for
              your next piece of work.
            </p>
            <Link
              to="/tasks"
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-500"
            >
              Go to Tasks
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
