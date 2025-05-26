import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ArticlePage from '../pages/ArticlePage';
import CommunityPage from '../pages/ComunityPage';
import RegisterPage from '../pages/RegisterPage';
import JoinGroupPage from '../pages/JoinGroupPage';
import CommunityNamePage from '../pages/CommunityNamePage';


const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/article/:id" element={<ArticlePage />} />
    <Route path="/comunity" element={<CommunityPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/joingroup/:id" element={<JoinGroupPage />} />
    <Route path="/communityname/:id" element={<CommunityNamePage />} />
    {/* Add more routes as needed */}
  </Routes>
);

export default AppRoutes; 