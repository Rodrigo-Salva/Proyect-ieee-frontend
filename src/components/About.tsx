import React from 'react';
import './About.css';

const About: React.FC = () => {
    return (
        <section id="about" className="about-section">
            <div className="about-container">
                <div className="about-header">
                    <h2>¿Quiénes Somos?</h2>
                    <p className="about-subtitle">
                        Conoce más sobre nuestra organización estudiantil
                    </p>
                </div>

                <div className="about-content">
                    <div className="about-card">
                        <div className="card-icon">🎯</div>
                        <h3>Nuestra Misión</h3>
                        <p>
                            Potenciar el desarrollo integral de los estudiantes universitarios
                            a través de programas innovadores, actividades formativas y
                            oportunidades de crecimiento personal y profesional.
                        </p>
                    </div>

                    <div className="about-card">
                        <div className="card-icon">🚀</div>
                        <h3>Nuestra Visión</h3>
                        <p>
                            Ser la organización estudiantil líder en excelencia académica,
                            promoviendo la igualdad de género, facilitando el desarrollo
                            profesional y generando impacto social positivo.
                        </p>
                    </div>

                    <div className="about-card">
                        <div className="card-icon">💡</div>
                        <h3>Nuestros Valores</h3>
                        <p>
                            Cultivamos habilidades de liderazgo, fomentamos la excelencia
                            académica, promovemos la igualdad de género y fortalecemos
                            nuestra comunidad estudiantil.
                        </p>
                    </div>
                </div>

                <div className="stats-section">
                    <div className="stat-card">
                        <div className="stat-number">150+</div>
                        <div className="stat-label">Miembros Activos</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">50+</div>
                        <div className="stat-label">Eventos Anuales</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">10+</div>
                        <div className="stat-label">Años de Historia</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">5</div>
                        <div className="stat-label">Capítulos Técnicos</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
