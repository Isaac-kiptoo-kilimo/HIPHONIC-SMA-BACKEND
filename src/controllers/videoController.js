import { v4 } from "uuid";

//Video service
import { addVideoService } from "../services/videoService.js";

//Video validator
import { videoValidator } from "../validators/videoValidator.js";

//Helper functions
import { sendBadRequest, sendClientError, sendCreated, sendNotFound, sendDeleteSuccess, sendServerError } from "../helpers/helperFunctions.js";

//Creating a new video
export const addVideo = async (req, res) => {
    const { UserID, videoURL, videoCaption, UploadDate } = req.body;
    const {error} = videoValidator({ UserID, videoURL, videoCaption, UploadDate });
    if (error) {
        return sendServerError(res, error.message);
    } else {
        try {
            const videoID = v4();
            const UploadDate = new Date();
            const newVideo = {videoID, UserID, videoURL, videoCaption, UploadDate}
            const response = await addVideoService(newVideo);
            if (response.message) {
                sendServerError(res, response.message);
            } else {
                sendCreated(res, "Video uploaded and post created successfully")
            }
        } catch (error) {
            sendServerError(res, error.message);
        }
    }
};