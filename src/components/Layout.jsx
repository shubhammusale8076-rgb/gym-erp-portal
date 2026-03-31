import React, { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
  Home,
  User,
  Calendar,
  Layers,
  Target,
  Dumbbell,
  Globe,
  ShieldCheck,
  Settings,
  LogOut,
  Bell,
  Search,
  ArrowUpRight,
  CreditCard
} from 'lucide-react';
import ProfileModal from './ProfileModal/ProfileModal';
import NotificationModal from './NotificationModal/NotificationModal';
import './Layout.css';

const Sidebar = () => {
  const navItems = [
    {
      category: 'MAIN',
      items: [
        { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
      ]
    },
    {
      category: 'OPERATIONS',
      items: [
        { name: 'Members List', path: '/members', icon: <User size={20} /> },
        { name: 'Attendance', path: '/attendance', icon: <Calendar size={20} /> },
        { name: 'Payments', path: '/payments', icon: <CreditCard size={20} /> },
        { name: 'Membership Plans', path: '/plans', icon: <Layers size={20} /> },
        { name: 'CRM / Leads', path: '/crm', icon: <Target size={20} /> },
        { name: 'Trainers', path: '/trainer', icon: <Dumbbell size={20} /> },
        { name: 'Users', path: '/users', icon: <ShieldCheck size={20} /> },
      ]
    },
    {
      category: 'WEBSITE',
      items: [
        { name: 'Website Manager', path: '/website-manager', icon: <Globe size={20} /> },
        { name: 'Hero Banner', path: '/website-manager/hero-banner', icon: <Globe size={20} /> },
        { name: 'Gallery', path: '/website-manager/gallery', icon: <Globe size={20} /> },
        { name: 'Trainers (Web)', path: '/website-manager/trainers', icon: <Globe size={20} /> },
        { name: 'Testimonials', path: '/website-manager/testimonials', icon: <Globe size={20} /> },
        { name: 'Contact Info', path: '/website-manager/contact', icon: <Globe size={20} /> },
      ]
    },
    {
      category: 'SETTINGS',
      items: [

        { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
      ]
    }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon"></div>
          <h2>Elite Club</h2>
        </div>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((group, idx) => (
          <div key={idx} className="sidebar-group">
            <h3 className="sidebar-section-title">{group.category}</h3>
            {group.items.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
      <div className="sidebar-footer">

        <button className="nav-item logout-btn">
          <LogOut size={20} />
          <span>Log Out</span>
        </button>
      </div>

      {/* </div> */}
    </aside>
  );
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const mainContentRef = useRef(null);

  useEffect(() => {
    // Find the scrollable main-content container
    const scrollContainer = document.querySelector('.main-content');
    if (!scrollContainer) return;

    const handleScroll = () => {
      setScrolled(scrollContainer.scrollTop > 10);
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <div className="header-wrapper">
        <div className="header-left">
          <h1 className="header-title">Welcome back Shubham 👋</h1>
        </div>
        <div className="header-right">
          <div className="header-search">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search courses" className="search-input" />
          </div>

          <div className="header-actions">
            <button className="icon-btn" onClick={() => setIsNotifOpen(true)}>
              <Bell size={20} strokeWidth={2} color="#5d5d6c" />
              <span className="header-badge">3</span>
            </button>
            <button className="header-avatar" onClick={() => setIsProfileOpen(true)}>
              <span className="header-avatar-initials">TA</span>
            </button>
          </div>
        </div>
      </div>

      {isProfileOpen && (
        <ProfileModal onClose={() => setIsProfileOpen(false)} />
      )}

      {isNotifOpen && (
        <NotificationModal onClose={() => setIsNotifOpen(false)} />
      )}
    </header>
  );
};

const Layout = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
