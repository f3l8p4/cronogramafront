import axios from "axios";

const apiUrl = 'http://localhost:8000'

const getProfessores = async () => {
    try {
      const response = await axios.get(`${apiUrl}/professores`);
      console.log('professores:', response.data);
    } catch (error) {
      console.error('Erro ao obter usuários:', error);
    }
  };

  const addProfessores = async (nome, email,aulasSemanais,diasLecionados) => {
    try {
      await axios.post(`${apiUrl}/professores`, { nome, email,aulasSemanais,diasLecionados });
      console.log('Usuário adicionado com sucesso');
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
    }
  };
  const api = {
    getProfessores,
    addProfessores
  }
  export default api;