import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import organizationService, { Chapter } from '../services/organization.service';
import './CompleteProfile.css';

const CompleteProfile: React.FC = () => {
    const { updateProfile, user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const isEditing = location.pathname === '/profile';

    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [formData, setFormData] = useState({
        phone: user?.phone || '',
        biography: user?.biography || '',
        ieee_id: user?.ieee_id || '',
        interested_chapters: user?.interested_chapters || [] as number[],
    });
    const [avatar, setAvatar] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatar || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const data = await organizationService.getChapters();
                if (Array.isArray(data)) {
                    setChapters(data);
                } else {
                    console.error('Chapters data is not an array:', data);
                    setChapters([]);
                }
            } catch (err) {
                console.error('Failed to fetch chapters', err);
                setChapters([]);
            }
        };
        fetchChapters();
    }, []);

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                phone: user.phone || prev.phone,
                biography: user.biography || prev.biography,
                ieee_id: user.ieee_id || prev.ieee_id,
                interested_chapters: user.interested_chapters || prev.interested_chapters,
            }));
            if (!avatarPreview && user.avatar) {
                setAvatarPreview(user.avatar);
            }
        }
    }, [user, avatarPreview]);

    // Redirect if not authenticated (extra safety)
    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
        }
    }, [user, authLoading, navigate]);

    if (authLoading || loading || (!user && !error)) {
        return <div className="onboarding-container"><div className="loading-spinner">Cargando...</div></div>;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleChapterToggle = (id: number) => {
        setFormData(prev => {
            const current = prev.interested_chapters;
            if (current.includes(id)) {
                return { ...prev, interested_chapters: current.filter(c => c !== id) };
            } else {
                return { ...prev, interested_chapters: [...current, id] };
            }
        });
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAvatar(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const data = new FormData();
        data.append('phone', formData.phone);
        data.append('biography', formData.biography);
        data.append('ieee_id', formData.ieee_id);
        if (avatar) {
            data.append('avatar', avatar);
        }

        // Remove existing chapters and add new ones
        formData.interested_chapters.forEach(id => {
            data.append('interested_chapters', id.toString());
        });

        try {
            await updateProfile(data);
            if (isEditing) {
                alert('Perfil actualizado con éxito');
            } else {
                navigate('/');
            }
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Error al actualizar el perfil. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="onboarding-container">
            <div className="onboarding-card">
                <h2>{isEditing ? 'Mi Perfil' : `¡Bienvenido, ${user?.username}!`}</h2>
                <p className="onboarding-subtitle">
                    {isEditing
                        ? 'Mantén tu información actualizada para la comunidad'
                        : 'Completa tu perfil para aprovechar al máximo IEEE TECSUP'}
                </p>

                <form onSubmit={handleSubmit} className="onboarding-form">
                    {error && <div className="error-message">{error}</div>}

                    <div className="avatar-upload-section">
                        <div
                            className="avatar-preview"
                            onClick={() => fileInputRef.current?.click()}
                            style={{ backgroundImage: avatarPreview ? `url(${avatarPreview})` : 'none' }}
                        >
                            {!avatarPreview && <span className="upload-icon">📷</span>}
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleAvatarChange}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                        <p className="upload-label">{isEditing ? 'Cambiar foto de perfil' : 'Sube tu foto de perfil'}</p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="ieee_id">IEEE ID (Opcional)</label>
                        <input
                            id="ieee_id"
                            type="text"
                            placeholder="Tu ID de miembro IEEE"
                            value={formData.ieee_id}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Teléfono</label>
                        <input
                            id="phone"
                            type="text"
                            placeholder="+51 999 999 999"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="biography">Biografía</label>
                        <textarea
                            id="biography"
                            placeholder="Cuéntanos un poco sobre ti..."
                            value={formData.biography}
                            onChange={handleChange}
                            disabled={loading}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label>Capítulos de Interés</label>
                        <div className="chapters-grid">
                            {chapters.length > 0 ? (
                                chapters.map(chapter => (
                                    <div
                                        key={chapter.id}
                                        className={`chapter-tag ${formData.interested_chapters.includes(chapter.id) ? 'active' : ''}`}
                                        onClick={() => handleChapterToggle(chapter.id)}
                                    >
                                        {chapter.name}
                                    </div>
                                ))
                            ) : (
                                <p className="no-chapters">No hay capítulos disponibles.</p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="onboarding-button"
                        disabled={loading}
                    >
                        {loading ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Completar Perfil')}
                    </button>

                    <button
                        type="button"
                        className="skip-button"
                        onClick={() => navigate('/')}
                        disabled={loading}
                    >
                        {isEditing ? 'Volver' : 'Saltar por ahora'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CompleteProfile;
