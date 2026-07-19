import { Request, Response } from "express";

const uploadFile = (req: Request,res: Response,filePath: string,successMessage: string,fileKey: string) => {
  try {
    if (!req.file) {
      return res.status(400).json({success: false,message: "Please upload a file"});
    }

    return res.status(200).json({success: true,message: successMessage,[fileKey]: `${filePath}/${req.file.filename}`});
  } catch (error) {
    return res.status(500).json({success: false,message: "Internal Server Error"});
  }
};

export const Logoupload = (req: Request, res: Response) =>
  uploadFile(req,res,"uploads/company-logos","Logo uploaded successfully","imageUrl"
  );

export const profileImageUpload = (req: Request, res: Response) =>
  uploadFile(req,res,"uploads/profile-images","Profile image uploaded successfully","imageUrl"
  );

export const resumeUpload = (req: Request, res: Response) =>
  uploadFile(req,res,"uploads/resumes","Resume uploaded successfully","resumeUrl"
  );