const express = require('express');
const {
  getMeals,
  getMealById,
  suggestMeals,
  toggleFavorite,
  getFavorites
} = require('../controllers/mealController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', getMeals);
router.get('/favorites', protect, getFavorites);
router.get('/:id', getMealById);
router.post('/suggest', suggestMeals);
router.post('/favorite/:id', protect, toggleFavorite);

module.exports = router;
