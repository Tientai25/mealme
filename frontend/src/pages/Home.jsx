import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import './Home.css';

const Home = () => {
  const { t } = useContext(LanguageContext);
  return (
    <div className="home-new">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container-new">
          <div className="hero-content-wrapper">
            <div className="hero-left">
              <div className="hero-badge">
                <span className="icon">🍴</span>
                <span>{t.home.diningRedefined}</span>
              </div>
              <h1 className="hero-title">
                {t.home.heroTitle}<br />
                <span className="hero-title-italic">{t.home.heroTitleItalic}</span>
              </h1>
              <p className="hero-description">
                {t.home.heroDesc}
              </p>
              <div className="hero-buttons">
                <Link to="/register" className="btn-primary-new">
                  {t.home.getStarted}
                </Link>
                <Link to="/suggest" className="btn-secondary-new">
                  {t.home.learnMore}
                </Link>
              </div>
            </div>
            <div className="hero-right">
              <div className="meal-card-float">
                <div className="meal-card-image">
                  <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500" alt="Salad" />
                </div>
                <div className="meal-card-info">
                  <span className="meal-badge">{t.home.lunchSuggestion}</span>
                  <h3>Salad Cá Hồi & Bơ</h3>
                  <div className="meal-meta">
                    <span>⏱️ 15 ph</span>
                    <span>🔥 450 kcal</span>
                    <span className="rating">⭐⭐⭐</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-blob"></div>
      </section>

      {/* Smart Plan Section */}
      <section className="smart-plan-section">
        <div className="container-new">
          <div className="section-header">
            <h2>{t.home.smartPlanTitle}</h2>
            <p>{t.home.smartPlanDesc}</p>
            <div className="header-buttons">
              <button className="btn-toggle active">{t.home.forYou}</button>
              <button className="btn-toggle">{t.home.trending}</button>
            </div>
          </div>

          <div className="features-grid">
            <div className="feature-card feature-large">
              <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600" alt="Ingredients" />
              <div className="feature-content">
                <h3>{t.home.cookWithWhat}</h3>
                <p>{t.home.cookWithWhatDesc}</p>
                <Link to="/suggest" className="btn-feature">{t.home.tryNow}</Link>
              </div>
            </div>

            <div className="feature-card feature-small green">
              <div className="feature-icon">🎯</div>
              <h3>{t.home.trackGoals}</h3>
              <p>{t.home.trackGoalsDesc}</p>
            </div>

            <div className="feature-card feature-small blue">
              <div className="feature-icon">🛒</div>
              <h3>{t.home.autoShopping}</h3>
              <p>{t.home.autoShoppingDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container-new">
          <div className="newsletter-card">
            <div className="newsletter-content">
              <h2>{t.home.joinCommunity}</h2>
              <p>{t.home.communityDesc}</p>
              <div className="newsletter-form">
                <input type="email" placeholder={t.home.yourEmail} />
                <button className="btn-submit">{t.home.subscribe}</button>
              </div>
            </div>
            <div className="newsletter-decoration"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
