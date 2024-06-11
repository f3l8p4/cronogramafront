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
        cpf:'',
        email: '',
        senha: '',
        urlFotoPerfil: '',
        nivelPermissao: '',
        status: 'ATIVO'
    });

    useEffect(() => {
        const carregarCoordenador = async () => {
            if (id) { // Verifica se há um ID na URL
                try {
                    const response = await apiCoordenadores.getCoordenador(id)
                    const dadosCoordenador = response 
                    setCoordenador(dadosCoordenador);
                    setValue('nome', dadosCoordenador.nome)
                    setValue('cpf',dadosCoordenador.cpf)
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
                console.log('Coordenador atualizado com sucesso',data);
            } else {
                data.status = 'ATIVO'
                await apiCoordenadores.addCoordenador(data);
                console.log('Coordenador cadastrado com sucesso',data);
            }
            navigate('/coordenadores');
        } catch (error) {
            console.error('Erro ao salvar coordenador:', error);
        }
    };

    return (
        <div className="container mt-5">
        <h1 className="mb-4">Cadastro de Coordenador</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="nome" className="form-label">Nome:</label>
                <input type="text" id="nome" className={`form-control ${errors.nome ? 'is-invalid' : ''}`} {...register('nome', { required: "O nome do coordenador é obrigatório" })} />
                {errors.nome && <div className="invalid-feedback">{errors.nome.message}</div>}
            </div>
            
            <div className="mb-3">
                <label htmlFor="cpf" className="form-label">CPF:</label>
                <input type="text" id="cpf" className={`form-control ${errors.cpf ? 'is-invalid' : ''}`} {...register('cpf', { required: "O CPF do coordenador é obrigatório", maxLength: { value: 11, message: "O CPF não pode ter mais de 11 dígitos" } })} />
                {errors.cpf && <div className="invalid-feedback">{errors.cpf.message}</div>}
            </div>
            
            <div className="mb-3">
                <label htmlFor="email" className="form-label">E-mail:</label>
                <input type="email" id="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} {...register('email', { required: "O e-mail do coordenador é obrigatório" })} />
                {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>
            
            <div className="mb-3">
                <label htmlFor="senha" className="form-label">Senha:</label>
                <input type="password" id="senha" className={`form-control ${errors.senha ? 'is-invalid' : ''}`} {...register('senha', { required: "A senha é obrigatória" })} />
                {errors.senha && <div className="invalid-feedback">{errors.senha.message}</div>}
            </div>
            
            <div className="mb-3">
                <label htmlFor="fotoPerfil" className="form-label">Foto de Perfil:</label>
                <input type="text" id="fotoPerfil" className="form-control" {...register('urlFotoPerfil')} />
            </div>
            
            <div className="mb-3">
                <label htmlFor="nivelPermissao" className="form-label">Nível de Permissão:</label>
                <input type="text" id="nivelPermissao" className={`form-control ${errors.nivelPermissao ? 'is-invalid' : ''}`} {...register('nivelPermissao', { required: "O nível de permissão é obrigatório" })} />
                {errors.nivelPermissao && <div className="invalid-feedback">{errors.nivelPermissao.message}</div>}
            </div>
            
            <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
    </div>
    );
}

export default CadCoordenador;
