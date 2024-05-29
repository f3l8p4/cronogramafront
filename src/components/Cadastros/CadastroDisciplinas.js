import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import apiFases from "../../services/apiFases/apiFases";
import apiDisciplinas from "../../services/apiDisciplinas/apiDisciplinas";

const CadDisciplina = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();
    const [fases, setFases] = useState([]);
    const [disciplina, setDisciplina] = useState({
        id: '',
        nome: '',
        cargaHoraria: '',
        faseId: ''
    });

    useEffect(() => {
        const carregarFases = async () => {
            try {
                const response = await apiFases.getFases();
                setFases(response.data);
            } catch (error) {
                console.error("Erro ao carregar fases:", error);
            }
        };

        const carregarDisciplina = async () => {
            if (id) { // Verifica se há um ID na URL
                try {
                    const response = await apiDisciplinas.getDisciplina(id);
                    const dadosDisciplina = response.data;
                    setDisciplina(dadosDisciplina);
                    setValue('nome', dadosDisciplina.nome);
                    setValue('cargaHoraria', dadosDisciplina.cargaHoraria);
                    setValue('faseId', dadosDisciplina.faseId);
                } catch (error) {
                    console.error("Erro ao carregar dados da disciplina:", error);
                }
            }
        };

        carregarFases();
        carregarDisciplina();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        try {
            if (disciplina.id) {
                await apiDisciplinas.updateDisciplinas(disciplina.id, data);
                console.log('Disciplina atualizada com sucesso');
            } else {
                await apiDisciplinas.addDisciplinas(data);
                console.log('Disciplina cadastrada com sucesso');
            }
            navigate('/disciplinas');
        } catch (error) {
            console.error('Erro ao salvar disciplina:', error);
        }
    };

    return (
        <div>
            <h2>Cadastro de Disciplina</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="nome">Nome da Disciplina:</label>
                    <input
                        type="text"
                        id="nome"
                        {...register("nome", { required: "O nome da disciplina é obrigatório" })}
                    />
                    {errors.nome && <div>{errors.nome.message}</div>}
                </div>
                <div>
                    <label htmlFor="cargaHoraria">Carga Horária:</label>
                    <input
                        type="number"
                        id="cargaHoraria"
                        {...register("cargaHoraria", { required: "A carga horária é obrigatória" })}
                    />
                    {errors.cargaHoraria && <div>{errors.cargaHoraria.message}</div>}
                </div>
                <div>
                    <label htmlFor="faseId">Fase:</label>
                    <select id="faseId" {...register("faseId", { required: "A fase é obrigatória" })}>
                        <option value="">Selecione uma fase</option>
                        {fases.map((fase) => (
                            <option key={fase.id} value={fase.id}>{fase.numero}</option>
                        ))}
                    </select>
                    {errors.faseId && <div>{errors.faseId.message}</div>}
                </div>
                <button type="submit">Cadastrar Disciplina</button>
            </form>
        </div>
    );
}

export default CadDisciplina;
