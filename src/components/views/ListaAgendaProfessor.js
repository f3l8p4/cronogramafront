import React, { useEffect, useState } from 'react';
import apiAgendas from "../../services/apiAgendaProfessor/apiAgendaProfessor"; 
import { useNavigate } from 'react-router-dom';
import apiAgendaProfessor from '../../services/apiAgendaProfessor/apiAgendaProfessor';

const ListaAgendaProfessor = () => {
    const [agendas, setAgendas] = useState([]);
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
    
    const excluirAgendaProfessor = (id) => {
        try{
            apiAgendaProfessor.excludeAgendaProfessor(id)
        }catch(erro){
            console.log('houve um erro na exclusão', erro)
        }
    }

    const editarAgenda = (id) => {
        navigate(`/editarAgendaProfessor/${id}`);
    };

    return (
        <div className="container mt-5">
        <h2 className="mb-4">Lista de Agenda de Professores</h2>
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
                {agendas.length > 0 ? (
                    agendas.map((agenda) => (
                        <tr key={agenda.id}>
                            <td>{agenda.id}</td>
                            <td>{agenda.professor.nomeCompleto}</td>
                            <td>{agenda.diaDaSemana.descricao}</td>
                            <td>{agenda.disciplina.nome}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => editarAgenda(agenda.id)}>Editar</button>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => excluirAgendaProfessor(agenda.id)}>Excluir</button>
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
    </div>
    );
}

export default ListaAgendaProfessor;
