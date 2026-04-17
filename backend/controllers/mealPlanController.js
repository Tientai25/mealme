const Meal = require('../models/Meal');

// Shuffle array helper
const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

// Pick meals for a plan slot based on goal and budget
const pickMeal = (meals, usedIds, targetPrice, recentMeals = []) => {
  let available = meals.filter(m => 
    !usedIds.has(m._id.toString()) && 
    !recentMeals.includes(m._id.toString())
  );
  
  // If no unused meals, allow reuse but avoid recent ones
  if (!available.length) {
    available = meals.filter(m => !recentMeals.includes(m._id.toString()));
  }
  
  // If still no meals, use all meals
  if (!available.length) {
    available = meals;
  }
  
  let pick;
  if (targetPrice) {
    const withinBudget = available.filter(m => m.price <= targetPrice);
    if (withinBudget.length) {
      pick = shuffle(withinBudget)[0];
    } else {
      pick = available.sort((a, b) => a.price - b.price)[0];
    }
  } else {
    pick = shuffle(available)[0];
  }
  
  usedIds.add(pick._id.toString());
  return pick;
};

// POST /api/meal-plan/day
const getDayPlan = async (req, res) => {
  const { goal, budget } = req.body;
  const meals = await Meal.find(goal ? { tags: goal } : {});
  if (meals.length < 3)
    return res.status(400).json({ message: 'Not enough meals in database' });

  const usedIds = new Set();
  const slotBudget = budget ? Math.floor(budget / 3) : null;

  const breakfast = pickMeal(meals, usedIds, slotBudget);
  const lunch = pickMeal(meals, usedIds, slotBudget);
  const dinner = pickMeal(meals, usedIds, slotBudget);

  res.json({
    breakfast,
    lunch,
    dinner,
    totalCalories: (breakfast?.calories || 0) + (lunch?.calories || 0) + (dinner?.calories || 0),
    totalPrice: (breakfast?.price || 0) + (lunch?.price || 0) + (dinner?.price || 0)
  });
};

// POST /api/meal-plan/week
const getWeekPlan = async (req, res) => {
  const { goal, budget } = req.body;
  const meals = await Meal.find(goal ? { tags: goal } : {});
  if (meals.length < 7)
    return res.status(400).json({ message: 'Not enough meals in database' });

  const usedIds = new Set();
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const slotBudget = budget ? Math.floor(budget / 21) : null;
  const recentMeals = [];

  const weekPlan = days.map((day) => {
    const breakfast = pickMeal(meals, usedIds, slotBudget, recentMeals);
    recentMeals.push(breakfast._id.toString());
    if (recentMeals.length > 3) recentMeals.shift();
    
    const lunch = pickMeal(meals, usedIds, slotBudget, recentMeals);
    recentMeals.push(lunch._id.toString());
    if (recentMeals.length > 3) recentMeals.shift();
    
    const dinner = pickMeal(meals, usedIds, slotBudget, recentMeals);
    recentMeals.push(dinner._id.toString());
    if (recentMeals.length > 3) recentMeals.shift();
    
    return {
      day,
      breakfast,
      lunch,
      dinner,
      totalCalories: (breakfast?.calories || 0) + (lunch?.calories || 0) + (dinner?.calories || 0),
      totalPrice: (breakfast?.price || 0) + (lunch?.price || 0) + (dinner?.price || 0)
    };
  });

  res.json(weekPlan);
};

module.exports = { getDayPlan, getWeekPlan };
