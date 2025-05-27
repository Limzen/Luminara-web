import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-logo">
      <Link to="/">
        <img src="/images/luminara_logo.png" alt="Luminara Logo" />
      </Link>
    </div>
    <ul className="navbar-links">
      <li><Link to="/directory">Direktori</Link></li>
      <li><Link to="/itinerary">Itinerary</Link></li>
      <li><Link to="/guide">Guide</Link></li>
      <li><Link to="/comunity">Community</Link></li>
      <li><Link to="/chatbot">Chatbot</Link></li>
      <li><Link to="/account">ID</Link></li>
    </ul>
    <div className="navbar-user">
      {/* TODO: Replace with actual user avatar */}
      <span role="img" aria-label="user">👤</span>
    </div>
  </nav>
);

export default Navbar; 