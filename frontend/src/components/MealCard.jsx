import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import './MealCard.css';

const MealCard = ({ meal, onFavorite, isFavorite }) => {
  const { t } = useContext(LanguageContext);
  return (
    <div className="meal-card card fade-in">
      <img src={meal.image} alt={meal.name} className="meal-image" />
      <div className="meal-content">
        <h3>{meal.name}</h3>
        <p className="meal-description">{meal.description}</p>
        <div className="meal-info">
          <span>🔥 {meal.calories} {t.common.kcal}</span>
          <span>💰 {meal.price?.toLocaleString()}{t.common.vnd}</span>
          <span>⏱️ {meal.cookTime} {t.mealCard.minutes}</span>
        </div>
        <div className="meal-actions">
          <Link to={`/meal/${meal._id}`} className="btn btn-primary">
            {t.mealCard.details}
          </Link>
          {onFavorite && (
            <button
              onClick={() => onFavorite(meal._id)}
              className={`btn ${isFavorite ? 'btn-secondary' : 'btn-outline'}`}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealCard;
