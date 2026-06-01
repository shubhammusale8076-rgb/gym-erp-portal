import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Fingerprint, Key, Diamond } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { useDispatch } from 'react-redux';
import { showToast } from '../../redux/toastSlice';
import { loginSuccess } from '../../redux/authSlice';
import { loginUser } from '../../apiservice/apiservice';

const Login = () => {
  const [loginData, setLoginData] = useState({ userName: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(loginData);

      const { token, id, role } = data;

      // Save auth info via Redux
      dispatch(loginSuccess({ token, userId: id, role }));

      if (data?.token) {
        dispatch(showToast({ message: "Login successful!", type: "success" }));
        navigate('/')
      }
      else {
        setError("Something went wrong!");
        dispatch(showToast({ message: error.message || "Login failed", type: "error" }));

      }
    } catch (error) {
      console.log(error)
      dispatch(showToast({ message: error.message || "Login failed", type: "error" }));

    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-left-overlay"></div>
        <div className="login-left-content">
          <div className="aura-brand-top">
            <span className="aura-brand-line"></span>
            AURA PREMIUM
          </div>

          <h1 className="login-title">
            The sanctuary<br />
            of<br />
            <span className="purple-italic">elite</span><br />
            <span className="purple-italic">performance.</span>
          </h1>

          <p className="login-subtitle">
            Curating the world's most exclusive fitness<br />
            experiences through sophisticated data and<br />
            intuitive management.
          </p>
        </div>

        <div className="login-director-badge">
          <img className="director-avatar" src="https://i.pravatar.cc/150?u=a04258114e29026702d" alt="Elena Valerius" />
          <div className="director-info">
            <span className="director-role">DIRECTOR OF OPERATIONS</span>
            <span className="director-name">Elena Valerius</span>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="right-top-logo">
          <div className="diamond-icon-wrapper">
            <Diamond className="diamond-icon" size={16} />
          </div>
          <span className="right-logo-text">Aura Premium</span>
        </div>

        {/* Center Card */}
        <div className="login-form-card card">
          <div className="form-card-header">
            <h2 className="form-card-title">Welcome Back</h2>
            <p className="form-card-subtitle">Access the <span className='gym-name'>Elite Club</span> management portal.</p>
          </div>

          <form onSubmit={handleLogin} className="aura-login-form">
            <div className="aura-form-group">
              <label className="aura-form-label">WORK EMAIL</label>
              <div className="aura-input-wrapper">
                <Mail className="aura-input-icon" size={18} />
                <input
                  name="userName"
                  type="email"
                  className="aura-input"
                  placeholder="Enter email"
                  value={loginData.userName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="aura-form-group">
              <div className="aura-password-header">
                <label className="aura-form-label">PASSWORD</label>
                <Link to="#" className="aura-forgot-password">FORGOT?</Link>
              </div>
              <div className="aura-input-wrapper">
                <Lock className="aura-input-icon" size={18} />
                <input
                  name="password"
                  type="password"
                  className="aura-input"
                  placeholder="Enter password"
                  value={loginData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="aura-btn-submit">
              ENTER THE PORTAL <ArrowRight size={18} />
            </button>
          </form>

          {/* <div className="aura-divider">
            <span className="aura-divider-text">ALTERNATIVE LOGIN</span>
          </div> */}

          {/* <div className="aura-social-logins">
            <button type="button" className="aura-btn-social">
              <Fingerprint size={18} className="aura-social-icon" />
              BIOMETRIC
            </button>
            <button type="button" className="aura-btn-social">
              <Key size={18} className="aura-social-icon" />
              SSO
            </button>
          </div> */}
        </div>

        {/* Footer */}
        <div className="login-footer">
          <span className="footer-copyright">© 2026 AURA PREMIUM GYM MANAGEMENT.</span>
          <div className="footer-links">
            <Link to="#">SUPPORT</Link>
            <Link to="#">PRIVACY POLICY</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
