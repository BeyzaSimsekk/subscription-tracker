import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import User from "../models/user.model.js"
import {JWT_SECRET , JWT_EXPIRES_IN} from "../config/env.js"

/**in backend api, you will get all of the info(?) from req.body
 * WHAT IS A `req.body`?
 * It is an object that containing data from the client (POST request) 
  */

export const signUp = async (req, res, next) => {

    const session = await mongoose.startSession(); //not user session, for mongoose transaction
    session.startTransaction(); //atomic updates/operations (all or none)

    try {
        
        //Create a new user
        const {name, email, password} = req.body;

        //Check if a user already exists
        const existingUser = await User.findOne({email});

        if(existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 409; // 409: conflict(already exists)
            throw error;
        }

        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //for the case something goes wrong while creating a user we add {session}
        const newUsers = await User.create([{name,email, password: hashedPassword}], {session});

        const token = jwt.sign({userId: newUsers[0]._id}, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });


        await session.commitTransaction(); //means : we ready to commit
        session.endSession();

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                token,
                user: newUsers[0]
            }
            
        })

    } catch (error) { //if in any point smth goes wrong, abort the operation dont go further
        await session.abortTransaction();
        session.endSession();
        next(error);
    }

}

export const signIn = async (req, res, next) => {}

export const signOut = async (req, res, next) => {}