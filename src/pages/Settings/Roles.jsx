import React, { useEffect, useMemo, useState } from 'react';
import './Roles.css';
import {
    ShieldCheck,
    Search,
    Plus,
    Users,
    Settings2,
    Trash2,
    Edit2,
    ChevronRight,
    ChevronDown,
    AlertTriangle,
    CheckCircle2,
    XCircle,
    UserPlus,
    Lock,
    Activity,
    BadgeCheck,
    LayoutGrid,
    Table2,
    Filter,
    User,
} from 'lucide-react';

import { useDispatch } from 'react-redux';
import { showToast } from '../../redux/toastSlice';

import {
    getAllRoles,
    createRole,
    updateRole,
    searchUser,
    assignUsersToRole,
} from '../../apiservice/apiservice';

import RoleModal from '../../components/RoleModal/RoleModal';
import Pagination from '../../components/Pagination/Pagination';
import KpiCard from '../../components/KpiCard/KpiCard';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';

function Roles() {
    const dispatch = useDispatch();

    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('ALL');
    const [viewMode, setViewMode] = useState('LIST');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [assignUserModal, setAssignUserModal] = useState(false);

    const [userSearch, setUserSearch] = useState('');
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [searchingUsers, setSearchingUsers] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);


    const [expandedModules, setExpandedModules] = useState({
        Members: true,
        Payments: true,
        Staff: true,
        Reports: false,
    });

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;


    const fetchAllRoles = async () => {
        try {
            const response = await getAllRoles();

            const updated = response.map((role, index) => ({
                ...role,
                isSystemRole: index < 2,
                risk:
                    role.roleCode === 'ADMIN'
                        ? 'HIGH'
                        : role.roleCode === 'MANAGER'
                            ? 'MEDIUM'
                            : 'LOW',
            }));

            setRoles(updated);

            if (!selectedRole && updated.length > 0) {
                setSelectedRole(updated[0]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAllRoles();
    }, []);


    const filteredRoles = useMemo(() => {
        let filtered = [...roles];

        if (searchTerm) {
            filtered = filtered.filter(
                (role) =>
                    role.roleCode
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    role.roleDescription
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase())
            );
        }

        if (roleFilter === 'SYSTEM') {
            filtered = filtered.filter((r) => r.isSystemRole);
        }

        if (roleFilter === 'CUSTOM') {
            filtered = filtered.filter((r) => !r.isSystemRole);
        }

        return filtered;
    }, [roles, searchTerm, roleFilter]);

    const totalPages = Math.ceil(filteredRoles.length / pageSize) || 1;

    const paginatedRoles = filteredRoles.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    // -----------------------------------------
    // ROLE ACTIONS
    // -----------------------------------------

    // const handleCreate = () => {
    //     setSelectedRole(null);
    //     setIsModalOpen(true);
    // };

    // const handleEdit = (role) => {
    //     setSelectedRole(role);
    //     setIsModalOpen(true);
    // };

    // const handleSave = async (formData) => {
    //     try {
    //         if (selectedRole?.id) {
    //             const response = await updateRole({
    //                 ...formData,
    //                 id: selectedRole.id,
    //             });

    //             dispatch(
    //                 showToast({
    //                     message: response.message,
    //                     type: 'success',
    //                 })
    //             );
    //         } else {
    //             const response = await createRole(formData);

    //             dispatch(
    //                 showToast({
    //                     message: response.message,
    //                     type: 'success',
    //                 })
    //             );
    //         }

    //         fetchAllRoles();
    //         setIsModalOpen(false);
    //     } catch (error) {
    //         dispatch(
    //             showToast({
    //                 message: error.message,
    //                 type: 'error',
    //             })
    //         );
    //     }
    // };

    // const handleDelete = (role) => {
    //     if (role.isSystemRole) {
    //         dispatch(
    //             showToast({
    //                 message:
    //                     'System roles cannot be deleted.',
    //                 type: 'error',
    //             })
    //         );
    //         return;
    //     }

    //     if (window.confirm(`Delete ${role.roleCode} role?`)) {
    //         console.log(role);
    //     }
    // };


    const toggleModule = (module) => {
        setExpandedModules((prev) => ({
            ...prev,
            [module]: !prev[module],
        }));
    };

    const getRiskClass = (risk) => {
        if (risk === 'HIGH') return 'risk-high';
        if (risk === 'MEDIUM') return 'risk-medium';
        return 'risk-low';
    };

    const groupedPermissions = selectedRole?.permissions?.reduce(
        (acc, permission) => {

            const module = permission.module || 'GENERAL';

            if (!acc[module]) {
                acc[module] = [];
            }

            acc[module].push(permission);

            return acc;
        },
        {}
    );

    const handleSearchUsers = async (userSearch) => {
        try {
            setSearchingUsers(true);
            const response = await searchUser(userSearch);
            setSearchedUsers(response);
        } catch (error) {
            console.error(error);
        } finally {
            setSearchingUsers(false);
        }
    }


    useEffect(() => {

        const delayDebounce = setTimeout(() => {

            if (userSearch.trim().length >= 2) {
                handleSearchUsers(userSearch);
            } else {
                setSearchedUsers([]);
            }

        }, 500);

        return () => clearTimeout(delayDebounce);

    }, [userSearch]);


    const handleAssignUsers = async () => {

        try {

            const payload = { roleId: selectedRole.id, userIds: selectedUsers };

            const response =  await assignUsersToRole(payload);

            dispatch(showToast({ message: response.message, type: 'success', }));

            setAssignUserModal(false);

        } catch (error) {
            console.error(error);
            dispatch(showToast({ message: error.message, type: 'error', }));
            
        }
    };


    return (
        <div className="role-management-page">

            {/* <div className="roles-topbar">

                <button onClick={handleCreate} className="btn-primary">
                    <Plus size={18} />
                    Create Role
                </button>
            </div> */}


            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', margin: '32px 0' }}>
                <KpiCard title="Total Roles" value={roles.length} theme="blue" Icon={ShieldCheck} />
                <KpiCard title="Assigned Users" value={roles.reduce((acc, role) => acc + (role.userCount || 0), 0)} theme="purple" Icon={User} />
                <KpiCard title="Custom Roles" value={roles.filter((r) => !r.systemRole).length} theme="orange" Icon={BadgeCheck} />
                <KpiCard title="High Privilege" value={roles.filter((r) => r.risk === 'HIGH').length} theme="teal" Icon={AlertTriangle} />
            </div>


            <div className="filter-toolbar">

                <div className="search-bar-wrapper">
                    <Search size={18} className="search-icon-inline" />
                    <input
                        type="text"
                        placeholder="Search members by name or email..."
                        className="search-input-pill"
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    />
                </div>

                <div className="toolbar-actions">

                    <div className="filter-select">
                        <Filter size={16} />

                        <select
                            value={roleFilter}
                            onChange={(e) =>
                                setRoleFilter(e.target.value)
                            }
                        >
                            <option value="ALL">
                                All Roles
                            </option>
                            <option value="SYSTEM">
                                System Roles
                            </option>
                            <option value="CUSTOM">
                                Custom Roles
                            </option>
                        </select>
                    </div>

                    <div className="view-switcher">

                        <button
                            className={
                                viewMode === 'LIST'
                                    ? 'active'
                                    : ''
                            }
                            onClick={() =>
                                setViewMode('LIST')
                            }
                        >
                            <Table2 size={18} />
                        </button>

                        <button
                            className={
                                viewMode === 'GRID'
                                    ? 'active'
                                    : ''
                            }
                            onClick={() =>
                                setViewMode('GRID')
                            }
                        >
                            <LayoutGrid size={18} />
                        </button>
                    </div>
                </div>
            </div>


            <div className="roles-layout">

                <div className="roles-sidebar card">

                    <div className="sidebar-header">
                        <h3>Roles</h3>
                        <span> {filteredRoles.length} roles</span>
                    </div>

                    <div className="roles-list">

                        {paginatedRoles.map((role) => (
                            <div
                                key={role.id}
                                className={`role-card ${selectedRole?.id === role.id ? 'active' : ''}`}
                                onClick={() => setSelectedRole(role)}
                            >

                                <div className="role-card-top">

                                    <div>
                                        <h4> {role.roleCode} </h4>
                                        <p> {role.roleDescription} </p>
                                    </div>

                                    <ChevronRight size={18} />
                                </div>

                                <div className="role-card-footer">

                                    <div className="role-badges">

                                        {role.systemRole ? (
                                            <span className="system-badge">SYSTEM</span>
                                        ) : (
                                            <span className="custom-badge">CUSTOM</span>
                                        )}

                                        <span className={`risk-badge ${getRiskClass(role.riskLevel)}`}>
                                            {role.riskLevel}
                                        </span>
                                    </div>

                                    <div className="role-users">
                                        <Users size={14} />
                                        <span className='role-user-count'>{role.userCount || 0}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                </div>


                <div className="role-details-panel ">

                    {selectedRole ? (
                        <>
                            <div className="details-header card">

                                <div>
                                    <div className="details-title">
                                        <h2> {selectedRole.roleCode} </h2>

                                        {selectedRole.isSystemRole ? (
                                            <span className="system-badge">SYSTEM</span>
                                        ) : (
                                            <span className="custom-badge">CUSTOM</span>
                                        )}
                                    </div>

                                    <p> {selectedRole.roleDescription} </p>
                                </div>

                                {/* <div className="details-actions">

                                    <button
                                        className="btn-secondary"
                                        onClick={() => handleEdit(selectedRole)}
                                    >
                                        <Edit2 size={14} />
                                        Edit
                                    </button>

                                    <button
                                        className="btn-danger"
                                        onClick={() => handleDelete(selectedRole)}
                                    >
                                        <Trash2 size={14} />
                                        Delete
                                    </button>
                                </div> */}
                            </div>

                            <div className="content-card">

                                <div className="card-header">
                                    <div>
                                        <h3> Permissions</h3>
                                        <p> Configure access controls and module visibility. </p>
                                    </div>

                                    <button className="btn-primary">
                                        <Settings2 size={16} />
                                        Manage
                                    </button>
                                </div>

                                <div className="permissions-wrapper">

                                    {groupedPermissions &&
                                        Object.entries(groupedPermissions).map(
                                            ([module, permissions], index) => (
                                                <div
                                                    key={index}
                                                    className="permission-group card"
                                                >

                                                    {/* ================================= */}
                                                    {/* MODULE HEADER */}
                                                    {/* ================================= */}

                                                    <div
                                                        className="permission-group-header"
                                                        onClick={() => toggleModule(module)}
                                                    >

                                                        <div className="group-title">

                                                            <div className="module-icon-wrapper">
                                                                <Lock size={16} />
                                                            </div>

                                                            <div>
                                                                <h4>{module}</h4>

                                                            </div>
                                                        </div>

                                                        <div className="module-right">

                                                            {expandedModules[module] ? (
                                                                <ChevronDown size={18} />
                                                            ) : (
                                                                <ChevronRight size={18} />
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* ================================= */}
                                                    {/* PERMISSIONS */}
                                                    {/* ================================= */}

                                                    {expandedModules[module] && (
                                                        <div className="permissions-list">

                                                            {permissions.map((permission) => (
                                                                <div
                                                                    key={permission.id}
                                                                    className="permission-item"
                                                                >

                                                                    <div className="permission-left">

                                                                        <div className="permission-status-dot"></div>
                                                                        <div>
                                                                            <h5> {permission.permissionCode.replaceAll('_', ' ')}</h5>
                                                                            <p>{permission.permissionDescription}</p>
                                                                        </div>
                                                                    </div>



                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        )}
                                </div>
                            </div>


                            <div className="content-card card">

                                <div className="card-header">

                                    <div>
                                        <h3>Assigned Users</h3>
                                        <p>Users currently using this role.</p>
                                    </div>

                                    <button
                                        className="btn-primary"
                                        onClick={() => setAssignUserModal(true)}
                                    >
                                        <UserPlus size={16} />
                                        Assign User
                                    </button>
                                </div>


                                {selectedRole?.assignedUsers?.length > 0 ? (

                                    <div className="users-table">

                                        {selectedRole.assignedUsers.map((user) => (

                                            <div key={user.id} className="user-row">
                                                <div className="user-left">

                                                    <div className="user-avatar">

                                                        {user.profileImage ? (
                                                            <img
                                                                src={user.profileImage}
                                                                alt={user.fullName}
                                                            />
                                                        ) : (
                                                            user.fullName?.charAt(0)
                                                        )}
                                                    </div>

                                                    <div className="user-details">

                                                        <div className="user-name-row">

                                                            <h5>{user.fullName}</h5>
                                                            <p>{user.email}</p>
                                                        </div>


                                                    </div>
                                                </div>

                                                <div className="user-right">

                                                    {user.active ? (
                                                        <span className="status-active">
                                                            <CheckCircle2 size={14} />
                                                            Active
                                                        </span>
                                                    ) : (
                                                        <span className="status-pending">
                                                            <XCircle size={14} />
                                                            Inactive
                                                        </span>
                                                    )}

                                                    <div className="user-actions">

                                                        <button className="table-action-btn">
                                                            <Trash2 size={14} />
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="empty-users-state">
                                        <Users size={42} />
                                        <div>
                                            <h4>No users assigned</h4>
                                            <p> No users are currently assigned to this role.</p>
                                        </div>

                                    </div>
                                )}
                            </div>


                            {/* <div className="content-card card">

                                <div className="card-header">
                                    <div>
                                        <h3> Activity Logs</h3>

                                        <p>Recent role changes and assignments.</p>
                                    </div>
                                </div>

                                <div className="activity-list">

                                    <div className="activity-item">
                                        <div className="activity-icon">
                                            <Activity size={16}/>
                                        </div>

                                        <div>
                                            <h5>
                                                Prem updated payment permissions
                                            </h5>

                                            <p> 2 hours ago </p>
                                        </div>
                                    </div>

                                    <div className="activity-item">
                                        <div className="activity-icon">
                                            <Users size={16} />
                                        </div>

                                        <div>
                                            <h5>
                                                Alex assigned to
                                                Trainer role
                                            </h5>

                                            <p>
                                                Yesterday
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </>
                    ) : (
                        <div className="empty-state card">
                            <ShieldCheck size={50} />

                            <h3> Select a role to continue</h3>

                            <p> Choose a role from the left panel to manage permissions.</p>
                        </div>
                    )}
                </div>
            </div>



            {/* <RoleModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                role={selectedRole}
            /> */}

            {assignUserModal && (
                <div className="modal-overlay">

                    <div className="assign-user-modal">

                        <div className="assign-modal-header">

                            <div>
                                <h3> Assign Users to {selectedRole?.roleCode}</h3>
                                <p> Select users you want to assign to this role.</p>
                            </div>

                            <button
                                className="modal-close-btn"
                                onClick={() => setAssignUserModal(false)}
                            >
                                ✕
                            </button>
                        </div>



                        <div className="assign-search-box">
                            <div className="search-bar-wrapper">
                                <Search size={18} className="search-icon-inline" />
                                <input
                                    type="text"
                                    placeholder="Search members by name or email..."
                                    className="search-input-pill"
                                    value={userSearch}
                                    onChange={(e) => setUserSearch(e.target.value)}
                                />
                            </div>

                        </div>


                        <div className="assign-users-list">

                            {searchingUsers ? (

                                <div className="search-loading-state">
                                    Searching users...
                                </div>

                            ) : searchedUsers.length > 0 ? (

                                searchedUsers.map((user) => {

                                    const selected = selectedUsers.includes(user.id);

                                    return (
                                        <div
                                            key={user.id}
                                            className={`assign-user-card ${selected ? 'selected' : ''
                                                }`}
                                            onClick={() => {

                                                if (selected) {

                                                    setSelectedUsers((prev) =>
                                                        prev.filter(
                                                            (id) => id !== user.id
                                                        )
                                                    );

                                                } else {

                                                    setSelectedUsers((prev) => [
                                                        ...prev,
                                                        user.id
                                                    ]);
                                                }
                                            }}
                                        >

                                            <div className="assign-user-left">

                                                <div className="assign-avatar">
                                                    {user.fullName?.charAt(0)}
                                                </div>

                                                <div>
                                                    <h5>{user.fullName}</h5>
                                                    <p>{user.email}</p>

                                                </div>
                                            </div>

                                            {/* RIGHT */}

                                            <div className="assign-user-right">

                                                {selected && <CheckCircle2 size={22}  className='selected-icon'/>}
                                            </div>
                                        </div>
                                    );
                                })

                            ) : userSearch.length >= 2 ? (

                                <div className="empty-search-state">

                                    <Users size={42} />

                                    <h4>No users found</h4>

                                    <p> No users matched "<span>{userSearch}</span>"</p>
                                </div>

                            ) : (

                                <div className="empty-search-state">

                                    <Search size={42} />

                                    <h4>Search Users</h4>

                                    <p> Start typing to search users by name or email.</p>
                                </div>
                            )}
                        </div>

                        <div className="assign-modal-footer">

                            <button
                                className="btn-secondary"
                                onClick={() =>{

                                    setAssignUserModal(false)
                                    setSearchedUsers([])
                                    setUserSearch("")
                                    setSelectedUsers([])
                                }
                                }
                            >
                                Cancel
                            </button>

                            <button
                                className="btn-primary"
                                onClick={handleAssignUsers}
                            >
                                Assign Users
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Roles;