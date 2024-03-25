import express from "express";
const router = express.Router();
import { userImgResize, uploadUser } from "../config/multer.js";
import {
  authAdmin,
  rejisterAdmin,
  logoutAdmin,
  getAdminProfile,
  updateAdminProfile,
  updateAdminProfilePic,
  listAllUsers,
  deleteUser,
  editUser,
  updateUserProfilePic,
  rejisterUser,
} from "../Controllers/adminController.js";
import { protectAdmin } from "../middleWare/authMiddleWareAdmin.js"



// admin authentication Routes
router.post("/", uploadUser.single("image"), userImgResize, rejisterAdmin);
router.post("/auth", authAdmin);
router.post("/logout", logoutAdmin);
router.route("/profile").get(protectAdmin, getAdminProfile).put(protectAdmin, updateAdminProfile);
router.put("/profilePic",uploadUser.single("image"), userImgResize,protectAdmin, updateAdminProfilePic);  

// Admin Actions
router.get("/listAllUsers", protectAdmin,listAllUsers);
router.post("/createUser", uploadUser.single("image"), userImgResize,protectAdmin,rejisterUser);
router.delete("/deleteUser/:id", protectAdmin, deleteUser);
router.put("/edit-user/:id", protectAdmin, editUser);
router.put("/userProfilePic/:id",uploadUser.single("image"),userImgResize,protectAdmin,updateUserProfilePic);

export default router;
