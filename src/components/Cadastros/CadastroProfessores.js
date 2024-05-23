import React, { useState, useEffect } from "react";
import { FormProvider, useForm } from 'react-hook-form';
import apiProfessores from "../../services/apiProfessores.js/ApiProfessores";
import DiasSemana from "../DiasDaSemana";

const CadProfessor = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [professor, setProfessor] = useState({
    id: '',
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
        await apiProfessores.addProfessores(data,{
          headers: {
            'Content-Type': 'application/json'
          }
        })
        console.log('Professor cadastrado com sucesso');
      }
    } catch (error) {
      console.error('Erro ao salvar professor:', error);
    }
  };

  return (   
    <div className="App">
      <h1>Cadastro de professores</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" {...register('nome', {required:"O campo não pode estar vazio"})} defaultValue={professor.nomeCompleto} />
          {errors.nome && <div>{errors.nome.message}</div>}
        </div>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input type="text" id="telefone" {...register('telefone',  {required:"O telefone não pode estar vazio"})} defaultValue={professor.telefone} />
          {errors.email && <div>{errors.email.message}</div>}
        </div>
        <div>
          <label htmlFor="aulasSemanais">Quantidade de aulas semanais:</label>
          <input type="number" id="aulasSemanais" {...register('aulasSemanais' , {
            required: 'Por favor, insira um número.',
            min: {
              value: 1,
              message: 'O professor deve dar ao minimo 1 aula por semana'
            },
            max: {
              value: 6,
              message: 'O professor não pode dar mais de 6 dias de aula por semana.'
            }
          })} defaultValue={professor.qtdeDiasDeAula} />
          {errors.aulasSemanais && <div>{errors.aulasSemanais.message}</div>}
        </div>
        <div>
          <DiasSemana register={register}/>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default CadProfessor;
