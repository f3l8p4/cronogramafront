import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import apiDiaExcecao from "../../services/apiDiaExcecao/apiDiaExcecao";

const CadDiaExcecao = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();
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
                    const dadosDiaExcecao = response.data;
                    setDiaExcecao(dadosDiaExcecao);
                    setValue('data', dadosDiaExcecao.data);
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
                console.log('Dia de Exceção atualizado com sucesso', dadosDiaExcecao);
            } else {
                await apiDiaExcecao.addDiaExcecao(dadosDiaExcecao);
                console.log('Dia de Exceção cadastrado com sucesso', dadosDiaExcecao);
            }
            navigate('/diasExcecao');
        } catch (error) {
            console.error('Erro ao salvar dia de exceção:', error);
        }
    };

    return (
        <div>
            <h2>Cadastro de Dia de Exceção</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="data">Data:</label>
                    <input
                        type="date"
                        id="data"
                        {...register("data", { required: "A data é obrigatória" })}
                    />
                    {errors.data && <div>{errors.data.message}</div>}
                </div>
                <div>
                    <label htmlFor="motivo">Motivo:</label>
                    <textarea
                        id="motivo"
                        {...register("motivo", { required: "O motivo é obrigatório" })}
                    ></textarea>
                    {errors.motivo && <div>{errors.motivo.message}</div>}
                </div>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}

export default CadDiaExcecao;
