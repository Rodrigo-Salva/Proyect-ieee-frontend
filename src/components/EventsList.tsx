import React, { useEffect, useState } from 'react';
import eventsService, { Event } from '../services/events.service';
import './EventsList.css';

const EventsList: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await eventsService.getEvents();
                setEvents(Array.isArray(data) ? data : (data as any).results || []);
            } catch (err: any) {
                setError(err.response?.data?.detail || 'Error al cargar eventos');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return <div className="loading">Cargando eventos...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    // Separar eventos próximos y pasados
    const now = new Date();
    const upcomingEvents = events.filter(event => new Date(event.event_date) >= now);
    const pastEvents = events.filter(event => new Date(event.event_date) < now);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return {
            day: date.getDate(),
            month: date.toLocaleDateString('es-ES', { month: 'short' }),
            year: date.getFullYear(),
            time: date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
        };
    };

    return (
        <div className="events-section">
            <div className="events-header">
                <h2>Próximos Eventos</h2>
                <p>Únete a nuestras actividades y talleres</p>
            </div>

            {upcomingEvents.length === 0 ? (
                <p className="no-events">No hay eventos próximos programados.</p>
            ) : (
                <div className="events-grid">
                    {upcomingEvents.map((event) => {
                        const dateInfo = formatDate(event.event_date);
                        const hasValidImage = event.image && event.image !== 'na' && event.image !== 'null' && event.image.trim() !== '';

                        return (
                            <div key={event.id} className="event-card">
                                {hasValidImage ? (
                                    <div className="event-image">
                                        <img src={event.image} alt={event.title} />
                                        <div className="event-badge">
                                            <span className="badge-day">{dateInfo.day}</span>
                                            <span className="badge-month">{dateInfo.month}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="event-image event-image-placeholder">
                                        <div className="placeholder-content">
                                            <i className="fas fa-calendar-alt"></i>
                                        </div>
                                        <div className="event-badge">
                                            <span className="badge-day">{dateInfo.day}</span>
                                            <span className="badge-month">{dateInfo.month}</span>
                                        </div>
                                    </div>
                                )}
                                <div className="event-content">
                                    <h3>{event.title}</h3>
                                    <p className="event-description">{event.description}</p>
                                    <div className="event-meta">
                                        <span className="event-location">
                                            <i className="fas fa-map-marker-alt"></i> {event.location}
                                        </span>
                                        <span className="event-time">
                                            <i className="fas fa-clock"></i> {dateInfo.time}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {pastEvents.length > 0 && (
                <>
                    <div className="events-header past-events-header">
                        <h3>Eventos Pasados</h3>
                    </div>
                    <div className="events-grid past-events">
                        {pastEvents.slice(0, 3).map((event) => {
                            const dateInfo = formatDate(event.event_date);
                            const hasValidImage = event.image && event.image !== 'na' && event.image !== 'null' && event.image.trim() !== '';

                            return (
                                <div key={event.id} className="event-card past-event">
                                    {hasValidImage ? (
                                        <div className="event-image">
                                            <img src={event.image} alt={event.title} />
                                            <div className="event-badge past-badge">
                                                <span className="badge-day">{dateInfo.day}</span>
                                                <span className="badge-month">{dateInfo.month}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="event-image event-image-placeholder">
                                            <div className="placeholder-content">
                                                <i className="fas fa-calendar-alt"></i>
                                            </div>
                                            <div className="event-badge past-badge">
                                                <span className="badge-day">{dateInfo.day}</span>
                                                <span className="badge-month">{dateInfo.month}</span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="event-content">
                                        <h3>{event.title}</h3>
                                        <p className="event-description">{event.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default EventsList;
