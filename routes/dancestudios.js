const express = require('express');
const router = express.Router();
const DanceStudio = require('../models/danceStudio');

router.get('/', async (req, res) => {
    const danceStudios = await DanceStudio.find({});
    res.render('danceStudios/index', { danceStudios });
});
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const danceStudio = await DanceStudio.findById(id);
    res.render('danceStudios/show', { danceStudio });
});

module.exports = router;