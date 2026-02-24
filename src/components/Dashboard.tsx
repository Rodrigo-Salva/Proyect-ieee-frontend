import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService, { DashboardData } from '../services/auth.service';
import contentService, { Event, Resource } from '../services/content.service';
import './Dashboard.css';

const DashboardSkeleton: React.FC = () => (
    <div className="dashboard-skeleton">
        <div className="skeleton-hero"></div>
        <div className="skeleton-grid">
            <div className="skeleton-section large"></div>
            <div className="skeleton-section small"></div>
        </div>
    </div>
);

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const dashboardData = await authService.getDashboard();
                setData(dashboardData);
            } catch (err) {
                console.error('Failed to fetch dashboard data', err);
                setError('No se pudo cargar la información del dashboard.');
            } finally {
                // Add a small artificial delay for smoother skeleton transition
                setTimeout(() => setLoading(false), 800);
            }
        };

        fetchDashboardData();
    }, []);

    const handleToggleInterest = async (eventId: number) => {
        try {
            const result = await contentService.toggleEventInterest(eventId);
            if (data) {
                const updatedEvents = data.upcoming_events.map(event => {
                    if (event.id === eventId) {
                        return {
                            ...event,
                            is_interested: result.is_interested,
                            interest_count: result.interest_count
                        };
                    }
                    return event;
                });
                setData({ ...data, upcoming_events: updatedEvents });
            }
        } catch (err) {
            console.error('Failed to toggle event interest', err);
        }
    };

    if (loading) return <DashboardSkeleton />;

    if (error) {
        return (
            <div className="dashboard-error">
                <div className="error-card">
                    <h2>¡Oops!</h2>
                    <p>{error}</p>
                    <button className="btn-retry" onClick={() => window.location.reload()}>Reintentar</button>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            {/* Hero Section */}
            <header className="dashboard-hero">
                <div className="hero-content">
                    <div className="hero-main">
                        <div className="user-persona">
                            {(user?.avatar_url || user?.avatar) ? (
                                <img src={user.avatar_url || user.avatar} alt="Avatar" className="hero-avatar" />
                            ) : (
                                <div className="hero-avatar-placeholder">
                                    {user?.first_name?.charAt(0) || user?.username.charAt(0)}
                                </div>
                            )}
                            <div className="welcome-text">
                                <h1>Hola, {user?.first_name || user?.username} <span className="wave">👋</span></h1>
                                <p className="hero-subtitle">Panel de Control IEEE • {data?.membership_status}</p>
                            </div>
                        </div>
                        <div className="hero-badges">
                            <span className="badge chapter-badge">
                                {user?.interested_chapters?.[0]?.name || 'Miembro IEEE'}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="dashboard-main-grid">
                <section className="dashboard-section main-section">
                    <div className="section-header">
                        <div className="header-title">
                            <span className="header-icon">📅</span>
                            <h2>Eventos Próximos</h2>
                        </div>
                        <Link to="/events" className="view-all-link">Explorar más →</Link>
                    </div>

                    <div className="events-scroll-grid">
                        {data?.upcoming_events && data.upcoming_events.length > 0 ? (
                            data.upcoming_events.map((event: Event) => (
                                <div key={event.id} className="premium-card event-card">
                                    <div
                                        className="card-banner"
                                        style={{ backgroundImage: `url(${event.image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'})` }}
                                    >
                                        <div className="card-glass-tag">
                                            {new Date(event.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="card-meta">
                                            <span className="event-location-text">📍 {event.location}</span>
                                        </div>
                                        <h3>{event.title}</h3>
                                        <button
                                            className={`interest-action-btn ${event.is_interested ? 'active' : ''}`}
                                            onClick={() => handleToggleInterest(event.id)}
                                        >
                                            <span className="btn-icon">{event.is_interested ? '⭐' : '☆'}</span>
                                            {event.is_interested ? 'Siguiendo' : 'Me interesa'}
                                            <span className="interest-counter">{event.interest_count}</span>
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state-card">
                                <p>No hay eventos programados cerca de ti.</p>
                            </div>
                        )}
                    </div>
                </section>

                <aside className="dashboard-sidebar">
                    <div className="section-header">
                        <div className="header-title">
                            <span className="header-icon">📚</span>
                            <h2>Recursos</h2>
                        </div>
                    </div>

                    <div className="resources-stack">
                        {data?.recommended_resources && data.recommended_resources.length > 0 ? (
                            data.recommended_resources.map((resource: Resource) => (
                                <div key={resource.id} className="premium-resource-card">
                                    <div className="resource-pill">
                                        <span className="pill-icon">📄</span>
                                        <div className="pill-content">
                                            <h4>{resource.title}</h4>
                                            <span className="pill-tag">{resource.category}</span>
                                        </div>
                                    </div>
                                    <a href={resource.file_url || resource.link_url} className="action-circle-btn" target="_blank" rel="noopener noreferrer">
                                        →
                                    </a>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state-sidebar">
                                <p>Explora la biblioteca para ver recursos.</p>
                                <Link to="/resources" className="btn-simple">Ir a biblioteca</Link>
                            </div>
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Dashboard;
