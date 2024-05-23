import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', data);
      const token = response.data.token;
      localStorage.setItem('jwt', token); // Armazena o token no localStorage
      setError('Login bem-sucedido');
      console.log('JWT token:', token);
    } catch (error) {
      setError('Senha ou email errados.');
      console.error('Erro de login:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: 'O email é obrigatório' })}
            className="form-input"
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register('password', { required: 'A senha é obrigatória' })}
            className="form-input"
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>
        <button type="submit" className="submit-button">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
