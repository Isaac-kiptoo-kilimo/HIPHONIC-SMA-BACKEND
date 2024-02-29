import {Router} from 'express';

const groupPostRouter=Router();

groupPostRouter.post('/groups', createGroupController)

groupPostRouter.get('/groups', getAllGroupsController)

groupPostRouter.get('/groups/single/:GroupID', getSingleGroupController)

groupPostRouter.put('/groups/update/:GroupID', updateGroupControllers)

groupPostRouter.patch('/groups/patch/:GroupID', updateGroupNameControllers)

groupPostRouter.delete('/groups/delete/:GroupID', deleteGroupControllers)


export default groupPostRouter;