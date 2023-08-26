import Bookings from "../models/Bookings.js";
import User from "../models/User.js";
import bcryptjs from "bcryptjs"

export const getAllUsers = async(req,res,next)=>{
    let users;
    try {
        users = await User.find()

        if(!users){
            return res.status(500).json({message:"Uexpected error occured"})
        }
        return res.status(200).json({users})
    } catch (error) {
        return console.log(error);
    }
}



export const signup = async (req,res,next)=>{
    const {name ,email, password} = req.body
    if(!name && name.trim()==="" && !email && email.trim()==="" && !password && password.trim()==="" ){
        return res.status(422).json({message:"Invalid Input"})
    }
    let user;
    try {
        const newPassword = bcryptjs.hashSync(password, 10)
        user = new User({name,email,password:newPassword})
        user = await user.save()
        if(!user){
            return res.status(500).json({message:"Unexpected error occured"})
        }
        return res.status(201).json({id:user._id})
    } catch (error) {
        return console.log(error)
    }
}

export const updateUser = async (req,res,next)=>{
    const id = req.params.id

    const {name ,email, password} = req.body
    if(!name && name.trim()==="" && !email && email.trim()==="" && !password && password.trim()==="" ){
        return res.status(422).json({message:"Invalid Input"})
    }
    let user;
    try {
        const newPassword = bcryptjs.hashSync(password, 10)
        user = await User.findByIdAndUpdate(id,{name,email,password:newPassword})
        if(!user){
            return res.status(500).json({message:"Unexpected error occured"})
        }
        return res.status(200).json({message:"Updated successfully"})
    } catch (error) {
        return console.log(error)
    }
}

export const deleteUser = async (req,res,next)=>{
    const id = req.params.id
    let user
    try {
        user = await User.findByIdAndDelete(id)
        if(!user){
            return res.status(500).json({message:"Unexpected error occured"})
        }
        return res.status(200).json({message:"Updated deleted"})
    } catch (error) {
        return console.log(error)
    }
}

export const login = async (req,res,next)=>{
    const {email, password} = req.body
    if(!email && email.trim()==="" && !password && password.trim()==="" ){
        return res.status(422).json({message:"Invalid Input"})
    }
    let existingUser;
    try {
        existingUser = await User.findOne({email})
        if(!existingUser){
            return res.status(404).json({message:"Inccorect credientials"})
        }
        const ispasswordCorrect = bcryptjs.compareSync(password, existingUser.password)
        if(!ispasswordCorrect){
            return res.status(400).json({message:"Inccorect credientials"})
        }
        return res.status(200).json({message:"Login successfull"})
    } catch (error) {
        return console.log(error)
    }
}

export const getBookingOfusers = async (req,res,next)=>{
    const id = req.params.id
    let bookings
    try {
        bookings = await Bookings.find({user:id})
        if(!bookings){
            return res.status(500).json({message:"Unable to get booking"})

        }
        return res.status(200).json({bookings})
    } catch (error) {
        return console.log(error)
    }
}


export const getUserById = async(req,res,next)=>{
    const id = req.params.id
    let users
    try {
        users = await User.findById(id)

        if(!users){
            return res.status(500).json({message:"Uexpected error occured"})
        }
        return res.status(200).json({users})
    } catch (error) {
        return console.log(error);
    }
}