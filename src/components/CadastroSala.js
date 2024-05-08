import React from 'react';
import { useForm } from 'react-hook-form';

const CadSala = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async () => {
    
  };

  return (
    <div>
      <h2>Cadastro de Sala</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Numero da Sala:</label>
        <input type="text" {...register("nome")} />
        <br />
        <button type="submit">Cadastrar Sala</button>
      </form>
    </div>
  );
};

export default CadSala;
