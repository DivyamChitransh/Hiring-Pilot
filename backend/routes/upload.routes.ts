import express from "express"
import { authenticate } from "../middlewares/auth.middleware";
import {uploadCompanyLogo,uploadProfileImage,uploadResume} from "../middlewares/upload.middleware";
import {Logoupload,profileImageUpload,resumeUpload} from "../controllers/upload.controller";
import { authorize } from "../middlewares/role.middleware";

const router = express.Router()

router.post("/company-logo",authenticate,authorize("admin", "recruiter"),uploadCompanyLogo.single("logo"),Logoupload);
router.post("/profile-image",authenticate,authorize("candidate"),uploadProfileImage.single("profile_image"),profileImageUpload);
router.post("/resume",authenticate,authorize("candidate"),uploadResume.single("resume"),resumeUpload);

export default router;