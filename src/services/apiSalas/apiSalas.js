import axios from "axios";


const apiUrl = 'http://localhost:8000'

const getSalas = async () => {
    
    try {
      const response = await axios.get(`${apiUrl}/salas`);
      return response.data
      console.log('salas:', response.data);
    } catch (error) {
      console.error('erro ao obter:', error);
    }
  };
  
const apiSalas = {
    getSalas
}

export default apiSalas