import jwt from "jsonwebtoken";

export const generateToken = (id: number,role: "admin" | "recruiter" | "candidate") => {
  return jwt.sign({id,role},process.env.JWT_SECRET!,{expiresIn: "7d"}
)};