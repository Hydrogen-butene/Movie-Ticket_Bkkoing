import express from "express"
import { Addminlogin, addAdmin, getAdminById, getAdmins } from "../controllers/admin-controllers.js"

const adminRouter = express.Router()

adminRouter.post("/signup", addAdmin)
adminRouter.post("/login", Addminlogin)
adminRouter.get("/",getAdmins)
adminRouter.get("/:id",getAdminById)


export default adminRouter;