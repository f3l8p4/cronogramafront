import React, { useEffect, useState } from 'react';
import apiDisciplinas from "../../services/apiDisciplinas/apiDisciplinas";
import apiCoordenadores from "../../services/apiCoordenadores/apiCoordenadores";
import apiFases from "../../services/apiFases/apiFases";
import apiCursos from "../../services/apiCursos/ApiCursos";
import { useNavigate } from 'react-router-dom';
import apiDisciplina from '../../services/apiDisciplinas/apiDisciplinas';

const ListaDisciplinas = () => {
    const [disciplinas, setDisciplinas] = useState([]);
    const [fases, setFases] = useState({});
    const [cursos, setCursos] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const carregarDisciplina = async () => {
            try {
                const data = await apiDisciplina.getDisciplinas()
                console.log(data)
                if (Array.isArray(data)) {
                  setDisciplinas(data)
                } else {
                  console.error('não há disciplinas cadastrados no sistema:', data);
                }
              } catch (error) {
                console.error('Erro ao carregar disciplinas:', error);
              }
            };
            carregarDisciplina()
    }, []);

    const editarDisciplina = (id) => {
        navigate(`/editarDisciplina/${id}`);
    };

    return (
        <div>
            <h2>Lista de Disciplinas</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Carga Horária</th>
                        <th>Fase</th>
                        <th>Curso</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {disciplinas.length > 0 ? (
                        disciplinas.map((disciplina) => (
                            <tr key={disciplina.id}>
                                <td>{disciplina.id}</td>
                                <td>{disciplina.nome}</td>
                                <td>{disciplina.cargaHoraria}</td>
                                <td>{disciplina.fase.numero}</td>
                                <td>{disciplina.fase.curso.nome}</td>
                                <td>
                                    <button onClick={() => editarDisciplina(disciplina.id)}>Editar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">Nenhuma disciplina encontrada.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListaDisciplinas;
