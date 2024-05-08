import React from "react";
import { useForm } from "react-hook-form";

const CadFase = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data); 
  };

  return (
    <div>
      <h2>Cadastro de Fase</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Número da Fase:</label>
        <input type="number" {...register("numero")} />
        <br />
        <label>Curso Vinculado:</label>
        <input type="text" {...register("curso")} />
        <br />
        <button type="submit">Cadastrar Fase</button>
      </form>
    </div>
  );
};

export default CadFase;