import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserRequest extends Request {
  user?: { id: string };
}

export const authMiddleware = (
  req: UserRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.auth_token;

  if (!token) {
    res.status(401).json({ message: "No token found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    req.body = { id: decoded.id };
    next();
  } catch (error) {
    console.log("Invalid token:", error);
    res.status(400).json({ message: "Invalid token" });
  }
};
