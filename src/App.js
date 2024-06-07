import logo from './logo.svg';
import './App.css';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CadProfessor from './components/Cadastros/CadastroProfessores';
import ListaProfessores from './components/views/ListaProfessores';
import ListaCoordenadores from './components/views/ListaCoordenador';
import CadCoordenador from './components/Cadastros/Coordenador';
import ListaDisciplinas from './components/views/ListaDisciplinas';
import CadDisciplina from './components/Cadastros/CadastroDisciplinas';
import ListaFases from './components/views/ListaFases';
import CadFase from './components/Cadastros/CadastroFase';
import CadCurso from './components/Cadastros/cadCurso'
import ListaCurso from './components/views/ListaCurso';
import ListaAgendaProfessor from './components/views/ListaAgendaProfessor';
import CadAgendaProfessor from './components/Cadastros/CadastroAgendaProfessor';
function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<ListaProfessores />} />
        <Route path='/coordenadores' element={<ListaCoordenadores/>}/>
        <Route path='/disciplinas' element={<ListaDisciplinas/>} />
        <Route path='/fases' element={<ListaFases/>}/>
        <Route path='/cursos' element = {<ListaCurso/>}/>
        <Route path='/agendaprofessores' element = {<ListaAgendaProfessor/>}/>
        <Route path="/cadastro/" element={<CadProfessor />} />
        <Route path="/editarProfessor/:id" element={<CadProfessor />} />
        <Route path='/cadastroCoordenador' element={<CadCoordenador/>}/>
        <Route path="/editarCoordenador/:id" element={<CadCoordenador />} />
        <Route path='/cadastroDisciplina/' element={<CadDisciplina/>} />
        <Route path='/cadastroCurso/' element={<CadCurso/>} />
        <Route path='/cadastroAgendaProfessor/' element={<CadAgendaProfessor/>} />
        <Route path='/editarDisciplina/:id' element={<CadDisciplina/>} />
        <Route path='/cadastroFase' element={<CadFase/>} />
        <Route path='/editarFase/:id' element={<CadFase/>} />
        <Route path='/editarCurso/:id' element={<CadCurso/>} />
        <Route path='/editarAgendaProfessor/:id' element={<CadAgendaProfessor/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
