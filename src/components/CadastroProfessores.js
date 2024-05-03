import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import getProfessores from '../services/Api_professores/Api'


function CadProfessores() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  getProfessores()


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
  return (
    <div className="App">
       <h1>Cadastro de professores</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Nome: </label>
          <input type="text" id="name" {...register('name', { required: 'Por favor, insira um nome.' })} />
          {errors.name && <div>{errors.name.message}</div>}
        </div>
        <div>
          <label htmlFor="email">E-mail: </label>
          <input type="email" id="email" {...register('email', { required: 'Por favor, insira um e-mail.' })} />
          {errors.email && <div>{errors.email.message}</div>}
        </div>
        <div>
        <label htmlFor="number">Quantidade de aulas semanais: </label>
          <input type="number" id="number" {...register('number', {
            required: 'Por favor, insira um número.',
            min: {
              value: 1,
              message: 'O professor deve dar ao minimo 1 aula por semana'
            },
            max: {
              value: 6,
              message: 'O professor não pode dar mais de 6 dias de aula por semana.'
            }
          })} />
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
    </div>
  );
}

export default CadProfessores;
