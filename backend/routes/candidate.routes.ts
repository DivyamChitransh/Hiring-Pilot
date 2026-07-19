import express from "express";
import {create,getProfile,update} from "../controllers/candidate.controller"
import {authorize} from "../middlewares/role.middleware"
import {authenticate} from "../middlewares/auth.middleware"

const router = express.Router();   

router.post('/create',authenticate,authorize("candidate"),create);
router.get('/',authenticate,authorize("candidate"),getProfile);
router.put('/update',authenticate,authorize("candidate"),update);

export default router;