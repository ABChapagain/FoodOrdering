import express from 'express'
import { registerController, loginController } from '../controllers/authController.js';
// router object 
const router = express.Router();

//routing 

//FOR REGISTER || Method POST
router.post('/register', registerController);

//FOR LOGIN  || METHOD POST
router.post('/login', loginController)

export default router;