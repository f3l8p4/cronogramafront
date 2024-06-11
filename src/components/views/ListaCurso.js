import React, { useEffect, useState } from 'react';
import apiCursos from "../../services/apiCursos/ApiCursos";
import apiCoordenadores from "../../services/apiCoordenadores/apiCoordenadores";
import { useNavigate } from 'react-router-dom';

const ListaCursos = () => {
    const [cursos, setCursos] = useState([]);
    const [coordenadores, setCoordenadores] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const [cursosResponse, coordenadoresResponse] = await Promise.all([
                    apiCursos.getCursos(),
                    apiCoordenadores.getCoordenadores()
                ]);

                setCursos(cursosResponse.data);
                console.log(cursosResponse)
                const coordenadoresMap = coordenadoresResponse.data.reduce((acc, coordenador) => {
                    acc[coordenador.id] = coordenador.nome;
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

    const excluirCurso = (id) => {
        try{
            apiCursos.excludeCurso(id)
            console.log('curso excluído com sucesso', id)
        }catch(erro){
            
        }
    }
    
    const editarCurso = (id) => {
        navigate(`/editarCurso/${id}`);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Lista de Cursos</h2>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
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
                                <td>{curso.usuarioCoordenador.nome}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => editarCurso(curso.id)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => excluirCurso(curso.id)}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">Nenhum curso encontrado.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListaCursos;
