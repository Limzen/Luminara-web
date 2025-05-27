import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ArticlePage from '../pages/ArticlePage';
import DirectoryPage from '../pages/DirectoryPage';
import DirectoryDetailPage from '../pages/DirectoryDetailPage';
import '../styles/DirectoryPage.css';

import CommunityPage from '../pages/ComunityPage';
import RegisterPage from '../pages/RegisterPage';
import JoinGroupPage from '../pages/JoinGroupPage';
import CommunityNamePage from '../pages/CommunityNamePage';
import GuidePage from '../pages/GuidePage';
import GuideDetailPage from '../pages/GuideDetailPage';
import ItineraryPage from '../pages/ItineraryPage.jsx';
import CreateItineraryPage from "../pages/CreateItineraryPage.jsx";
import ItineraryDetailPage from "../pages/ItineraryDetailPage.jsx";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/article/:id" element={<ArticlePage />} />

    <Route path="/directory" element={<DirectoryPage />} />
    <Route path="/directory/:id" element={<DirectoryDetailPage />} />

    <Route path="/comunity" element={<CommunityPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/joingroup/:id" element={<JoinGroupPage />} />
    <Route path="/communityname/:id" element={<CommunityNamePage />} />

    <Route path="/guide" element={<GuidePage />} />
    <Route path="/guide/:id" element={<GuideDetailPage />} />

    <Route path="/itinerary" element={<ItineraryPage />} />
    <Route path="/itinerary/create" element={<CreateItineraryPage />} />
    <Route path="/itinerary/:id" element={<ItineraryDetailPage />} />
    {/* Add more routes as needed */}
  </Routes>
);

export default AppRoutes;