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
      <textarea
        name="description"
        value={formData.description}
        onChange={(event) => {
          setFormData((previousData) => {
            return {
              ...previousData,
              description: event.target.value,
            };
          });
        }}
      ></textarea>
      <select
        name="status"
        value={formData.status}
        onChange={(event) => {
          setFormData((previousData) => {
            return {
              ...previousData,
              status: event.target.value,
            };
          });
        }}
      >
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
      </select>
      <select
        name="priority"
        value={formData.priority}
        onChange={(event) => {
          setFormData((previousData) => {
            return {
              ...previousData,
              priority: event.target.value,
            };
          });
        }}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={(event) => {
          setFormData((previousData) => {
            return {
              ...previousData,
              dueDate: event.target.value,
            };
          });
        }}
      />
    </div>
  );
}
export default EditTask;
