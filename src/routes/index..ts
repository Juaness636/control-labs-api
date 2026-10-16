import { Router } from 'express';
import loanRoutes from './loan.routes';
import usersRoutes from './users.routes';
import labsRoutes from './labs.routes';
import equpimentsRoutes from './equpiments';

const router = Router();
router.use('/loans', loanRoutes);
router.use('/users', usersRoutes);
router.use('/labs', labsRoutes);
router.use('/equpiments', equpimentsRoutes);

export default router;