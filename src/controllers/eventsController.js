import { sendBadRequest, sendNotFound, sendCreated, sendServerError } from "../helpers/helperFunctions.js";
import { getEventService, createEventService, getEventByIdService, deleteEventService } from '../services/eventService.js';
import { eventValidator } from '../validators/eventValidator.js';

export const getEvents = async (req, res) => {
    try {
        const data = await getEventService();
        if (data.length === 0) {
            return sendNotFound(res, 'Events not found');
        } else {
            return res.status(200).json(data);
        }
    } catch (error) {
        console.error(error);
        return sendServerError(res, 'Server error');
    }
}

export const createEvent = async (req, res) => {
    try {
        const { EventName, Description, EventDate, Location, EventPosterURL } = req.body;
        const newEvent = {
            EventName,
            Description,
            EventDate,
            Location,
            EventPosterURL
        };

        const { error } = eventValidator(newEvent);
        if (error) {
            return sendBadRequest(res, 'Validation error in the data input', error);
        }

        const response = await createEventService(newEvent);
        if (response instanceof Error) {
            return sendServerError(res, 'Failed to create event. Please try again later.');
        } else {
            return sendCreated(res, 'Event created successfully');
        }
    } catch (error) {
        console.error(error);
        return sendServerError(res, 'Server error');
    }
};

export const getEventById = async (req, res) => {
    try {
        const eventId = req.params.id;
        const data = await getEventByIdService(eventId);
        if (!data) {
            return sendNotFound(res, 'Event not found');
        } else {
            return res.status(200).json(data);
        }
    } catch (error) {
        console.error(error);
        return sendServerError(res, 'Server error');
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await getEventByIdService(eventId);
        if (!event) {
            return sendNotFound(res, 'Event not found');
        } else {
            await deleteEventService(eventId);
            return res.status(204).send();
        }
    } catch (error) {
        console.error(error);
        return sendServerError(res, 'Server error');
    }
};
