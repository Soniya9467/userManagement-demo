const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const { protect, authorizeRoles } = require('../middleware/auth');

// Register
router.post('/register', async (req, res) => {
  console.log("🔔 Register route hit");
  try {
    const { name, mobile, email, password } = req.body;
    const user = await User.create({ name, mobile, email, password });
    res.json(user);
  } catch (err) {
   // console.error("❌ Error during registration:", err.message);
    res.status(400).json({ error: err.message });
  }
});
//Login


// Login
router.post('/login', async (req, res) => {
  const { mobile, password } = req.body;
  const user = await User.findOne({ mobile});
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(500).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id }, 'jwt_secret', { expiresIn: '1h' });
  res.json({ token });
});

// Get profile
router.get('/me', protect, (req, res) => {
  res.json(req.user);
});

// Get all users (admin only)
router.get('/users', protect, authorizeRoles('admin'), async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
