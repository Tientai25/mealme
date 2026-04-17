import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { getMealById, toggleFavorite } from '../services/api';
import './MealDetail.css';

const MealDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { t } = useContext(LanguageContext);
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchMeal();
  }, [id]);

  const fetchMeal = async () => {
    try {
      const { data } = await getMealById(id);
      setMeal(data);
      setIsFavorite(user?.favoriteMeals?.includes(id));
    } catch (error) {
      alert(t.mealDetail.notFound);
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async () => {
    if (!user) {
      alert(t.mealDetail.loginToSave);
      return;
    }
    try {
      await toggleFavorite(id);
      setIsFavorite(!isFavorite);
    } catch (error) {
      alert(t.mealDetail.error);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px' }}>
        <h2>{t.mealDetail.loading}</h2>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px' }}>
        <h2>{t.mealDetail.notFound}</h2>
        <Link to="/" className="btn btn-primary">{t.mealDetail.backHome}</Link>
      </div>
    );
  }

  return (
    <div className="meal-detail">
      <div className="container">
        <div className="meal-detail-content card fade-in">
          <div className="meal-detail-image">
            <img src={meal.image} alt={meal.name} />
          </div>
          <div className="meal-detail-info">
            <h1>{meal.name}</h1>
            <p className="meal-detail-description">{meal.description}</p>

            <div className="meal-stats">
              <div className="stat">
                <span className="stat-icon">🔥</span>
                <div>
                  <strong>{meal.calories}</strong>
                  <p>{t.mealDetail.calories}</p>
                </div>
              </div>
              <div className="stat">
                <span className="stat-icon">💰</span>
                <div>
                  <strong>{meal.price?.toLocaleString()}{t.common.vnd}</strong>
                  <p>{t.mealDetail.price}</p>
                </div>
              </div>
              <div className="stat">
                <span className="stat-icon">⏱️</span>
                <div>
                  <strong>{meal.cookTime} {t.mealDetail.minutes}</strong>
                  <p>{t.mealDetail.time}</p>
                </div>
              </div>
            </div>

            <div className="meal-ingredients">
              <h3>{t.mealDetail.ingredients}</h3>
              <ul>
                {meal.ingredients?.map((ingredient, index) => (
                  <li key={index}>✓ {ingredient}</li>
                ))}
              </ul>
            </div>

            <div className="meal-tags">
              {meal.tags?.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>

            <div className="meal-actions">
              {user && (
                <button
                  onClick={handleFavorite}
                  className={`btn ${isFavorite ? 'btn-secondary' : 'btn-outline'}`}
                >
                  {isFavorite ? `❤️ ${t.mealDetail.saved}` : `🤍 ${t.mealDetail.saveMeal}`}
                </button>
              )}
              <Link to="/dashboard" className="btn btn-primary">
                {t.mealDetail.backToDashboard}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetail;
