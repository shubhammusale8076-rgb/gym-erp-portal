import React, { useState } from "react";
import "./Trainer.css";
import { Plus, Filter, Download, Users, Users2, UserX, UserPlus, Edit2, Trash2 } from "lucide-react";
import TrainerDetail from "../TrainerDetail/TrainerDetail";
import PageHeader from "../../components/PageHeader/PageHeader";
import KpiCard from "../../components/KpiCard";

const trainers = [
  {
    id: 1,
    name: "Alex Rivera",
    email: "alex.rivera@fitmanager.com",
    specialty: "Strength Training",
    members: 24,
    schedule: "Mon - Fri\n06:00 AM - 02:00 PM",
    status: "Active",
    img: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Sarah Chen",
    email: "s.chen@fitmanager.com",
    specialty: "Yoga & Mindfulness",
    members: 18,
    schedule: "Tue - Sat\n08:00 AM - 04:00 PM",
    status: "Active",
    img: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    email: "elena.r@fitmanager.com",
    specialty: "Pilates Specialist",
    members: 15,
    schedule: "Wed - Sun\n10:00 AM - 06:00 PM",
    status: "Active",
    img: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    id: 4,
    name: "Mike Johnson",
    email: "mike.j@fitmanager.com",
    specialty: "HIIT Master",
    members: 30,
    schedule: "Returning Oct 15th",
    status: "On Leave",
    img: "https://randomuser.me/api/portraits/men/21.jpg"
  }
];

const Trainer = () => {
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  return (
    <div className="trainer-page">

      <PageHeader
        title="Trainer Management"
        subtitle="Manage your gym's professional coaching staff and their schedules."
        actions={[
          {
            label: "Add New Trainer",
            icon: <Plus size={18} />,
            onClick: () => { },
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

      {/* FILTER */}
      <div className="trainer-filter">

        <div className="tags">
          <button className="active">All Specialties</button>
          <button>Yoga</button>
          <button>HIIT</button>
          <button>Strength</button>
          <button>Pilates</button>
          <button>Zumba</button>
        </div>

        <div className="filter-icons">
          <button><Filter size={18} /> Filter</button>
          <button><Download size={18} /> Export</button>
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
            {trainers.map((trainer) => (
              <tr key={trainer.id} onClick={() => setSelectedTrainer(trainer)} style={{ cursor: 'pointer' }}>

                <td>
                  <div className="trainer-info">
                    <img src={trainer.img} alt="" />
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
                    <button className="action-icon-btn edit-btn" title="Edit">
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
        <TrainerDetail
          trainer={selectedTrainer}
          onClose={() => setSelectedTrainer(null)}
        />
      )}

    </div>
  );
};

export default Trainer;
