import {Router} from 'express';
import { createGroupActivityController, getAllGroupPostController } from '../controllers/groupPostControllers.js';

const groupPostRouter=Router();

groupPostRouter.post('/groupposts', createGroupActivityController)

groupPostRouter.get('/groupposts', getAllGroupPostController)

// groupPostRouter.get('/groups/single/:GroupID', getSingleGroupController)

// groupPostRouter.put('/groups/update/:GroupID', updateGroupControllers)

// groupPostRouter.patch('/groups/patch/:GroupID', updateGroupNameControllers)

// groupPostRouter.delete('/groups/delete/:GroupID', deleteGroupControllers)


export default groupPostRouter;