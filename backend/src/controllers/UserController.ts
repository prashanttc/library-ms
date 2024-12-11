import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";
import jwt from "jsonwebtoken";

interface UserRequest extends Request {
  body: {
    email: string;
    password: string;
    id:string;
  };
}

export const CreateUser = async (
  req: UserRequest,
  res: Response
): Promise<Response | any> => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(403).send({ message: "user already exists" });
    }
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    return res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log("error creating user", error);
    res.status(505).json({ message: "error creating user" });
  }
};

export const Loginuser = async (
  req: UserRequest,
  res: Response
): Promise<Response | any> => {
  const secretKey = process.env.JWT_SECRET;
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found! please sign up" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return res.status(400).send({ message: "incorrect password" });

    const token = jwt.sign({ id: user._id, role: user.role }, secretKey!, {
      expiresIn: "1h",
    });
    res.cookie("auth_token", token);
    res.status(200).json({
      message: "login success",
    });
  } catch (error) {
    console.log("unable to login", error);
    res.status(505).json({ message: "error signing user" });
  }
};

export const getUserDetails = async (
  req: Request,
  res: Response
): Promise<Response | any> => {
  try {
    const userId = req.body.id;
    console.log("userID",userId)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('auth_token', { httpOnly: true, secure: true, sameSite: 'strict' });
  res.status(200).json({ message: 'Logged out successfully' });
};