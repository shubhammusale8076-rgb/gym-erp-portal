import React, { useState } from 'react';
import { Sparkles, Plus, Edit2, Trash2, Camera, X, Star, Eye, EyeOff } from 'lucide-react';
import './TestimonialsManager.css';
import PageHeader from '../../../components/PageHeader/PageHeader';

const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      clientName: 'Michael Chang',
      role: 'Pro Member',
      content: 'GymSync completely transformed my fitness journey. The trainers are top-tier and the community is incredibly supportive. I\'ve never felt stronger!',
      rating: 5,
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
      isVisible: true
    },
    {
      id: 2,
      clientName: 'Jessica Williams',
      role: 'Yoga Enthusiast',
      content: 'The facilities are pristine and the class schedules fit perfectly with my hectic work life. Highly recommend the morning Vinyasa flows.',
      rating: 5,
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
      isVisible: true
    },
    {
      id: 3,
      clientName: 'David Rodriguez',
      role: 'Powerlifter',
      content: 'Best equipment in the city. The staff actually cares about your goals rather than just selling memberships.',
      rating: 4,
      imageUrl: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=200&auto=format&fit=crop',
      isVisible: false
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeReview, setActiveReview] = useState(null);

  const handleDelete = (id) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  const toggleVisibility = (id) => {
    setTestimonials(testimonials.map(t => t.id === id ? { ...t, isVisible: !t.isVisible } : t));
  };

  const openAddModal = () => {
    setActiveReview({
      id: Date.now(),
      clientName: '',
      role: '',
      content: '',
      rating: 5,
      imageUrl: '',
      isVisible: true
    });
    setIsModalOpen(true);
  };

  const openEditModal = (review) => {
    setActiveReview({ ...review });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveReview(null);
  };

  const handleSaveReview = () => {
    if (!activeReview) return;
    const exists = testimonials.some(t => t.id === activeReview.id);
    if (exists) {
      setTestimonials(testimonials.map(t => t.id === activeReview.id ? activeReview : t));
    } else {
      setTestimonials([...testimonials, activeReview]);
    }
    closeModal();
  };

  const handleActiveChange = (field, value) => {
    setActiveReview({ ...activeReview, [field]: value });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={14}
        fill={i < rating ? '#f6934c' : 'transparent'}
        color={i < rating ? '#f6934c' : '#cbd5e1'}
        className="testi-star"
      />
    ));
  };

  return (
    <div className={`testi-container ${isModalOpen ? 'modal-open' : ''}`}>

      <PageHeader
        title="Testimonials Manager"
        subtitle="Manage and curate the reviews displayed on your main website."
        actions={[]}
      />

      <div className="testi-actions-row">
        <span className="testi-count">
          {testimonials.filter(t => t.isVisible).length} published • {testimonials.length} total
        </span>
        <button className="btn-primary" onClick={openAddModal}>
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      <div className="testi-grid">
        {testimonials.map((review) => (
          <div key={review.id} className={`testi-card glass-panel ${!review.isVisible ? 'testi-hidden' : ''}`}>

            <div className="testi-card-header">
              <div className="testi-avatar-box">
                {review.imageUrl ? (
                  <img src={review.imageUrl} alt={review.clientName} />
                ) : (
                  <div className="testi-avatar-placeholder"><Camera size={18} /></div>
                )}
              </div>
              <div className="testi-client-info">
                <h3 className="testi-client-name">{review.clientName}</h3>
                <span className="testi-client-role">{review.role}</span>
              </div>
            </div>

            <div className="testi-card-stars">
              {renderStars(review.rating)}
            </div>

            <p className="testi-card-content">
              "{review.content}"
            </p>

            <div className="testi-card-footer">
              <div className="testi-visibility-toggle">
                <button
                  className={`testi-toggle-btn ${review.isVisible ? 'active' : ''}`}
                  onClick={() => toggleVisibility(review.id)}
                >
                  <div className="testi-toggle-slider"></div>
                </button>
                <span className="testi-toggle-label">
                  {review.isVisible ? <span className="testi-text-success"><Eye size={14} /> Visible</span> : <span className="testi-text-muted"><EyeOff size={14} /> Hidden</span>}
                </span>
              </div>

              <div className="testi-actions">
                <button className="testi-icon-btn" onClick={() => openEditModal(review)}>
                  <Edit2 size={16} />
                </button>
                <button className="testi-icon-btn delete" onClick={() => handleDelete(review.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>


      {/* --- ADD/EDIT MODAL --- */}
      {isModalOpen && activeReview && (
        <div className="testi-modal-overlay">
          <div className="testi-modal glass-panel">

            <div className="testi-modal-header">
              <div>
                <h2 className="testi-modal-title">{testimonials.some(t => t.id === activeReview.id) ? 'Edit Testimonial' : 'New Testimonial'}</h2>
                <p className="testi-modal-subtitle">Curate the perfect review for your homepage.</p>
              </div>
              <button className="testi-modal-close" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <div className="testi-modal-body">

              <div className="testi-form-row">
                <div className="testi-form-group">
                  <label>Client Name</label>
                  <input
                    type="text"
                    className="testi-input"
                    value={activeReview.clientName}
                    onChange={(e) => handleActiveChange('clientName', e.target.value)}
                    placeholder="e.g. Emily Chen"
                  />
                </div>
                <div className="testi-form-group">
                  <label>Role / Membership</label>
                  <input
                    type="text"
                    className="testi-input"
                    value={activeReview.role}
                    onChange={(e) => handleActiveChange('role', e.target.value)}
                    placeholder="e.g. Premium Member"
                  />
                </div>
              </div>

              <div className="testi-form-group">
                <label>Profile Image URL</label>
                <input
                  type="text"
                  className="testi-input"
                  value={activeReview.imageUrl}
                  onChange={(e) => handleActiveChange('imageUrl', e.target.value)}
                  placeholder="Paste a photo URL..."
                />
              </div>

              <div className="testi-form-group">
                <label>Star Rating</label>
                <div className="testi-rating-selector">
                  {[1, 2, 3, 4, 5].map(num => (
                    <button
                      key={num}
                      className="testi-star-btn"
                      onClick={() => handleActiveChange('rating', num)}
                    >
                      <Star
                        size={24}
                        fill={num <= activeReview.rating ? '#f6934c' : 'transparent'}
                        color={num <= activeReview.rating ? '#f6934c' : '#cbd5e1'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="testi-form-group">
                <label>Review Content</label>
                <textarea
                  className="testi-textarea"
                  rows="4"
                  value={activeReview.content}
                  onChange={(e) => handleActiveChange('content', e.target.value)}
                  placeholder="What did they say?"
                />
              </div>

              <div className="testi-form-group testi-modal-visibility">
                <label>Visibility Status</label>
                <div className="testi-visibility-toggle large">
                  <button
                    className={`testi-toggle-btn ${activeReview.isVisible ? 'active' : ''}`}
                    onClick={() => handleActiveChange('isVisible', !activeReview.isVisible)}
                  >
                    <div className="testi-toggle-slider"></div>
                  </button>
                  <span className="testi-toggle-label">
                    {activeReview.isVisible ? 'Published to Website' : 'Hidden from Website'}
                  </span>
                </div>
              </div>

            </div>

            <div className="testi-modal-footer">
              <button className="btn-secondary btn-sm" onClick={closeModal}>Cancel</button>
              <button className="btn-primary btn-sm" onClick={handleSaveReview}>Save Testimonial</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default TestimonialsManager;
