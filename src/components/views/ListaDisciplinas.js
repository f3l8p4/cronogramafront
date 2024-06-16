import React, { useEffect, useState } from 'react';
import apiDisciplinas from "../../services/apiDisciplinas/apiDisciplinas";
import apiCoordenadores from "../../services/apiCoordenadores/apiCoordenadores";
import apiFases from "../../services/apiFases/apiFases";
import apiCursos from "../../services/apiCursos/ApiCursos";
import { useNavigate } from 'react-router-dom';
import ExclusaoModal from '../modals/ExclusaoModal';


const ListaDisciplinas = () => {
    const [disciplinas, setDisciplinas] = useState([]);
    const [coordenadores, setCoordenadores] = useState({});
    const [fases, setFases] = useState({});
    const [cursos, setCursos] = useState({});
    
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    
    const navigate = useNavigate();

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const [disciplinasResponse, fasesResponse, cursosResponse] = await Promise.all([
                    apiDisciplinas.getDisciplinas(),
                    apiFases.getFases(),
                    apiCursos.getCursos()
                ]);

                setDisciplinas(disciplinasResponse);

                const cursosMap = cursosResponse.data.reduce((acc, curso) => {
                    acc[curso.id] = curso.nome;
                    return acc;
                }, {});
                setCursos(cursosMap);

                const fasesMap = fasesResponse.data.reduce((acc, fase) => {
                    acc[fase.id] = {
                        numero: fase.numero,
                        curso: cursosMap[fase.cursoId]
                    };
                    return acc;
                }, {});
                setFases(fasesMap);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        };
        carregarDados();
    }, []);
    
    const excluirDisciplina = async (id) => {
        try {
            await apiDisciplinas.excludeDisciplinas(id);
            setDisciplinas(disciplinas.filter(disciplina => disciplina.id !== id));
        } catch (erro) {
            console.log('erro na exclusão de disicplinas', erro);
        }
        setShowModal(false); // Fecha o modal após a exclusão
    };

    const confirmarExclusao = (id) => {
        setSelectedItem(id);
        setShowModal(true);
    };

    const handleConfirm = () => {
        excluirDisciplina(selectedItem);
    };

    const handleClose = () => {
        setShowModal(false);
    };
    
    const editarDisciplina = (id) => {
        navigate(`/editarDisciplina/${id}`);
    };

    return (
        <div className="container mt-5">
            <h2>Lista de Disciplinas</h2>
            <table className='table table-striped table-bordered'>
                <thead className=''>
                    <tr className='fs-5 mb-2'>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Carga Horária</th>
                        <th>Fase</th>
                        <th>Curso</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody className=' table-group-divider '>
                    {disciplinas.length > 0 ? (
                        disciplinas.map((disciplina) => (
                            <tr key={disciplina.id} className='fs-6'>
                                <td>{disciplina.id}</td>
                                <td>{disciplina.nome}</td>
                                <td>{disciplina.cargaHoraria}</td>
                                <td>{disciplina.fase.numero}</td>
                                <td>{disciplina.fase.curso.nome}</td>
                                <td className=''>
                                    <button onClick={() => editarDisciplina(disciplina.id)} className='btn btn-warning btn-sm text-white px-2 me-'>Editar</button>
                                    
                                    <button onClick={() => confirmarExclusao(disciplina.id)} className='btn btn-sm btn-danger'>Excluir</button>
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
            <ExclusaoModal 
                show={showModal} 
                handleClose={handleClose} 
                handleConfirm={handleConfirm} 
                item={`Disciplina ${selectedItem}`} 
            />
        </div>
    );
}

export default ListaDisciplinas;