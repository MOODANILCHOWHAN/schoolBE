import StudentController from './StudentController.js';

import { Router } from 'express';

const router = Router();

router.post('/save', StudentController.addingStudent);
router.get('/getStudent:rollNo',StudentController.getStudent);
router.put('/updateStudent',StudentController.updateStudent);

export default router;
