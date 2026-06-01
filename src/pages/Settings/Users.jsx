import { getToken, getUserId, getRole } from '../../utils/auth';
import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, X, Shield, User, Eye, EyeOff, AlertTriangle, UserPlus, TrendingUp, CalendarCheck, Activity, Users2 } from 'lucide-react';
import './Users.css';
import PageHeader from '../../components/PageHeader/PageHeader';
import KpiCard from '../../components/KpiCard/KpiCard';
import FilterButtons from '../../components/FilterButtons/FilterButtons';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../apiservice/apiservice';
import Pagination from '../../components/Pagination/Pagination';

const ROLES = [
  { label: 'Admin', value: 'ROLE_ADMIN' },
  { label: 'Owner', value: 'ROLE_OWNER' },
  { label: 'Manager', value: 'ROLE_MANAGER' },
  { label: 'Staff', value: 'ROLE_STAFF' },
  { label: 'Trainer', value: 'ROLE_TRAINER' },
  { label: 'Receptionist', value: 'ROLE_RECEPTIONIST' },
  { label: 'Member', value: 'ROLE_MEMBER' },
];
const STATUS_OPTIONS = ['Active', 'Inactive'];


const emptyForm = { name: '', email: '', role: 'ROLE_STAFF', status: 'Active', password: '', confirmPassword: '' };

const roleColors = {
  ROLE_ADMIN: { bg: '#ede9fe', color: '#7c3aed' },
  ROLE_MANAGER: { bg: '#dbeafe', color: '#1d4ed8' },
  ROLE_STAFF: { bg: '#e0f2fe', color: '#0369a1' },
  ROLE_TRAINER: { bg: '#dcfce7', color: '#15803d' },
  ROLE_RECEPTIONIST: { bg: '#fef9c3', color: '#a16207' },
  ROLE_OWNER: { bg: '#fef3c7', color: '#92400e' },
  ROLE_MEMBER: { bg: '#fdc7feff', color: '#920e8cff' },
};

const getRoleStyle = (authority) => roleColors[authority] || { bg: '#f1f5f9', color: '#475569' };

export default function Users() {
  const navigate = useNavigate();
  const token = getToken();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [modalMode, setModalMode] = useState(null); // 'create' | 'edit' | 'delete'
  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const fetchAllUsers = async () => {
    try {
      const response = await getAllUsers(token);
      console.log("users", response)
      setUsers(response);
    } catch (error) {
      console.error('Error:', error.response || error.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = roleFilter === 'All' || u.authority === roleFilter;
    return matchSearch && matchRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / pageSize) || 1;
  const currentUsers = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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

  const getRoleLabel = (value) => {
    return ROLES.find(r => r.value === value)?.label || value;
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
        <KpiCard title="Active Users" value={users.filter((u) => u.enabled === true).length} theme="blue" Icon={TrendingUp} />
        <KpiCard title="Inactive Users" value={users.filter((u) => u.enabled === false).length} theme="purple" Icon={CalendarCheck} />
        <KpiCard title="Admins" value={users.filter((u) => u.authority === 'ROLE_ADMIN').length} theme="orange" Icon={Activity} />
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
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <div className="users-filter-buttons">

            <FilterButtons
              options={['All', ...ROLES.map(r => ({ label: r.label, value: r.value }))]}
              selected={roleFilter}
              onChange={(val) => { setRoleFilter(val); setCurrentPage(1); }}
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
              {currentUsers.map((user) => {
                const rs = getRoleStyle(user.authority);
                return (
                  <tr key={user.id} className="users-table-row">
                    <td onClick={() => navigate(`/users/${user.id}`)} style={{ cursor: 'pointer' }}>
                      <div className="users-name-col">
                        <div className="user-avatar" style={{ background: rs.bg, color: rs.color }}>
                          {user.fullName.charAt(0)}
                        </div>
                        <div>
                          <p className="users-font-medium" >{user.fullName}</p>
                          <p className="users-text-sm" >{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td onClick={() => { setSelectedUser(user); setModalMode('view'); }} style={{ cursor: 'pointer' }}>
                      <span className="role-badge" style={{ background: rs.bg, color: rs.color }}>
                        {getRoleLabel(user.authority)}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${user.enabled ? 'badge-success' : 'badge-danger'}`}>
                        {user.enabled ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td >{user.creationDate}</td>
                    <td>
                      {user.lastLoginDate
                        ? new Date(user.lastLoginDate).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                        : "Not logged in yet"}
                    </td>
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
            Showing {filteredUsers.length > 0 ? ((currentPage - 1) * pageSize) + 1 : 0} to {Math.min(currentPage * pageSize, filteredUsers.length)} of {filteredUsers.length} users
          </p>
          {filteredUsers.length > pageSize && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
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

    </div>
  );
}
