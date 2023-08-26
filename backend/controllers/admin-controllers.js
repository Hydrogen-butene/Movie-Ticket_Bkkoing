import Admin from "../models/Admin.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export const addAdmin = async (req,res,next)=>{
    const {email, password} = req.body
    if(!email && email.trim()==="" && !password && password.trim()==="" ){
        return res.status(422).json({message:"Invalid Input"})
    }
    let existingAdmin

    try {
        existingAdmin = await Admin.findOne({email})
        if(existingAdmin){
            return res.status(400).json({message: "Admin already exist"})
        }
        let admin;
        const hashedPassword = bcryptjs.hashSync(password, 10)
        try {
            admin = new Admin({email, password:hashedPassword})
            admin = await admin.save()
            if(!admin){
                return res.status(500).json({message:"Unable to save admin"})
            }
            return res.status(201).json({admin})
        } catch (error) {
            return console.log(error);
        }
    } catch (error) {
        return console.log(error);
    }
}

export const Addminlogin = async (req,res,next)=>{
    const {email, password} = req.body
    if(!email && email.trim()==="" && !password && password.trim()==="" ){
        return res.status(422).json({message:"Invalid Input"})
    }
    let existingAdmin

    try {
        existingAdmin = await Admin.findOne({email})
        if(!existingAdmin){
            return res.status(400).json({message: "Admin not found"})
        }
        const isPasswordCorrect = bcryptjs.compareSync(password, existingAdmin.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Admin not found"})
        }
        const token = jwt.sign({id:existingAdmin._id}, process.env.SERET_KEY,{ expiresIn: '365d'} )
        return res.status(200).json({message: "Authentication complete", token, id:existingAdmin._id})
    } catch (error) {
        return console.log(error);
    }
}

export const getAdmins = async (req,res, next)=>{
    let admin;
    try {
        admin = await Admin.find()
        if(!admin){
            return res.status(500).json({message:"Internal server error"})
        }
        return res.status(200).json({admin})
    } catch (error) {
        return console.log(error)
    }
}

export const getAdminById = async (req,res, next)=>{
    const id = req.params.id
    let admin;
    try {
        admin = await Admin.findById(id)
        if(!admin){
            return res.status(500).json({message:"Internal server error"})
        }
        return res.status(200).json({admin})
    } catch (error) {
        return console.log(error)
    }
}