import { Router } from 'express';
import authController from './auth/authController.js';
const router = Router();
router.post('/logIn', authController);

export default router;
