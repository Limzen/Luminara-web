import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ArticlePage from '../pages/ArticlePage';
import DirectoryPage from '../pages/DirectoryPage';
import DirectoryDetailPage from '../pages/DirectoryDetailPage';
import '../styles/DirectoryPage.css';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/article/:id" element={<ArticlePage />} />
    <Route path="/directory" element={<DirectoryPage />} />
    <Route path="/directory/:id" element={<DirectoryDetailPage />} />
    {/* Add more routes as needed */}
  </Routes>
);

export default AppRoutes; 