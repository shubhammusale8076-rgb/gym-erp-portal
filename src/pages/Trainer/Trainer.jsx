import React, { useState } from "react";
import "./Trainer.css";
import { Plus, Filter, Download, Users, Users2, UserX, UserPlus, Edit2, Trash2 } from "lucide-react";
import PageHeader from "../../components/PageHeader/PageHeader";
import KpiCard from "../../components/KpiCard/KpiCard";
import FilterButtons from "../../components/FilterButtons/FilterButtons";
import TrainerProfileModal from "../../components/TrainerProfileModal/TrainerProfileModal";

const trainers = [
  {
    id: 1,
    name: "Alex Rivera",
    email: "alex.rivera@fitmanager.com",
    specialty: "Strength Training",
    certifications: 'NASM-CPT, Precision Nutrition L1',
    bio: 'Certified personal trainer with over 8 years of experience helping clients achieve their fitness goals through functional movement and strength training. Specialized in athletic performance and recovery protocols. I believe fitness is a communal journey.',
    members: 24,
    schedule: "Mon - Fri\n06:00 AM - 02:00 PM",
    status: "Active",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    social: {
      community: '@alex_the_coach',
      linkedin: 'linkedin.com/in/arivera'
    },
    availability: ['MON', 'TUE', 'THU', 'FRI'],
    shifts: ['morning'],
    skills: ['Yoga', 'HIIT', 'Powerlifting'],

  },
  {
    id: 2,
    name: "Sarah Chen",
    email: "s.chen@fitmanager.com",
    specialty: "Yoga & Mindfulness",
    members: 18,
    schedule: "Tue - Sat\n08:00 AM - 04:00 PM",
    status: "Active",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    email: "elena.r@fitmanager.com",
    specialty: "Pilates Specialist",
    members: 15,
    schedule: "Wed - Sun\n10:00 AM - 06:00 PM",
    status: "Active",
    imageUrl: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    id: 4,
    name: "Mike Johnson",
    email: "mike.j@fitmanager.com",
    specialty: "HIIT Master",
    members: 30,
    schedule: "Returning Oct 15th",
    status: "On Leave",
    imageUrl: "https://randomuser.me/api/portraits/men/21.jpg"
  }
];

const Trainer = () => {
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [trainersList, setTrainersList] = useState(trainers);
  const [isAddingTrainer, setIsAddingTrainer] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState(null);
  const [filterTags, setFilterTags] = useState("All")
  const tags = ['All Specialties', 'Yoga', 'HIIT', 'Strength', 'Pilates', 'Zumba'];

  const handleSaveTrainer = (formData) => {
    if (editingTrainer) {
      setTrainersList(prev =>
        prev.map(t =>
          t.id === editingTrainer.id
            ? {
              ...t,
              name: formData.name,
              specialty: formData.certifications,
              imageUrl: formData.imageUrl || t.imageUrl
            }
            : t
        )
      );
    } else {
      const newTrainer = {
        id: Date.now(),
        name: formData.name,
        email: "new@trainer.com",
        specialty: formData.certifications,
        members: 0,
        schedule: "TBD",
        status: "Active",
        imageUrl: formData.imageUrl || "https://randomuser.me/api/portraits/lego/1.jpg"
      };

      setTrainersList(prev => [...prev, newTrainer]);
    }

    setIsAddingTrainer(false);
    setEditingTrainer(null);
  };

  const filterdTrainer = trainersList.filter((trainer) => {
    const filterLower = filterTags === 'All' || trainer.specialty.toLowerCase().includes(filterTags.toLowerCase());
    return filterLower;
  })

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

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', margin: '24px 0' }}>
        <KpiCard title="Total Trainers" value="1,534" theme="teal" Icon={Users} />
        <KpiCard title="Active Trainers" value="15" theme="blue" Icon={UserPlus} />
        <KpiCard title="On Leave" value="3" theme="purple" Icon={UserX} />
        <KpiCard title="Top Rated" value="9" theme="orange" />
      </section>

      <div className="trainer-filter">
        <div className="tags">

          <FilterButtons
            options={['All', ...tags]}
            selected={filterTags}
            onChange={setFilterTags}
          />
        </div>

        <div className="filter-icons">
          <button className="btn-primary"><Download size={18} /> Export</button>
        </div>

      </div>

      {/* TABLE */}
      <div className="table-container-wrapper">
        <table className="table-container">
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialty</th>
              <th>Assigned Members</th>
              <th>Schedule</th>
              <th>Status</th>
              <th className="actions-column">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {filterdTrainer.map((trainer) => (
              <tr key={trainer.id} onClick={() => setSelectedTrainer(trainer)} style={{ cursor: 'pointer' }}>

                <td>
                  <div className="trainer-info">
                    <img src={trainer.imageUrl} alt="" />
                    <div>
                      <p className="trainer-name">{trainer.name}</p>
                      <span>{trainer.email}</span>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="specialty">
                    {trainer.specialty}
                  </span>
                </td>

                <td className="members">{trainer.members}</td>

                <td className="schedule">
                  {trainer.schedule}
                </td>

                <td>
                  <span className={trainer.status === "Active" ? "status active" : "status leave"}>
                    {trainer.status}
                  </span>
                </td>
                <td className="actions-cell">
                  <div className="row-actions">
                    <button className="action-icon-btn edit-btn" title="Edit" onClick={(e) => { e.stopPropagation(); setEditingTrainer(trainer); setIsAddingTrainer(true); }}>
                      <Edit2 size={16} />
                    </button>
                    <button className="action-icon-btn delete-btn" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTrainer && (
        <TrainerProfileModal
          isOpen={selectedTrainer}
          onClose={() => setSelectedTrainer(null)}
          data={selectedTrainer}
        />
      )}

      {isAddingTrainer && (
        <TrainerProfileModal
          isOpen={isAddingTrainer}
          onClose={() => {
            setIsAddingTrainer(false);
            setEditingTrainer(null);
          }}
          data={
            editingTrainer || {
              name: "",
              certifications: "",
              bio: "",
              imageUrl: "",
              skills: [],
              availability: [],
              shifts: [],
              social: {
                community: "",
                linkedin: ""
              }
            }
          }
          onSave={handleSaveTrainer}
        />
      )}

    </div>
  );
};

export default Trainer;
