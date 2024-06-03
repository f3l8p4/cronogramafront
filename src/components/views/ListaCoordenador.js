import React, { useEffect, useState } from 'react';
import apiCoordenadores from "../../services/apiCoordenadores/apiCoordenadores";
import { useNavigate } from 'react-router-dom';

const ListaCoordenadores = () => {
  const [coordenadores, setCoordenadores] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const carregarCoordenadores = async () => {
      try {
        const data = await apiCoordenadores.getCoordenadores();
       
        if (Array.isArray(data)) {
          setCoordenadores(data);
        } else {
          console.error('Não há coordenadores cadastrados no sistema:', data);
        }
      } catch (error) {
        console.error('Erro ao carregar coordenadores:', error);
      }
    };
    carregarCoordenadores();
  }, []);

  const editarCoordenador = (id) => {
    navigate(`/editarCoordenador/${id}`);
  };
  
  return (
    <div>
      <h2>Lista de Coordenadores</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
            <th>URL da Foto de Perfil</th>
            <th>Status</th>
            <th>Nível de Permissão</th>
          </tr>
        </thead>
        <tbody>
          {coordenadores.length > 0 ? (
            coordenadores.map((coordenador) => (
              <tr key={coordenador.id}>
                <td>{coordenador.id}</td>
                <td>{coordenador.nome}</td>
                <td>{coordenador.email}</td>
                <td>{coordenador.cpf}</td>
                <td>
                  <img src={coordenador.urlFotoPerfil} alt={coordenador.nome} width="50" height="50" />
                </td>
                <td>{coordenador.status}</td>
                <td>{coordenador.nivelPermissao}</td>
                <td><button onClick={() => editarCoordenador(coordenador.id)}>Editar</button></td>
                <td>Excluir</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Nenhum coordenador encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListaCoordenadores;
