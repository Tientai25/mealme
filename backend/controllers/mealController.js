const Meal = require('../models/Meal');
const User = require('../models/User');

// GET /api/meals
const getMeals = async (req, res) => {
  try {
    const { goal, search } = req.query;
    const filter = {};
    if (goal) filter.tags = goal;
    if (search) filter.name = { $regex: search, $options: 'i' };
    const meals = await Meal.find(filter);
    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/meals/:id
const getMealById = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) return res.status(404).json({ message: 'Meal not found' });
    res.json(meal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/meals/suggest
const suggestMeals = async (req, res) => {
  try {
    const { ingredients = [], goal } = req.body;
    const normalizedIngredients = ingredients.map((i) => i.toLowerCase().trim());

    // Find meals that match at least one ingredient
    const meals = await Meal.find(goal ? { tags: goal } : {});

    const scored = meals
      .map((meal) => {
        const mealIngredients = meal.ingredients.map((i) => i.toLowerCase());
        const matchCount = normalizedIngredients.filter((ing) =>
          mealIngredients.some((mi) => mi.includes(ing) || ing.includes(mi))
        ).length;
        return { meal, matchCount };
      })
      .filter((m) => m.matchCount > 0)
      .sort((a, b) => b.matchCount - a.matchCount)
      .slice(0, 6)
      .map((m) => m.meal);

    // If no ingredient match, return top meals by goal
    if (meals.length === 0 || scored.length === 0) {
      const fallback = await Meal.find(goal ? { tags: goal } : {}).limit(6);
      return res.json(fallback);
    }

    res.json(scored);
  } catch (error) {
    console.error('Suggest meals error:', error);
    res.status(500).json({ message: error.message });
  }
};

// POST /api/meals/favorite/:id
const toggleFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const mealId = req.params.id;
    const index = user.favoriteMeals.indexOf(mealId);

    if (index === -1) {
      user.favoriteMeals.push(mealId);
    } else {
      user.favoriteMeals.splice(index, 1);
    }
    await user.save();
    res.json({ favoriteMeals: user.favoriteMeals });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/meals/favorites
const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favoriteMeals');
    res.json(user.favoriteMeals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMeals, getMealById, suggestMeals, toggleFavorite, getFavorites };
