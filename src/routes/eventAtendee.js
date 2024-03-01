import { Router } from 'express';
import { createEventAttendeeController, getAllEventAttendeesController, deleteEventAttendeeController } from '../controllers/eventAtendeeController.js';

const eventAtendeeRouter = Router();


eventAtendeeRouter.post('/eventatendees', createEventAttendeeController);
eventAtendeeRouter.get('/eventatendees/:EventID', getAllEventAttendeesController);
// eventAtendeeRouter.get('/eventatendees/single/:id', getSingleEventAttendeeController);
eventAtendeeRouter.delete('/eventatendees/delete/:id', deleteEventAttendeeController);

export default eventAtendeeRouter;

