import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCommunityById } from '../services/communityService';
import "../styles/joingrouppage.css";

const JoinGroupPage = () => {
  const { id } = useParams();
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getCommunityById(id)
      .then(setCommunity)
      .catch(() => setError('Community not found'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="container"><p>Loading...</p></div>;
  }

  if (error || !community) {
    return <div className="container"><p>Community not found.</p></div>;
  }

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
        <div className="community-image" style={{ backgroundImage: `url(${community.logo_url})` }}></div>
        <h1 className="community-name">{community.name}</h1>
        <a href={community.whatsapp_group_link} target="_blank" rel="noopener noreferrer">
          <button className="chat-button">Continue to Chat</button>
        </a>
      </div>
      <p className="description">
        Explore Guided Tours, Historical Insights, And Connect Directly With Our Support Team.
      </p>
    </div>
  );
};

export default JoinGroupPage;
