import React, { useEffect, useState } from 'react';
import apiCursos from "../../services/apiCursos/ApiCursos";
import apiCoordenador from "../../services/apiCoordenadores/apiCoordenadores";
import { useNavigate } from 'react-router-dom';

const ListaCursos = () => {
    const [cursos, setCursos] = useState([]);
    const [coordenadores, setCoordenadores] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const [cursosResponse, CoordenadoresResponse] = await Promise.all([
                    apiCursos.getCursos(),
                    apiCoordenador.getCoordenadores()
                ]);

                setCursos(cursosResponse.data);

                const coordenadoresMap = CoordenadoresResponse.data.reduce((acc, usuario) => {
                    acc[usuario.id] = usuario.nome;
                    return acc;
                }, {});
                console.log('Coordenadores Map:', coordenadoresMap);
                setCoordenadores(coordenadoresMap);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        };
        carregarDados();
    }, []);

    const editarCurso = (id) => {
        navigate(`/editarCurso/${id}`);
    };

    return (
        <div>
            <h2>Lista de Cursos</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Horas Totais</th>
                        <th>Coordenador</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {cursos.length > 0 ? (
                        cursos.map((curso) => (
                            <tr key={curso.id}>
                                <td>{curso.id}</td>
                                <td>{curso.nome}</td>
                                <td>{curso.horasTotais}</td>
                                <td>{coordenadores[curso.coordenadorId]}</td>
                                <td>
                                    <button onClick={() => editarCurso(curso.id)}>Editar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">Nenhum curso encontrado.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListaCursos;
