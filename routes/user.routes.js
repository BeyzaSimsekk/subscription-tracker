import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";


const userRouter = Router();

// DESCRIPTIONS
// GET /users -> get all users
// GET /users/:id -> get users by id // 123 4123 

userRouter.get("/", getUsers);

userRouter.get("/:id", getUser); //gets details of a singular user

userRouter.post("/", (req,res)=>res.send({title:"CREATE new user"}));

userRouter.put("/:id", (req,res)=>res.send({title:"UPDATE user"}));

userRouter.delete("/:id", (req,res)=>res.send({title:"DELETE user"}));

export default userRouter;
