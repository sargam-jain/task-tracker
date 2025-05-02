import API from '../api';

function Task({ task, fetchTasks }) {
  const updateStatus = async () => {
    const nextStatus = task.status === 'ToDo' ? 'InProgress' : task.status === 'InProgress' ? 'Done' : 'ToDo';
    await API.put(`/tasks/${task._id}`, { ...task, status: nextStatus });
    fetchTasks();
  };

  const deleteTask = async () => {
    await API.delete(`/tasks/${task._id}`);
    fetchTasks();
  };

  return (
    <div className="task">
      <h4>{task.title} ({task.status})</h4>
      <p>{task.description}</p>
      <p>Created At: {new Date(task.createdAt).toLocaleDateString()}</p>
{task.completedAt && (
  <p>Completed At: {new Date(task.completedAt).toLocaleDateString()}</p>
)}
      <button onClick={updateStatus}>Next Status</button>
      <button onClick={deleteTask}>Delete</button>
    </div>
  );
}

export default Task;
