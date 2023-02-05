import express from 'express';
import { allUsers, loginUser, registerUser } from '../controllers/userControllers.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.route('/').post(registerUser).get(protect,allUsers)
router.post('/login',loginUser)

export default router;