import React from 'react';
import { Link } from 'react-router-dom';
import { LuxeNavbar, LuxeFooter, LuxeButton } from '../components/luxe/LuxeComponents';
import '../styles/luxe-pages.css';

const NotFoundPage = () => {
    return (
        <div className="luxe-page">
            <LuxeNavbar />

            <section className="luxe-section" style={{
                paddingTop: '140px',
                minHeight: 'calc(100vh - 200px)',
                display: 'flex',
                alignItems: 'center'
            }}>
                <div className="luxe-container" style={{ textAlign: 'center' }}>
                    {/* 404 Number */}
                    <div style={{
                        fontSize: 'clamp(100px, 20vw, 200px)',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, var(--gold-400), var(--gold-600))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        lineHeight: 1,
                        marginBottom: 'var(--space-6)'
                    }}>
                        404
                    </div>

                    <h1 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-3xl)',
                        fontWeight: 700,
                        color: 'var(--white)',
                        marginBottom: 'var(--space-4)'
                    }}>
                        Halaman Tidak Ditemukan
                    </h1>

                    <p style={{
                        fontSize: 'var(--text-lg)',
                        color: 'var(--gray-400)',
                        maxWidth: '500px',
                        margin: '0 auto var(--space-8)'
                    }}>
                        Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
                        Mari kembali ke beranda dan lanjutkan menjelajahi destinasi spiritual di Medan.
                    </p>

                    <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/">
                            <LuxeButton variant="primary">
                                Kembali ke Beranda
                            </LuxeButton>
                        </Link>
                        <Link to="/directory">
                            <LuxeButton variant="secondary">
                                Jelajahi Destinasi
                            </LuxeButton>
                        </Link>
                    </div>
                </div>
            </section>

            <LuxeFooter />
        </div>
    );
};

export default NotFoundPage;
