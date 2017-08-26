import express from 'express';
import userController from './../controllers/userController';

let router = express.Router();

router.post('/login', userController.authenticateUser);
router.post('/signup', userController.addUser);

export default router;
