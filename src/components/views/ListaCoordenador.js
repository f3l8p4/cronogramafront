import React, { useEffect, useState } from 'react';
import apiCoordenadores from "../../services/apiCoordenadores/apiCoordenadores";
import { useNavigate } from 'react-router-dom';
import Pagination from '../buttons/Paginacao';

const ListaCoordenadores = () => {
  const [coordenadores, setCoordenadores] = useState([]);
  
  //Paginacao
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);  // Número de itens por página
  
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

  const atualizarStatusCoordenador = async (id, novoStatus) => {
    try {
        await apiCoordenadores.updateCoordenadorStatus(id, novoStatus);
        setCoordenadores(coordenadores.map(cod => cod.id === id ? { ...cod, status: novoStatus } : cod));
    } catch (error) {
        console.error(`Erro ao atualizar status do coordenador para ${novoStatus}:`, error);
    }
};
  
  const editarCoordenador = (id) => {
    navigate(`/editarCoordenador/${id}`);
  };
  
  // Obter os itens atuais
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = coordenadores.slice(indexOfFirstItem, indexOfLastItem);
        
  // Alterar página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  return (
    <div className="container mt-5">
    <h2 className="mb-4">Lista de Coordenadores</h2>
    <table className="table table-striped table-bordered">
      <thead className="thead-dark">
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>CPF</th>
          <th>URL da Foto de Perfil</th>
          <th>Status</th>
          <th>Nível de Permissão</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.length > 0 ? (
          currentItems.map((coordenador) => (
            <tr key={coordenador.id}>
              <td>{coordenador.id}</td>
              <td>{coordenador.nome}</td>
              <td>{coordenador.email}</td>
              <td>{coordenador.cpf}</td>
              <td>
                <img 
                  src={coordenador.urlFotoPerfil} 
                  alt={coordenador.nome} 
                  className="img-thumbnail" 
                  width="50" 
                  height="50" 
                />
              </td>
              <td>{coordenador.status}</td>
              <td>{coordenador.nivelPermissao}</td>
              <td>
                <button 
                  onClick={() => editarCoordenador(coordenador.id)} 
                  className="btn btn-warning btn-sm text-white me-2"
                >
                  Editar
                </button>
                {coordenador.status === 'ATIVO' ? (
                  <button 
                    onClick={() => atualizarStatusCoordenador(coordenador.id, 'INATIVO')} 
                    className="btn btn-danger btn-sm"
                  >
                    Desativar
                  </button>
                ) : (
                  <button 
                    onClick={() => atualizarStatusCoordenador(coordenador.id, 'ATIVO')} 
                    className="btn btn-success btn-sm"
                  >
                    Ativar
                  </button>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" className="text-center">Nenhum coordenador encontrado.</td>
          </tr>
        )}
      </tbody>
    </table>
    <Pagination itemsPerPage={itemsPerPage} totalItems={coordenadores.length} paginate={paginate} currentPage={currentPage} />
    <button className='btn btn-lg btn-primary' onClick={() => navigate('/cadastroCoordenador/')}>Cadastrar novo usuário</button>
  </div>
  );
}

export default ListaCoordenadores;
