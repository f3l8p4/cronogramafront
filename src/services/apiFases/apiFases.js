import axios from "axios";


const apiUrl = 'http://localhost:8000'

const getFases = async () => {
    
    try {
      const response = await axios.get(`${apiUrl}/fases`);
      return response.data
    } catch (error) {
      console.error('erro ao obter:', error);
    }
  };
  
const apiFases = {
    getFases
}

export default apiFases