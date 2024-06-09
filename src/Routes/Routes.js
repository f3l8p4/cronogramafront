import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ListaProfessores from '../components/views/ListaProfessores';
import ListaCoordenadores from '../components/views/ListaCoordenador';
import ListaDisciplinas from '../components/views/ListaDisciplinas';
import ListaFases from '../components/views/ListaFases';
import ListaCurso from '../components/views/ListaCurso';
import CadDiaExcecao from '../components/Cadastros/CadastroDiaDeExcecao';
import ListaAgendaProfessor from '../components/views/ListaAgendaProfessor';
import CadProfessor from '../components/Cadastros/CadastroProfessores';
import CadCoordenador from '../components/Cadastros/Coordenador';
import CadDisciplina from '../components/Cadastros/CadastroDisciplinas';
import CadCurso from '../components/Cadastros/cadCurso';
import CadAgendaProfessor from '../components/Cadastros/CadastroAgendaProfessor';
import CadFase from '../components/Cadastros/CadastroFase';
import ListaDiaExcecao from '../components/views/listaDiaDeExcecao';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<ListaProfessores />} />
      <Route path='/coordenadores' element={<ListaCoordenadores/>}/>
      <Route path='/disciplinas' element={<ListaDisciplinas/>} />
      <Route path='/fases' element={<ListaFases/>}/>
      <Route path='/cursos' element = {<ListaCurso/>}/>
      <Route path='/diaExcecao' element = {<ListaDiaExcecao/>}/>
      <Route path='/agendaprofessores' element = {<ListaAgendaProfessor/>}/>
      <Route path="/cadastro/" element={<CadProfessor />} />
      <Route path="/cadastroDiaExcecao/" element={<CadProfessor />} />
      <Route path="/editarProfessor/:id" element={<CadProfessor />} />
      <Route path='/cadastroCoordenador' element={<CadCoordenador/>}/>
      <Route path="/editarCoordenador/:id" element={<CadCoordenador />} />
      <Route path='/cadastroDisciplina/' element={<CadDisciplina/>} />
      <Route path='/cadastroCurso/' element={<CadCurso/>} />
      <Route path='/cadastroAgendaProfessor/' element={<CadAgendaProfessor/>} />
      <Route path='/editarDisciplina/:id' element={<CadDisciplina/>} />
      <Route path='/cadastroFase' element={<CadFase/>} />
      <Route path='/editarFase/:id' element={<CadFase/>} />
      <Route path="/editarDiaExcecao/:id" element={<CadDiaExcecao />} />
      <Route path='/editarCurso/:id' element={<CadCurso/>} />
      <Route path='/editarAgendaProfessor/:id' element={<CadAgendaProfessor/>} />
    </Routes>
  );
};

export default Routers;
