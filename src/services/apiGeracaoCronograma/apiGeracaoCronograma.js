import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL

const getCronograma = async (data) => {
    
    try {
      const response = await axios.get(`${apiUrl}cronograma/gerarcronograma/`,data);
      return response
    } catch (error) {
      console.error('Erro ao obter o cronograma:', error);
    }
  };
  
  const apiCronograma = {
    getCronograma
  }

  export default apiCronograma 