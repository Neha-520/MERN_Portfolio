const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();

const authenticate = require("../middleware/Authenticate");

require('../db/conn');
const User = require("../model/userSchema");

router.get('/', (req, res) => {
    res.send("hello world from router");
})

//when we need data
router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "plz fill the fields properly" });
    }
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "Email already exists" });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "password do not match" });
        } else {
            const user = new User({ name, email, phone, work, password, cpassword })
            //middleware for hashing pass is called before save

            await user.save();

            res.status(201).json({ message: "user registered succesfully" })
        }
    } catch (err) {
        console.log(err);
    }
    // res.json({ message: req.body });
})


//login route
router.post('/signin', async (req, res) => {
    //  console.log(req.body)
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: "Plz Fill the data" })

        const userLogin = await User.findOne({ email: email });
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000), //expire after 30 days
                // httpOnly: true,
            })


            if (!isMatch)
                res.status(400).json({ error: "Invalid Credentials" });
            else
                res.json({ message: "user signed in successfully" });
        } else {
            res.status(400).json({ error: "Invalid Credentials" });
        }

    } catch (err) {
        console.log(err);
    }
})

//about us
router.get('/about', authenticate, (req, res) => {
    console.log("Hello About");
    res.send(req.rootUser);
})

//get user data for contact us and home page
router.get('/getdata', authenticate, (req, res) => {
    console.log("getData");
    res.send(req.rootUser);
})

//contact us page
router.post('/contact', authenticate, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            console.log("error in contact form")
            return res.json({ error: "plzz fill the contact form" })
        }

        const userContact = await User.findOne({ _id: req.userID })


        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);

            await userContact.save();
            res.status(201).json({ message: "user Contact succesfully" });
        }

    } catch (error) {
        console.log(error);
    }
})


router.get('/logout', (req, res) => {
    console.log("Hello from logout");
    res.clearCookie('jwtoken', {
        path: '/'
    });
    res.status(200).send("User logout");
})

module.exports = router;