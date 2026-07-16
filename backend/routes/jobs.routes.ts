import express from "express";
import {create,getAllJobs,getJobById,update,Delete} from "../controllers/jobs.controller";
import {authenticate} from "../middlewares/auth.middleware";
import {authorize} from "../middlewares/role.middleware";

const router = express.Router();
router.post("/add",authenticate,authorize("admin", "recruiter"),create);
router.get("/",authenticate,authorize("admin", "recruiter","candidate"),getAllJobs);
router.get("/:id",authenticate,authorize("admin", "recruiter","candidate"),getJobById);
router.put("/:id",authenticate,authorize("admin", "recruiter"),update);
router.delete("/:id",authenticate,authorize("admin", "recruiter"),Delete);

export default router;