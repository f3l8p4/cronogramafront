import React from "react";
import LOGO from '../imgs/LOGO.png'
const Home = () =>{
    return(
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <img 
                src={LOGO} 
                alt="Logo do Site" 
                className="img-fluid mb-4"
                style={{ maxWidth: '500px' }} // Ajuste o tamanho conforme necessário
            />
            <button className="btn btn-primary btn-lg"> GERAR CRONOGRAMA </button>
        </div>
    )
}

export default Home;