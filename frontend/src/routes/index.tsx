import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import DocumentControl from '../pages/DocumentControl';
import Menu from '../menu';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/documentos/control" element={<DocumentControl />} />
      </Routes>
    </BrowserRouter>
  );
}
