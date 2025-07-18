import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/form.css';
import { useNavigate } from 'react-router-dom';

const UserAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = isLogin
      ? { username: user.username, password: user.password }
      : user;

    const url = isLogin
      ? 'http://localhost:8080/api/auth/login'
      : 'http://localhost:8080/api/auth/signup';

    try {
      const res = await axios.post(url, payload);

      const responseText = typeof res.data === 'string' ? res.data.toLowerCase() : '';

      if (responseText.includes('invalid') || responseText.includes('failed')) {
        setError(res.data);
        return;
      }

      localStorage.setItem('userLoggedIn', 'true');
      localStorage.setItem('username', user.username);
      navigate('/user');
    } catch (err) {
      setError('❌ ' + (isLogin ? 'Login' : 'Signup') + ' failed!');
    }
  };

  return (
    <div className="auth-form">
      <h3>{isLogin ? '🔐 User Login' : '📝 User Signup'}</h3>

      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        />

        {!isLogin && (
          <>
            <input
              name="name"
              placeholder="Full Name"
              value={user.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              required
            />
            <input
              name="phone"
              placeholder="Phone Number"
              value={user.phone}
              onChange={handleChange}
              required
            />
          </>
        )}

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

export default UserAuth;
