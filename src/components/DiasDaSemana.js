import React,{useState,useEffect } from "react";
import { useForm, useFormContext } from "react-hook-form";

const DiasSemana = () => {
  const { register, getValues, formState:{errors} } = useForm();

  const DaysOfWeek = [
    { id: 1, name: 'Segunda-feira' },
    { id: 2, name: 'Terça-feira' },
    { id: 3, name: 'Quarta-feira' },
    { id: 4, name: 'Quinta-feira' },
    { id: 5, name: 'Sexta-feira' },
    { id: 6, name: 'Sábado' },
    { id: 7, name: 'Domingo' }
  ];

  
 

  useEffect(() => {
    const selectedDays = getValues("selectedDays");
    console.log("Dias selecionados:", selectedDays);
  }, [getValues]);

  
  return (
    <div>
      <label htmlFor='DaysOfWeek'> Dias Da Semana </label>
      {DaysOfWeek.map(day => (
        <div key={day.id}>
          <input
            type="checkbox"
            id={`day-${day.id}`}
            value={day.id}
            {...register(`selectedDays.${day.id}`)}
          />
          <label htmlFor={`day-${day.id}`}>{day.name}</label>
        </div>
      ))}
    </div>
  );
};

export default DiasSemana;
