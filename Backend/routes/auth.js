const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    try {
        console.log(req.body);

        const user = new User(req.body);
        await user.save();

        res.status(201).json({
            success: true,
            user
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;
