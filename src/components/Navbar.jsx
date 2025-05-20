import React from 'react';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-logo">
      <img src="/images/luminara_logo.png" alt="Luminara Logo" />
    </div>
    <ul className="navbar-links">
      <li>Direktori</li>
      <li>Itinerary</li>
      <li>Guide</li>
      <li>Community</li>
      <li>Chatbot</li>
      <li>ID</li>
    </ul>
    <div className="navbar-user">
      {/* TODO: Replace with actual user avatar */}
      <span role="img" aria-label="user">👤</span>
    </div>
  </nav>
);

export default Navbar; 