import { poolRequest, sql } from "../utils/dbConnect.js";

export const getPhotoService = async () => {
    try {
        const result = await poolRequest().query(`SELECT * FROM Photo`);
        return result.recordset;
    } catch (error) {
        throw error;
    }
};

export const createPhotoService = async (newPhoto) => {
    const { PhotoID, UserID, PhotoURL, UploadDate } = newPhoto;
    try {
        const result = await poolRequest()
            .input("PhotoID", sql.VarChar, PhotoID)
            .input("UserID", sql.VarChar, UserID)
            .input("PhotoURL", sql.VarChar, PhotoURL)
            .input("UploadDate", sql.DateTime, UploadDate)
            .query(
                "INSERT INTO Photo (PhotoID, UserID, PhotoURL, UploadDate) VALUES (@PhotoID, @UserID, @PhotoURL, @UploadDate)"
            );
            console.log("result",result);
        return result;
    } catch (error) {
        console.error("Error occurred while creating photo:", error);
        throw new Error("Failed to create photo. Please try again later.");
    }
};


export const getPhotoByIdService = async (photoId) => {
    try {
        const result = await poolRequest()
            .input('PhotoID', sql.Int, photoId)
            .query(`SELECT * FROM Photo WHERE PHOTOID = @photoID`);

        return result.recordset[0];
    } catch (error) {
        throw error;
    }
};

export const deletePhotoService = async (photoId) => {
    try {
        await poolRequest()
            .input('PhotoID', sql.Int, photoId)
            .query(`DELETE FROM Photo WHERE PHOTOID = @PhotoID`);
    } catch (error) {
        throw error;
    }
};
export const updatePhotoService = async (photoId, updatedPhoto) => {
    const { PhotoID, UserID, PhotoURL, UploadDate } = updatedPhoto;
    try {
        const result = await poolRequest()
            .input("PhotoID", sql.VarChar, PhotoID)
            .input("UserID", sql.VarChar, UserID)
            .input("PhotoURL", sql.VarChar, PhotoURL)
            .input("UploadDate", sql.DateTime, UploadDate)
            .input("PhotoId", sql.Int, photoId)
            .query(
                "UPDATE Photo SET PhotoID = @PhotoID, UserID = @UserID, PhotoURL = @PhotoURL, UploadDate = @UploadDate WHERE PHOTOID = @PhotoId"
            );

        return result;
    } catch (error) {
        console.error("Error occurred while updating photo:", error);
        throw new Error("Failed to update photo. Please try again later.");
    }
};
