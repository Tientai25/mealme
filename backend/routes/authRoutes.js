const express = require('express');
const { register, login, getMe, refreshToken, logout, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/refresh', refreshToken);
router.post('/logout', logout);
router.put('/profile', protect, updateProfile);

module.exports = router;
