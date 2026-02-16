import React, { useEffect, useState } from 'react';
import membersService, { Member } from '../services/members.service';
import './TeamMembers.css';

const TeamMembers: React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const data = await membersService.getMembers();
                setMembers(Array.isArray(data) ? data : (data as any).results || []);
            } catch (err: any) {
                setError(err.response?.data?.detail || 'Error al cargar miembros');
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    if (loading) {
        return <div className="loading">Cargando equipo...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <section id="team" className="team-section">
            <div className="team-container">
                <div className="team-header">
                    <h2>Nuestro Equipo</h2>
                    <p>Conoce a los líderes que hacen posible nuestra misión</p>
                </div>

                {members.length === 0 ? (
                    <p className="no-members">No hay miembros registrados.</p>
                ) : (
                    <div className="team-grid">
                        {members.filter(m => m.is_active).map((member) => (
                            <div key={member.id} className="member-card">
                                <div className="member-avatar">
                                    {member.photo_url ? (
                                        <img src={member.photo_url} alt={`Member ${member.id}`} />
                                    ) : (
                                        <div className="avatar-placeholder">
                                            👤
                                        </div>
                                    )}
                                </div>
                                <div className="member-info">
                                    <h3>Miembro #{member.id}</h3>
                                    <p className="member-position">{member.position}</p>
                                    {member.bio && (
                                        <p className="member-bio">{member.bio}</p>
                                    )}
                                    <p className="member-date">
                                        Desde {new Date(member.join_date).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'long'
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TeamMembers;
