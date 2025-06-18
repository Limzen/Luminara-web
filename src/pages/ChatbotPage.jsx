import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/chatbotpage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faRobot, faUser } from '@fortawesome/free-solid-svg-icons';

// ============= API CONFIGURATION =============
const CHATBOT_API_URL = "";

// Alternative: gunakan environment variable
// const CHATBOT_API_URL = process.env.REACT_APP_CHATBOT_API_URL || "http://localhost:5000/ask";

// 🔑 Jika butuh API key, uncomment dan isi:
// const API_KEY = "your-api-key-here";
// const API_KEY = process.env.REACT_APP_API_KEY;
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
    }, [messages]);    const handleSendMessage = async (e) => {
        e.preventDefault();
        
        if (!inputMessage.trim()) {
            console.log("❌ INPUT VALIDATION ERROR: Empty message");
            return;
        }

        console.log("✅ INPUT VALIDATION: Message validated successfully");
        console.log("📝 User Input:", inputMessage);

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
            console.log("🚀 PROCESS START: Calling chatbot API...");
            
            const response = await sendMessageToAPI(currentMessage);
            
            console.log("✅ PROCESS SUCCESS: Response received from API");
            console.log("📤 Bot Response:", response);
            
            const botResponse = {
                id: Date.now() + 1,
                text: response,
                sender: "bot",
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botResponse]);
            console.log("✅ UI UPDATE: Message added to chat successfully");
            
        } catch (error) {
            console.error("❌ PROCESS ERROR:", error);
            
            let userErrorMessage = "Maaf, saya sedang mengalami gangguan. ";
            let technicalDetails = "";

            if (error.name === "NetworkError" || error.message.includes("fetch")) {
                userErrorMessage += "Terjadi masalah koneksi jaringan.";
                technicalDetails = "🌐 NETWORK ERROR: Gagal terhubung ke server";
            } else if (error.message.includes("API request failed")) {
                userErrorMessage += "Server API tidak merespons dengan baik.";
                technicalDetails = `🔴 API ERROR: ${error.message}`;
            } else if (error.message.includes("Invalid response format")) {
                userErrorMessage += "Format respons dari server tidak valid.";
                technicalDetails = "📦 RESPONSE FORMAT ERROR: Invalid data structure";
            } else if (error.message.includes("CORS")) {
                userErrorMessage += "Terjadi masalah akses lintas domain.";
                technicalDetails = "🔒 CORS ERROR: Cross-origin request blocked";
            } else {
                userErrorMessage += "Terjadi kesalahan yang tidak diketahui.";
                technicalDetails = `🔧 UNKNOWN ERROR: ${error.message}`;
            }

            console.error(technicalDetails);
            console.error("📊 Error Details:", {
                name: error.name,
                message: error.message,
                stack: error.stack,
                timestamp: new Date().toISOString()
            });
            
            const errorResponse = {
                id: Date.now() + 1,
                text: `${userErrorMessage}\n\n🔧 Technical Info: ${technicalDetails}\n\nSilakan coba lagi nanti atau hubungi administrator jika masalah berlanjut.`,
                sender: "bot",
                timestamp: new Date()
            };

            setMessages(prev => [...prev, errorResponse]);
            console.log("✅ ERROR HANDLING: Error message displayed to user");
            
        } finally {
            setIsLoading(false);
            console.log("🏁 PROCESS END: Loading state cleared");
        }
    };    
    // Disesuaikan dengan Flask backend format + logging detail
    const sendMessageToAPI = async (message) => {
        try {
            console.log("📡 API CALL START: Preparing request...");
            console.log("🔗 API URL:", CHATBOT_API_URL);
            console.log("📝 Message to send:", message);
            
            // Validasi URL
            if (CHATBOT_API_URL.includes("huggingface-url")) {
                throw new Error("API URL belum dikonfigurasi");
            }

            console.log("📤 SENDING REQUEST: Calling fetch API...");
            
            const response = await fetch(CHATBOT_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 🔑 Uncomment jika butuh API key:
                    // 'Authorization': `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    question: message  
                }),
            });

            console.log("📨 RESPONSE RECEIVED:");
            console.log("  - Status:", response.status);
            console.log("  - Status Text:", response.statusText);
            console.log("  - Headers:", Object.fromEntries(response.headers.entries()));

            if (!response.ok) {
                let errorDetails = `Status: ${response.status} (${response.statusText})`;
                
                // Coba ambil error message dari response body jika ada
                try {
                    const errorBody = await response.text();
                    if (errorBody) {
                        errorDetails += ` - Body: ${errorBody}`;
                    }
                } catch (e) {
                    console.log("Could not read error response body");
                }
                
                throw new Error(`API request failed with ${errorDetails}`);
            }

            console.log("📦 PARSING RESPONSE: Converting to JSON...");
            const data = await response.json();
            console.log("✅ RESPONSE PARSED:", data);

            if (data.status === "success" && data.answer) {
                console.log("✅ SUCCESS PATH: Valid response with success status");
                return data.answer;
            } else if (data.answer) {
                console.log("✅ FALLBACK PATH: Valid response without status field");
                return data.answer;
            } else if (data.error) {
                console.log("❌ ERROR PATH: Server returned error");
                throw new Error(`Server Error: ${data.error}`);
            } else {
                console.log("❌ INVALID FORMAT: Response format tidak sesuai");
                console.log("Expected: {answer: string} or {status: 'success', answer: string}");
                console.log("Received:", data);
                throw new Error("Invalid response format from API");
            }

        } catch (error) {
            console.error("❌ API CALL FAILED:");
            console.error("  - Error Type:", error.name);
            console.error("  - Error Message:", error.message);
            
            if (error.name === "TypeError" && error.message.includes("fetch")) {
                console.error("  - Possible Cause: Network issue, CORS, or invalid URL");
            } else if (error.name === "SyntaxError") {
                console.error("  - Possible Cause: Response is not valid JSON");
            }
            
            console.error("  - Full Error:", error);
            throw error;
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e);
        }
    };

    const handleQuickAction = (actionMessage) => {
        setInputMessage(actionMessage);
        setShowQuickActions(false);
        
        const newMessage = {
            id: Date.now(),
            text: actionMessage,
            sender: "user",
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMessage]);
        setIsLoading(true);        
        setTimeout(async () => {
            try {
                console.log("🚀 QUICK ACTION START: Processing quick action...");
                console.log("📝 Quick Action Message:", actionMessage);
                
                const response = await sendMessageToAPI(actionMessage);
                
                console.log("✅ QUICK ACTION SUCCESS: Response received");
                
                const botResponse = {
                    id: Date.now() + 1,
                    text: response,
                    sender: "bot",
                    timestamp: new Date()
                };

                setMessages(prev => [...prev, botResponse]);
                console.log("✅ QUICK ACTION UI UPDATE: Message added successfully");
                
            } catch (error) {
                console.error("❌ QUICK ACTION ERROR:", error);
                
                let userErrorMessage = "Maaf, terjadi kesalahan saat memproses quick action. ";
                let technicalDetails = "";

                if (error.message.includes("API URL belum dikonfigurasi")) {
                    userErrorMessage += "API belum dikonfigurasi dengan benar.";
                    technicalDetails = "⚙️ CONFIG ERROR: API URL not configured";
                } else if (error.name === "NetworkError" || error.message.includes("fetch")) {
                    userErrorMessage += "Terjadi masalah koneksi jaringan.";
                    technicalDetails = "🌐 NETWORK ERROR: Connection failed";
                } else {
                    userErrorMessage += "Terjadi kesalahan yang tidak diketahui.";
                    technicalDetails = `🔧 UNKNOWN ERROR: ${error.message}`;
                }

                console.error("📊 Quick Action Error Details:", {
                    action: actionMessage,
                    error: error.message,
                    timestamp: new Date().toISOString()
                });
                
                const errorResponse = {
                    id: Date.now() + 1,
                    text: `${userErrorMessage}\n\n🔧 Technical Info: ${technicalDetails}\n\nSilakan coba lagi atau gunakan input manual.`,
                    sender: "bot",
                    timestamp: new Date()
                };

                setMessages(prev => [...prev, errorResponse]);
                console.log("✅ QUICK ACTION ERROR HANDLING: Error message displayed");
                
            } finally {
                setIsLoading(false);
                setInputMessage("");
                console.log("🏁 QUICK ACTION END: Process completed");
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
