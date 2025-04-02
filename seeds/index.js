const mongoose = require('mongoose');
const danceStudios = require('./danceStudios');
const DanceStudio = require('../models/danceStudio');

mongoose.connect('mongodb://127.0.0.1:27017/danceStudio',
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
    for (let danceStudio of danceStudios) {
        const studio = new DanceStudio({
            name: `${danceStudio.name}`,
            description: `${danceStudio.description}`,
            location: `${danceStudio.location}`,
            images: danceStudio.images
        });

        await studio.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});

