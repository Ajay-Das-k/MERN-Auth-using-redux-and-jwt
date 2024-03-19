import express  from "express";
const router =express.Router()
import {
  authUser,
  rejisterUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../Controllers/userController.js";

router.post('/',rejisterUser)
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);

export default router;