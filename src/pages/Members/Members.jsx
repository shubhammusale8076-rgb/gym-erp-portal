import React, { useState } from 'react';
import { Search, Plus, Filter, Edit2, Trash2, UserPlus, User } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import AddMember from './AddMember';
import './Members.css';
import PageHeader from '../../components/PageHeader/PageHeader';
import Dropdown from '../../components/Dropdown/Dropdown';
import KpiCard from '../../components/KpiCard/KpiCard';

const initialMembers = [
  { id: 1, name: 'Alexandra Sterling', email: 'alex.sterling@curator.com', plan: 'Standard', status: 'Active', joinDate: 'Oct 12, 2023' },
  { id: 2, name: 'Julian Marshall', email: 'j.marshall@outlook.com', plan: 'Platinum', status: 'Active', joinDate: 'Nov 05, 2023' },
  { id: 3, name: 'Marcus Vane', email: 'mvane_elite@icloud.com', plan: 'Elite', status: 'Inactive', joinDate: 'Jan 18, 2024' },
  { id: 4, name: 'Sienna King', email: 'sienna.k@design.studio', plan: 'Standard', status: 'Active', joinDate: 'Feb 22, 2024' },
  { id: 5, name: 'Leo Fitzgerald', email: 'l.fitzgerald@modern.fit', plan: 'Platinum', status: 'Active', joinDate: 'Mar 04, 2024' },
];

const Members = () => {
  const [members, setMembers] = useState(initialMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Select Status');
  const [planFilter, setPlanFilter] = useState('Select Plan');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Set to 6 to see pagination better if we add members.
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const navigate = useNavigate();

  const handleSaveMember = (newMemberData) => {
    if (editingMember) {
      setMembers(members.map(m => m.id === editingMember.id ? {
        ...m,
        name: newMemberData.fullName,
        email: newMemberData.email,
        plan: newMemberData.membershipPlan
      } : m));
    } else {
      const newMember = {
        id: members.length + 1,
        name: newMemberData.fullName,
        email: newMemberData.email,
        plan: newMemberData.membershipPlan,
        status: 'Active',
        joinDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
      };
      setMembers([...members, newMember]);
    }
    setIsAddingMember(false);
    setEditingMember(null);
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Select Status' || member.status === statusFilter;
    const matchesPlan = planFilter === 'Select Plan' || member.plan === planFilter;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage) || 1;
  const currentMembers = filteredMembers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDeleteMember = (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      const updatedMembers = members.filter(m => m.id !== id);
      setMembers(updatedMembers);
      // Adjust page if we deleted the last item on current page
      if (currentMembers.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const allStatus = ["Active", "Inactive"];
  const allPlans = ["Standard", "Platinum", "Elite"];

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
        <KpiCard title="Total Check-Ins Today" value="142" theme="blue" Icon={User} />
        <KpiCard title="Peak Hour" value="06:00 PM" theme="purple" Icon={User} />
        <KpiCard title="Avg. Daily Attendance" value="118" theme="orange" Icon={User} />
        <KpiCard title="Active Members Now" value="24" theme="teal" Icon={User} />
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
              onClick: () => setStatusFilter(g)
            }))}
          />

          <Dropdown
            label={planFilter || "All Plans"}
            actions={allPlans.map(g => ({
              label: g,
              onClick: () => setPlanFilter(g)
            }))}
          />
        </div>
      </div>

      <div className="members-table-wrapper card-shadow">
        <table className="members-table">
          <thead>
            <tr>
              <th className="member-column">MEMBER</th>
              <th>MEMBERSHIP PLAN</th>
              <th>STATUS</th>
              <th>JOIN DATE</th>
              <th className="actions-column">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {currentMembers.map((member) => (
              <tr key={member.id} className="member-row">
                <td className="member-info-cell">
                  <div className="avatar-wrapper">
                    <img
                      src={`https://ui-avatars.com/api/?name=${member.name.replace(' ', '+')}&background=random&color=fff`}
                      alt={member.name}
                      className="member-avatar"
                    />
                  </div>
                  <div className="member-details">
                    <span className="member-name">{member.name}</span>
                    <span className="member-email">{member.email}</span>
                  </div>
                </td>
                <td className="plan-cell">{member.plan}</td>
                <td className="status-cell">
                  <span className={`status-pill ${member.status.toLowerCase()}`}>
                    <span className="status-dot"></span>
                    {member.status}
                  </span>
                </td>
                <td className="date-cell">{member.joinDate}</td>
                <td className="actions-cell">
                  <div className="row-actions">
                    <button className="action-icon-btn edit-btn" title="Edit" onClick={() => { setEditingMember(member); setIsAddingMember(true); }}>
                      <Edit2 size={16} />
                    </button>
                    <button className="action-icon-btn delete-btn" title="Delete" onClick={() => handleDeleteMember(member.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredMembers.length === 0 && (
          <div className="empty-state">
            <p>No members found matching your search.</p>
          </div>
        )}
      </div>

      <footer className="members-footer">
        <div className="showing-entries">
          Showing {filteredMembers.length > 0 ? ((currentPage - 1) * itemsPerPage) + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredMembers.length)} of {filteredMembers.length} members
        </div>
        <div className="pagination">
          <button
            className="page-nav prev"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            style={{ opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
          >
            <Plus size={16} style={{ transform: 'rotate(-135deg)' }} />
          </button>
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
              <button
                key={pageNum}
                className={`page-num ${currentPage === pageNum ? 'active' : ''}`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            ))}
          </div>
          <button
            className="page-nav next"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            style={{ opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
          >
            <Plus size={16} style={{ transform: 'rotate(45deg)' }} />
          </button>
        </div>
      </footer>

      {isAddingMember && (
        <AddMember
          onClose={() => { setIsAddingMember(false); setEditingMember(null); }}
          onAdd={handleSaveMember}
          initialData={editingMember}
        />
      )}
    </div>
  );
};

export default Members;
