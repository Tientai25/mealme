const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();
const Meal = require('../models/Meal');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');
};

const importMeals = async () => {
  try {
    await connectDB();
    
    const meals = [];
    console.log('Fetching meals from API...');
    
    for (let i = 0; i < 30; i++) {
      console.log(`Fetching meal ${i + 1}/30...`);
      const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
      const meal = data.meals[0];
      
      meals.push({
        name: meal.strMeal,
        description: meal.strInstructions.substring(0, 100) + '...',
        ingredients: [
          meal.strIngredient1, meal.strIngredient2, meal.strIngredient3,
          meal.strIngredient4, meal.strIngredient5
        ].filter(i => i && i.trim()),
        calories: Math.floor(Math.random() * 400) + 200,
        price: Math.floor(Math.random() * 60000) + 20000,
        cookTime: Math.floor(Math.random() * 40) + 10,
        image: meal.strMealThumb,
        tags: ['healthy', 'maintain']
      });
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('Clearing old data...');
    await Meal.deleteMany({});
    console.log('Inserting new meals...');
    await Meal.insertMany(meals);
    console.log(`✅ ${meals.length} meals imported successfully`);
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

importMeals();
