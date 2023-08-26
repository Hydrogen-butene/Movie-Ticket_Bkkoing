import express from "express";
import { deleteUser, getAllUsers, getBookingOfusers, getUserById, login, signup, updateUser } from "../controllers/user-controllers.js";


const userRouter = express.Router()

userRouter.get("/", getAllUsers)

userRouter.get("/:id", getUserById)

userRouter.get("/bookings/:id", getBookingOfusers)

userRouter.post("/signup", signup)

userRouter.put("/:id",updateUser)

userRouter.delete("/:id", deleteUser)

userRouter.post("/login", login)

export default userRouter