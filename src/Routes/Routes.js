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
import Home from '../components/views/TelaHome';
import Layout from '../components/layouts/layout';
import Login from '../pages/Login';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path='/professores' element={<Layout> <ListaProfessores/> </Layout>} />
      <Route path='/coordenadores' element={<Layout> <ListaCoordenadores/> </Layout>}/>
      <Route path='/disciplinas' element={<Layout> <ListaDisciplinas/> </Layout>} />
      <Route path='/fases' element={<Layout> <ListaFases/> </Layout>}/>
      <Route path='/cursos' element = {<Layout> <ListaCurso/> </Layout>}/>
      <Route path='/diaExcecao' element = {<Layout> <ListaDiaExcecao/> </Layout>}/>
      <Route path='/agendaprofessores' element = {<Layout> <ListaAgendaProfessor/> </Layout>}/>
      <Route path="/cadastro/" element={<Layout> <CadProfessor/> </Layout>} />
      <Route path="/cadastroDiaExcecao/" element={<Layout> <CadDiaExcecao/> </Layout>} />
      <Route path="/editarProfessor/:id" element={<Layout> <CadProfessor/> </Layout>} />
      <Route path='/cadastroCoordenador' element={<Layout> <CadCoordenador/> </Layout>}/>
      <Route path="/editarCoordenador/:id" element={<Layout> <CadCoordenador/> </Layout>} />
      <Route path='/cadastroDisciplina/' element={<Layout> <CadDisciplina/> </Layout>} />
      <Route path='/cadastroCurso/' element={<Layout> <CadCurso/> </Layout>} />
      <Route path='/cadastroAgendaProfessor/' element={<Layout> <CadAgendaProfessor/> </Layout>} />
      <Route path='/editarDisciplina/:id' element={<Layout> <CadDisciplina/> </Layout>} />
      <Route path='/cadastroFase' element={<Layout> <CadFase/> </Layout>} />
      <Route path='/editarFase/:id' element={<Layout> <CadFase/> </Layout>} />
      <Route path="/editarDiaExcecao/:id" element={<Layout> <CadDiaExcecao/> </Layout>} />
      <Route path='/editarCurso/:id' element={<Layout> <CadCurso/> </Layout>} />
      <Route path='/editarAgendaProfessor/:id' element={<Layout> <CadAgendaProfessor/> </Layout>} />
    </Routes>
  );
};

export default Routers;
