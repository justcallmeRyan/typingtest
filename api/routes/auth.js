import express from "express";
import { register, login } from "../controllers/auth.js"

const router = express.Router();

//REGISTER
router.post("/register", register)
//LOG IN
router.post("/login", login)
//GOOGLE
router.post("/google", )
export default router;