import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
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
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import NotFoundPage from './pages/NotFoundPage';

function Navigation() {
    const { isAuthenticated, user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    // Close menus on navigation
    useEffect(() => {
        setIsMenuOpen(false);
        setIsProfileMenuOpen(false);
    }, [location.pathname]);

    // Close profile menu on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setIsProfileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (isProfileMenuOpen) setIsProfileMenuOpen(false);
    };
    const closeMenu = () => {
        setIsMenuOpen(false);
        setIsProfileMenuOpen(false);
    };
    const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);


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

                <div className={`nav-content ${isMenuOpen ? 'active' : ''}`}>
                    <div className="nav-menu">
                        <Link to="/about" onClick={closeMenu}>Nosotros</Link>
                        <Link to="/events" onClick={closeMenu}>Eventos</Link>
                        <Link to="/team" onClick={closeMenu}>Equipo</Link>
                        <Link to="/news" onClick={closeMenu}>Noticias</Link>
                        <Link to="/resources" onClick={closeMenu}>Recursos</Link>
                        <Link to="/contact" onClick={closeMenu}>Contacto</Link>
                    </div>

                    <div className="nav-actions">
                        {isAuthenticated ? (
                            <div className="user-dropdown-container" ref={profileMenuRef}>
                                <div className="user-dropdown-trigger" onClick={toggleProfileMenu}>
                                    {(user?.avatar_url || user?.avatar) ? (
                                        <img src={user.avatar_url || user.avatar} alt="Avatar" className="nav-avatar" />
                                    ) : (
                                        <div className="nav-avatar-placeholder">
                                            {user?.first_name?.charAt(0) || user?.username.charAt(0)}
                                        </div>
                                    )}
                                    <span className="user-info">Hola, {user?.first_name || user?.username}</span>
                                    <span className={`arrow ${isProfileMenuOpen ? 'up' : 'down'}`}>▾</span>
                                </div>

                                {isProfileMenuOpen && (
                                    <div className="user-dropdown-menu">
                                        <div className="dropdown-profile">
                                            {(user?.avatar_url || user?.avatar) ? (
                                                <img src={user.avatar_url || user.avatar} alt="Avatar" className="profile-large-avatar" />
                                            ) : (
                                                <div className="profile-avatar-placeholder">
                                                    {user?.first_name?.charAt(0) || user?.username.charAt(0)}
                                                </div>
                                            )}
                                            <div className="profile-info-text">
                                                <p className="full-name">{user?.first_name} {user?.last_name || user?.username}</p>
                                                <p className="username">@{user?.username || 'user'}</p>
                                            </div>
                                        </div>

                                        <div className="dropdown-items-container">
                                            <Link to="/profile" className="dropdown-item">
                                                <i className="fas fa-cog icon"></i> <span>Ajustes de Cuenta</span>
                                            </Link>
                                            <Link to="/dashboard" className="dropdown-item active">
                                                <i className="fas fa-th-large icon"></i> <span>Dashboard</span>
                                            </Link>
                                        </div>

                                        <button onClick={logout} className="logout-footer-btn">
                                            <i className="fas fa-power-off"></i> Cerrar Sesión
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="btn-login" onClick={closeMenu}>
                                Iniciar Sesión
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

const HomePage = () => {

    /* if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    } */

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

                <div className="home-buttons">
                    <Link to="/login" className="btn btn-primary">
                        Iniciar Sesión
                    </Link>
                    <Link to="/about" className="btn btn-secondary">
                        Descubre Más
                    </Link>
                </div>
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
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
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
