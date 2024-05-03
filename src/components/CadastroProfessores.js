import React,{useState} from "react";
import { useForm } from 'react-hook-form';
import api from "../services/apiProfessores.js/Api";
import DiasSemana from "./DiasDaSemana";


const CadProfessor = () => {
  
    const [id, setId] = useState('')
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [aulasSemanais, setAulasSemanais] = useState('');
    const [diasLecionados, setdiasLecionados] = useState('');
  
    const {handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = (data) => {
      console.log(data)
      api.addProfessores(nome,email,aulasSemanais,diasLecionados);
     };
    return (   
    <div className="App" onLoad={api.getProfessores()}>
    <h1>Cadastro de professores</h1>
   <form onSubmit={handleSubmit(onSubmit)}>
     <div>
       <label htmlFor="name">Nome: </label>
       <input type="text" id="name" value={nome} onChange={(e) => setNome(e.target.value)} />
     </div>
     <div>
       <label htmlFor="email">E-mail: </label>
       <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
     </div>
     <div>
      <label htmlFor="number">Quantidade de aulas semanais: </label>
      <input type="number" id="number" value={aulasSemanais} onChange={(e) => setAulasSemanais(e.target.value)}/>
     </div>
     <div>
        <DiasSemana/>
      </div>
     <button type="submit">Enviar</button>
   </form>
 </div>
);
}

export default CadProfessor;