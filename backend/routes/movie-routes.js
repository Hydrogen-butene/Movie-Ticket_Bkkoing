import express from "express"
import { addMovie, getAllMovies, getMoviesById } from "../controllers/movie-controllers.js"

const movieRouter = express.Router()

movieRouter.get("/", getAllMovies)

movieRouter.get("/:id", getMoviesById)


movieRouter.post("/", addMovie)

export default movieRouter;