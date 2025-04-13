const mongoose = require('mongoose');
const { Schema } = mongoose;

const image = new Schema({
    url: String,
    file_name: String
});

const danceStudioSchema = new Schema({
    name: String,
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
    images: [image]
});

module.exports = mongoose.model('DanceStudio', danceStudioSchema);