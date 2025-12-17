const express = require('express');

const { jwtAuthMiddleware, generateToken } = require('./../jwt');
const{createCAtController,getallCATController,updateCATController,deleteCATController} = require('../controllers/categoryController')

const router = express.Router();

//create category
router.post('/create',jwtAuthMiddleware,createCAtController)
router.get('/getall',getallCATController)
router.put('/update/:id',jwtAuthMiddleware ,updateCATController)
router.delete('/delete/:id',jwtAuthMiddleware ,deleteCATController)



module.exports = router;