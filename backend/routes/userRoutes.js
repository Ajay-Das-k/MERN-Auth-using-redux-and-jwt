import express  from "express";
const router =express.Router()
import {
  authUser,
  rejisterUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../Controllers/userController.js";
import { protect } from "../middleWare/authMiddleWare.js";

router.post('/',rejisterUser)
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);

export default router;