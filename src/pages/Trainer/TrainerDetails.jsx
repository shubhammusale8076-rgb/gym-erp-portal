import { getToken, getUserId, getRole } from '../../utils/auth';
import React from 'react';
import {
  X, Star, Expand, Medal, Users2, Edit2,
  FileCheck, ShieldCheck,
  Trash2
} from 'lucide-react';
import './TrainerDetails.css';
import KpiCard from '../../components/KpiCard/KpiCard';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteTrainer, getTrainerById } from '../../apiservice/apiservice';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';

const TrainerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trainerData, setTrainerData] = useState(null);
  const [deletingTrainerId, setDeletingTrainerId] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    trainerId: null,
    name: null,
  });

  const fetchTrainerData = async () => {
    try {
      const response = await getTrainerById(id);
      setTrainerData(response);
    } catch (error) {
      console.error('Error:', error.response || error.message);
    }
  };

  useEffect(() => {
    fetchTrainerData();
  }, [id]);

  const handleDeleteTrainer = async (id) => {
    try {
      setDeletingTrainerId(id);
      const response = await deleteTrainer(id);
      dispatch(showToast({ message: response.message, type: "success" }));
      fetchAllTrainer();
      setConfirmModal({ open: false, memberId: null })
    } catch (error) {
      console.error('Error:', error.response || error.message);
      dispatch(showToast({ message: error.message, type: "error" }));
    }
    finally {
      setDeletingTrainerId(null);
    }
  };



  if (!trainerData) return null;

  // 🔥 Group availability by day
  const groupedSchedule = trainerData.availability.reduce((acc, slot) => {
    if (!acc[slot.dayOfWeek]) acc[slot.dayOfWeek] = [];
    acc[slot.dayOfWeek].push(slot);
    return acc;
  }, {});

  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  return (
    <div className="staff-detail-overlay">
      <div className="staff-modal-content">

        {/* HEADER */}
        <div className="staff-header-section">
          <div className="staff-image-wrapper">
            <img
              src={trainerData.profileImageUrl}
              className="staff-hero-image"
            />
            <span className="staff-role-badge">ELITE PERFORMANCE COACH</span>
          </div>

          <div className="staff-info-wrapper">
            <div className="staff-status-id">
              <span className="staff-status-pill">
                <span className="status-dot"></span>
                {trainerData.active ? "Active" : "Inactive"}
              </span>
            </div>

            <h1 className="staff-fullname">{trainerData.fullName}</h1>

            <p className="staff-tagline">
              {trainerData.bio}
            </p>

            <div className="staff-action-buttons">
              <button className="btn-primary">
                <Edit2 size={14} /> Edit Profile
              </button>
              <button className="btn-outline-purple" onClick={() => navigate(`/trainer/assignment-member`)}>
                Assign Members
              </button>
              <button className="delete-btn" title="Delete"
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmModal({
                    open: true,
                    trainerId: trainerData.id,
                    name: trainerData.fullName,
                  });
                }}
              >
                <Trash2 size={16} /> Delete Trainer
              </button>
            </div>
          </div>
        </div>

        {/* KPI */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', margin: '32px 0' }}>
          <KpiCard title="Member Satisfaction" value={`${trainerData.memberSatisfaction}/5`} theme="blue" Icon={Star} />
          <KpiCard title="Sessions Completed" value={`${trainerData.sessionsCompleted}`} theme="purple" Icon={Expand} />
          <KpiCard title="Retention Rate" value={`${trainerData.retentionRate}%`} theme="orange" Icon={ShieldCheck} />
          <KpiCard title="Current Roster" value={`${trainerData.currentRosterCount}`} theme="teal" Icon={Users2} />
        </div>

        <div className="staff-modal-body">

          <div className="staff-bio-grid">

            {/* BIO */}
            <div className="bio-col-left card">
              <h3 className="section-title">Professional Biography</h3>
              <div className="bio-text">
                <p>{trainerData.bio}</p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="bio-col-right card">
              <div className="bio-right-header">
                <h3 className="section-title">Curated Specialties</h3>
                <div className="floating-icon-badge">
                  <FileCheck size={16} />
                </div>
              </div>

              {/* SKILLS */}
              <div className="specialties-container">
                <div className="specialty-tags">
                  {trainerData.skills.map((skill, index) => (
                    <span key={index} className="tag">{skill}</span>
                  ))}
                </div>
              </div>

              {/* CERTIFICATIONS */}
              <h3 className="section-title" style={{ marginTop: '2rem' }}>Certifications</h3>
              <div className="certifications-list">
                <div className="cert-item">
                  <div className="cert-icon"><Medal size={14} /></div>
                  <div className="cert-info">
                    <h4>{trainerData.certifications}</h4>
                    <p>Certified Trainer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SCHEDULE */}
          <div className="schedule-section">
            <h3 className="section-title">Weekly Schedule</h3>

            <div className="weekly-grid">
              {days.map((day) => (
                <div key={day} className="day-column">
                  <span className="day-name">{day}</span>

                  {groupedSchedule[day]?.length ? (
                    groupedSchedule[day].map((slot, i) => (
                      <div key={i} className="schedule-card highlight-border">
                        <span className="time">
                          {slot.startTime} - {slot.endTime}
                        </span>
                        <span className="class-name">Session</span>
                      </div>
                    ))
                  ) : (
                    <div className="schedule-card empty">
                      <span className="time">Off Duty</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ROSTER */}
          <div className="roster-section">
            <div className="section-header-flex">
              <h3 className="section-title">Active Elite Roster</h3>
            </div>

            <div className="roster-table-wrapper">
              <table className="roster-table">
                <thead>
                  <tr>
                    <th>MEMBER</th>
                    <th>PROGRAM</th>
                    <th>NEXT SESSION</th>
                    <th>PROGRESS</th>
                  </tr>
                </thead>

                <tbody>
                  {trainerData.assignedMembers.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        No members assigned yet
                      </td>
                    </tr>
                  ) : (
                    trainerData.assignedMembers.map((member) => (
                      <tr key={member.id}>
                        <td>
                          <div className="roster-member">
                            <img src={`https://i.pravatar.cc/150?u=${member.id}`} />
                            <div>
                              <p className="roster-name">{member.fullName}</p>
                              <p className="roster-email">{member.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="roster-program">{member.programName}</td>
                        <td className="roster-date">{member.nextSession || '-'}</td>
                        <td>
                          <span className="progress-badge success">
                            {member.progressStatus || 'N/A'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>

              </table>
            </div>
          </div>

        </div>
      </div>

      <ConfirmationModal
        isOpen={confirmModal.open}
        title="Delete Trainer"
        description={
          <>
            Are you sure you want to permanently delete{" "}
            <span className="highlight-name">
              {confirmModal?.name}
            </span>
            ? This action cannot be undone.
          </>
        }
        confirmText="Delete Trainer"
        variant="danger"
        loading={deletingTrainerId === confirmModal.trainerId}
        onClose={() =>
          setConfirmModal({
            open: false,
            trainerId: null,
          })
        }
        onConfirm={() =>
          handleDeleteTrainer(confirmModal.trainerId)
        }
      />
    </div>
  );
};

export default TrainerDetails;