import React from 'react';
import { useParams } from 'react-router-dom';
import { communityData } from '../data/dummyData'; 
import "../styles/joingrouppage.css";

const JoinGroupPage = () => {
  const { id } = useParams();
  const community = communityData.find(c => c.id === Number(id)); 

  return (
    <div className="container">
      <header className="header">
        <div className="logo-container">
          <img src="/images/logo_whatsapp.png" alt="WhatsApp" className="logo" />
          <span className="whatsapp-text">WhatsApp</span>
        </div>
        <a href="https://www.whatsapp.com/download?lang=id_ID" className="download-button">Download</a>
      </header>
      <div className="content">
        <div className="community-image" style={{ backgroundImage: `url(${community.image})` }}></div>
        <h1 className="community-name">{community.title}</h1> 
        <button className="chat-button">Continue to Chat</button>
      </div>
      <p className="description">
        Explore Guided Tours, Historical Insights, And Connect Directly With Our Support Team.
      </p>
    </div>
  );
};

export default JoinGroupPage;
