import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const getCronograma = async (data) => {
    try {
        const response = await axios.post(`${apiUrl}cronograma/gerarcronograma/`,data);
        return response.data; 
    } catch (error) {
        console.log(error)
    }
};

const apiCronograma = {
    getCronograma
};

export default apiCronograma;
