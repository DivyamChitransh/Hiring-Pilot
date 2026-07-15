import { Router } from "express";

import { authenticate } from "../middlewares/auth.middleware";
import { uploadCompanyLogo } from "../middlewares/upload.middleware";
import { Logoupload } from "../controllers/upload.controller";
import { authorize } from "../middlewares/role.middleware";

const router = Router();

router.post("/company-logo",authenticate,authorize("admin","recruiter"),uploadCompanyLogo.single("logo"),Logoupload);

export default router;