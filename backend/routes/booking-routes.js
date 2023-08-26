import express from "express"
import { getBookingById, newBooking } from "../controllers/booking-controller.js"

const bookingRouter = express.Router()


bookingRouter.get("/:id", getBookingById)

bookingRouter.post("/", newBooking)

bookingRouter.delete("/:id", newBooking)




export default bookingRouter;