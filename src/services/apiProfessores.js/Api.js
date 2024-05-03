import axios from "axios";

const apiUrl = 'http://localhost:8000'

const getProfessores = async () => {
    
    try {
      const response = await axios.get(`${apiUrl}/professores`);
      console.log('professores:', response.data);
    } catch (error) {
      console.error('Erro ao obter professores:', error);
    }
  };

  const addProfessores = async (nome, email,aulasSemanais,diasLecionados) => {
    try {
      const response = await axios.post(`${apiUrl}/professores`, { nome, email,aulasSemanais,diasLecionados });
      console.log('Professor adicionado com sucesso');
    } catch (error) {
      console.error('Erro ao adicionar professor:', error);
    }
  };

  const excludeProfessores = async(id) => { 
    try{
        const response = await axios.delete(`${apiUrl}/professores/${id}`);
        console.log('Usuário excluído com sucesso:', response.data);
    }catch(erro){
        console.error('erro ao excluir o usuário',erro)
    }
  }

  const updateProfessores = async(id,dadosAtualizados) => {
    try{
        const response = await axios.put(`${apiUrl}/professores/${id}`, dadosAtualizados);
    }catch(error){
        console.error('Erro ao atualizar coordenador:', error);
    }
  }

  const api = {
    getProfessores,
    addProfessores,
    excludeProfessores
  }
  export default api;