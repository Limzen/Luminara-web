import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LuxeNavbar, LuxeFooter, LuxeButton, LuxeCardSkeleton } from '../components/luxe/LuxeComponents';
import { articleService } from '../services/articleService';
import '../styles/luxe-pages.css';

// Icons
const Icons = {
    ArrowRight: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
        </svg>
    ),
    Clock: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    ),
    Calendar: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    ),
};

// Online images for articles
const articleImages = [
    'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80',
    'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800&q=80',
    'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80',
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80',
    'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80',
    'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80',
];

// Sample articles
const sampleArticles = [
    { id: 1, name: 'Sejarah Masjid Raya Al Mashun', short_desc: 'Mengenal lebih dalam tentang masjid bersejarah yang menjadi ikon kota Medan.', category: 'Sejarah' },
    { id: 2, name: 'Keindahan Vihara Maitreya', short_desc: 'Menjelajahi arsitektur dan spiritualitas vihara Buddha terbesar di Sumatera.', category: 'Arsitektur' },
    { id: 3, name: 'Gereja HKBP: Warisan Kolonial', short_desc: 'Perjalanan sejarah gereja tertua di Medan dan perannya dalam perkembangan kota.', category: 'Sejarah' },
    { id: 4, name: 'Tips Wisata Religi di Medan', short_desc: 'Panduan lengkap untuk merencanakan perjalanan spiritual yang bermakna.', category: 'Panduan' },
    { id: 5, name: 'Kuil Shri Mariamman', short_desc: 'Mengungkap keindahan dan makna spiritual kuil Hindu tertua di Medan.', category: 'Budaya' },
    { id: 6, name: 'Festival Keagamaan di Medan', short_desc: 'Kalender lengkap perayaan keagamaan yang wajib dikunjungi wisatawan.', category: 'Event' },
];

// Article Card
const ArticleCard = ({ article, index }) => (
    <Link to={`/article/${article.id}`} style={{ textDecoration: 'none' }}>
        <div className="luxe-dir-card">
            <div className="luxe-dir-card__img">
                <img
                    src={articleImages[index % articleImages.length]}
                    alt={article.name}
                    loading="lazy"
                />
                <span className="luxe-dir-card__category">{article.category || 'Artikel'}</span>
            </div>
            <div className="luxe-dir-card__body">
                <h3 className="luxe-dir-card__title">{article.name}</h3>
                <p className="luxe-dir-card__desc">{article.short_desc}</p>
                <div className="luxe-dir-card__footer">
                    <div className="luxe-dir-card__hours">
                        <Icons.Clock />
                        <span>5 min read</span>
                    </div>
                    <span className="luxe-dir-card__link">
                        Baca <Icons.ArrowRight />
                    </span>
                </div>
            </div>
        </div>
    </Link>
);

const ArticlesPage = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setLoading(true);
                const response = await articleService?.getAllArticles?.();
                if (response?.status === 200 && response?.data?.length > 0) {
                    setArticles(response.data);
                } else {
                    // Use sample data
                    setArticles(sampleArticles);
                }
            } catch (err) {
                setArticles(sampleArticles);
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    return (
        <div className="luxe-page">
            <LuxeNavbar />

            {/* Hero */}
            <section className="luxe-page-hero">
                <div className="luxe-page-hero__bg">
                    <img
                        src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=80"
                        alt="Articles"
                    />
                    <div className="luxe-page-hero__overlay"></div>
                </div>
                <div className="luxe-container luxe-page-hero__content">
                    <span className="luxe-section-label">Insights & Stories</span>
                    <h1 className="luxe-page-hero__title">Artikel</h1>
                    <p className="luxe-page-hero__subtitle">
                        Temukan cerita menarik, panduan perjalanan, dan wawasan spiritual tentang destinasi religi di Medan
                    </p>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="luxe-section">
                <div className="luxe-container">
                    {loading ? (
                        <div className="luxe-grid luxe-grid--3">
                            {[1, 2, 3, 4, 5, 6].map(i => <LuxeCardSkeleton key={i} />)}
                        </div>
                    ) : (
                        <div className="luxe-grid luxe-grid--3">
                            {articles.map((article, index) => (
                                <ArticleCard key={article.id} article={article} index={index} />
                            ))}
                        </div>
                    )}

                    {!loading && articles.length === 0 && (
                        <div className="luxe-empty">
                            <h3 className="luxe-empty__title">Belum ada artikel</h3>
                            <p className="luxe-empty__desc">Artikel akan segera hadir. Nantikan update terbaru!</p>
                        </div>
                    )}
                </div>
            </section>

            <LuxeFooter />
        </div>
    );
};

export default ArticlesPage;
