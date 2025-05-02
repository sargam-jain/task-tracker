import { useState, useEffect } from 'react';
import API from '../api';
import Task from './Task';

function Project({ project }) {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });

  const fetchTasks = async () => {
    const res = await API.get(`/tasks/${project._id}`);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    await API.post(`/tasks/${project._id}`, form);
    setForm({ title: '', description: '' });
    fetchTasks();
  };

  return (
    <div className="project">
      <h3>{project.name}</h3>
      <form onSubmit={createTask}>
        <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
        <button type="submit">Add Task</button>
      </form>
      {tasks.map(task => (
        <Task key={task._id} task={task} fetchTasks={fetchTasks} />
      ))}
    </div>
  );
}

export default Project;
