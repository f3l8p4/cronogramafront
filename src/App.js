import logo from './logo.svg';
import './App.css';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CadProfessor from './components/Cadastros/CadastroProfessores';
import ListaProfessores from './components/views/ListaProfessores';
function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<ListaProfessores />} />
        <Route path="/cadastro/" element={<CadProfessor />} />
        <Route path="/editarProfessor/:id" element={<CadProfessor />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
