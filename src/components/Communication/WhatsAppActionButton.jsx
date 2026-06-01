import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import './Communication.css';

const WhatsAppActionButton = ({
  label,
  icon: Icon,
  eventType,
  payload,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'ghost'
  size = 'md', // 'sm', 'md', 'lg'
  disabled = false,
  loading = false,
  onClick,
  showIconOnly = false
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (disabled || loading) return;

    // Placeholder Event Architecture
    if (eventType) {
      console.log('--- WHATSAPP ACTION TRIGGERED ---');
      console.log('Event Type:', eventType);
      console.log('Payload:', payload);
    }

    if (onClick) {
      onClick(e);
    }
  };

  const getVariantClass = () => {
    switch (variant) {
      case 'primary': return 'wa-btn-primary';
      case 'secondary': return 'wa-btn-secondary';
      case 'outline': return 'wa-btn-outline';
      case 'ghost': return 'wa-btn-ghost';
      default: return 'wa-btn-primary';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'wa-btn-sm';
      case 'lg': return 'wa-btn-lg';
      default: return 'wa-btn-md';
    }
  };

  return (
    <button
      className={`wa-action-btn ${getVariantClass()} ${getSizeClass()} ${disabled ? 'wa-btn-disabled' : ''} ${showIconOnly ? 'wa-btn-icon-only' : ''}`}
      onClick={handleClick}
      disabled={disabled || loading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={disabled ? "WhatsApp integration unavailable" : label}
    >
      <div className="wa-btn-content">
        {loading ? (
          <Loader2 className="wa-spin-icon" size={size === 'sm' ? 14 : 18} />
        ) : (
          Icon && <Icon size={size === 'sm' ? 14 : 18} className="wa-btn-icon" />
        )}
        
        {!showIconOnly && (
          <span className="wa-btn-label">{label}</span>
        )}
      </div>
    </button>
  );
};

export default WhatsAppActionButton;
