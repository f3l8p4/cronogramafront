import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import apiFases from "../../services/apiFases/apiFases";
import apiCursos from "../../services/apiCursos/ApiCursos";
import apiDisciplinas from "../../services/apiDisciplinas/apiDisciplinas";
import ModalCadastros from "../modals/ModalCadastros";

const CadDisciplina = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();
    const [fases, setFases] = useState([]);
    const [cursos, setCursos] = useState([]);
    
    //Funcionamentos dos modal
        const [showModal, setShowModal] = useState(false);
        const [modalMessage, setModalMessage] = useState('');
        const [success, setSuccess] = useState(false);
    //
    
    const [disciplina, setDisciplina] = useState({
        id: '',
        nome: '',
        cargaHoraria: '',
        codigoCor: '#000000',
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
                await apiDisciplinas.updateDisciplinas(disciplina.id, dadosDisciplina)
                setSuccess(true)
                setModalMessage('Disciplina atualizada com sucesso')
            } else {
                await apiDisciplinas.addDisciplinas(dadosDisciplina)
                setSuccess(true)
                setModalMessage('Disciplina registrada com sucesso')
            }
        } catch (error) {
            setSuccess(false)
            setModalMessage('Houve um erro ao salvar a disciplina', error)        
        }
        setShowModal(true)
    };
    
    const handleCloseModal = () => {
        setShowModal(false);
        if (success) {
            navigate('/disciplinas');
        }
    };

    return (
        <div className="">
            <h2>Cadastro de Disciplina</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" noValidate>
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome da Disciplina:</label>
                    <input
                        type="text"
                        id="nome"
                        className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
                        {...register("nome", { required: "O nome da disciplina é obrigatório" })}
                    />
                    {errors.nome && <div className="invalid-feedback">{errors.nome.message}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="cargaHoraria" className="form-label">Carga Horária:</label>
                    <input
                        type="number"
                        id="cargaHoraria"
                        className={`form-control ${errors.cargaHoraria ? 'is-invalid' : ''}`}
                        {...register("cargaHoraria", { required: "A carga horária é obrigatória" })}
                    />
                    {errors.cargaHoraria && <div className="invalid-feedback">{errors.cargaHoraria.message}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="codigoCor" className="form-label">Código da cor:</label>
                    <input
                        type="color"
                        id="codigoCor"
                        className={`form-control form-control-color ${errors.codigoCor ? 'is-invalid' : ''}`}
                        {...register("codigoCor", { required: "A cor que irá aparecer na tabela é obrigatória" })}
                    />
                    {errors.codigoCor && <div className="invalid-feedback">{errors.codigoCor.message}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="fase" className="form-label">Fase:</label>
                    <select 
                        id="fase" 
                        className={`form-select ${errors.fase ? 'is-invalid' : ''}`}
                        {...register("fase", { required: "A fase é obrigatória" })}
                    >
                        <option value="">Selecione uma fase</option>
                        {fases.map((fase) => (
                            <option key={fase.id} value={fase.id}>{fase.numero}</option>
                        ))}
                    </select>
                    {errors.fase && <div className="invalid-feedback">{errors.fase.message}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="curso" className="form-label">Curso:</label>
                    <select 
                        id="curso" 
                        className={`form-select ${errors.curso ? 'is-invalid' : ''}`}
                        {...register("curso", { required: "O curso é obrigatório" })}
                    >
                        <option value="">Selecione um curso</option>
                        {cursos.map((curso) => (
                            <option key={curso.id} value={curso.id}>{curso.nome}</option>
                        ))}
                    </select>
                    {errors.curso && <div className="invalid-feedback">{errors.curso.message}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Cadastrar Disciplina</button>
            </form>
            <ModalCadastros show={showModal} handleClose={handleCloseModal} message={modalMessage} success={success} />
        </div>
    );
}

export default CadDisciplina;
