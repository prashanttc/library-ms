import  express  from "express";
import { CreateUser } from "../controllers/UserController";

const router = express.Router();

router.post("/register",CreateUser)

export default router