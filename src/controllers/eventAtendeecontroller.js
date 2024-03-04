import { sendServerError, sendCreated, sendDeleteSuccess, sendClientError } from "../helpers/helperFunctions.js";
import { createEventAttendeeService, getAllEventAttendeesService, deleteEventAttendeeService, checkExistingEventAttendee ,getAllEventAttendeesForEventService } from '../services/eventAtendeeService.js';

// Controller to create a new event attendee
export const createEventAttendeeController = async (req, res) => {
  try {
      const { EventID, AttendeeID } = req.body;

      
      const existingAttendee = await checkExistingEventAttendee(EventID, AttendeeID);


      if (existingAttendee.rowsAffected> 0) {
          return res.json({error:'You are already attending this event'})
      }
      const eventAttendee = { EventID, AttendeeID };
      const result = await createEventAttendeeService(eventAttendee);

      if (result) {
          sendCreated(res, 'You have registered for the event successfully');
      } else {
          sendServerError(res, 'Failed to register for the event');
      }
  } catch (error) {
      sendServerError(res, error.message);
  }
};

// Controller to get all event attendees
export const getAllEventAttendeesController = async (req, res) => {
    try {
        const { EventID } = req.params;
        const eventAttendees = await getAllEventAttendeesService(EventID);
        const result=eventAttendees.recordset
        res.status(200).json(result);
    } catch (error) {
        sendServerError(res, 'Internal server error');
    }
};

// Controller to delete an event attendee
export const deleteEventAttendeeController = async (req, res) => {
    try {
        const { EventID, AttendeeID } = req.params;
        await deleteEventAttendeeService(EventID, AttendeeID);
        sendDeleteSuccess(res, 'Successfully unregistered from the event');
    } catch (error) {
        sendServerError(res, 'Internal server error');
    }
};


// Controller to get all event attendees for a specific event
export const getAllEventAttendeesForEventController = async (req, res) => {
  try {
      const { EventID } = req.params; 
      const eventAttendeesForEvent = await getAllEventAttendeesForEventService(EventID);
      result=eventAttendeesForEvent.recordset
      res.status(200).json(result);
  } catch (error) {
      sendServerError(res, 'Internal server error');
  }
};