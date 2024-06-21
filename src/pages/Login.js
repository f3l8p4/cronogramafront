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
    <div className="container d-flex justify-content-center align-items-center vh-100">
    <div className="card p-4" style={{ width: '700px' }}>
        <h2 className="text-center mb-4">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mb-3">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    placeholder="Enter email"
                    {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>
            <div className="form-group mb-3">
                <label htmlFor="password">Senha:</label>
                <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    placeholder="Enter password"
                    {...register('password', { required: 'Password is required' })}
                />
                {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            </div>
            <button type="submit" className="btn btn-primary btn-block mt-4">Submit</button>
        </form>
        <div className="text-center mt-3">
            <a href="#">Esqueceu <span className="text-primary">sua senha</span></a>
        </div>
    </div>
</div>
  );
};

export default Login;
