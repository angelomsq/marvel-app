import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Character from '../pages/Character';

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/character/:characterId" element={<Character />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
