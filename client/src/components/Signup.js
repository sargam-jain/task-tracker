import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', country: '' });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/signup', form);
      navigate('/');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Email" type="email" onChange={e => setForm({ ...form, email: e.target.value })} required />
        <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} required />
        <input placeholder="Country" onChange={e => setForm({ ...form, country: e.target.value })} required />
        <button type="submit">Signup</button>
      </form>
      <p>Already have an account? <a href="/">Login</a></p>
    </div>
  );
}

export default Signup;
