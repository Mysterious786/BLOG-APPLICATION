import express from 'express';
import { signupUser } from '../controller/user-controller.js';


const router=express.Router();
//sending a post api from frontend... signup is the api end point

router.post('/signup',signupUser);


export default router;