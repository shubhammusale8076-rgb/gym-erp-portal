import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Members from './pages/Members/Members';
import Plans from './pages/Plans/Plans';
import Login from './pages/Login/Login';
import CRM from './pages/CRM/CRM';
import Trainer from './pages/Trainer/Trainer';
import MemberDetail from './pages/Members/MemberDetail/MemberDetail';
import Attendance from './pages/Attendance/Attendance';
import Finance from './pages/Finance/Finance';
import Invoices from './pages/Invoices/Invoices';
import Reports from './pages/Reports/Reports';
import Settings from './pages/Settings/Settings';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="members" element={<Members />} />
          <Route path="members/:id" element={<MemberDetail />} />
          <Route path="plans" element={<Plans />} />
          <Route path="crm" element={<CRM />} />
          <Route path="trainer" element={<Trainer />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="finance" element={<Finance />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
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
