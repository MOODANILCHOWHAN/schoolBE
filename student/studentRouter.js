import StudentController from './StudentController.js';

import { Router } from 'express';

const router = Router();

router.post('/save', StudentController);

export default router;
