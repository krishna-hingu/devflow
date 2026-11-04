function getProjectStats(tasks) {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return {
    totalTasks,
    completedTasks,
    remainingTasks: totalTasks - completedTasks,
    progress,
  };
}

export default getProjectStats;
