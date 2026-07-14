import bcrypt from "bcrypt";
import { Request, Response } from "express";

import { createUser, findUserByEmail,findUserById,findProfileById,updateProfile,updatePassword,findUserPasswordById } from "../models/user";
import { generateToken } from "../utils/jwt";
import { AuthRequest } from "../middlewares/auth.middleware";

export const signup = async (req: Request, res: Response) => {
  try {
    let { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({success: false,message: "All fields are required"});
    }
    email = email.trim().toLowerCase();
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({success: false,message: "Email already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUser({name,email,password: hashedPassword,role,});

    const token = generateToken(userId, role);

    return res.status(201).json({success: true,message: "User registered successfully",token});
  }
  catch(error) {
    return res.status(500).json({success: false,message: "Internal Server Error",})}
};

export const login = async (req: Request, res: Response) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({success: false,message: "Email and password are required"});
    }

    email = email.trim().toLowerCase();

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({success: false,message: "Invalid email or password"});
    }

    const isPasswordMatched = await bcrypt.compare(password,user.password);
    if (!isPasswordMatched) {
      return res.status(401).json({success: false,message: "Invalid email or password"});
    }

    const token = generateToken(user.id, user.role);
    return res.status(200).json({success: true,message: "Login successful",token});
  } 
  catch (error) {
    return res.status(500).json({success: false,message: "Internal Server Error"});
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {

    const user = await findProfileById(req.user!.id);
    if (!user) {
      return res.status(404).json({success: false,message: "User not found"});
    }

    return res.status(200).json({success: true,data: user});
  }

    catch (error) {
    return res.status(500).json({success: false,message: "Internal Server Error"});
  } 
}

export const updateUserProfile = async (req: AuthRequest,res: Response) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({success: false,message: "Name is required"});
    }

    const affectedRows = await updateProfile(req.user!.id,name.trim());

    if (!affectedRows) {
      return res.status(404).json({success: false,message: "User not found"});
    }

    const updatedProfile = await findProfileById(req.user!.id);

    return res.status(200).json({success: true,message: "Profile updated successfully",data: updatedProfile
    });
  } catch (error) {

    return res.status(500).json({success: false,message: "Internal Server Error"});
  }
};

export const changePassword = async (req: AuthRequest,res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({success: false,message: "Current password and new password are required"});
    }

    const user = await findUserPasswordById(req.user!.id);

    if (!user) {
      return res.status(404).json({success: false,message: "User not found"});
    }

    const isMatched = await bcrypt.compare(currentPassword,user.password);

    if (!isMatched) {
      return res.status(401).json({success: false,message: "Current password is incorrect"});
    }

    const isSamePassword = await bcrypt.compare(newPassword,user.password);

    if (isSamePassword) {
      return res.status(400).json({success: false,message: "New password cannot be same as current password"});
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await updatePassword(req.user!.id,hashedPassword);

    return res.status(200).json({success: true,message: "Password changed successfully",});

  } catch (error) {
    return res.status(500).json({success: false,message: "Internal Server Error",
    });
  }
};