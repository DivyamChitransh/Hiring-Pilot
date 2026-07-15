import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import {createCompany,findCompanyByName,getCompanies,getCompaniesByUser,findCompanyById,updateCompany,deleteCompany} from "../models/company";

export const create = async (req: AuthRequest,res: Response) => {
  try {
    let { name, description, website,email,phone,industry,location,logo } = req.body;
    if (!name) {
      return res.status(400).json({success: false,message: "Company name is required"});
    }

    name = name.trim();
    const existingCompany = await findCompanyByName(name,req.user!.id);
    if (existingCompany) {
      return res.status(409).json({success: false,message: "Company already exists"});
    }

    const companyId = await createCompany({name,description,website,email,phone,industry,location,logo,created_by: req.user!.id});

    return res.status(201).json({success: true,message: "Company created successfully",companyId});

  } catch (error) {
    return res.status(500).json({success: false,message: "Internal Server Error"});
  }
};

export const getAllCompanies = async (req: AuthRequest,res: Response) => {
  try {
    const { id: userId, role } = req.user!;
    const isAdmin = role === "admin";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const companies = isAdmin ? await getCompanies(limit , offset) : await getCompaniesByUser(userId, limit, offset);
    return res.status(200).json({success: true,message: "Companies fetched successfully",data: companies});
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getCompanyById = async (req: AuthRequest,res: Response) => {
  try {
    const { id: userId, role } = req.user!;
    const { id } = req.params;
    const company = await findCompanyById(Number(id));
    if (!company) {
      return res.status(404).json({success: false,message: "Company not found"});
    }

    const isAdmin = role === "admin";
    if (!isAdmin && company.created_by !== userId) {
      return res.status(403).json({success: false,message: "Access denied"});
    }

    return res.status(200).json({success: true,message: "Company fetched successfully",data: company});
  } catch (error) {
    return res.status(500).json({success: false,message: "Internal Server Error"});
  }
};

export const update = async (req: AuthRequest,res: Response) => {
  try {
    const { id: userId, role } = req.user!;
    const { id } = req.params;
    let {name,description,website,email,phone,industry,location,logo} = req.body;
    const company = await findCompanyById(Number(id));

    if (!company) {
      return res.status(404).json({success: false,message: "Company not found"});
    }
    const isAdmin = role === "admin";
    if (!isAdmin && company.created_by !== userId) {
      return res.status(403).json({success: false,message: "Access denied"});
    }

    if (!name || !email || !website) {
      return res.status(400).json({success: false,message: "Company name, email and website are required"});
    }

    name = name.trim();
    email = email.trim().toLowerCase();
    website = website.trim();
    await updateCompany(Number(id), {name,description,website,email,phone,industry,location,logo});

    const updatedCompany = await findCompanyById(Number(id));
    return res.status(200).json({success: true,message: "Company updated successfully",data: updatedCompany});
  } catch (error) {
    return res.status(500).json({success: false,message: "Internal Server Error"});
  }
};

export const deletecompany = async (req: AuthRequest,res: Response) => {
  try {
    const { id: userId, role } = req.user!;
    const { id } = req.params;
    const company = await findCompanyById(Number(id));

    if (!company) {
      return res.status(404).json({success: false,message: "Company not found"});
    }

    const isAdmin = role === "admin";
    if (!isAdmin && company.created_by !== userId) {
      return res.status(403).json({success: false,message: "Access denied"});
    }
    await deleteCompany(Number(id));

    return res.status(200).json({success: true,message: "Company deleted successfully"});
  } catch (error) {
    return res.status(500).json({success: false,message: "Internal Server Error"});
  }
};