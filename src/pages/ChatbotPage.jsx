import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/chatbotpage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faRobot, faUser } from '@fortawesome/free-solid-svg-icons';


// ============= API CONFIGURATION =============
// 🔒 SECURE: API URL sekarang diambil dari environment variable
const CHATBOT_API_URL = import.meta.env.VITE_CHATBOT_API_URL || "https://default-fallback-url.com/chat";

// 🔑 API Key (jika diperlukan)
const API_KEY = import.meta.env.VITE_API_KEY || null;

// 🐛 Debug mode - hanya untuk development
const DEBUG_MODE = import.meta.env.VITE_APP_ENV === 'development';

// Debug log minimal - hanya saat startup
if (DEBUG_MODE) {
    console.log("🔧 Luminara Chatbot - Environment loaded");
}
// ============================================

const ChatbotPage = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Halo! Saya adalah Luminara AI Assistant. Saya siap membantu Anda menemukan tempat ibadah, merencanakan itinerary spiritual, mencari guide, atau bergabung dengan komunitas. Ada yang bisa saya bantu hari ini? 🙏",
            sender: "bot",
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showQuickActions, setShowQuickActions] = useState(true);
    const messagesEndRef = useRef(null);

    const quickActions = [
        { text: "🕌 Cari Tempat Ibadah", message: "Saya ingin mencari tempat ibadah" },
        { text: "📅 Buat Itinerary", message: "Bantuan membuat itinerary perjalanan spiritual" },
        { text: "👨‍🏫 Cari Guide", message: "Saya butuh guide untuk perjalanan spiritual" },
        { text: "👥 Bergabung Komunitas", message: "Bagaimana cara bergabung dengan komunitas?" },
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        
        if (!inputMessage.trim()) return;
        
        setShowQuickActions(false);

        const newMessage = {
            id: Date.now(),
            text: inputMessage,
            sender: "user",
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMessage]);
        const currentMessage = inputMessage;
        setInputMessage("");
        setIsLoading(true);

        try {
            const response = await sendMessageToAPI(currentMessage);
            
            const botResponse = {
                id: Date.now() + 1,
                text: response,
                sender: "bot",
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botResponse]);
            
        } catch (error) {
            if (DEBUG_MODE) {
                console.error("❌ Chatbot Error:", error.message);
            }
            
            const errorResponse = {
                id: Date.now() + 1,
                text: "Maaf, saya sedang mengalami gangguan. Silakan coba lagi nanti.",
                sender: "bot",
                timestamp: new Date()
            };

            setMessages(prev => [...prev, errorResponse]);
            
        } finally {
            setIsLoading(false);
        }
    };    
    
    const sendMessageToAPI = async (message) => {
        try {
            if (CHATBOT_API_URL.includes("default-fallback-url")) {
                throw new Error("API URL belum dikonfigurasi");
            }

            const headers = { 'Content-Type': 'application/json' };
            
            if (API_KEY) {
                headers['Authorization'] = `Bearer ${API_KEY}`;
            }
            
            const response = await fetch(CHATBOT_API_URL, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ query: message }),
            });

            if (!response.ok) {
                throw new Error(`API request failed with status: ${response.status}`);
            }

            const data = await response.json();

            if (data && typeof data.response === 'string') {
                return data.response;
            } else if (data && typeof data.answer === 'string') {
                return data.answer;
            } else if (data.error) {
                throw new Error(`Server Error: ${data.error}`);
            } else {
                throw new Error("Invalid response format from API");
            }

        } catch (error) {
            if (DEBUG_MODE) {
                console.error("API Error:", error.message);
            }
            throw error;
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e);
        }
    };

    const handleQuickAction = async (actionMessage) => {
        setInputMessage("");
        setShowQuickActions(false);
        
        const newMessage = {
            id: Date.now(),
            text: actionMessage,
            sender: "user",
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMessage]);
        setIsLoading(true);        
        
        try {
            const response = await sendMessageToAPI(actionMessage);
            
            const botResponse = {
                id: Date.now() + 1,
                text: response,
                sender: "bot",
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botResponse]);
            
        } catch (error) {
            if (DEBUG_MODE) {
                console.error("Quick Action Error:", error.message);
            }
            
            const errorResponse = {
                id: Date.now() + 1,
                text: "Maaf, terjadi kesalahan saat memproses permintaan Anda.",
                sender: "bot",
                timestamp: new Date()
            };

            setMessages(prev => [...prev, errorResponse]);
            
        } finally {
            setIsLoading(false);
        }
    };

    const formatTime = (timestamp) => {
        if (!(timestamp instanceof Date)) return "";
        return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="chatbot-page">
            <Navbar />
            <main className="chatbot-main">
                <div className="chatbot-container">
                    <header className="chatbot-header">
                        <div className="chatbot-title">
                            <FontAwesomeIcon icon={faRobot} className="chatbot-icon" />
                            <h1>Luminara AI Assistant</h1>
                        </div>
                        <p className="chatbot-subtitle">
                            Tanyakan apa saja tentang komunitas, pemandu wisata religi, dan lainnya!
                        </p>
                    </header>

                    <div className="chat-window">
                        <div className="messages-container">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                                >
                                    <div className="message-avatar">
                                        <FontAwesomeIcon 
                                            icon={message.sender === 'user' ? faUser : faRobot} 
                                        />
                                    </div>
                                    <div className="message-content">
                                        <div className="message-bubble">
                                            <div style={{ whiteSpace: 'pre-wrap' }}>{message.text}</div>
                                        </div>
                                        <span className="message-time">
                                            {formatTime(message.timestamp)}
                                        </span>
                                    </div>
                                </div>
                            ))}

                            {showQuickActions && messages.length === 1 && (
                                <div className="quick-actions">
                                    <p className="quick-actions-title">Atau coba pertanyaan populer ini:</p>
                                    <div className="quick-actions-grid">
                                        {quickActions.map((action, index) => (
                                            <button
                                                key={index}
                                                className="quick-action-button"
                                                onClick={() => handleQuickAction(action.message)}
                                            >
                                                {action.text}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {isLoading && (
                                <div className="message bot-message">
                                    <div className="message-avatar">
                                        <FontAwesomeIcon icon={faRobot} />
                                    </div>
                                    <div className="message-content">
                                        <div className="message-bubble loading">
                                            <div className="typing-indicator">
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        <form className="message-input-form" onSubmit={handleSendMessage}>
                            <div className="input-container">
                                <input
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ketik pesan Anda di sini..."
                                    className="message-input"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    className="send-button"
                                    disabled={isLoading || !inputMessage.trim()}
                                >
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ChatbotPage;