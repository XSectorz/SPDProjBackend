const asyncHandler = require("express-async-handler"); 
const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//@desc Get all user data
//@route GET /api/users
const getAllUserData = asyncHandler(async (req,res) => {
    const userData = await User.find();
    res.status(200).json(userData);
});

const registerUser = asyncHandler(async (req,res) => {
    try {
        const { first_name, last_name, email, password} = req.body;

        if(!first_name && !last_name && !email && !password) {
            res.status(400).send("All input is required");
        }

        //Check is user exists
        const oldUser = await User.findOne({ email });

        //User exists
        if(oldUser) {
            return res.status(409).send("User already exists. Please login");
        }
        
        //Encrypt password
        encryptedPassword = await bcrypt.hash(password,10);

        //Create user in database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword
        })
        
        //Create token
        const token  = jwt.sign(
            { user_id: user._id, email},
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        )

        //Save User token
        user.token = token;

        res.status(201).json(user);
    } catch(err) {
        console.log(err);
    }
});

const loginUser = asyncHandler(async (req,res) => {
    try {
        const { email, password } = req.body;

        if(!email && !password) {
            res.status(400).send("All input required");
        }

        const user = await User.findOne( { email });

        if(user && (await bcrypt.compare(password, user.password))) {
            //Create token
            const token = jwt.sign(
                { user_id: user._id, email},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h"
                }
            )
            user.token = token;
            res.status(200).json(user);
        }
        res.status(400).send("Invailid Credentials");
    } catch(err) {
        console.log(err);
    }
});

const sendUserToMainPage = ((req,res) => {
    res.status(200).send("Welcome <3");
});

module.exports = {
    getAllUserData, loginUser, registerUser,sendUserToMainPage
};