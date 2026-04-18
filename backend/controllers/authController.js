const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendWelcomeEmail } = require('../services/emailService');

const generateAccessToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15m' });

const generateRefreshToken = (id) =>
  jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

// POST /api/auth/register
const register = async (req, res) => {
  const { username, email, password, goal } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: 'Please fill all fields' });

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already in use' });

  const user = await User.create({ username, email, password, goal });
  
  sendWelcomeEmail(email, username);
  
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  
  // Lưu cả 2 token vào httpOnly cookies
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: true, // Always true for production
    sameSite: 'none', // Required for cross-origin
    maxAge: 15 * 60 * 1000 // 15 phút
  });
  
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ngày
  });
  
  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    goal: user.goal
  });
};

// POST /api/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ message: 'Invalid email or password' });

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  
  // Lưu cả 2 token vào httpOnly cookies
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 15 * 60 * 1000
  });
  
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    goal: user.goal
  });
};

// GET /api/auth/me
const getMe = async (req, res) => {
  res.json(req.user);
};

// POST /api/auth/refresh
const refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;
  
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token not found' });
  }
  
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    const newAccessToken = generateAccessToken(user._id);
    
    // Lưu access token mới vào cookie
    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 15 * 60 * 1000
    });
    
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      goal: user.goal
    });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
};

// POST /api/auth/logout
const logout = async (req, res) => {
  res.cookie('accessToken', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.cookie('refreshToken', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.json({ message: 'Logged out successfully' });
};

// PUT /api/auth/profile
const updateProfile = async (req, res) => {
  try {
    const { username, email, goal, dislikedFoods } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (goal) user.goal = goal;
    if (dislikedFoods) {
      user.dislikedFoods = dislikedFoods.split(',').map(f => f.trim()).filter(f => f);
    }

    if (req.file) {
      user.avatar = `/uploads/${req.file.filename}`;
    }

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        goal: user.goal,
        avatar: user.avatar,
        dislikedFoods: user.dislikedFoods
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { register, login, getMe, refreshToken, logout, updateProfile };
