import React, { useEffect } from 'react';
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
import Integrations from './pages/Settings/Integration/Integrations';
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
import IntegrationDetails from './pages/Settings/Integration/IntegrationDetails';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { ThemeProvider } from './context/ThemeContext';
import IntegrationSetupPage from './pages/Settings/Integration/IntegrationSetupPage';
import IntegrationWizard from './components/integration-wizard/IntegrationWizard';
import Events from './pages/Events/Events';
import TrainerDetails from './pages/Trainer/TrainerDetails';
import TrainerAssignmentManager from './pages/Trainer/TrainerAssignmentManager';
import TrainerAttendance from './pages/Trainer/TrainerAttendance';
import Toast from './components/Toast/Toast';
import Roles from './pages/Settings/Roles';

import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import MembershipManagement from './pages/Members/MembershipManagement/MembershipManagement';
import MemberSubscriptionPage from './pages/Members/MemberSubscriptionPage/MemberSubscriptionPage';
import IntegrationStatusPage from './pages/Settings/Integration/IntegrationStatusPage';

import SessionModal from './components/SessionModal/SessionModal';
import { useIdleTimeout } from './hooks/useIdleTimeout';
import { useDispatch } from 'react-redux';
import { logout, sessionExpired } from './redux/authSlice';
import PaymentPage from './pages/Payments/PaymentPage';

const AppContent = () => {
  useIdleTimeout();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'auth_sync_logout') {
        dispatch(logout());
      } else if (e.key === 'auth_sync_login') {
        // Option to reload or sync login state
        window.location.reload();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <SessionModal />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="members" element={<Members />} />
            <Route path="members/:id" element={<MemberDetail />} />
            <Route path="membership-plans" element={<Plans />} />
            <Route path="membership-management" element={<MembershipManagement />} />
            <Route path="members/:id/subscription" element={<MemberSubscriptionPage />} />
            <Route path="lead-management" element={<CRM />} />
            <Route path="trainer" element={<Trainer />} />
            <Route path="trainer/:id" element={<TrainerDetails />} />
            <Route path="trainer/assignment-member" element={<TrainerAssignmentManager />} />
            <Route path="trainer-attendance" element={<TrainerAttendance />} />
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
            <Route path="payment/:token" element={<PaymentPage />}/>
            <Route path="settings" element={<SettingWrapper />} >
              <Route index element={<Settings />} />
              <Route path="profile" element={<GymProfile />} />
              <Route path="integrations" element={<Integrations />} />
              <Route path="roles" element={<Roles />} />
              <Route path="integrations/:provider/details" element={<IntegrationDetails />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="payments" element={<Payments />} />
              <Route path="security" element={<Security />} />
            </Route>
            <Route path="integrations/:provider" element={<IntegrationSetupPage />} />
            <Route path="integrations/:provider/setup" element={<IntegrationWizard />} />
            <Route path="integrations" element={<IntegrationStatusPage />} />
            <Route path="events" element={<Events />} />


            <Route path="*" element={
              <div className="coming-soon-container">
                <h2 className="heading-2 text-gradient">Coming Soon</h2>
                <p className="subtitle">This page is under construction.</p>
              </div>
            } />
          </Route>

        </Route>

      </Routes>

      <Toast />
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
