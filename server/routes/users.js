const express = require('express');
const userController = require('./../controllers/userController');

let router = express.Router();

router.post('/login', userController.authenticateUser);
router.post('/signup', userController.addUser);

module.exports = router;
