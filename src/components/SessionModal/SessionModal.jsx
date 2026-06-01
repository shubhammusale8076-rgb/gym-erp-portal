import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetSessionExpired, logout } from '../../redux/authSlice';
import './SessionModal.css';

const SessionModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSessionExpired = useSelector((state) => state.auth.isSessionExpired);

  if (!isSessionExpired) return null;

  const handleLoginRedirect = () => {
    dispatch(resetSessionExpired());
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="session-modal-overlay">
      <div className="session-modal-card card">
        <h2 className="session-modal-title text-gradient">Session Expired</h2>
        <p className="session-modal-subtitle">
          Your session has expired for security reasons. Please log in again to continue.
        </p>
        <button onClick={handleLoginRedirect} className="btn-primary">
          Log In Again
        </button>
      </div>
    </div>
  );
};

export default SessionModal;
