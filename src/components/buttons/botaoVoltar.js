// BackButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

    const buttonStyle = {
        position: 'fixed',
        top: '70px',
        left: '20px',
        zIndex: 1000, // Certifique-se de que o botão esteja acima de outros elementos
    };

    return (
        <button onClick={() => navigate(-1)} className="btn btn-secondary" style={buttonStyle}>
            Voltar
        </button>
    );
};

export default BackButton;
