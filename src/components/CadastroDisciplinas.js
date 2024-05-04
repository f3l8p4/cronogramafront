import React,{useState,useEffect} from "react";
import { useForm } from 'react-hook-form';
import apiSalas from "../services/apiSalas/apiSalas";

const CadDisciplina = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [nome, setNome] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');
  const [fase, setFase] = useState('');
  const [sala, setSala] = useState('');
  const [selectedProfessor, setSelectedProfessor] = useState('');
  const [selectedSala, setSelectedSala] = useState('');
  
  const [optionsFases, setFases] = useState([]);

  
    useEffect(() => {
      const carregarSalas = async () => {
        try {
          const salasData = await apiSalas.getSalas();
          setSala(salasData);
        } catch (error) {
          console.error("Ocorreu um erro:",error);
        }
      };
  
      carregarSalas();
    }, [setValue]);
  
    
    const professores = [
        {id: 1, nome: 'José ribeiro'}
    ];
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
          <label htmlFor="selectedSala">Selecione a sala:</label>
          <select id="selectedSala" {...register("selectedSala")}>
            <option value="">Selecione uma sala</option>
              {Array.isArray(sala) && sala.map((sala) => (
            <option key={sala.id} value={sala.numero}>{sala.numero}</option>
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