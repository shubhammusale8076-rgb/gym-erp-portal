import { getToken, getUserId, getRole } from '../../utils/auth';
import React, { useEffect, useState } from 'react';
import './TrainerAssignmentManager.css';
import {
  Search,
} from 'lucide-react';
import PageHeader from '../../components/PageHeader/PageHeader';
import { assignMembers, getMembers, getTrainerData, getTrainers, unAssignMember } from '../../apiservice/apiservice';
import Dropdown from '../../components/Dropdown/Dropdown';
import { useDispatch } from 'react-redux';
import { showToast } from '../../redux/toastSlice';

const TrainerAssignmentManager = () => {
  const [selectedTrainer, setSelectedTrainer] = useState("Select Trainer");
  const [selectedTrainerId, setSelectedTrainerId] = useState(null);
  const [activeTab, setActiveTab] = useState("All");
  const [members, setMembers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [trainerData, setTrainerData] = useState({});
  const [loading, setLoading] = useState(false);
  const [token] = useState(getToken());
  const dispatch = useDispatch();

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await getMembers(token);
      setMembers(response);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  }

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      const response = await getTrainers(token);
      setTrainers(response);
      if (response.length > 0) {
        setSelectedTrainer(response[0].name);
        setSelectedTrainerId(response[0].id);
      }
    } catch (error) {
      console.error("Error fetching trainers:", error);
    } finally {
      setLoading(false);
    }
  }


  const fetchTrainerData = async () => {
    try {
      setLoading(true);
      const response = await getTrainerData(token, selectedTrainerId);
      setTrainerData(response);
    } catch (error) {
      console.error("Error fetching trainer data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (selectedTrainerId) {
      fetchTrainerData();
    }
  }, [selectedTrainerId]);


  useEffect(() => {
    fetchMembers();
    fetchTrainers();
  }, []);


  const progress = trainerData?.capacity
    ? Math.min((trainerData.assignedCount / trainerData.capacity) * 100, 100)
    : 0;

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

  const handleAssign = async (memberId) => {
    try {
      const payload = {
        "trainerId": selectedTrainerId,
        "memberIds": [memberId]
      }
      const response = await assignMembers(payload, token);
      dispatch(showToast({ message: response.message  , type: "success" }));
      fetchMembers();
    } catch (err) {
      dispatch(showToast({ message: err.message, type: "error" }));
    }
  };

  const handleUnassign = async (memberId) => {
    try {
      const response = await unAssignMember(token,selectedTrainerId,memberId);
      dispatch(showToast({ message: response.message  , type: "success" }));
      fetchMembers();
    } catch (err) {
      dispatch(showToast({ message: err.message, type: "error" }));
    }
  };


  return (
    <div className="assignment-manager-container">
      <div className="assignment-main-content">


        <PageHeader
          title="Assignment Manager"
          subtitle="Manage member allocations across trainers."
          actions={[
            {
              label: "Bulk Assign",
              onClick: () => { },
              className: "btn-secondary"
            }
            // ,
            // {
            //   label: "Assign Members",
            //   onClick: () => { },
            //   className: "btn-primary"
            // }
          ]}
        />

        <div className="filter-section card">
          <div className="trainer-selector-wrapper">
            <label>SELECT TRAINER</label>

            <Dropdown
              label={selectedTrainer || "Select Trainer"}
              actions={trainers.map(g => ({
                label: g.name,
                onClick: () => {
                  setSelectedTrainer(g.name);
                  setSelectedTrainerId(g.id);
                }
              }))}
            />

          </div>


          <div className="status-filter-wrapper">
            <label>FILTER BY STATUS</label>
            <div className="tab-filters">
              {["All", "Unassigned", "Assigned"].map(tab => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>


        </div>

        <div className="search-bar-wrapper">
          <Search size={18} className="search-icon-inline" />
          <input
            type="text"
            placeholder="Search members by name or email..."
            className="search-input-pill"
            // value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); }}
          />
        </div>

        <div className="table-container-wrapper card-shadow">
          <table className="table-container">
            <thead>
              <tr>
                <th className="member-column">MEMBER</th>
                <th>MEMBERSHIP PLAN</th>
                <th>TRAINER</th>
                <th>STATUS</th>
                <th className="actions-column">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id} className="member-row-card">
                  <td className="member-info-col">
                    {member.profilePicture ? (
                      <img src={member.profilePicture} alt={member.fullName} className="member-avatar" />
                    ) : (
                      <div className="member-initials">
                        {getInitials(member.fullName)}
                      </div>
                    )}
                    <div className="name-details">
                      <p className="name">{member.fullName}</p>
                      <p className="email">{member.email}</p>
                    </div>

                  </td>
                  <td className="member-plan-col">
                    <span className={`plan-badge ${member.plan.toLowerCase()}`}>
                      {member.plan}
                    </span>
                  </td>
                  <td className="member-trainer-col">
                    {member.trainerId === "Unassigned" ? (
                      <span className="unassigned-text">{member.trainerName}</span>
                    ) : (
                      <div className="trainer-indicator">
                        <div className="dot"></div>
                        <span >{member.trainerName}</span>
                      </div>
                    )}
                  </td>

                  <td className="member-status-col">
                    <span className={`status-badge ${member.status.toLowerCase()}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="member-actions-col">
                    {member.trainerName === "Unassigned" ? (
                      <button className="assign-btn"
                        onClick={() => handleAssign(member.id)}
                      >Assign</button>
                    ) : (
                      <button className="assign-btn"
                        onClick={() => handleUnassign(member.id)}>
                        Unassign
                      </button>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

          {members.length === 0 && (
            <div className="empty-state">
              <p>No members found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      <aside className="trainer-sidebar">
        <div className="sidebar-card">
          <div className="sidebar-status">
            <div className="status-indicator">
              <div className="pulse-dot"></div>
              <p>{trainerData?.available ? "AVAILABLE" : "NOT AVAILABLE"}</p>
            </div>

          </div>

          <div className="sidebar-profile">
            <div className="profile-image-container">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Marcus Vance" />
              <div className="image-ring"></div>
            </div>
            <h2>{trainerData?.fullName}</h2>
          </div>

          <div className="capacity-section">
            <div className="capacity-header">
              <label>CAPACITY</label>
              <span className="count">{trainerData?.assignedCount || 0}<span className="total">/{trainerData?.capacity || 0}</span></span>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="capacity-note">Accepting {trainerData?.capacity - trainerData?.assignedCount} more elite members</p>
          </div>

          <div className="specializations-section">
            <label>SPECIALIZATIONS</label>
            <div className="spec-pills">
              {trainerData?.skills?.map(spec => (
                <span key={spec} className="spec-pill">{spec}</span>
              ))}
            </div>
          </div>

          <button className="view-roster-btn">View Full Roster</button>
        </div>
      </aside>
    </div>
  );
};

export default TrainerAssignmentManager;
