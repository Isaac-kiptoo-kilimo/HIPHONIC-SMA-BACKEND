import { Router } from 'express';
import { getPhotos, getPhotoById, createPhoto, deletePhoto } from '../controllers/photoController.js';
import logger from '../utils/Logger.js';

const photoRouter = Router();

photoRouter.get('/photos', getPhotos);
photoRouter.get('/photos/:id', getPhotoById);
photoRouter.post('/photos', createPhoto);
photoRouter.delete('/photos/:id', deletePhoto);

export default photoRouter;
