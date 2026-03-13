import React, { useState } from "react";
import "./Trainer.css";
import { Plus, Filter, Download } from "lucide-react";
import TrainerDetail from "../TrainerDetail/TrainerDetail";

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

      {/* HEADER */}
      <div className="trainer-header">
        <div>
          <h1>Trainer Management</h1>
          <p>Manage your gym's professional coaching staff and their schedules.</p>
        </div>

        <button className="add-btn">
          <Plus size={18}/> Add New Trainer
        </button>
      </div>

      {/* STATS */}
      <div className="trainer-stats">

        <div className="stat-card">
          <h4>Total Trainers</h4>
          <h2>24</h2>
        </div>

        <div className="stat-card">
          <h4>Active Now</h4>
          <h2>18</h2>
        </div>

        <div className="stat-card">
          <h4>On Leave</h4>
          <h2>4</h2>
        </div>

        <div className="stat-card">
          <h4>Top Rated</h4>
          <h2>9</h2>
        </div>

      </div>

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
          <button><Filter size={18}/></button>
          <button><Download size={18}/></button>
        </div>

      </div>

      {/* TABLE */}
      <div className="trainer-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialty</th>
              <th>Assigned Members</th>
              <th>Schedule</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {trainers.map((trainer)=>(
              <tr key={trainer.id} onClick={() => setSelectedTrainer(trainer)} style={{cursor: 'pointer'}}>

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
