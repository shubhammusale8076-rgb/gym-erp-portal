import { getToken, getUserId, getRole } from '../../../utils/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Mail, Phone, MapPin, Edit2, Snowflake, MoreHorizontal,
  CheckCircle2, ChevronRight, CreditCard, Coffee,
  Bell, FileText, Key, XCircle, ArrowRight,
  UserRoundPlus,
  TrendingUp,
  CalendarDays,
  ChartNoAxesCombined,
  MessageCircle, Send,
  UserPlus,
  UserRoundX
} from 'lucide-react';
import './MemberDetail.css';
import KpiCard from '../../../components/KpiCard/KpiCard';
import { deleteMemberAPI, getMemberById, resetPassword } from '../../../apiservice/apiservice';
import WhatsAppActionButton from '../../../components/Communication/WhatsAppActionButton';
import CommunicationActionsCard from '../../../components/Communication/CommunicationActionsCard';
import AddMember from '../AddMember';
import ConfirmationModal from '../../../components/ConfirmationModal/ConfirmationModal';
import { sendWelcomeMsg } from '../../../apiservice/apiWhatsapp';
import { useDispatch } from 'react-redux';
import { showToast } from '../../../redux/toastSlice';

const MemberDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = getToken();
  const dispatch = useDispatch();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ open: false, memberId: null, name: null, });
  const [deletingMemberId, setDeletingMemberId] = useState(null);
  const [sendingMsg, setSendingMsg] =useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);

  const fetchMember = async () => {
    try {
      setLoading(true);
      const data = await getMemberById(id);
      setMember(data);
    } catch (error) {
      setError("Failed to fetch member details");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateMember = async (payload) => {

    try {

      const response = await updateMember(payload.id, payload);

      dispatch(showToast({ message: response.message, type: "success" }));

      setShowEditModal(false);

      fetchMember();

    } catch (error) {

      console.error(error);

      dispatch(showToast({ message: "Failed to update member", type: "error" }));
    }
  };

  const handleDeleteMember = async (id) => {
    try {
      // Optional loading state
      setDeletingMemberId(id);

      // API call
      const response = await deleteMemberAPI(id);
      dispatch(showToast({ message: response.message, type: "success" }));
      // Update UI instantly

      setConfirmModal({ open: false, memberId: null })
      navigate("/members");
    } catch (error) {
      console.error("Failed to delete member:", error);
      dispatch(showToast({ message: error.message, type: "error" }));
    } finally {
      setDeletingMemberId(null);
    }
  };

  const handleWelcomeMsg = async () => {
    try {
      setSendingMsg(true);
      const response = await sendWelcomeMsg(member.memberId);
       console.log(
            'Welcome message response:',
            response
        );
      dispatch(showToast({ message: response.message, type: "success" }));
    } catch (error) {
      console.error("Failed to send welcome message:", error);
      dispatch(showToast({ message: error.message, type: "error" }));
    } finally {
      setSendingMsg(false);
    }
  }

  const handleResetPassword = async () => {
    try {
      setResettingPassword(true);
      const response = await resetPassword(member.memberId);
      dispatch(showToast({ message: response.message, type: "success" }));
    } catch (error) {
      console.error("Failed to reset password:", error);
      dispatch(showToast({ message: error.message, type: "error" }));
    } finally {
      setResettingPassword(false);
    }
  }
  

  useEffect(() => {
    if (token) fetchMember();
  }, [token, id]);

  const formatShortDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: '2-digit'
    });
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

  if (loading) return <div>Loading...</div>;
  if (error || !member) return <div>Error: {error || "Member not found"}</div>;

  return (
    <div className="member-detail-page">


      <section className="profile-header-section">
        <div className="profile-info-wrapper">

          <div className="profile-image-container">

            {member.profileImageUrl ? (
              <img src={member.profileImageUrl} alt={member.fullName} className="profile-image" />
            ) : (
              <div className="profile-image">
                {getInitials(member.fullName)}
              </div>
            )}
            <span className="tier-badge">{member.plan?.name} TIER</span>
          </div>

          <div className="profile-details">

            <div className="member-meta">
              <div className="member-id-pill">
                ID: #{member.memberCode}
              </div>

              <div className={`member-status-pill ${member.status ? "active" : "inactive"}`}>
                <span className="status-dot"></span>
                {member.status ? "Active" : "Inactive"}
              </div>
            </div>

            <h1 className="detail-page-member-name">
              {member.fullName}
            </h1>

            <div className="member-contact-info">
              <div className="contact-item">
                <Mail size={15} className="contact-icon" />
                <span>{member.email}</span>
              </div>

              <div className="contact-item">
                <Phone size={15} className="contact-icon" />
                <span>{member.phoneNumber}</span>
              </div>

              <div className="contact-item">
                <MapPin size={15} className="contact-icon" />
                <span>{member.address}</span>
              </div>
            </div>

          </div>
        </div>

        <div className="profile-action-buttons">
          <button
            className="btn-primary btn-edit-profile"
            onClick={() => setShowEditModal(true)}
          >
            <Edit2 size={14} />
            Edit Profile
          </button>
          <button className="btn-freeze-account">
            <Snowflake size={14} /> Freeze Account
          </button>
          <button className="btn-freeze-account" onClick={() => navigate(`/members/${id}/subscription`)}>
            <Snowflake size={14} /> View Subscriptions
          </button>
          <button className="btn-more-options" onClick={() => navigate("/trainer/assignment-member")}>
            <UserPlus size={14} />Assign Trainer
          </button>


        </div>
      </section>

      <section className="member-communication-section" style={{ marginTop: '32px' }}>
        <CommunicationActionsCard
          title="Direct Communication"
          description="Send manual WhatsApp reminders and updates directly to this member."
        >
          <WhatsAppActionButton
            label="Send Welcome Message"
            icon={Send}
            eventType="WELCOME_MESSAGE"
            payload={{ memberId: member.memberId }}
            variant="outline"
            loading={sendingMsg}
            onClick={handleWelcomeMsg}
          />
          <WhatsAppActionButton
            label="Send Renewal Reminder"
            icon={MessageCircle}
            eventType="RENEWAL_REMINDER"
            payload={{ memberId: member.memberId }}
            variant="primary"
          />
          <WhatsAppActionButton
            label="Send Plan Expiry Reminder"
            icon={MessageCircle}
            eventType="PLAN_EXPIRY_REMINDER"
            payload={{ memberId: member.memberId }}
            variant="secondary"
          />
          <WhatsAppActionButton
            label="Send Attendance Reminder"
            icon={Bell}
            eventType="ATTENDANCE_REMINDER"
            payload={{ memberId: member.memberId }}
            variant="ghost"
          />
        </CommunicationActionsCard>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', margin: '32px 0' }}>
        <KpiCard title="Join Date" value={formatShortDate(member.joinDate)} theme="blue" Icon={UserRoundPlus} />
        <KpiCard title="Membership Expiry" value={formatShortDate(member.membershipExpiry)} theme="purple" Icon={TrendingUp} />
        <KpiCard title="Total Attendance" value={member.totalAttendance} theme="orange" Icon={CalendarDays} />
        <KpiCard title="Account Balance" value={member.accountBalance} theme="teal" Icon={ChartNoAxesCombined} />
      </div>

      <section className="main-content-grid">

        {/* Left Column */}
        <div className="content-left-col">

          <div className="section-block">
            <h3 className="section-title">Plan Configuration</h3>
            <div className="plan-card card">
              <div className='plan-card-header'>
                <h4 className="plan-name">{member.plan?.name} Plan</h4>
                <p className='plan-status'>{member.plan?.status ? "Active" : "Inactive"}</p>
              </div>

              <div className='plan-pricing'>
                <h3>
                  <span>Price :</span>₹{member.plan.price}/Month
                </h3>
                <p><span>Membership Duration:</span> {member.plan.durationInDays / 30} Months</p>
              </div>

              <p className='plan-desc'>Plan Features</p>
              <ul className="plan-features">
                {member.plan.features?.map((benefit, index) => (
                  <li key={index}><span className="feature-icon-wrapper"><CheckCircle2 size={12} strokeWidth={3} /></span>{benefit}</li>
                ))}
              </ul>

              <button className="btn-upgrade-plan">
                Upgrade Plan Options <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="section-block">
            <h3 className="section-title">Recent Transactions</h3>
            <div className="transactions-list">
              <div className="transaction-item">
                <div className="tx-icon-wrapper"><CreditCard size={18} /></div>
                <div className="tx-details">
                  <span className="tx-title">Monthly Subscription</span>
                  <span className="tx-date">Oct 1, 2023</span>
                </div>
                <div className="tx-amount-status">
                  <span className="tx-amount negative">-$350.00</span>
                  <span className="tx-status success">SUCCESS</span>
                </div>
              </div>
              <div className="transaction-item">
                <div className="tx-icon-wrapper"><Coffee size={18} /></div>
                <div className="tx-details">
                  <span className="tx-title">Aura Juice Bar</span>
                  <span className="tx-date">Sep 28, 2023</span>
                </div>
                <div className="tx-amount-status">
                  <span className="tx-amount negative">-$12.50</span>
                  <span className="tx-status success">SUCCESS</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="content-right-col">

          <div className="trainer-card ">

            <div className="trainer-header">
              <h3 className='section-title'>Assigned Trainer</h3>
            </div>
            <div className="trainer-body card">
              <div className="trainer-row">
                <span className="label">Trainer</span>
                <span className="value">{member.trainerMemberDTO?.fullName}</span>
              </div>
              <div className="trainer-row">
                <span className="label">Program</span>
                <span className="value">{member.trainerMemberDTO.programName}</span>
              </div>
              {member.trainerMemberDTO.progressStatus && (
                <div className="trainer-row">
                  <span className="label">Progress</span>
                  <span className="value status">
                    {member.trainerMemberDTO.progressStatus}
                  </span>
                </div>
              )}
            </div>

          </div>

          <div className="section-block">
            <h3 className="section-title">Attendance Timeline</h3>
            <div className="timeline-container card">

              <div className="timeline-item">
                <div className="timeline-marker default"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <span className="timeline-time">YESTERDAY, 07:15 AM</span>
                    <span className="timeline-badge completed">Completed</span>
                  </div>
                  <h4 className="timeline-class">Vinyasa Yoga: Morning Ritual</h4>
                  <p className="timeline-instructor">Studio A • Instructor: Marc Ohara</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-marker light"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <span className="timeline-time">OCT 03, 18:45 PM</span>
                    <span className="timeline-badge completed">Completed</span>
                  </div>
                  <h4 className="timeline-class">Zen Flow Meditation</h4>
                  <p className="timeline-instructor">Garden Terrace • Instructor: Sarah Ling</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-marker light"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <span className="timeline-time">OCT 02, 08:30 AM</span>
                    <span className="timeline-badge completed">Completed</span>
                  </div>
                  <h4 className="timeline-class">Elite Performance Personal Training</h4>
                  <p className="timeline-instructor">Personal Suite 2 • Trainer: David Blake</p>
                </div>
              </div>


            </div>
          </div>

          <div className="financial-overview-card">
            <h3 className="financial-title">Financial Overview</h3>
            <div className="financial-details">
              <div className="financial-data-block">
                <span className="data-label">NEXT PAYMENT</span>
                <span className="data-value">{member.financial?.nextPaymentDate}</span>
              </div>
              <div className="financial-data-block">
                <span className="data-label">AMOUNT DUE</span>
                <span className="data-value">₹{member.financial?.amountDue}</span>
              </div>
              <button className="btn-pay-now">Pay Now</button>
            </div>
          </div>

        </div>

      </section>

      <section className="admin-control-section">
        <div className="admin-buttons-row">
          <span className="admin-label" >Administrative Control Panel:</span>
          
          <button className="btn-admin" onClick={handleResetPassword}><Key size={16} /> Reset Password</button>
          <button className="btn-terminate"
            onClick={() =>
              setConfirmModal({
                open: true,
                memberId: member.id,
                name: member.fullName,
              })
            }>
            <XCircle size={14} /> Terminate Membership
          </button>
          <button className="btn-terminate" onClick={() =>
            setConfirmModal({
              open: true,
              memberId: member.id,
              name: member.fullName,
            })
          }>
            <UserRoundX size={16} /> Delete Member
          </button>
        </div>

      </section>

      {showEditModal && (
        <AddMember
          member={member}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdateMember}
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

    </div>
  );
};

export default MemberDetail;