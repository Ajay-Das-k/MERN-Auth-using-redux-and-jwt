import asyncHandler from "express-async-handler"

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