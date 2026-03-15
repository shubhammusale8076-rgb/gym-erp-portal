import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Members from './pages/Members/Members';
import Plans from './pages/Plans/Plans';
import Login from './pages/Login/Login';
import CRM from './pages/CRM/CRM';
import Trainer from './pages/Trainer/Trainer';
import MemberDetail from './pages/Members/Member detail/MemberDetail';
import Attendance from './pages/Attendance/Attendance';
import WebsiteManager from './pages/WebsiteManager/WebsiteManager';
import Users from './pages/Settings/Users';
import HeroBannerManager from './pages/WebsiteManager/HeroBannerManager/HeroBannerManager';
import GalleryManager from './pages/WebsiteManager/GalleryManager/GalleryManager';
import TrainersPageManager from './pages/WebsiteManager/TrainersPageManager/TrainersPageManager';
import TestimonialsManager from './pages/WebsiteManager/TestimonialsManager/TestimonialsManager';
import ContactManager from './pages/WebsiteManager/ContactManager/ContactManager';

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
          <Route path="trainer" element={<Trainer/>} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="website-manager" element={<WebsiteManager />} />
          <Route path="website-manager/hero-banner" element={<HeroBannerManager />} />
          <Route path="website-manager/gallery" element={<GalleryManager />} />
          <Route path="website-manager/trainers" element={<TrainersPageManager />} />
          <Route path="website-manager/testimonials" element={<TestimonialsManager />} />
          <Route path="website-manager/contact" element={<ContactManager />} />
          <Route path="settings/users" element={<Users />} />
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
