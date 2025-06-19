const User = require('../Model/userM');
const express = require('express');
const passport = require('passport');
const router = express.Router();
const { register, login } = require('../Controller/userC.js');

// Regular login/register
router.post('/register', register);
router.post('/login', login);

// Google Auth
 router.post('/google',  async (req, res) => {
  const { userId, email } = req.body;
  try {
      const userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ message: 'User already exists' });

      const googleId = userId; // Assuming userId is the Google ID
      const newUser = new User({googleId , email});
      await newUser.save();
      res.status(201).json({ message: 'User registered' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }

  // Issue JWT token (example using jsonwebtoken package)
  const jwt = require('jsonwebtoken');
  const token = jwt.sign({ userId, email }, 'your-secret-key', { expiresIn: '1h' });

  res.json({ token });
});
/*
router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/login',
  session: false
}), (req, res) => {
  // Create JWT token manually
  const jwt = require('jsonwebtoken');
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.redirect(`http://localhost:3000/google-success?token=${token}`);
}); */

module.exports = router;
