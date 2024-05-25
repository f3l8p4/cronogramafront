import React,{useEffect,useState} from "react";

import apiProfessores from "../../services/apiProfessores.js/ApiProfessores";

const ListaProfessores = () => {
    const [professores, setProfessores] = useState([]);
    
    useEffect(() => {
        const caaregarProfessores = async () => {
          try {
            const data = await apiProfessores.getProfessores()
            setProfessores(data);
          } catch (error) {
            console.log(error)
          }
        };
        caaregarProfessores();
    }, []);
    
    return (
        <div>
          <h2>Lista de Professores</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome Completo</th>
                <th>Telefone</th>
                <th>Quantidade de Dias de Aula</th>
                <th>Status</th>
                <th>Foto de Perfil</th>
              </tr>
            </thead>
            <tbody>
              {professores.map((professor) => (
                <tr key={professor.id}>
                  <td>{professor.id}</td>
                  <td>{professor.nomeCompleto}</td>
                  <td>{professor.telefone}</td>
                  <td>{professor.qtdeDiasDeAula}</td>
                  <td>{professor.status}</td>
                  <td><img src={professor.urlFotoPerfil} alt={professor.nomeCompleto} width="50" height="50" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}

export default ListaProfessores