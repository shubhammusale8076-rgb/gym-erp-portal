import React from 'react';
import { 
  X, Star, Expand, Medal, Users2, Edit2, 
  ChevronLeft, ChevronRight, ArrowRight, Award, 
  FileCheck, ShieldCheck
} from 'lucide-react';
import './StaffDetailModal.css';

const StaffDetailModal = ({ isOpen, onClose, staffUser }) => {
  if (!isOpen || !staffUser) return null;

  return (
    <div className="staff-detail-overlay" onClick={onClose}>
      <div className="staff-detail-modal" onClick={e => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="staff-modal-content">
          
          {/* Header Section */}
          <div className="staff-header-section">
            <div className="staff-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=300&auto=format&fit=crop" 
                alt={staffUser.name} 
                className="staff-hero-image"
              />
              <span className="staff-role-badge">ELITE PERFORMANCE COACH</span>
            </div>

            <div className="staff-info-wrapper">
              <div className="staff-status-id">
                <span className={`staff-status-pill ${staffUser.status.toLowerCase()}`}>
                  <span className="status-dot"></span> {staffUser.status}
                </span>
                <span className="staff-id-text">/ STAFF ID: 8820-MB</span>
              </div>
              
              <h1 className="staff-fullname">{staffUser.name}</h1>
              <p className="staff-tagline">
                Transforming high-performance athletes through precision biomechanics and holistic neurological conditioning.
              </p>

              <div className="staff-action-buttons">
                <button className="btn-solid-purple">
                  <Edit2 size={14} /> Edit Profile
                </button>
                <button className="btn-outline-purple">
                  Performance Review
                </button>
              </div>
            </div>
          </div>

      <div className="staff-modal-body">
          {/* KPI Section */}
          <div className="staff-kpi-row">
            <div className="staff-kpi-card">
              <div className="kpi-icon-wrapper"><Star size={18} fill="currentColor" /></div>
              <span className="kpi-label">MEMBER SATISFACTION</span>
              <div className="kpi-value-group">
                <span className="kpi-main-val">4.9</span>
                <span className="kpi-sub-val">/5.0</span>
              </div>
              <div className="kpi-progress-bar"><div className="kpi-progress-fill" style={{width: '98%'}}></div></div>
            </div>

            <div className="staff-kpi-card">
              <div className="kpi-icon-wrapper"><Expand size={18} /></div>
              <span className="kpi-label">SESSIONS COMPLETED</span>
              <div className="kpi-value-group">
                <span className="kpi-main-val">120</span>
                <span className="kpi-sub-val">/mo</span>
              </div>
              <div className="kpi-progress-bar"><div className="kpi-progress-fill" style={{width: '85%'}}></div></div>
            </div>

            <div className="staff-kpi-card">
              <div className="kpi-icon-wrapper"><ShieldCheck size={18} /></div>
              <span className="kpi-label">RETENTION RATE</span>
              <div className="kpi-value-group">
                <span className="kpi-main-val">94%</span>
              </div>
              <div className="kpi-progress-bar"><div className="kpi-progress-fill" style={{width: '94%'}}></div></div>
            </div>

            <div className="staff-kpi-card">
              <div className="kpi-icon-wrapper"><Users2 size={18} /></div>
              <span className="kpi-label">CURRENT ROSTER</span>
              <div className="kpi-value-group">
                <span className="kpi-main-val">45</span>
                <span className="kpi-sub-val" style={{marginLeft: '4px'}}>Members</span>
              </div>
              <div className="kpi-progress-bar"><div className="kpi-progress-fill" style={{width: '70%'}}></div></div>
            </div>
          </div>

          {/* Biography & Specialties */}
          <div className="staff-bio-grid">
             <div className="bio-col-left">
               <h3 className="section-title">Professional Biography</h3>
               <div className="bio-text">
                 <p>With over a decade of experience in high-performance sports, {staffUser.name.split(' ')[0]} brings a scientific rigor to the gym floor. His approach is rooted in <strong>Applied Exercise Physiology</strong> and <strong>Biomechanics</strong>, developed during his tenure with national athletic programs.</p>
                 <p>{staffUser.name.split(' ')[0]} specializes in the delicate balance between structural integrity and explosive power. His clients range from executive leaders seeking sustainable longevity to professional athletes refining their competitive edge.</p>
                 <p>Beyond the weights, {staffUser.name.split(' ')[0]} is a dedicated student of neurological fatigue and recovery protocols, ensuring every training block is as efficient as it is effective.</p>
               </div>
             </div>

             <div className="bio-col-right">
               <h3 className="section-title">Curated Specialties</h3>
               <div className="specialties-container">
                 <div className="specialty-tags">
                   <span className="tag">Olympic Lifting</span>
                   <span className="tag">Hypertrophy</span>
                   <span className="tag">Rehab Protocols</span>
                   <span className="tag">Metabolic Conditioning</span>
                   <span className="tag">Bio-Mechanical Analysis</span>
                 </div>
                 <div className="floating-icon-badge">
                   <FileCheck size={16} />
                 </div>
               </div>

               <h3 className="section-title" style={{marginTop: '2rem'}}>Certifications</h3>
               <div className="certifications-list">
                 <div className="cert-item">
                   <div className="cert-icon"><Medal size={14} /></div>
                   <div className="cert-info">
                     <h4>MSc Sports Science</h4>
                     <p>Oxford Brookes University</p>
                   </div>
                 </div>
                 <div className="cert-item">
                   <div className="cert-icon"><Award size={14} /></div>
                   <div className="cert-info">
                     <h4>NSCA Certified Strength Specialist</h4>
                     <p>Level 5 Master Trainer</p>
                   </div>
                 </div>
               </div>
             </div>
          </div>

          {/* Weekly Schedule */}
          <div className="schedule-section">
            <div className="section-header-flex">
              <h3 className="section-title">Weekly Schedule</h3>
              <div className="date-navigator">
                <ChevronLeft size={16} className="nav-icon"/>
                <span>OCT 23 - OCT 29</span>
                <ChevronRight size={16} className="nav-icon"/>
              </div>
            </div>

            <div className="weekly-grid">
              <div className="day-column">
                <span className="day-name">MONDAY</span>
                <div className="schedule-card highlight-border">
                  <span className="time">06:00-09:00</span>
                  <span className="class-name">Elite 1-on-1</span>
                </div>
              </div>
              <div className="day-column">
                <span className="day-name">TUESDAY</span>
                <div className="schedule-card default">
                  <span className="time">10:00-11:00</span>
                  <span className="class-name">Power Class</span>
                </div>
              </div>
              <div className="day-column">
                <span className="day-name">WEDNESDAY</span>
                <div className="schedule-card solid">
                  <span className="time">07:00-10:00</span>
                  <span className="class-name">Peak Performance</span>
                </div>
              </div>
              <div className="day-column">
                <span className="day-name">THURSDAY</span>
                <div className="schedule-card default">
                  <span className="time">13:00-15:00</span>
                  <span className="class-name">Rehab Session</span>
                </div>
              </div>
              <div className="day-column">
                <span className="day-name">FRIDAY</span>
                <div className="schedule-card highlight-border">
                  <span className="time">09:00-12:00</span>
                  <span className="class-name">Elite Group</span>
                </div>
              </div>
              <div className="day-column">
                <span className="day-name">SATURDAY</span>
                <div className="schedule-card empty">
                  <span className="time">Off Duty</span>
                </div>
              </div>
              <div className="day-column">
                <span className="day-name">SUNDAY</span>
                <div className="schedule-card empty">
                  <span className="time">Off Duty</span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Elite Roster */}
          <div className="roster-section">
            <div className="section-header-flex">
              <h3 className="section-title">Active Elite Roster</h3>
              <button className="btn-text-link">VIEW FULL ROSTER <ArrowRight size={14} /></button>
            </div>

            <div className="roster-table-wrapper">
              <table className="roster-table">
                <thead>
                  <tr>
                    <th>MEMBER</th>
                    <th>PROGRAM</th>
                    <th>NEXT SESSION</th>
                    <th>PROGRESS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="roster-member">
                        <img src="https://i.pravatar.cc/150?u=julian" alt="Julian Vane" />
                        <div>
                          <p className="roster-name">Julian Vane</p>
                          <p className="roster-email">julian.v@premium.com</p>
                        </div>
                      </div>
                    </td>
                    <td className="roster-program">Hypertrophy Master</td>
                    <td className="roster-date">Oct 25, 08:00 AM</td>
                    <td><span className="progress-badge success">ON TRACK</span></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="roster-member">
                        <img src="https://i.pravatar.cc/150?u=elena" alt="Elena Rossi" />
                        <div>
                          <p className="roster-name">Elena Rossi</p>
                          <p className="roster-email">elena.rossi@study.it</p>
                        </div>
                      </div>
                    </td>
                    <td className="roster-program">Bio-Mechanical Rehab</td>
                    <td className="roster-date">Oct 27, 10:00 AM</td>
                    <td><span className="progress-badge warning">MAINTENANCE</span></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="roster-member">
                        <img src="https://i.pravatar.cc/150?u=marcus" alt="Marcus Thorne" />
                        <div>
                          <p className="roster-name">Marcus Thorne</p>
                          <p className="roster-email">m.thorne@equity.com</p>
                        </div>
                      </div>
                    </td>
                    <td className="roster-program">Peak Power Cycle</td>
                    <td className="roster-date">Oct 28, 06:30 AM</td>
                    <td><span className="progress-badge success">PEAK PERFORMANCE</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDetailModal;
