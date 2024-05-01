import logo from './logo.svg';
import './App.css';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import CadProfessor from './components/CadastroProfessores';
import Routes from './Routes/Routes';
import CadCurso from './components/Curso';
import CadDisciplina from './components/CadastroDisciplinas';
function App() {
 /* const { register, handleSubmit, formState: { errors } } = useForm();

  const DaysOfWeek  = [
    { id: 1, name: 'Segunda-feira' },
    { id: 2, name: 'Terça-feira' },
    { id: 3, name: 'Quarta-feira' },
    { id: 4, name: 'Quinta-feira' },
    { id: 5, name: 'Sexta-feira' },
    { id: 6, name: 'Sábado' },
    { id: 7, name: 'Domingo' }
  ];

  const [selectedDays, setSelectedDays] = useState([]);

  const handleDayChange  = (e) => {
    const selectedDayId = parseInt(e.target.value);
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedDays([...selectedDays, selectedDayId]);
    } else {
      setSelectedDays(selectedDays.filter(dayId => dayId !== selectedDayId));
    }
  };



  const onSubmit = (data) => {
   console.log(data)
  };
  
  */
  return (
    <div className="App">
      <CadDisciplina/>
    </div>
  );
}

export default App;
