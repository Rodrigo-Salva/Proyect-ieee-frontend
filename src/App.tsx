import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import CompleteProfile from './components/CompleteProfile';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import TeamPage from './pages/TeamPage';
import NewsPage from './pages/NewsPage';
import ResourcesPage from './pages/ResourcesPage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import NotFoundPage from './pages/NotFoundPage';

function Navigation() {
    const { isAuthenticated, user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="logo" onClick={closeMenu}>
                    IEEE TECSUP
                </Link>

                <div className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>

                <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/about" onClick={closeMenu}>Nosotros</Link>
                    <Link to="/events" onClick={closeMenu}>Eventos</Link>
                    <Link to="/team" onClick={closeMenu}>Equipo</Link>
                    <Link to="/news" onClick={closeMenu}>Noticias</Link>
                    <Link to="/resources" onClick={closeMenu}>Recursos</Link>
                    <Link to="/contact" onClick={closeMenu}>Contacto</Link>
                    {isAuthenticated ? (
                        <div className="user-group">
                            <Link to="/profile" className="user-profile-link" onClick={closeMenu}>
                                {(user?.avatar_url || user?.avatar) && (
                                    <img src={user.avatar_url || user.avatar} alt="Avatar" className="nav-avatar" />
                                )}
                                <span className="user-info">Hola, {user?.first_name || user?.username}</span>
                            </Link>
                            <button onClick={() => { logout(); closeMenu(); }}>
                                Cerrar Sesión
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn-login" onClick={closeMenu}>
                            Iniciar Sesión
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

const HomePage = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="home">
            <div className="sphere sphere-1"></div>
            <div className="sphere sphere-2"></div>
            <div className="sphere sphere-3"></div>

            <div className="home-content">
                <h1>
                    Organización Estudiantil<br />
                    <span className="gradient-text">IEEE TECSUP</span>
                </h1>
                <p>
                    Formando líderes para transformar el futuro a través de excelencia
                    académica, desarrollo profesional e impacto social.
                </p>

                {isAuthenticated ? (
                    <div className="home-buttons">
                        <Link to="/protected" className="btn btn-primary">
                            Ver Contenido Protegido
                        </Link>
                        <Link to="/about" className="btn btn-secondary">
                            Descubre Más
                        </Link>
                    </div>
                ) : (
                    <div className="home-buttons">
                        <Link to="/login" className="btn btn-primary">
                            Iniciar Sesión
                        </Link>
                        <Link to="/about" className="btn btn-secondary">
                            Descubre Más
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

const ProtectedPage = () => {
    return (
        <div className="protected-page">
            <div className="protected-page-content">
                <h2>Contenido Protegido</h2>
                <p>
                    ¡Bienvenido! Has accedido exitosamente al área protegida.
                    Aquí podrás encontrar recursos exclusivos para miembros de IEEE TECSUP.
                </p>
                <div className="protected-links">
                    <Link to="/news" className="btn btn-secondary">
                        Ver Noticias
                    </Link>
                    <Link to="/events" className="btn btn-secondary">
                        Ver Eventos
                    </Link>
                </div>
            </div>
        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app">
                    <Navigation />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/events" element={<EventsPage />} />
                        <Route path="/team" element={<TeamPage />} />
                        <Route path="/news" element={<NewsPage />} />
                        <Route path="/resources" element={<ResourcesPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/complete-profile" element={<CompleteProfile />} />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <CompleteProfile />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/protected"
                            element={
                                <ProtectedRoute>
                                    <ProtectedPage />
                                </ProtectedRoute>
                            }
                        />
                        {/* Catch-all route for 404 */}
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
