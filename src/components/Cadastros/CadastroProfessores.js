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
          setValue('qtdeDiasDeAula', dadosProfessor.qtdeDiasDeAula);
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
    <div className="container mt-5">
      <h1 className="mb-4">Cadastro de Professores</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="nome" className="form-label">Nome:</label>
            <input type="text" id="nome" className={`form-control ${errors.nomeCompleto ? 'is-invalid' : ''}`} {...register('nomeCompleto', { required: "O campo não pode estar vazio" })} />
            {errors.nomeCompleto && <div className="invalid-feedback">{errors.nomeCompleto.message}</div>}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="telefone" className="form-label">Telefone:</label>
            <input type="text" id="telefone" className={`form-control ${errors.telefone ? 'is-invalid' : ''}`} {...register('telefone', { required: "O telefone não pode estar vazio" })} />
            {errors.telefone && <div className="invalid-feedback">{errors.telefone.message}</div>}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="cpf" className="form-label">CPF:</label>
            <input type="text" id="cpf" className={`form-control ${errors.cpf ? 'is-invalid' : ''}`} {...register('cpf', { required: "O cpf não pode estar vazio", maxLength: { value: 11, message: "O cpf não pode ultrapassar o valor de 11 dígitos" } })} />
            {errors.cpf && <div className="invalid-feedback">{errors.cpf.message}</div>}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="qtdeDiasDeAula" className="form-label">Quantidade de Aulas Semanais:</label>
            <input type="number" id="qtdeDiasDeAula" className={`form-control ${errors.qtdeDiasDeAula ? 'is-invalid' : ''}`} {...register('qtdeDiasDeAula', {
              required: 'Por favor, insira um número.',
              min: {
                value: 1,
                message: 'O professor deve dar ao mínimo 1 aula por semana'
              },
              max: {
                value: 6,
                message: 'O professor não pode dar mais de 6 dias de aula por semana.'
              }
            })} />
            {errors.qtdeDiasDeAula && <div className="invalid-feedback">{errors.qtdeDiasDeAula.message}</div>}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
};

export default CadProfessor;
