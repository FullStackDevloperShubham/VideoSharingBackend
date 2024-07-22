import express from 'express';
import { signin, signup } from '../controllers/auth.controller.js';

const router = express.Router();

//create a user 
router.post('/signup', signup)
//Sign IN
router.post('/signin', signin)
//Google auth
router.post('/google',)




export default router