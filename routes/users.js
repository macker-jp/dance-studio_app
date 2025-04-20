const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username });
    const newuser = await User.register(user, password);
    console.log(newuser);
    res.redirect('/dancestudios');
});

module.exports = router;