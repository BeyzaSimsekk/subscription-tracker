import Subscription from "../models/subscription.model.js"
import {SERVER_URL} from "../config/env.js"
import { workflowClient } from "../config/upstash.js"

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        'content-type': 'application/json',
      },
      retries: 0,
    })

    res.status(201).json({ success: true, data: { subscription, workflowRunId } });
  } catch (e) {
    next(e);
  }
}

export const getUserSubscriptions = async (req, res, next) => {
    try {
        // Check if the user is the same as the one in the token (you can check your own subscriptions)
        if(req.user.id !== req.params.id) {
            const error = new Error("You are not the owner of this account");
            error.statusCode = 401; //unauthorized
            throw error;
        }

        const subscriptions = await Subscription.find({user: req.params.id});

        res.status(200).json({success: true, data: subscriptions});

    } catch (error) {
        next(error); //forward to error handler middleware
    }
}