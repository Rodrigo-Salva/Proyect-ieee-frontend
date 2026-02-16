import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import socialService, { SocialLink } from '../services/social.service';
import './Footer.css';

const Footer: React.FC = () => {
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
    const [loadingSocial, setLoadingSocial] = useState(true);

    // Fallback social links con iconos Font Awesome
    const defaultSocialLinks = [
        { id: 1, platform: 'Facebook', url: 'https://facebook.com', icon: 'fab fa-facebook-f' },
        { id: 2, platform: 'Instagram', url: 'https://instagram.com', icon: 'fab fa-instagram' },
        { id: 3, platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'fab fa-linkedin-in' },
        { id: 4, platform: 'Twitter', url: 'https://twitter.com', icon: 'fab fa-twitter' }
    ];

    useEffect(() => {
        const fetchSocialLinks = async () => {
            try {
                const links = await socialService.getSocialLinks();
                if (links && links.length > 0) {
                    setSocialLinks(links);
                } else {
                    setSocialLinks(defaultSocialLinks);
                }
            } catch (error) {
                console.error('Error fetching social links, using defaults:', error);
                setSocialLinks(defaultSocialLinks);
            } finally {
                setLoadingSocial(false);
            }
        };

        fetchSocialLinks();
    }, []);

    const getSocialIcon = (platform: string): string => {
        const icons: { [key: string]: string } = {
            'facebook': 'fab fa-facebook-f',
            'instagram': 'fab fa-instagram',
            'linkedin': 'fab fa-linkedin-in',
            'twitter': 'fab fa-twitter',
            'youtube': 'fab fa-youtube',
            'github': 'fab fa-github',
            'tiktok': 'fab fa-tiktok',
            'whatsapp': 'fab fa-whatsapp'
        };
        return icons[platform.toLowerCase()] || 'fas fa-link';
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3 className="footer-logo">IEEE TECSUP</h3>
                    <p className="footer-description">
                        Formando líderes para transformar el futuro a través de
                        excelencia académica y desarrollo profesional.
                    </p>
                </div>

                <div className="footer-section">
                    <h4>Enlaces Rápidos</h4>
                    <ul className="footer-links">
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/about">Nosotros</Link></li>
                        <li><Link to="/events">Eventos</Link></li>
                        <li><Link to="/news">Noticias</Link></li>
                        <li><Link to="/resources">Recursos</Link></li>
                        <li><Link to="/contact">Contacto</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Contacto</h4>
                    <ul className="footer-contact">
                        <li><i className="fas fa-envelope"></i> ieee@tecsup.edu.pe</li>
                        <li><i className="fas fa-map-marker-alt"></i> Tecsup - Arequipa, Perú</li>
                        <li><i className="fas fa-phone"></i> +51 XXX XXX XXX</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Síguenos</h4>
                    <div className="social-links">
                        {loadingSocial ? (
                            <p className="loading-social">Cargando...</p>
                        ) : (
                            socialLinks.map((link) => (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    title={link.platform}
                                >
                                    <i className={link.icon || getSocialIcon(link.platform)}></i>
                                </a>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2024 IEEE TECSUP. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
