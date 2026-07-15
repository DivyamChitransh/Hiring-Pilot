import { Request, Response } from "express";

export const Logoupload = (req: Request,res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({success: false,message: "Please upload an image"});
    }

    return res.status(200).json({success: true,message: "Logo uploaded successfully",imageUrl: `uploads/company-logos/${req.file.filename}`});
  } catch (error) {
    return res.status(500).json({success: false,message: "Internal Server Error"});
  }
};