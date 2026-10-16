import { Router } from 'express';
import { equpimentsController } from '../controllers/equpiments.controllers';


const router = Router();

router.get('/search', equpimentsController.getequpimentsByFilter);
router.post('/', equpimentsController.createequpiment);
router.patch('/:id', equpimentsController.acceptLabInventory);



export default router;
