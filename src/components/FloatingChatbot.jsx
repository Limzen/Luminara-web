import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/luxe-pages.css';

// Icons
const Icons = {
    MessageCircle: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
    ),
    X: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    ),
    Sparkles: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3v18M5.5 8.5l13 7M5.5 15.5l13-7" />
        </svg>
    ),
};

const FloatingChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--gold-400, #fcd34d), var(--gold-500, #d4a855))',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 24px rgba(212, 168, 85, 0.4)',
                    zIndex: 999,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.boxShadow = '0 6px 32px rgba(212, 168, 85, 0.5)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 24px rgba(212, 168, 85, 0.4)';
                }}
                aria-label="Open AI Assistant"
            >
                <span style={{ width: '28px', height: '28px', color: '#0a0f1c' }}>
                    {isOpen ? <Icons.X /> : <Icons.Sparkles />}
                </span>
            </button>

            {/* Mini Chat Popup */}
            {isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '100px',
                        right: '24px',
                        width: '340px',
                        maxWidth: 'calc(100vw - 48px)',
                        background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.98), rgba(15, 23, 42, 0.99))',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        zIndex: 998,
                        boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.5)',
                        animation: 'slideUp 0.3s ease'
                    }}
                >
                    {/* Header */}
                    <div style={{
                        padding: '16px 20px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, #fcd34d, #d4a855)',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Icons.Sparkles />
                        </div>
                        <div>
                            <h4 style={{ margin: 0, color: '#fff', fontSize: '16px', fontWeight: 600 }}>Luminara AI</h4>
                            <span style={{ fontSize: '12px', color: '#64748b' }}>Online • Ask me anything</span>
                        </div>
                    </div>

                    {/* Body */}
                    <div style={{ padding: '20px' }}>
                        <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                            👋 Hi! I'm your AI assistant. I can help you discover amazing religious destinations in Medan.
                        </p>

                        <Link
                            to="/chatbot"
                            style={{
                                display: 'block',
                                marginTop: '16px',
                                padding: '12px 20px',
                                background: 'linear-gradient(135deg, #fcd34d, #d4a855)',
                                color: '#0a0f1c',
                                textDecoration: 'none',
                                borderRadius: '12px',
                                textAlign: 'center',
                                fontWeight: 600,
                                fontSize: '14px',
                                transition: 'transform 0.2s ease'
                            }}
                            onClick={() => setIsOpen(false)}
                        >
                            Start Full Conversation
                        </Link>
                    </div>
                </div>
            )}

            <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </>
    );
};

export default FloatingChatbot;
