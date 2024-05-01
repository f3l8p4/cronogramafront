import React,{useState} from "react";
import { useForm } from 'react-hook-form';

const CadDisciplina = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = (data) => {
        console.log(data)
       };
    return(
        <div>
            <h1>Cadastro de disciplinas</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="nomeDisciplina">Nome: </label>
                    <input type="text" id="nomeDisciplina" {...register('name', { required: 'Por favor, insira um nome Para a disciplina'})}/>
                    {errors.nomeDisciplina && <div>{errors.nomeDisciplina.message}</div>}
                </div>
            </form>
        </div>
    )
}

export default CadDisciplina;