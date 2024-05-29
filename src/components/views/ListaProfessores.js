import React, { useEffect, useState } from 'react';
import  apiProfessores   from "../../services/apiProfessores.js/ApiProfessores";
import { useNavigate } from 'react-router-dom';

const ListaProfessores = () => {
  const [professores, setProfessores] = useState([]);
  const navigate = useNavigate()
  
  useEffect(() => {
    const carregarProfessores = async () => {
      try {
        const data = await apiProfessores.getProfessores()
        console.log(data)
        if (Array.isArray(data)) {
          setProfessores(data);
        } else {
          console.error('não há professores cadastrados no sistema:', data);
        }
      } catch (error) {
        console.error('Erro ao carregar professores:', error);
      }
    };
    carregarProfessores();
  }, []);

  const editarProfessor = (id) => {
    navigate(`/editarProfessor/${id}`);
  };
  
  return (
    <div>
      <h2>Lista de Professores</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome Completo</th>
            <th>Telefone</th>
            <th>CPF</th>
            <th>Quantidade de Dias de Aula</th>
            <th>Status</th>
            <th>Foto de Perfil</th>
          </tr>
        </thead>
        <tbody>
          {professores.length > 0 ? (
            professores.map((professor) => (
              <tr key={professor.id}>
                <td>{professor.id}</td>
                <td>{professor.nomeCompleto}</td>
                <td>{professor.telefone}</td>
                <td>{professor.cpf}</td>
                <td>{professor.qtdeDiasDeAula}</td>
                <td>{professor.status}</td>
                <td>
                  <img src={professor.urlFotoPerfil} alt={professor.nomeCompleto} width="50" height="50" />
                </td>
                <td><button onClick={() => editarProfessor(professor.id)}>Editar</button></td>
                <td>Excluir</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">Nenhum professor encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListaProfessores;
