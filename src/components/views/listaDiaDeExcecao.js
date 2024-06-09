// src/components/ListaDiaExcecao.js
import React, { useEffect, useState } from 'react';
import apiDiaExcecao from '../../services/apiDiaExcecao/apiDiaExcecao';
import { useNavigate } from 'react-router-dom';

const ListaDiaExcecao = () => {
    const [diasExcecao, setDiasExcecao] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const carregarDiasExcecao = async () => {
            try {
                const response = await apiDiaExcecao.getDiaExcecoes();
                const data = response;
                if (Array.isArray(data)) {
                    setDiasExcecao(data);
                } else {
                    console.error('Não há dias de exceção cadastrados no sistema:', data);
                }
            } catch (error) {
                console.error('Erro ao carregar dias de exceção:', error);
            }
        };
        carregarDiasExcecao();
    }, []);

    const editarDiaExcecao = (id) => {
        navigate(`/editarDiaExcecao/${id}`);
    };

    const excluirDiaExcecao = async (id) => {
        // Implementar a função para excluir o dia de exceção
        try {
            await apiDiaExcecao.deleteDiaExcecao(id);
            setDiasExcecao(diasExcecao.filter(dia => dia.id !== id));
        } catch (error) {
            console.error('Erro ao excluir dia de exceção:', error);
        }
    };

    return (
        <div>
            <h2>Lista de Dias de Exceção</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Data</th>
                        <th>Motivo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {diasExcecao.length > 0 ? (
                        diasExcecao.map((dia) => (
                            <tr key={dia.id}>
                                <td>{dia.id}</td>
                                <td>{dia.data}</td>
                                <td>{dia.motivo}</td>
                                <td>
                                    <button 
                                        onClick={() => editarDiaExcecao(dia.id)} 
                                        className='btn btn-warning btn-sm text-white px-2 me-2'>
                                        Editar
                                    </button>
                                    <button 
                                        onClick={() => excluirDiaExcecao(dia.id)} 
                                        className='btn btn-sm btn-danger'>
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">Nenhum dia de exceção encontrado.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListaDiaExcecao;
