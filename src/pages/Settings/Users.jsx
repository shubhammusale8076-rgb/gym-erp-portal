import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, X, Shield, User, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import './Users.css';

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
    <div className="page-container users-page">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="heading-1">User Management</h1>
          <p className="subtitle mt-1">Manage system users, roles, and access permissions.</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <Plus size={18} /> Add User
        </button>
      </div>

      {/* Stats Strip */}
      <div className="users-stats-strip glass-card mb-6">
        <div className="stat-chip">
          <span className="stat-chip-value">{users.length}</span>
          <span className="stat-chip-label">Total Users</span>
        </div>
        <div className="stat-chip-divider" />
        <div className="stat-chip">
          <span className="stat-chip-value" style={{ color: 'var(--success)' }}>
            {users.filter((u) => u.status === 'Active').length}
          </span>
          <span className="stat-chip-label">Active</span>
        </div>
        <div className="stat-chip-divider" />
        <div className="stat-chip">
          <span className="stat-chip-value" style={{ color: 'var(--danger)' }}>
            {users.filter((u) => u.status === 'Inactive').length}
          </span>
          <span className="stat-chip-label">Inactive</span>
        </div>
        <div className="stat-chip-divider" />
        <div className="stat-chip">
          <span className="stat-chip-value" style={{ color: '#7c3aed' }}>
            {users.filter((u) => u.role === 'Admin').length}
          </span>
          <span className="stat-chip-label">Admins</span>
        </div>
      </div>

      {/* Table Card */}
      <div className="glass-panel p-6">
        {/* Filters */}
        <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
          <div className="header-search" style={{ margin: 0, width: '100%', maxWidth: '380px' }}>
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search users by name or email…"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3 flex-wrap">
            {['All', ...ROLES].map((r) => (
              <button
                key={r}
                className={`role-filter-btn ${roleFilter === r ? 'active' : ''}`}
                onClick={() => setRoleFilter(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Created</th>
                <th>Last Login</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const rs = getRoleStyle(user.role);
                return (
                  <tr key={user.id} className="users-table-row">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="user-avatar" style={{ background: rs.bg, color: rs.color }}>
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{user.name}</p>
                          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="role-badge" style={{ background: rs.bg, color: rs.color }}>
                        <Shield size={11} />
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${user.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{user.createdAt}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{user.lastLogin}</td>
                    <td>
                      <div className="flex justify-end gap-2">
                        <button
                          className="icon-btn"
                          title="Edit user"
                          onClick={(e) => openEdit(user, e)}
                          style={{ width: '32px', height: '32px' }}
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          className="icon-btn icon-btn-danger"
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
            <div className="text-center py-8">
              <User size={36} style={{ color: 'var(--text-muted)', margin: '0 auto 0.75rem' }} />
              <p style={{ color: 'var(--text-muted)' }}>No users found{searchTerm ? ` for "${searchTerm}"` : ''}.</p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-border-light">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Showing {filteredUsers.length} of {users.length} users
          </p>
        </div>
      </div>

      {/* ===== CREATE / EDIT MODAL ===== */}
      {(modalMode === 'create' || modalMode === 'edit') && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="heading-3">{modalMode === 'create' ? 'Add New User' : 'Edit User'}</h2>
              <button className="icon-btn" onClick={closeModal}><X size={18} /></button>
            </div>

            <div className="modal-body">
              {/* Name */}
              <div className="input-group">
                <label className="input-label">Full Name <span className="required">*</span></label>
                <input
                  type="text"
                  className={`input-field ${errors.name ? 'input-error' : ''}`}
                  placeholder="e.g. Ravi Sharma"
                  value={form.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                />
                {errors.name && <span className="error-msg">{errors.name}</span>}
              </div>

              {/* Email */}
              <div className="input-group">
                <label className="input-label">Email Address <span className="required">*</span></label>
                <input
                  type="email"
                  className={`input-field ${errors.email ? 'input-error' : ''}`}
                  placeholder="e.g. ravi@gymsync.com"
                  value={form.email}
                  onChange={(e) => handleFormChange('email', e.target.value)}
                />
                {errors.email && <span className="error-msg">{errors.email}</span>}
              </div>

              {/* Role & Status — side by side */}
              <div className="modal-row-2">
                <div className="input-group">
                  <label className="input-label">Role <span className="required">*</span></label>
                  <select
                    className="input-field"
                    value={form.role}
                    onChange={(e) => handleFormChange('role', e.target.value)}
                  >
                    {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">Status <span className="required">*</span></label>
                  <select
                    className="input-field"
                    value={form.status}
                    onChange={(e) => handleFormChange('status', e.target.value)}
                  >
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* Password */}
              <div className="input-group">
                <label className="input-label">
                  Password {modalMode === 'edit' && <span className="optional-label">(leave blank to keep current)</span>}
                  {modalMode === 'create' && <span className="required">*</span>}
                </label>
                <div className="password-field-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`input-field ${errors.password ? 'input-error' : ''}`}
                    placeholder="Min. 6 characters"
                    value={form.password}
                    onChange={(e) => handleFormChange('password', e.target.value)}
                  />
                  <button type="button" className="password-toggle" onClick={() => setShowPassword((v) => !v)}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <span className="error-msg">{errors.password}</span>}
              </div>

              {/* Confirm Password */}
              <div className="input-group">
                <label className="input-label">
                  Confirm Password {modalMode === 'create' && <span className="required">*</span>}
                </label>
                <div className="password-field-wrapper">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className={`input-field ${errors.confirmPassword ? 'input-error' : ''}`}
                    placeholder="Re-enter password"
                    value={form.confirmPassword}
                    onChange={(e) => handleFormChange('confirmPassword', e.target.value)}
                  />
                  <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword((v) => !v)}>
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword}</span>}
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}>
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
    </div>
  );
}
