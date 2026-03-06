import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Plans from './pages/Plans';
import Login from './pages/Login';
import CRM from './pages/CRM';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="members" element={<Members />} />
          <Route path="plans" element={<Plans />} />
          <Route path="crm" element={<CRM />} />
          <Route path="*" element={
            <div className="flex justify-center flex-col items-center h-full gap-4">
              <h2 className="heading-2 text-gradient">Coming Soon</h2>
              <p className="subtitle">This page is under construction.</p>
            </div>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
