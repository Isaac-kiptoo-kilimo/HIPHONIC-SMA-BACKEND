import { Router } from 'express';
import { createEventAttendeeController, getAllEventAttendeesController, deleteEventAttendeeController, getAllEventAttendeesForEventController } from '../controllers/eventAtendeecontroller.js';

const eventAttendeeRouter = Router();

eventAttendeeRouter.post('/eventattendee', createEventAttendeeController);
eventAttendeeRouter.get('/eventattendee/:EventID', getAllEventAttendeesController);
eventAttendeeRouter.delete('/eventattendee/delete/:EventID/:AttendeeID', deleteEventAttendeeController);
eventAttendeeRouter.get('/event/:EventID/attendees', getAllEventAttendeesForEventController);

export default eventAttendeeRouter;

