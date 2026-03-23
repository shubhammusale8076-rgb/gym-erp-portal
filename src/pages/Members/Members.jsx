import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import AddMember from './AddMember';
import './Members.css';

const initialMembers = [
  { id: 1, name: 'Alexandra Sterling', email: 'alex.sterling@curator.com', plan: 'Black Diamond Elite', status: 'Active', joinDate: 'Oct 12, 2023' },
  { id: 2, name: 'Julian Marshall', email: 'j.marshall@outlook.com', plan: 'Foundational Pro', status: 'Active', joinDate: 'Nov 05, 2023' },
  { id: 3, name: 'Marcus Vane', email: 'mvane_elite@icloud.com', plan: 'Performance Core', status: 'Inactive', joinDate: 'Jan 18, 2024' },
  { id: 4, name: 'Sienna King', email: 'sienna.k@design.studio', plan: 'Black Diamond Elite', status: 'Active', joinDate: 'Feb 22, 2024' },
  { id: 5, name: 'Leo Fitzgerald', email: 'l.fitzgerald@modern.fit', plan: 'Foundational Pro', status: 'Active', joinDate: 'Mar 04, 2024' },
];

const Members = () => {
  const [members, setMembers] = useState(initialMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const navigate = useNavigate();

  const handleAddMember = (newMemberData) => {
    const newMember = {
      id: members.length + 1,
      name: newMemberData.fullName,
      email: newMemberData.email,
      plan: newMemberData.membershipPlan,
      status: 'Active',
      joinDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
    };
    setMembers([...members, newMember]);
    setIsAddingMember(false);
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="members-container">

      <header className="members-header">
        <div>
          <h1 className="heading-4">Members Directory</h1>
          <p className="members-subtitle">Manage your gym members and their subscriptions.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsAddingMember(true)}>
          <Plus size={18} />
          Add Member
        </button>
      </header>
      <div className="members-controls">
        <div className="search-bar-wrapper">
          <Search size={18} className="search-icon-inline" />
          <input
            type="text"
            placeholder="Search members by name or email..."
            className="search-input-pill"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="action-buttons-group">
          <button className="control-btn filter-btn">
            <Filter size={18} />
            <span>Filters</span>
          </button>

        </div>
      </div>

      <div className="members-table-wrapper card-shadow">
        <table className="members-table">
          <thead>
            <tr>
              <th>MEMBER</th>
              <th>PLAN TYPE</th>
              <th>STATUS</th>
              <th>JOIN DATE</th>
              <th className="actions-column">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
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

        {filteredMembers.length === 0 && (
          <div className="empty-state">
            <p>No members found matching your search.</p>
          </div>
        )}
      </div>

      <footer className="members-footer">
        <div className="showing-entries">
          Showing 1 to {filteredMembers.length} of {members.length} members
        </div>
        <div className="pagination">
          <button className="page-nav prev">
            <Plus size={16} style={{ transform: 'rotate(-135deg)' }} />
          </button>
          <div className="page-numbers">
            <button className="page-num active">1</button>
            <button className="page-num">2</button>
            <button className="page-num">3</button>
            <span className="page-ellipsis">...</span>
            <button className="page-num">12</button>
          </div>
          <button className="page-nav next">
            <Plus size={16} style={{ transform: 'rotate(45deg)' }} />
          </button>
        </div>
      </footer>

      {isAddingMember && (
        <AddMember
          onClose={() => setIsAddingMember(false)}
          onAdd={handleAddMember}
        />
      )}
    </div>
  );
};

export default Members;
