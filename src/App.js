import logo from './logo.svg';
import './App.css';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CadProfessor from './components/Cadastros/CadastroProfessores';
import ListaProfessores from './components/views/ListaProfessores';
function App() {
  return (
    <div className="App">
          <Router>
      <Switch>
        <Route exact path="/" component={ListaProfessores} />
        <Route path="/editar/:id" component={CadProfessor} />
        <Route path="/excluir/:id" component={ExcluirProfessor} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
