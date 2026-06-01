import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sessionExpired } from '../redux/authSlice';

// 30 minutes in ms
const IDLE_TIMEOUT_MS = 30 * 60 * 1000;

export const useIdleTimeout = (timeoutMs = IDLE_TIMEOUT_MS) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const idleTimer = useRef(null);

  const resetTimer = () => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    if (!isAuthenticated) return;
    
    idleTimer.current = setTimeout(() => {
      dispatch(sessionExpired());
    }, timeoutMs);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      return;
    }

    const handleUserActivity = () => {
      resetTimer();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        resetTimer();
      } else {
        // Option to pause or let timer continue in background
        // For enterprise, we usually let the timeout continue ticking
      }
    };

    // Listen to user activities
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    
    events.forEach(event => {
      window.addEventListener(event, handleUserActivity);
    });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    resetTimer();

    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      events.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isAuthenticated, dispatch, timeoutMs]);
};
