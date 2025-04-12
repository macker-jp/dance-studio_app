const mongoose = require('mongoose');
const danceStudios = require('./danceStudios');
const DanceStudio = require('../models/danceStudio');
require('dotenv').config();
const axios = require('axios');
const DB_URL = process.env.MONGODB_URI;
// 'mongodb://127.0.0.1:27017/danceStudio'

mongoose.connect(DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log('mongooseコネクト成功！！');
    })
    .catch(e => {
        console.log('エラーだよ！！');
        console.log(e);
    })

const seedDB = async () => {
    await DanceStudio.deleteMany({});
    for (let danceStudio of danceStudios) {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(danceStudio.location)}&key=AIzaSyCIPscvgiovEtRLlvJkRugqRBEPqCOvwjA`
        const res = await axios.get(url);
        const data = res.data;
        if (data.status === "OK") {
            const { lat, lng } = data.results[0].geometry.location;
            const studio = new DanceStudio({
                name: `${danceStudio.name}`,
                description: `${danceStudio.description}`,
                location: `${danceStudio.location}`,
                geometry: {
                    type: "Point",
                    coordinates: [lng, lat]
                },
                images: danceStudio.images
            });

            await studio.save();
        }
        else {
            console.error(`Geocoding failed for ${danceStudio.location}: ${data.status}`);
        }
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});

