const express = require('express');
const {getUserController,updateUserController, resetPasswordController, deleteUserController,
    sendOtpController, verifyOtpController} = require('../controllers/userController');
const { jwtAuthMiddleware, generateToken } = require('./../jwt');


const router = express.Router();

//routes
router.get('/getuser',jwtAuthMiddleware, getUserController);
router.put('/updateuser',jwtAuthMiddleware,updateUserController);
router.post('/resetPassword',jwtAuthMiddleware,resetPasswordController);
router.post('/updatepassword',jwtAuthMiddleware,updateUserController);
router.delete('/deleteuser/:id',jwtAuthMiddleware,deleteUserController);
// authRoutes.js



module.exports = router;