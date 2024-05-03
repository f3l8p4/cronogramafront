import React,{useState} from "react";

const DiasSemana = () => {
    const DaysOfWeek  = [
        { id: 1, name: 'Segunda-feira' },
        { id: 2, name: 'Terça-feira' },
        { id: 3, name: 'Quarta-feira' },
        { id: 4, name: 'Quinta-feira' },
        { id: 5, name: 'Sexta-feira' },
        { id: 6, name: 'Sábado' },
        { id: 7, name: 'Domingo'  }
      ];
    
    const [selectedDays, setSelectedDays] = useState([]);
  
    const handleDayChange  = (e) => {
      const selectedDayId = parseInt(e.target.value);
      const isChecked = e.target.checked;
      if (isChecked) {
        setSelectedDays([...selectedDays, selectedDayId]);
      } else {
        setSelectedDays(selectedDays.filter(dayId => dayId !== selectedDayId));
      }
      
     console.log('teste')
    };  
    
    return (
    <div>
        <label htmlFor='DaysOfWeek'> Dias Da Semana </label>
        {DaysOfWeek.map(day => (
        <div key={day.id}>
            <input
            type="checkbox"
            id={`day-${day.id}`}
            value={day.id}
            checked={selectedDays.includes(day.id)}
            onChange={handleDayChange}/>
        <label htmlFor={`day-${day.id}`}>{day.name}</label>
        </div>
        ))}
    </div>   
    )
}

export default DiasSemana