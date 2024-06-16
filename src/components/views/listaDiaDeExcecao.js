// src/components/ListaDiaExcecao.js
import React, { useEffect, useState } from 'react';
import apiDiaExcecao from '../../services/apiDiaExcecao/apiDiaExcecao';
import { useNavigate } from 'react-router-dom';
import ExclusaoModal from '../modals/ExclusaoModal';

const ListaDiaExcecao = () => {
    const [diasExcecao, setDiasExcecao] = useState([]);
    
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    
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
    
    
    const formatarData = (data) => {
        const dataObj = new Date(data);
        const dia = String(dataObj.getDate()).padStart(2, '0');
        const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
        const ano = dataObj.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    const editarDiaExcecao = (id) => {
        navigate(`/editarDiaExcecao/${id}`);
    };

    const excluirDiaExcecao = async (id) => {
        try {
            await apiDiaExcecao.excludeDiaExcecao(id);
            setDiasExcecao(diasExcecao.filter(diaExcecao => diaExcecao.id !== id));
        } catch (erro) {
            console.log('erro na exclusão de dia de exceção', erro);
        }
        setShowModal(false); // Fecha o modal após a exclusão
    };

    const confirmarExclusao = (id) => {
        setSelectedItem(id);
        setShowModal(true);
    };

    const handleConfirm = () => {
        excluirDiaExcecao(selectedItem);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <div className="container mt-5">
            <h2>Lista de Dias de Exceção</h2>
            <table className="table table-striped table-bordered">
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
                                <td>{new Date(dia.data).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</td>
                                <td>{dia.motivo}</td>
                                <td>
                                    <button 
                                        onClick={() => editarDiaExcecao(dia.id)} 
                                        className='btn btn-warning btn-sm text-white px-2 me-2'>
                                        Editar
                                    </button>
                                    <button 
                                        onClick={() => confirmarExclusao(dia.id)} 
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
            <ExclusaoModal 
                show={showModal} 
                handleClose={handleClose} 
                handleConfirm={handleConfirm} 
                item={`DiaExcecao ${selectedItem}`} 
            />
        </div>
    );
}

export default ListaDiaExcecao;
