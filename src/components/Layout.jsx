import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, CreditCard, Settings, LogOut, Menu, Bell, Search, CalendarDays } from 'lucide-react';
import './Layout.css';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Members List', path: '/members', icon: <Users size={20} /> },
    { name: 'Attendance', path: '/attendance', icon: <CalendarDays size={20} /> },
    { name: 'Membership Plans', path: '/plans', icon: <CreditCard size={20} /> },
    { name: 'CRM / Leads', path: '/crm', icon: <Users size={20} /> },
    { name: 'Trainers', path: '/trainer', icon: <Users size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
    { name: 'Home Page', path: '/home-page', icon: <Settings size={20} /> },
  ];

  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon"></div>
          <h2>GymSync</h2>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <button className="nav-item logout-btn">
          <LogOut size={20} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

const Header = () => {
  return (
    <header className="header glass-panel">
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
