import { sendBadRequest, sendNotFound, sendCreated, sendServerError } from "../helpers/helperFunctions.js";
import { getPhotoService, createPhotoService, getPhotoByIdService, deletePhotoService } from '../services/photosServices.js';
// import { photoValidator } from '../validators/photoValidator.js';

export const getPhotos = async (req, res) => {
    try {
        const data = await getPhotoService();
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

export const createPhoto = async (req, res) => {
    try {
        const {  PhotoID,UserID,PhotoURL,UploadDate } = req.body;

        const newPhoto = {
            PhotoID,
            UserID,
            PhotoURL,
            UploadDate
        };

        const { error } = eventValidator(newPhoto);
        if (error) {
            return sendBadRequest(res, 'Validation error in the data input', error);
        }

        const response = await createPhotoService(newPhoto);
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

export const getPhotoById = async (req, res) => {
    try {
        const eventId = req.params.id;
        const data = await getPhotoByIdService(eventId);
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

export const deletePhoto = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await getPhotoByIdService(eventId);
        if (!event) {
            return sendNotFound(res, 'Event not found');
        } else {
            await deletePhotoService(eventId);
            return res.status(204).send();
        }
    } catch (error) {
        console.error(error);
        return sendServerError(res, 'Server error');
    }
};
