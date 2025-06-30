import React from "react";
import { useNavigate } from "react-router-dom";

const CommunityCard = ({ community }) => {
  const navigate = useNavigate();

  const handleJoinGroup = () => {
    navigate(`/communityname/${community.id}`);
  };

  return (
    <div className="card-wrapper">
      <div className="card">
        <img src={community.logo_url} alt={community.name} className="card-image" />
      </div>
      <div className="card-info">
        <h3>{community.name}</h3>
        <a href="#" onClick={handleJoinGroup} className="join-group-link">Join group →</a>
      </div>
    </div>
  );
};

export default CommunityCard;
