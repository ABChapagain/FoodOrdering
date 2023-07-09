import express from 'express'
import { registerController, loginController, testController } from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
// router object 
const router = express.Router();

//routing 

//FOR REGISTER || Method POST
router.post('/register', registerController);

//FOR LOGIN  || METHOD POST
router.post('/login', loginController);

//FOR TEST || METHOD GET
router.get('/test', requireSignIn, isAdmin, testController);

export default router;