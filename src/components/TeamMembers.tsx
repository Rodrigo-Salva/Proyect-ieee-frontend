import React, { useEffect, useState } from 'react';
import membersService, { Branch, Member } from '../services/members.service';
import './TeamMembers.css';

const TeamMembers: React.FC = () => {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                // Now we fetch branches to get the hierarchy
                const data = await membersService.getBranches();
                setBranches(Array.isArray(data) ? data : (data as any).results || []);
            } catch (err: any) {
                console.error(err);
                setError('Error al cargar el equipo.');
            } finally {
                setLoading(false);
            }
        };

        fetchTeam();
    }, []);

    if (loading) return <div className="loading">Cargando equipo...</div>;
    if (error) return <div className="error">{error}</div>;

    const renderMemberCard = (member: Member) => (
        <div key={member.id} className="member-card">
            <div className="member-avatar">
                {member.photo_url ? (
                    <img src={member.photo_url} alt={member.full_name} />
                ) : (
                    <div className="avatar-placeholder">👤</div>
                )}
            </div>
            <div className="member-info">
                <h3>{member.full_name}</h3>
                <p className="member-position">{member.position}</p>
                {member.bio && <p className="member-bio">{member.bio}</p>}
            </div>
        </div>
    );

    const renderTeamGroup = (title: string, description: string, members: Member[]) => (
        <div className="team-group">
            <div className="group-header">
                <h3 className="group-title">{title}</h3>
                {description && <p className="group-desc">{description}</p>}
            </div>

            {members && members.length > 0 ? (
                <div className="team-grid">
                    {members.filter(m => m.is_active).map(renderMemberCard)}
                </div>
            ) : (
                <p className="empty-section">Próximamente nuevos miembros.</p>
            )}
        </div>
    );

    return (
        <section id="team" className="team-section">
            <div className="team-container">
                <div className="team-header">
                    <h2>Nuestro Equipo</h2>
                    <p>Líderes que impulsan la innovación en IEEE</p>
                </div>

                {branches.length === 0 ? (
                    <p className="no-members">No hay información de ramas disponible.</p>
                ) : (
                    branches.map((branch) => (
                        <div key={branch.id} className="branch-wrapper">
                            <h2 className="branch-main-title">{branch.name}</h2>

                            {renderTeamGroup("Directiva", branch.description, branch.members)}

                            {branch.chapters && branch.chapters.map(chapter => (
                                <div key={chapter.id}>
                                    {renderTeamGroup(chapter.name, chapter.description, chapter.members)}
                                </div>
                            ))}
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default TeamMembers;
