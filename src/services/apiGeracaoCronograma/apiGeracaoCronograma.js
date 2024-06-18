import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL

const getCronograma = async () => {
    
    try {
      const response = await axios.get(`${apiUrl}cronograma/gerarCronograma/`);
      return 'Cronograma gerado com sucesso'
    } catch (error) {
      console.error('Erro ao obter o cronograma:', error);
    }
  };
  
  const apiCronograma = {
    getCronograma
  }

  export default apiCronograma 