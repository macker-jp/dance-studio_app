const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5]
  },
  text: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Review', reviewSchema);