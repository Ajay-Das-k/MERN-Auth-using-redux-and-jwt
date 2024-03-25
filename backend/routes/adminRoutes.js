import express from "express";
const router = express.Router();
import {
  authAdmin,
  rejisterAdmin,
  logoutAdmin,
  getAdminProfile,
  updateAdminProfile,
} from "../Controllers/adminController.js";
import { protectAdmin } from "../middleWare/authMiddleWareAdmin.js"

router.post("/", rejisterAdmin);
router.post("/auth", authAdmin);
router.post("/logout", logoutAdmin);
router
  .route("/profile")
  .get(protectAdmin, getAdminProfile)
  .put(protectAdmin, updateAdminProfile);

export default router;
