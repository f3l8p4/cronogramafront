import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import apiProfessores from "../../services/apiProfessores.js/ApiProfessores";
import DiasSemana from "../DiasDaSemana";

const CadProfessor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [professor, setProfessor] = useState({
    id: '',
    nomeCompleto: '',
    telefone: '',
    cpf:'',
    qtdeDiasDeAula: '',
    status:'',
    urlFotoPerfil:''
  });

  useEffect(() => {
    const carregarProfessor = async () => {
      if (id) {
        try {
          const dadosProfessor = await apiProfessores.getProfessor(id);
          setProfessor(dadosProfessor);
          setValue('nomeCompleto', dadosProfessor.nomeCompleto);
          setValue('telefone', dadosProfessor.telefone);
          setValue('cpf', dadosProfessor.cpf);
          setValue('aulasSemanais', dadosProfessor.qtdeDiasDeAula);
          setValue('status', dadosProfessor.status);
          setValue('urlFotoDePerfil', dadosProfessor.urlFotoPerfil);
        } catch (error) {
          console.error('Erro ao carregar dados do professor:', error);
        }
      }
    };

    carregarProfessor();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    
    try {
      if (professor.id) {
        await apiProfessores.updateProfessores(professor.id, data);
        console.log('Professor atualizado com sucesso');
      } else {
        data.status = 'ATIVO'
        await apiProfessores.addProfessores(data);
        console.log('Professor cadastrado com sucesso');
      }
      navigate('/'); // Navega de volta para a lista de professores após salvar
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
          <input type="text" id="nome" {...register('nomeCompleto', { required: "O campo não pode estar vazio" })} defaultValue={professor.nomeCompleto} />
          {errors.nome && <div>{errors.nome.message}</div>}
        </div>
        
        <div>
          <label htmlFor="telefone">Telefone:</label>
          <input type="text" id="telefone" {...register('telefone', { required: "O telefone não pode estar vazio" })} defaultValue={professor.telefone} />
          {errors.telefone && <div>{errors.telefone.message}</div>}
        </div>
        
        <div>
          <label htmlFor="cpf">CPF:</label>
          <input type="text" id="cpf" {...register('cpf', { required: "O cpf não pode estar vazio", maxLength: { value: 11, message: "O cpf não pode ultrapassar o valor de 11 dígitos" } })} defaultValue={professor.cpf} />
          {errors.cpf && <div>{errors.cpf.message}</div>}
        </div>
        
        <div>
          <label htmlFor="qtdeDiasDeAula">Quantidade de aulas semanais:</label>
          <input type="number" id="aulasSemanais" {...register('qtdeDiasDeAula', {
            required: 'Por favor, insira um número.',
            min: {
              value: 1,
              message: 'O professor deve dar ao mínimo 1 aula por semana'
            },
            max: {
              value: 6,
              message: 'O professor não pode dar mais de 6 dias de aula por semana.'
            }
          })} defaultValue={professor.qtdeDiasDeAula} />
          {errors.aulasSemanais && <div>{errors.aulasSemanais.message}</div>}
        </div>
        
      
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default CadProfessor;
