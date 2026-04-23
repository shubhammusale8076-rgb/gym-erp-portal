import React, { useState } from 'react';
import { Sparkles, Plus, Edit2, Trash2, Camera, X, Users, Link as LinkIcon, Sun, Moon } from 'lucide-react';
import './TrainersPageManager.css';
import PageHeader from '../../../components/PageHeader/PageHeader';
import TrainerProfileModal from '../../../components/TrainerProfileModal/TrainerProfileModal';

const TrainersPageManager = () => {
  const [trainers, setTrainers] = useState([
    {
      id: 1,
      name: 'Alexander Rivera',
      certifications: 'NASM-CPT, Precision Nutrition L1',
      skills: ['Yoga', 'HIIT', 'Powerlifting'],
      bio: 'Certified personal trainer with over 8 years of experience helping clients achieve their fitness goals through functional movement and strength training. Specialized in athletic performance and recovery protocols. I believe fitness is a communal journey.',
      imageUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=300&auto=format&fit=crop',
      social: {
        community: '@alex_the_coach',
        linkedin: 'linkedin.com/in/arivera'
      },
      availability: ['MON', 'TUE', 'THU', 'FRI'],
      shifts: ['morning']
    },
    {
      id: 2,
      name: 'Sarah Jenkins',
      certifications: 'ACE Certified, CrossFit L2',
      skills: ['HIIT', 'CrossFit', 'Endurance'],
      bio: 'High energy coach specializing in fat loss and building cardiovascular endurance.',
      imageUrl: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=300&auto=format&fit=crop',
      social: { community: '@sarah_j_fit', linkedin: '' },
      availability: ['MON', 'WED', 'FRI'],
      shifts: ['morning', 'evening']
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTrainer, setActiveTrainer] = useState(null);
  const [newSkillText, setNewSkillText] = useState('');

  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const handleDelete = (id) => {
    setTrainers(trainers.filter(t => t.id !== id));
  };

  const openAddModal = () => {
    setActiveTrainer({
      id: Date.now(),
      name: '',
      certifications: '',
      skills: [],
      bio: '',
      imageUrl: '',
      social: { community: '', linkedin: '' },
      availability: [],
      shifts: []
    });
    setIsModalOpen(true);
  };

  const openEditModal = (trainer) => {
    // deep copy to avoid direct state mutation while editing safely
    setActiveTrainer(JSON.parse(JSON.stringify(trainer)));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveTrainer(null);
    setNewSkillText('');
  };

  const handleSaveProfile = () => {
    if (!activeTrainer) return;

    // Check if updating existing or adding new
    const exists = trainers.some(t => t.id === activeTrainer.id);
    if (exists) {
      setTrainers(trainers.map(t => t.id === activeTrainer.id ? activeTrainer : t));
    } else {
      setTrainers([...trainers, activeTrainer]);
    }
    closeModal();
  };

  // --- Modal Form Handlers ---
  const handleActiveChange = (field, value) => {
    setActiveTrainer({ ...activeTrainer, [field]: value });
  };

  const handleSocialChange = (network, value) => {
    setActiveTrainer({
      ...activeTrainer,
      social: { ...activeTrainer.social, [network]: value }
    });
  };

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      if (newSkillText.trim() && !activeTrainer.skills.includes(newSkillText.trim())) {
        setActiveTrainer({
          ...activeTrainer,
          skills: [...activeTrainer.skills, newSkillText.trim()]
        });
        setNewSkillText('');
      }
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setActiveTrainer({
      ...activeTrainer,
      skills: activeTrainer.skills.filter(s => s !== skillToRemove)
    });
  };

  const toggleDay = (day) => {
    const current = activeTrainer.availability;
    setActiveTrainer({
      ...activeTrainer,
      availability: current.includes(day) ? current.filter(d => d !== day) : [...current, day]
    });
  };

  const toggleShift = (shift) => {
    const current = activeTrainer.shifts;
    setActiveTrainer({
      ...activeTrainer,
      shifts: current.includes(shift) ? current.filter(s => s !== shift) : [...current, shift]
    });
  };

  return (
    <div className={`tm-container  ${isModalOpen ? 'modal-open' : ''}`}>

      <PageHeader
        title="Trainer Page Manager"
        subtitle="Manage your elite coaching staff profiles displayed on the website."
        actions={[]}
      />

      <div className="tm-actions-row">
        <span className="tm-count">{trainers.length} active trainers</span>

      </div>

      <div className="tm-grid">
        {trainers.map((trainer) => (
          <div key={trainer.id} className="tm-card card">
            <div className="tm-card-image-wrapper">
              {trainer.imageUrl ? (
                <img src={trainer.imageUrl} alt={trainer.name} className="tm-card-image" />
              ) : (
                <div className="tm-card-placeholder">
                  <Camera size={32} className="tm-placeholder-icon" />
                </div>
              )}
              <div className="tm-card-overlay">
                <button
                  className="tm-icon-btn edit-btn"
                  aria-label="Edit Trainer"
                  onClick={() => openEditModal(trainer)}
                >
                  <Edit2 size={16} />
                </button>
                <button
                  className="tm-icon-btn delete-btn"
                  aria-label="Delete Trainer"
                  onClick={() => handleDelete(trainer.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="tm-card-content">
              <h3 className="tm-display-name">{trainer.name}</h3>
              <p className="tm-display-specialty">{trainer.certifications || 'No Certs Listed'}</p>
              <p className="tm-display-bio">{trainer.bio}</p>

              <div className="tm-display-skills">
                {trainer.skills.slice(0, 3).map(skill => (
                  <span key={skill} className="tm-display-skill">{skill}</span>
                ))}
                {trainer.skills.length > 3 && <span className="tm-display-skill-more">+{trainer.skills.length - 3}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <TrainerProfileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        data={activeTrainer}
        onSave={handleSaveProfile}
      />

    </div>
  );
};

export default TrainersPageManager;
