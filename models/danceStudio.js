const mongoose = require('mongoose');
const { Schema } = mongoose;

const image = new Schema({
  url: String,
  file_name: String
});

const opts = { toJSON: { virtuals: true } };
const danceStudioSchema = new Schema({
  name: String,
  url: String,
  description: String,
  location: String,
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  images: [image],
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }]
}, opts);

danceStudioSchema.virtual('properties.popupMarkup').get(function () {
  return `<h5 class="fs-6">${this.name}</h5><a href="dancestudios/${this._id}">詳細</a>`;
});

module.exports = mongoose.model('DanceStudio', danceStudioSchema);