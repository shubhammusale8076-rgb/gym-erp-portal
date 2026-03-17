import React from 'react';
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
  ArrowUpRight
} from 'lucide-react';
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
        { name: 'Membership Plans', path: '/plans', icon: <Layers size={20} />, badge: 'New' },
        { name: 'CRM / Leads', path: '/crm', icon: <Target size={20} /> },
        { name: 'Trainers', path: '/trainer', icon: <Dumbbell size={20} /> },
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
        { name: 'Users', path: '/settings/users', icon: <ShieldCheck size={20} /> },
        { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
      ]
    }
  ];

  return (
    <aside className="sidebar">
    <div className="sidebar-wrapper">
      
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon"></div>
            <h2>GymSync</h2>
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
                  {item.badge && <span className="sidebar-nav-badge">{item.badge}</span>}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-app-banner">
            <div className="banner-icon-bg">
              <ArrowUpRight size={20} />
            </div>
            <div className="banner-content">
              <p className="banner-title">Download our mobile app</p>
            </div>
            <div className="banner-decoration">
              <div className="decoration-dots">
                <div className="dot-line long"></div>
                <div className="dot-line"></div>
                <div className="dot-line long"></div>
                <div className="dot-line"></div>
              </div>
            </div>
          </div>
          <button className="nav-item logout-btn">
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        </div>
        
    </div>
    </aside>
  );
};

const Header = () => {
  return (
    <header className="header ">
      <div className="header-search">
        <Search size={18} className="search-icon" />
        <input type="text" placeholder="Search members, plans..." className="search-input" />
      </div>

      <div className="header-actions">
        <button className="icon-btn position-relative">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>
        <div className="user-profile">
          <img src="https://ui-avatars.com/api/?name=Admin+User&background=10b981&color=fff" alt="Profile" className="avatar" />
          <div className="user-info">
            <span className="user-name">Admin User</span>
            <span className="user-role">Manager</span>
          </div>
        </div>
      </div>
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
