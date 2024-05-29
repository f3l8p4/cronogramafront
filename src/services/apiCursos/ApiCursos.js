import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL

const getCursos = async () => {
    
    try {
      const response = await axios.get(`${apiUrl}curso`);
      return response
    } catch (error) {
      console.error('Erro ao obter cursos:', error);
    }
  };
  
const getCurso = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/curso/${id}`);
      return response.data
    } catch (error) {
      console.log('Erro ao obter o registro de curso ',error)
    }
  };
  

  const addCurso = async (nome, horasTotais,qtdeFases,coordenador) => {
    try {
      const response = await axios.post(`${apiUrl}/professor`, { nome, horasTotais,qtdeFases,coordenador });
      console.log('Curso adicionado com sucesso');
    } catch (error) {
      console.error('Erro ao adicionar Curso:', error);
    }
  };

  const excludeCurso = async(id) => { 
    try{
        const response = await axios.delete(`${apiUrl}/curso/${id}`);
        console.log('Curso excluído com sucesso:', response.data);
    }catch(erro){
        console.error('erro ao excluir o Curso',erro)
    }
  }

  const updateCurso = async(id,dadosAtualizados) => {
    try{
        const response = await axios.put(`${apiUrl}/curso/${id}`, dadosAtualizados);
    }catch(error){
        console.error('Erro ao atualizar curso:', error);
    }
  }

  const apiCurso = {
    getCursos,
    getCursos,
    addCurso,
    updateCurso,
    excludeCurso
  }
  export default apiCurso;