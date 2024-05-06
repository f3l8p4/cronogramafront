import React,{useState,useEffect} from "react";
import { useForm } from 'react-hook-form';
import apiSalas from "../services/apiSalas/apiSalas";
import apiFases from "../services/apiFases/apiFases";
import apiProfessores from "../services/apiProfessores.js/ApiProfessores";

const CadDisciplina = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [nome, setNome] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');
  const [fase, setFase] = useState('');
  const [sala, setSala] = useState('');
  const setProfessor = useState;
  const [selectedProfessor, setSelectedProfessor] = useState('');
  const [selectedSala, setSelectedSala] = useState('');
  const [selectedFase, setSelectedFase] = useState('');
  
    useEffect(() => {
      const carregarSalas = async () => {
        try {
          const salasData = await apiSalas.getSalas();
          setSala(salasData);
        } catch (error) {
          console.error("Ocorreu um erro:",error);
        }
      };
      
      const carregarFases= async () => {
        try {
          const fasesData = await apiFases.getFases();
          setFase(fasesData);
        } catch (error) {
          console.error("Ocorreu um erro:",error);
        }
      };
      
      const carregarProfessores = async () => {
        try{
          const professoresData = await apiProfessores.getProfessores()
          setProfessor(professoresData)
        }catch(error){
          console.log(error)
        }
      }
  
      carregarSalas()
      carregarFases()
      carregarProfessores()
    }, [setValue]);
    
    const professor = {
      id:1,
      numero: 101
    }
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
          <select id="selectedFase" {...register("selectedFase")}>
            <option value="">Selecione uma fase</option>
              {Array.isArray(fase) && fase.map((fase) => (
            <option key={fase.id} value={fase.numero}>{fase.numero}</option>
        ))}
      </select>
          <br />
          <label>Professor:</label>
          <select id="selectedProfessor" {...register("selectedProfessor")} >
            <option>Selecione...</option>
            {Array.isArray(professor) && professor.map((professor) => (
              <option key={professor.id} value={professor.nome}>
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