
import { Router } from 'express';
import { LoanController } from '../controllers/loan.controller';

const router = Router();

router.get('/search', LoanController.getLoansByFilter);
router.post('/', LoanController.createLoan);
router.get('/:id', LoanController.getLoanById);
router.put('/:id/accept', LoanController.acceptLoanInventory);

export default router;
