import React, { useEffect, useState } from 'react';
import resourcesService, { Resource } from '../services/resources.service';
import './ResourcesList.css';

const ResourcesList: React.FC = () => {
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                setLoading(true);
                const data = await resourcesService.getResources();
                setResources(data);
                setError(null);
            } catch (err) {
                setError('Error al cargar los recursos educativos');
                console.error('Error fetching resources:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchResources();
    }, []);

    if (loading) {
        return (
            <div className="resources-section">
                <div className="resources-container">
                    <p className="loading-message">Cargando recursos...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="resources-section">
                <div className="resources-container">
                    <p className="error-message">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="resources-section">
            <div className="resources-container">
                <div className="resources-header">
                    <h2>Recursos Educativos</h2>
                    <p className="resources-subtitle">
                        Materiales y herramientas para tu desarrollo profesional
                    </p>
                </div>

                {loading ? (
                    <div className="resources-loading">
                        <div className="spinner"></div>
                        <p>Cargando recursos...</p>
                    </div>
                ) : error ? (
                    <div className="resources-empty">
                        <div className="empty-icon">🚧</div>
                        <h3>Sección en Construcción</h3>
                        <p>Estamos trabajando para traerte los mejores recursos educativos.</p>
                        <p className="error-detail-text">Detalle: {error}</p>
                    </div>
                ) : resources.length === 0 ? (
                    <div className="resources-empty">
                        <div className="empty-icon">📚</div>
                        <h3>No hay recursos disponibles</h3>
                        <p>Aún no hemos subido contenido a esta sección. ¡Vuelve pronto!</p>
                    </div>
                ) : (
                    <div className="resources-grid">
                        {resources.map((resource) => (
                            <div key={resource.id} className="resource-card">
                                <div className="resource-type-badge">
                                    {resource.category}
                                </div>
                                <h3>{resource.title}</h3>
                                <p className="resource-description">{resource.description}</p>
                                <div className="resource-footer">
                                    {resource.file_url ? (
                                        <a
                                            href={resource.file_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="resource-link"
                                        >
                                            Ver Recurso →
                                        </a>
                                    ) : (
                                        <span className="resource-unavailable">No disponible</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResourcesList;
