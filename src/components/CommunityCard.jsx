import React from "react";

const CommunityCard = ({ community }) => {
  return (
    <div className="card-wrapper">
      <div className="card">
        <img src={community.image} alt={community.title} className="card-image" />
      </div>
      <div className="card-info">
        <h3>Nama Komunitas</h3>
        <a href="#">Join group →</a>
      </div>
    </div>
  );
};

export default CommunityCard;
