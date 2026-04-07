import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Members from './pages/Members/Members';
import Plans from './pages/Plans/Plans';
import Login from './pages/Login/Login';
import CRM from './pages/CRM/CRM';
import Trainer from './pages/Trainer/Trainer';
import MemberDetail from './pages/Members/Member Detail/MemberDetail';
import Attendance from './pages/Attendance/Attendance';
import WebsiteManager from './pages/WebsiteManager/WebsiteManager';
import Users from './pages/Settings/Users';
import GymProfile from './pages/Settings/GymProfile';
import Integrations from './pages/Settings/Integrations';
import Notifications from './pages/Settings/Notifications';
import Payments from './pages/Settings/Payments';
import Security from './pages/Settings/Security';
import HeroBannerManager from './pages/WebsiteManager/HeroBannerManager/HeroBannerManager';
import GalleryManager from './pages/WebsiteManager/GalleryManager/GalleryManager';
import TrainersPageManager from './pages/WebsiteManager/TrainersPageManager/TrainersPageManager';
import TestimonialsManager from './pages/WebsiteManager/TestimonialsManager/TestimonialsManager';
import ContactManager from './pages/WebsiteManager/ContactManager/ContactManager';
import PaymentRecords from './pages/Payments/PaymentRecords';
import PaymentDetail from './pages/Payments/PaymentDetail';
import SettingWrapper from './pages/Settings/SettingWrapper';
import Settings from './pages/Settings/Settings'
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { ThemeProvider } from './context/ThemeContext';
import StaffDetailModal from './pages/Settings/StaffDetailModal';

function App() {
  return (

    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="members" element={<Members />} />
            <Route path="members/:id" element={<MemberDetail />} />
            <Route path="membership-plans" element={<Plans />} />
            <Route path="lead-management" element={<CRM />} />
            <Route path="trainer" element={<Trainer />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="payments" element={<PaymentRecords />} />
            <Route path="payments/:id" element={<PaymentDetail />} />
            <Route path="website-manager" element={<WebsiteManager />} />
            <Route path="website-manager/hero-banner" element={<HeroBannerManager />} />
            <Route path="website-manager/gallery" element={<GalleryManager />} />
            <Route path="website-manager/trainers" element={<TrainersPageManager />} />
            <Route path="website-manager/testimonials" element={<TestimonialsManager />} />
            <Route path="website-manager/contact" element={<ContactManager />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<StaffDetailModal />} />
            <Route path="settings" element={<SettingWrapper />} >
              <Route index element={<Settings />} />
              <Route path="profile" element={<GymProfile />} />
              <Route path="integrations" element={<Integrations />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="payments" element={<Payments />} />
              <Route path="security" element={<Security />} />
            </Route>


            <Route path="*" element={
              <div className="coming-soon-container">
                <h2 className="heading-2 text-gradient">Coming Soon</h2>
                <p className="subtitle">This page is under construction.</p>
              </div>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>

  );
}

export default App;
