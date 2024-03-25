import asyncHandler from "express-async-handler"
import fs from "fs";
import path from "path";
import express from "express";

import genarateToken from "../utils/generateToken.js";
import User from "../model/userModel.js";

// delete image using fs
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



//@desc Auth user/set token
// route POST/api/users/auth
// @access Public
const authUser = asyncHandler(async(req,res)=>{
  const {email, password} = req.body;
  const user=await User.findOne({email});
   if (user &&(await user.matchPassword(password))) {
     genarateToken(res, user._id);
     res.status(201).json({
       _id: user._id,
       name: user.name,
       email: user.email,
       phone: user.phone,
       image: user.image,
     });
   } else {
     res.status(401);
     throw new Error("Invalid email or password");
   }
});

//@desc Rejister A new User
// route POST/api/users
// @access Public
const rejisterUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;
  const image = req.file.filename;

  const userExist = await User.findOne({ email: email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
    image,
  });

  if (user) {
    // Send response with status 201 and user data
    genarateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      image: user.image, // Use user.image instead of image variable
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc Logout a User
// route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async(req,res)=>{
   res.cookie('jwt','',{
      httpOnly:true,
      expires:new Date(0)
   })
  res.status(200).json({message:"Logout User  Successfully!"})
});

//@desc Get a User profile
// route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async(req,res)=>{
   const user = {
     _id: req.user._id,
     name: req.user.name,
     email: req.user.email,
     phone: req.user.phone,
     image: req.user.image,
   };
  res.status(200).json(user)
});


//@desc update User profile
// route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async(req,res)=>{
  const user=await User.findById(req.user._id);
  if(user){
   user.name=req.body.name || user.name;
   user.email=req.body.email || user.email;
   user.phone=req.body.phone|| user.phone;
   if(req.body.password){
      user.password=req.body.password;
   }
   const updatedUser=await user.save()

   res.status(200).json({
      _id:updatedUser._id,
      name:updatedUser.name,
      email:updatedUser.email,
      phone:updatedUser.phone
   })
  }else{
   res.status(404)
   throw new Error('User not found')
  }
});

//@desc update User profilePic
// route PUT /api/users/profilePic
// @access Private
const updateUserProfilePic = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Store the old image filename temporarily
  const oldImageFilename = user.image;

  // Update the user's image with the new filename
  user.image = req.file.filename;
  const updatedUser = await user.save();

  // Delete the old image file from the server
  if (oldImageFilename) {
    await deleteImage(oldImageFilename);
  }

  res.status(200).json({
    _id: updatedUser._id,
    image: updatedUser.image,
  });
});



export {
  authUser,
  rejisterUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updateUserProfilePic,
};




