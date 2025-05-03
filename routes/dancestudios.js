const express = require('express');
const router = express.Router();
const DanceStudio = require('../models/danceStudio');
const { isLoggedIn } = require('../middleware');

router.get('/', isLoggedIn, async (req, res) => {
  const danceStudios = await DanceStudio.find({});
  res.render('danceStudios/index', { danceStudios });
});
router.get('/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const dancestudio = await DanceStudio.findById(id).populate({
    path: 'reviews',
    populate: { path: 'author' }
  }).populate('author');
  res.render('danceStudios/show', { dancestudio });
});

module.exports = router;