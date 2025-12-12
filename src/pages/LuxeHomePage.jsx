import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { articleService } from '../services/articleService';
import { directoryService } from '../services/directoryService';
import '../styles/luxe-homepage.css';
import 'leaflet/dist/leaflet.css';
import redMarkerIcon from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet marker icon
const customIcon = new L.Icon({
    iconUrl: redMarkerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// SVG Icons
const Icons = {
    Star: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
    ),
    MapPin: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    ),
    Clock: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    ),
    ArrowRight: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
        </svg>
    ),
    Sparkles: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3v18M5.5 8.5l13 7M5.5 15.5l13-7" />
        </svg>
    ),
    Compass: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
    ),
    Heart: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
    ),
    Users: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),
    Globe: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    ),
    Instagram: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
    ),
    Twitter: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
        </svg>
    ),
    Mail: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
        </svg>
    ),
};

// Features data
const features = [
    {
        icon: <Icons.Compass />,
        title: 'Discover Sacred Sites',
        description: 'Explore historic religious landmarks and spiritual destinations across Medan with expertly curated guides.',
    },
    {
        icon: <Icons.Heart />,
        title: 'Meaningful Journeys',
        description: 'Experience the deep cultural and spiritual significance behind each destination on your personalized itinerary.',
    },
    {
        icon: <Icons.Users />,
        title: 'Community Connect',
        description: 'Join fellow travelers, share experiences, and build lasting connections through our vibrant community.',
    },
];

// Luxe Navbar Component
const LuxeNavbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when clicking a link
    const handleLinkClick = () => {
        setMobileMenuOpen(false);
    };

    return (
        <>
            <nav className={`luxe-navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="luxe-container luxe-navbar-inner">
                    <Link to="/" className="luxe-navbar-logo">
                        <img src="/images/luminara_logo.png" alt="Luminara" />
                        <span className="luxe-navbar-logo-text">LUMINARA</span>
                    </Link>

                    <ul className="luxe-navbar-links">
                        <li><Link to="/directory">Directory</Link></li>
                        <li><Link to="/itinerary">Itinerary</Link></li>
                        <li><Link to="/guide">Guide</Link></li>
                        <li><Link to="/community">Community</Link></li>
                        <li><Link to="/chatbot">AI Assistant</Link></li>
                    </ul>

                    <div className="luxe-navbar-actions">
                        <Link to="/signin" className="luxe-btn luxe-btn-secondary luxe-navbar-cta">
                            Sign In
                        </Link>
                    </div>

                    <button
                        className={`luxe-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
                        aria-label="Menu"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`luxe-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                <div className="luxe-mobile-menu-content">
                    <ul className="luxe-mobile-menu-links">
                        <li><Link to="/directory" onClick={handleLinkClick}>Directory</Link></li>
                        <li><Link to="/itinerary" onClick={handleLinkClick}>Itinerary</Link></li>
                        <li><Link to="/guide" onClick={handleLinkClick}>Guide</Link></li>
                        <li><Link to="/community" onClick={handleLinkClick}>Community</Link></li>
                        <li><Link to="/chatbot" onClick={handleLinkClick}>AI Assistant</Link></li>
                    </ul>
                    <div className="luxe-mobile-menu-actions">
                        <Link to="/signin" className="luxe-btn luxe-btn-primary" onClick={handleLinkClick}>
                            Sign In
                        </Link>
                        <Link to="/signup" className="luxe-btn luxe-btn-secondary" onClick={handleLinkClick}>
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};


// Hero Section
const HeroSection = () => (
    <section className="luxe-hero">
        <div className="luxe-hero-bg">
            <div className="luxe-hero-orb luxe-hero-orb-1"></div>
            <div className="luxe-hero-orb luxe-hero-orb-2"></div>
            <div className="luxe-hero-orb luxe-hero-orb-3"></div>
            <div className="luxe-hero-grid"></div>
        </div>

        <div className="luxe-container luxe-hero-content">
            <div className="luxe-hero-text">
                <div className="luxe-hero-badge">
                    <span className="luxe-hero-badge-dot"></span>
                    <span>Discover Medan's Spiritual Heritage</span>
                </div>

                <h1 className="luxe-hero-title">
                    Explore Sacred
                    <br />
                    <span className="luxe-hero-title-accent">Destinations</span>
                </h1>

                <p className="luxe-hero-subtitle">
                    Embark on a transformative journey through Medan's most remarkable religious landmarks.
                    Discover the beauty of history, culture, and spiritual values.
                </p>

                <div className="luxe-hero-actions">
                    <Link to="/directory" className="luxe-btn luxe-btn-primary">
                        Start Exploring
                        <Icons.ArrowRight />
                    </Link>
                    <Link to="/guide" className="luxe-btn luxe-btn-secondary">
                        View Guides
                    </Link>
                </div>

                <div className="luxe-hero-stats">
                    <div className="luxe-hero-stat">
                        <span className="luxe-hero-stat-value">50+</span>
                        <span className="luxe-hero-stat-label">Sacred Sites</span>
                    </div>
                    <div className="luxe-hero-stat">
                        <span className="luxe-hero-stat-value">10K+</span>
                        <span className="luxe-hero-stat-label">Happy Visitors</span>
                    </div>
                    <div className="luxe-hero-stat">
                        <span className="luxe-hero-stat-value">4.9</span>
                        <span className="luxe-hero-stat-label">User Rating</span>
                    </div>
                </div>
            </div>

            <div className="luxe-hero-visual">
                <div className="luxe-hero-product">
                    <div className="luxe-hero-product-glow"></div>
                    <img
                        src="https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&q=80"
                        alt="Luminara App Interface"
                        style={{ borderRadius: '24px' }}
                    />
                </div>

                <div className="luxe-hero-float-element luxe-hero-float-1">
                    <Icons.Star />
                    <span>Top Rated</span>
                </div>

                <div className="luxe-hero-float-element luxe-hero-float-2">
                    <Icons.Globe />
                    <span>Digital Guide</span>
                </div>
            </div>
        </div>

        <div className="scroll-indicator">
            <span>Scroll</span>
        </div>
    </section>
);

// Features Section
const FeaturesSection = () => (
    <section className="luxe-features">
        <div className="luxe-features-bg"></div>
        <div className="luxe-container">
            <div className="luxe-features-header">
                <span className="luxe-section-label">Why Choose Us</span>
                <h2 className="luxe-section-title">Experience the Difference</h2>
                <p className="luxe-section-desc" style={{ margin: '0 auto' }}>
                    Discover what makes Luminara the premier platform for religious tourism in Medan.
                </p>
            </div>

            <div className="luxe-features-grid">
                {features.map((feature, index) => (
                    <div className="luxe-feature-card" key={index}>
                        <span className="luxe-feature-number">0{index + 1}</span>
                        <div className="luxe-feature-icon">{feature.icon}</div>
                        <h3 className="luxe-feature-title">{feature.title}</h3>
                        <p className="luxe-feature-desc">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// Showcase Card Component
const ShowcaseCard = ({ item }) => (
    <div className="luxe-showcase-card">
        <div className="luxe-showcase-card-image-wrapper">
            <img
                src={item.main_image_url || `https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&q=80`}
                alt={item.name}
                className="luxe-showcase-card-image"
            />
            {item.featured && (
                <span className="luxe-showcase-card-badge">Featured</span>
            )}
        </div>
        <div className="luxe-showcase-card-content">
            <div className="luxe-showcase-card-rating">
                <Icons.Star />
                <span>{item.overall_rating?.toFixed(1) || '4.8'}</span>
            </div>
            <h3 className="luxe-showcase-card-title">{item.name}</h3>
            <div className="luxe-showcase-card-location">
                <Icons.MapPin />
                <span>{item.address || 'Medan, Indonesia'}</span>
            </div>
            <div className="luxe-showcase-card-footer">
                <div className="luxe-showcase-card-time">
                    <Icons.Clock />
                    <span>{item.opening_hours || 'Open Daily'}</span>
                </div>
                <Link to={`/directory/${item.id}`} className="luxe-showcase-card-link">
                    Explore <Icons.ArrowRight />
                </Link>
            </div>
        </div>
    </div>
);

// Showcase Section
const ShowcaseSection = ({ directories, loading, error }) => (
    <section className="luxe-showcase">
        <div className="luxe-container">
            <div className="luxe-showcase-header">
                <div className="luxe-showcase-title-group">
                    <span className="luxe-section-label">Featured Destinations</span>
                    <h2 className="luxe-section-title">Popular Sacred Sites</h2>
                    <p className="luxe-section-desc">
                        Explore the most visited religious landmarks in Medan, each with its own unique story and spiritual significance.
                    </p>
                </div>
                <Link to="/directory" className="luxe-btn luxe-btn-ghost">
                    View All <Icons.ArrowRight />
                </Link>
            </div>

            {loading ? (
                <div className="luxe-showcase-grid">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="luxe-showcase-card">
                            <div className="luxe-skeleton" style={{ height: '200px' }}></div>
                            <div style={{ padding: 'var(--space-6)' }}>
                                <div className="luxe-skeleton" style={{ height: '24px', width: '60%', marginBottom: '12px' }}></div>
                                <div className="luxe-skeleton" style={{ height: '16px', width: '80%' }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : error ? (
                <div className="glass" style={{ padding: 'var(--space-10)', textAlign: 'center', borderRadius: 'var(--radius-2xl)' }}>
                    <p style={{ color: 'var(--gray-400)' }}>{error}</p>
                </div>
            ) : directories.length > 0 ? (
                <div className="luxe-showcase-grid">
                    {directories.slice(0, 6).map((directory) => (
                        <ShowcaseCard key={directory.id} item={directory} />
                    ))}
                </div>
            ) : (
                <div className="glass" style={{ padding: 'var(--space-10)', textAlign: 'center', borderRadius: 'var(--radius-2xl)' }}>
                    <p style={{ color: 'var(--gray-400)' }}>No destinations available at the moment.</p>
                </div>
            )}
        </div>
    </section>
);

// Article Card Component
const ArticleCard = ({ article }) => (
    <div className="luxe-article-card">
        <div style={{ overflow: 'hidden' }}>
            <img
                src={article.image_url || `https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=600&q=80`}
                alt={article.name}
                className="luxe-article-card-image"
            />
        </div>
        <div className="luxe-article-card-content">
            <div className="luxe-article-card-meta">
                <span>5 min read</span>
                <span>•</span>
                <span>Culture</span>
            </div>
            <h3 className="luxe-article-card-title">{article.name}</h3>
            <p className="luxe-article-card-desc">{article.short_desc || 'Discover the rich cultural heritage and spiritual significance of this destination.'}</p>
            <Link to={`/article/${article.id}`} className="luxe-article-card-link">
                Read More <Icons.ArrowRight />
            </Link>
        </div>
    </div>
);

// Articles Section
const ArticlesSection = ({ articles, loading, error }) => (
    <section className="luxe-articles">
        <div className="luxe-container">
            <div className="luxe-showcase-header">
                <div className="luxe-showcase-title-group">
                    <span className="luxe-section-label">Latest Stories</span>
                    <h2 className="luxe-section-title">Insights & Articles</h2>
                    <p className="luxe-section-desc">
                        Dive deep into the history, culture, and spiritual significance of Medan's sacred destinations.
                    </p>
                </div>
                <Link to="/article" className="luxe-btn luxe-btn-ghost">
                    View All <Icons.ArrowRight />
                </Link>
            </div>

            {loading ? (
                <div className="luxe-articles-grid">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="luxe-article-card">
                            <div className="luxe-skeleton" style={{ height: '180px' }}></div>
                            <div style={{ padding: 'var(--space-6)' }}>
                                <div className="luxe-skeleton" style={{ height: '20px', width: '40%', marginBottom: '12px' }}></div>
                                <div className="luxe-skeleton" style={{ height: '24px', width: '80%', marginBottom: '12px' }}></div>
                                <div className="luxe-skeleton" style={{ height: '16px', width: '100%' }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : error ? (
                <div className="glass" style={{ padding: 'var(--space-10)', textAlign: 'center', borderRadius: 'var(--radius-2xl)' }}>
                    <p style={{ color: 'var(--gray-400)' }}>{error}</p>
                </div>
            ) : articles.length > 0 ? (
                <div className="luxe-articles-grid">
                    {articles.slice(0, 6).map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            ) : (
                <div className="glass" style={{ padding: 'var(--space-10)', textAlign: 'center', borderRadius: 'var(--radius-2xl)' }}>
                    <p style={{ color: 'var(--gray-400)' }}>No articles available at the moment.</p>
                </div>
            )}
        </div>
    </section>
);

// CTA Section
const CTASection = () => (
    <section className="luxe-cta">
        <div className="luxe-cta-bg"></div>
        <div className="luxe-container luxe-cta-content">
            <div className="luxe-cta-icon">
                <Icons.Sparkles />
            </div>
            <h2 className="luxe-cta-title">
                Ready to Begin Your <span className="gradient-text">Spiritual Journey</span>?
            </h2>
            <p className="luxe-cta-desc">
                Join thousands of travelers who have discovered the beauty and significance of Medan's sacred destinations.
                Let Luminara guide you on your transformative journey.
            </p>
            <div className="luxe-cta-actions">
                <Link to="/signup" className="luxe-btn luxe-btn-primary">
                    Get Started Free
                </Link>
                <Link to="/chatbot" className="luxe-btn luxe-btn-secondary">
                    Try AI Assistant
                </Link>
            </div>
        </div>
    </section>
);

// Map Section
const MapSection = () => (
    <section className="luxe-map">
        <div className="luxe-container">
            <div className="luxe-map-header">
                <span className="luxe-section-label">Explore the Region</span>
                <h2 className="luxe-section-title">Interactive Tour Map</h2>
                <p className="luxe-section-desc" style={{ margin: '0 auto' }}>
                    Discover top religious tourism spots across Medan with our interactive guide.
                </p>
            </div>

            <div className="luxe-map-container">
                <MapContainer
                    center={[3.5952, 98.6722]}
                    zoom={12}
                    style={{ height: '500px', width: '100%' }}
                >
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    />
                    <Marker position={[3.5952, 98.6722]} icon={customIcon}>
                        <Popup>Medan City Center</Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    </section>
);

// Footer
const LuxeFooter = () => (
    <footer className="luxe-footer">
        <div className="luxe-container">
            <div className="luxe-footer-grid">
                <div className="luxe-footer-brand">
                    <div className="luxe-footer-logo">
                        <img src="/images/luminara_logo.png" alt="Luminara" />
                        <span>LUMINARA</span>
                    </div>
                    <p>
                        Luminara is crafted by a passionate team of university students dedicated to
                        revolutionizing religious tourism through innovative digital solutions.
                    </p>
                    <div className="luxe-footer-social">
                        <a href="#" aria-label="Instagram"><Icons.Instagram /></a>
                        <a href="#" aria-label="Twitter"><Icons.Twitter /></a>
                        <a href="#" aria-label="Email"><Icons.Mail /></a>
                    </div>
                </div>

                <div className="luxe-footer-col">
                    <h4>Explore</h4>
                    <ul>
                        <li><Link to="/directory">Directory</Link></li>
                        <li><Link to="/itinerary">Itinerary</Link></li>
                        <li><Link to="/guide">Guides</Link></li>
                        <li><Link to="/chatbot">AI Assistant</Link></li>
                    </ul>
                </div>

                <div className="luxe-footer-col">
                    <h4>Community</h4>
                    <ul>
                        <li><Link to="/community">Join Groups</Link></li>
                        <li><Link to="/article">Articles</Link></li>
                        <li><Link to="/account">My Account</Link></li>
                    </ul>
                </div>

                <div className="luxe-footer-col">
                    <h4>Contact</h4>
                    <ul>
                        <li><a href="tel:+621234567890">+62 123 456 7890</a></li>
                        <li><a href="mailto:hello@luminara.id">hello@luminara.id</a></li>
                        <li><span style={{ color: 'var(--gray-400)' }}>Medan, Indonesia</span></li>
                    </ul>
                </div>
            </div>

            <div className="luxe-footer-bottom">
                <p>&copy; {new Date().getFullYear()} Luminara. All rights reserved.</p>
                <div className="luxe-footer-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>
);

// Main LuxeHomePage Component
const LuxeHomePage = () => {
    const [articles, setArticles] = useState([]);
    const [articlesLoading, setArticlesLoading] = useState(true);
    const [articlesError, setArticlesError] = useState(null);

    const [directories, setDirectories] = useState([]);
    const [directoriesLoading, setDirectoriesLoading] = useState(true);
    const [directoriesError, setDirectoriesError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setArticlesLoading(true);
                const response = await articleService.getAllArticles();
                if (response.status === 200 && response.data) {
                    setArticles(response.data);
                }
            } catch (err) {
                console.error('Error fetching articles:', err);
                setArticlesError('Failed to load articles.');
            } finally {
                setArticlesLoading(false);
            }
        };

        const fetchDirectories = async () => {
            try {
                setDirectoriesLoading(true);
                const response = await directoryService.getAllDirectories();
                if (response.status === 200 && response.data) {
                    setDirectories(response.data);
                }
            } catch (err) {
                console.error('Error fetching directories:', err);
                setDirectoriesError('Failed to load destinations.');
            } finally {
                setDirectoriesLoading(false);
            }
        };

        fetchArticles();
        fetchDirectories();
    }, []);

    return (
        <div className="luxe-page">
            <LuxeNavbar />
            <HeroSection />
            <FeaturesSection />
            <ShowcaseSection
                directories={directories}
                loading={directoriesLoading}
                error={directoriesError}
            />
            <ArticlesSection
                articles={articles}
                loading={articlesLoading}
                error={articlesError}
            />
            <CTASection />
            <MapSection />
            <LuxeFooter />
        </div>
    );
};

export default LuxeHomePage;
