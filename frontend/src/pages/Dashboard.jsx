import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { t } = useContext(LanguageContext);

  const goalText = {
    lose_weight: t.goals.loseWeight,
    gain_weight: t.goals.gainWeight,
    maintain: t.goals.maintain,
    healthy: t.goals.eatHealthy,
    cheap: t.goals.saveMoney
  };

  return (
    <div className="dashboard-new">
      <div className="container-new">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-left">
            <h1 className="greeting">{t.dashboard.greeting}, {user?.username}! 👋</h1>
            <p className="goal-text">
              <span className="goal-icon">🎯</span>
              {t.dashboard.yourGoal}: <strong>{goalText[user?.goal]}</strong>
            </p>
          </div>
          <div className="header-right">
            <div className="user-avatar">
              <img src={`https://ui-avatars.com/api/?name=${user?.username}&background=2d5016&color=fff&size=80`} alt="Avatar" />
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="quick-actions-grid">
          <Link to="/suggest" className="action-card action-suggest">
            <div className="action-icon">🔍</div>
            <h3>{t.dashboard.suggestMeal}</h3>
            <p>{t.dashboard.suggestMealDesc}</p>
            <div className="action-image">
              <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300" alt="Suggest" />
            </div>
            <button className="action-btn">{t.dashboard.exploreNow}</button>
          </Link>

          <Link to="/daily-plan" className="action-card action-daily">
            <div className="action-icon">📅</div>
            <h3>{t.dashboard.dailyPlan}</h3>
            <p>{t.dashboard.dailyPlanDesc}</p>
            <div className="meal-tags">
              <span className="meal-tag green">{t.dashboard.breakfast}</span>
              <span className="meal-tag blue">{t.dashboard.lunch}</span>
              <span className="meal-tag orange">{t.dashboard.dinner}</span>
            </div>
            <div className="meal-preview">
              <span className="preview-label">Thứ 2</span>
              <span className="preview-label">Salad cá hồi chảo</span>
            </div>
            <button className="action-btn">{t.dashboard.planNow}</button>
          </Link>

          <Link to="/weekly-plan" className="action-card action-weekly">
            <div className="action-icon">📆</div>
            <h3>{t.dashboard.weeklyPlan}</h3>
            <p>{t.dashboard.weeklyPlanDesc}</p>
            <div className="week-days">
              <span className="day-btn">2</span>
              <span className="day-btn">3</span>
              <span className="day-btn">4</span>
              <span className="day-btn">5</span>
            </div>
            <button className="action-btn">{t.dashboard.setupWeek}</button>
          </Link>

          <Link to="/favorites" className="action-card action-favorites">
            <div className="action-icon">❤️</div>
            <h3>{t.dashboard.favoriteMeals}</h3>
            <p>{t.dashboard.favoriteMealsDesc}</p>
            <div className="favorites-preview">
              <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150" alt="Fav 1" />
              <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=150" alt="Fav 2" />
            </div>
            <button className="action-btn pink">{t.dashboard.viewCollection}</button>
          </Link>
        </div>

        {/* Daily Special Section */}
        <div className="daily-special-section">
          <div className="section-header-inline">
            <h2>🍴 {t.dashboard.todaySuggestion}</h2>
          </div>

          <div className="special-card">
            <div className="special-left">
              <div className="special-badge">{t.dashboard.dailySpecial}</div>
              <div className="special-label">{t.dashboard.specialDish}</div>
            </div>
            <div className="special-right">
              <span className="special-tag green">MÓN NGOẠI NHIỀU LƯỢT</span>
              <h3>Buddha Bowl Cầu Vồng với Sốt Mè Rang</h3>
              <p className="special-description">
                Một sự kết hợp hoàn hảo giữa protein thực vật, chất xơ từ rau củ tươi và vi béo ngậy của sốt mè. Chỉ mất 15 phút chuẩn bị cho một bữa trưa đầy năng lượng.
              </p>
              <div className="special-stats">
                <div className="stat-item">
                  <span className="stat-label">{t.dashboard.calories}</span>
                  <span className="stat-value">450 kcal</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">{t.dashboard.time}</span>
                  <span className="stat-value">15 {t.dashboard.minutes}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">{t.dashboard.difficulty}</span>
                  <span className="stat-value">{t.dashboard.easy}</span>
                </div>
              </div>
              <button className="btn-view-recipe">
                {t.dashboard.viewRecipe}
                <span className="arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
