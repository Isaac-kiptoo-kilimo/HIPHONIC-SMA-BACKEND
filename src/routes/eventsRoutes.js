import { Router } from "express";
import { getEvents, getEventById, createEvent, deleteEvent } from "../controllers/eventsController.js";

const eventRouter = Router();


eventRouter.get('/events', getEvents);
eventRouter.get('/events/:id', getEventById);
eventRouter.post('/events', createEvent);
eventRouter.delete('/events/:id', deleteEvent);

export default eventRouter;
