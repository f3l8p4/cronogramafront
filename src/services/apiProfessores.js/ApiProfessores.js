import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL

const getProfessores = async () => {
    
    try {
      const response = await axios.get(`${apiUrl}professor`);
      return response.data
    } catch (error) {
      console.error('Erro ao obter professores:', error);
    }
  };
  
const getProfessor = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}professor/${id}`);
      return response.data
    } catch (error) {
      console.log('Erro ao obter o registro de professor ',error)
    }
  };
  

  const addProfessores = async (nomeCompleto, telefone,cpf,qtdeDiasDeAula,urlFotoPerfil,status) => {
    try {
      const response = await axios.post(`${apiUrl}/professor`, { nomeCompleto, telefone,cpf,qtdeDiasDeAula, urlFotoPerfil,status });
      console.log('Professor adicionado com sucesso');
    } catch (error) {
      console.error('Erro ao adicionar professor:', error);
    }
  };

  const excludeProfessores = async(id) => { 
    try{
        const response = await axios.delete(`${apiUrl}/professor/${id}`);
        console.log('Usuário excluído com sucesso:', response.data);
    }catch(erro){
        console.error('erro ao excluir o usuário',erro)
    }
  }

  const updateProfessores = async(id,dadosAtualizados) => {
    try{
        const response = await axios.put(`${apiUrl}professor/${id}`, dadosAtualizados);
    }catch(error){
        console.error('Erro ao atualizar coordenador:', error);
    }
  }
  
  const buscarProfessorNome = async() => {
    try{
        const response = await axios.get(`${apiUrl}/professor?nome={nome}`)
    }catch(error){
      
    }
  }

  const apiProfessores = {
    getProfessores,
    getProfessor,
    addProfessores,
    updateProfessores,
    excludeProfessores
  }
  export default apiProfessores;