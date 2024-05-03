import logo from './logo.svg';
import './App.css';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import CadProfessores from './components/CadastroProfessores';
import CadCurso from './components/Curso';
import api from './services/Api_professores/Api';

function App() {

  const [id, setId] = useState('')
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [aulasSemanais, setaulasSemanais] = useState('');
  const [diasLecionados, setdiasLecionados] = useState('');
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  api.getProfessores()

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
   api.addProfessores(nome,email,aulasSemanais,diasLecionados);
  };
  return (
    <div className="App">
       <h1>Cadastro de professores</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Nome: </label>
          <input type="text" id="name" value={nome} onChange={(e) => setNome(e.target.value)} />
          {errors.name && <div>{errors.name.message}</div>}
        </div>
        <div>
          <label htmlFor="email">E-mail: </label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}  />
          {errors.email && <div>{errors.email.message}</div>}
        </div>
        <div>
        <label htmlFor="number">Quantidade de aulas semanais: </label>
          <input type="number" id="number" value={aulasSemanais} onChange={(e) => setaulasSemanais(e.target.value)} />
          {errors.number && <div>{errors.number.message}</div>}
        </div>

        <div>
          <label htmlFor='DaysOfWeek'> Dias Da Semana </label>
          {DaysOfWeek.map(day => (
        <div key={day.id}>
          <input
            type="checkbox"
            id={`day-${day.id}`}
            value={day.id}
            checked={selectedDays.includes(day.id)}
            onChange={handleDayChange}
          
          />
          <label htmlFor={`day-${day.id}`}>{day.name}</label>
        </div>
      ))}
      {errors.DaysOfWeek && <p>{errors.DaysOfWeek.message}</p>}
        </div>

        <button type="submit">Enviar</button>
      </form>
      
      <input type='text' value={id} onChange={(e) => setId(e.target.value)}/>
      <button type='submit' onSubmit={api.excludeProfessores(parseInt(id))}>Excluir</button>
    </div>
  );
}

export default App;
