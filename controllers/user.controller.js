import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import User from "../models/user.model.js"
import {JWT_SECRET , JWT_EXPIRES_IN} from "../config/env.js"

// buradaki next parametresi middleware icindeki next parametresidir(errorMiddleware)
// function that gets(fetches) all users
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        res.status(200).json({success: true, data: users});
    } catch (error) {
        next(error);
    }
}

// function that gets(fetches) a single user
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if(!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({success: true, data: user});
    } catch (error) {
        next(error);
    }
}