import React, { useEffect, useState } from 'react';
import apiFases from "../../services/apiFases/apiFases";
import apiCursos from "../../services/apiCursos/ApiCursos";
import { useNavigate } from 'react-router-dom';

const ListaFases = () => {
    const [fases, setFases] = useState([]);
    const [cursos, setCursos] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const [fasesResponse, cursosResponse] = await Promise.all([
                    apiFases.getFases(),
                    apiCursos.getCursos()
                ]);

                setFases(fasesResponse.data);
                console.log(fasesResponse)
                const cursosMap = cursosResponse.data.reduce((acc, curso) => {
                    acc[curso.id] = curso.nome;
                    return acc;
                }, {});
                setCursos(cursosMap);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        };
        carregarDados();
    }, []);

    const editarFase = (id) => {
        navigate(`/editarFase/${id}`);
    };

    return (
        <div>
            <h2>Lista de Fases</h2>
            <table>
                <thead>
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
                                    <button onClick={() => editarFase(fase.id)}>Editar</button>
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
        </div>
    );
}

export default ListaFases;
