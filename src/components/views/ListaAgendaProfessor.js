import React, { useEffect, useState } from 'react';
import apiAgendas from "../../services/apiAgendaProfessor/apiAgendaProfessor"; 
import { useNavigate } from 'react-router-dom';

const ListaAgendaProfessor = () => {
    const [agendas, setAgendas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const agendasResponse = await apiAgendas.getAgendaProfessores(); 
                setAgendas(agendasResponse);
                console.log(agendasResponse)
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        };
        carregarDados();
    }, []);

    const editarAgenda = (id) => {
        console.log("indo pra edição")
    };

    return (
        <div>
            <h2>Lista de Agenda de Professores</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome do Professor</th>
                        <th>Dia da Semana</th>
                        <th>Disciplina</th>
                        <th>Ações</th>
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
                                    <button onClick={() => editarAgenda(agenda.id)}>Editar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">Nenhuma agenda encontrada.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListaAgendaProfessor;
