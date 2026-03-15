import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import AddMember from './AddMember';


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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="heading-1">Members Directory</h1>
          <p className="subtitle mt-1">Manage your gym members and their subscriptions.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsAddingMember(true)}>
          <Plus size={18} />
          Add Member
        </button>
      </div>

      <div className="glass-panel p-6 mb-8">
        <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
          <div className="header-search" style={{ margin: 0, width: '100%', maxWidth: '400px' }}>
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search members by name or email..." 
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <button className="btn btn-secondary">
              <Filter size={18} />
              Filters
            </button>
            <select className="input-field" style={{ padding: '0.5rem 1rem', margin: 0 }}>
              <option value="all">All Plans</option>
              <option value="basic">Basic</option>
              <option value="pro">Pro</option>
              <option value="vip">VIP</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Join Date</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.id}
                    onClick={() => navigate(`/members/${member.id}`)}
                    style={{ cursor: "pointer" }}>
                  <td>
                    <div className="flex items-center gap-3">
                      <img src={`https://ui-avatars.com/api/?name=${member.name.replace(' ', '+')}&background=random`} alt={member.name} className="w-10 h-10 rounded-full" />
                      <div>
                        <p className="font-medium text-text-primary">{member.name}</p>
                        <p className="text-sm text-text-muted">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${member.plan === 'VIP' ? 'badge-warning' : member.plan === 'Pro' ? 'badge-success' : 'badge-secondary'}`} style={member.plan === 'Basic' ? { backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' } : {}}>
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
                    <div className="flex justify-end gap-2">
                      <button className="icon-btn" style={{ width: '32px', height: '32px' }} title="Edit">
                        <Edit2 size={14} />
                      </button>
                      <button className="icon-btn hover:text-danger hover:bg-danger/10" style={{ width: '32px', height: '32px' }} title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredMembers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-text-muted">No members found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-border-light">
          <p className="text-sm text-text-muted">Showing {filteredMembers.length} of {members.length} members</p>
          <div className="flex gap-2">
            <button className="btn btn-secondary" disabled>Previous</button>
            <button className="btn btn-secondary">Next</button>
          </div>
        </div>
      </div>
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
