const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const { exists, findOne } = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'KashifSupermostSecretkey';

//Create a User using: POST "/api/auth/createuser". No login required
router.post(
    '/createuser',
    [
        body('name', 'Name must be at least 3 characters long').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
    ],
    async (req, res) => {
        try {
            console.log(req.body);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            let user = await User.findOne({ email: req.body.email });
            if(user){
                return res.status(400).json({error: "Sorry a user with this email already exists"})
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            });
            const data ={
                user:{
                    id:user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            return res.status(201).json({
                success: true,
                user,
                authtoken
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
);

router.post(
    '/login',
    [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password not be blank').exists(),
    ],
    async(req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const {email, password} = req.body;
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({error: "Please try to login with correct credentials"});
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if(!passwordCompare){
                return res.status(400).json({error: "Please try to login with correct credentials"});
            }

            const data = {
                user:{
                    id: user.id
                }
            }

            const authtoken = jwt.sign(data, JWT_SECRET);
            return res.status(200).json({
                authtoken
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({  error: "Internal Server Error" });
        }
})

router.post(
    '/getuser',
    fetchuser,
    async(req, res) => { 
        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            res.status(200).send(user);
        }catch (error) {
            console.error(error);
            res.status(500).json({  error: "Internal Server Error" });
        }
    })

module.exports = router;
