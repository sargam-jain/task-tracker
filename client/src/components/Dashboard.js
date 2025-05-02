import { useState, useEffect } from 'react';
import API from '../api';
import Project from './Project';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const res = await API.get('/projects');
      setProjects(res.data);
    } catch (err) {
      alert('Unauthorized');
      navigate('/');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await API.post('/projects', { name });
      setName('');
      fetchProjects();
    } catch (err) {
      alert('Cannot create more projects.');
    }
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <form onSubmit={createProject}>
        <input placeholder="New Project Name" value={name} onChange={e => setName(e.target.value)} />
        <button type="submit">Create Project</button>
      </form>
      <div>
        {projects.map((project) => (
          <Project key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
