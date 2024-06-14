import React, { useEffect, useState } from 'react';
import apiCursos from "../../services/apiCursos/ApiCursos";
import apiCoordenadores from "../../services/apiCoordenadores/apiCoordenadores";
import { useNavigate } from 'react-router-dom';
import ExclusaoModal from '../modals/ExclusaoModal';

const ListaCursos = () => {
    const [cursos, setCursos] = useState([]);
    const [coordenadores, setCoordenadores] = useState({});
    
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    
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

    const excluirCurso = async (id) => {
        try {
            await apiCursos.excludeCurso(id);
            setCursos(cursos.filter(curso => curso.id !== id));
        } catch (erro) {
            console.log('erro na exclusão de cursos', erro);
        }
        setShowModal(false); // Fecha o modal após a exclusão
    };

    const confirmarExclusao = (id) => {
        setSelectedItem(id);
        setShowModal(true);
    };

    const handleConfirm = () => {
        excluirCurso(selectedItem);
    };

    const handleClose = () => {
        setShowModal(false);
    };
    
    
    const editarCurso = (id) => {
        navigate(`/editarCurso/${id}`);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Lista de Cursos</h2>
            <table className="table table-striped table-bordered">
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
                                        onClick={() => confirmarExclusao(curso.id)}
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
            <ExclusaoModal 
                show={showModal} 
                handleClose={handleClose} 
                handleConfirm={handleConfirm} 
                item={`curso ${selectedItem}`} 
            />
        </div>
    );
}

export default ListaCursos;
