const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const dancestudioRoutes = require('../routes/dancestudios');
const User = require('../models/user');
const userRoutes = require('../routes/users');
const reviewRoutes = require('../routes/reviews');
require('dotenv').config();
const DB_URL = process.env.MONGODB_URI;
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');


const app = express();

app.use(express.static(path.join(__dirname, "../public")));

const sessionConfig = {
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
};
app.use(session(sessionConfig));
app.use(flash());

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
})

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

app.use('/dancestudios', dancestudioRoutes);
app.use('/users', userRoutes);
app.use('/dancestudios/:id/reviews', reviewRoutes);

app.listen(4000, () => {
    console.log(`ポート4000でリクエスト待受中...`);
});