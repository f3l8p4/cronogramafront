import logo from './logo.svg';
import './App.css';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import CadProfessor from './components/CadastroProfessores';
import Routes from './Routes/Routes';
import CadCurso from './components/Curso';
import CadDisciplina from './components/CadastroDisciplinas';
import CadCoordenador from './components/Coordenador';
import CadProfessor2 from './components/CadProfessor2';
import Login from './pages/Login';
function App() {
  return (
    <div className="App">
      <Login/>
    </div>
  );
}

export default App;
