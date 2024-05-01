import React,{useState,useEffect} from "react";
import { useForm } from 'react-hook-form';

const CadDisciplina = () => {
    
    const salas = [
        {id:1, numero: 101},
        {id:2, numero: 102},
        {id:3, numero: 103},
        {id:4, numero: 201}
    ]
    
    const fases = [
        {id:1, numero:1},
        {id:2, numero:2},
        {id:3, numero:3},
        {id:4, numero:4}
    ]
    
    const [nome, setNome] = useState('');
    const [cargaHoraria, setCargaHoraria] = useState('');
    const [fase, setFase] = useState('');
    const [sala, setSala] = useState('');
    const [professores, setProfessores] = useState([]);
    const [selectedProfessor, setSelectedProfessor] = useState('');
    
    const [OptionsSalas, setSalas] = useState([]);
    const [optionsFases, setFases] = useState([]);
    useEffect(() => {
      // Simula a carga dos dados JSON
      setSalas(salas)
      setFases(fases)
    }, []);
  
    /*useEffect(() => {
      fetchProfessores();
    }, []);
  */
   /* const fetchProfessores = async () => {
      try {
        const response = await axios.get('http://localhost:3001/professores'); // END POINT dos professores 
        setProfessores(response.data);
      } catch (error) {
        console.error('Erro ao buscar professores:', error);
      }
    };
  */
  /*  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:3001/disciplinas', {
          nome,
          cargaHoraria,
          sala,
          fase,
          professor: selectedProfessor,
        });
        console.log('Disciplina cadastrada:', response.data);
        //colocar mensagem de sucesso
      } catch (error) {
        console.error('Erro ao cadastrar disciplina:', error);
          //colocar mensagem de erro
      }
    };
  */
    return (
      <div>
        <h2>Cadastro de Disciplina</h2>
        <form /*onSubmit={handleSubmit}*/>
          <label>Nome da Disciplina:</label>
          <input type="text" value={nome}  />
          <br />
          <label>Carga Horária:</label>
          <select value={cargaHoraria} >
            <option value="">Selecione...</option>
            <option value="30">30 horas</option>
            <option value="60">60 horas</option>
            <option value="90">90 horas</option>
          </select>
          <br />
          <label>Sala:</label>
          <select value={sala} >
            {OptionsSalas.map(optionSalas => (
                <option key={optionSalas.id} value={optionSalas.numero}>{optionSalas.numero}</option>
            ))}
          </select>
          <br />
          <label>Fase:</label>
          <select value={fase} >
            {optionsFases.map(optionsFases => (
                <option key={optionsFases.id} value={optionsFases.numero}>{optionsFases.numero}</option>
            ))}
          </select>
          <br />
          <label>Professor:</label>
          <select value={selectedProfessor} >
            <option value="">Selecione...</option>
            {professores.map((professor) => (
              <option key={professor.id} value={professor.id}>
                {professor.nome}
              </option>
            ))}
          </select>
          <br />
          <button type="submit">Cadastrar Disciplina</button>
        </form>
        </div>
    )
}

export default CadDisciplina;