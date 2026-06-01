import React, { useState, useEffect } from 'react';
import './RoleModal.css';
import { X, Shield, Users, Lock, ChevronRight } from 'lucide-react';

function RoleModal({ isOpen, onClose, onSave, role = null }) {
    const [formData, setFormData] = useState({
        roleCode: '',
        roleDescription: '',
        // permissions: {
        //     financialReports: false,
        //     memberCheckIn: false,
        //     staffScheduling: false,
        //     inventory: false
        // }
    });

    useEffect(() => {
        if (role) {
            setFormData({
                roleCode: role.roleCode || '',
                roleDescription: role.roleDescription || '',
                // permissions: role.permissions || {
                //     financialReports: false,
                //     memberCheckIn: false,
                //     staffScheduling: false,
                //     inventory: false
                // }
            });
        } else {
            setFormData({
                roleCode: '',
                roleDescription: '',
                // permissions: {
                //     financialReports: false,
                //     memberCheckIn: false,
                //     staffScheduling: false,
                //     inventory: false
                // }
            });
        }
    }, [role, isOpen]);

    if (!isOpen) return null;

    const handleToggle = (key) => {
        setFormData(prev => ({
            ...prev,
            permissions: {
                ...prev.permissions,
                [key]: !prev.permissions[key]
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="modal-overlay">
            <div className="role-modal">

                <header className="modal-header">
                    <div>
                        <h2>{role ? 'Update Role' : 'Add New Role'}</h2>
                        <p>Define specific permissions and responsibilities for your elite gym staff members.</p>
                    </div>
                    <button className="close-modal-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </header>

                <div className="modal-body">
                    <div className="modal-form-section">

                        <form onSubmit={handleSubmit} className="role-form">
                            <div className="form-group">
                                <label>ROLE TITLE</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Wellness Concierge"
                                    value={formData.roleCode}
                                    onChange={(e) => setFormData({ ...formData, roleCode: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>ROLE DESCRIPTION</label>
                                <textarea
                                    placeholder="Describe the core focus and premium member experience requirements..."
                                    value={formData.roleDescription}
                                    onChange={(e) => setFormData({ ...formData, roleDescription: e.target.value })}
                                    required
                                />
                            </div>

                            {/* <div className="permission-matrix">
                                <label className="matrix-label">PERMISSION MATRIX</label>
                                <div className="matrix-grid">
                                    <div className="permission-item">
                                        <div className="perm-info">
                                            <h4>Financial Reports</h4>
                                            <p>Access to revenue data and payroll</p>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={formData.permissions.financialReports}
                                                onChange={() => handleToggle('financialReports')}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>

                                    <div className="permission-item">
                                        <div className="perm-info">
                                            <h4>Member Check-in</h4>
                                            <p>Entry management and guest logs</p>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={formData.permissions.memberCheckIn}
                                                onChange={() => handleToggle('memberCheckIn')}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>

                                    <div className="permission-item">
                                        <div className="perm-info">
                                            <h4>Staff Scheduling</h4>
                                            <p>Manage shift rotations</p>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={formData.permissions.staffScheduling}
                                                onChange={() => handleToggle('staffScheduling')}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>

                                    <div className="permission-item">
                                        <div className="perm-info">
                                            <h4>Inventory</h4>
                                            <p>Order equipment and retail stock</p>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={formData.permissions.inventory}
                                                onChange={() => handleToggle('inventory')}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                </div>
                            </div> */}
                        </form>
                    </div>

                    <div className="modal-preview-section">
                        <div className="impact-card">
                            <img src="/assets/role_preview.png" alt="Staff Portrait" className="impact-img" />
                            <div className="impact-overlay">
                                <h6>ROLE IMPACT</h6>
                                <h3>Elevate the Member Journey</h3>
                                <p>Roles at Aura Premium aren't just job descriptions; they are curated experiences for our members.</p>
                            </div>
                        </div>

                        {/* <div className="summary-preview">
                            <h4>Summary Preview</h4>
                            <div className="summary-list">
                                <div className="summary-item">
                                    <span className="label">Hierarchy Level</span>
                                    <span className="value">Staff Tier 2</span>
                                </div>
                                <div className="summary-item">
                                    <span className="label">Auth Level</span>
                                    <span className="value">Standard Operations</span>
                                </div>
                                <div className="summary-item">
                                    <span className="label">Security Group</span>
                                    <span className="value">Core Management</span>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>

                <footer className="modal-footer">
                    <button type="button" className="discard-btn" onClick={onClose}>DISCARD CHANGES</button>
                    <div className="footer-actions">
                        <button type="button" className="save-draft-btn">SAVE DRAFT</button>
                        <button type="submit" className="submit-btn" onClick={handleSubmit}>
                            {role ? 'Update Role' : 'Create Role'}
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default RoleModal;
