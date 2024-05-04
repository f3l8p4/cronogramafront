import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import api from "../services/apiProfessores.js/ApiProfessores";
import DiasSemana from "./DiasDaSemana";

const CadProfessor2 = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  api.getProfessor(1)
  const [professor, setProfessor] = useState({
    id: '',
    nome: '',
    email: '',
    aulasSemanais: '',
    diasLecionados: [],
  });

  useEffect(() => {
    // Função para carregar dados do professor se estivermos em modo de edição
    const carregarProfessor = async () => {
      // Simula o ID do professor a ser editado (substitua por uma lógica real)
      const idProfessor = 1;
      const response = await api.getProfessor(idProfessor);
      const dadosProfessor = response;
      console.log(dadosProfessor)
      // Define os valores dos campos do formulário com os dados do professor
      setProfessor(dadosProfessor);
      // Define os valores dos campos do formulário usando setValue do react-hook-form
      setValue('nome', dadosProfessor.nome);
      setValue('email', dadosProfessor.email);
      setValue('aulasSemanais', dadosProfessor.aulasSemanais);
      // Se os dias lecionados forem armazenados em um array, você pode definir os valores aqui
    };

    // Carrega os dados do professor se estivermos em modo de edição
    carregarProfessor();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      // Se o professor tiver um ID, significa que estamos atualizando
      if (professor.id) {
        await api.updateProfessores(professor.id, data);
        console.log('Professor atualizado com sucesso');
      } else {
        // Caso contrário, estamos criando um novo professor
        await api.addProfessor(data);
        console.log('Professor cadastrado com sucesso');
      }
    } catch (error) {
      console.error('Erro ao salvar professor:', error);
    }
  };

  return (   
    <div className="App">
      <h1>Cadastro de professores 2</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" {...register('nome')} />
        </div>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" {...register('email')} />
        </div>
        <div>
          <label htmlFor="aulasSemanais">Quantidade de aulas semanais:</label>
          <input type="number" id="aulasSemanais" {...register('aulasSemanais')} />
        </div>
        <div>
          <DiasSemana />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default CadProfessor2;
