import asyncHandler from "express-async-handler"
import genarateToken from "../utils/generateToken.js";
import User from '../model/userModel.js'

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
     });
   } else {
     res.status(401);
     throw new Error("Invalid email or password");
   }
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
   const user ={
      _id:req.user._id,
      name:req.user.name,
      email:req.user.email,
      phone:req.user.phone
   }
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




export {
   authUser,
   rejisterUser,
   logoutUser,
   getUserProfile,
   updateUserProfile,

}