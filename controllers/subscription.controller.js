import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import Subscription from "../models/subscription.model.js"
import {JWT_SECRET , JWT_EXPIRES_IN} from "../config/env.js"

export const createSubscription = async (req, res, next) => {
    try {
        
        const subscription = await Subscription.create({
            ...req.body, //everything from req.body
            user: req.user._id, //which user is creating the subscription(user is not from the request body, it is from the (auth)middleware)
        });

        res.status(201).json({success: true, data: subscription});

    } catch (error) {
        next(error);
    }
}