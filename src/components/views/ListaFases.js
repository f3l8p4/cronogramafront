import React, { useEffect, useState } from 'react';
import apiFases from "../../services/apiFases/apiFases";
import { useNavigate } from 'react-router-dom';

const ListaFases = () => {
    const [fases, setFases] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const carregarFases = async () => {
            try {
                const response = await apiFases.getFases();
                const data = response.data;
                console.log(data.curso)
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

    const excluirFase = (id) => {
        try{
            apiFases.excludeFase(id)
        }catch(erro){
            console.log('erro na exclusão de fases', erro)
        }
    }
    
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
                                <td>
                                    <button onClick={() => excluirFase(fase.id)}>Excluir</button>
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
