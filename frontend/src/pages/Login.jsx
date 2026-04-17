import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || t.common.error);
    }
  };

  return (
    <div className="auth-page-new">
      <div className="auth-decorations">
        <div className="food-image food-1">
          <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300" alt="Food" />
        </div>
        <div className="food-image food-2">
          <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300" alt="Salad" />
        </div>
        <div className="leaf-decoration leaf-1"></div>
        <div className="leaf-decoration leaf-2"></div>
      </div>

      <div className="auth-container">
        <div className="auth-card-new">
          <div className="auth-icon">
            <span>🍽️</span>
          </div>
          
          <h1>{t.auth.welcomeBack}</h1>
          <p className="auth-subtitle-new">{t.auth.welcomeSubtitle}</p>

          {error && <div className="error-message-new">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group-new">
              <label>{t.auth.emailAddress}</label>
              <div className="input-with-icon">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="hello@example.com"
                />
              </div>
            </div>

            <div className="form-group-new">
              <div className="label-row">
                <label>{t.auth.password}</label>
                <Link to="/forgot-password" className="forgot-link">{t.auth.forgotPassword}</Link>
              </div>
              <div className="input-with-icon">
                <span className="input-icon">🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️🗨️'}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-auth-primary">
              {t.auth.loginButton} →
            </button>
          </form>

          <div className="divider">
            <span>{t.auth.orContinueWith}</span>
          </div>

          <div className="social-buttons">
            <button className="btn-social">
              <img src="https://www.google.com/favicon.ico" alt="Google" />
              {t.common.google}
            </button>
            <button className="btn-social">
              <img src="https://www.facebook.com/favicon.ico" alt="Facebook" />
              {t.common.facebook}
            </button>
          </div>

          <p className="auth-footer-new">
            {t.auth.dontHaveAccount} <Link to="/register">{t.auth.signUp}</Link>
          </p>

          <p className="terms-text">
            {t.auth.termsText} MealMe's <a href="#">{t.auth.termsOfService}</a> {t.auth.and} <a href="#">{t.auth.privacyPolicy}</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
