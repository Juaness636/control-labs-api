import { Router } from 'express';
import { labsController } from '../controllers/labs.controllers';

const router = Router();

router.get('/search', labsController.getLabsByFilter);
router.post('/', labsController.createLab); 
router.patch('/:id', labsController.acceptLabInventory );



export default router;