import React, { useState } from 'react';


const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate JWT authentication (replace with actual API call)
    if (formData.email === 'user@example.com' && formData.password === 'password') {
      // Successful login
      setError('Login bem sucedito');
      console.log('JWT token will be generated here.');
    } else {
      // Incorrect login
      setError('Senha ou email Errado.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="form-input"
        />
        <button type="submit" className="submit-button">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;