import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import apiFases from "../../services/apiFases/apiFases";
import apiCursos from "../../services/apiCursos/ApiCursos";
import apiDisciplinas from "../../services/apiDisciplinas/apiDisciplinas";

const CadDisciplina = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();
    const [fases, setFases] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [disciplina, setDisciplina] = useState({
        id: '',
        nome: '',
        cargaHoraria: '',
        codigoCor: '',
        fase: '',
        curso: ''
    });

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const [fasesResponse, cursosResponse] = await Promise.all([
                    apiFases.getFases(),
                    apiCursos.getCursos()
                ]);

                setFases(fasesResponse.data);
                setCursos(cursosResponse.data);
            } catch (error) {
                console.error("Erro ao carregar dados de fases e cursos:", error);
            }
        };

        const carregarDisciplina = async () => {
            if (id) { // Verifica se há um ID na URL
                try {
                    const response = await apiDisciplinas.getDisciplina(id);
                    const dadosDisciplina = response.data;
                    setDisciplina(dadosDisciplina);
                    setValue('nome', dadosDisciplina.nome);
                    setValue('cargaHoraria', dadosDisciplina.cargaHoraria);
                    setValue('codigoCor', dadosDisciplina.codigoCor);
                    setValue('fase', dadosDisciplina.fase.id);
                    setValue('curso', dadosDisciplina.fase.curso.id);
                } catch (error) {
                    console.error("Erro ao carregar dados da disciplina:", error);
                }
            }
        };

        carregarDados();
        carregarDisciplina();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        //codigo necessário para o funcionamento do update e do create
        const faseSelecionada = fases.find(fase => fase.id === parseInt(data.fase));
        const cursoSelecionado = cursos.find(curso => curso.id === parseInt(data.curso));

        const dadosDisciplina = {
            nome: data.nome,
            cargaHoraria:  parseInt(data.cargaHoraria),
            codigoCor: data.codigoCor,
            fase: {
                id: faseSelecionada.id,
                numero: faseSelecionada.numero,
                curso: {
                    id: cursoSelecionado.id,
                    nome: cursoSelecionado.nome,
                    usuarioCoordenador: cursoSelecionado.usuarioCoordenador,
                    qtdeFases: cursoSelecionado.qtdeFases
                }
            }
        };

        try {
            if (disciplina.id) {
                await apiDisciplinas.updateDisciplinas(disciplina.id, dadosDisciplina);
                console.log('Disciplina atualizada com sucesso', dadosDisciplina);
            } else {
                await apiDisciplinas.addDisciplinas(dadosDisciplina);
                console.log('Disciplina cadastrada com sucesso', dadosDisciplina);
            }
            // Atualizar o estado local após a resposta da API
            setDisciplina(dadosDisciplina);
            navigate('/disciplinas');
        } catch (error) {
            console.error('Erro ao salvar disciplina:', error);
        }
    };

    return (
        <div>
            <h2>Cadastro de Disciplina</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="nome">Nome da Disciplina:</label>
                    <input
                        type="text"
                        id="nome"
                        {...register("nome", { required: "O nome da disciplina é obrigatório" })}
                    />
                    {errors.nome && <div>{errors.nome.message}</div>}
                </div>
                <div>
                    <label htmlFor="cargaHoraria">Carga Horária:</label>
                    <input
                        type="number"
                        id="cargaHoraria"
                        {...register("cargaHoraria", { required: "A carga horária é obrigatória" })}
                    />
                    {errors.cargaHoraria && <div>{errors.cargaHoraria.message}</div>}
                </div>
                
                <div>
                    <label htmlFor="codigoCor">Codigo da cor:</label>
                    <input
                        type="text"
                        id="codigoCor"
                        {...register("codigoCor", { required: "A cor que irá aparecer na tabela é obrigatória" })}
                    />
                    {errors.codigoCor && <div>{errors.codigoCor.message}</div>}
                </div>
                
                <div>
                    <label htmlFor="fase">Fase:</label>
                    <select id="fase" {...register("fase", { required: "A fase é obrigatória" })}>
                        <option value="">Selecione uma fase</option>
                        {fases.map((fase) => (
                            <option key={fase.id} value={fase.id}>{fase.numero}</option>
                        ))}
                    </select>
                    {errors.fase && <div>{errors.fase.message}</div>}
                </div>
                <div>
                    <label htmlFor="curso">Curso:</label>
                    <select id="curso" {...register("curso", { required: "O curso é obrigatório" })}>
                        <option value="">Selecione um curso</option>
                        {cursos.map((curso) => (
                            <option key={curso.id} value={curso.id}>{curso.nome}</option>
                        ))}
                    </select>
                    {errors.curso && <div>{errors.curso.message}</div>}
                </div>
                <button type="submit">Cadastrar Disciplina</button>
            </form>
        </div>
    );
}

export default CadDisciplina;
