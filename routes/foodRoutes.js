const express = require('express');
const foodModel = require('../models/foodModel')

const { jwtAuthMiddleware, generateToken } = require('./../jwt');
const adminmiddleware = require('../middlewares/adminMiddleware')
const{createFoodController,GetAllfoodControlller,
    GetSinglefoodController,getFoodbyresturentController,
updateFoodController,deleteFoodController,placeOrdercontroller,
updateOrderStatusController,getallordersControlller,getUserOrdersController,
analyticsDashboardController,usersAnalyticsController} = require('../controllers/foodController');

const router = express.Router();

//create
router.post('/create',jwtAuthMiddleware,adminmiddleware,createFoodController)
router.get('/getall',GetAllfoodControlller)
router.get('/get/:id',GetSinglefoodController)
router.get('/getbyresturent/:id',getFoodbyresturentController)
router.put('/update/:id',jwtAuthMiddleware,adminmiddleware,updateFoodController)
router.delete('/delete/:id',jwtAuthMiddleware,adminmiddleware,deleteFoodController)



//order
router.get('/getallorders' ,jwtAuthMiddleware, adminmiddleware, getallordersControlller),
router.get(  "/myorders",  jwtAuthMiddleware,  getUserOrdersController);
router.post('/placeorder',jwtAuthMiddleware,placeOrdercontroller);
router.post('/orderstatus/:id',
    jwtAuthMiddleware,
    adminmiddleware,
    updateOrderStatusController)

//analysis
router.get('/dashboard',jwtAuthMiddleware,adminmiddleware,analyticsDashboardController);
router.get('/users-analytics',jwtAuthMiddleware,adminmiddleware,usersAnalyticsController);
module.exports = router