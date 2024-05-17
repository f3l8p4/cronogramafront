<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from "react";
import { FormProvider, useForm } from 'react-hook-form';
import apiProfessores from "../services/apiProfessores.js/ApiProfessores";
import DiasSemana from "./DiasDaSemana";

const CadProfessor = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [professor, setProfessor] = useState({
    id: '',
    nome: '',
    email: '',
    aulasSemanais: '',
    diasLecionados: [],
    nomeCompleto: '',
    telefone: '',
    qtdeDiasDeAula: '',
    status:'',
    urlFotoPerfil:''
  });

  useEffect(() => {
    // Função para carregar dados do professor se estivermos em modo de edição
    const carregarProfessor = async () => {
      // Simula o ID do professor a ser editado (substitua por uma lógica real)
      const idProfessor = '';
      const response = await apiProfessores.getProfessor(idProfessor);
      const dadosProfessor = response;
      console.log(dadosProfessor)
      // Define os valores dos campos do formulário com os dados do professor
      setProfessor(dadosProfessor);
      // Define os valores dos campos do formulário usando setValue do react-hook-form
      setValue('nome', dadosProfessor.nome);
      setValue('email', dadosProfessor.email);
      setValue('aulasSemanais', dadosProfessor.aulasSemanais);
      setValue('nome', dadosProfessor.nomeCompleto);
      setValue('telefone', dadosProfessor.telefone);
      setValue('aulasSemanais', dadosProfessor.qtdeDiasDeAula);
      setValue('status', dadosProfessor.status);
      setValue('urlFotoDePerfil', dadosProfessor.urlFotoPerfil);
      // Se os dias lecionados forem armazenados em um array, você pode definir os valores aqui
    };

    // Carrega os dados do professor se estivermos em modo de edição
    carregarProfessor();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      // Se o professor tiver um ID, significa que estamos atualizando
      if (professor.id) {
        await apiProfessores.updateProfessores(professor.id, data);
        console.log('Professor atualizado com sucesso');
      } else {
        // Caso contrário, estamos criando um novo professor
        await apiProfessores.addProfessores(data)
        await apiProfessores.addProfessores({
          nomeCompleto: '', 
          telefone: '', 
          qtdeDiasDeAula: '', 
          urlFotoPerfil: '', 
          status: ''
        })
        console.log('Professor cadastrado com sucesso');
      }
    } catch (error) {
      console.error('Erro ao salvar professor:', error);
    }
  };

  return (   
    <div className="App">
      <h1>Cadastro de professores 2</h1>
      <h1>Cadastro de professores</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" {...register('nome', {required:"O campo não pode estar vazio"})} />
          <input type="text" id="nome" {...register('nome', {required:"O campo não pode estar vazio"})} defaultValue={professor.nomeCompleto} />
          {errors.nome && <div>{errors.nome.message}</div>}
        </div>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" {...register('email',  {required:"O campo não pode estar vazio"})} />
          <input type="text" id="telefone" {...register('telefone',  {required:"O telefone não pode estar vazio"})} defaultValue={professor.telefone} />
          {errors.email && <div>{errors.email.message}</div>}
        </div>
        <div>
          <label htmlFor="aulasSemanais">Quantidade de aulas semanais:</label>
          <input type="number" id="aulasSemanais" {...register('aulasSemanais' , {
>>>>>>> main
            required: 'Por favor, insira um número.',
            min: {
              value: 1,
              message: 'O professor deve dar ao minimo 1 aula por semana'
            },
            max: {
              value: 6,
              message: 'O professor não pode dar mais de 6 dias de aula por semana.'
            }
<<<<<<< HEAD
          })} />
<<<<<<< HEAD
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
=======
=======
          })} defaultValue={professor.qtdeDiasDeAula} />
>>>>>>> main
          {errors.aulasSemanais && <div>{errors.aulasSemanais.message}</div>}
        </div>
        <div>
          <DiasSemana register={register}/>
>>>>>>> main
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
<<<<<<< HEAD
}

export default CadProfessores;
=======
};

export default CadProfessor;
<<<<<<< HEAD
>>>>>>> main
=======
>>>>>>> main
