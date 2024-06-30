import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import apiCronograma from "../services/apiGeracaoCronograma/apiGeracaoCronograma";
import apiCurso from "../services/apiCursos/ApiCursos";
import TelaErro from "../components/views/TelaError";

const GeradorCronograma = () => {
    const [cursos, setCursos] = useState([]);
    const [error, setError] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    useEffect(() => {
        const carregarDados = async () => {
            try {
                const cursosResponse = await apiCurso.getCursos();
                setCursos(cursosResponse.data);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        };
        carregarDados();
    }, []);

    const onSubmit = async (data) => {
        const dataFormatadaInicio = new Date(data.dataInicio);
        const dataFormatadaFim = new Date(data.dataFim);
        
        const reqCronograma = { 
            nomeCurso: data.curso, 
            dataInicio: dataFormatadaInicio.toLocaleDateString('pt-BR', {timeZone: 'UTC'}), 
            dataFim: dataFormatadaFim.toLocaleDateString('pt-BR', {timeZone: 'UTC'}) 
        };
        
        console.log(reqCronograma);
        try {
           const response = await apiCronograma.getCronograma(reqCronograma);
           setError(response.data);
        } catch (error) {
            console.log('Houve erro ao gerar o cronograma', error);
            setError('Houve erro ao gerar o cronograma');
        }
    };

    return (
        <div className="container mt-5">
            <div className="text-center mb-4">
                <h1>CRONOGRAMA</h1>
                <p>Planejamento de cronograma.</p>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="dataInicio">Data de inicio</label>
                            <input 
                                type="date" 
                                className={`form-control mb-2 ${errors.dataInicio ? 'is-invalid' : ''}`} 
                                id="dataInicio" 
                                {...register("dataInicio", { required: "A data de inicio é obrigatória" })}
                            />
                            <label htmlFor="dataFim">Data de fim</label>
                            <input 
                                type="date" 
                                className={`form-control mb-2 ${errors.dataFim ? 'is-invalid' : ''}`} 
                                id="dataFim" 
                                {...register("dataFim", { required: "A data de fim é obrigatória" })}
                            />
                            {errors.dataFim && <div className="invalid-feedback">{errors.dataFim.message}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="curso">Curso</label>
                            <select 
                                className={`form-control mb-2 ${errors.curso ? 'is-invalid' : ''}`} 
                                id="curso" 
                                {...register("curso", { required: "O curso é obrigatório" })}
                            >
                                <option value="">Selecione um curso</option>
                                {cursos.map((curso) => (
                                    <option key={curso.id} value={curso.nome}>{curso.nome}</option>
                                ))}
                            </select>
                            {errors.curso && <div className="invalid-feedback">{errors.curso.message}</div>}
                        </div>
                        <button type="submit" className="btn btn-success btn-block">Gerar Cronograma</button>
                    </form>
                </div>
                <div className="col-md-8">
                    <TelaErro message={error} />
                    <button type="button" className="btn btn-primary mt-3" disabled>DOWNLOAD</button>
                </div>
            </div>
        </div>
    );
};

export default GeradorCronograma;
