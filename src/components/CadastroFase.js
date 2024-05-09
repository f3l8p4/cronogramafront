import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import apiFases from '../services/apiFases';

const CadFase = () => {
    const { register, handleSubmit, setValue } = useForm();
    const [fase, setFase] = useState({
        id: '',
        numero: '',
        curso: '',
        disciplina: ''
    });

    useEffect(() => {
        // Função para carregar os dados da fase, se necessário
        const carregarFase = async () => {
            const idFase = ''; // Defina o ID da fase a ser editada
            const response = await apiFases.getFase(idFase);
            const dadosFase = response.data;
            setFase(dadosFase);
            setValue('numero', dadosFase.numero);
            setValue('curso', dadosFase.curso);
            setValue('disciplina', dadosFase.disciplina);
        };

        carregarFase();
    }, [setValue]);

    const onSubmit = async (data) => {
        try {
            if (fase.id) {
                await apiFases.updateFase(fase.id, data); // Atualiza a fase se o ID estiver definido
                console.log('Fase atualizada com sucesso');
            } else {
                await apiFases.addFase(data); // Adiciona uma nova fase
                console.log('Fase cadastrada com sucesso');
            }
        } catch (error) {
            console.error('Erro ao salvar fase:', error);
        }
    };

    return (
        <div>
            <h2>Cadastro de Fase</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Número da Fase:</label>
                <input type="number" {...register("numero")} />
                <br />
                <label>Curso Vinculado:</label>
                <input type="text" {...register("curso")} />
                <br />
                <label>Disciplinas vinculadas:</label>
                <input type="text" {...register("disciplina")} />
                <br />
                <button type="submit">Cadastrar Fase</button>
            </form>
        </div>
    );
};

export default CadFase;
