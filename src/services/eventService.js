import { poolRequest, sql } from "../utils/dbConnect.js";

export const getEventService = async () => {
    try {
        const result = await poolRequest().query(`SELECT * FROM Event`);
        return result.recordset;
    } catch (error) {
        throw error;
    }
};

export const createEventService = async (newEvent) => {
    const { EventName, Description, EventDate, Location, EventPosterURL } = newEvent;
    try {
        const result = await poolRequest()
            .input("EventName", sql.VarChar, EventName)
            .input("Description", sql.VarChar, Description)
            .input("EventDate", sql.DateTime, EventDate)
            .input("Location", sql.VarChar, Location)
            .input("EventPosterURL", sql.VarChar, EventPosterURL)
            .query(
                "INSERT INTO Event (EventName, Description, EventDate, Location, EventPosterURL) VALUES (@EventName, @Description, @EventDate, @Location, @EventPosterURL)"
            );

        return result;
    } catch (error) {
        console.error("Error occurred while creating event:", error);
        throw new Error("Failed to create event. Please try again later.");
    }
};

export const getEventByIdService = async (eventId) => {
    try {
        const result = await poolRequest()
            .input('EventID', sql.Int, eventId)
            .query(`SELECT * FROM Event WHERE EventID = @EventID`);

        return result.recordset[0];
    } catch (error) {
        throw error;
    }
};

export const deleteEventService = async (eventId) => {
    try {
        await poolRequest()
            .input('EventID', sql.Int, eventId)
            .query(`DELETE FROM Event WHERE EventID = @EventID`);
    } catch (error) {
        throw error;
    }
};
