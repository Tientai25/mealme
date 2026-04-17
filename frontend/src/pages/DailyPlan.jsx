import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { getDayPlan } from '../services/api';
import { Link } from 'react-router-dom';
import './DailyPlan.css';

const DailyPlan = () => {
  const { user } = useContext(AuthContext);
  const { t } = useContext(LanguageContext);
  const [plan, setPlan] = useState(null);
  const [budget, setBudget] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await getDayPlan({
        goal: user?.goal,
        budget: budget ? parseInt(budget) : null
      });
      setPlan(data);
    } catch (error) {
      alert(t.dailyPlan.errorGenerating);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="daily-plan-new">
      <div className="daily-hero">
        <div className="container-new">
          <div className="daily-hero-grid">
            <div className="hero-left-content">
              <h1 className="daily-title">
                {t.dailyPlan.title.split(' ')[0]} <span className="title-italic">{t.dailyPlan.title.split(' ').slice(1).join(' ')}</span>
              </h1>
              <p className="daily-subtitle">
                {t.dailyPlan.subtitle}
              </p>

              <form onSubmit={handleGenerate} className="daily-form">
                <div className="form-input-group">
                  <label>{t.dailyPlan.yourBudget}</label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder={t.dailyPlan.budgetPlaceholder}
                    className="budget-input"
                  />
                </div>
                <button type="submit" className="btn-generate" disabled={loading}>
                  {loading ? t.dailyPlan.generating : t.dailyPlan.generatePlan}
                  <span className="btn-sparkle">✨</span>
                </button>
              </form>
            </div>

            <div className="hero-right-image">
              <div className="featured-meal-card">
                <img 
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500" 
                  alt="Featured Meal" 
                />
                <div className="featured-overlay">
                  <span className="featured-badge">{t.dailyPlan.title}</span>
                  <h3>Salad Cá Hồi Bơ<br />Nguyên liệu tươi<br />Giàu dinh dưỡng</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {plan && (
        <div className="container-new">
          <div className="plan-summary-card">
            <h2>{t.dailyPlan.todayOverview}</h2>
            <div className="summary-stats-grid">
              <div className="summary-stat">
                <span className="stat-icon">🔥</span>
                <div>
                  <strong>{plan.totalCalories}</strong>
                  <p>{t.dailyPlan.totalCalories}</p>
                </div>
              </div>
              <div className="summary-stat">
                <span className="stat-icon">💰</span>
                <div>
                  <strong>{plan.totalPrice?.toLocaleString()}{t.common.vnd}</strong>
                  <p>{t.dailyPlan.totalCost}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="meals-timeline">
            <div className="meal-time-card">
              <div className="time-header">
                <span className="time-icon">🌅</span>
                <h3>{t.dashboard.breakfast}</h3>
              </div>
              {plan.breakfast ? (
                <div className="meal-content-grid">
                  <img src={plan.breakfast.image} alt={plan.breakfast.name} />
                  <div className="meal-info-detail">
                    <h4>{plan.breakfast.name}</h4>
                    <p>{plan.breakfast.description}</p>
                    <div className="meal-meta-tags">
                      <span>🔥 {plan.breakfast.calories} {t.common.kcal}</span>
                      <span>💰 {plan.breakfast.price?.toLocaleString()}{t.common.vnd}</span>
                      <span>⏱️ {plan.breakfast.cookTime} {t.dashboard.minutes}</span>
                    </div>
                    <Link to={`/meal/${plan.breakfast._id}`} className="btn-view-recipe">
                      {t.dashboard.viewRecipe}
                    </Link>
                  </div>
                </div>
              ) : (
                <p className="no-meal-text">{t.dailyPlan.noMeal}</p>
              )}
            </div>

            <div className="meal-time-card">
              <div className="time-header">
                <span className="time-icon">☀️</span>
                <h3>{t.dashboard.lunch}</h3>
              </div>
              {plan.lunch ? (
                <div className="meal-content-grid">
                  <img src={plan.lunch.image} alt={plan.lunch.name} />
                  <div className="meal-info-detail">
                    <h4>{plan.lunch.name}</h4>
                    <p>{plan.lunch.description}</p>
                    <div className="meal-meta-tags">
                      <span>🔥 {plan.lunch.calories} {t.common.kcal}</span>
                      <span>💰 {plan.lunch.price?.toLocaleString()}{t.common.vnd}</span>
                      <span>⏱️ {plan.lunch.cookTime} {t.dashboard.minutes}</span>
                    </div>
                    <Link to={`/meal/${plan.lunch._id}`} className="btn-view-recipe">
                      {t.dashboard.viewRecipe}
                    </Link>
                  </div>
                </div>
              ) : (
                <p className="no-meal-text">{t.dailyPlan.noMeal}</p>
              )}
            </div>

            <div className="meal-time-card">
              <div className="time-header">
                <span className="time-icon">🌙</span>
                <h3>{t.dashboard.dinner}</h3>
              </div>
              {plan.dinner ? (
                <div className="meal-content-grid">
                  <img src={plan.dinner.image} alt={plan.dinner.name} />
                  <div className="meal-info-detail">
                    <h4>{plan.dinner.name}</h4>
                    <p>{plan.dinner.description}</p>
                    <div className="meal-meta-tags">
                      <span>🔥 {plan.dinner.calories} {t.common.kcal}</span>
                      <span>💰 {plan.dinner.price?.toLocaleString()}{t.common.vnd}</span>
                      <span>⏱️ {plan.dinner.cookTime} {t.dashboard.minutes}</span>
                    </div>
                    <Link to={`/meal/${plan.dinner._id}`} className="btn-view-recipe">
                      {t.dashboard.viewRecipe}
                    </Link>
                  </div>
                </div>
              ) : (
                <p className="no-meal-text">{t.dailyPlan.noMeal}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="container-new">
        <div className="why-section">
          <h2 className="why-title">{t.dailyPlan.whyChoose}</h2>
          <div className="why-grid">
            <div className="why-card why-green">
              <span className="why-icon">🎯</span>
              <h3>{t.dailyPlan.saveTime}</h3>
              <p>{t.dailyPlan.saveTimeDesc}</p>
              <button className="why-btn">{t.dailyPlan.learnMore}</button>
            </div>

            <div className="why-card why-dark">
              <span className="why-icon">🍳</span>
              <h3>{t.dailyPlan.simplifyCooking}</h3>
              <p>{t.dailyPlan.simplifyCookingDesc}</p>
              <button className="why-btn why-btn-light">{t.dailyPlan.startNow}</button>
            </div>

            <div className="why-card why-blue">
              <span className="why-icon">📊</span>
              <h3>{t.dailyPlan.adjustIngredients}</h3>
              <p>{t.dailyPlan.adjustIngredientsDesc}</p>
              <button className="why-btn">{t.dailyPlan.explore}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyPlan;
