import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import apiDiaExcecao from "../../services/apiDiaExcecao/apiDiaExcecao";
import ModalCadastros from "../modals/ModalCadastros";

const CadDiaExcecao = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();
    
    //Funcionamentos dos modal
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [success, setSuccess] = useState(false);
    //
    
    const [diaExcecao, setDiaExcecao] = useState({
        id: '',
        data: '',
        motivo: ''
    });

    useEffect(() => {
        const carregarDiaExcecao = async () => {
            if (id) {
                try {
                    const response = await apiDiaExcecao.getDiaExcecao(id);
                    const dadosDiaExcecao = response;
                    setDiaExcecao(dadosDiaExcecao);
                    setValue('data', new Date(dadosDiaExcecao.data).toISOString().substr(0, 10));
                    setValue('motivo', dadosDiaExcecao.motivo);
                } catch (error) {
                    console.error("Erro ao carregar dados do dia de exceção:", error);
                }
            }
        };

        carregarDiaExcecao();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        const dadosDiaExcecao = {
            data: data.data,
            motivo: data.motivo
        };
        try {
            if (diaExcecao.id) {
                await apiDiaExcecao.updateDiaExcecao(diaExcecao.id, dadosDiaExcecao);
                setSuccess(true);
                setModalMessage('Dia de Exceção atualizado com sucesso');
            } else {
                await apiDiaExcecao.addDiaExcecao(dadosDiaExcecao);
                setSuccess(true);
                setModalMessage('Dia de Exceção cadastrado com sucesso');
                
            }
        } catch (error) {
            console.error('Erro ao salvar dia de exceção:', error);
            setSuccess(false);
            setModalMessage('Erro ao salvar dia de exceção');
        }
        setShowModal(true)
    };

    const handleCloseModal = () => {
        setShowModal(false);
        if (success) {
            navigate('/diaExcecao');
        }
    };
    return (
        <div className="container mt-5">
            <h2 className="mb-4">Cadastro de Dia de Exceção</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="data" className="form-label">Data:</label>
                    <input
                        type="date"
                        id="data"
                        className={`form-control ${errors.data ? 'is-invalid' : ''}`}
                        {...register("data", { required: "A data é obrigatória" })}
                    />
                    {errors.data && <div className="invalid-feedback">{errors.data.message}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="motivo" className="form-label">Motivo:</label>
                    <textarea
                        id="motivo"
                        className={`form-control ${errors.motivo ? 'is-invalid' : ''}`}
                        {...register("motivo", { required: "O motivo é obrigatório" })}
                    ></textarea>
                    {errors.motivo && <div className="invalid-feedback">{errors.motivo.message}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Salvar</button>
            </form>
            <ModalCadastros show={showModal} handleClose={handleCloseModal} message={modalMessage} success={success} />
        </div>
    );
}

export default CadDiaExcecao;
