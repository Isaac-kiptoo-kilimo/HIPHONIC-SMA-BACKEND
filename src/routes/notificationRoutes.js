import {Router} from 'express';
import { getAllNotificationsController, getAllUserNotificationsController } from '../controllers/notificationsControllers.js';

const notificationRouter=Router();


notificationRouter.get('/notifications', getAllNotificationsController )

notificationRouter.get('/notifications/user/:UserID', getAllUserNotificationsController )


export default notificationRouter;