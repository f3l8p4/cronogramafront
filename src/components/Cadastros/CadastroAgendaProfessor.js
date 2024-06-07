import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import apiProfessores from "../../services/apiProfessores.js/ApiProfessores"; 
import apiDiasDaSemana from "../../services/apiDiasDaSemana/apiDiasDaSemana";
import apiDisciplinas from "../../services/apiDisciplinas/apiDisciplinas";
import apiAgendaProfessor from "../../services/apiAgendaProfessor/apiAgendaProfessor"; 

const CadAgendaProfessor = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();
    const [professores, setProfessores] = useState([]);
    const [diasDaSemana, setDiasDaSemana] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [agenda, setAgenda] = useState({
        id: '',
        professor: '',
        diaDaSemana: '',
        disciplina: ''
    });

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const [professoresResponse, diasDaSemanaResponse, disciplinasResponse] = await Promise.all([
                    apiProfessores.getProfessores(),
                    apiDiasDaSemana.getDiasDaSemana(),
                    apiDisciplinas.getDisciplinas()
                ]);

                setProfessores(professoresResponse);
                setDiasDaSemana(diasDaSemanaResponse);
                setDisciplinas(disciplinasResponse);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        };

        const carregarAgenda = async () => {
            if (id) {
                try {
                    const response = await apiAgendaProfessor.getAgendaProfessor(id);
                    const dadosAgenda = response;
                    setAgenda(dadosAgenda);
                    setValue('professor', dadosAgenda.professor.id);
                    setValue('diaDaSemana', dadosAgenda.diaDaSemana.id);
                    setValue('disciplina', dadosAgenda.disciplina.id);
                } catch (error) {
                    console.error("Erro ao carregar dados da agenda:", error);
                }
            }
        };

        carregarDados();
        carregarAgenda();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        const professorSelecionado = professores.find(professor => professor.id === parseInt(data.professor));
        const diaSelecionado = diasDaSemana.find(dia => dia.id === parseInt(data.diaDaSemana));
        const disciplinaSelecionada = disciplinas.find(disciplina => disciplina.id === parseInt(data.disciplina));

        const dadosAgenda = {
            professor: {
                id: professorSelecionado.id,
                nomeCompleto: professorSelecionado.nomeCompleto
            },
            diaDaSemana: {
                id: diaSelecionado.id,
                descricao: diaSelecionado.descricao
            },
            disciplina: {
                id: disciplinaSelecionada.id,
                nome: disciplinaSelecionada.nome
            }
        };

        try {
            console.log('Dados enviados:', dadosAgenda); // Log para depuração

            if (agenda.id) {
                await apiAgendaProfessor.updateAgendaProfessor(agenda.id, dadosAgenda);
                console.log('Agenda atualizada com sucesso', dadosAgenda);
            } else {
                await apiAgendaProfessor.addAgendaProfessor(dadosAgenda);
                console.log('Agenda cadastrada com sucesso', dadosAgenda);
            }
            navigate('/agendaprofessores');
        } catch (error) {
            console.error('Erro ao salvar agenda:', error);
        }
    };

    return (
        <div>
            <h2>Cadastro de Agenda de Professor</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="professor">Professor:</label>
                    <select id="professor" {...register("professor", { required: "O professor é obrigatório" })}>
                        <option value="">Selecione um professor</option>
                        {professores.map(professor => (
                            <option key={professor.id} value={professor.id}>{professor.nomeCompleto}</option>
                        ))}
                    </select>
                    {errors.professor && <div>{errors.professor.message}</div>}
                </div>
                <div>
                    <label htmlFor="diaDaSemana">Dia da Semana:</label>
                    <select id="diaDaSemana" {...register("diaDaSemana", { required: "O dia da semana é obrigatório" })}>
                        <option value="">Selecione um dia da semana</option>
                        {diasDaSemana.map(dia => (
                            <option key={dia.id} value={dia.id}>{dia.descricao}</option>
                        ))}
                    </select>
                    {errors.diaDaSemana && <div>{errors.diaDaSemana.message}</div>}
                </div>
                <div>
                    <label htmlFor="disciplina">Disciplina:</label>
                    <select id="disciplina" {...register("disciplina", { required: "A disciplina é obrigatória" })}>
                        <option value="">Selecione uma disciplina</option>
                        {disciplinas.map(disciplina => (
                            <option key={disciplina.id} value={disciplina.id}>{disciplina.nome}</option>
                        ))}
                    </select>
                    {errors.disciplina && <div>{errors.disciplina.message}</div>}
                </div>
                <button type="submit">Cadastrar Agenda</button>
            </form>
        </div>
    );
}

export default CadAgendaProfessor;
