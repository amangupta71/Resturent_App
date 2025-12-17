const userModel = require('../models/usermodel');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { jwtAuthMiddleware, generateToken } = require('./../jwt');
const nodemailer = require('nodemailer');
require('dotenv').config();


const getUserController =  async(req,res)=>{
    try {
        const user = await usermodel.findById({_id:req.user.id})
        console.log(req.user.id)

        if(!user){
            return res.status(404).send({
                success:false,
                message:'user not found'
            });
        }
        //hide password 
        user.password = undefined;


        //response
        res.status(200).send({message:'get user Sucessfully',user})


    } catch (error) {
        console.log(error),
        res.status(500).send({message:'error in getuser api'})
    }
    //console.log(req.user);
   // console.log('User ID from token:', req.user.id);
}

const updateUserController = async(req,res)=>{
    try {
         const user = await usermodel.findById({_id:req.user.id})

         //validation
         if(!user){
            return res.status(404).send({
                success:false,
                message:'user not found'
            });
        }
        //update
        const{username,email,address,phone} = req.body
        if(username) user.username = username
        if(email) user.email = email
        if(address) user.address = address
        if(phone) user.phone = phone

        //save user
        await user.save()
        res.status(200).send({
            message:"user updated sucessfully",
        })

    } catch (error) {
        console.log(error),
        res.status(500).send({message:'error in update user api'})
    }
}

//reset password
const resetPasswordController = async(req,res)=>{
    try {
        const {email,newpassword,phrase} = req.body
        //validation
        if(!email || !newpassword || !phrase){
            res.status(500).send({message:'provide all the field'})
        }

        const user = await userModel.findOne({email , phrase})
        if(!user){
            res.status(500).send({message:'user not found'});
        }

        //pre shave will hash password
        user.password = newpassword;
        await user.save()

        res.status(200).send({messgae:'password reset succesfully'})
    } catch (error) {
          console.log(error),
        res.status(500).send({message:'error in password reset user api'})
    }
}

//update password
const updatePaswwordController = async(req,res)=>{
    try {
        //find user
        const userId = req.user.id; //extract the id from the token
        const {currentPassword , newPassword} = req.body;

       // Find user by id
         const user = await userModel.findById(userId);
         if (!user) {
          return res.status(404).json({ error: 'User not found' });
          }

        // verfiy current password
        const isMatch = await user.comparePassword(currentPassword);
          if (!isMatch) {
          return res.status(401).json({ error: 'Invalid current password' });
          }

        //update the user's pasword
        user.password = newPassword;
        user.markModified('password');
        await user.save();

        console.log('password updated:', user.username);
        res.status(200).json({message :" Password updated"});
        
    } catch (error) {
        
    }
}

//delete user
const deleteUserController = async(req,res)=>{
    try {
        await userModel.findByIdAndDelete(req.params.id)
        res.status(200).send({message:'user deleted'})
    } catch (error) {
          console.log(error),
        res.status(500).send({message:'error in delete user api'})
    }

}



module.exports = {
    getUserController,
    updateUserController,
    resetPasswordController,
    updatePaswwordController,
    deleteUserController,
   

}