import { getToken, getUserId, getRole } from '../../utils/auth';
import React, { useEffect, useState } from 'react';
import { Search, Plus, Filter, Edit2, Trash2, UserPlus, User, CheckCircle2, CalendarDays, TrendingUp, SearchX } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import AddMember from './AddMember';
import './Members.css';
import PageHeader from '../../components/PageHeader/PageHeader';
import Dropdown from '../../components/Dropdown/Dropdown';
import KpiCard from '../../components/KpiCard/KpiCard';
import { createMemberAPI, deleteMemberAPI, getAllMembers, updateMemberAPI } from '../../apiservice/apiservice';
import Pagination from '../../components/Pagination/Pagination';
import { useDispatch } from 'react-redux';
import { showToast } from '../../redux/toastSlice';
import { exportMembersToGoogleSheets } from '../../apiservice/apiGoogle';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';



const Members = () => {
  const [members, setMembers] = useState([]);
  const [exporting, setExporting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Select Status');
  const [planFilter, setPlanFilter] = useState('Select Plan');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Set to 6 to see pagination better if we add members.
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [deletingMemberId, setDeletingMemberId] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    memberId: null,
    name: null,
  });
  const [memberSuccessModal, setMemberSuccessModal] =
    useState({
      open: false,
      data: {},
    });
  const navigate = useNavigate();
  const token = getToken();
  const dispatch = useDispatch();



  const fetchAllMembers = async () => {
    try {
      const response = await getAllMembers(token);
      console.log(response);
      setMembers(response);
    } catch (error) {
      console.error('Error:', error.response || error.message);
    }
  };


  useEffect(() => {
    fetchAllMembers();
  }, []);

  const handleSaveMember = async (payload) => {
    try {
      if (editingMember) {
        // ✏️ UPDATE FLOW
        const response = await updateMemberAPI(editingMember.id, payload, token);
        dispatch(showToast({ message: response.message, type: "success" }));
      } else {
        // ➕ CREATE FLOW
        const response = await createMemberAPI(payload, token);
        setMemberSuccessModal({
          open: true,
          data: response,
        });
      }

      // 🔄 Always refresh from backend (single source of truth)
      await fetchAllMembers();

      // ✅ Close modal & reset state
      setIsAddingMember(false);
      setEditingMember(null);

    } catch (error) {
      console.error("Member save failed:", error);

      alert(
        error?.response?.data?.message ||
        "Something went wrong while saving member"
      );
    }
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Select Status' || member.status === statusFilter;
    const matchesPlan = planFilter === 'Select Plan' || member.plan === planFilter;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage) || 1;
  const currentMembers = filteredMembers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDeleteMember = async (id) => {
    try {
      // Optional loading state
      setDeletingMemberId(id);

      // API call
      const response = await deleteMemberAPI(id);
      dispatch(showToast({ message: response.message, type: "success" }));
      // Update UI instantly
      setMembers((prev) => prev.filter((m) => m.id !== id));

      // Adjust pagination
      if (currentMembers.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
      setConfirmModal({ open: false, memberId: null })

      // Premium success toast
    } catch (error) {
      console.error("Failed to delete member:", error);
      dispatch(showToast({ message: error.message, type: "error" }));
    } finally {
      setDeletingMemberId(null);
    }
  };

  const allStatus = ["Active", "Inactive"];
  const allPlans = ["Standard", "Platinum", "Elite"];

  const handleExportToGoogleSheets = async () => {

    try {
      setExporting(true);

      const response = await exportMembersToGoogleSheets(token);
      setTimeout(() => {
        window.open(response.sheetUrl, '_blank');
      }, 800);

    } catch (error) {

      console.error('Google export failed', error);
    }
    finally {
      setExporting(false);
    }
  };

  const handleSendPaymentLinkWhatsapp = () => {

    if (!memberSuccessModal?.data) return;

    const paymentLink =
      memberSuccessModal.data.paymentLink;

    const password =
      memberSuccessModal.data.password;

    const message = encodeURIComponent(
      `Welcome to Elite Gym 🎉

Your account has been created successfully.

Temporary Password: ${password}

Complete your payment using the link below:
${paymentLink}`
    );

    window.open(
      `https://wa.me/?text=${message}`,
      "_blank"
    );
  };

  const getInitials = (name) => {
    if (!name) return "";

    const parts = name.trim().split(" ");

    if (parts.length === 1) {
      return parts[0][0].toUpperCase();
    }

    return (
      parts[0][0] + parts[parts.length - 1][0]
    ).toUpperCase();
  };


  console.log(memberSuccessModal.data)
  return (
    <div className="members-container">

      <PageHeader
        title="Members Directory"
        subtitle="Track all members and their subscriptions."
        actions={[
          {
            label: " Add Member",
            icon: <UserPlus size={16} />,
            onClick: () => { setEditingMember(null); setIsAddingMember(true) },
            className: "btn-primary"
          }
        ]}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', margin: '32px 0' }}>
        <KpiCard title="Total Members" value="142" theme="blue" Icon={User} />
        <KpiCard title="Active Members" value="112" theme="purple" Icon={CheckCircle2} />
        <KpiCard title="Inactive Members" value="14" theme="orange" Icon={CalendarDays} />
        <KpiCard title="New This Month" value="23" theme="teal" Icon={TrendingUp} />
      </div>


      <div className="members-controls">
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

        <div className="action-buttons-group">

          <Dropdown
            label={statusFilter || "All Status"}
            actions={allStatus.map(g => ({
              label: g,
              onClick: () => { setStatusFilter(g); setCurrentPage(1); }
            }))}
          />

          <Dropdown
            label={planFilter || "All Plans"}
            actions={allPlans.map(g => ({
              label: g,
              onClick: () => { setPlanFilter(g); setCurrentPage(1); }
            }))}
          />

          <button className={`btn-secondary export-google-btn ${exporting ? 'loading' : ''}`} onClick={handleExportToGoogleSheets} disabled={exporting}>

            {
              exporting ? (
                <>
                  <div className="btn-spinner"></div>
                  Exporting Members...
                </>
              ) : (
                <>
                  Export To Google Sheets
                </>
              )
            }

          </button>
        </div>
      </div>

      <div className="members-table-wrapper box-shadow">
        <table className="members-table">
          <thead>
            <tr>
              <th className="member-column">MEMBER</th>
              <th>PHONE</th>
              <th>MEMBERSHIP PLAN</th>
              <th>ACCOUNT STATUS</th>
              <th>MEMBERSHIP STATUS</th>
              <th>JOIN DATE</th>
              <th>PAYMENT STATUS</th>
              <th className="actions-column">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {currentMembers.map((member) => (
              <tr key={member.id} className="member-row">
                <td className="member-info-cell" onClick={() => navigate(`/members/${member.id}`)} style={{ cursor: 'pointer' }}>
                  <div className="avatar-wrapper">

                    {member.profileImg ? (
                      <img src={member.profileImg} alt={member.name} className="member-avatar" />
                    ) : (
                      <div className="member-initials">
                        {getInitials(member.name)}
                      </div>
                    )}
                  </div>
                  <div className="member-details">
                    <span className="member-name" style={{ pointerEvents: 'none' }}>{member.name}</span>
                    <span className="member-email">{member.email}</span>
                  </div>
                </td>

                <td className='member-phone'>{member.phoneName}</td>

                <td className="plan-cell">
                  <span className={`plan-badge`}>
                    {member.plan?.toUpperCase() || "NO PLAN"}
                  </span>
                </td>

                <td>
                  <span className={`account-pill ${member.accountStatus.toLowerCase()}`}>
                    <span className="status-dot"></span>
                    {member.accountStatus.toUpperCase() === "TRUE" ? "ACTIVE" : "INACTIVE"}
                  </span>
                </td>

                <td className="status-cell">
                  <span className={`status-pill ${member.membershipStatus.toLowerCase()}`}>
                    <span className="status-dot"></span>
                    {member.membershipStatus.toUpperCase()}
                  </span>
                </td>
                <td className="date-cell">
                  {new Date(member.joinDate).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td>
                  <span className={`payment-status`}>
                    {member.paymentStatus?.toUpperCase() || "NOT PAID"}
                  </span>
                </td>
                <td className="actions-cell">
                  <div className="row-actions">
                    <button className="action-icon-btn edit-btn" title="Edit" onClick={() => { setEditingMember(member); setIsAddingMember(true); }}>
                      <Edit2 size={16} />
                    </button>
                    <button className="action-icon-btn delete-btn"
                      title="Delete"
                      onClick={() =>
                        setConfirmModal({
                          open: true,
                          memberId: member.id,
                          name: member.name,
                        })
                      }>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredMembers.length === 0 && (

          <div className="premium-empty-state">

            <div className="empty-state-glow"></div>

            <div className="empty-state-icon">
              <SearchX size={42} />
            </div>

            <div className="empty-state-content">

              <h3>No Members Found</h3>

              <p> We couldn’t find any members matching your current search or filters.</p>

              <span className="empty-state-tip">Try adjusting your keywords or clear filters.</span>
            </div>

            <div className="empty-state-actions">

              <button className="btn-secondary" onClick={() => setSearchTerm('')}>
                Clear Search
              </button>

              <button className="btn-primary" onClick={() => setIsAddingMember(true)}>
                + Add Member
              </button>
            </div>
          </div>
        )}
      </div>

      <footer className="members-footer">
        <div className="showing-entries">
          Showing {filteredMembers.length > 0 ? ((currentPage - 1) * itemsPerPage) + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredMembers.length)} of {filteredMembers.length} members
        </div>
        {filteredMembers.length > itemsPerPage && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </footer>

      {isAddingMember && (
        <AddMember
          onClose={() => { setIsAddingMember(false); setEditingMember(null); }}
          onAdd={handleSaveMember}
        />
      )}

      <ConfirmationModal
        isOpen={confirmModal.open}
        title="Delete Member"
        description={
          <>
            Are you sure you want to permanently delete{" "}
            <span className="highlight-name">
              {confirmModal?.name}
            </span>
            ? This action cannot be undone.
          </>
        }
        confirmText="Delete Member"
        variant="danger"
        loading={deletingMemberId === confirmModal.memberId}
        onClose={() =>
          setConfirmModal({
            open: false,
            memberId: null,
          })
        }
        onConfirm={() =>
          handleDeleteMember(confirmModal.memberId)
        }
      />

      {memberSuccessModal.open && (
        <div className="member-success-overlay">

          <div className="member-success-modal">

            <div className="member-success-top">

              <div className="success-icon-wrapper">
                <div className="success-icon">
                  ✓
                </div>
              </div>

              <div>
                <h2>Member Created Successfully</h2>
                <p>
                  Login credentials and payment link are ready.
                </p>
              </div>

            </div>

            <div className="member-success-body">

              <div className="success-card">

                <div className="success-card-header">
                  Account Information
                </div>

                <div className="success-grid">

                  <div className="success-field">
                    <label>Full Name</label>

                    <div className="success-value">
                      {memberSuccessModal.data.fullName}
                    </div>
                  </div>

                  <div className="success-field">
                    <label>Role</label>

                    <div className="success-value ">
                      {memberSuccessModal.data.role}
                    </div>
                  </div>

                  <div className="success-field">
                    <label>Username</label>

                    <div className="success-value">
                      {memberSuccessModal.data.userName}
                    </div>
                  </div>

                  <div className="success-field">
                    <label>Temporary Password</label>

                    <div className="success-value password-box">
                      {memberSuccessModal.data.temporaryPassword}
                    </div>
                  </div>

                </div>

              </div>

              <div className="success-card">

                <div className="success-card-header">
                  Payment Information
                </div>

                <div className="payment-link-box">

                  <a
                    href={memberSuccessModal.data.paymentLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                   {memberSuccessModal.data.paymentLink}
                  </a>

                </div>

              </div>

            </div>

            <div className="member-success-actions">

              <button
                className="btn-whatsapp"
                onClick={handleSendPaymentLinkWhatsapp}
              >
                Send Payment Link on WhatsApp
              </button>

              <button
                className="btn-close-modal"
                onClick={() =>
                  setMemberSuccessModal({
                    open: false,
                    data: null,
                  })
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
};

export default Members;
