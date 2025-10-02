import express from "express";
import cookieParser from "cookie-parser";

import {PORT} from "./config/env.js";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arjectMiddleware from "./middlewares/arcjet.middleware.js";
import workflowRouter from "./routes/workflow.routes.js";

const app = express(); //after this you can create routes

/*DESCRIPTIONS
* `use` keyword for middleware(express.json) and routes(userRouter, ...)
* if you want use sign-up : `/api/v1/auth/sign-up`
*/

app.use(express.json()); //JSON verilerini ayrıştırmak için kullanılır
app.use(express.urlencoded({extended: false})); //helps when processing the form data
app.use(cookieParser()); //read cookies from the request + app uses them
app.use(arjectMiddleware);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/workflows", workflowRouter);

app.use(errorMiddleware);

//first parameter is the path, second is the callback
app.get('/', (req, res)=>{
    res.send('Welcome to the Subscription Tracker API!');
});

const port = process.env.PORT || PORT || 3000;  // Render'ın verdiği PORT'u kullan, yoksa .env'deki PORT
app.listen(port, async()=>{
    console.log(`Subscription Tracker API is running on http://localhost:${port}`);

    await connectToDatabase();
});

export default app;