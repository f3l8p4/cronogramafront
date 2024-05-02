import React from "react";
import { useForm } from 'react-hook-form';

const CadCurso = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data)
       };
    return(
        <div>
            <h1>Cadastro de curso</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="nomeDisciplina">Nome: </label>
                    <input type="text" id="nomeDisciplina" {...register('nomeDisciplina', {required: "O nome da disciplina é obrigatorio"})}/>
                    {errors.nomeDisciplina && <div> {errors.nomeDisciplina.message} </div>}
                </div>
                <div>
                    <label htmlFor="horasTotais">Horas totais: </label>
                    <input type="number" id="horasTotais" {...register('horasTotais', {required: "horas totais da disciplina são obrigatorio"})}/>
                    
                    {errors.horasTotais && <div> {errors.horasTotais.message} </div>}
                </div>
                <div>
                    <label htmlFor="quantidadeFases"> Quantidade de fases </label>
                    <input type="number" id="quantidadeFases" {...register('quantidadeFases', {required: "A quantidade de fases é obrigatoria"})} />
                    {errors.quantidadeFases && <div> {errors.quantidadeFases.message} </div>}
                </div>
                <button type="submit"> Enviar</button>
            </form>
        </div>
    )

}

export default CadCurso