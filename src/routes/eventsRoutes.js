import { Router } from 'express';
import { createEventController, deleteEventController, getAllEventsController, getSingleEventController } from '../controllers/eventsController.js';

const eventRouter = Router();

eventRouter.post('/events', createEventController);

eventRouter.get('/events', getAllEventsController);

eventRouter.get('/events/single/:EventID', getSingleEventController);

// eventRouter.put('/events/update/:EventID', updateEventController);

eventRouter.delete('/events/delete/:EventID', deleteEventController);

export default eventRouter;

