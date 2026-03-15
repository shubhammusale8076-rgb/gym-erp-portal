import React, { useState } from 'react';
import { Sparkles, Image as ImageIcon, X, Plus } from 'lucide-react';
import './GalleryManager.css';

const GalleryManager = () => {
  const [images, setImages] = useState([
    { id: 1, url: '', caption: 'Training Floor' },
    { id: 2, url: '', caption: 'Cardio Zone' },
    { id: 3, url: '', caption: 'Free Weights' },
    { id: 4, url: '', caption: 'Group Classes' },
    { id: 5, url: '', caption: 'Recovery Area' },
    { id: 6, url: '', caption: 'Amenities' },
  ]);

  const handleUrlChange = (id, newUrl) => {
    setImages(images.map(img => img.id === id ? { ...img, url: newUrl } : img));
  };

  const handleCaptionChange = (id, newCaption) => {
    setImages(images.map(img => img.id === id ? { ...img, caption: newCaption } : img));
  };

  const handleDelete = (id) => {
    setImages(images.filter(img => img.id !== id));
  };

  const handleAddImage = () => {
    const newId = images.length > 0 ? Math.max(...images.map(i => i.id)) + 1 : 1;
    setImages([...images, { id: newId, url: '', caption: '' }]);
  };

  return (
    <div className="gm-container page-container">
      <div className="wm-header">
        <div className="badge wm-badge">
          <span className="badge-dot"></span> GALLERY
        </div>
        <h1 className="heading-1 wm-title">GALLERY MANAGER</h1>
        <p className="subtitle gm-subtitle">
          Showcase your facilities, equipment, atmosphere, and results.
        </p>
      </div>

      <div className="gm-actions-row">
        <span className="gm-image-count">{images.length} images in gallery</span>
        <button className="btn gm-btn-add" onClick={handleAddImage}>
          <Plus size={16} /> Add Image
        </button>
      </div>

      <div className="gm-grid">
        {images.map((image) => (
          <div key={image.id} className="glass-card gm-card">
            <button 
              className="gm-delete-btn" 
              onClick={() => handleDelete(image.id)}
              aria-label="Remove image"
            >
              <X size={14} />
            </button>
            
            <div 
              className="gm-image-placeholder"
              style={image.url ? { backgroundImage: `url(${image.url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
            >
              {!image.url && <ImageIcon size={32} strokeWidth={1.5} />}
            </div>

            <div className="gm-input-group">
              <label className="gm-label">IMAGE URL</label>
              <input 
                type="text"
                className="form-control gm-input"
                placeholder="https://..."
                value={image.url}
                onChange={(e) => handleUrlChange(image.id, e.target.value)}
              />
            </div>

            <div className="gm-input-group">
              <label className="gm-label">CAPTION</label>
              <input 
                type="text"
                className="form-control gm-input"
                placeholder="Image caption"
                value={image.caption}
                onChange={(e) => handleCaptionChange(image.id, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card wm-ai-audit">
        <div className="ai-audit-content">
          <div className="ai-audit-header">
            <div className="ai-badge">
              <Sparkles size={16} /> GALLERY CONTENT WRITER
            </div>
            <button className="btn wm-btn-ai">
              <Sparkles size={16} /> Generate with AI
            </button>
          </div>
          <p className="ai-audit-desc">
            Generate a gallery section headline, intro copy, and professional captions for each image area.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GalleryManager;
