import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import '../styles/components/FloatingChatbot.css';

const FloatingChatbot = () => {
    const location = useLocation();
    
    // Don't show floating chatbot on the chatbot page itself
    if (location.pathname === '/chatbot') {
        return null;
    }

    return (
        <Link to="/chatbot" className="floating-chatbot-button">
            <FontAwesomeIcon icon={faRobot} />
            <span className="tooltip">Chat with AI Assistant</span>
        </Link>
    );
};

export default FloatingChatbot;
