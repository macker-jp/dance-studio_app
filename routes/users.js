const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

router.get('/register', (req, res) => {
  res.render('users/register');
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username });
  await User.register(user, password);
  req.flash('success', 'DanSearchへようこそ！');
  res.redirect('/dancestudios');
});

router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/users/login' }), (req, res) => {
  req.flash('success', 'おかえりなさい！');
  res.redirect('/dancestudios');
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    req.flash('success', 'ログアウトしました');
    res.redirect('/');
  });
});

module.exports = router;