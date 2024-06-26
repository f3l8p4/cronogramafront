import React, { useState, useEffect } from "react";

const TelaErro = ({ errors }) => {
    const [errorList, setErrorList] = useState([]);

    // Atualiza a lista de erros sempre que 'errors' mudar
    useEffect(() => {
        const newErrors = Object.values(errors).map(error => error.message);
        setErrorList(newErrors);
    }, [errors]);

    return (
        <div className="error-box bg-light p-4 rounded">
            <h4>ERROS</h4>
            <textarea
                className="form-control form-control-lg"
                rows={errorList.length > 4 ? 4 : errorList.length}
                readOnly
                value={errorList.join('\n')}
            />
            <div className="error-count mt-3">
                <p>TOTAL DE ERROS: {errorList.length}</p>
            </div>
        </div>
    );
};

export default TelaErro;