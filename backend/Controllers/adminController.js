import asyncHandler from "express-async-handler";
import genarateToken from "../utils/generateTokenAdmin.js";
import Admin from "../model/adminModel.js";

//@desc Auth admin/set token
// route POST/api/admins/auth
// @access Public
const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (admin && (await admin.matchPassword(password))) {
    genarateToken(res, admin._id);
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc Rejister A new admin
// route POST/api/admins
// @access Public
const rejisterAdmin = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const { name, email, phone, password } = req.body;
  const adminExist = await Admin.findOne({ email: email });
  if (adminExist) {
    res.status(400);
    throw new Error("admin Already Exist");
  }
  const admin = await Admin.create({
    name,
    email,
    phone,
    password,
  });
  if (admin) {
    genarateToken(res, admin._id);
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
    });
  } else {
    res.status(400);
    throw new Error(" Invalid admin Data");
  }

  res.status(200).json({ message: "Rejister admin" });
});

//@desc Logout a admin
// route POST /api/admins/logout
// @access Public
const logoutAdmin= asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout admin  Successfully!" });
});

//@desc Get a admin profile
// route GET /api/admins/profile
// @access Private
const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = {
    _id: req.admin._id,
    name: req.admin.name,
    email: req.admin.email,
    phone: req.admin.phone,
  };
  res.status(200).json(admin);
});

//@desc update admin profile
// route PUT /api/admins/profile
// @access Private
const updateAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);
  if (admin) {
    admin.name = req.body.name || admin.name;
    admin.email = req.body.email || admin.email;
    admin.phone = req.body.phone || admin.phone;
    if (req.body.password) {
      admin.password = req.body.password;
    }
    const updatedAdmin = await admin.save();

    res.status(200).json({
      _id: updatedAdmin._id,
      name: updatedAdmin.name,
      email: updatedAdmin.email,
      phone: updatedAdmin.phone,
    });
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});

export {
  authAdmin,
  rejisterAdmin,
  logoutAdmin,
  getAdminProfile,
  updateAdminProfile,
};
