import getProjectStats from "../../utils/projectStats";
function ProjectProgress({ project, tasks }) {
  const { totalTasks, completedTasks, progress } = getProjectStats(tasks);
  return (
    <section className="rounded-xl border border-devflow-border bg-devflow-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-devflow-text">
            Project Progress
          </h2>
          <p className="mt-1 text-sm text-devflow-text-muted">
            Track the overall progress of this project.
          </p>
        </div>
        <span className="text-lg font-semibold text-devflow-blue">
          {progress}%
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-devflow-background">
        <div
          className="h-full rounded-full bg-devflow-blue transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-devflow-text-muted">
        <span>
          {completedTasks} of {totalTasks} tasks completed
        </span>
        <span>{progress}% complete</span>
      </div>
    </section>
  );
}
export default ProjectProgress;
