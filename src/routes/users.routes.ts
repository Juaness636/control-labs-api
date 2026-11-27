import { Router } from 'express';
import { UsersController } from '../controllers/users.controller';

const router = Router();

router.get('/search', UsersController.getUsersByFilter);
router.post('/', UsersController.createUser);
router.get('/:id', UsersController.getUserById );
router.put('/:id/inactivate', UsersController.inactivateUser );


export default router;