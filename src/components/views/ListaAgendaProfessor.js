import React, { useEffect, useState } from 'react';
import apiAgendas from "../../services/apiAgendaProfessor/apiAgendaProfessor"; 
import { useNavigate } from 'react-router-dom';
import apiAgendaProfessor from '../../services/apiAgendaProfessor/apiAgendaProfessor';
import ExclusaoModal from '../modals/ExclusaoModal';
import Pagination from '../buttons/Paginacao';

const ListaAgendaProfessor = () => {
    const [agendas, setAgendas] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc'); // Estado para controlar a ordenação
    
    // Paginação
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);  // Número de itens por página
    
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    
    const navigate = useNavigate();

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const agendasResponse = await apiAgendas.getAgendaProfessores(); 
                setAgendas(agendasResponse);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        };
        carregarDados();
    }, []);
    
    const excluirAgendaProfessor = async (id) => {
        try {
            await apiAgendaProfessor.excludeAgendaProfessor(id);
            setAgendas(agendas.filter(agenda => agenda.id !== id));
        } catch (erro) {
            console.log('erro na exclusão de agenda do professor', erro);
        }
        setShowModal(false); 
    };

    const confirmarExclusao = (id) => {
        setSelectedItem(id);
        setShowModal(true);
    };

    const handleConfirm = () => {
        excluirAgendaProfessor(selectedItem);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const editarAgenda = (id) => {
        navigate(`/editarAgendaProfessor/${id}`);
    };

    // Ordenar agendas por ID
    const sortedAgendas = agendas.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.id - b.id;
        } else {
            return b.id - a.id;
        }
    });

    // Obter os itens atuais
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedAgendas.slice(indexOfFirstItem, indexOfLastItem);
      
    // Alterar página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Alternar a ordenação
    const toggleSortOrder = () => {
        setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Lista de Agenda de Professores</h2>
            <div className="mb-3">
                <button className="btn btn-secondary" onClick={toggleSortOrder}>
                    Ordenar por ID ({sortOrder === 'asc' ? 'Crescente' : 'Decrescente'})
                </button>
            </div>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nome do Professor</th>
                        <th>Dia da Semana</th>
                        <th>Disciplina</th>
                        <th colSpan="2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (
                        currentItems.map((agenda) => (
                            <tr key={agenda.id}>
                                <td>{agenda.id}</td>
                                <td>{agenda.professor.nomeCompleto}</td>
                                <td>{agenda.diaDaSemana.descricao}</td>
                                <td>{agenda.disciplina.nome}</td>
                                <td>
                                    <button className="btn btn-warning me-2" onClick={() => editarAgenda(agenda.id)}>Editar</button>
                                    <button className="btn btn-danger" onClick={() => confirmarExclusao(agenda.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">Nenhuma agenda encontrada.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination itemsPerPage={itemsPerPage} totalItems={sortedAgendas.length} paginate={paginate} currentPage={currentPage} />
            
            <button className='btn btn-lg btn-primary' onClick={() => navigate('/cadastroAgendaProfessor/')}>Cadastrar nova agenda de professor</button>
            
            <ExclusaoModal 
                show={showModal} 
                handleClose={handleClose} 
                handleConfirm={handleConfirm} 
                item={`agendaProfessor ${selectedItem}`} 
            />
        </div>
    );
}

export default ListaAgendaProfessor;
