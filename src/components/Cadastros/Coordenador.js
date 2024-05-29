import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import apiCoordenadores from "../../services/apiCoordenadores/apiCoordenadores";

const CadCoordenador = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();
    const [coordenador, setCoordenador] = useState({
        id: '',
        nome: '',
        email: '',
        senha: '',
        urlFotoPerfil: '',
        nivelPermissao: ''
    });

    useEffect(() => {
        const carregarCoordenador = async () => {
            if (id) { // Verifica se há um ID na URL
                try {
                    const response = await apiCoordenadores.getCoordenador(id)
                    const dadosCoordenador = response // Supondo que a resposta seja um objeto com os dados do coordenador
                    setCoordenador(dadosCoordenador);
                    setValue('nome', dadosCoordenador.nome)
                    setValue('email', dadosCoordenador.email)
                    setValue('senha',dadosCoordenador.senha)
                    setValue('urlFotoPerfil',dadosCoordenador.urlFotoPerfil)
                    setValue('nivelPermissao', dadosCoordenador.nivelPermissao)
                } catch (error) {
                    console.error('Erro ao carregar dados do coordenador:', error)
                }
            }
        };

        carregarCoordenador();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        try {
            if (coordenador.id) {
                await apiCoordenadores.updateCoordenador(coordenador.id, data);
                console.log('Coordenador atualizado com sucesso');
            } else {
                await apiCoordenadores.addCoordenador(data);
                console.log('Coordenador cadastrado com sucesso');
            }
            navigate('/coordenadores'); // Redireciona para a lista de coordenadores após o envio do formulário
        } catch (error) {
            console.error('Erro ao salvar coordenador:', error);
        }
    };

    return (
        <div>
            <h1>Cadastro de Coordenador</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='nome'>Nome:</label>
                    <input type='text' id='nome' {...register('nome', { required: "O nome do coordenador é obrigatório" })} />
                    {errors.nome && <div>{errors.nome.message}</div>}
                </div>
                <div>
                    <label htmlFor='email'>E-mail:</label>
                    <input type='text' id='email' {...register('email', { required: "O e-mail do coordenador é obrigatório" })} />
                    {errors.email && <div>{errors.email.message}</div>}
                </div>
                
                <div>
                    <label htmlFor='senha'>Senha:</label>
                    <input type='password' id='senha' {...register('senha', { required: "A senha é obrigatória" })} />
                    {errors.senha && <div>{errors.senha.message}</div>}
                </div>
                <div>
                    <label htmlFor='fotoPerfil'>Foto de Perfil:</label>
                    <input type='text' id='fotoPerfil' {...register('urlFotoPerfil')} />
                </div>
                <div>
                    <label htmlFor='nivelPermissao'>Nível de Permissão:</label>
                    <input type='text' id='nivelPermissao' {...register('nivelPermissao', { required: "O nível de permissão é obrigatório" })} />
                    {errors.nivelPermissao && <div>{errors.nivelPermissao.message}</div>}
                </div>
                <button type='submit'>Enviar</button>
            </form>
        </div>
    );
}

export default CadCoordenador;
