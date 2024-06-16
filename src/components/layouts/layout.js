// Layout.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import BackButton from '../buttons/botaoVoltar';

const Layout = ({ children }) => {
    const location = useLocation();

    return (
        <div className="container mt-5">
            {/* Renderiza o botão de "Voltar" em todas as páginas exceto a principal */}
            {location.pathname !== '/' && <BackButton />}
            {children}
        </div>
    );
};

export default Layout;
