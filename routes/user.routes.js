import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { getUser, getUsers } from "../controllers/user.controller.js";


//ARCJET 'TE KALDIK****2.01.01******KULLANICININ SINIRSIZ SAYIDA İSTEK ATMASINI ENGELLEYECEK, VİRÜS VE BENZERİ SALDIRILARA KARŞI GÜVENLİK***

const userRouter = Router();

// DESCRIPTIONS
// GET /users -> get all users
// GET /users/:id -> get users by id // 123 4123 

userRouter.get("/", getUsers);

//you can chain as many as middlewares as long as they end with `next`
userRouter.get("/:id", authorize, getUser); //gets details of a singular user

userRouter.post("/", (req,res)=>res.send({title:"CREATE new user"}));

userRouter.put("/:id", (req,res)=>res.send({title:"UPDATE user"}));

userRouter.delete("/:id", (req,res)=>res.send({title:"DELETE user"}));

export default userRouter;
