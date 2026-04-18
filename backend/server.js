const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  process.env.FRONTEND_URL,
  /\.vercel\.app$/  // Allow all Vercel preview deployments
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Check if origin matches allowed origins or patterns
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') return allowed === origin;
      if (allowed instanceof RegExp) return allowed.test(origin);
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Socket.io setup
const io = socketIo(server, {
  cors: {
    origin: function(origin, callback) {
      if (!origin) return callback(null, true);
      const isAllowed = allowedOrigins.some(allowed => {
        if (typeof allowed === 'string') return allowed === origin;
        if (allowed instanceof RegExp) return allowed.test(origin);
        return false;
      });
      callback(null, isAllowed);
    },
    credentials: true
  }
});

// Store online users
const onlineUsers = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('user:online', (userId) => {
    onlineUsers.set(userId, socket.id);
    io.emit('users:online', Array.from(onlineUsers.keys()));
  });

  socket.on('meal:favorite', (data) => {
    io.emit('notification', {
      type: 'favorite',
      message: `${data.username} đã thích món ${data.mealName}`,
      timestamp: Date.now()
    });
  });

  socket.on('meal:created', (data) => {
    io.emit('notification', {
      type: 'new_meal',
      message: `Món mới: ${data.mealName}`,
      timestamp: Date.now()
    });
  });

  socket.on('disconnect', () => {
    for (let [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        io.emit('users:online', Array.from(onlineUsers.keys()));
        break;
      }
    }
    console.log('User disconnected:', socket.id);
  });
});

app.set('io', io);
app.use(express.json());
app.use(cookieParser()); // Parse cookies

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/meals', require('./routes/mealRoutes'));
app.use('/api/meal-plan', require('./routes/mealPlanRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'MealMe API is running 🍽️' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT} with Socket.io`));
