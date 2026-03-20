import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import AddMember from './AddMember';
import './Members.css';

const initialMembers = [
  { id: 1, name: 'Sarah Connor', email: 'sarah@example.com', plan: 'Pro', status: 'Active', joinDate: '2025-11-12' },
  { id: 2, name: 'John Smith', email: 'john@example.com', plan: 'Basic', status: 'Active', joinDate: '2026-01-05' },
  { id: 3, name: 'Emma Wilson', email: 'emma@example.com', plan: 'VIP', status: 'Inactive', joinDate: '2025-08-22' },
  { id: 4, name: 'Michael Brown', email: 'mike@example.com', plan: 'Pro', status: 'Active', joinDate: '2026-02-14' },
  { id: 5, name: 'Jessica Davis', email: 'jess@example.com', plan: 'Basic', status: 'Active', joinDate: '2026-03-01' },
];

const Members = () => {
  const [members, setMembers] = useState(initialMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingMember, setIsAddingMember] = useState(false);
  const navigate = useNavigate();

  const handleAddMember = (newMemberData) => {
    const newMember = {
      id: members.length + 1,
      name: newMemberData.fullName,
      email: newMemberData.email,
      plan: newMemberData.membershipPlan,
      status: 'Active',
      joinDate: newMemberData.joinDate
    };
    setMembers([...members, newMember]);
    setIsAddingMember(false);
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="members">
      <header className="members-header">
        <div>
          <h1 className="heading-1">Members Directory</h1>
          <p className="members-subtitle">Manage your gym members and their subscriptions.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsAddingMember(true)}>
          <Plus size={18} />
          Add Member
        </button>
      </header>

      <section className="members-filters-panel glass-panel">
        <div className="members-filters-bar">
          <div className="members-search-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search members by name or email..."
              className="members-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="members-actions-group">
            <button className="btn btn-secondary">
              <Filter size={18} />
              Filters
            </button>
            <select className="members-plan-select input-field">
              <option value="all">All Plans</option>
              <option value="basic">Basic</option>
              <option value="pro">Pro</option>
              <option value="vip">VIP</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="data-table members-data-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Join Date</th>
                <th className="members-table-actions-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.id}
                  onClick={() => navigate(`/members/${member.id}`)}>
                  <td>
                    <div className="member-profile-info">
                      <img
                        src={`https://ui-avatars.com/api/?name=${member.name.replace(' ', '+')}&background=random`}
                        alt={member.name}
                        className="member-profile-image"
                      />
                      <div>
                        <p className="member-name-text">{member.name}</p>
                        <p className="member-email-text">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${member.plan === 'VIP' ? 'badge-warning' :
                        member.plan === 'Pro' ? 'badge-success' :
                          'badge-plan-basic'
                      }`}>
                      {member.plan}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${member.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                      {member.status}
                    </span>
                  </td>
                  <td>{member.joinDate}</td>
                  <td>
                    <div className="member-actions-buttons">
                      <button className="icon-btn member-action-btn" title="Edit">
                        <Edit2 size={14} />
                      </button>
                      <button className="icon-btn member-action-btn member-delete-btn" title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredMembers.length === 0 && (
            <div className="members-empty-state">
              <p className="member-muted-text">No members found matching "{searchTerm}"</p>
            </div>
          )}
        </div>

        <footer className="members-pagination-footer">
          <p className="member-muted-text-sm">Showing {filteredMembers.length} of {members.length} members</p>
          <div className="pagination-controls">
            <button className="btn btn-secondary" disabled>Previous</button>
            <button className="btn btn-secondary">Next</button>
          </div>
        </footer>
      </section>
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
