import express from "express";

const app = express(); //after this you can create routes

//first parameter is the path, second is the callback
app.get('/', (req, res)=>{
    res.send('Welcome to the Subscription Tracker API!');
});

app.listen(3000, ()=>{
    console.log('Subscription Tracker API is running on http://localhost:3000');
});

export default app;