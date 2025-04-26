const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
  rate: {
    type: Number,
    enum: [1, 2, 3, 4, 5]
  },
  text: String,
  user_id: String
});

module.exports = mongoose.model('Review', reviewSchema);