import express  from "express";
const router =express.Router()

import {userImgResize,uploadUser} from "../config/multer.js"

import {
  authUser,
  rejisterUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updateUserProfilePic,
} from "../Controllers/userController.js";
import { protect } from "../middleWare/authMiddleWare.js";

router.post("/", uploadUser.single("image"),userImgResize,rejisterUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);
router.put("/profilePic",uploadUser.single("image"),userImgResize,protect,updateUserProfilePic);
export default router;