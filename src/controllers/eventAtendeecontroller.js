import { sendServerError, sendCreated, sendDeleteSuccess } from "../helpers/helperFunctions.js";
import { createEventAttendeeService, getSingleEventAttendeeService, getAllEventAttendeesService, deleteEventAttendeeService } from '../services/eventAtendeeService.js';

// Controller to create a new event attendee
export const createEventAttendeeController = async (req, res) => {
  try {
    const { EventID, AttendeeID } = req.body;

    
    const existingAttendee = await getSingleEventAttendeeService(EventID, AttendeeID);

    if (existingAttendee.length > 0) {
      sendClientError(res, 'You are already attending this event');
    } else {
      const eventAttendee = { EventID, AttendeeID };

      try {
        const result = await createEventAttendeeService(eventAttendee);
        if (result) {
          sendCreated(res, 'You have registerd the event successfully');
        } else {
          sendServerError(res, 'Failed to join the event');
        }
      } catch (error) {
        sendServerError(res, error.message);
      }
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};


export const getAllEventAttendeesController = async (req, res) => {
  try {
    const { EventID } = req.params;
    const eventAttendees = await getAllEventAttendeesService(EventID);
    res.status(200).json(eventAttendees);
  } catch (error) {
    sendServerError(res, 'Internal server error');
  }
};

export const deleteEventAttendeeController = async (req, res) => {
  try {
    const { EventID, AttendeeID } = req.params;
    await deleteEventAttendeeService(EventID, AttendeeID);
    sendDeleteSuccess(res, 'Successfully unregistered from the event');
  } catch (error) {
    sendServerError(res, 'Internal server error');
  }
};
