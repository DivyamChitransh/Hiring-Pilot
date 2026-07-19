import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import {createCandidate,getCandidateByUserId,updateCandidate} from "../models/candidate";

export const create = async (req: AuthRequest, res: Response) => {
  try {
    let {headline,resume,skills,experience,current_location} = req.body;
    if (!headline || !resume || !skills || experience === undefined || !current_location) {
      return res.status(400).json({success: false,message: "Required fields are missing"});
    }

    const existingCandidate = await getCandidateByUserId(req.user!.id);
    if (existingCandidate) {
      return res.status(409).json({success: false,message: "Candidate profile already exists"});
    }

    headline = headline.trim().replace(/\s+/g, " ");
    skills = skills.trim().replace(/\s+/g, " ");

    const candidateId = await createCandidate({user_id: req.user!.id,...req.body,headline,skills});

    return res.status(201).json({success: true,message: "Candidate profile created successfully",candidateId});
  } catch (error) {
    return res.status(500).json({success: false,message: "Internal Server Error"});
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const candidate = await getCandidateByUserId(req.user!.id);
    if (!candidate) {
      return res.status(404).json({success: false,message: "Candidate profile not found"});
    }

    return res.status(200).json({success: true,message: "Candidate profile fetched successfully",data: candidate});
  } catch (error) {
    return res.status(500).json({success: false,message: "Internal Server Error"});
  }
};

export const update = async (req: AuthRequest, res: Response) => {
  try {
    let {headline,resume,skills,experience,current_location} = req.body;
    if (!headline || !resume || !skills || experience === undefined || !current_location) {
      return res.status(400).json({success: false,message: "Required fields are missing"});
    }

    const candidate = await getCandidateByUserId(req.user!.id);
    if (!candidate) {
      return res.status(404).json({success: false,message: "Candidate profile not found"});
    }

    headline = headline.trim().replace(/\s+/g, " ");
    skills = skills.trim().replace(/\s+/g, " ");

    await updateCandidate(req.user!.id, {...req.body,headline,skills});
    const updatedCandidate = await getCandidateByUserId(req.user!.id);

    return res.status(200).json({success: true,message: "Candidate profile updated successfully",data: updatedCandidate});
  } catch (error) {
    return res.status(500).json({success: false,message: "Internal Server Error"});
  }
};