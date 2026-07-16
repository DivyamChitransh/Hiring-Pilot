import { Request,Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { findCompanyById } from "../models/company";
import {createJob,findJobByTitle,getJobs,getJobsByUser,getOpenJobs,findJobById,findJobByTitleExcludingId,updateJob,deleteJob} from "../models/jobs";

export const create = async (req: AuthRequest,res: Response) => {
  try {

    let {company_id,title,description,location,employment_type,work_mode,experience_min,experience_max,salary_min,salary_max,openings,skills,application_deadline} = req.body;
    if (!company_id || !title || !description || !employment_type || !work_mode || !experience_min || !experience_max) {
      return res.status(400).json({success: false,message: "Required fields are missing"});
    }

    const company = await findCompanyById(company_id);
    if (!company) {
      return res.status(404).json({success: false,message: "Company not found"});
    }

    const isAdmin = req.user!.role === "admin";
    if (!isAdmin && company.created_by !== req.user!.id) {
      return res.status(403).json({success: false,message: "Access denied"});
    }

    title = title.trim().replace(/\s+/g, " ");
    const existingJob = await findJobByTitle(company_id,title);
    if (existingJob) {
      return res.status(409).json({success: false,message: "Job already exists"});
    }
    if (experience_min > experience_max) {
        return res.status(400).json({success: false,message: "Maximum experience must be greater than or equal to minimum experience"})
    }

    const jobId = await createJob({company_id,title,description,location,employment_type,work_mode,experience_min,experience_max,salary_min,salary_max,openings,skills,application_deadline,created_by: req.user!.id});
    return res.status(201).json({success: true,message: "Job created successfully",jobId});
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllJobs = async (req: AuthRequest,res: Response) => {
  try {
    const { id: userId, role } = req.user!;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    let jobs;
    switch (role) {case "admin":
        jobs = await getJobs(limit, offset);
        break;
      case "recruiter":
        jobs = await getJobsByUser(userId,limit,offset);
        break;

      case "candidate":
        jobs = await getOpenJobs(limit,offset);
        break;

      default:
        return res.status(403).json({success: false,message: "Access denied"});
    }

    return res.status(200).json({success: true,message: "Jobs fetched successfully",data: jobs.data,
      pagination: {page,limit,total: jobs.total,totalPages: Math.ceil(jobs.total / limit)},
    });
  } catch (error) {
    return res.status(500).json({success: false,message: "Internal Server Error"});
  }
};

export const getJobById = async (req: AuthRequest,res: Response) => {
  try {
    const { id } = req.params;
    const { id: userId, role } = req.user!;
    const job = await findJobById(Number(id));

    if (!job) {
      return res.status(404).json({success: false,message: "Job not found"});
    }

    if (role === "admin") {
      return res.status(200).json({success: true,message: "Job fetched successfully",data: job});
    }

    if (role === "recruiter") {
      if (job.created_by !== userId) {
        return res.status(403).json({success: false,message: "Access denied"});
      }

      return res.status(200).json({success: true,message: "Job fetched successfully",data: job});
    }

    if (role === "candidate") {
      if (job.status !== "Open") {
        return res.status(404).json({success: false, message: "Job not found"});
      }

      return res.status(200).json({success: true,message: "Job fetched successfully",data: job});
    }
    return res.status(403).json({success: false,message: "Access denied"});
  } catch (error) {
    return res.status(500).json({success: false,message: "Internal Server Error"});
  }
};

export const update = async (req: AuthRequest,res: Response) => {
  try {
    const { id } = req.params;
    const { id: userId, role } = req.user!;
    let {title,description,location,employment_type,work_mode,experience_min,experience_max,salary_min,salary_max,openings,skills,application_deadline,status} = req.body;
    const job = await findJobById(Number(id));

    if (!job) {
      return res.status(404).json({success: false,message: "Job not found"});
    }

    const isAdmin = role === "admin";
    if (!isAdmin && job.created_by !== userId) {
      return res.status(403).json({success: false,message: "Access denied"});
    }
    title = title.trim().replace(/\s+/g, " ");
    const existingJob = await findJobByTitleExcludingId(job.company_id,title,Number(id));

    if (existingJob) {
      return res.status(409).json({success: false,message: "Job already exists"});
    }
    if (experience_min > experience_max) {
        return res.status(400).json({success: false,message: "Maximum experience must be greater than or equal to minimum experience"})
    }

    await updateJob(Number(id), {title,description,location,employment_type,work_mode,experience_min,experience_max,salary_min,salary_max,openings,skills,application_deadline,status,});

    const updatedJob = await findJobById(Number(id));
    return res.status(200).json({success: true,message: "Job updated successfully",data: updatedJob});
  } catch (error) {
    return res.status(500).json({success: false,message: "Internal Server Error"});
  }
};

export const Delete = async (req: AuthRequest,res: Response) => {
  try {
    const { id } = req.params;
    const { id: userId, role } = req.user!;
    const job = await findJobById(Number(id));

    if (!job) {
      return res.status(404).json({success: false,message: "Job not found"});
    }

    const isAdmin = role === "admin";
    if (!isAdmin && job.created_by !== userId) {
      return res.status(403).json({success: false,message: "Access denied"});
    }
    await deleteJob(Number(id));
    return res.status(200).json({success: true,message: "Job deleted successfully"});
  } catch (error) {
    return res.status(500).json({success: false,message: "Internal Server Error"});
  }
};