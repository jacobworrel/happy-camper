const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();

router.post('/login', userController.authenticateUser);
router.post('/signup', userController.addUser);
router.get('/:value', userController.getMatchingUsers);

module.exports = router;
