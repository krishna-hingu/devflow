import { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
function EditTask() {
  const { taskList, setTaskList } = useOutletContext();
  const { projectId, taskId } = useParams();
  const task = taskList.find(
    (task) =>
      task.id === Number(taskId) && task.projectId === Number(projectId),
  );
  const [formData, setFormData] = useState({
    title: task?.title ?? "",
    description: task?.description ?? "",
    status: task?.status ?? "",
    priority: task?.priority ?? "",
    dueDate: task?.dueDate ?? "",
  });
  return (
    <div>
      <h1>Edit Task</h1>
      <input
        type="text"
        value={formData.title}
        onChange={(event) => {
          setFormData((previousData) => {
            return {
              ...previousData,
              title: event.target.value,
            };
          });
        }}
      />
    </div>
  );
}
export default EditTask;
