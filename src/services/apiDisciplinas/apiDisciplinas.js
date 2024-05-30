import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL
const getDisciplinas = async () => {
    
    try {
      const response = await axios.get(`${apiUrl}disciplina/`);
      return response.data
    } catch (error) {
      console.error('Erro ao obter disciplinas:', error);
    }
  };
  
const getDisciplina = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}disciplina/${id}`);
      return response
    } catch (error) {
      console.log('Erro ao obter o registro de professor ',error)
    }
  };
  

  const addDisciplinas = async (nome, cargaHoraria,fase) => {
    try {
      const response = await axios.post(`${apiUrl}disciplina`, { nome,cargaHoraria,fase});
      console.log('Disciplina adicionada com sucesso');
    } catch (error) {
      console.error('Erro ao adicionar disciplina:', error);
    }
  };

  const excludeDisciplinas = async(id) => { 
    try{
        const response = await axios.delete(`${apiUrl}/disciplina/${id}`);
        console.log('Disciplinas excluídas com sucesso:', response.data);
    }catch(erro){
        console.error('erro ao excluir a disciplinas',erro)
    }
  }

  const updateDisciplinas = async(id,dadosAtualizados) => {
    try{
        const response = await axios.put(`${apiUrl}disciplinas/${id}`, dadosAtualizados);
    }catch(error){
        console.error('Erro ao atualizar disciplina:', error);
    }
  }

  const apiDisciplina = {
    getDisciplinas,
    getDisciplina,
    excludeDisciplinas,
    updateDisciplinas,
    addDisciplinas
  }
  export default apiDisciplina;