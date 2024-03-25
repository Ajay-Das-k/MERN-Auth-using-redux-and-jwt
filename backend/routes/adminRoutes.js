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
} from "../Controllers/adminController.js";
import { protectAdmin } from "../middleWare/authMiddleWareAdmin.js"

router.post("/", uploadUser.single("image"), userImgResize, rejisterAdmin);
router.post("/auth", authAdmin);
router.post("/logout", logoutAdmin);
router
  .route("/profile")
  .get(protectAdmin, getAdminProfile)
  .put(protectAdmin, updateAdminProfile);
router.put(
  "/profilePic",
  uploadUser.single("image"),
  userImgResize,
  protectAdmin,
  updateAdminProfilePic
);  
router.get("/listAllUsers", protectAdmin,listAllUsers);

export default router;
