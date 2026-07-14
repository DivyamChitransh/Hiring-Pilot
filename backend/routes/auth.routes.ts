import express from "express";
import { signup,login,getProfile,updateUserProfile,changePassword } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, updateUserProfile);
router.put("/change-password", authenticate, changePassword);

export default router;