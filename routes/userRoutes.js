const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAllUserData, registerUser, loginUser, sendUserToMainPage } = require('../controllers/userController');

router.route('/').get(getAllUserData);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/welcome').post(auth,sendUserToMainPage);

module.exports = router;
