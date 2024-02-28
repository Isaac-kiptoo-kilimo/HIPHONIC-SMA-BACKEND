import { sendBadRequest, sendNotFound, sendCreated, sendServerError } from "../helpers/helperFunctions.js";
import { getPhotoService, createPhotoService, getPhotoByIdService, deletePhotoService, updatePhotoService } from '../services/photosServices.js';
import { photoValidator } from '../validators/photoValidator.js';
import {v4} from 'uuid'

export const getPhotos = async (req, res) => {
    try {
        const data = await getPhotoService();
        if (data.length === 0) {
            return sendNotFound(res, 'Photos not found');
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
        const { UserID, PhotoURL } = req.body;
        const PhotoID=v4()
        const UploadDate=new Date()

        const newPhoto = {
            PhotoID,
            UserID,
            PhotoURL,
            UploadDate
        };

        const { error } = photoValidator({ UserID, PhotoURL, UploadDate });
        if (error) {
            return sendBadRequest(res, error.details[0].message);
        }else{
            const response = await createPhotoService(newPhoto);
        if (response instanceof Error) {
            return sendServerError(res, 'Failed to create photo. Please try again later.');
        } else {
            return sendCreated(res, 'Photo created successfully');
        }
        }
    } catch (error) {
        console.error(error);
        return sendServerError(res, 'Server error');
    }
};

export const getPhotoById = async (req, res) => {
    try {
        const photoId = req.params.id;
        const data = await getPhotoByIdService(photoId);
        if (!data) {
            return sendNotFound(res, 'Photo not found');
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
        const photoId = req.params.id;
        const photo = await getPhotoByIdService(photoId);
        if (!photo) {
            return sendNotFound(res, 'Photo not found');
        } else {
            await deletePhotoService(photoId);
            return res.status(204).send();
        }
    } catch (error) {
        console.error(error);
        return sendServerError(res, 'Server error');
    }
};

export const updatePhoto = async (req, res) => {
    try {
        const photoId = req.params.id;
        const {UserID, PhotoURL, UploadDate } = req.body;
        const PhotoID=v4()
        const updatedPhoto = {
        
            UserID,
            PhotoURL,
            UploadDate
        };

        const { error } = photoValidator(updatedPhoto);
        if (error) {
            return sendBadRequest(res, 'Validation error in the data input', error);
        }

        const response = await updatePhotoService(photoId, updatedPhoto);
        if (response instanceof Error) {
            return sendServerError(res, 'Failed to update photo. Please try again later.');
        } else {
            return res.status(200).json(response);
        }
    } catch (error) {
        console.error(error);
        return sendServerError(res, 'Server error');
    }
};

