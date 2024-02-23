import {Router} from 'express';
import {deleteUserController, getAllUsersController, getSingleUserController, loginUserController, registerNewUserController, updateUserControllers, updateUserPasswordControllers} from '../controllers/usersControllers.js'

const userRouter=Router();

userRouter.post('/users/register' , registerNewUserController )
userRouter.post('/users/login' , loginUserController )
userRouter.get('/users' , getAllUsersController )

userRouter.get('/users/single/:UserID' ,getSingleUserController)

userRouter.put('/users/update/:UserID',updateUserControllers)

userRouter.patch('/users/patch/:UserID',updateUserPasswordControllers)

userRouter.delete('/users/delete/:UserID',deleteUserController)


export default userRouter;