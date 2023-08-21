const asyncHandler = require("express-async-handler"); 
const User = require("../models/userModel");

//@desc Get all user data
//@route GET /api/users
const getAllUserData = asyncHandler(async (req,res) => {
    const userData = await User.find();
    res.status(200).json(userData);
});

module.exports = {
    getAllUserData,
};