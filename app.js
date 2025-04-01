const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');


const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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


app.get('/', (req, res) => {
    res.render('home');
});

app.listen(4000, () => {
    console.log(`ポート4000でリクエスト待受中...`);
});