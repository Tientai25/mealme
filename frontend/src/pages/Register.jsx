import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import './Auth.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [goal, setGoal] = useState('healthy');
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();

  const goals = [
    { value: 'healthy', label: t.goals.eatHealthy },
    { value: 'lose_weight', label: t.goals.loseWeight },
    { value: 'cheap', label: t.goals.saveMoney }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(username, email, password, goal);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || t.common.error);
    }
  };

  return (
    <div className="auth-page-new">
      <div className="auth-decorations">
        <div className="food-image food-3">
          <img src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=300" alt="Bowl" />
        </div>
        <div className="leaf-decoration leaf-3"></div>
        <div className="leaf-decoration leaf-4"></div>
      </div>

      <div className="auth-container">
        <div className="auth-card-new">
          <h1>{t.auth.beginJourney}</h1>
          <p className="auth-subtitle-new">{t.auth.beginSubtitle}</p>

          {error && <div className="error-message-new">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group-new">
              <label>{t.auth.fullName}</label>
              <div className="input-with-icon">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Julian Forest"
                />
              </div>
            </div>

            <div className="form-group-new">
              <label>{t.auth.emailAddress}</label>
              <div className="input-with-icon">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="julian@garden.com"
                />
              </div>
            </div>

            <div className="form-group-new">
              <label>{t.auth.createPassword}</label>
              <div className="input-with-icon">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength="6"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="form-group-new">
              <label>{t.auth.whatsYourGoal}</label>
              <div className="goal-buttons">
                {goals.map((g) => (
                  <button
                    key={g.value}
                    type="button"
                    className={`goal-btn ${goal === g.value ? 'active' : ''}`}
                    onClick={() => setGoal(g.value)}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-auth-primary">
              {t.auth.createAccount} →
            </button>
          </form>

          <p className="auth-footer-new">
            {t.auth.alreadyHaveAccount} <Link to="/login">{t.auth.login}</Link>
          </p>
        </div>
      </div>

      <div className="auth-nav-bottom">
        <Link to="/login" className="nav-bottom-btn">
          <span>🚪</span>
          {t.auth.login}
        </Link>
        <Link to="/register" className="nav-bottom-btn active">
          <span>👥</span>
          {t.auth.signUp}
        </Link>
      </div>
    </div>
  );
};

export default Register;
