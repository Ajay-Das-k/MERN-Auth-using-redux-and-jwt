import express  from "express";
const router =express.Router()
import { authUser } from "../Controllers/userController.js";

router.post('/auth',authUser)


export default router;