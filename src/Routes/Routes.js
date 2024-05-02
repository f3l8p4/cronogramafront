import React from 'react';
import { Router,Route } from 'react-router-dom';

import CadDisciplina from '../components/CadastroDisciplinas';
import CadProfessor from '../components/CadastroProfessores';


const Routes = () => {
  return (
    <Router>
            <Route path='/disciplina' component={<CadDisciplina/>} />
            <Route path='/professor' componet={<CadProfessor/>} />
    </Router>
  );
}

export default Routes;