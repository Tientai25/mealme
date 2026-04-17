const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  ingredients: [String],
  calories: Number,
  price: Number, // VND
  cookTime: Number, // minutes
  image: String,
  tags: [String] // e.g. ['lose_weight', 'healthy', 'cheap']
}, { timestamps: true });

module.exports = mongoose.model('Meal', mealSchema);
