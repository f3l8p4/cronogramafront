import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import apiFases from '../../services/apiFases/apiFases';
import apiCursos from '../../services/apiCursos/ApiCursos';

const CadFase = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();
    const [fase, setFase] = useState({
        id: '',
        numero: '',
        curso: ''
    });
    const [cursos, setCursos] = useState([]);
    
    useEffect(() => {
        const carregarFase = async () => {
            if (id) {
                try {
                    const response = await apiFases.getFase(id);
                    const dadosFase = response.data;
                    console.log(dadosFase)
                    setFase(dadosFase);
                    setValue('numero', dadosFase.numero);
                    setValue('curso', dadosFase.curso.id);
                } catch (error) {
                    console.error('Erro ao carregar dados da fase:', error);
                }
            }
        };

        const carregarCursos = async () => {
            try {
                const response = await apiCursos.getCursos();
                setCursos(response.data);
            } catch (error) {
                console.error('Erro ao carregar cursos:', error);
            }
        };


        carregarFase();
        carregarCursos();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        try {
            if (fase.id) {
                await apiFases.updatefase(fase.id,data);
                console.log('Fase atualizada com sucesso');
            } else {
                await apiFases.addFase(data);
                console.log('Fase cadastrada com sucesso');
            }
            navigate('/fases');
        } catch (error) {
            console.error('Erro ao salvar fase:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Cadastro de Fase</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="numero" className="form-label">Número:</label>
                    <input 
                        type="text" 
                        id="numero" 
                        className={`form-control ${errors.numero ? 'is-invalid' : ''}`} 
                        {...register('numero', { required: "O número da fase é obrigatório" })} 
                    />
                    {errors.numero && <div className="invalid-feedback">{errors.numero.message}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="curso" className="form-label">Curso:</label>
                    <select 
                        id="curso" 
                        className={`form-select ${errors.curso ? 'is-invalid' : ''}`} 
                        {...register('curso', { required: "O curso é obrigatório" })}
                    >
                        <option value=''>Selecione...</option>
                        {cursos.map(curso => (
                            <option key={curso.id} value={curso.id}>{curso.nome}</option>
                        ))}
                    </select>
                    {errors.curso && <div className="invalid-feedback">{errors.curso.message}</div>}
                </div>

                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
    );
}

export default CadFase;
