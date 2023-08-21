const express = require('express');
const router = express.Router();
const { getAllUserData } = require('../controllers/userController');

router.route('/').get(getAllUserData);

module.exports = router;
