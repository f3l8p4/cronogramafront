import React from 'react'
import { useForm } from 'react-hook-form';
const CadCoordenador = () =>{
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log(data)
       };
       
    return(
        <div>
            <h1>Cadastro de coordenador</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='nomeCoordenador'>Nome:</label>
                    <input type='text' id='nomeCoordenador' {...register('nomeCoordenador', {required: "O nome do coordenador é obrigatorio"})}/>
                </div>
                <div>
                    <label htmlFor='emailCoordenador'>email:</label>
                    <input type='text' id='emailCoordenador' {...register('emailCoordenador', {required: "O email do coordenador é obrigatorio"})}/>
                </div>
                <div>
                    <label>Senha:</label>
                    <input type='text'/>
                </div>
                <div>
                    <label>Foto de perfil:</label>
                    <input type='file'/>
                </div>
                <button type='submit'>Enviar</button>
            </form>
        </div>
    )
}

export default CadCoordenador