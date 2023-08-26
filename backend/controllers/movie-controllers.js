import jwt from "jsonwebtoken"
import Movie from "../models/Movie.js";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";


export const addMovie = async (req, res,next)=>{
    const extractedToken = req.headers.authorization.split(" ")[1] // Bearer token
    if(!extractedToken && extractedToken.trim() === ""){
        return res.status(404).json({message:"Token not found"})
    }
    let adminId;
    //verify token
    jwt.verify(extractedToken, process.env.SERET_KEY,(err, decrypted)=>{
        if(err){
            return res.status(400).json({message:`${err.message}`})
        }
        adminId = decrypted.id
        return
    })


    //create new movie
    const {title,description,releaseDate,posterUrl,featured,actors} = req.body
    if(!title && title.trim()==="" && !description && description.trim()==="" && !posterUrl && posterUrl.trim()===""){
        return res.status(422).json({message:"Invalid Inputs"})
    }
    let movie;
    try {
        movie = new Movie({title, description,releaseDate:new Date(`${releaseDate}`),actors,posterUrl, featured,admin:adminId})
        const session = await mongoose.startSession()
        const adminUser = await Admin.findById(adminId)
        session.startTransaction()

        movie = await movie.save({session})
        adminUser.addedMovies.push(movie)
        await adminUser.save({session})
        await session.commitTransaction()

        if(!movie){
            return res.status(500).json({message:"Request Failed"})
        }
        return res.status(201).json({ movie})
    } catch (error) {
        return console.log(error);
    }

}


export const getAllMovies = async(req,res,next)=>{
    let movies

    try {
        movies = await Movie.find()
        if(!movies){
            return res.status(500).json({message:"request failed"})
        }
        return res.status(200).json({movies})
    } catch (error) {
        return console.log(error)
    }
}


export const getMoviesById = async(req,res,next)=>{
    const id = req.params.id
    let movies

    try {
        movies = await Movie.findById(id)
        if(!movies){
            return res.status(500).json({message:"request failed"})
        }
        return res.status(200).json({ movies})
    } catch (error) {
        return console.log(error)
    }
}