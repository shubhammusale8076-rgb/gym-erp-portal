import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, X, Shield, User, Eye, EyeOff, AlertTriangle, UserPlus, TrendingUp, CalendarCheck, Activity, Users2 } from 'lucide-react';
import './Users.css';
import PageHeader from '../../components/PageHeader/PageHeader';
import KpiCard from '../../components/KpiCard/KpiCard';
import FilterButtons from '../../components/FilterButtons/FilterButtons';
import StaffDetailModal from './StaffDetailModal';
import { useNavigate } from 'react-router-dom';

const ROLES = ['Admin', 'Manager', 'Staff', 'Trainer', 'Receptionist'];
const STATUS_OPTIONS = ['Active', 'Inactive'];

const initialUsers = [
  { id: 1, name: 'Ravi Sharma', email: 'ravi@gymsync.com', role: 'Admin', status: 'Active', createdAt: '2025-06-10', lastLogin: '2026-03-14' },
  { id: 2, name: 'Priya Patel', email: 'priya@gymsync.com', role: 'Manager', status: 'Active', createdAt: '2025-08-01', lastLogin: '2026-03-13' },
  { id: 3, name: 'Arjun Mehta', email: 'arjun@gymsync.com', role: 'Trainer', status: 'Active', createdAt: '2025-09-15', lastLogin: '2026-03-10' },
  { id: 4, name: 'Sneha Joshi', email: 'sneha@gymsync.com', role: 'Receptionist', status: 'Inactive', createdAt: '2025-11-20', lastLogin: '2026-01-05' },
  { id: 5, name: 'Karan Singh', email: 'karan@gymsync.com', role: 'Staff', status: 'Active', createdAt: '2026-01-08', lastLogin: '2026-03-14' },
];

const emptyForm = { name: '', email: '', role: 'Staff', status: 'Active', password: '', confirmPassword: '' };

const roleColors = {
  Admin: { bg: '#ede9fe', color: '#7c3aed' },
  Manager: { bg: '#dbeafe', color: '#1d4ed8' },
  Staff: { bg: '#e0f2fe', color: '#0369a1' },
  Trainer: { bg: '#dcfce7', color: '#15803d' },
  Receptionist: { bg: '#fef9c3', color: '#a16207' },
};

const getRoleStyle = (role) => roleColors[role] || { bg: '#f1f5f9', color: '#475569' };

export default function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [modalMode, setModalMode] = useState(null); // 'create' | 'edit' | 'delete'
  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = roleFilter === 'All' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const openCreate = () => {
    setForm(emptyForm);
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
    setSelectedUser(null);
    setModalMode('create');
  };

  const openEdit = (user, e) => {
    e.stopPropagation();
    setForm({ name: user.name, email: user.email, role: user.role, status: user.status, password: '', confirmPassword: '' });
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
    setSelectedUser(user);
    setModalMode('edit');
  };

  const openDelete = (user, e) => {
    e.stopPropagation();
    setSelectedUser(user);
    setModalMode('delete');
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedUser(null);
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email.';
    if (modalMode === 'create') {
      if (!form.password) errs.password = 'Password is required.';
      else if (form.password.length < 6) errs.password = 'Must be at least 6 characters.';
      if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match.';
    } else if (form.password && form.password.length < 6) {
      errs.password = 'Must be at least 6 characters.';
    } else if (form.password && form.password !== form.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }
    // Check email uniqueness
    const duplicate = users.find(
      (u) => u.email.toLowerCase() === form.email.toLowerCase() && u.id !== selectedUser?.id
    );
    if (duplicate) errs.email = 'This email is already in use.';
    return errs;
  };

  const handleSave = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    if (modalMode === 'create') {
      const newUser = {
        id: Date.now(),
        name: form.name.trim(),
        email: form.email.trim(),
        role: form.role,
        status: form.status,
        createdAt: new Date().toISOString().split('T')[0],
        lastLogin: '—',
      };
      setUsers((prev) => [newUser, ...prev]);
    } else {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id
            ? { ...u, name: form.name.trim(), email: form.email.trim(), role: form.role, status: form.status }
            : u
        )
      );
    }
    closeModal();
  };

  const handleDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
    closeModal();
  };

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const e = { ...prev }; delete e[field]; return e; });
  };

  return (
    <div className="users-page">
      <PageHeader
        title="User Management"
        subtitle="Manage system users, roles, and access permissions."
        actions={[
          {
            label: " Add User",
            icon: <UserPlus size={16} />,
            onClick: openCreate,
            className: "btn-primary"
          }
        ]}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', margin: '24px 0' }}>
        <KpiCard title="Total Users" value={users.length} theme="teal" Icon={Users2} />
        <KpiCard title="Active Users" value="42,500" theme="blue" Icon={TrendingUp} />
        <KpiCard title="Inactive Users" value="342" theme="purple" Icon={CalendarCheck} />
        <KpiCard title="Admins" value="24" theme="orange" Icon={Activity} />
      </div>

      <div className="users-panel">
        <div className="users-filter-bar">
          <div className="search-bar-wrapper">
            <Search size={18} className="search-icon-inline" />

            <input
              type="text"
              placeholder="Search users by name or email…"
              className="search-input-pill"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="users-filter-buttons">
         
            <FilterButtons
              options={['All', ...ROLES]}
              selected={roleFilter}
              onChange={setRoleFilter}
            />
          </div>
        </div>

        {/* Table */}
        <div className="table-container-wrapper">
          <table className="table-container">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Created</th>
                <th>Last Login</th>
                <th className="users-col-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const rs = getRoleStyle(user.role);
                return (
                  <tr key={user.id} className="users-table-row">
                    <td onClick={() => navigate(`/users/${user.id}`)} style={{ cursor: 'pointer' }}>
                      <div className="users-name-col">
                        <div className="user-avatar" style={{ background: rs.bg, color: rs.color }}>
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="users-font-medium" >{user.name}</p>
                          <p className="users-text-sm" >{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td onClick={() => { setSelectedUser(user); setModalMode('view'); }} style={{ cursor: 'pointer' }}>
                      <span className="role-badge" style={{ background: rs.bg, color: rs.color }}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${user.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td >{user.createdAt}</td>
                    <td >{user.lastLogin}</td>
                    <td>
                      <div className="users-actions-col">
                        <button
                          className="action-icon-btn edit-btn"
                          title="Edit user"
                          onClick={(e) => openEdit(user, e)}
                          style={{ width: '32px', height: '32px' }}
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          className="action-icon-btn delete-btn"
                          title="Delete user"
                          onClick={(e) => openDelete(user, e)}
                          style={{ width: '32px', height: '32px' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="users-empty-state">
              <User size={36} style={{ color: 'var(--text-muted)', margin: '0 auto 0.75rem' }} />
              <p style={{ color: 'var(--text-muted)' }}>No users found{searchTerm ? ` for "${searchTerm}"` : ''}.</p>
            </div>
          )}
        </div>

        <div className="users-footer">
          <p className="users-text-sm" style={{ color: 'var(--text-muted)' }}>
            Showing {filteredUsers.length} of {users.length} users
          </p>
        </div>
      </div>

      {/* ===== CREATE / EDIT MODAL ===== */}
      {(modalMode === 'create' || modalMode === 'edit') && (
        <div className="modal-overlay add-user-overlay" onClick={closeModal}>
          <div className="add-user-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="add-user-modal-header">
              <button className="close-action-btn" onClick={closeModal}><X size={20} /></button>
              <h2 className="title">{modalMode === 'create' ? 'Add New User' : 'Edit User'}</h2>
              <p className="subtitle">Configure credentials and access levels for new staff members.</p>
            </div>

            <div className="add-user-modal-body">
              <div className="input-grid">
                
                {/* Name */}
                <div className="add-user-input-group">
                  <label className="add-user-label">FULL NAME {errors.name && <span className="error-msg-inline">*</span>}</label>
                  <input
                    type="text"
                    className={`add-user-field ${errors.name ? 'input-error' : ''}`}
                    placeholder="e.g. Alexander Vance"
                    value={form.name}
                    onChange={(e) => handleFormChange('name', e.target.value)}
                  />
                </div>

                {/* Email */}
                <div className="add-user-input-group">
                  <label className="add-user-label">EMAIL ADDRESS {errors.email && <span className="error-msg-inline">*</span>}</label>
                  <input
                    type="email"
                    className={`add-user-field ${errors.email ? 'input-error' : ''}`}
                    placeholder="alex@eliteclub.com"
                    value={form.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                  />
                </div>

                {/* Role */}
                <div className="add-user-input-group">
                  <label className="add-user-label">ROLE</label>
                  <div className="select-wrapper">
                    <select
                      className="add-user-field select-field"
                      value={form.role}
                      onChange={(e) => handleFormChange('role', e.target.value)}
                    >
                      {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                </div>

                {/* Status */}
                <div className="add-user-input-group">
                  <label className="add-user-label">STATUS</label>
                  <div className="select-wrapper">
                    <select
                      className="add-user-field select-field"
                      value={form.status}
                      onChange={(e) => handleFormChange('status', e.target.value)}
                    >
                      {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                {/* Password */}
                <div className="add-user-input-group">
                  <label className="add-user-label">
                    PASSWORD {errors.password && <span className="error-msg-inline">*</span>}
                  </label>
                  <div className="add-user-password-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className={`add-user-field ${errors.password ? 'input-error' : ''}`}
                      placeholder="• • • • • • • •"
                      value={form.password}
                      onChange={(e) => handleFormChange('password', e.target.value)}
                    />
                    <button type="button" className="pw-toggle" onClick={() => setShowPassword((v) => !v)}>
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="add-user-input-group">
                  <label className="add-user-label">
                    CONFIRM PASSWORD {errors.confirmPassword && <span className="error-msg-inline">*</span>}
                  </label>
                  <div className="add-user-password-wrapper">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className={`add-user-field ${errors.confirmPassword ? 'input-error' : ''}`}
                      placeholder="• • • • • • • •"
                      value={form.confirmPassword}
                      onChange={(e) => handleFormChange('confirmPassword', e.target.value)}
                    />
                    <button type="button" className="pw-toggle" onClick={() => setShowConfirmPassword((v) => !v)}>
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                
              </div>
            </div>

            <div className="add-user-modal-footer">
              <button className="btn-cancel-text" onClick={closeModal}>Cancel</button>
              <button className="btn-solid-purple-pill" onClick={handleSave}>
                {modalMode === 'create' ? 'Create User' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== DELETE CONFIRM MODAL ===== */}
      {modalMode === 'delete' && selectedUser && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-dialog modal-dialog-sm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="heading-3">Delete User</h2>
              <button className="icon-btn" onClick={closeModal}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="delete-confirm-content">
                <div className="delete-icon-wrapper">
                  <AlertTriangle size={28} color="var(--danger)" />
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  Are you sure you want to delete <strong>{selectedUser.name}</strong>? This action cannot be undone and will revoke their access immediately.
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
              <button className="btn btn-danger" onClick={handleDelete}>
                <Trash2 size={15} /> Delete User
              </button>
            </div>
          </div>
        </div>
      )}

      <StaffDetailModal 
        isOpen={modalMode === 'view'} 
        onClose={closeModal} 
        staffUser={selectedUser} 
      />
    </div>
  );
}
