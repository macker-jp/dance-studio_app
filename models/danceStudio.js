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
    images: [image]
});

module.exports = mongoose.model('DanceStudio', danceStudioSchema);