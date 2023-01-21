import express from 'express';
import { registerHandler, loginHandler } from '../Controller/AuthController.js';

const authRoute = express.Router();

authRoute.post('/register', registerHandler)

authRoute.post('/login', loginHandler)



export default authRoute