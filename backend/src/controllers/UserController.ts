import { Request, Response } from "express";
import bcrypt from "bcrypt"
import User from "../models/user";

export const CreateUser = async (
  req: Request,
  res: Response,
) => {
    try{
    console.log("password",req.body)
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password , salt);
   
    const newUser = new User({
        ...req.body,
        password:hash
    })
    await newUser.save();
    res.status(200).send("user has been created successfully")
    }
    catch(error){
        console.log("error creating user",error)
    }
};
