import express from 'express';
import authController from './../controllers/authController';

let router = express.Router();

router.get('/login', authController.verifyUser);
router.post('/signup', authController.addUser);

export default router;
