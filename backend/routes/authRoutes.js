const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ id: user._id }, 'jwtSecret', { expiresIn: '1h' });
    res.status(201).json({
      message: 'User registered and logged in',
      token,
      user: { id: user._id, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, 'jwtSecret', { expiresIn: '1h' });
    res.json({ message: 'Signed in successfully', token, user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
   req.logout();
   res.redirect("/");
});
module.exports = router;
