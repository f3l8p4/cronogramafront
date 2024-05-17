import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import apiCursos from "../services/apiCursos/ApiCursos";

const CadCurso = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [curso, setCurso] = useState({
        id: '',
        nomeDisciplina: '',
        horasTotais: '',
        quantidadeFases: '',
    });

    useEffect(() => {
        const carregarCurso = async () => {
            const idCurso = ''; // Defina o ID do curso a ser editado
            const response = await apiCursos.getCurso(idCurso);
            const dadosCurso = response.data; // Assumindo que a resposta da API retorna um objeto com os dados do curso
            setCurso(dadosCurso);
            setValue('nomeDisciplina', dadosCurso.nomeDisciplina);
            setValue('horasTotais', dadosCurso.horasTotais);
            setValue('quantidadeFases', dadosCurso.quantidadeFases);
        };

        carregarCurso();
    }, [setValue]);

    const onSubmit = async (data) => {
        try {
            if (curso.id) {
                await apiCursos.updateCurso(curso.id, data); // Método para atualizar um curso existente
                console.log('Curso atualizado com sucesso');
            } else {
                await apiCursos.addCurso(data); // Método para adicionar um novo curso
                console.log('Curso cadastrado com sucesso');
            }
        } catch (error) {
            console.error('Erro ao salvar curso:', error);
        }
    };

    return (
        <div>
            <h1>Cadastro de curso</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="nomeDisciplina">Nome: </label>
                    <input type="text" id="nomeDisciplina" {...register('nomeDisciplina', { required: "O nome da disciplina é obrigatório" })} />
                    {errors.nomeDisciplina && <div>{errors.nomeDisciplina.message}</div>}
                </div>
                <div>
                    <label htmlFor="horasTotais">Horas totais: </label>
                    <input type="number" id="horasTotais" {...register('horasTotais', { required: "Horas totais da disciplina são obrigatórias" })} />
                    {errors.horasTotais && <div>{errors.horasTotais.message}</div>}
                </div>
                <div>
                    <label htmlFor="quantidadeFases">Quantidade de fases: </label>
                    <input type="number" id="quantidadeFases" {...register('quantidadeFases', { required: "A quantidade de fases é obrigatória" })} />
                    {errors.quantidadeFases && <div>{errors.quantidadeFases.message}</div>}
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default CadCurso;