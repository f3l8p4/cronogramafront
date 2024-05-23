import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import apiSalas from '../services/apiSalas';

const CadSala = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [sala, setSala] = useState({
        id: '',
        numero: ''
    });

    useEffect(() => {
        // Função para carregar os dados da sala, se necessário
        const carregarSala = async () => {
            const idSala = ''; // Defina o ID da sala a ser editada
            const response = await apiSalas.getSala(idSala);
            const dadosSala = response.data;
            setSala(dadosSala);
            setValue('numero', dadosSala.numero);
        };

        carregarSala();
    }, [setValue]);

    const onSubmit = async (data) => {
        try {
            if (sala.id) {
                await apiSalas.updateSala(sala.id, data); // Atualiza a sala se o ID estiver definido
                console.log('Sala atualizada com sucesso');
            } else {
                await apiSalas.addSala(data); // Adiciona uma nova sala
                console.log('Sala cadastrada com sucesso');
            }
        } catch (error) {
            console.error('Erro ao salvar sala:', error);
        }
    };

    return (
        <div>
            <h2>Cadastro de Sala</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Número da Sala:</label>
                <input type="text" {...register("numero", { required: "O número da sala é obrigatório" })} />
                {errors.numero && <div>{errors.numero.message}</div>}
                <br />
                <button type="submit">Cadastrar Sala</button>
            </form>
        </div>
    );
};

export default CadSala;
