import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ArticlePage from '../pages/ArticlePage';
import CommunityPage from '../pages/ComunityPage';
import RegisterPage from '../pages/RegisterPage';
import JoinGroupPage from '../pages/JoinGroupPage';
import CommunityNamePage from '../pages/CommunityNamePage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import PasswordManager from '../pages/PasswordManager';
PasswordManager


const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/article/:id" element={<ArticlePage />} />
    <Route path="/community" element={<CommunityPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/joingroup/:id" element={<JoinGroupPage />} />
    <Route path="/communityname/:id" element={<CommunityNamePage />} />
    <Route path="/signin" element={<SignInPage />} />
    <Route path="/signup" element={<SignUpPage />} />
    <Route path="/passwordmanager" element={<PasswordManager />} />
    {/* Add more routes as needed */}
  </Routes>
);

export default AppRoutes; 