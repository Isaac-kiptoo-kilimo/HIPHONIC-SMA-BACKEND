import { poolRequest, sql } from "../utils/dbConnect.js"
import { sendServerError, sendNotFound, sendDeleteSuccess} from "../helpers/helperFunctions.js";

// Create a ne video
export const addVideoService = async (newVideo) => {
    try {
        
        //Add the video querry
        const addVideoQuery = `
        INSERT INTO Video (videoID, UserID, videoURL,videoCaption, UploadDate)
        VALUES (@videoID, @UserID, @VideoURL,@videoCaption, @UploadDate)`

        //Picking input from the input
        const result = await poolRequest()
        .input("videoID", sql.VarChar, newVideo.videoID)
        .input("UserID", sql.VarChar, newVideo.UserID)
        .input("videoURL", sql.VarChar, newVideo.videoURL)
        .input("videoCaption", sql.VarChar, newVideo.videoCaption)
        .input("UploadDate", sql.DateTime, newVideo.UploadDate)
        .query(addVideoQuery)

        return result;

    } catch (error) {
        return error;
    }
};