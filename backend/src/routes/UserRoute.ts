import { Router } from "express";
import { CreateUser, getUserDetails, Loginuser, logout } from "../controllers/UserController";
import { authMiddleware } from "../middleware/tokenverfy";

const router =Router();

router.post("/register",CreateUser)
router.post("/login",Loginuser)
router.get("/details",authMiddleware,getUserDetails)
router.post("/logout",authMiddleware,logout)

export default router