import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Register.css';

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: '',
        password_confirm: ''
    });
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.password_confirm) {
            setError({ password_confirm: ['Las contraseñas no coinciden'] });
            return;
        }

        setLoading(true);

        try {
            await register(formData);
            navigate('/complete-profile');
        } catch (err: any) {
            setError(err.response?.data || 'Error en el registro. Por favor, intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const renderError = (field: string) => {
        if (error && typeof error === 'object' && error[field]) {
            return <span className="field-error">{error[field][0]}</span>;
        }
        return null;
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Crear Cuenta</h2>
                <p className="register-subtitle">Únete a la comunidad IEEE TECSUP</p>

                <form onSubmit={handleSubmit} className="register-form">
                    {typeof error === 'string' && <div className="error-message">{error}</div>}

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="first_name">Nombre</label>
                            <input
                                id="first_name"
                                type="text"
                                placeholder="Tu nombre"
                                value={formData.first_name}
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />
                            {renderError('first_name')}
                        </div>
                        <div className="form-group">
                            <label htmlFor="last_name">Apellido</label>
                            <input
                                id="last_name"
                                type="text"
                                placeholder="Tu apellido"
                                value={formData.last_name}
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />
                            {renderError('last_name')}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="ejemplo@correo.com"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                        {renderError('email')}
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Usuario</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Crea un nombre de usuario"
                            value={formData.username}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                        {renderError('username')}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Crea una contraseña"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                        {renderError('password')}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password_confirm">Confirmar Contraseña</label>
                        <input
                            id="password_confirm"
                            type="password"
                            placeholder="Repite tu contraseña"
                            value={formData.password_confirm}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                        {renderError('password_confirm')}
                    </div>

                    <button
                        type="submit"
                        className="register-button"
                        disabled={loading}
                    >
                        {loading ? 'Creando cuenta...' : 'Registrarse'}
                    </button>
                </form>

                <div className="login-link">
                    ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
                </div>

                <div className="back-link">
                    <Link to="/">Volver al inicio</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
