import  express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";
import bookingRouter from "./routes/booking-routes.js";
import cors from "cors";
dotenv.config()

const app = express()
 

//middleware
app.use(cors())
app.use(express.json())
app.use("/user", userRouter)
app.use("/admin",adminRouter)
app.use("/movie", movieRouter)
app.use("/booking", bookingRouter)

mongoose.connect(process.env.MONGOOSE_url).then(()=>{
    console.log("connected to mongoose");
}).catch((error)=>console.log(error))

app.listen(5000, ()=>{
    console.log("connecter to 5000");
})