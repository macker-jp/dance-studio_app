const express = require('express');
const router = express.Router({ mergeParams: true });
const Review = require('../models/review');
const { isLoggedIn, isReviewAuthor } = require('../middleware');
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
  const review = new Review(req.body.review);
  review.author = req.user;
  dancestudio.reviews.push(review);
  await review.save();
  await dancestudio.save();
  req.flash('success', 'レビューを投稿しました！');
  res.redirect(`/dancestudios/${dancestudio._id}`);
});

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, async (req, res) => {
  const { id, reviewId } = req.params;
  await Review.findByIdAndDelete(reviewId);
  await Dancestudio.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
  res.redirect(`/dancestudios/${id}`);
});

module.exports = router;