import {
  getAllUsersService,
  registerUserService,
  getUserByEmailService,
} from "../services/usersServices.js";
import {userRegistrationValidation }from "../validators/userValidator.js";
import { v4 } from "uuid";
import {sendServerError,sendCreated} from '../helpers/helperFunctions.js'
import bcrypt from 'bcrypt'

export const getAllUsersController = async (req, res) => {
  try {
    const results = await getAllUsersService();
    const users = results;
    console.log("users", users);
    return res.status(200).json({ Users: users });
  } catch (error) {
    console.error("Error fetching all users:", error);
    return res.status(500).json("Internal server error");
  }
};

export const registerNewUserController = async (req, res) => {
  try {
    const { Username, Email, Password, TagName, Location } = req.body;
    console.log(req.body);

    const existingUser = await getUserByEmailService(Email);
    console.log("existing user",existingUser);

  if (existingUser) {
    
    return res.status(400).send({message:"User with the provided email or username already exists"});
  }else{
 
    
    const { error } = userRegistrationValidation({ Username, Email, Password, TagName, Location } );
    console.log("error",error);
    if (error) {
      return res.status(400).send(error.details[0].message);
    } else {
      const UserID = v4();
      const hashedPassword = await bcrypt.hash(Password, 8);  
      
      const registeredUser = { 
        UserID:UserID.toLowerCase(),
        Username: Username.toLowerCase(),
        Email: Email.toLowerCase(),
        Password: hashedPassword.toLowerCase(),
        TagName: TagName.toLowerCase(),
        Location: Location.toLowerCase() };
        console.log("created user",registeredUser);

      const result = await registerUserService(registeredUser);

      if (result.message) {
        sendServerError(res, result.message)
    } else {
        sendCreated(res, 'User created successfully');
    }
    }
  }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

