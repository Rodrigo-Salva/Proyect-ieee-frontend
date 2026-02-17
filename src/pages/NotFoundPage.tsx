import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage: React.FC = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <div className="error-code">404</div>
                <h1>Página No Encontrada</h1>
                <p>
                    Lo sentimos, la página que estás buscando no existe o ha sido movida.
                </p>
                <div className="not-found-actions">
                    <Link to="/" className="btn-home">
                        <i className="fas fa-home"></i> Volver al Inicio
                    </Link>
                </div>
            </div>
            <div className="not-found-background">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
            </div>
        </div>
    );
};

export default NotFoundPage;
