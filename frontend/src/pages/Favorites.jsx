import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { getFavorites, toggleFavorite } from '../services/api';
import { Link } from 'react-router-dom';
import './Favorites.css';

const Favorites = () => {
  const { user } = useContext(AuthContext);
  const { t } = useContext(LanguageContext);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const { data } = await getFavorites();
      setMeals(data);
    } catch (error) {
      alert(t.favorites.errorLoading);
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async (mealId) => {
    try {
      await toggleFavorite(mealId);
      setMeals(meals.filter((m) => m._id !== mealId));
    } catch (error) {
      alert(t.favorites.errorRemoving);
    }
  };

  const filteredMeals = filter === 'all' 
    ? meals 
    : meals.filter(meal => meal.tags?.includes(filter));

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px' }}>
        <h2>{t.common.loading}</h2>
      </div>
    );
  }

  return (
    <div className="favorites-new">
      <div className="favorites-hero">
        <div className="container-new">
          <div className="favorites-header">
            <div className="header-badge">
              <span className="badge-icon">❤️</span>
              <span>{t.favorites.yourCollection}</span>
            </div>
            <h1 className="favorites-title">{t.favorites.title}</h1>
            <p className="favorites-subtitle">
              {t.favorites.subtitle}
            </p>
            <div className="header-actions">
              <button className="btn-action btn-action-primary">
                <span className="action-icon">📋</span>
                {t.favorites.filter}
              </button>
              <button className="btn-action btn-action-secondary">
                <span className="action-icon">➕</span>
                {t.favorites.addNew}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-new">
        {meals.length > 0 ? (
          <div className="favorites-grid">
            {filteredMeals.map((meal, index) => {
              const isLarge = index === 3; // Card thứ 4 là large
              return (
                <div key={meal._id} className={`favorite-card ${isLarge ? 'favorite-large' : ''}`}>
                  <button 
                    className="favorite-heart"
                    onClick={() => handleFavorite(meal._id)}
                  >
                    ❤️
                  </button>
                  
                  {!isLarge ? (
                    <>
                      <div className="favorite-image">
                        <img src={meal.image} alt={meal.name} />
                        <span className="meal-badge-green">{t.favorites.veggie}</span>
                      </div>
                      <div className="favorite-info">
                        <h3>{meal.name}</h3>
                        <div className="meal-stats">
                          <span>🔥 {meal.calories}{t.common.kcal}</span>
                          <span>⏱️ {meal.cookTime} {t.dashboard.minutes}</span>
                          <span>🍽️ {meal.tags?.[0] || t.favorites.other}</span>
                        </div>
                        <Link to={`/meal/${meal._id}`} className="btn-view">
                          {t.favorites.cookNow}
                          <span className="btn-arrow">→</span>
                        </Link>
                      </div>
                    </>
                  ) : (
                    <div className="favorite-large-content">
                      <div className="large-image">
                        <img src={meal.image} alt={meal.name} />
                      </div>
                      <div className="large-info">
                        <span className="large-badge">{t.favorites.todaySuggestion}</span>
                        <h3>{meal.name}</h3>
                        <p className="large-description">
                          {meal.description || t.favorites.subtitle}
                        </p>
                        <div className="large-stats">
                          <div className="stat-item">
                            <span className="stat-icon">👨‍🍳</span>
                            <span>{t.dashboard.easy}</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-icon">⏱️</span>
                            <span>{meal.cookTime} {t.dashboard.minutes}</span>
                          </div>
                        </div>
                        <button className="btn-cook-now">
                          {t.favorites.viewDetailedRecipe}
                          <span className="btn-arrow">→</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no-favorites">
            <div className="no-favorites-icon">💔</div>
            <h3>{t.favorites.noFavorites}</h3>
            <p>{t.favorites.exploreMeals}</p>
            <Link to="/suggest" className="btn-explore">
              {t.favorites.exploreButton}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
