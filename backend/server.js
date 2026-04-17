const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // Cho phép gửi cookies
}));
app.use(express.json());
app.use(cookieParser()); // Parse cookies

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/meals', require('./routes/mealRoutes'));
app.use('/api/meal-plan', require('./routes/mealPlanRoutes'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'MealMe API is running 🍽️' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
