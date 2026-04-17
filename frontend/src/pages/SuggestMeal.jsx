import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { suggestMeals, toggleFavorite } from '../services/api';
import MealCard from '../components/MealCard';
import './SuggestMeal.css';

const SuggestMeal = () => {
  const { user } = useContext(AuthContext);
  const { t } = useContext(LanguageContext);
  const [ingredients, setIngredients] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [quickFilters, setQuickFilters] = useState(['Egg', 'Chicken', 'Green onion']);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  const addIngredient = (ingredient) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const removeIngredient = (ingredient) => {
    setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const allIngredients = [...selectedIngredients];
      if (ingredients.trim()) {
        allIngredients.push(...ingredients.split(',').map(i => i.trim()).filter(Boolean));
      }
      
      const { data } = await suggestMeals({
        ingredients: allIngredients,
        goal: user?.goal
      });
      setMeals(data);
    } catch (error) {
      alert(t.suggestMeal.errorSuggesting);
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async (mealId) => {
    try {
      await toggleFavorite(mealId);
      alert(t.common.success);
    } catch (error) {
      alert(t.common.error);
    }
  };

  return (
    <div className="suggest-meal-new">
      <div className="suggest-hero">
        <div className="container-new">
          <div className="suggest-hero-content">
            <span className="hero-badge-small">{t.suggestMeal.todayInspiration}</span>
            <h1 className="suggest-title">{t.suggestMeal.title}</h1>
            <p className="suggest-subtitle" dangerouslySetInnerHTML={{ __html: t.suggestMeal.subtitle }}>
            </p>
          </div>
        </div>
      </div>

      <div className="container-new">
        <div className="suggest-form-card">
          <form onSubmit={handleSubmit}>
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder={t.suggestMeal.addIngredient}
                className="search-input"
              />
            </div>

            <div className="quick-filters">
              {quickFilters.map((filter, index) => (
                <button
                  key={index}
                  type="button"
                  className="filter-chip"
                  onClick={() => addIngredient(filter)}
                >
                  {filter}
                  <span className="chip-icon">✕</span>
                </button>
              ))}
            </div>

            {selectedIngredients.length > 0 && (
              <div className="selected-section">
                <label className="section-label">{t.suggestMeal.quickSuggestion}</label>
                <div className="selected-chips">
                  {selectedIngredients.map((ingredient, index) => (
                    <span key={index} className="selected-chip">
                      {ingredient}
                      <button
                        type="button"
                        onClick={() => removeIngredient(ingredient)}
                        className="remove-chip"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button type="submit" className="btn-search" disabled={loading}>
              {loading ? t.suggestMeal.searching : t.suggestMeal.findMeal}
              <span className="btn-icon">✨</span>
            </button>
          </form>
        </div>

        {meals.length > 0 && (
          <div className="results-section">
            <div className="results-grid">
              {meals.map((meal) => (
                <MealCard
                  key={meal._id}
                  meal={meal}
                  onFavorite={handleFavorite}
                  isFavorite={user?.favoriteMeals?.includes(meal._id)}
                />
              ))}
            </div>
          </div>
        )}

        {!loading && meals.length === 0 && ingredients && (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>{t.suggestMeal.noResults}</h3>
            <p>{t.suggestMeal.tryOther}</p>
          </div>
        )}

        <div className="info-cards">
          <div className="info-card info-dark">
            <div className="info-image">
              <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600" alt="Cooking" />
            </div>
            <div className="info-content">
              <span className="info-badge">{t.suggestMeal.todayInspiration}</span>
              <h3>{t.suggestMeal.popularTitle}</h3>
              <p>{t.suggestMeal.popularDesc}</p>
            </div>
          </div>

          <div className="info-card info-cyan">
            <div className="info-icon">💡</div>
            <h3>{t.suggestMeal.reduceWasteTitle}</h3>
            <p>{t.suggestMeal.reduceWasteDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestMeal;
