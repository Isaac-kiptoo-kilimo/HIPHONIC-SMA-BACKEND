
import dotenv from 'dotenv'

import {poolRequest,sql} from '../utils/dbConnect.js'

dotenv.config();


export const getAllUserNotificationsService = async (UserID) => {
    try {
      const result = await poolRequest()
        .input('UserID', sql.VarChar, UserID)
        .query(`
          SELECT Notifications.*, tbl_user.*
          FROM Notifications
          INNER JOIN tbl_user ON tbl_user.userID = Notifications.UserID
          WHERE Notifications.UserID = @UserID
        `);
  
      console.log("result records", result.recordset);
      console.log("result", result);
      return result;
    } catch (error) {
      return error;
    }
  };
  

  export const getAllNotificationsService=async()=>{
    try {
        const allNotifications=await poolRequest().query(`SELECT * FROM Notifications`)
        return allNotifications
    } catch (error) {
        return error
    }
}