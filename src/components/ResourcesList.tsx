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
                setResources(data.results);
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

                {resources.length === 0 ? (
                    <p className="no-resources">No hay recursos disponibles en este momento.</p>
                ) : (
                    <div className="resources-grid">
                        {resources.map((resource) => (
                            <div key={resource.id} className="resource-card">
                                <div className="resource-type-badge">
                                    {resource.resource_type}
                                </div>
                                <h3>{resource.title}</h3>
                                <p className="resource-description">{resource.description}</p>
                                <div className="resource-footer">
                                    {resource.url && (
                                        <a
                                            href={resource.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="resource-link"
                                        >
                                            Ver Recurso →
                                        </a>
                                    )}
                                    {resource.file && (
                                        <a
                                            href={resource.file}
                                            download
                                            className="resource-link"
                                        >
                                            Descargar →
                                        </a>
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
