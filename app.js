const mongoose = require('mongoose');
const express = require('express');

const app = express();

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

app.listen(4000, () => {
    console.log(`ポート4000でリクエスト待受中...`);
});