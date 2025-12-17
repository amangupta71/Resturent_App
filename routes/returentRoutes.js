const userModel = require('../models/usermodel');
const express = require('express');
const bcrypt = require('bcrypt');
const { jwtAuthMiddleware, generateToken } = require('./../jwt');
const resturentModel = require('../models/returentModel');
const { createResturentController, getallreturentController, getReturentbyidController, deleteResturentController } = require('../controllers/resturentController');

const router = express.Router();

//createresturent
router.post('/create',jwtAuthMiddleware,createResturentController)
router.get('/getAll',getallreturentController)
router.get('/get/:id',getReturentbyidController)
router.delete('/delete/:id',jwtAuthMiddleware,deleteResturentController)

module.exports = router;