const express = require('express');
const router = express.Router({ mergeParams: true });
const Review = require('../models/review');
const { isLoggedIn } = require('../middleware');
const Dancestudio = require('../models/danceStudio');

router.get('/new', isLoggedIn, async (req, res) => {
  const dancestudio = await Dancestudio.findById(req.params.id);
  if (!dancestudio) {
    return res.status(404).send('ダンススタジオが見つかりません');
  }
  res.render('reviews/new', { dancestudio });
});

router.post('/', isLoggedIn, async (req, res) => {
  const dancestudio = await Dancestudio.findById(req.params.id);
  res.redirect(`/dancestudios/${dancestudio._id}`);
});

module.exports = router;