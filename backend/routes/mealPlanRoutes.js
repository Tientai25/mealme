const express = require('express');
const { getDayPlan, getWeekPlan } = require('../controllers/mealPlanController');

const router = express.Router();

router.post('/day', getDayPlan);
router.post('/week', getWeekPlan);

module.exports = router;
