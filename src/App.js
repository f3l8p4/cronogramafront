import logo from './logo.svg';
import './App.css';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import CadProfessor from './components/CadastroProfessores';
import Routes from './Routes/Routes';
import CadCurso from './components/Curso';
import CadDisciplina from './components/CadastroDisciplinas';
import CadCoordenador from './components/Coordenador';
function App() {
  return (
    <div className="App">
      <CadProfessor/>
    </div>
  );
}

export default App;
