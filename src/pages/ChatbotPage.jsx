import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/chatbotpage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faRobot, faUser } from '@fortawesome/free-solid-svg-icons';

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
    }, [messages]);    const handleSendMessage = async (e) => {
        e.preventDefault();
        
        if (!inputMessage.trim()) return;

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
            // Replace with actual chatbot API endpoint
            const response = await sendMessageToAPI(currentMessage);
            
            const botResponse = {
                id: Date.now() + 1,
                text: response,
                sender: "bot",
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botResponse]);
        } catch (error) {
            console.error("Error sending message:", error);
            
            const errorResponse = {
                id: Date.now() + 1,
                text: "Sorry, I'm having trouble responding right now. Please try again later.",
                sender: "bot",
                timestamp: new Date()
            };

            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    };    // API call function - replace with your actual API integration
    const sendMessageToAPI = async (message) => {
        try {
            // Example API call structure - replace with your actual endpoint
            // You can replace this URL with your actual chatbot API endpoint
            const apiUrl = process.env.REACT_APP_CHATBOT_API_URL || '/api/chatbot';
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add authorization header if needed
                    // 'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    message: message,
                    conversation_id: 'user_session_' + Date.now(), // You can implement session management
                    user_id: 'anonymous_user', // Replace with actual user ID if available
                    timestamp: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error(`API request failed with status: ${response.status}`);
            }

            const data = await response.json();
            return data.response || data.message || "I received your message but couldn't generate a proper response.";
        } catch (error) {
            console.error("API Error:", error);
            // Fallback to simulation if API fails
            return await simulateChatbotResponse(message);
        }
    };    // Simulate chatbot response - replace with actual API call
    const simulateChatbotResponse = (message) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const lowerMessage = message.toLowerCase();
                let response = "";

                // Smart responses based on Luminara features
                if (lowerMessage.includes('direktori') || lowerMessage.includes('directory') || lowerMessage.includes('tempat ibadah')) {
                    response = "Saya dapat membantu Anda menemukan tempat ibadah yang sesuai! Coba kunjungi halaman Direktori kami untuk melihat daftar lengkap masjid, gereja, vihara, dan tempat ibadah lainnya. Anda dapat mencari berdasarkan lokasi atau jenis tempat ibadah.";
                } else if (lowerMessage.includes('itinerary') || lowerMessage.includes('rencana') || lowerMessage.includes('perjalanan')) {
                    response = "Buat itinerary perjalanan spiritual Anda dengan mudah! Di halaman Itinerary, Anda dapat merencanakan kunjungan ke berbagai tempat ibadah, mengatur jadwal, dan berbagi rencana dengan teman. Fitur ini membantu Anda memaksimalkan pengalaman spiritual.";
                } else if (lowerMessage.includes('guide') || lowerMessage.includes('panduan') || lowerMessage.includes('pemandu')) {
                    response = "Temukan guide terpercaya untuk perjalanan spiritual Anda! Halaman Guide kami menyediakan daftar pemandu wisata yang berpengalaman dalam tur ke tempat-tempat ibadah. Mereka dapat memberikan wawasan budaya dan spiritual yang mendalam.";
                } else if (lowerMessage.includes('community') || lowerMessage.includes('komunitas') || lowerMessage.includes('grup')) {
                    response = "Bergabunglah dengan komunitas Luminara! Di halaman Community, Anda dapat menemukan dan bergabung dengan grup-grup yang sesuai minat spiritual Anda, berbagi pengalaman, dan berinteraksi dengan sesama pengguna.";
                } else if (lowerMessage.includes('bantuan') || lowerMessage.includes('help') || lowerMessage.includes('cara')) {
                    response = "Saya di sini untuk membantu! Anda dapat bertanya tentang cara menggunakan fitur Direktori, membuat Itinerary, mencari Guide, atau bergabung dengan Community. Apa yang ingin Anda ketahui lebih lanjut?";
                } else if (lowerMessage.includes('terima kasih') || lowerMessage.includes('thanks') || lowerMessage.includes('thank you')) {
                    response = "Sama-sama! Senang bisa membantu Anda. Jika ada pertanyaan lain tentang Luminara, jangan ragu untuk bertanya. Semoga perjalanan spiritual Anda menyenangkan! 🙏";
                } else {
                    const responses = [
                        `Mengenai "${message}", saya sarankan Anda menjelajahi fitur-fitur Luminara seperti Direktori untuk menemukan tempat ibadah, atau Guide untuk panduan perjalanan spiritual.`,
                        `Pertanyaan yang menarik tentang "${message}"! Luminara menyediakan berbagai fitur untuk mendukung perjalanan spiritual Anda. Coba cek halaman Direktori atau Community untuk informasi lebih lanjut.`,
                        `Terima kasih sudah bertanya tentang "${message}". Apakah Anda ingin saya membantu menemukan tempat ibadah di Direktori atau merencanakan itinerary perjalanan spiritual?`,
                        "Saya adalah asisten AI Luminara yang siap membantu Anda mengeksplorasi tempat-tempat ibadah dan merencanakan perjalanan spiritual. Ada yang bisa saya bantu hari ini?"
                    ];
                    response = responses[Math.floor(Math.random() * responses.length)];
                }
                
                resolve(response);
            }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds for realism
        });
    };const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e);
        }
    };    const handleQuickAction = (actionMessage) => {
        setInputMessage(actionMessage);
        setShowQuickActions(false);
        
        // Create the message immediately
        const newMessage = {
            id: Date.now(),
            text: actionMessage,
            sender: "user",
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMessage]);
        setIsLoading(true);

        // Send to API
        setTimeout(async () => {
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
                console.error("Error sending message:", error);
                
                const errorResponse = {
                    id: Date.now() + 1,
                    text: "Maaf, saya sedang mengalami gangguan. Silakan coba lagi nanti.",
                    sender: "bot",
                    timestamp: new Date()
                };

                setMessages(prev => [...prev, errorResponse]);
            } finally {
                setIsLoading(false);
                setInputMessage("");
            }
        }, 100);
    };

    const formatTime = (timestamp) => {
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
                            Ask me anything about religious communities, guides, and more!
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
                                            <p>{message.text}</p>
                                        </div>
                                        <span className="message-time">
                                            {formatTime(message.timestamp)}
                                        </span>
                                    </div>
                                </div>
                            ))}

                            {showQuickActions && messages.length === 1 && (
                                <div className="quick-actions">
                                    <p className="quick-actions-title">Pertanyaan Populer:</p>
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
                            )}                            <div ref={messagesEndRef} />
                        </div>

                        <form className="message-input-form" onSubmit={handleSendMessage}>
                            <div className="input-container">                                <input
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your message here..."
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
