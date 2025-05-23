import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ArticlePage from '../pages/ArticlePage';
import CommunityPage from '../pages/ComunityPage';
import RegisterPage from '../pages/RegisterPage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/article/:id" element={<ArticlePage />} />
    <Route path="/comunity" element={<CommunityPage />} />
    <Route path="/register" element={<RegisterPage />} />
    {/* Add more routes as needed */}
  </Routes>
);

export default AppRoutes; 