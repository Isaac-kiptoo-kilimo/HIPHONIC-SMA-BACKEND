import {Router} from 'express';
import {getAllUsersController, registerNewUserController} from '../controllers/usersControllers.js'
import logger from '../utils/Logger.js';

const userRouter=Router();

userRouter.post('/users/register' , registerNewUserController )
userRouter.get('/users' , getAllUsersController )

export default userRouter;