import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/form.css';
import { useNavigate } from 'react-router-dom';

const AdminAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [admin, setAdmin] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? 'http://localhost:8080/api/auth/admin/login'
      : 'http://localhost:8080/api/auth/admin/signup';

    try {
      const res = await axios.post(url, admin);

      if (
        typeof res.data === 'string' &&
        (res.data.toLowerCase().includes('invalid') || res.data.toLowerCase().includes('failed'))
      ) {
        setError(res.data);
        return;
      }

      localStorage.setItem('adminLoggedIn', 'true');
      navigate('/admin');
    } catch (err) {
      setError(`❌ ${isLogin ? 'Login' : 'Signup'} failed!`);
    }
  };

  return (
    <div className="auth-form">
      <h3>{isLogin ? '🔐 Admin Login' : '📝 Admin Signup'}</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={admin.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={admin.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>

      {error && <p className="error-msg">{error}</p>}

      <p>
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setError('');
          }}
          className="toggle-btn"
        >
          {isLogin ? 'Sign up' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default AdminAuth;
