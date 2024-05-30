import React, { useEffect, useState } from 'react';
import apiCursos from "../../services/apiCursos/ApiCursos";
import { useNavigate } from 'react-router-dom';

const ListaCursos = () => {
  const [cursos, setCursos] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const carregarCursos = async () => {
      try {
        const data = await apiCursos.getCursos();
       
        if (Array.isArray(data)) {
          setCursos(data);
        } else {
          console.error('Não há cursos cadastrados no sistema:', data);
        }
      } catch (error) {
        console.error('Erro ao carregar cursos:', error);
      }
    };
    carregarCursos();
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
            <th>Usuário Coordenador</th>
          </tr>
        </thead>
        <tbody>
          {cursos.length > 0 ? (
            cursos.map((curso) => (
              <tr key={curso.id}>
                <td>{curso.id}</td>
                <td>{curso.nomeDisciplina}</td>
                <td>{curso.horasTotais}</td>
                <td>{curso.usuarioCoordenador}</td>
                <td><button onClick={() => editarCurso(curso.id)}>Editar</button></td>
                <td>Excluir</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Nenhum curso encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListaCursos;
