import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { getWeekPlan } from '../services/api';
import { Link } from 'react-router-dom';
import './WeeklyPlan.css';

const WeeklyPlan = () => {
  const { user } = useContext(AuthContext);
  const { t } = useContext(LanguageContext);
  const [plan, setPlan] = useState(null);
  const [budget, setBudget] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await getWeekPlan({
        goal: user?.goal,
        budget: budget ? parseInt(budget) : null
      });
      setPlan(data);
    } catch (error) {
      alert(t.weeklyPlan.errorGenerating);
    } finally {
      setLoading(false);
    }
  };

  const dayNames = {
    Monday: t.weeklyPlan.monday,
    Tuesday: t.weeklyPlan.tuesday,
    Wednesday: t.weeklyPlan.wednesday,
    Thursday: t.weeklyPlan.thursday,
    Friday: t.weeklyPlan.friday,
    Saturday: t.weeklyPlan.saturday,
    Sunday: t.weeklyPlan.sunday
  };

  return (
    <div className="weekly-plan-new">
      <div className="weekly-hero">
        <div className="container-new">
          <div className="weekly-hero-grid">
            <div className="weekly-left">
              <h1 className="weekly-title">{t.weeklyPlan.title}</h1>
              <p className="weekly-subtitle">
                {t.weeklyPlan.subtitle}
              </p>

              <form onSubmit={handleGenerate} className="weekly-form-card">
                <label className="form-label">{t.weeklyPlan.weekBudget}</label>
                <div className="input-with-icon">
                  <span className="input-icon">💰</span>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder={t.weeklyPlan.budgetPlaceholder}
                    className="weekly-input"
                  />
                </div>
                <button type="submit" className="btn-create-weekly" disabled={loading}>
                  <span className="btn-icon">📅</span>
                  {loading ? t.weeklyPlan.generating : t.weeklyPlan.generateWeekly}
                </button>
              </form>
            </div>

            <div className="weekly-right">
              <div className="weekly-featured-card">
                <div className="featured-header">
                  <span className="featured-subtitle">WEEKLYUE SAONUIRATION</span>
                  <h2>WEEKLY MEAL</h2>
                  <p>SAFE THIS WORK</p>
                  <span className="featured-tag">-Safe usage</span>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600" 
                  alt="Weekly Meal" 
                  className="featured-image"
                />
                <div className="featured-badge">
                  <span>Tiết kiệm 30%</span>
                  <p>Chi phí mỗi bữa chỉ từ 25k</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-new">
        <div className="why-weekly-section">
          <h2 className="section-title-center">{t.weeklyPlan.whyPlanWeekly}</h2>
          <div className="why-weekly-grid">
            <div className="why-weekly-card">
              <div className="why-icon-box green">
                <span>💰</span>
              </div>
              <h3>{t.weeklyPlan.saveTimeTitle}</h3>
              <p>{t.weeklyPlan.saveTimeDesc}</p>
            </div>

            <div className="why-weekly-card">
              <div className="why-icon-box green">
                <span>🌿</span>
              </div>
              <h3>{t.weeklyPlan.reduceWaste}</h3>
              <p>{t.weeklyPlan.reduceWasteDesc}</p>
            </div>

            <div className="why-weekly-card">
              <div className="why-icon-box cyan">
                <span>⚖️</span>
              </div>
              <h3>{t.weeklyPlan.balancedNutrition}</h3>
              <p>{t.weeklyPlan.balancedNutritionDesc}</p>
            </div>
          </div>
        </div>

        {plan && (
          <div className="weekly-results">
            <div className="results-header">
              <h2>{t.weeklyPlan.yourWeeklyMenu}</h2>
              <div className="week-summary">
                <span>{t.weeklyPlan.total}: {plan.reduce((sum, day) => sum + day.totalCalories, 0)} {t.common.kcal}{t.weeklyPlan.perWeek}</span>
                <span>{plan.reduce((sum, day) => sum + day.totalPrice, 0).toLocaleString()}{t.common.vnd}{t.weeklyPlan.perWeek}</span>
              </div>
            </div>

            <div className="weekly-full-plan">
              {plan.map((dayPlan, index) => (
                <div key={index} className="day-plan-card">
                  <div className="day-header">
                    <h3>{dayNames[dayPlan.day]}</h3>
                    <div className="day-stats">
                      <span>🔥 {dayPlan.totalCalories} {t.common.kcal}</span>
                      <span>💰 {dayPlan.totalPrice?.toLocaleString()}{t.common.vnd}</span>
                    </div>
                  </div>
                  
                  <div className="day-meals-grid">
                    {/* Bữa sáng */}
                    <div className="meal-slot">
                      <div className="meal-time-label">🌅 {t.weeklyPlan.morning}</div>
                      {dayPlan.breakfast ? (
                        <div className="meal-mini-card">
                          <img src={dayPlan.breakfast.image} alt={dayPlan.breakfast.name} />
                          <div className="meal-mini-info">
                            <h5>{dayPlan.breakfast.name}</h5>
                            <div className="meal-mini-stats">
                              <span>⏱️ {dayPlan.breakfast.cookTime}{t.dashboard.minutes.substring(0, 2)}</span>
                              <span>🔥 {dayPlan.breakfast.calories}{t.common.kcal}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="no-meal-slot">{t.weeklyPlan.noMeal}</div>
                      )}
                    </div>

                    {/* Bữa trưa */}
                    <div className="meal-slot">
                      <div className="meal-time-label">☀️ {t.weeklyPlan.noon}</div>
                      {dayPlan.lunch ? (
                        <div className="meal-mini-card">
                          <img src={dayPlan.lunch.image} alt={dayPlan.lunch.name} />
                          <div className="meal-mini-info">
                            <h5>{dayPlan.lunch.name}</h5>
                            <div className="meal-mini-stats">
                              <span>⏱️ {dayPlan.lunch.cookTime}{t.dashboard.minutes.substring(0, 2)}</span>
                              <span>🔥 {dayPlan.lunch.calories}{t.common.kcal}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="no-meal-slot">{t.weeklyPlan.noMeal}</div>
                      )}
                    </div>

                    {/* Bữa tối */}
                    <div className="meal-slot">
                      <div className="meal-time-label">🌙 {t.weeklyPlan.evening}</div>
                      {dayPlan.dinner ? (
                        <div className="meal-mini-card">
                          <img src={dayPlan.dinner.image} alt={dayPlan.dinner.name} />
                          <div className="meal-mini-info">
                            <h5>{dayPlan.dinner.name}</h5>
                            <div className="meal-mini-stats">
                              <span>⏱️ {dayPlan.dinner.cookTime}{t.dashboard.minutes.substring(0, 2)}</span>
                              <span>🔥 {dayPlan.dinner.calories}{t.common.kcal}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="no-meal-slot">{t.weeklyPlan.noMeal}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyPlan;
