import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MainLayout from './layouts/MainLayout';
import Documents from './pages/Documents';
import Users from './pages/Users';
import Settings from './pages/Settings';
import DocumentControl from './pages/DocumentControl';
import Menu from './pages/menu';
import Dash from './pages/dash';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/document-control" element={<DocumentControl />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/documentos/:section" element={<Dash />} />
          <Route path="/documentos" element={<Dash />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/" element={<DocumentControl />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
