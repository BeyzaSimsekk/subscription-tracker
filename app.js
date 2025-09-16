import express from "express";

import {PORT} from "./config/env.js";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";

const app = express(); //after this you can create routes

/*DESCRIPTIONS
* `use` keyword for middleware(express.json) and routes(userRouter, ...)
* if you want use sign-up : `/api/v1/auth/sign-up`
*/

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

//first parameter is the path, second is the callback
app.get('/', (req, res)=>{
    res.send('Welcome to the Subscription Tracker API!');
});

app.listen(PORT, async()=>{
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);

    await connectToDatabase();
});

export default app;