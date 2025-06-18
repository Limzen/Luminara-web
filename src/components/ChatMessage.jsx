import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faUser } from '@fortawesome/free-solid-svg-icons';

const ChatMessage = ({ message, isUser, timestamp }) => {
    const formatTime = (timestamp) => {
        return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className={`message ${isUser ? 'user-message' : 'bot-message'}`}>
            <div className="message-avatar">
                <FontAwesomeIcon icon={isUser ? faUser : faRobot} />
            </div>
            <div className="message-content">
                <div className="message-bubble">
                    <p>{message}</p>
                </div>
                <span className="message-time">
                    {formatTime(timestamp)}
                </span>
            </div>
        </div>
    );
};

export default ChatMessage;
