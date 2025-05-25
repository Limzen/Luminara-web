import React from "react";
import { useNavigate } from "react-router-dom"; 

const CommunityCard = ({ community }) => {
  const navigate = useNavigate(); 

  const handleJoinGroup = () => {
    navigate('/joingroup'); 
  };

  return (
    <div className="card-wrapper">
      <div className="card">
        <img src={community.image} alt={community.title} className="card-image" />
      </div>
      <div className="card-info">
        <h3>Nama Komunitas</h3>
        <a href="#" onClick={handleJoinGroup} style={{ cursor: 'pointer' }}>Join group →</a>
      </div>
    </div>
  );
};

export default CommunityCard;
