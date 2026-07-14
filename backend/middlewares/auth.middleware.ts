import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {id: number;role: "admin" | "recruiter" | "candidate"};
}
export const authenticate = (req: AuthRequest,res: Response,next: NextFunction) => {
  try {
    const token = req.headers["x-access-token"] as string;
    if (!token) {
      return res.status(401).json({success: false,message: "Access token is required"});
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET!) as {
      id: number;role: "admin" | "recruiter" | "candidate"
    };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({success: false,message: "Invalid or expired token"});
  }
};