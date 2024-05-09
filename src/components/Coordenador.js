import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import apiCoordenadores from "../services/apiCoordenadores.js/ApiCoordenadores";

const CadCoordenador = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [coordenador, setCoordenador] = useState({
        id: '',
        nomeCoordenador: '',
        emailCoordenador: '',
        senha: '',
        fotoPerfil: ''
    });

    useEffect(() => {
        const carregarCoordenador = async () => {
            const idCoordenador = ''; // Defina o ID do coordenador a ser editado
            const response = await apiCoordenadores.getCoordenador(idCoordenador);
            const dadosCoordenador = response.data; // Assumindo que a resposta da API retorna um objeto com os dados do coordenador
            setCoordenador(dadosCoordenador);
            setValue('nomeCoordenador', dadosCoordenador.nomeCoordenador);
            setValue('emailCoordenador', dadosCoordenador.emailCoordenador);
            // Não incluímos a senha e a foto de perfil aqui, pois geralmente não são pré-preenchidos em formulários de edição
        };

        carregarCoordenador();
    }, [setValue]);

    const onSubmit = async (data) => {
        try {
            if (coordenador.id) {
                await apiCoordenadores.updateCoordenador(coordenador.id, data); // Método para atualizar um coordenador existente
                console.log('Coordenador atualizado com sucesso');
            } else {
                await apiCoordenadores.addCoordenador(data); // Método para adicionar um novo coordenador
                console.log('Coordenador cadastrado com sucesso');
            }
        } catch (error) {
            console.error('Erro ao salvar coordenador:', error);
        }
    };

    return (
        <div>
            <h1>Cadastro de coordenador</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='nomeCoordenador'>Nome:</label>
                    <input type='text' id='nomeCoordenador' {...register('nomeCoordenador', { required: "O nome do coordenador é obrigatório" })} />
                    {errors.nomeCoordenador && <div>{errors.nomeCoordenador.message}</div>}
                </div>
                <div>
                    <label htmlFor='emailCoordenador'>E-mail:</label>
                    <input type='text' id='emailCoordenador' {...register('emailCoordenador', { required: "O e-mail do coordenador é obrigatório" })} />
                    {errors.emailCoordenador && <div>{errors.emailCoordenador.message}</div>}
                </div>
                {/* Não incluímos a senha e a foto de perfil aqui, pois geralmente não são pré-preenchidos em formulários de edição */}
                <button type='submit'>Enviar</button>
            </form>
        </div>
    );
}

export default CadCoordenador;
