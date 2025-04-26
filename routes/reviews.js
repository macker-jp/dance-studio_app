const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const { isLoggedIn } = require('../middleware');
const danceStudio = require('../models/danceStudio');

router.get('/new', isLoggedIn, (req, res) => {
  res.render('reviews/new');
});

router.post('/', isLoggedIn, (req, res) => {
  res.redirect('/dancestudios');
});

module.exports = router;