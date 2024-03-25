import asyncHandler from "express-async-handler";
import fs from "fs";
import path from "path";
import express from "express";

import genarateToken from "../utils/generateTokenAdmin.js";

// DB Seq
import Admin from "../model/adminModel.js";
import User from "../model/userModel.js";

// deleteImage  using fs
const __dirname = path.resolve();
const app = express();
const publicPath = path.join(__dirname, "backend", "public");
app.use(express.static(publicPath));
const deleteImage = (oldImageFilename) => {
  fs.unlink(
    path.join(publicPath, "images", "userProfile", oldImageFilename),
    (err) => {
      if (err) {
        console.error(`Error deleting old image: ${err.message}`);
      } else {
        console.log("Old image deleted successfully");
      }
    }
  );
};



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
  const { name, email, phone, password } = req.body;
  const image = req.file.filename;
  const adminExist = await Admin.findOne({ email: email });

  if (adminExist) {
    res.status(400);
    throw new Error("Admin already exists");
  }

  const admin = await Admin.create({
    name,
    email,
    phone,
    password,
    image,
  });

  if (admin) {
    // Send response with status 201 and admin data
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
      image: admin.image, // Use admin.image instead of image variable
    });
  } else {
    res.status(400);
    throw new Error("Invalid admin data");
  }
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


//@desc update Admin profilePic
// route PUT /api/admins/profilePic
// @access Private
const updateAdminProfilePic = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);
  if (!admin) {
    res.status(404);
    throw new Error("Admin not found");
  }

  // Store the old image filename temporarily
  const oldImageFilename = admin.image;

  // Update the admin's image with the new filename
  admin.image = req.file.filename;
  const updatedAdmin = await admin.save();

  // Delete the old image file from the server
  if (oldImageFilename) {
    await deleteImage(oldImageFilename);
  }

  res.status(200).json({
    _id: updatedAdmin._id,
    image: updatedAdmin.image,
  });
});

//@desc Get all userprofiles
// route GET /api/admins/profile
// @access Private
const listAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});



export {
  authAdmin,
  rejisterAdmin,
  logoutAdmin,
  getAdminProfile,
  updateAdminProfile,
  updateAdminProfilePic,
  listAllUsers,
};
