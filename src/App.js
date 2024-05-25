import logo from './logo.svg';
import './App.css';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import Login from './pages/Login';
import CadProfessor from './components/Cadastros/CadastroProfessores';
import ListaProfessores from './components/views/ListaProfessores';
function App() {
  return (
    <div className="App">
      <ListaProfessores/>
    </div>
  );
}

export default App;
