const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const DanceStudio = require('../models/danceStudio');
require('dotenv').config();
const DB_URL = process.env.MONGODB_URI;


const app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// mongodb://127.0.0.1:27017/danceStudio
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


app.get('/', (req, res) => {
    res.render('home');
});

app.get('/dancestudios', async (req, res) => {
    const danceStudios = await DanceStudio.find({});
    res.render('danceStudios/index', { danceStudios });
});

app.listen(4000, () => {
    console.log(`ポート4000でリクエスト待受中...`);
});