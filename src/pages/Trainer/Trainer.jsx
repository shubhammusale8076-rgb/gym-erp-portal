import { getToken, getUserId, getRole } from '../../utils/auth';
import React, { useEffect, useState } from "react";
import "./Trainer.css";
import { Plus, Filter, Download, Users, Users2, UserX, UserPlus, Edit2, Trash2 } from "lucide-react";
import PageHeader from "../../components/PageHeader/PageHeader";
import KpiCard from "../../components/KpiCard/KpiCard";
import FilterButtons from "../../components/FilterButtons/FilterButtons";
import TrainerProfileModal from "../../components/TrainerProfileModal/TrainerProfileModal";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import { addTrainer, deleteTrainer, getAllTrainers, updateTrainer } from "../../apiservice/apiservice";
import { useDispatch } from 'react-redux';
import { showToast } from '../../redux/toastSlice';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';

// ✅ Updated mock data aligned with entity (summary only)



const Trainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [trainersList, setTrainersList] = useState([]);
  const [isAddingTrainer, setIsAddingTrainer] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState(null);

  const [filterTags, setFilterTags] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [deletingTrainerId, setDeletingTrainerId] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    trainerId: null,
    name: null,
  });

  const tags = ['All', 'Yoga', 'HIIT', 'Strength', 'Pilates', 'Zumba'];

  const fetchAllTrainer = async () => {
    try {
      const response = await getAllTrainers();
      setTrainersList(response);
    } catch (error) {
      console.error('Error:', error.response || error.message);
    }
  };

  useEffect(() => {
    fetchAllTrainer();
  }, []);

  // ✅ Updated save logic (entity aligned)
  const handleSaveTrainer = async (formData) => {

    try {
      if (editingTrainer) {
        const response = await updateTrainer(editingTrainer.id, formData);
        dispatch(showToast({ message: response.message, type: "success" }));

      } else {
        const response = await addTrainer(formData);
        dispatch(showToast({ message: response.message, type: "success" }));
      }

      fetchAllTrainer();

      setIsAddingTrainer(false);
      setEditingTrainer(null);

    } catch (error) {
      console.log(error)
      dispatch(showToast({ message: error.message, type: "error" }));

    }

  };

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

  // ✅ Updated filter (skills based)
  const filteredTrainer = trainersList.filter((trainer) => {
    if (filterTags === 'All') return true;

    return trainer.skills?.some(skill =>
      skill.toLowerCase().includes(filterTags.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredTrainer.length / pageSize) || 1;
  const paginatedTrainers = filteredTrainer.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="trainer-page">

      <PageHeader
        title="Trainer Management"
        subtitle="Manage your gym's professional coaching staff and their schedules."
        actions={[
          {
            label: "Add New Trainer",
            icon: <Plus size={18} />,
            onClick: () => { setEditingTrainer(null); setIsAddingTrainer(true); },
            className: "btn-primary"
          }
        ]}
      />

      {/* KPI */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', margin: '24px 0' }}>
        <KpiCard title="Total Trainers" value={trainersList.length} theme="teal" Icon={Users} />
        <KpiCard title="Active Trainers" value={trainersList.filter(t => t.active).length} theme="blue" Icon={UserPlus} />
        <KpiCard title="Unavailable" value={trainersList.filter(t => !t.available).length} theme="purple" Icon={UserX} />
        <KpiCard title="Top Rated" value="9" theme="orange" />
      </section>

      {/* FILTER */}
      <div className="trainer-filter">
        <div className="tags">
          <FilterButtons
            options={tags}
            selected={filterTags}
            onChange={(val) => { setFilterTags(val); setCurrentPage(1); }}
          />
        </div>

        <div className="filter-icons">
          <button className="btn-primary">
            <Download size={18} /> Export
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-container-wrapper">
        <table className="table-container">
          <thead>
            <tr>
              <th>Name</th>
              <th>Skills</th>
              <th>Experience</th>
              <th>Assigned Members</th>
              <th>Status</th>
              <th className="actions-column">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {paginatedTrainers.map((trainer) => (
              <tr key={trainer.id}  >

                {/* NAME */}
                <td>
                  <div className="trainer-info">
                    <img src={trainer.profileImageUrl} alt="" />
                    <div>
                      <p className="trainer-name" style={{ cursor: 'pointer' }}
                        onClick={() => navigate(`/trainer/${trainer.id}`)}>{trainer.fullName}</p>
                      <span>{trainer.email}</span>
                    </div>
                  </div>
                </td>

                {/* SKILLS */}
                <td>
                  <span className="specialty">
                    {trainer.skills?.slice(0, 2).join(", ")}
                  </span>
                </td>

                {/* EXPERIENCE */}
                <td>
                  {trainer.experienceInYears} yrs
                </td>

                {/* MEMBERS */}
                <td className="members">
                  {trainer.assignedMembersCount}
                </td>

                {/* STATUS */}
                <td>
                  <span className={trainer.available ? "status active" : "status leave"}>
                    {trainer.available ? "Available" : "Busy"}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="actions-cell">
                  <div className="row-actions">
                    <button
                      className="action-icon-btn edit-btn"
                      title="Edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingTrainer(trainer);
                        setIsAddingTrainer(true);
                      }}
                    >
                      <Edit2 size={16} />
                    </button>

                    <button className="action-icon-btn delete-btn" title="Delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmModal({
                          open: true,
                          trainerId: trainer.id,
                          name: trainer.fullName,
                        });
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer className="members-footer" style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="showing-entries" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          Showing {filteredTrainer.length > 0 ? ((currentPage - 1) * pageSize) + 1 : 0} to {Math.min(currentPage * pageSize, filteredTrainer.length)} of {filteredTrainer.length} trainers
        </div>

        {filteredTrainer.length > pageSize && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </footer>

      {/* MODAL */}
      {isAddingTrainer && (
        <TrainerProfileModal
          isOpen={isAddingTrainer}
          onClose={() => {
            setIsAddingTrainer(false);
            setEditingTrainer(null);
          }}
          data={
            editingTrainer || {
              fullName: "",
              email: "",
              phoneNumber: "",
              experienceInYears: 0,
              bio: "",
              profileImageUrl: "",
              skills: [],
              certifications: "",
              instagramHandle: "",
              linkedinUrl: "",
              availability: [], // ✅ NEW
              active: true,
              available: true,
              visibleOnWebsite: true,
              featured: false
            }
          }
          onSave={handleSaveTrainer}
        />
      )}

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

export default Trainer;