import React, { useState } from 'react';
import './TrainerAttendance.css';
import {
  Pencil,
  Search,
  Layout,
  Calendar,
  ArrowUpRight,
  AlertCircle,
  Clock,
  CheckCircle2,
  User2
} from 'lucide-react';
import PageHeader from '../../components/PageHeader/PageHeader';
import KpiCard from '../../components/KpiCard/KpiCard';

const TrainerAttendance = () => {
  const [viewType, setViewType] = useState('Table View');

  const attendanceData = [
    {
      id: 1,
      name: "Marcus Blake",
      checkIn: "06:15 AM",
      checkOut: "-",
      status: "PRESENT",
      source: "Biometric",
      hours: "4.5h",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      name: "Seraphina James",
      checkIn: "08:30 AM",
      checkOut: "-",
      status: "PRESENT",
      source: "Manual",
      hours: "2.2h",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 3,
      name: "Elena Rossi",
      checkIn: "09:15 AM",
      checkOut: "-",
      status: "LATE",
      source: "Biometric",
      hours: "1.5h",
      image: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
      id: 4,
      name: "David Miller",
      checkIn: "-",
      checkOut: "-",
      status: "ABSENT",
      source: "-",
      hours: "0h",
      initials: "DM",
      color: "#f3f4f6"
    },
    {
      id: 5,
      name: "Lydia Chen",
      checkIn: "-",
      checkOut: "-",
      status: "ON LEAVE",
      source: "-",
      hours: "0h",
      image: "https://randomuser.me/api/portraits/women/12.jpg"
    }
  ];

  return (
    <div className="trainer-attendance-container">
      <header className="attendance-header">
        <PageHeader
          title="Trainer Attendance Dashboard"
          subtitle="Monitoring real-time presence and efficiency for Aura Premium's elite coaching staff."
          actions={[]}
        />
        <div className="view-toggle">
          <button
            className={`toggle-btn ${viewType === 'Table View' ? 'active' : ''}`}
            onClick={() => setViewType('Table View')}
          >
            Table View
          </button>
          <button
            className={`toggle-btn ${viewType === 'Calendar Heatmap' ? 'active' : ''}`}
            onClick={() => setViewType('Calendar Heatmap')}
          >
            Calendar Heatmap
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', margin: '32px 0' }}>
        <KpiCard title="PRESENT TODAY" value="18" theme="blue" Icon={User2} />
        <KpiCard title="LATE ARRIVAL" value="02" theme="purple" Icon={AlertCircle} />
        <KpiCard title="UNACCOUNTED" value="118" theme="orange" Icon={Clock} />
        <KpiCard title="SCHEDULED LEAVE" value="24" theme="teal" Icon={Calendar} />
      </div>

      <div className="trainer-filter-wrapper">
        <div className="search-bar-wrapper">
          <Search size={18} className="search-icon-inline" />
          <input
            type="text"
            placeholder="Search members by name or email..."
            className="search-input-pill"
            // value={searchTerm}
            // onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
      </div>

      <div className="table-container-wrapper">
        <table className="table-container">
          <thead>
            <tr>
              <th>TRAINER NAME</th>
              <th>CHECK-IN</th>
              <th>CHECK-OUT</th>
              <th>STATUS</th>
              <th>SOURCE</th>
              <th>HOURS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map(row => (
              <tr key={row.id}>
                <td>
                  <div className="trainer-name-cell">
                    {row.image ? (
                      <img src={row.image} alt={row.name} className="trainer-avatar" />
                    ) : (
                      <div className="trainer-initials" style={{ backgroundColor: row.color }}>
                        {row.initials}
                      </div>
                    )}
                    <span className="trainer-name">{row.name}</span>
                  </div>
                </td>
                <td>{row.checkIn}</td>
                <td>{row.checkOut}</td>
                <td>
                  <span className={`status-pill ${row.status.toLowerCase().replace(' ', '-')}`}>
                    {row.status}
                  </span>
                </td>
                <td>{row.source}</td>
                <td>{row.hours}</td>
                <td>
                  <button className="edit-btn-circular">
                    <Pencil size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="attendance-footer">
        © AURA PREMIUM ELITE CURATOR • SECURE BIOMETRIC VERIFICATION ACTIVE
      </footer>
    </div>
  );
};

export default TrainerAttendance;
