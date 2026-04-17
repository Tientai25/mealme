const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Meal = require('../models/Meal');
const meals = require('./meals.json');
const connectDB = require('../config/db');

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    await Meal.deleteMany();
    await Meal.insertMany(meals);
    console.log('✅ Data seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
