import React, { useEffect, useState } from 'react';
import contentService, { News } from '../services/content.service';
import './NewsList.css';

const NewsList: React.FC = () => {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await contentService.getNews();
                // La API devuelve un objeto paginado con { results: [...] }
                setNews(Array.isArray(data) ? data : (data as any).results || []);
            } catch (err: any) {
                setError(err.response?.data?.detail || 'Failed to load news');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return <div className="loading">Cargando noticias...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return {
            day: date.getDate(),
            month: date.toLocaleDateString('es-ES', { month: 'short' }),
            full: date.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
        };
    };

    return (
        <div className="news-section">
            <div className="news-header">
                <h2>Últimas Noticias</h2>
                <p>Mantente informado sobre las actividades de IEEE TECSUP</p>
            </div>
            {news.length === 0 ? (
                <p className="no-news">No hay noticias disponibles.</p>
            ) : (
                <div className="news-grid">
                    {news.map((item) => {
                        const dateInfo = formatDate(item.created_at);
                        const hasValidImage = item.image && item.image !== 'na' && item.image !== 'null' && item.image.trim() !== '';

                        return (
                            <div key={item.id} className="news-card">
                                {hasValidImage ? (
                                    <div className="news-image">
                                        <img src={item.image} alt={item.title} />
                                        {item.category && (
                                            <div className="news-category">{item.category}</div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="news-image news-image-placeholder">
                                        <div className="placeholder-content">
                                            <i className="fas fa-newspaper"></i>
                                        </div>
                                        {item.category && (
                                            <div className="news-category">{item.category}</div>
                                        )}
                                    </div>
                                )}
                                <div className="news-content">
                                    <h3>{item.title}</h3>
                                    <p className="news-text">{item.content}</p>
                                    <div className="news-footer">
                                        <span className="news-date">
                                            <i className="fas fa-calendar-alt"></i> {dateInfo.full}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default NewsList;

