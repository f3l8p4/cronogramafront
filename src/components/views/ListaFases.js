import React, { useEffect, useState } from 'react';
import apiFases from "../../services/apiFases/apiFases";
import { useNavigate } from 'react-router-dom';
import ExclusaoModal from '../modals/ExclusaoModal';

const ListaFases = () => {
    const [fases, setFases] = useState([]);
    
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    
    const navigate = useNavigate();

    useEffect(() => {
        const carregarFases = async () => {
            try {
                const response = await apiFases.getFases();
                const data = response.data;
                if (Array.isArray(data)) {
                    setFases(data);
                } else {
                    console.error('Não há fases cadastradas no sistema:', data);
                }
            } catch (error) {
                console.error('Erro ao carregar fases:', error);
            }
        };
        carregarFases();
    }, []);
    const excluirFase = async (id) => {
        try {
            await apiFases.excludeFase(id);
            setFases(fases.filter(fase => fase.id !== id));
        } catch (erro) {
            console.log('erro na exclusão de fases', erro);
        }
        setShowModal(false); // Fecha o modal após a exclusão
    };

    const confirmarExclusao = (id) => {
        setSelectedItem(id);
        setShowModal(true);
    };

    const handleConfirm = () => {
        excluirFase(selectedItem);
    };

    const handleClose = () => {
        setShowModal(false);
    };
    
    const editarFase = (id) => {
        navigate(`/editarFase/${id}`);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Lista de Fases</h2>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Número</th>
                        <th>Curso</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {fases.length > 0 ? (
                        fases.map((fase) => (
                            <tr key={fase.id}>
                                <td>{fase.id}</td>
                                <td>{fase.numero}</td>
                                <td>{fase.curso.nome}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm me-2" onClick={() => editarFase(fase.id)}>Editar</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => confirmarExclusao(fase.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">Nenhuma fase encontrada.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button className='btn btn-lg btn-primary' onClick={() => navigate('/cadastroFase/')}>Cadastrar nova Fase</button>
            <ExclusaoModal 
                show={showModal} 
                handleClose={handleClose} 
                handleConfirm={handleConfirm} 
                item={`Fase ${selectedItem}`} 
            />
        </div>
    );
}

export default ListaFases;
