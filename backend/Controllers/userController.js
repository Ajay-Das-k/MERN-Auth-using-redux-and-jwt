import asyncHandler from "express-async-handler"
import genarateToken from "../utils/generateToken.js";
import User from '../model/userModel.js'

//@desc Auth user/set token
// route POST/api/users/auth
// @access Public
const authUser = asyncHandler(async(req,res)=>{
  res.status(200).json({message:"Auther User"})
});



//@desc Rejister A new User
// route POST/api/users
// @access Public
const rejisterUser = asyncHandler(async(req,res)=>{
   // console.log(req.body);
   const {name,email,phone,password}=req.body
   const userExist=await User.findOne({email:email})
   if(userExist){
      res.status(400)
      throw new Error('User Already Exist')
   }
   const user=await User.create({
      name,email,phone,password
   })
   if(user){
      genarateToken(res,user._id)
      res.status(201).json({
         _id:user._id,
         name:user.name,
         email:user.email,
         phone:user.phone

      });
      }else{
         res.status(400)
      throw new Error(' Invalid User Data')
      }
   
  res.status(200).json({message:"Rejister User"})
});



//@desc Logout a User
// route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async(req,res)=>{
  res.status(200).json({message:"Logout User"})
});

//@desc Get a User profile
// route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async(req,res)=>{
  res.status(200).json({message:"User profile"})
});


//@desc update User profile
// route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async(req,res)=>{
  res.status(200).json({message:"User profile update"})
});




export {
   authUser,
   rejisterUser,
   logoutUser,
   getUserProfile,
   updateUserProfile,

}