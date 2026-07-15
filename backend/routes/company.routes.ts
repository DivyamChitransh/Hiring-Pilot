import express from "express";
import { authenticate} from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";
import { create,getAllCompanies,getCompanyById,update,deletecompany } from "../controllers/company.controller";

const router = express.Router();

router.post("/add", authenticate,authorize("admin","recruiter"), create);
router.get("/", authenticate,authorize("admin","recruiter"), getAllCompanies);
router.get("/:id", authenticate,authorize("admin","recruiter"), getCompanyById);
router.put("/:id", authenticate,authorize("admin","recruiter"), update);
router.delete("/:id", authenticate,authorize("admin","recruiter"), deletecompany);


export default router;