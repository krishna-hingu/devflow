function getTaskStats(tasks) {
  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress",
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  return {
    totalTasks,
    pendingTasks,
    inProgressTasks,
    completedTasks,
  };
}

export default getTaskStats;
