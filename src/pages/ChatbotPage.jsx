import React, { useState, useRef, useEffect } from 'react';
import { LuxeNavbar } from '../components/luxe/LuxeComponents';
import { sendMessageToAI } from '../services/aiService';
import '../styles/luxe-pages.css';

// Icons
const Icons = {
    Send: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
    ),
    Bot: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="10" rx="2" />
            <circle cx="12" cy="5" r="2" />
            <line x1="12" y1="7" x2="12" y2="11" />
            <line x1="8" y1="16" x2="8" y2="16" />
            <line x1="16" y1="16" x2="16" y2="16" />
        </svg>
    ),
    Sparkles: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3v18M5.5 8.5l13 7M5.5 15.5l13-7" />
        </svg>
    ),
};

// Initial greeting message
const initialMessages = [
    {
        id: 1,
        type: 'bot',
        text: "Selamat datang di Luminara AI Assistant! 👋\n\nSaya siap membantu Anda menemukan destinasi wisata religi terbaik di Medan. Tanyakan apa saja tentang:\n\n• Masjid, Vihara, Gereja, dan Kuil\n• Rekomendasi itinerary\n• Informasi jam buka dan lokasi\n• Tips perjalanan spiritual",
        timestamp: new Date()
    }
];

// Quick action suggestions
const quickActions = [
    "Masjid populer di Medan?",
    "Rekomendasi wisata religi",
    "Jam buka Masjid Raya",
    "Buat itinerary 1 hari"
];

const ChatbotPage = () => {
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Send message handler
    const sendMessage = async (text = input) => {
        if (!text.trim()) return;

        // Add user message
        const userMessage = {
            id: Date.now(),
            type: 'user',
            text: text.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            // Call Groq AI API
            const aiResponse = await sendMessageToAI(text.trim());

            const botMessage = {
                id: Date.now(),
                type: 'bot',
                text: aiResponse,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = {
                id: Date.now(),
                type: 'bot',
                text: '😔 Maaf, terjadi kesalahan. Silakan coba lagi.',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    // Handle key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="luxe-page">
            <LuxeNavbar />

            <div className="luxe-chat">
                {/* Chat Header */}
                <div className="luxe-chat__header">
                    <div className="luxe-container" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, var(--gold-400), var(--gold-500))',
                            borderRadius: 'var(--radius-lg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Icons.Sparkles />
                        </div>
                        <div>
                            <h1 className="luxe-chat__title">Luminara AI</h1>
                            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-500)' }}>
                                {isTyping ? 'Typing...' : 'Online'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="luxe-chat__messages">
                    <div className="luxe-container">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`luxe-chat__message-wrapper luxe-chat__message-wrapper--${message.type}`}
                            >
                                {/* Avatar */}
                                <div className={`luxe-chat__avatar luxe-chat__avatar--${message.type}`}>
                                    {message.type === 'bot' ? '✨' : '👤'}
                                </div>

                                {/* Message Bubble */}
                                <div className={`luxe-chat__message luxe-chat__message--${message.type}`}>
                                    <p className="luxe-chat__message-text" style={{ whiteSpace: 'pre-line' }}>
                                        {message.text}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="luxe-chat__message-wrapper luxe-chat__message-wrapper--bot">
                                <div className="luxe-chat__avatar luxe-chat__avatar--bot">✨</div>
                                <div className="luxe-chat__message luxe-chat__message--bot">
                                    <div style={{ display: 'flex', gap: '6px', padding: '4px 0' }}>
                                        <span className="luxe-spinner" style={{ width: '8px', height: '8px' }}></span>
                                        <span className="luxe-spinner" style={{ width: '8px', height: '8px', animationDelay: '0.2s' }}></span>
                                        <span className="luxe-spinner" style={{ width: '8px', height: '8px', animationDelay: '0.4s' }}></span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Quick Actions (only show if few messages) */}
                        {messages.length <= 2 && !isTyping && (
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 'var(--space-2)',
                                marginTop: 'var(--space-4)'
                            }}>
                                {quickActions.map((action, index) => (
                                    <button
                                        key={index}
                                        onClick={() => sendMessage(action)}
                                        style={{
                                            padding: 'var(--space-2) var(--space-4)',
                                            background: 'rgba(212, 168, 85, 0.1)',
                                            border: '1px solid rgba(212, 168, 85, 0.3)',
                                            borderRadius: 'var(--radius-full)',
                                            color: 'var(--gold-400)',
                                            fontSize: 'var(--text-sm)',
                                            cursor: 'pointer',
                                            transition: 'all var(--duration-base) var(--ease-smooth)'
                                        }}
                                    >
                                        {action}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input */}
                <div className="luxe-chat__input-container">
                    <div className="luxe-container">
                        <div className="luxe-chat__input-wrapper">
                            <input
                                type="text"
                                className="luxe-chat__input"
                                placeholder="Ketik pesan..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                disabled={isTyping}
                            />
                            <button
                                className="luxe-chat__send"
                                onClick={() => sendMessage()}
                                disabled={!input.trim() || isTyping}
                            >
                                <Icons.Send />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatbotPage;