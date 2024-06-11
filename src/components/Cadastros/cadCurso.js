import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import apiCoordenadores from "../../services/apiCoordenadores/apiCoordenadores"; 
import apiCursos from "../../services/apiCursos/ApiCursos";

const CadCurso = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();
    const [coordenadores, setCoordenadores] = useState([]);
    const [curso, setCurso] = useState({
        id: '',
        nome: '',
        qtdeFases: '',
        usuarioCoordenador: ''
    });

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const coordenadoresResponse = await apiCoordenadores.getCoordenadores();
                setCoordenadores(coordenadoresResponse);
            } catch (error) {
                console.error("Erro ao carregar dados de coordenadores:", error);
            }
        };

        const carregarCurso = async () => {
            if (id) {
                try {
                    const response = await apiCursos.getCurso(id);
                    const dadosCurso = response;
                    setCurso(dadosCurso);
                    setValue('nome', dadosCurso.nome);
                    setValue('qtdeFases', dadosCurso.qtdeFases);
                    setValue('usuarioCoordenador', dadosCurso.usuarioCoordenador.id);
                } catch (error) {
                    console.error("Erro ao carregar dados do curso:", error);
                }
            }
        };

        carregarDados();
        carregarCurso();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        const coordenadorSelecionado = coordenadores.find(coordenador => coordenador.id === parseInt(data.usuarioCoordenador));
        
        const dadosCurso = {
            nome: data.nome,
            qtdeFases: parseInt(data.qtdeFases),
            usuarioCoordenador: coordenadorSelecionado ? { id: coordenadorSelecionado.id } : null
        };

        try {
            console.log('Dados enviados:', dadosCurso); // Log para depuração

            if (curso.id) {
                await apiCursos.updateCurso(curso.id, dadosCurso);
                console.log('Curso atualizado com sucesso', dadosCurso);
            } else {
                await apiCursos.addCurso(dadosCurso);
                console.log('Curso cadastrado com sucesso', dadosCurso);
            }
            navigate('/cursos');
        } catch (error) {
            console.error('Erro ao salvar curso:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Cadastro de Curso</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome do Curso:</label>
                    <input
                        type="text"
                        id="nome"
                        className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
                        {...register("nome", { required: "O nome do curso é obrigatório" })}
                    />
                    {errors.nome && <div className="invalid-feedback">{errors.nome.message}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="qtdeFases" className="form-label">Quantidade de Fases:</label>
                    <input
                        type="number"
                        id="qtdeFases"
                        className={`form-control ${errors.qtdeFases ? 'is-invalid' : ''}`}
                        {...register("qtdeFases", { required: "A quantidade de fases é obrigatória" })}
                    />
                    {errors.qtdeFases && <div className="invalid-feedback">{errors.qtdeFases.message}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="usuarioCoordenador" className="form-label">Coordenador:</label>
                    <select
                        id="usuarioCoordenador"
                        className={`form-select ${errors.usuarioCoordenador ? 'is-invalid' : ''}`}
                        {...register("usuarioCoordenador", { required: "O coordenador é obrigatório" })}
                    >
                        <option value="">Selecione um coordenador</option>
                        {coordenadores.map(coordenador => (
                            <option key={coordenador.id} value={coordenador.id}>{coordenador.nome}</option>
                        ))}
                    </select>
                    {errors.usuarioCoordenador && <div className="invalid-feedback">{errors.usuarioCoordenador.message}</div>}
                </div>

                <button type="submit" className="btn btn-primary">Cadastrar Curso</button>
            </form>
        </div>
    );
}

export default CadCurso;
