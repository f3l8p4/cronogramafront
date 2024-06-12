import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import apiCoordenadores from "../../services/apiCoordenadores/apiCoordenadores";
import ModalCadastros from '../modals/ModalCadastros';
const CadCoordenador = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();
    
          //Funcionamentos dos modal
          const [showModal, setShowModal] = useState(false);
          const [modalMessage, setModalMessage] = useState('');
          const [success, setSuccess] = useState(false);
          //
    
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
        setShowModal(true)
        try {
            if (coordenador.id) {
                await apiCoordenadores.updateCoordenador(coordenador.id, data);
                setSuccess(true)
                setModalMessage('usuario atualizado com sucesso');
            } else {
                data.status = 'ATIVO'
                await apiCoordenadores.addCoordenador(data);
                setSuccess(true)
                setModalMessage('Usuario adicionado com sucesso')
            }

        } catch (error) {
            setSuccess(false)
            
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        if (success) {
            navigate('/coordenadores');
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
        <ModalCadastros show={showModal} handleClose={handleCloseModal} message={modalMessage} success={success} />
    </div>
    );
}

export default CadCoordenador;
